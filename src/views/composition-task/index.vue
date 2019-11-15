<template>
  <div style="width: 1180px;margin: 20px auto;scrollbar-width: none;">
    <div v-show="whiteTop" class="affixTop"></div>
    <a-affix :offsetTop="20" @change="showWhiteTop">
      <div class="tab_list">
        <ul>
          <li
            v-for="(tab, index) in tabLists"
            :key="tab.gradeClassid"
            @click="tabIndex = index"
          >
            <p :style="{ color: tabIndex === index ? '#333' : '#596878' }">
              {{ tab.gradeClassname }}
            </p>
          </li>
        </ul>
        <div
          class="move_line"
          :style="{ left: 20 + tabIndex * 206 + 'px' }"
        ></div>
      </div>
    </a-affix>
    <div class="data_area" v-show="affixed">
      <div class="charts">
        <!-- <img src="../../assets/img/play/blue.png" alt="">
        <img src="../../assets/img/play/yellow.png" alt=""> -->
        <p class="title">作文得分情况</p>
        <div class="chart_area">
          <!-- <img src="../../assets/img/play/nodata.png"> -->
          <div id="myChart" style="width: 410px;height: 285px"></div>
        </div>
        <div class="circle">
          <p class="score" v-if="classAverage">
            {{ classAverage }}<span>分</span>
          </p>
          <p class="score" v-else style="margin-bottom: 10px;">-</p>
          <p class="rate">班级平均分</p>
        </div>
        <div class="circle">
          <p class="score" v-if="submitRate">{{ submitRate }}<span>%</span></p>
          <p class="score" v-else style="margin-bottom: 10px;">-</p>
          <p class="rate">班级提交率</p>
        </div>
      </div>
      <div class="showWall">
        <p class="title">展示墙</p>
        <div class="showWallContent">
          <img src="../../assets/img/play/show_wall.png" />
          <p v-if="lastCreatTime">
            布置作文时间 {{ lastCreatTime | datetimeFormat }}
          </p>
          <p v-else>无数据</p>
        </div>
        <div class="right">
          <span>优秀作文</span>
          <span>{{ wallCount }}篇</span>
          <!-- <a-icon type="right" style="color: #5E84AD"/> -->
          <img
            src="../../assets/img/play/go.png"
            style="width: 9px;height: 14px;"
          />
        </div>
      </div>
    </div>
    <a-affix :offsetTop="90" @change="handleAffixChange">
      <div class="table_area" style="    margin-bottom: 200px;">
        <a-button
          :ghost="!(chooseAnalysisType === 'comp')"
          type="primary"
          style="margin-top: 20px;margin-left: 15px;border-radius: 20px;"
          @click="chooseAnalysis('comp')"
          >作文数据分析</a-button
        >
        <a-button
          :ghost="!(chooseAnalysisType === 'std')"
          type="primary"
          style="margin-left: 20px;border-radius: 20px;"
          @click="chooseAnalysis('std')"
          >学生数据分析</a-button
        >
        <data-table
          ref="datatable"
          :data="analysisData"
          :columns="analysisColumns"
          style="width: 100%;min-height: 400px;padding: 10px 20px 80px;"
        ></data-table>
      </div>
    </a-affix>
  </div>
</template>

<script>
import localforage from 'localforage'
import dataTable from './components/data-table'

const compColumns = [
  {
    title: '作文标题',
    dataIndex: 'compositionTitle',
    align: 'center',
    width: 160
  },
  {
    title: '作文类型',
    dataIndex: 'compositionType',
    align: 'center',
    scopedSlots: { customRender: 'compositionType' },
    width: 160
  },
  {
    title: '文体类型',
    dataIndex: 'compositionRequire',
    align: 'center',
    scopedSlots: { customRender: 'compositionRequire' },
    width: 160
  },
  {
    title: '平均得分',
    dataIndex: 'avgScore',
    align: 'center',
    scopedSlots: { customRender: 'avgScore' },
    width: 170,
    sorter: (a, b) => {
      !a.avgScore || a.avgScore === '0' ? (a.avgScore = 0) : ''
      !b.avgScore || b.avgScore === '0' ? (b.avgScore = 0) : ''
      return Number(a.avgScore) - Number(b.avgScore)
    }
  },
  {
    title: '提交率',
    dataIndex: 'submitRate',
    align: 'center',
    scopedSlots: { customRender: 'submitRate' },
    sorter: true,
    width: 170
  },
  {
    title: '平均写作用时',
    dataIndex: 'avgWriteTime',
    align: 'center',
    scopedSlots: { customRender: 'avgWriteTime' },
    width: 160
  },
  {
    title: '发布时间',
    dataIndex: 'createTime',
    align: 'center',
    scopedSlots: { customRender: 'createTime' },
    sorter: true,
    width: 170
  }
]
const stdColumns = [
  {
    title: '学生姓名',
    dataIndex: 'compositionTitle',
    align: 'center',
    width: 160
  },
  {
    title: '平均得分',
    dataIndex: 'avgScore',
    align: 'center',
    scopedSlots: { customRender: 'avgScore' },
    width: 170,
    sorter: (a, b) => {
      !a.avgScore || a.avgScore === '0' ? (a.avgScore = 0) : ''
      !b.avgScore || b.avgScore === '0' ? (b.avgScore = 0) : ''
      return Number(a.avgScore) - Number(b.avgScore)
    }
  },
  {
    title: '提交率',
    dataIndex: 'submitRate',
    align: 'center',
    scopedSlots: { customRender: 'submitRate' },
    sorter: true,
    width: 170
  },
  {
    title: '互评完成率',
    dataIndex: ' ',
    align: 'center',
    scopedSlots: { customRender: 'submitRate' },
    sorter: true,
    width: 170
  },
  {
    title: '平均写作用时',
    dataIndex: 'avgWriteTime',
    align: 'center',
    scopedSlots: { customRender: 'avgWriteTime' },
    width: 160
  }
]

export default {
  name: 'composition-task',
  data() {
    return {
      pageData: {},
      tabIndex: 0,
      wallCount: 0,
      classAverage: 0,
      submitRate: 0,
      maxList: [],
      minList: [],
      avgList: [],
      timeList: [],
      pointMaxList: [],
      pointMinList: [],
      lastCreatTime: null,
      affixed: true,
      whiteTop: false,
      tabLists: [
        {
          gradeClassname: '三年级一班',
          gradeClassid: 1
        },
        {
          gradeClassname: '三年级二班',
          gradeClassid: 2
        },
        {
          gradeClassname: '三年级三班',
          gradeClassid: 3
        },
        {
          gradeClassname: '三年级四班',
          gradeClassid: 4
        }
      ],
      chooseAnalysisType: 'comp',
      analysisColumns: [],
      analysisData: [],
      options: {
        legend: {
          data: ['平均分', '最高分', '最低分'],
          bottom: 10,
          icon: 'line',
          itemWidth: 15,
          itemHeight: 2,
          textStyle: {
            color: '#797979',
            fontSize: 14
          }
        },
        xAxis: [
          {
            type: 'category',
            // data: ['1/1', '1/2', '1/3', '1/4', '1/5'],
            data: ['8/23', '8/24', '8/26', '8/27', '8/28'],
            axisLabel: {
              color: '#54657E',
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#B4BDC8'
              }
            }
          },
          {
            type: 'category',
            // data: ['1/1', '1/2', '1/3', '1/4', '1/5'],
            data: ['8/23', '8/24', '8/26', '8/27', '8/28'],
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            // name: '分数',
            max: 50,
            min: 0,
            boundaryGap: [0.2, 0.2],
            splitLine: {
              lineStyle: {
                color: '#CAD3DF'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#B4BDC8'
              }
            },
            axisLabel: {
              color: '#54657E',
              fontSize: 14
            }
          },
          {
            type: 'value',
            scale: true,
            name: '分数',
            max: 50,
            min: 0,
            boundaryGap: [0.2, 0.2],
            show: false
          }
        ],
        series: [
          {
            name: '平均分',
            type: 'bar',
            barWidth: '20px',
            label: {
              normal: {
                show: true,
                position: 'insideBottom'
              }
            },
            itemStyle: {
              color: '#70C1B3',
              barBorderRadius: [3, 3, 0, 0]
            },
            data: [0, 0, 0, 0, 0]
            // data: []
          },
          {
            name: '最高分',
            type: 'line',
            itemStyle: {
              color: '#56ACFF',
              borderWidth: 3
            },
            symbol: 'emptyCircle',
            symbolSize: [9, 9],
            data: [36, 50, 0, 0, 0],
            // data: [],
            markPoint: {
              symbol:
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAC+klEQVRoQ+2aTUgUYRjH/89spoTRetCD4kH6IKRDUUHUtVNQaDv7gacSSugQBB46eDDBW9ElQsw+LkI74672AUEXLwVp0SHw0qFjVBAEhpW7O/94R2fZVNx3h11xp5nDssw8zzP/3/t/Zt5l31dQciSzPOA4SAlwhECbAI2l17f9d8EyiW9CzOcFj7OmfFqrWdwTpMSz6BdiAICx7cF0BAoK4uBe2sR9iNBLcYGTNgcouKRTpw5jJixTxorAcYtdYiAdGGfXO+LkgZTX3pLIcAhETx06py2ZwLRtyqhKkMQUnwJo186uz8DPlinnXOD4FN8IsKM+OfRUE8jbppzwHH6nl1bfUZYpx0Lg+vZwc/Whw0F2V7GFDocOB2wEwpYOmKHrcEKHQ4cDNgJhSwfM0PClFbZ02NIBG4GwpQNmaPiW/o9bOsM5EJFAt7Rg2YrJSe9vWrWutDfQwMBHy5Q+Fzhp8woF/QEHLq4gSs80ow0FTAuwO4jQBBZzEfTO9MoP12H1kcjwFIlbQVtjUmtKcDBoJ+SVZ+bKDgC1KJ7hcToYgaA1EE4TX8TAjXRM3pbyFIHVyQsP2fSrGadp4CjUHg+udIDOQaIDgg6d2IpiBB+E+K2TQwFJfIWB+Z9NmH1xRv6szdMGKnfDuMU9EsEYiP3lYnWvC/EgHZe7uvE6cVUDVjfrm2RLfifGIejSuXmZmEnLlNtVqPNPiaoCq8pxi61iYBxAp1+xBNJ2DDdLd9/4rVWzli4t3JtlW4ODCV9bKQQz1nmM1gJWaay6wx546gnbCzlMCNCm7Q7xvHsBI8PD4mjnVBhYM2ClIzXDTifnPtPlpzriZfcChmoJW1OHvYFf3QemnumWTcyYpYPrdkIKFRpWcXhNHS6B3gcDYwJEN1D4Ovodg+MDkqtYvY+ELQFWumJTPBgRd55uLuoUzLGAa3ZCln1o95WyZcBKXTLLQyTurEK/37WIq48uitavKF90GyRtKfDqPH3YMHB5qRGDz87KUrVAdOv8BfeOLEBBz/YBAAAAAElFTkSuQmCC',
              symbolSize: [30, 24],
              symbolOffset: [0, -20],
              data: []
              // data: []
            }
          },
          {
            name: '最低分',
            type: 'line',
            itemStyle: {
              color: '#FF9948',
              borderWidth: 3
            },
            symbol: 'emptyCircle',
            symbolSize: [9, 9],
            data: [36, 50, 0, 0, 0],
            // data: [],
            markPoint: {
              symbol:
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA0CAYAAADWr1sfAAAC/0lEQVRoQ+2aP2hTURSHv/NiWwcpVGmt1D+g0sHBoQpFBwcRm7QgLoK6SW0SHRwUKi6lUgddHBRr8qKDi1RBKCLmLaJ0EKoVXBVcrVhw6NTW9h1J2saktc0NJtHbvjdkye/cd777vT+BHGGdHbLOeCkA1kRkH8JpRA+gNKI4Vm2I4CNMgIwyq0/kovdpaf9ZYFUENxwFuq2DXMlIBh4eEvVcEXQxNg/sRnrwNWaVTfNmXYl7bg5YB7t2E5obWjNml1/DPsgZiaW/ZL4SdSN9+HrCfMOsTA5L3LsxD5wMv0BpthLDtGnhq8S8rFTRRHjMtM7anMOcRL329QOcMRv3DgbA1l6yBo0Hhg02yepIYNhqfQbNB4YNNsnqSGDYan0GzQeGDTbJ6khg2Gp9Bs0Hhg02yepIYNhqfQbNB4YNNsnqSGDYan0Gzf827IZH8QkZ1NgbEWYk5h1e+OehYwiVvfbSGHTu8Fmi3tkF4MgFVLsNyuyNCCmJecl54DuReup0GKXeXqJVOhcmmZaTcik9mQXOfGii8wj4t4CaNQUtOouGeiX+cmSRKzfyoMmONkQG8Nm6JqCFbwjXJeq9z+cpnPF4eqqWH5NHEdqARqDOHF5aUFrM84ZJh4+ozhimpyEz4+GMwffXEvvwc2ld2aZ4ss+CjZrAp9WwOZNYwbiCSUGxTNmAs8+Cwa4GnLkEsKfYiYt/L48knr5bPFdaoqzAWegHHZuZkxTKrtJaKUg/lrh3+y/qVywtO3AW+v7xJhxJorKj5KYdntHj3cwfNSp5jVXfUuVcLW8tvdfZTEhToNuMT+HIc3rSA5WCzb2HjRsqMaipyHZ830WlqWipqMf4oT7p788MlFXsqMglnd+tJo/thA2Ze3rLyjeWvGK8/VqlYStueBFwYfgtidKwDFoYgYmrf3pnVkJzxQ3noN3OVtRPFPxmd3iLTlypFmzVDOegs9O6OoiyCdF31E5flnNvpiphcqU1q2Y4B50K70c5T81Ub7Vhq264mib/G8P/GvoXLpMqRLQEepkAAAAASUVORK5CYII=',
              symbolSize: [30, 24],
              symbolOffset: [0, -20],
              data: []
              // data: [],
            }
          }
        ]
      }
    }
  },
  components: {
    dataTable
  },
  filters: {
    datetimeFormat(val) {
      if (!val) {
        return ''
      }
      let time1 = new Date(val)
      let year = time1.getFullYear()
      let month = time1.getMonth() + 1
      let day = time1.getDate()
      let hour = time1.getHours()
      let minute = time1.getMinutes()
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      return `${year}/${month}/${day} ${hour}:${minute}`
    }
  },
  mounted() {
    this.getClass()
    // if(this.$route.params.record) {
    // this.pageData = this.$route.params.record;
    // console.log(this.pageData);
    // this.appeal = this.pageData.homeworkAppealType
    // // this.fetchStudentCompositionTitle();
    // this.fetchTeacherData();
    // this.fetchStudentData();
    // this.pageData.displayWallId ? this.chooseThisComposition = true : '';
    // this.$nextTick(() => {
    //   let userVoice = document.getElementById('userVoicePlay');
    //   userVoice.addEventListener('ended', () => {
    //     this.playFlag = false;
    //     this.isPlay = false;
    //   })
    //   userVoice.addEventListener('pause', () => {
    //     this.playFlag = false;
    //     this.isPlay = false;
    //   })
    // })
    // }else {
    // this.initChart();

    localforage.getItem('compositionStdInfo').then(res => {
      localforage.getItem('workListItem').then(response => {
        console.log(res, response)
        this.pageData = Object.assign({}, response)
        this.getChartData()
        // this.fetchCompData()
        // this.appeal = this.pageData.homeworkAppealType
        // // this.fetchStudentCompositionTitle();
        // this.fetchTeacherData();
        // this.fetchStudentData();
        // this.pageData.displayWallId ? this.chooseThisComposition = true : '';
        // this.$nextTick(() => {
        //   let userVoice = document.getElementById('userVoicePlay');
        //   userVoice.addEventListener('ended', () => {
        //     this.playFlag = false;
        //     this.isPlay = false;
        //   })
        //   userVoice.addEventListener('pause', () => {
        //     this.playFlag = false;
        //     this.isPlay = false;
        //   })
        // })
      })
    })
    // }
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.options)
    },
    getClass() {
      this.$http
        .get('/api/teacher/getClass', {
          params: {
            teacherId: this.$store.state.userInfo.teacherId
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.flag === 1) {
            let data = res.data.infos
            // console.log(data);
            // this.tabLists.splice(0, this.tabLists.length, ...data)
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取班级数据失败！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getChartData() {
      this.$http
        .get('/api/teacher/homework/compositionTask/classScore', {
          params: {
            gradeClassId: this.pageData.gradeClassid,
            teacherId: this.$store.state.userInfo.teacherId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            let data = res.data.infos
            let list = data.maxMinScoreList
            let res1 = new Map()
            let mapData = list
              .filter(
                a => !res1.has(a['creatTime']) && res1.set(a['creatTime'], 1)
              )
              .splice(6, 5)
            mapData.map(val => {
              this.maxList.push(Number(val.maxScore))
              this.minList.push(Number(val.minScore))
              this.avgList.push(
                Number(val.avgScore) > 100 ? 50 : Number(val.avgScore)
              )
              this.timeList.push(this.dateFormat(val.creatTime))
            })

            this.maxList.map((val, index) => {
              this.pointMaxList.push({
                name: this.timeList[index],
                value: val,
                yAxis: val,
                xAxis: this.timeList[index]
              })
            })
            this.minList.map((val, index) => {
              this.pointMinList.push({
                name: this.timeList[index],
                value: val,
                yAxis: val,
                xAxis: this.timeList[index]
              })
            })
            this.options.xAxis[0].data = this.timeList
            this.options.xAxis[1].data = this.timeList
            this.options.series[0].data = this.avgList
            this.options.series[1].data = this.maxList
            this.options.series[2].data = this.minList
            this.options.series[1].markPoint.data = this.pointMaxList
            this.options.series[2].markPoint.data = this.pointMinList

            this.wallCount = data.displayWallCount
            this.classAverage = data.avgScore
            this.submitRate = data.submitRate
            this.lastCreatTime = data.lastCreatTime
            this.$nextTick(() => {
              this.initChart()
            })
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取图表数据失败！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    dateFormat(val) {
      let time1 = new Date(val)
      let month = time1.getMonth() + 1
      let day = time1.getDate()
      month = month < 10 ? `${month}` : month
      day = day < 10 ? `${day}` : day
      return `${month}/${day}`
    },
    chooseAnalysis(type) {
      this.chooseAnalysisType = type
      if (type === 'comp') {
        this.fetchCompData()
      } else {
        this.fetchStdData()
      }
    },
    // 获取作文数据分析
    fetchCompData() {
      this.$http
        .get('/api/teacher/homework/compositionTask/dataAnalysis', {
          params: {
            gradeClassId: this.pageData.gradeClassid,
            teacherId: this.$store.state.userInfo.teacherId
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.flag === 1) {
            let data = res.data.infos
            // console.log(data);
            this.analysisColumns = compColumns
            this.analysisData.splice(0, this.analysisData.length, ...data)
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取图表数据失败！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取学生数据分析
    fetchStdData() {
      this.$http
        .get('/api/teacher/homework/compositionTask/studentAnalysis', {
          params: {
            gradeClassId: this.pageData.gradeClassid,
            teacherId: this.$store.state.userInfo.teacherId
          }
        })
        .then(res => {
          // console.log(res);
          if (res.data.flag === 1) {
            let data = res.data.infos
            // console.log(data);
            this.analysisColumns = stdColumns
            this.analysisData.splice(0, this.analysisData.length, ...data)
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取图表数据失败！')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // handleClassClick(classId) {
    //   console.log(classId);
    //   console.log(this.tabIndex);
    //   // tabIndex = tab.gradeClassid
    // },
    // 吸顶  隐藏图表区域
    handleAffixChange(affixed) {
      this.affixed = !affixed
      if (affixed) {
        this.$refs.datatable.scroll = document.body.offsetHeight - 235
      } else {
        this.$refs.datatable.scroll = '100%'
      }
    },
    // 吸顶  增加白色顶部
    showWhiteTop(affixed) {
      this.whiteTop = affixed
    }
  }
}
</script>

<style scoped>
.tab_list {
  width: 100%;
  height: 70px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(186, 213, 238, 0.29);
  position: relative;
}
.tab_list ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
}
.tab_list ul > li {
  padding: 0 60px 0 45px;
  font-size: 20px;
  border-right: 1px solid #e9e9e9;
  height: 30px;
  margin-top: 20px;
}
.tab_list ul > li:first-child {
  padding-left: 20px;
}
.tab_list ul > li:last-child {
  border: 0;
}
.tab_list ul > li p {
  cursor: pointer;
  width: 100px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.move_line {
  width: 100px;
  height: 2px;
  background: #006dff;
  position: absolute;
  bottom: 0;
  transition: left 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.data_area {
  width: 100%;
  margin-top: 10px;
  display: flex;
}
.data_area .charts {
  width: 860px;
  /* height: 280px; */
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(186, 213, 238, 0.29);
}
.charts {
  padding: 20px 14px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 45px 0 25px;
}
.charts .chart_area {
  /* height: 185px; */
  display: flex;
  align-items: center;
}
.charts img {
  width: 394px;
  height: 124px;
}
.data_area .showWall {
  width: 310px;
  margin-left: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(186, 213, 238, 0.29);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}
.showWall > div.showWallContent > img {
  width: 213px;
  height: 154px;
}
.table_area {
  background: #fff;
  margin-top: 14px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(186, 213, 238, 0.29);
}
.circle {
  width: 120px;
  height: 120px;
  background: url(../../assets/img/play/circle_bg.png);
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.circle p.score {
  color: #333;
  font-size: 32px;
  line-height: 25px;
}
.circle p.score span {
  font-size: 16px;
}
.circle p.rate {
  font-size: 14px;
  color: #969696;
  line-height: 20px;
}
.charts .title,
.showWall .title {
  padding-left: 10px;
  font-size: 14px;
  color: #5e84ad;
  border-left: 4px solid #0610a8;
  position: absolute;
  top: 20px;
  left: 14px;
}
.showWall > .showWallContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.showWallContent > p {
  font-size: 14px;
  color: #4e5f71;
  margin-top: 10px;
}
.showWall > .right {
  position: absolute;
  right: 17px;
  top: 23px;
  font-size: 14px;
}
.right > span:first-child {
  color: #4e5f71;
  margin-right: 9px;
}
.right > span:nth-child(2) {
  color: #1059ff;
  margin-right: 9px;
}
.affixTop {
  width: 100%;
  height: 20px;
  background: #f0f7ff;
  position: fixed;
  top: 0;
  z-index: 99;
}
</style>