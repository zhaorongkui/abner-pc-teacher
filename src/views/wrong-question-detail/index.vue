<template>
  <div class="wrong-topic-detail">
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/wrong-question">
            错题本
          </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ gradeClassname }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          {{ studentInfo && studentInfo.studentName }}</a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <div class="header">
      <ul class="header-breadcrumb">
        <li class="header-breadcrum-item">
          {{ studentInfo && studentInfo.studentName }}
        </li>
        <li class="header-breadcrum-item">{{ textbookName }}</li>
        <li class="header-breadcrum-item">
          错题{{ (studentInfo && studentInfo.errorCount) || 0 }}
        </li>
      </ul>
      <div>
        <template v-if="this.studentInfo && !this.studentInfo.remindTime">
          <button
            v-if="
              this.studentInfo.errorCount -
                this.studentInfo.examineCount -
                this.studentInfo.publishHomeworkCount >
                0
            "
            class="one-key"
            @click="handleNotice"
          >
            <span>
              <img src="../../assets/img/ic_wrongbook_onekey@2x.png" alt="" />
            </span>
            <span>提醒</span>
          </button>
          <button v-else class="one-key gray" @click="handleNotice">
            <span>
              <img src="../../assets/img/ic_wrongbook_onekey@2x.png" alt="" />
            </span>
            <span>提醒</span>
          </button>
        </template>
        <button v-else class="one-key gray" @click="handleNotice">
          <span>
            <img src="../../assets/img/ic_wrongbook_onekey@2x.png" alt="" />
          </span>
          <span>已提醒</span>
        </button>
      </div>
    </div>
    <div class="filter">
      <div class="select">
        <div class="choice-response">
          <div class="label">选择题型</div>
          <ul class="response-list">
            <li
              v-for="(item, index) of questionTypeList"
              :key="index"
              class="response-item"
              :class="
                questionYytypeId.includes(item && item.questionYYTypeId)
                  ? 'active'
                  : ''
              "
              @click="handleSelectType(item)"
            >
              {{ item.questionYYTypeName }}
            </li>
          </ul>
        </div>
        <div class="time-range">
          <div class="label">加入时间</div>
          <a-range-picker @change="onDateChange" />
        </div>
      </div>
      <div class="handle">
        <button class="query" @click="handleQuery">查询</button>
        <button class="reset" @click="handleReset">重置</button>
      </div>
    </div>
    <div class="main">
      <div class="wrap">
        <div class="wrong-topic-detail-menu">
          <Menu
            :studentInfoId="studentInfo && studentInfo.studentInfoId"
            :questionYytypeId="questionYytypeId"
            :wrongquestionTimeStart="wrongquestionTimeStart"
            :wrongquestionTimeEnd="wrongquestionTimeEnd"
          ></Menu>
        </div>
        <div class="wrong-topic-detail-content">
          <QuestionDetail
            :studentInfoId="studentInfo && studentInfo.studentInfoId"
            :questionYytypeId="questionYytypeId"
            :wrongquestionTimeStart="wrongquestionTimeStart"
            :wrongquestionTimeEnd="wrongquestionTimeEnd"
          ></QuestionDetail>
        </div>
      </div>
    </div>

    <div
      style="position:fixed;left:0;
    top:0;background:rgba(0,0,0,0.3);width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999999999"
      v-if="picflag"
    >
      <imageView
        :imgArr="imgArr"
        :showImageView="true"
        :imageIndex="imageIndex"
        v-on:hideImage="hideImageView"
      ></imageView>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import imageView from 'vue-imageview'
import localforage from 'localforage'
import Menu from './components/Menu'
import QuestionDetail from './components/QuestionDetail'
export default {
  name: 'wrong-topic-detail',
  components: { Menu, QuestionDetail, imageView },
  data() {
    return {
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      // 学习信息
      studentInfo: null,
      // 班级ID
      gradeClassId: undefined,
      //习题类型
      questionYytypeId: [],
      // 开始时间
      wrongquestionTimeStart: null,
      // 结束时间
      wrongquestionTimeEnd: null
    }
  },
  computed: {
    gradeClassname() {
      let result
      this.$store.state.userInfo.classes &&
        this.$store.state.userInfo.classes.forEach(item => {
          if (item.gradeClassid === this.gradeClassId) {
            result = item.gradeClassname
          }
        })
      return result
    },
    textbookName() {
      return this.$store.getters.textbookName
    },
    textbookChapter() {
      return this.$store.state.question.textbookChapter
    },
    currentPage() {
      return this.$store.state.question.currentPage
    },
    questionTypeList() {
      return this.$store.state.question.questionTypeList
    },
    questionList() {
      return this.$store.state.question.questionList
    }
  },
  watch: {
    questionList() {
      this.$nextTick().then(() => {
        var that = this

        // $('.main img').click(function() {
        //   that.picflag = true
        //   that.imgArr = []
        //   that.imgArr.push($(this).attr('src'))
        // })
        $('.choice-item img').click(function() {
          that.picflag = true
          that.imgArr = []
          that.imgArr.push($(this).attr('src'))
        })
        $('.stem img').click(function() {
          that.picflag = true
          that.imgArr = []
          that.imgArr.push($(this).attr('src'))
        })
      })
    }
  },
  methods: {
    hideImageView() {
      this.picflag = false
    },
    onDateChange(date, dateString) {
      this.wrongquestionTimeStart = dateString[0]
      this.wrongquestionTimeEnd = dateString[1]
    },
    handleSelectType(item) {
      if (this.questionYytypeId.includes(item.questionYYTypeId)) {
        this.questionYytypeId.forEach((typeId, index) => {
          if (typeId === item.questionYYTypeId) {
            this.questionYytypeId.splice(index, 1)
          }
        })
      } else {
        this.questionYytypeId = [
          ...this.questionYytypeId,
          item.questionYYTypeId
        ]
      }
    },
    handleQuery() {
      this.$store.commit('question/UPDATECURRENTPAGE', 1)
      this.$store.dispatch('question/getList', {
        studentInfoId: this.studentInfo.studentInfoId,
        questionYytypeId: this.questionYytypeId.join(','),
        wrongquestionTimeStart: this.wrongquestionTimeStart,
        wrongquestionTimeEnd: this.wrongquestionTimeEnd
      })
    },
    handleReset() {
      document.querySelector('.ant-calendar-picker-clear') &&
        document.querySelector('.ant-calendar-picker-clear').click()
      this.questionYytypeId = []
      this.wrongquestionTimeStart = null
      this.wrongquestionTimeEnd = null
      this.handleQuery()
    },
    handleNotice() {
      if (this.studentInfo.remindTime) {
        this.$message.info(`${this.studentInfo.studentName}错题回顾已提醒`)
        return
      }
      if (
        this.studentInfo.errorCount -
          this.studentInfo.examineCount -
          this.studentInfo.publishHomeworkCount ===
        0
      ) {
        this.$message.info(`${this.studentInfo.studentName}已修改完全部错题`)
        return
      }
      this.$store
        .dispatch('question/sentRemind', {
          studentId: this.studentInfo.studentInfoId
        })
        .then(data => {
          if (data.flag === 1) {
            this.$set(this.studentInfo, 'remindTime', true)
            this.$message.success(
              `${this.studentInfo.studentName}错题回顾提醒成功`
            )
          } else {
            this.$message.error('当前网络状态不佳，请稍后再试')
          }
        })
    }
  },
  mounted() {
    localforage
      .getItem('studentInfo')
      .then(studentInfo => {
        this.studentInfo = studentInfo
        localforage.getItem('gradeClassId').then(gradeClassId => {
          this.gradeClassId = gradeClassId
          localforage.getItem('userInfo').then(userInfo => {
            if (userInfo) {
              this.$store.commit('GETUSERINFO', userInfo)
              this.$store.dispatch('question/getTextbookChapter')
              this.$store.dispatch('question/getQuestionYYType')
              this.$store.commit('question/UPDATECURRENTPAGE', 1)
              this.$store.dispatch('question/getList', {
                studentInfoId: this.studentInfo.studentInfoId,
                questionYytypeId: this.questionYytypeId.join(','),
                wrongquestionTimeStart: this.wrongquestionTimeStart,
                wrongquestionTimeEnd: this.wrongquestionTimeEnd
              })
            }
          })
        })
      })
      .catch(function(err) {
        // 当出错时，此处代码运行
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
#index {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  img {
    width: 0;
    height: 0;
  }
}
.wrong-topic-detail {
  height: 100%;
  padding: 10px 0;
  margin: 0 auto;
}
.breadcrumb {
  height: 60px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  color: rgba(94, 132, 173, 1);
  display: flex;
  align-items: center;
  .breadcrumb-item {
    position: relative;
    margin-right: 12px;
  }
  .breadcrumb-item:not(:last-child)::after {
    content: '';
    width: 8px;
    height: 8px;
    border-top: 1px solid rgba(94, 132, 173, 1);
    border-right: 1px solid rgba(94, 132, 173, 1);
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    right: -8px;
  }
}
.header {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-breadcrumb {
    font-size: 16px;
    font-weight: bold;
    color: rgba(16, 89, 255, 1);
    display: flex;
    .header-breadcrum-item {
      position: relative;
      margin-right: 20px;
    }
    .header-breadcrum-item:not(:last-child)::after {
      content: '';
      width: 0px;
      height: 20px;
      border-right: 2px solid rgba(225, 232, 238, 1);
      position: absolute;
      top: 4px;
      right: -10px;
    }
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
    img {
      width: 18px;
      height: 21px;
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 10px;
    }
  }
  .gray {
    background: #ddd;
  }
}

.filter {
  width: 1200px;
  margin: 0 auto;
  padding: 22px 0;
  margin-top: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px;
  display: flex;
  align-items: center;
  .select {
    width: 1200px;
    border-right: 1px solid rgba(238, 238, 238, 1);
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .handle {
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .reset {
      width: 100px;
      height: 36px;
      background: #fff;
      border: 1px solid rgba(253, 161, 88, 1);
      border-radius: 18px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(253, 161, 88, 1);
      outline: none;
      cursor: pointer;
    }
    .reset:active {
      background: #eee;
    }
    .query {
      width: 100px;
      height: 36px;
      background: rgba(0, 15, 211, 1);
      box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
      border-radius: 18px;
      font-size: 16px;
      font-weight: 400;
      color: rgb(231, 218, 218);
      outline: none;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .query:active {
      background: rgba(2, 18, 245, 1);
    }
  }
  .choice-response {
    margin-bottom: 10px;
  }
  .choice-response,
  .time-range {
    display: flex;
    align-items: center;
  }
  .label {
    flex: 0 0 120px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(169, 169, 169, 1);
  }
  .response-list {
    display: flex;
    flex-wrap: wrap;
  }
  .response-item {
    width: 118px;
    height: 32px;
    background: rgba(235, 235, 235, 1);
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(78, 95, 113, 1);
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .response-item.active {
    background: rgba(229, 240, 254, 1);
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(16, 89, 255, 1);
  }
}
.main {
  width: 100vw;
  background-color: #f0f7ff;
  .wrap {
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 0 20px 0;
    display: flex;
  }
  .wrong-topic-detail-menu {
    width: 280px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px;
    padding: 20px;
    margin-right: 20px;
    overflow: scroll;
  }
  .wrong-topic-detail-content {
    flex: auto;
    height: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .pagination {
      text-align: right;
      padding: 10px 0;
    }
  }
}
</style>
