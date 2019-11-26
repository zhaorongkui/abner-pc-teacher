<style scoped lang="scss">
@import '@/styles/variable.scss';
.statistic_area {
  height: calc(100% - 50px);
  flex-direction: column;
}
/* .statistic_area > p {
  position: absolute;
  top: 0;
  height: 20px;
  width: 64px;
  height: 24px;
  border-radius: 12px;
  background: #56ACFF;
  color: #fff;
  line-height: 24px;
  text-align: center;
  font-size: 12px;
} */
.custom_dialog >>> .el-dialog__header {
  border-bottom: 1px solid #ddd;
  padding: 0;
}
.custom_dialog >>> .el-dialog__header div {
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 48px;
  color: #5e84ad;
}
.custom_dialog >>> .el-dialog__body {
  padding: 17px;
  padding-bottom: 0;
}
.composition_student_list ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 470px;
  box-sizing: border-box;
}
.composition_student_list ul li {
  width: 89px;
  height: 29px;
  background: #f7fafe;
  border-radius: 8px;
  font-size: 14px;
  color: #aaa;
  line-height: 29px;
  text-align: center;
  margin-top: 5px;
  margin-right: 5px;
}
.composition_student_list ul li:nth-child(5n) {
  margin-right: 0;
}
/* .remind_btn {
  width: 160px;
  height: 36px;
  border-radius: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(16, 89, 255, 0.27) 0px 3px 4px;
}
.remind_ok_btn {
  width: 160px;
  height: 36px;
  border-radius: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(16, 89, 255, 0.27) 0px 3px 4px;
} */
.dialog-wrap {
  @include wh(100%, 100%);
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  @include fj(center);
  align-items: center;
  .dialog {
    @include wh(500px, auto);
    min-height: 120px;
    background: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    > p {
      @include wh(100%, 48px);
      margin: 0 auto;
      padding: 0 20px;
      @include fj(space-between);
      align-items: center;
      border-bottom: 1px solid #ddd;
      flex: 0 0 48px;
      span {
        @include sc(14px, #5e84ad);
      }
      img {
        @include wh(14px, 14px);
      }
    }
    > div {
      width: 90%;
      margin: 0 auto;
      flex: auto;
      overflow: scroll;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      span {
        height: 20px;
        @include sc(14px, #aaa);
        margin: 20px 20px 10px 0px;
        padding: 0px 10px;
        background: #f7fafe;
        border-radius: 4px;
      }
    }
  }
}
</style>

<template>
  <div class="statistic_area">
    <div id="myChart" :style="{ width: '440px', height: '260px' }"></div>
    <!-- <div id="myCharts" :style="{ width: '440px', height: '260px' }"></div> -->
    <div
      id="myCharts"
      :style="{ width: '440px', height: '260px' }"
      v-if="
        this.questionTypeCode == 1 ||
          this.questionTypeCode == 2 ||
          this.questionTypeCode == 4
      "
    ></div>
    <el-dialog
      class="custom_dialog"
      :visible.sync="showUnfinishedStdModal"
      :append-to-body="true"
      :width="'500px'"
    >
      <div slot="title" v-if="param == '做错'">
        <h4>本题{{ param }}学生{{ errorStudentList.length }}人</h4>
      </div>
      <div slot="title" v-if="param == '半对'">
        <h4>本题{{ param }}学生{{ halfStudentList.length }}人</h4>
      </div>
      <div slot="title" v-if="param == '做对'">
        <h4>本题{{ param }}学生{{ trueStudentList.length }}人</h4>
      </div>
      <div slot="title" v-if="param == '未批阅'">
        <h4>本题{{ param }}学生{{ pendingStudentList.length }}人</h4>
      </div>

      <div class="composition_student_list" v-if="param == '做错'">
        <ul>
          <li v-for="std in errorStudentList" :key="std">{{ std }}</li>
        </ul>
      </div>
      <div class="composition_student_list" v-if="param == '半对'">
        <ul>
          <li v-for="std in halfStudentList" :key="std">{{ std }}</li>
        </ul>
      </div>
      <div class="composition_student_list" v-if="param == '做对'">
        <ul>
          <li v-for="std in trueStudentList" :key="std">{{ std }}</li>
        </ul>
      </div>
      <div class="composition_student_list" v-if="param == '未批阅'">
        <ul>
          <li v-for="std in pendingStudentList" :key="std">{{ std }}</li>
        </ul>
      </div>
      <span slot="footer">
        <!-- <a-button 
          v-if="!isSendRemind" 
          type="primary" 
          @click="handleRemindStd()" 
          class="remind_btn">提醒他们写作业</a-button>
        <a-button 
          v-else 
          type="primary" 
          disabeld
          class="remind_ok_btn">已提醒</a-button> -->
      </span>
    </el-dialog>
    <Dialog
      v-if="showDialog1"
      @toParentsEvent="closes"
      :dataItem="item1"
    ></Dialog>
    <div class="dialog-wrap" v-if="showdialogFlagXx">
      <div class="dialog">
        <p>
          <span
            >本题选{{ param }}的学生
            {{ paramXx.length }}
            人</span
          >
          <img
            src="../../../assets/img/publish/close.png"
            alt=""
            @click="close"
          />
        </p>

        <div>
          <span v-for="(item, index) in paramXx" :key="index">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from '../../../components/Dialog'
import localforage from 'localforage'
export default {
  name: 'customCircleEcharts',
  data() {
    return {
      item1: {},
      questionTypeCode: '',
      param: '',
      paramXx: [],
      showdialogFlagXx: false,
      showUnfinishedStdModal: false,
      showDialog1: false,
      compositionStd: [],
      isSendRemind: false,
      //selecThtype: 0,
      chart: null,
      charts: null,
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}人 {d}%'
        },
        color: [],
        series: [
          {
            type: 'pie',
            radius: ['0%', '57%'],
            label: {
              show: false,
              padding: 10
            },
            labelLine: {
              length: 5,
              length2: 10
            },
            data: []
          },
          {
            type: 'pie',
            radius: ['60%', '62%'],
            data: [],
            label: {
              show: true,
              formatter: '{b}:{c}人 {d}%',
              fontSize: 12
            },
            labelLine: {
              length: 5,
              length2: 10
            }
          }
        ]
      }
    }
  },
  props: ['questiondata', 'selecThtype'],
  computed: {
    errorStudentList() {
      if (this.questiondata.questionTypeCode != 4) {
        if (this.questiondata.errorStudentList.length == 0) {
          return []
        } else {
          return this.questiondata.errorStudentList
        }
      } else {
        if (
          this.questiondata.childInfoList[this.selecThtype].errorStudentList
            .length == 0
        ) {
          return []
        } else {
          return this.questiondata.childInfoList[this.selecThtype]
            .errorStudentList
        }
      }
    },
    trueStudentList() {
      if (this.questiondata.questionTypeCode != 4) {
        if (this.questiondata.trueStudentList.length == 0) {
          return []
        } else {
          return this.questiondata.trueStudentList
        }
      } else {
        if (
          this.questiondata.childInfoList[this.selecThtype].trueStudentList
            .length == 0
        ) {
          return []
        } else {
          return this.questiondata.childInfoList[this.selecThtype]
            .trueStudentList
        }
      }
    },
    halfStudentList() {
      if (this.questiondata.questionTypeCode != 4) {
        if (this.questiondata.halfStudentList.length == 0) {
          return []
        } else {
          return this.questiondata.halfStudentList
        }
      } else {
        if (
          this.questiondata.childInfoList[this.selecThtype].halfStudentList
            .length == 0
        ) {
          return []
        } else {
          return this.questiondata.childInfoList[this.selecThtype]
            .halfStudentList
        }
      }
    },
    pendingStudentList() {
      if (this.questiondata.questionTypeCode != 4) {
        if (this.questiondata.pendingStudentList.length == 0) {
          return []
        } else {
          return this.questiondata.pendingStudentList
        }
      } else {
        if (
          this.questiondata.childInfoList[this.selecThtype].pendingStudentList
            .length == 0
        ) {
          return []
        } else {
          return this.questiondata.childInfoList[this.selecThtype]
            .pendingStudentList
        }
      }
    },
    unSubmitStudentList() {
      if (this.questiondata.questionTypeCode != 4) {
        if (this.questiondata.unSubmitStudentList.length == 0) {
          return []
        } else {
          return this.questiondata.unSubmitStudentList
        }
      } else {
        if (
          this.questiondata.childInfoList[this.selecThtype].unSubmitStudentList
            .length == 0
        ) {
          return []
        } else {
          return this.questiondata.childInfoList[this.selecThtype]
            .unSubmitStudentList
        }
      }
    }
  },
  components: {
    Dialog
  },

  watch: {
    options: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
          } else {
            this.chart.setOption(oldVal)
          }
        } else {
          this.init()
        }
      },
      deep: true
    },
    questiondata: {
      handler(val) {
        this.questionTypeCode = val.questionTypeCode
      },
      deep: true
    }
  },
  mounted() {
    this.questionTypeCode = JSON.parse(
      localStorage.getItem('questionData')
    ).questionTypeCode

    if (this.$route.params.item) {
      this.item1 = this.$route.params.item1
      this.init()
    } else {
      localforage.getItem('workListItem').then(value => {
        this.item1 = value
        this.init()
      })
    }
  },
  methods: {
    closes(val) {
      this.showDialog1 = val
    },
    close() {
      this.showdialogFlagXx = false
    },
    init() {
      this.chart = this.$echarts.init(document.getElementById('myChart'))
      if (
        this.questionTypeCode == 1 ||
        this.questionTypeCode == 2 ||
        this.questionTypeCode == 4
      ) {
        this.charts = this.$echarts.init(document.getElementById('myCharts'))
        var self = this
        this.charts.on('click', function(param) {
          let obj = JSON.parse(localStorage.getItem('objs'))
          Object.keys(obj).forEach(function(key) {
            if (param.name == key) {
              self.param = key
              self.showdialogFlagXx = true
              self.paramXx = obj[key]
            }
          })
        })
      }

      this.chart.setOption(this.options)
      this.chart.on('click', param => {
        if (param.name === '做错') {
          console.log(this.errorStudentList)
          this.param = '做错'
          this.showUnfinishedStdModal = true
        }
        if (param.name === '半对') {
          this.param = '半对'
          this.showUnfinishedStdModal = true
        }
        if (param.name === '做对') {
          this.param = '做对'
          this.showUnfinishedStdModal = true
        }
        if (param.name === '未批阅') {
          this.param = '未批阅'
          this.showUnfinishedStdModal = true
        }
        if (param.name == '未提交') {
          this.showDialog1 = true
        }
        // this.getUnfinishedStd();
      })
    },
    drawPieTop(truerate, errorrate, unsubmit, half, pend) {
      this.options.color = []
      ;(this.options.legend = {
        top: 'top',
        data: ['做对', '做错', '未提交', '半对', '未批阅']
      }),
        (this.options.series[0].data = [])
      this.options.series[1].data = []
      this.options.color.push(
        truerate ? '#13A99F' : '',
        errorrate ? '#FD6265' : '',
        unsubmit ? '#ccc' : '',
        half ? '#FBA057' : '',
        pend != undefined && pend != 0 ? '#8493A8' : ''
      )
      this.options.series[0].data.push(
        truerate != undefined && truerate != 0
          ? {
              value: truerate,
              name: '做对'
            }
          : {},
        errorrate != undefined && errorrate != 0
          ? {
              value: errorrate,
              name: '做错',
              label: {
                formatter: '{b}:{c}人 {d}'
              }
            }
          : {},
        unsubmit != undefined && unsubmit != 0
          ? {
              value: unsubmit,
              name: '未提交'
            }
          : {},
        half != undefined && half != 0
          ? {
              value: half,
              name: '半对'
            }
          : {},
        pend != undefined && pend != 0
          ? {
              value: pend,
              name: '未批阅'
            }
          : {}
      )
      this.options.series[1].data.push(
        truerate != undefined && truerate != 0
          ? {
              value: truerate,
              name: '做对'
            }
          : {},
        errorrate != undefined && errorrate != 0
          ? {
              value: errorrate,
              name: '做错'
            }
          : {},
        unsubmit != undefined && unsubmit != 0
          ? {
              value: unsubmit,
              name: '未提交'
            }
          : {},
        half != undefined && half != 0
          ? {
              value: half,
              name: '半对'
            }
          : {},
        pend != undefined && pend != 0
          ? {
              value: pend,
              name: '未批阅'
            }
          : {}
      )
      // // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById('myChart'))
      // // 绘制图表
      // myChart.setOption()

      // myChart.on('click', (param) => {
      //   if(param.name === '做错') {
      //     this.showUnfinishedStdModal = true;
      //   }
      //   // this.getUnfinishedStd();
      // })
    },
    drawPieBottom(truerate, errorrate, unsubmit, half, pend) {
      this.options.color = []
      ;(this.options.legend = {
        bottom: 'bottom',
        data: ['做对', '做错', '未提交', '半对', '未批阅']
      }),
        (this.options.series[0].data = [])
      this.options.series[1].data = []
      this.options.color.push(
        truerate ? '#13A99F' : '',
        errorrate ? '#FD6265' : '',
        unsubmit ? '#ccc' : '',
        half ? '#FBA057' : '',
        pend != undefined && pend != 0 ? '#8493A8' : ''
      )
      this.options.series[0].data.push(
        truerate != undefined && truerate != 0
          ? {
              value: truerate,
              name: '做对'
            }
          : {},
        errorrate != undefined && errorrate != 0
          ? {
              value: errorrate,
              name: '做错',
              label: {
                formatter: '{b}:{c}人 {d}'
              }
            }
          : {},
        unsubmit != undefined && unsubmit != 0
          ? {
              value: unsubmit,
              name: '未提交'
            }
          : {},
        half != undefined && half != 0
          ? {
              value: half,
              name: '半对'
            }
          : {},
        pend != undefined && pend != 0
          ? {
              value: pend,
              name: '未批阅'
            }
          : {}
      )
      this.options.series[1].data.push(
        truerate != undefined && truerate != 0
          ? {
              value: truerate,
              name: '做对'
            }
          : {},
        errorrate != undefined && errorrate != 0
          ? {
              value: errorrate,
              name: '做错'
            }
          : {},
        unsubmit != undefined && unsubmit != 0
          ? {
              value: unsubmit,
              name: '未提交'
            }
          : {},
        half != undefined && half != 0
          ? {
              value: half,
              name: '半对'
            }
          : {},
        pend != undefined && pend != 0
          ? {
              value: pend,
              name: '未批阅'
            }
          : {}
      )
      // // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById('myChart'))
      // // 绘制图表
      // myChart.setOption()

      // myChart.on('click', (param) => {
      //   if(param.name === '做错') {
      //     this.showUnfinishedStdModal = true;
      //   }
      //   // this.getUnfinishedStd();
      // })
    },
    drawBar(oArr, D, error) {
      //color: ["#13A99F", "#FD6265"],
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myCharts'))
      // 绘制图表
      myChart.setOption({
        legend: {
          data: ['正确选项', '错误选项'],
          bottom: 'bottom'
        },
        color: ['#13A99F', '#FD6265'],
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: oArr,
          name: '选项',
          nameGap: 5,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          name: '人数',
          max: function(val) {
            // console.log(val)
            // let value = val.max
            let number = val.max
            //const mult = Math.pow(10, 1)
            // number = Math.ceil(Number(value) / mult) * mult
            if (number < 10) {
              number = 10
            }
            if (number % 10 == 0) return number + 5
            if (number % 10 > 0) {
              let num = (number % 10) + 5 - (number % 10)
              return num + number
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '正确选项',
            type: 'bar',
            stack: '总数',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: D,
            barWidth: 20
          },
          {
            name: '错误选项',
            type: 'bar',
            stack: '总数',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            barWidth: 20,
            data: error
          }
        ]
      })
    },
    // 未完成作业学生列表
    getUnfinishedStd() {
      this.$http
        .get('/api/teacher/homework/unfinish/students', {
          params: {
            homeworkClassId: this.item1.homeworkClassId
          }
        })
        .then(res => {
          if (res.data.infos.studentList && res.data.infos.studentList.length) {
            this.isSendRemind = !res.data.infos.remind
            this.compositionStd.splice(
              0,
              this.compositionStd.length,
              ...res.data.infos.studentList
            )
            this.showUnfinishedStdModal = true
          } else {
            this.$message.error('已无未完成学生！')
            return false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    // 作文提醒
    // handleRemindStd() {
    //   let arr = [];
    //   this.compositionStd.map(val => {
    //     arr.push(val.studentInfoId)
    //   })
    //   this.$http.post('/api/teacher/homework/remind', {
    //     homeworkClassId: this.item1.homeworkClassId,
    //     studentIds: arr && arr.length ? arr.join(',') : null,
    //     teacherId: this.$store.state.userInfo.teacherId
    //   }).then(res => {
    //     if (res.data.flag == 1) {
    //       this.showUnfinishedStdModal = false
    //       this.$message.success('已经提醒学生去完成作业');
    //       this.showUnfinishedStdModal = false;
    //     }else {
    //       res.data.message ? this.$message.error(res.data.message) : this.$message.error('提醒学生完成作业失败！');
    //       return false;
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // },
  }
}
</script>
