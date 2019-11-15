<template>
  <div style="height: 100%;overflow: auto;" ref="tableArea">
    <a-table
      class="hwd-table-question-list"
      :columns="homeworkColumns"
      :dataSource="homeworkData"
      :pagination="false"
      :scroll="{ y: scroll }"
      :customRow="onClick"
    >
      <template slot="homeworkAppealType" slot-scope="text, record">
        <span v-if="record.homeworkAppealType === 2"></span>
        <img
          v-if="record.homeworkAppealType === 1"
          src="../../../assets/img/grading-assignment/appeal.png"
          style="width: 30px;height: 30px;"
        />
        <img
          v-if="record.homeworkAppealType === 3"
          src="../../../assets/img/grading-assignment/appealOK.png"
          style="width: 30px;height: 30px;"
        />
      </template>
      <span class="progress_box" slot="reviewCounted" slot-scope="text, record">
        <!-- <span>已互评</span> -->
        <div class="progress">
          <span
            :style="{ color: record.reviewCounted > 0 ? '#fff' : '#333' }"
            >{{ record.reviewCounted }}</span
          >
          <span
            class="progress_value"
            :style="{
              width:
                (record.reviewCounted / record.studentReviewCount) * 100 + '%'
            }"
          ></span>
        </div>
        <span
          ><span style="color: #333">{{
            record.studentReviewCount - record.reviewCounted
          }}</span
          >人 未互评</span
        >
      </span>
      <span slot="submitTime" slot-scope="text, record">
        <span v-if="record.submitTime">{{
          record.submitTime | getFormatDate
        }}</span>
        <span v-else>-</span>
      </span>
    </a-table>
  </div>
</template>

<script>
import localforage from 'localforage'
import http from '../../../api/index'
export default {
  name: 'CompositionTable',
  data() {
    return {
      item: {},
      scroll: 0,
      homeworkColumns: [
        {
          title: ' ',
          dataIndex: 'homeworkAppealType',
          align: 'center',
          scopedSlots: { customRender: 'homeworkAppealType' },
          width: 50
        },
        {
          title: '姓名',
          dataIndex: 'studentName',
          align: 'center',
          scopedSlots: { customRender: 'studentName' },
          width: 115
        },
        {
          title: '被互评次数',
          dataIndex: 'reviewCounted',
          align: 'center',
          scopedSlots: { customRender: 'reviewCounted' },
          width: 373
        },
        {
          title: '得分',
          dataIndex: 'totalScore',
          align: 'center',
          scopedSlots: { customRender: 'reviewCounted' },
          customRender: (text, record, index) => {
            if (record.submitType === 3) {
              if (record.reviewType === 0) {
                return <span>-</span>
              } else {
                return <span>{record.totalScore}</span>
              }
            } else {
              return <span>-</span>
            }
          },
          sorter: (a, b) => {
            let totalScore1 = a.totalScore ? a.totalScore : 0
            let totalScore2 = b.totalScore ? b.totalScore : 0
            return Number(totalScore1) - Number(totalScore2)
          },
          width: 184
        },
        {
          title: '提交时间',
          dataIndex: 'submitTime',
          scopedSlots: { customRender: 'submitTime' },
          align: 'center',
          sorter: (a, b) => {
            !a.submitTime ? (a.submitTime = 0) : ''
            !b.submitTime ? (b.submitTime = 0) : ''
            return a.submitTime - b.submitTime
          },
          width: 244
        },
        {
          title: '作业状态',
          dataIndex: 'submitType',
          align: 'center',
          scopedSlots: { customRender: 'submitType' },
          customRender: (text, record, index) => {
            let val = record.status ? Number(record.status) : 0
            switch (val) {
              case 0:
                return <span style="color: #FF6365;">未提交</span>
                break
              case 1:
                return <span style="color: #333;">教师已批</span>
                break
              case 2:
                return <span style="color: #333;">学生已批</span>
                break
              case 3:
                return <span style="color: #1059FF;">待批阅</span>
                break
              default:
                return <span style="color: #333;">-</span>
                break
            }
            // if (record.submitType === 1 || record.submitType === 2) {
            //   return <span style="color: #FF6365;">未提交</span>
            // }
            // if (record.submitType === 3) {
            //   if (record.reviewType === 0) {
            //     return <span style="color: #1059FF;">待批阅</span>
            //   } else if (record.reviewType === 1) {
            //     return <span style="color: #333;">教师已批</span>
            //   } else if (record.reviewType === 2) {
            //     return <span style="color: #333;">学生已批</span>
            //   } else if (record.reviewType === 4) {
            //     return <span style="color: #333;">教师已批</span>
            //   } else {
            //     return <span>-</span>
            //   }
            // }
          },
          width: 136
        }
      ],
      homeworkData: []
    }
  },
  components: {},
  filters: {
    getFormatDate(val) {
      if (!val) {
        return '-'
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
    localforage.getItem('workListItem').then(value => {
      this.item = value
      console.log(value)
      this.fetchMarkingListData()
      this.getTableHeight()
      window.onresize = () => {
        this.getTableHeight()
      }
    })
  },
  methods: {
    getTableHeight() {
      this.scroll = this.$refs.tableArea.offsetHeight - 54
    },
    // 点击行
    onClick(record, index) {
      return {
        on: {
          click: () => {
            if (record.submitType !== 3 || record.status === 0) {
              this.$message.error('该学生还未提交作业')
              return false
            }
            let receiveData = Object.assign(record, this.item)
            console.log(record, this.item)
            localforage.setItem('compositionStdInfo', receiveData).then(() => {
              this.$router.push({
                name: 'work-composition-detail',
                params: { record: receiveData }
              })
            })
          }
        }
      }
    },
    // 获取批阅进度列表
    fetchMarkingListData() {
      http
        .get('/api/teacher/homework/compositionStudentList', {
          params: {
            homeworkClassId: this.item.homeworkClassId
            // sortColumn: 'TOTAL_SCORE', //TOTAL_SCORE分数排序 SUBMIT_TIME提交时间
            // sortRule: 'ASC' //正序ASC，倒序DESC
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            let originalData = res.data.infos
            originalData.map(val => {
              let obj = {
                homeworkAppealType: val.homeworkAppealType,
                homeworkClassId: val.homeworkClassId,
                homeworkStudentId: val.homeworkStudentId,
                studentInfoId: val.studentInfoId,
                studentAnswerId: val.studentAnswerId,
                studentName: val.studentName,
                reviewCounted: val.reviewCounted,
                studentReviewCount: val.studentReviewCount,
                totalScore: val.totalScore,
                submitTime: val.submitTime,
                submitType: val.submitType,
                reviewType: val.reviewType
              }
              let status = 0
              // if (val.submitType === 1 || val.submitType === 2) {
              //   status = 3
              // }
              if (val.submitType === 3) {
                if (val.reviewType === 0) {
                  status = 3
                } else if (val.reviewType === 1 || val.reviewType === 4) {
                  status = 1
                } else if (val.reviewType === 2) {
                  status = 2
                }
              }
              obj.status = status
              this.homeworkData.push(obj)
            })
            this.homeworkData.sort((a, b) => {
              return b.status - a.status
            })
            // this.homeworkData.splice(
            //   0,
            //   this.homeworkData.length,
            //   ...res.data.infos
            // )let flag = true;
            // this.homeworkData.map(val => {
            //   if(val.status !== 0) {
            //     flag = false
            //   }
            // })
            // flag ? this.$emit('btnhide') : '';
            // let flag1 = true;
            // this.homeworkData.map(val => {
            //   if(val.reviewCounted !== val.studentReviewCount) {
            //     flag1 = false;
            //   }
            // })
            // flag1 ? this.$emit('btnhide') : '';
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取学生列表失败！')
          }
        })
        .catch(err => {
          this.$message.error('获取学生列表失败！')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.custom_dialog >>> .el-dialog {
  height: 320px;
  position: relative;
}
.custom_dialog >>> .el-dialog__header {
  border-bottom: 1px solid #ddd;
  padding: 0;
}
.custom_dialog >>> .el-dialog__header div {
  width: 100%;
  text-align: left;
  padding-left: 23px;
  font-size: 14px;
  line-height: 48px;
}
.custom_dialog >>> .el-dialog__header h4 {
  color: #5e84ad;
  font-size: 14px;
}
.custom_dialog >>> .el-dialog__body {
  padding: 0;
}
.custom_dialog >>> .el-dialog__body p {
  text-align: center;
  font-size: 17px;
  color: rgb(61, 77, 101);
  margin-top: 71px;
  margin-bottom: 45px;
}
.custom_dialog >>> .el-dialog__body img {
  position: absolute;
  width: 452px;
  height: 124px;
  bottom: 0;
  left: 0;
}
.progress_box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.progress {
  width: 130px;
  height: 12px;
  background: #e8f0fb;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content: space-between;
  line-height: 12px;
  font-size: 12px;
  padding: 0 5px;
  margin: 0 5px;
  color: #333;
}
.progress span:first-child,
.progress span:last-child {
  z-index: 99;
}
.progress .progress_value {
  width: 20px;
  background: blue;
  border-radius: 6px;
  position: absolute;
  left: 0;
  height: 12px;
}
</style>