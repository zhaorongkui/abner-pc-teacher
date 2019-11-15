
<style scoped>
.read-speed {
  position: absolute;
  top: 25px;
  right: 5px;
  text-align: right;
  font-size:14px;
  font-weight:400;
  color:rgba(84,101,126,1);
  line-height:19px;
}
.ability-chart-left {
  position: relative;
}
.echarts-skeleton {
  padding: 30px;
  top: 30px;
  width: 100%;
  height: 230px;
  position: absolute;
  z-index: 99999999;
  background: #ffffff;
}
.ability-chart-right, .chart-card {
  position: relative;
}
.checkbox-box {
  top: 0;
  position: absolute;
  right: 0;
  z-index: 99999999;
}
</style>

<template>
  <div class="read-chart" :style="{left: viewState ? '0' : '-1126px'}">
    <div class="chart-card card margin-right-10 horizontal-center">
      <div class="ability-chart-left">
        <div class="read-speed" v-if="readSpeed !== null"><span>平均阅读速度</span><br /><span>{{`${readSpeed?readSpeed*60:0} 字/分钟`}}</span></div>
        <div class="read-model echarts"></div>
        <div class="checkbox-box">
          <echarts-checkbox :borderColor="textColor" :data="option1CheckboxData" :showCheckbox="false"/>
        </div>
      </div>
      <div class="vertical-divider" style="margin: 0 20px;"></div>
      <div class="ability-chart-right">
        <div class="perceive-model echarts"></div>
        <div class="checkbox-box" :style="{top: '5px', right: '10px'}" >
          <echarts-checkbox :borderColor="textColor" :data="option2CheckboxData" :showCheckbox="false" />
        </div>
        <div class="echarts-skeleton" v-if="option2SkeletonShow">
          <skeleton />
        </div>
      </div>
    </div>
    <div class="chart-switch vertical-center" @click="changeState">
      <span class="text-small">阅读</span>
      <span class="text-small">得分</span>
      <span class="text-small">分析</span>
    </div>
    <div class="chart-card card margin-left-10">
      <div class="score-model echarts"></div>
      <div class="checkbox-box" :style="{top: '25px', right: '20px'}">
        <echarts-checkbox :borderColor="textColor" :data="option3CheckboxData" :showCheckbox="false"/>
      </div>
      <div class="echarts-skeleton" style="top: 50px;" v-if="option3SkeletonShow">
        <skeleton />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Skeleton from '../../../components/Skeleton'
import EchartsCheckbox from '../../../components/EchartsCheckbox'
import {getDateDiff} from '../../../util/assist';
const echarts = require('echarts')
const macarons = require('../../../theme/macarons.json')
echarts.registerTheme('macarons', macarons)

function sum(arr) {
  return eval(arr.join("+"));
};

const statistical = [
  {
    name: '认读感知能力'
  },
  {
    name: '推理解释能力'
  },
  {
    name: '评价奖赏能力'
  },
  {
    name: '质疑研究能力'
  },
  {
    name: '拓展应用能力'
  }
]
const articleAbilityStatistical = {
  '1': { name: '语言累计运用', value: 0 },
  '2': { name: '整体感知', value: 0 },
  '3': { name: '提取信息', value: 0 },
  '4': { name: '概括', value: 0 },
  '5': { name: '表达运用', value: 0 },
  '6': { name: '分析', value: 0 },
  '7': { name: '理解', value: 0 },
  '8': { name: '形成解释', value: 0 },
  '9': { name: '做出评论', value: 0 },
  '10': { name: '分析综合', value: 0 },
  '11': { name: '解决问题', value: 0 },
  '12': { name: '应用', value: 0 }
}

let currentAbility = statistical[0].name

const option1 = {
  color: ['#FF9948', '#36CAB0'],
  title: {
    text: ['{b| }', ' ', '{a|基础雷达图}'].join(''),
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          color: '#3c3c3c',
          borderLeftColor: '#3c3c3c'
        },
        b: {
          verticalAlign: 'top',
          fontSize: 16,
          backgroundColor: '#0610a8'
        }
      }
    }
  },
  legend: {
    show: false,
    left: 'right',
  },
  radar: {
    // shape: 'circle',
    triggerEvent: true,
    radius: '70%',
    name: {
      formatter: function (value, indicator) {
        let style = {
          color: '#1059FF',
          borderColor: '#1059FF',
          borderRadius: 10,
          padding: [4, 7],
          borderWidth: 1,
          backgroundColor: '#ffffff',
          shadowColor: 'rgba(16,89,255,0.27)',
          shadowBlur: 5,
          shadowOffsetX: 2,
          shadowOffsetY: 3,
        }
        if (currentAbility === value) {
          style.color = '#ffffff'
          style.backgroundColor = '#1059FF'
        }
        for(let key in style) {
          indicator.nameTextStyle[key] = style[key]
        }
        return value;
      }
    },
    indicator: statistical
  },
  series: [
    {
      type: 'radar',
      // areaStyle: {normal: {}},
      data: []
    }
  ]
}

const option2 = {
  color: ['#FF9948', '#36CAB0'],
  title: {
    text: ['{b| }', ' ', '{a|认读感知能力}'].join(''),
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          color: '#3c3c3c',
          borderLeftColor: '#3c3c3c'
        },
        b: {
          verticalAlign: 'top',
          fontSize: 16,
          backgroundColor: '#0610a8'
        }
      }
    }
  },
  legend: {
    show: false,
    left: 'right',
  },
  grid:{
    x:40,
    y:50,
    x2:10,
    y2:40,
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true, //刻度线和标签对齐
        interval:0   //间隔
      },
      splitLine: {
        show: true, //网格线开关
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
  ]
}

const textColor = [
  "#FF9948",
  "#36CAB0",
]

const bgColor = [
  "rgba(255,153,72,.2)",
  "rgba(54,202,176,.2)",
]

const option3 = {
  color: [
    "#FF9948",
    "#36CAB0",
  ],
  title: {
    text: ["{b| }", " ","{a|阅读得分分析}"].join(""),
    textStyle: {
      rich: {
        a: {
          fontSize: 14,
          color: "#3c3c3c",
          borderLeftColor: "#3c3c3c"
        },
        b: {
          verticalAlign: "top",
          fontSize: 16,
          backgroundColor: "#0610a8"
        }
      }
    },
  },
  dataZoom: [
    {
      type: 'inside',
      end: 100
    }
  ],
  grid:{
    x:40,
    y:50,
    x2:10,
    y2:40,
  },
  legend: {
    show: false,
    right: 30,
    textStyle: {
      color: "#000000"
    }
  },
  xAxis: {
    type: "time",
    minInterval: 86400000*7,
    maxInterval: 86400000*30,
    axisLabel: {
      formatter: function (value) {
        let date = moment(value).format('MM月DD日')
        return date
      }
    },
  },
  yAxis: {
    type: "value",
    min: 0,
    max: 100,
    axisLabel: {
      formatter: function (value) {
        return value + "%"
      }
    },
  },
  series: [
    {
      type: "line",
    }
  ]
};

export default {
  name: 'ability-analyze',
  components: {
    Skeleton,
    EchartsCheckbox
  },
  data() {
    return {
      textColor: [
        "#FF9948",
        "#36CAB0"
      ],
      option2SkeletonShow: false,
      option3SkeletonShow: false,
      readSpeed: null,
      radarChart: null, // 雷达图
      classStatistical: null,
      studentStatistical: null,
      classArticleAbilityStatistical: JSON.parse(JSON.stringify(articleAbilityStatistical)),
      studnetArticleAbilityStatistical:JSON.parse(JSON.stringify(articleAbilityStatistical)),
      option1, // 图表1的配置文件
      option2, // 图表2的配置文件
      option3, // 图表3的配置文件
      option1CheckboxData: [], // 图表1的图例数据
      option2CheckboxData: [], // 图表2的图例数据
      option3CheckboxData: [], // 图表3的图例数据
      viewState: true,
      readNumber: 30
    }
  },
  created() {
    this.getStudentAnalysisAbility()
  },
  mounted() {
  },
  methods: {
    getStudentAnalysisAbility() {
      let {
        studentId = null,
        studentName = '学生',
        classId = null
      } = this.$route.query
      let data = {
        gradeClassId: classId,
        studentInfoId: studentId
      }
      this.$http
        .get('/api/student/homework/analysis/ability', { params: data })
        .then(res => {
          console.log('学生能力维度', res)
          if (res.data.flag === 1) {
            let {
              classArticleAbilityStatisticalList, // 班级能力维度列表
              studentArticleAbilityStatisticalList, // 学生能力维度列表
              classHomeworkDateTrueRateList, // 班级得分分析
              studentHomeworkDateTrueRateList, // 学生得分分析
              readSpeed
            } = res.data.infos

            if (
              classArticleAbilityStatisticalList &&
              classArticleAbilityStatisticalList.length
            ) {
              classArticleAbilityStatisticalList.forEach(item => {
                this.classArticleAbilityStatistical[item.abilityId].value =
                  item.classAbilityAverage
              })
              this.classStatistical = {
                name: '班级',
                value: this.createTotalModel(
                  this.classArticleAbilityStatistical
                )
              }
            }

            if (
              studentArticleAbilityStatisticalList &&
              studentArticleAbilityStatisticalList.length
            ) {
              studentArticleAbilityStatisticalList.forEach(item => {
                this.studnetArticleAbilityStatistical[item.abilityId].value =
                  item.studentAbilityAverage || 0
              })
              this.studentStatistical = {
                name: studentName,
                value: this.createTotalModel(
                  this.studnetArticleAbilityStatistical
                )
              }
            }
            this.classHomeworkDateTrueRateList = classHomeworkDateTrueRateList
            this.studentHomeworkDateTrueRateList = studentHomeworkDateTrueRateList
            this.$nextTick().then(() => {
              this.readChartInit(readSpeed)
              this.createBasisModel('认读感知能力')
              this.scoreChartInit()
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    createBasisModel(name) {
      currentAbility = name;
      let keyArr = []
      let classObj = []
      let studentObj = []
      let xAxisData = []
      switch (name) {
        case '认读感知能力':
          keyArr = [1, 2, 3];
          break;
        case '推理解释能力':
          keyArr = [4, 5, 6, 7, 8];
          break;
        case '评价奖赏能力':
          keyArr = [9, 10];
          break;
        case '质疑研究能力':
          keyArr = [11];
          break;
        case '拓展应用能力':
          keyArr = [12];
          break;
        default:
          keyArr = []
      }
      if (!keyArr.length) {
        return false
      } 
      keyArr.forEach(item => {
        xAxisData.push(articleAbilityStatistical[item].name)
        classObj.push(this.classArticleAbilityStatistical[item].value)
        studentObj.push(this.studnetArticleAbilityStatistical[item].value)
      })
      this.createRadar()
      this.perceiveChartInit({name, xAxisData, classObj, studentObj})
    },
    createTotalModel(data) {
      let perceptionRead = 0
      let recommendAbility = 0
      let apperciationAbility = 0
      let researchAbility = 0
      let applicationAbility = 0
      for (let k in data) {
        switch (k) {
          case '1':
          case '2':
          case '3':
            perceptionRead += Number(data[k].value)
            break
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
            recommendAbility += Number(data[k].value)
            break
          case '9':
          case '10':
            apperciationAbility += Number(data[k].value)
            break
          case '11':
            researchAbility += Number(data[k].value)
            break
          case '12':
            applicationAbility += Number(data[k].value)
            break
        }
      }
      return [
        perceptionRead,
        recommendAbility,
        apperciationAbility,
        researchAbility,
        applicationAbility
      ]
    },
    readChartInit(readSpeed) {
      let { studentName = '学生' } = this.$route.query
      this.readSpeed = readSpeed 
      this.option1.series[0].data = [
        this.studentStatistical,
        this.classStatistical
      ]
      let legend = [studentName, '班级']
      this.option1CheckboxData = legend
      this.option1.legend.data = legend
      this.radarChart = echarts.init(
        document.getElementsByClassName('read-model')[0],
        'macarons'
      )
      this.radarChart.on('click', (params) => {
        this.createBasisModel(params.name)
      })
      this.createRadar()
    },
    createRadar () {
      this.radarChart.setOption(this.option1)
    },
    perceiveChartInit({name, xAxisData, classObj, studentObj}) {
      let arr = classObj.concat(studentObj)
      let count = sum(arr)
      let legend = [studentName, '班级']
      this.option2CheckboxData = legend
      if (!count) {
        this.option2SkeletonShow = true
      } else {
        this.option2SkeletonShow = false
      }
      let { studentName = '学生' } = this.$route.query
      this.option2.title.text = ['{b| }', ' ', `{a|${name}}`].join('')
      this.option2.legend.data = legend
      this.option2.xAxis[0].data = xAxisData
      this.option2.series[0] = {
        data: studentObj,
        name: studentName,
        type: 'bar',
        barMaxWidth: 40
      }
      this.option2.series[1] = {
        data: classObj,
        name: '班级',
        type: 'bar',
        barMaxWidth: 40
      }
      const myChart = echarts.init(
        document.getElementsByClassName('perceive-model')[0],
        'macarons'
      )
      myChart.setOption(this.option2, false)
    },
    scoreChartInit() {
      let { studentName = '学生' } = this.$route.query
      let timeArr = []
      let studentObj = {
        type: 'line',
        name: studentName,
        data: this.studentHomeworkDateTrueRateList.map(item => {
          timeArr.push(item.createTime)
          return {
            name: studentName,
            value: [item.createTime, item.avageTrueRate]
          }
        })
      }
      let classObj = {
        type: 'line',
        name: '班级',
        data: this.classHomeworkDateTrueRateList.map(item => {
          timeArr.push(item.createTime)
          return {
            name: '班级',
            value: [item.createTime, item.avageTrueRate]
          }
        })
      }
      let legend = [studentName, '班级']
      this.option3CheckboxData = legend
      this.option3.legend.data = legend
      this.option3.series = [
        studentObj, classObj
      ]
      this.option3.series.forEach((item, index) => {
        item.markPoint = {
          symbol: "path://M18.01,19 L14.355,24.2214286 L10.7,19 L4,19 C1.790861,19 2.705415e-16,17.209139 0,15 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L25,0 C27.209139,-4.05812251e-16 29,1.790861 29,4 L29,15 C29,17.209139 27.209139,19 25,19 L18.01,19 Z",
          symbolSize: [47, 38],
          symbolOffset: [0, -30],
          label: {
            offset: [0, -4],
            fontSize: '12',
            color: textColor[index%2]
          },
          itemStyle: {
            color: bgColor[index%2]
          },
          data : [
            {type : 'max', name : '最大值'},
            {type : 'min', name : '最小值'}
          ]
        }
      })
      timeArr = timeArr.sort(function (a, b) {
        return a - b 
      })
      if (!timeArr) {
        this.option3SkeletonShow = true
      } else {
        this.option3SkeletonShow = false
      }
      let startTime = timeArr[0]
      let endTime = timeArr[timeArr.length -1]
      let deffDate = getDateDiff(startTime, endTime)
      if (deffDate > 15) {
        this.option3.dataZoom[0].start = 100/deffDate*(deffDate-15) - 100/deffDate
      } else {
        this.option3.dataZoom[0].start = 0
      }
      const myChart = echarts.init(
        document.getElementsByClassName('score-model')[0],
        'macarons'
      )
      myChart.setOption(this.option3)
    },
    changeState() {
      this.viewState = !this.viewState
    }
  }
}
</script>
