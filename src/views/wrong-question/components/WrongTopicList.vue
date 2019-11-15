<template>
  <div class="wrong-topic-list">
    <ul class="list">
      <li class="item">
        <span>姓名</span>
        <span
          >总数<span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'ERROR_COUNT' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('ERROR_COUNT', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'ERROR_COUNT' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('ERROR_COUNT', 'Desc')"
            ></i>
          </span>
        </span>
        <span
          >已修改<span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'EXAMINE_COUNT' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('EXAMINE_COUNT', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'EXAMINE_COUNT' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('EXAMINE_COUNT', 'Desc')"
            ></i> </span
        ></span>
        <span
          >已发布<span class="sort">
            <i
              class="sort-caret ascending"
              :class="
                sortColumn === 'PUBLISH_HOMEWORK_COUNT' && sortRule === 'Asc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('PUBLISH_HOMEWORK_COUNT', 'Asc')"
            ></i>
            <i
              class="sort-caret descending"
              :class="
                sortColumn === 'PUBLISH_HOMEWORK_COUNT' && sortRule === 'Desc'
                  ? 'active'
                  : ''
              "
              @click="handleSort('PUBLISH_HOMEWORK_COUNT', 'Desc')"
            ></i> </span
        ></span>
        <span>
          <button
            :disabled="isAllSend === '1'"
            class="one-key"
            @click="handleShowNotice"
          >
            <span>
              <img
                src="../../../assets/img/ic_wrongbook_onekey@2x.png"
                alt=""
              />
            </span>
            <span>一键提醒</span>
          </button>
        </span>
      </li>
      <li
        class="item"
        v-for="(item, index) of questionList"
        :key="index"
        @click="handleGoDetail(item)"
      >
        <span>{{ item.studentName }}</span>
        <span>{{ item.errorCount || 0 }}</span>
        <span>{{ item.examineCount || 0 }}</span>
        <span>{{ item.publishHomeworkCount || 0 }}</span>
        <span>
          <template v-if="!item.remindTime">
            <button
              v-if="
                item.errorCount -
                  item.examineCount -
                  item.publishHomeworkCount >
                  0
              "
              class="btn active"
              @click.stop="handleNotice(item)"
            >
              提醒
            </button>
            <button v-else class="btn" disabled>
              提醒
            </button>
          </template>
          <button
            v-else
            class="btn"
            @click.stop="handleNoticed(item.studentName)"
          >
            已提醒
          </button>
        </span>
      </li>
    </ul>
    <el-dialog
      title="提醒学生回顾错题"
      :visible.sync="dialogVisible"
      width="500px;"
    >
      <ul class="dialog-content">
        <li
          class="item"
          :class="gradeClassIds.includes(item.gradeClassid) ? 'active' : ''"
          v-for="(item, index) of classes"
          :key="index"
          @click="handleSelectGrade(item.gradeClassid)"
        >
          <span>{{ item.gradeClassname }}</span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <button class="cancel" @click="dialogVisible = false">
          取消提醒
        </button>
        <button class="ok" type="primary" @click="handleAllNotice">
          一键提醒
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: 'wrong-topic-list',
  components: {},
  data() {
    return {
      dialogVisible: false,
      gradeClassIds: [],
      allClassesInfo: [],
      wrongClasses: []
    }
  },
  computed: {
    isAllSend() {
      return this.$store.state.question.isAllSend
    },
    questionList() {
      return this.$store.state.question.questionList
    },
    sortColumn() {
      return this.$store.state.question.sortColumn
    },
    sortRule() {
      return this.$store.state.question.sortRule
    },
    classes() {
      return this.$store.state.userInfo.classes
    },
    currentPage() {
      return this.$store.state.question.currentPage
    },
    loadmore() {
      return this.$store.state.question.loadmore
    },
    teacherId() {
      return this.$store.state.userInfo.teacherId
    },
    textbookId() {
      return this.$store.state.userInfo.textbookId
    }
  },
  methods: {
    // 排序
    handleSort(sortColumn, sortRule) {
      this.$store.commit('question/UPDATESORT', {
        sortColumn: sortColumn,
        sortRule: sortRule
      })
      this.$store.dispatch('question/wrongQuestionList')
    },
    handleNotice(item) {
      if (item.remindTime) {
        this.$message.info(`${item.studentName}错题回顾已提醒`)
        return
      }
      if (
        item.errorCount - item.examineCount - item.publishHomeworkCount ===
        0
      ) {
        this.$message.info(`${item.studentName}已修改完全部错题`)
        return
      }
      this.$store
        .dispatch('question/sentRemind', {
          studentId: item.studentInfoId
        })
        .then(data => {
          if (data.flag === 1) {
            this.$message.success(`已经提醒${item.studentName}同学去回顾错题`)
          } else {
            this.$message.error('当前网络状态不佳，请稍后再试')
          }
        })
    },
    handleNoticed(name) {
      this.$message.info(`${name}错题回顾已提醒`)
    },
    //选择班级
    handleSelectGrade(id) {
      if (this.gradeClassIds.includes(id)) {
        this.gradeClassIds.forEach((item, index) => {
          if (item === id) {
            this.gradeClassIds.splice(index, 1)
          }
        })
      } else {
        this.wrongClasses.forEach(item => {
          if (item === id) {
            this.gradeClassIds.push(id)
          }
        })
        // 此时判断是否显示没有错题的提示
        if (!this.gradeClassIds.includes(id)) {
          this.$message.info('该班级没有错题')
        }
      }
    },
    handleAllNotice() {
      if (this.gradeClassIds.length === 0) {
        this.$message.info('请选择班级')
      } else {
        this.sentRemindAll(this.gradeClassIds.join(','))
      }
    },
    handleShowNotice() {
      let params = {
        teacherId: this.teacherId,
        textbookId: this.textbookId
      }
      //调接口
      let url = '/api/teacher/wrongquestion/class'
      const promise1 = new Promise(resolve => {
        this.$http.get(url, { params }).then(res => {
          this.allClassesInfo = res.data.infos
          resolve(this.allClassesInfo)
        })
      })
      promise1.then(resolve => {
        this.wrongClasses = []
        resolve.forEach(item => {
          if (item.classWrongQuestionCount > 0) {
            this.wrongClasses.push(item.gradeClassid)
          }
        })
      })
      this.gradeClassIds = []
      this.questionList.forEach(item => {
        if (item.errorCount !== undefined) {
          this.gradeClassIds = [this.$store.state.question.gradeClassId]
        }
      })
      if (this.classes.length === 1) {
        this.sentRemindAll(this.classes[0].gradeClassid)
      } else {
        this.dialogVisible = true
      }
    },
    //错题本一键消息提醒
    sentRemindAll(gradeClassIds) {
      this.$store
        .dispatch('question/sentRemindAll', {
          gradeClassIds: gradeClassIds
        })
        .then(data => {
          this.dialogVisible = false
          if (data.flag === 1) {
            this.$store.dispatch('question/wrongQuestionList')
            this.$store.dispatch('question/isSendAll')
            this.$message.success('已经提醒学生去回顾错题')
          } else {
            this.$message.error('当前网络状态不佳，请稍后再试')
          }
        })
    },
    handleGoDetail(item) {
      if (!(item.errorCount > 0)) {
        this.$message.info('该学生没有错题')
        return
      }
      localforage.setItem(
        'gradeClassId',
        this.$store.state.question.gradeClassId
      )
      localforage.setItem('studentInfo', item)
      this.$router.push({ name: 'wrong-question-detail', params: item })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrong-topic-list {
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 20px;
}
.list {
  width: 100%;
  height: 100%;
  .item {
    width: 100%;
    height: 66px;
    padding: 0 30px;
    border: 1px solid rgba(222, 222, 222, 1);
    border-radius: 5px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
    color: rgba(78, 95, 113, 1);
    > span {
      min-width: 60px;
      text-align: center;
    }
    > span:last-child {
      width: 138px;
      .btn {
        width: 104px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        border-radius: 18px;
        font-size: 16px;
        font-weight: 400;
        border: none;
        outline: none;
        background: #ebebeb;
        box-shadow: 0px 5px 8px 0px rgba(217, 217, 217, 0.27);
        color: rgba(102, 102, 102, 1);
      }
      .btn.active {
        background: #1059ff;
        box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .btn:active {
        background: #000fd3;
      }
    }
  }
  .item:nth-child(even) {
    background: rgba(255, 255, 255, 1);
  }
  .item:nth-child(odd) {
    background: #fafafa;
  }
  .item:first-child {
    background: rgba(241, 246, 254, 1);
    font-size: 16px;
    font-weight: 400;
    color: rgba(94, 132, 173, 1);
  }
  .item:hover {
    background: #f5f7fa;
  }
  .one-key {
    width: 138px;
    height: 40px;
    background: linear-gradient(
      -90deg,
      rgba(255, 228, 0, 1),
      rgba(255, 228, 0, 1)
    );
    box-shadow: 0px 2px 6px 0px rgba(173, 118, 0, 0.52);
    border-radius: 20px;
    font-size: 17px;
    font-weight: 400;
    color: rgba(115, 0, 153, 1);
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 18px;
      height: 21px;
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 10px;
    }
  }
  .one-key:disabled {
    background: #ddd;
    box-shadow: 0px 2px 6px 0px #ddd;
  }
  .one-key:active {
    background: #ad7600;
  }
  .one-key:disabled:active {
    background: #ddd;
  }
  .sort {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 34px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
  }
  .sort-caret {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    position: absolute;
    left: 7px;
  }
  .sort-caret.ascending {
    border-bottom-color: #c0c4cc;
    top: 4px;
  }
  .sort-caret.descending {
    border-top-color: #c0c4cc;
    bottom: 6px;
  }
  .sort-caret.ascending.active {
    border-bottom-color: #409eff;
  }
  .sort-caret.descending.active {
    border-top-color: #409eff;
  }
}
.dialog-content {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex: 0 0 25%;
    margin-bottom: 20px;
    > span {
      margin: 0 5px;
      padding: 5px 10px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
    }
  }
  .item.active {
    span {
      background: rgba(16, 89, 255, 1);
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      color: rgba(255, 255, 255, 1);
    }
  }
}
.cancel {
  width: 160px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(16, 89, 255, 1);
  box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
  border-radius: 18px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  outline: none;
  cursor: pointer;
  color: rgba(16, 89, 255, 1);
  margin-right: 20px;
}
.ok {
  width: 160px;
  height: 36px;
  background: #1059ff;
  box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 18px;

  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  outline: none;
  cursor: pointer;
}
</style>
