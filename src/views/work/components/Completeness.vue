<template>
  <div class="process-bar">
    <span>{{ item.homeworkType === 6 ? '已提交' : '已完成' }}</span>
    <div class="process">
      <div
        class="bar"
        :style="{ width: (finishStudentNum / studentNum) * 100 + '%' }"
      >
        {{ finishStudentNum }}
        <!--(finishStudentNum / studentNum) * 100 + '%'-->
      </div>
      <span class="unfinished-count">{{ studentNum - finishStudentNum }}</span>
    </div>
    <span v-if="studentNum === finishStudentNum">{{
      item.homeworkType === 6 ? '未提交' : '未完成'
    }}</span>
    <span v-else @click="handleUnfinished" class="active"
      >{{ item.homeworkType === 6 ? '未提交' : '未完成' }}<a-icon type="right"
    /></span>
    <div class="revocation-model" v-if="isShowUnfinished">
      <div class="revocation">
        <header>
          <span>未完成人数{{ studentIds.length }}</span
          ><span><a-icon @click="handleHideUnfinished" type="close"/></span>
        </header>
        <div class="content">
          <ul class="list">
            <li
              class="item"
              v-for="(student, index) of studentIds"
              :key="index"
            >
              {{ student.studentName }}
            </li>
          </ul>
        </div>
        <div class="footer">
          <button v-if="remind === 1" @click="handleConfirm">
            提醒他们做作业
          </button>
          <a-button v-else class="disabled">提醒他们做作业</a-button>
        </div>
      </div>
    </div>

    <el-dialog
      class="custom_dialog"
      :visible.sync="showUnfinishedStdModal"
      :append-to-body="true"
      :width="'500px'"
    >
      <div slot="title">
        <h4>未完成学生{{ compositionStd.length }}人</h4>
      </div>

      <div class="composition_student_list">
        <ul>
          <li v-for="std in compositionStd" :key="std.studentInfoId">
            {{ std.studentName }}
          </li>
        </ul>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
        style="display: flex;justify-content: center;"
      >
        <a-button
          v-if="!isSendRemind"
          type="primary"
          @click="handleRemindStd()"
          class="remind_btn"
          >提醒他们写作文</a-button
        >
        <a-button v-else type="primary" disabled class="remind_ok_btn">{{
          text
        }}</a-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['finishStudentNum', 'studentNum', 'item'],
  data() {
    return {
      isShowUnfinished: false,
      remind: 0,
      showUnfinishedStdModal: false,
      isSendRemind: false,
      studentIds: [],
      compositionStd: [],
      text: ''
    }
  },
  methods: {
    handleUnfinished() {
      if (this.item.homeworkType === 6) {
        this.text = '已提醒'
        this.$http
          .get('/api/teacher/homework/unfinish/students', {
            params: {
              homeworkClassId: this.item.homeworkClassId
            }
          })
          .then(res => {
            console.log(res)
            if (res.data.flag === 1) {
              res.data.infos.remind === 1
                ? (this.isSendRemind = false)
                : (this.isSendRemind = true)
              this.compositionStd.splice(
                0,
                this.compositionStd.length,
                ...res.data.infos.studentList
              )
              this.showUnfinishedStdModal = true
            } else {
              res.data.message
                ? this.$message.error(res.data.message)
                : this.$message.error('获取作文未完成学生失败！')
            }
          })
          .catch(err => {
            this.$message.error('获取作文未完成学生失败！')
            console.log(err)
          })
        return false
      } else {
        this.text = '提醒他们做作业'
      }
      this.isShowUnfinished = true
      this.$store.commit('work/UPDATECURRENTPAGE', 1)
      this.$http
        .get('/api/teacher/homework/unfinish/students', {
          params: {
            homeworkClassId: this.item.homeworkClassId
          }
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.studentIds = data.infos.studentList
            this.remind = data.infos.remind
          }
        })
    },
    // 作文提醒
    handleRemindStd() {
      let arr = []
      this.compositionStd.map(val => {
        arr.push(val.studentInfoId)
      })
      this.$http
        .post('/api/teacher/homework/remind', {
          homeworkClassId: this.item.homeworkClassId,
          studentIds: arr && arr.length ? arr.join(',') : null,
          teacherId: this.$store.state.userInfo.teacherId
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.showUnfinishedStdModal = false
            this.$message.success('已经提醒学生去完成作业')
          }
        })
    },
    handleHideUnfinished() {
      this.isShowUnfinished = false
    },
    handleConfirm() {
      if (this.remind === 0) {
        this.isShowUnfinished = false

        this.$message.info('已经提醒学生去完成作业')
        return
      }
      let selectedStudents = []
      this.studentIds.forEach(item => {
        selectedStudents.push(item.studentInfoId)
      })
      this.$http
        .post('/api/teacher/homework/remind', {
          homeworkClassId: this.item.homeworkClassId,
          studentIds: selectedStudents.join(','),
          teacherId: this.$store.getters.textbookId
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.isShowUnfinished = false
            this.$message.success('已经提醒学生去完成作业')
            this.$store.dispatch('work/homeworkList')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.process-bar {
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 30px;
  &:not(:last-child) {
    margin-bottom: 28px;
  }
  span {
    margin: 0 10px;
  }
  .process {
    width: 114px;
    height: 14px;
    background-color: #e8f0fb;
    position: relative;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
    .bar {
      width: 30%;
      height: 14px;
      line-height: 14px;
      background-color: #56acff;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
    }
    .unfinished-count {
      height: 14px;
      line-height: 14px;
      position: absolute;
      top: 0;
      right: -8px;
      z-index: 99;
      color: #aaaaaa;
    }
  }
}
.active {
  color: #1059ff;
  cursor: pointer;
}
.revocation-model {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .revocation {
    width: 500px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      width: 100%;
      flex: 0 0 48px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      span:nth-child(2) {
        cursor: pointer;
      }
    }
    .content {
      float: auto;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          flex: 0 0 90px;
          height: 30px;
          background: #f7fafe;
          color: #aaa;
          border-radius: 8px;
          line-height: 30px;
          text-align: center;
          margin: 5px;
        }
      }
    }
    .footer {
      flex: 0 0 64px;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      button {
        width: 160px;
        height: 36px;
        background: #1059ff;
        color: #fff;
        border: 1px solid rgba(16, 89, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
        border-radius: 18px;
        outline: none;
      }
      .disabled {
        background: #ddd;
        color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0px 5px 8px 0px #eee;
        outline: none;
      }
    }
  }
}
</style>

<style scoped>
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
.remind_btn {
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
  box-shadow: #ddd 0px 3px 4px;
  background: #ddd;
  border: 0;
  color: #fff;
}
</style>