<style scoped>
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
</style>

<template>
  <div class="statistic_area">
    <div id="myChart" :style="{ width: '440px', height: '300px' }"></div>
    <el-dialog
      v-if="errorStudentList && errorStudentList.length"
      class="custom_dialog"
      :visible.sync="showUnfinishedStdModal"
      :append-to-body="true"
      :width="'500px'"
    >
      <div slot="title">
        <h4>本题做错学生{{ errorStudentList.length }}人</h4>
      </div>

      <div class="composition_student_list">
        <ul>
          <li v-for="std in errorStudentList" :key="std">{{ std }}</li>
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
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: 'customCircleEcharts',
  data() {
    return {
      item1: {},
      showUnfinishedStdModal: false,
      compositionStd: [],
      isSendRemind: false,
      selecThtype: 0,
      chart: null,
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}人 {d}%'
        },
        legend: {
          bottom: '0',
          data: ['做对', '做错', '未提交', '半对']
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
  props: ['questiondata'],
  computed: {
    errorStudentList() {
      if (this.questiondata.errorStudentList === '0') {
        return []
      } else {
        return this.questiondata.errorStudentList
      }
    }
  },
  mounted() {
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
    }
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById('myChart'))
      this.chart.setOption(this.options)
      this.chart.on('click', param => {
        if (param.name === '做错') {
          this.showUnfinishedStdModal = true
        }
        // this.getUnfinishedStd();
      })
    },
    drawPie(truerate, errorrate, unsubmit, half) {
      this.options.color = []
      this.options.series[0].data = []
      this.options.series[1].data = []
      this.options.color.push(
        truerate ? '#13A99F' : '',
        errorrate ? '#FD6265' : '',
        unsubmit ? '#ccc' : '',
        half ? '#FBA057' : ''
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