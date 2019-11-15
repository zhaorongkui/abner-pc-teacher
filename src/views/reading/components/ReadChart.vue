<style scoped>
.chart-left {
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
.checkbox-box {
  top: 0;
  position: absolute;
  right: 20px;
  z-index: 99999999;
}
</style>
<template>
  <div class="read-chart" :style="{left: viewState ? '0' : '-1126px'}">
    <div class="chart-card card margin-right-10">
      <div class="chart-left">
        <div class="echarts"></div>
        <div class="checkbox-box">
          <echarts-checkbox :borderColor="textColor" v-model="echartValue" :data="checkboxData" @on-change="echartCheckboxChange"/>
        </div>
        <div class="echarts-skeleton" v-if="showSkeleton">
          <skeleton />
        </div>
      </div>
    </div>
    <div class="chart-switch vertical-center" @click="changeState">
      <template v-if="viewState">
        <span class="text-small">已发布</span>
        <span class="text-large margin-top-bottom-13" >{{readNumber===null?'-':readNumber}}</span>
        <span class="text-small">篇阅读</span>
      </template>
      <template v-else>
        <span class="text-small">阅读</span>
        <span class="text-small">得分</span>
        <span class="text-small">分析</span>
      </template>
    </div>
    <div class="chart-card margin-left-10">
      <div class="chart-right">
        <div class="right-progress card margin-right-10">
          <div class="release-read-number">
            <span class="right-submit-text-small right-submit-text-color-default">已发布&#12288;</span>
            <span class="right-submit-text-large right-submit-text-color-primary">{{readNumber===null?'-':readNumber}}</span>
            <span class="right-submit-text-small right-submit-text-color-primary">&#12288;篇阅读</span>
          </div>
          <div class="right-read-analyze">
            <div class="submit">
              <radial-progress
                :completed-steps="submit.completedSteps || 0"
                :total-steps="submit.totalSteps"
              >
                <div class="read-analyze-text-color-default">
                  <span class="read-analyze-text-large">{{submit.completedSteps===null?'-':submit.completedSteps}}</span>
                  <span class="read-analyze-text-samll">%</span>
                </div>
                <div class="read-analyze-text-samll right-submit-text-color-default">提交率</div>
              </radial-progress>
            </div>
            <div class="accuracy">
              <radial-progress
                :completed-steps="accuracy.completedSteps || 0"
                :total-steps="accuracy.totalSteps"
              >
                <div class="read-analyze-text-color-default">
                  <span class="read-analyze-text-large">{{accuracy.completedSteps===null?'-':accuracy.completedSteps}}</span>
                  <span class="read-analyze-text-samll">%</span>
                </div>
                <div class="read-analyze-text-samll right-submit-text-color-default">正确率</div>
              </radial-progress>
            </div>
          </div>
        </div>
        <div class="right-table card">
          <a-table class="hwd-table-thead-left" :columns="columns" :dataSource="data" bordered :pagination="false">
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgress from "../../../components/RadialProgress";
import Skeleton from '../../../components/Skeleton'
import EchartsCheckbox from '../../../components/EchartsCheckbox'
import moment from 'moment'
import {getDateDiff} from '../../../util/assist';
const echarts = require('echarts');
const macarons = require('../../../theme/macarons.json');
echarts.registerTheme('macarons', macarons);
const textColor = [
  "#0FA2FF",
  "#FF9948",
  "#36CAB0",
  "#CB70FF",
  "#d889f5",
  "#687dff",
  "#bbc60d",
  "#fc5266",
  "#49dfe5",
  "#6060a7",
  "#9c8645"
]
const bgColor = [
  "rgba(15,162,255,.2)",
  "rgba(255,153,72,.2)",
  "rgba(54,202,176,.2)",
  "rgba(203,112,255,.2)",
  "rgba(216,137,245,.2)",
  "rgba(104,125,255,.2)",
  "rgba(187,198,13,.2)",
  "rgba(252,82,102,.2)",
  "rgba(73,223,229,.2)",
  "rgba(96,96,167,.2)",
  "rgba(156,134,69,.2)",
]
const option = {
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
    }
  },
  grid:{
    x:40,
    y:40,
    x2:30,
    y2:40,
  },
  legend: {
    show: false,
    right: 30,
    textStyle: {
      color: "#000000"
    }
  },
  dataZoom: [
    {
      type: 'inside',
      end: 100
    }
  ],
  xAxis: {
    type: "time",
    minInterval: 86400000*1,
    maxInterval: 86400000*1,
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
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
const columns = [
  {
    title: '阅读文体',
    align: 'center',
    width: 102,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '记叙文',
    align: 'center',
    width: 82,
    dataIndex: '记叙文',
    key: '记叙文',
  },
  {
    title: '文言文',
    align: 'center',
    width: 82,
    dataIndex: '文言文',
    key: '文言文',
  },
  {
    title: '说明文',
    align: 'center',
    width: 82,
    dataIndex: '说明文',
    key: '说明文',
  },
  {
    title: '散文',
    align: 'center',
    width: 82,
    dataIndex: '散文',
    key: '散文',
  },
  {
    title: '小说',
    align: 'center',
    width: 82,
    dataIndex: '小说',
    key: '小说',
  },
  {
    title: '非连续性文本',
    align: 'center',
    width: 132,
    dataIndex: '非连续性文本',
    key: '非连续性文本',
  },
  {
    title: '其他',
    align: 'center',
    width: 92,
    dataIndex: '其他',
    key: '其他',
  },
];

const data = [
  {
    'name': '发布篇数',
    '记叙文': '--',
    '文言文': '--',
    '说明文': '--',
    '散文': '--',
    '小说': '--',
    '非连续性文本': '--',
    '其他': '--'
  },
  {
    'name': '正确率',
    '记叙文': '--',
    '文言文': '--',
    '说明文': '--',
    '散文': '--',
    '小说': '--',
    '非连续性文本': '--',
    '其他': '--'
  },
  {
    'name': '提交率',
    '记叙文': '--',
    '文言文': '--',
    '说明文': '--',
    '散文': '--',
    '小说': '--',
    '非连续性文本': '--',
    '其他': '--'
  }
];
export default {
  name: "read-chart",
  components: { RadialProgress, Skeleton, EchartsCheckbox},
  data() {
    return {
      textColor: [
        "#0FA2FF",
        "#FF9948",
        "#36CAB0",
        "#CB70FF",
        "#d889f5",
        "#687dff",
        "#bbc60d",
        "#fc5266",
        "#49dfe5",
        "#6060a7",
        "#9c8645"
      ],
      myChart: null,
      checkboxData: [],
      echartValue: [],
      data,
      option,
      showSkeleton: false,
      columns,
      submit: {
        completedSteps: null,
        totalSteps: 100
      },
      accuracy: {
        completedSteps: null,
        totalSteps: 100
      },
      viewState: true,
      readNumber: null
    };
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo;
    }
  },
  created () {
    this.getReadData()
  },
  mounted () {
  },
  methods: {
    getReadData () {
      let data = {
        teacherId: this.userInfo.teacherId
      }
      this.$http.get('/api/teacher/homework/analysis/index', {params: data}).then(res => {
        if (res.data.flag === 1) {
          // 阅读得分分析  classArticleScoreAnalysisList
          // 阅读篇目类型分析 questionTextTypeAnalysisList
          // 阅读总分析 teacherPublishArticleRate
          let {classArticleScoreAnalysisList, questionTextTypeAnalysisList, teacherPublishArticleRate} = res.data.infos
          this.createChartOption(classArticleScoreAnalysisList)
          this.createTableData(questionTextTypeAnalysisList)
          // 总分析数据赋值
          this.readNumber = teacherPublishArticleRate.articleCount
          this.submit.completedSteps = Number(teacherPublishArticleRate.avageFinishRate)
          this.accuracy.completedSteps = Number(teacherPublishArticleRate.avageTrueRate)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // 创建统计图所需要的数据
    /**
     * avageGetScoreRate平均得分率
     * createTime作业发布时间
     * grade年级
     * gradeClassid班级ID	
     * gradeClassname班级名 
     */
    createChartOption (data) {
      if (data&&data.length) {
        let series = {},
            legendData = [],
            className = '',
            startTime = 0,
            endTime = 0,
            timeArr = []
        data.forEach((item, index) => {
          if (!legendData.includes(item.gradeClassname)) {
            legendData.push(item.gradeClassname)
          }

          if (series[item.gradeClassname] === undefined) {
            series[item.gradeClassname] = {
              type: 'line',
              name: item.gradeClassname,
              data: [],
              symbolSize: 11,
              itemStyle: {
                borderWidth: 2
              }
            }
          }
          series[item.gradeClassname].markPoint = {
            symbol: "path://M18.01,19 L14.355,24.2214286 L10.7,19 L4,19 C1.790861,19 2.705415e-16,17.209139 0,15 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 L25,0 C27.209139,-4.05812251e-16 29,1.790861 29,4 L29,15 C29,17.209139 27.209139,19 25,19 L18.01,19 Z",
            symbolSize: [47, 38],
            symbolOffset: [0, -30],
            label: {
              offset: [0, -4],
              fontSize: '12',
            },
            itemStyle: {
            },
            data : [
              {type : 'max', name : '最大值'},
              {type : 'min', name : '最小值'}
            ]
          }
          timeArr.push(item.createTime);
          series[item.gradeClassname].data.push({
            name: item.gradeClassname,
            value: [item.createTime, item.avageGetScoreRate]
          })
        })
        let seriesArr = []
        for(let key in series) {
          seriesArr.push(series[key])
        }
        seriesArr.forEach((item, index) => {
          item.markPoint.label.color = textColor[index%11]
          item.markPoint.itemStyle.color = bgColor[index%11]
        })
        timeArr = timeArr.sort(function (a, b) {
          return a - b 
        })
        startTime = timeArr[0]
        endTime = timeArr[timeArr.length -1]
        let diffDate = getDateDiff(startTime, endTime)
        if (diffDate > 15) {
          this.option.dataZoom[0].start = 100/diffDate*(diffDate-15) - 100/diffDate
        } else {
          this.option.dataZoom[0].start = 0
        }
        this.checkboxData = legendData
        this.echartValue = legendData
        this.option.legend.data = legendData
        this.option.legend.selected = legendData.map(item => {
          return {
            [item]: true
          }
        })
        this.option.series = seriesArr
        this.$nextTick().then(() => {
          this.chartInit()
        })
      } else {
        this.showSkeleton = true;
      }
    },
    // 创建类型分析图标所需要的数据
    /**
     * articleCount 篇目数	
     * avageSubmitRate 平均提交率	
     * avageTrueRate 平均正确率	
     * questionTextType 文体类型	
     * questionTextTypeName 文体类型名	
     */
    createTableData (data) {
      if (data&&data.length) {
        data.forEach((item) => {
          let {articleCount, avageTrueRate, avageSubmitRate} = item
          let arr = [articleCount!==undefined?articleCount:'--', avageTrueRate?avageTrueRate+'%':'--', avageSubmitRate?avageSubmitRate+'%':'--']
          this.data.forEach((child, index) => {
            if (child[item.questionTextTypeName] !== undefined) {
              child[item.questionTextTypeName] = arr[index]
            } else {
              child['其他'] = arr[index]
            }
          })
        })
      }
    },
    echartCheckboxChange () {
      if (!this.myChart) {
        return false
      }
      let selected = {}
      this.checkboxData.forEach((item) => {
        selected[item] = this.echartValue.includes(item)
      })
      this.option.legend.selected = selected
      this.chartInit()
    },
    chartInit() {
      this.myChart = echarts.init(document.getElementsByClassName('echarts')[0], 'macarons')
      this.myChart.setOption(this.option)
    },
    changeState() {
      this.viewState = !this.viewState;
    }
  }
};
</script>
