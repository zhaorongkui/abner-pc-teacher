<style scoped>
.read-item-details {
  position: relative;
  width: 1170px;
  display: flex;
  padding: 20px 0;
  height: calc(100% - 42px);
}
.details-left {
  height: 100%;
  width: 130px;
  overflow: auto;
}
.details-right {
  flex: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
}
.details-info {
  display: flex;
  margin-bottom: 14px;
}
.view-question {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: rgba(86, 172, 255, 1);
}
.details-main {
  min-height: 0;
  flex: 1;
  display: flex;
}
.details-topic {
  width: 50%;
  overflow: auto;
}
.details-reply {
  flex: 1;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  border-radius: 4px;
  overflow: auto;
}
.sidebar {
  position: absolute;
  right: -120px;
  top: 22px;
}
.selected-box {
  margin-top: 24px;
  cursor: pointer;
  width: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fdfbee;
  border: 1px solid rgba(253, 220, 148, 1);
  border-radius: 12px;
  padding: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(240, 113, 36, 1);
}
.selected-work-number {
  font-size: 30px;
  line-height: 1.2;
}
.selected-text {
  font-size: 14px;
}
.read-over {
  cursor: pointer;
  width: 88px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(16, 89, 255, 1);
  box-shadow: 0px 8px 9px 0px rgba(16, 17, 99, 0.16);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  color: rgba(16, 89, 255, 1);
  line-height: 24px;
}
.subjective-item {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
}
.subjective-item-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 23px 0;
}
.read-over-modal-body {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
}

.read-over-modal-body p {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}
.read-over-modal-body p.homework-name-box span:nth-child(1) {
  text-align: right;
  flex: 1;
  color: #3c3c3c;
  font-size: 13px;
}
.read-over-modal-body p.homework-name-box span:nth-child(2) {
  text-align: left;
  flex: 1;
  color: #fda157;
  font-size: 13px;
  margin-left: 30px;
}
.read-over-modal-body button {
  margin-top: 20px;
  width: 160px;
  height: 36px;
  border-radius: 18px;
  outline: none;
}
.read-over-modal-body h3 {
  line-height: 1;
  margin-bottom: 15px;
}
.read-over-modal-body button:first-child {
  margin-right: 20px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(16, 89, 255, 1);
  box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
  color: #1059ff;
}
.read-over-modal-body button:last-child {
  background: #1059ff;
  color: #fff;
  box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
}
.subjective-read-over {
  margin-top: 8px;
  cursor: pointer;
}
.radius-bottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.leave-message {
  margin-top: 8px;
  cursor: pointer;
  width: 88px;
  height: 106px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(223, 223, 223, 1);
  box-shadow: 0px 8px 20px 0px rgba(186, 213, 238, 0.29);
  border-radius: 0px 0px 12px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
}
.leave-message img.close {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 40px;
  right: 20px;
}
.leave-message p {
  font-size: 14px;
  font-weight: 400;
  color: rgba(88, 104, 120, 1);
}
.leave-message img {
  width: 44px;
  height: 44px;
}
.next-student {
  cursor: pointer;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  bottom: 50px;
  right: -120px;
  background: linear-gradient(
    -30deg,
    rgba(13, 17, 125, 1),
    rgba(4, 15, 181, 1)
  );
  box-shadow: 0px 8px 20px 0px rgba(16, 17, 99, 0.31);

  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
.breadcrumb-box {
  padding-top: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(94, 132, 173, 1);
}
@media screen and (max-width: 1440px) {
  .sidebar {
    position: fixed;
    right: 0;
    top: 122px;
  }
  .next-student {
    position: fixed;
    bottom: 5%;
    right: 0;
  }
}
</style>
<template>
  <div style="height:100%;">
    <div class="breadcrumb-box">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/work">作业</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/work-grading-assignment">学生列表</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{
          studentInfo && studentInfo.name
        }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="read-item-details">
      <div class="details-left card margin-right-10">
        <subtopic-list
          v-model="subtopicId"
          :list="subtopicList"
          @on-change="subtopicChange"
          ref="subtopicList"
        />
      </div>
      <div class="details-right card" v-if="questionType !== 6">
        <div class="details-info">
          <div style="flex: 1">
            <time-cost :name="timeCostName" :itemList="itemList" />
            <tag-list style="margin-left: 33px" :data="tagData" />
          </div>
          <div class="view-question" @click="lookOriginal">
            <a-icon type="eye" /> 查看原文
          </div>
        </div>
        <div class="details-main">
          <div class="details-topic">
            <topic
              :titleToMain="true"
              :value="currentChildQuestionId"
              :topicData="topicData"
            />
          </div>
          <div class="details-reply margin-left-10">
            <topic-item title="答题区">
              <question-group
                style="margin: 76px 0 0 29px;"
                :options="questionGroup"
                v-if="questionType === 1"
                :answer="answer"
                :reply="reply"
                :key="'questionGroup'"
              />
              <question-group
                style="margin: 76px 0 0 29px;"
                :options="questionGroup"
                :multiple="true"
                v-if="questionType === 2"
                :answer="answer"
                :reply="reply"
                :key="'multpleQuestionGroup'"
              />
              <true-of-false
                style="margin: 96px 0 0 0;"
                v-else-if="questionType === 3"
                :answer="answer"
                :reply="reply"
              />
              <multiple-choice-question
                style="margin: 10px 0 0 10px;"
                v-model="multipleChoiceQuestionValue"
                v-else-if="questionType === 4"
                :questionGroupList="questionGroupList"
                @on-change="multipleChoiceQuestionChange"
              />
              <fill-in-the-blanks
                style="margin: 36px 0 0 29px;"
                v-else-if="questionType === 5"
                :answer="answer"
                :reply="reply"
              />
            </topic-item>
          </div>
        </div>
      </div>
      <div v-else class="details-right">
        <div class="subjective-item">
          <div class="subjective-item-info">
            <div style="flex: 1">
              <time-cost :name="timeCostName" :itemList="itemList" />
              <tag-list style="margin-left: 33px" :data="tagData" />
            </div>
            <div class="view-question" @click="lookOriginal">
              <a-icon type="eye" /> 查看原文
            </div>
          </div>
          <a-divider style="margin: 8px 0" />
          <div>
            <topic
              :flod="true"
              :showType="false"
              :border="false"
              :topicData="topicData"
            />
          </div>
        </div>
        <div style="flex: 1" class="margin-top-10">
          <subjective-item ref="subjectiveItem" :questionInfo="questionInfo" />
        </div>
      </div>
      <div class="sidebar">
        <div class="read-over" @click="readOver">
          <span>完成</span>
          <span>批阅</span>
        </div>
        <!-- 待批阅 -->
        <div
          class="selected-box"
          :class="{ 'radius-bottom': questionType === 6 && showReview }"
          v-if="toRead.length"
        >
          <span class="selected-work-number">{{ toRead.length }}</span>
          <span class="selected-text">待批阅</span>
        </div>
        <!-- 我的评分 -->
        <div
          class="subjective-read-over"
          v-if="questionType === 6 && showReview"
        >
          <subjective-read-over
            v-if="questionInfo.hasRewive == 2"
            :value="-1"
            @on-change="submitReadOver"
          />
          <subjective-read-over
            v-else
            :value="questionInfo.score === undefined ? -1 : questionInfo.score"
            @on-change="submitReadOver"
          />
        </div>
        <!-- 留言 -->
        <div class="leave-message" v-if="questionType === 6 && showReview">
          <recorder
            @on-remove="recorderRemove"
            @on-success="recorderSuccess"
            ref="recorder"
          />
        </div>
      </div>
      <!-- 下一个学生 -->
      <div
        class="next-student"
        @click="nextStudent"
        v-if="
          toReadStudent.length &&
            !lastToReadStudentIsCurrentStudent &&
            !toRead.length &&
            showNextStudent
        "
      >
        <!-- <div class="next-student" @click="nextStudent"> -->
        <p>下个</p>
        <p>学生</p>
      </div>
      <!-- 还有多少学生没有批阅完 -->
      <a-modal
        title="提示"
        :visible="readVisible"
        @ok="readVisible = false"
        @cancel="readVisible = false"
        :footer="null"
      >
        <div class="read-over-modal-body">
          <template v-if="appealList.length">
            <p>
              <span>{{ studentInfo.name }}同学的作业</span>， 还有<span>{{
                appealList.length
              }}</span>
              个重批申请未处理
            </p>
            <p>是否将未重批的题按照 <span style="color:red">做对</span> 处理</p>
          </template>
          <template v-else>
            <p>
              <span>{{ studentInfo.name }}同学的作业</span>， 还有<span>{{
                toRead.length
              }}</span
              >道题未批阅哦 ～
            </p>
            <p>
              若点击“完成批阅”，未批阅的题将按照
              <span style="color:red">做对</span> 处理
            </p>
          </template>
          <div>
            <button @click="hanldeReadOver">完成批阅</button
            ><button @click="readVisible = false">继续批阅</button>
          </div>
        </div>
      </a-modal>
      <!-- 没有要批阅的学生了 -->
      <a-modal
        title="提示"
        :visible="noToReadStudent"
        @cancel="noToReadStudent = false"
        :footer="null"
      >
        <div class="read-over-modal-body">
          <h3>恭喜你，没有待处理的学生了</h3>
          <p class="homework-name-box">
            <span>作业名称</span><span>{{ item.homeworkName }}</span>
          </p>
          <p class="homework-name-box">
            <span>作业班级</span><span>{{ item.gradeClassname }}</span>
          </p>
          <div>
            <button @click="retreat">知道了</button>
          </div>
        </div>
      </a-modal>
      <!-- 还有几名学生 -->
      <a-modal
        title="提示"
        :visible="nextReviewStudent"
        @ok="nextReviewStudent = false"
        @cancel="nextReviewStudentCancel"
        :footer="null"
      >
        <div class="read-over-modal-body">
          <h4>还有{{ toReadStudent.length }}名学生的作业待批阅</h4>
          <div>
            <button @click="retreat">退出批阅</button>
            <button
              @click="nextStudent"
              v-if="
                toReadStudent.length &&
                  !lastToReadStudentIsCurrentStudent &&
                  !toRead.length
              "
            >
              下一个学生
            </button>
          </div>
        </div>
      </a-modal>
      <!-- 查看原文 -->
      <look-original ref="original" />
    </div>
  </div>
</template>

<script>
const questionType = {
  '1': '单选题',
  '2': '多选题',
  '3': '判断题',
  '4': '题组',
  '5': '填空题',
  '6': '主观题'
}
import localforage from 'localforage'
import { relativeTime } from '../../filters'
import { toChinesNum } from '../../util/assist'
import TagList from '../../components/TagList'
import TimeCost from '../../components/TimeCost'
import topic from '../../components/problem/topic'
import LookOriginal from '../../components/LookOriginal'
import SubtopicList from '../../components/SubtopicList'
import TopicItem from '../../components/problem/topic-item'
import TrueOfFalse from '../../components/answerDetails/TrueOfFalse'
import QuestionGroup from '../../components/answerDetails/QuestionGroup'
import SubjectiveItem from '../../components/answerDetails/SubjectiveItem'
import SubjectiveReadOver from '../../components/answerDetails/SubjectiveReadOver'
import FillInTheBlanks from '../../components/answerDetails/FillInTheBlanks'
import MultipleChoiceQuestion from '../../components/answerDetails/MultipleChoiceQuestion'
import Recorder from '../../components/answerDetails/Recorder'
export default {
  name: 'read-item-details',
  components: {
    topic,
    TagList,
    TimeCost,
    TopicItem,
    TrueOfFalse,
    LookOriginal,
    SubtopicList,
    QuestionGroup,
    FillInTheBlanks,
    MultipleChoiceQuestion,
    SubjectiveItem,
    SubjectiveReadOver,
    Recorder
  },
  computed: {
    // 教师批阅列表
    techerReviewList() {
      return (
        (this.questionInfo.reviewList &&
          this.questionInfo.reviewList.filter(
            item => item.reviewUserType === 2
          )) ||
        []
      )
    },
    // 批阅的文件
    fileList() {
      let result = []
      this.questionInfo.reviewList &&
        this.questionInfo.reviewList.forEach(item => {
          if (item.reviewUserType === 2 && item.reviewFileStr) {
            result.push(item)
          }
        })
      if (result.length === 0) {
        result = this.questionInfo.fileList || []
      }
      return result
    },
    // 是否显示批阅按钮
    showReview() {
      if (
        this.techerReviewList.length > 0 &&
        this.techerReviewList[0].reviewFileStr
      ) {
        return true
      } else if (this.fileList.length > 0) {
        return true
      } else {
        return false
      }
    },
    // 未批阅列表
    toRead() {
      let arr = []
      this.subtopicList.forEach(item => {
        if (item.children && item.children.length) {
          item.children.forEach(child => {
            if (child.hasRewive === 0 || child.questionIsappeal === true) {
              arr.push(child)
            }
          })
        }
      })
      return arr
    },

    // 是否有申诉
    appealList() {
      let arr = []
      this.subtopicList.forEach(item => {
        if (item.children && item.children.length) {
          item.children.forEach(child => {
            if (child.questionIsappeal === true) {
              arr.push(child)
            }
          })
        }
      })
      return arr
    },

    // 当前未批阅学生在批阅列表的下标
    currentStudentToReadIndex() {
      if (this.studentInfo.studentId && this.toReadStudent.length) {
        for (let i = 0, length = this.toReadStudent.length; i < length; i++) {
          if (this.studentInfo.studentId === this.toReadStudent[i].studentId) {
            return i
          }
        }
      }
      return null
    },
    // 所有未批阅下标
    allToReadIndex() {
      let arr = []
      this.subtopicList.forEach((item, index) => {
        if (item.children && item.children.length) {
          item.children.forEach((child, childIndex) => {
            if (child.hasRewive === 0 || child.questionIsappeal === true) {
              arr.push([index, childIndex])
            }
          })
        }
      })
      return arr
    },
    currentChildQuestionId() {
      if (this.questionGroupList.length) {
        return this.questionGroupList[this.multipleChoiceQuestionValue].id
      } else {
        return 0
      }
    },
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo
    },
    // 带批阅学生列表
    toReadStudent() {
      // return this.studentList.filter(item => {
      //   return (
      //     (item.reviewType === 0 && item.submitType === 3) ||
      //     item.homeworkAppealType === 1
      //   )
      // })
      // 待批阅学生列表
      let result
      if (this.reviewType === 0) {
        result = this.studentList.filter(
          item => item.reviewType === 0 && item.submitType === 3
        )
      } else {
        result = this.studentList.filter(
          item =>
            item.homeworkAppealType === this.homeworkAppealType &&
            item.homeworkAppealType === 1 &&
            item.submitType === 3
        )
      }
      return result
    },
    // 判断之后一个学生是否是自己
    lastToReadStudentIsCurrentStudent() {
      return (
        this.toReadStudent.length === 1 &&
        this.studentInfo.studentId ===
          this.toReadStudent[this.toReadStudent.length - 1].studentId
      )
    },
    // questionInfo() {
    //   return this.$store.state.marking.questionInfo
    // }
  },
  // watch: {
  //   'questionInfo.ifShare' : {
  //     handler(newValue, oldValue){
  //       console.log(newValue)
  //       console.log(oldValue)
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  data() {
    return {
      isDialog: true, //是否弹出框
      isNextDialog: false, //是否完成批阅弹出下一个学生
      reviewType: null,
      homeworkAppealType: null,
      file: null, //audio文件
      haveRead: false,
      isToView: false,
      showNextStudent: false, // 是否显示下一个学生
      multipleChoiceQuestionValue: 0, // 题组中当前选中的题的value
      nextReviewStudent: false, // 查看还有几个学生需要批阅
      item: { homework: '', gradeClassname: '' }, // 当前班级信息
      noToReadStudent: false, // 没有下一个批阅的学生了
      studentList: [], // 学生列表
      studentInfo: {}, // 当前学生信息
      readVisible: false, // 显示全部批阅弹窗
      questionInfo: null, // 当前题的详情
      currentIndex: [], // 当前题的下标数组
      answer: null, // 正确答案
      reply: null, // 学生回答
      questionGroup: [], // 选择题选项选项
      questionGroupList: [], // 题组
      questionId: null, // 当前问题id
      questionType: null, // 当前问题类型
      subtopicId: null, // 左侧列表id
      timeCostName: '阅读', // 当前文章标题
      topicData: {}, // 问题题干解析答案
      subtopicList: [], // 左侧列表
      nullData: '',
      tagData: [
        {
          label: '试题来源',
          value: '--'
        },
        {
          label: '页数',
          value: '--'
        },
        {
          label: '题号',
          value: '--'
        },
        {
          label: '题型',
          value: '--'
        }
      ],
      itemList: [
        {
          label: '阅读用时',
          value: '--'
        },
        {
          label: '作答用时',
          value: '--'
        }
      ],
      visible: true
    }
  },
  created() {
    // 获取学生的答题情况
    this.getStudentQuestion()
  },
  mounted() {
    // 获取上一个页面传过来的值
    localforage.getItem('item').then(item => {
      localforage.getItem('list').then(list => {
        localforage.getItem('student').then(student => {
          this.studentList = list
          this.item = item
          this.studentInfo = student
          this.reviewType = this.studentInfo.reviewType
          this.homeworkAppealType = this.studentInfo.homeworkAppealType
          // console.log(list)
          // console.log(student)
        })
      })
    })
  },
  
  methods: {
    // 取消下个学生弹框
    nextReviewStudentCancel() {
      this.nextReviewStudent = false
      this.showNextStudent = true
      this.isDialog = false
    },
    // 录音成功
    recorderSuccess() {
      this.file = this.$refs.recorder.getFile()
    },
    // 删除录音
    recorderRemove() {
      this.file = null
      let studentAnswerReviewId = null
      if (this.questionInfo.reviewList && this.questionInfo.reviewList.length) {
        for (let i = 0; i < this.questionInfo.reviewList.length; i++) {
          if (this.questionInfo.reviewList[i].reviewUserType === 2) {
            if (this.questionInfo.reviewList[i].reviewVoiceStr) {
              studentAnswerReviewId = this.questionInfo.reviewList[i]
                .studentAnswerReviewId
            }
          }
        }
      }
      if (studentAnswerReviewId) {
        let data = {
          studentAnswerReviewId
        }
        this.$http('/api/teacher/homework/review/deleteVoice', {
          params: data
        }).then(res => {
          if (res.data.flag === 1) {
            this.$message.success('留言删除成功')
          }
        })
      } else {
        this.$message.success('留言删除成功')
      }
    },
    // 提交录音
    async submitRecorder() {
      let uploadFileRes
      let fileUrl // 图片地址
      if (this.file) {
        uploadFileRes = await this.uploadFile(this.file)
      }
      if (uploadFileRes && uploadFileRes.data.flag === 1) {
        let remote = uploadFileRes.data.infos
        if (remote[0]) {
          fileUrl = remote[0]
        }
      }
    },
    // 多选题选中
    multipleChoiceQuestionChange() {
      console.log(this.questionGroupList[this.multipleChoiceQuestionValue])
    },
    // 后退
    retreat() {
      this.$router.go(-1)
    },
    // 下一个学生
    nextStudent() {
      this.nextReviewStudent = false
      this.showNextStudent = false
      this.isDialog = true
      let query = this.$router.history.current.query
      let path = this.$router.history.current.path
      let newQuery = JSON.parse(JSON.stringify(query))
      let currentIndex = this.currentStudentToReadIndex
      if (this.toReadStudent.length) {
        if (currentIndex === null) {
          newQuery.studentId = this.toReadStudent[0].studentId
          localforage.setItem('student', this.toReadStudent[0])
          this.studentInfo = this.toReadStudent[0]
        } else {
          let nextStudentIndex = currentIndex + 1
          let lastStudentId = this.toReadStudent[this.toReadStudent.length - 1]
            .studentId
          if (this.studentInfo.studentId === lastStudentId) {
            newQuery.studentId = this.toReadStudent[0].studentId
            localforage.setItem('student', this.toReadStudent[0])
            this.studentInfo = this.toReadStudent[0]
          } else {
            newQuery.studentId = this.toReadStudent[nextStudentIndex].studentId
            localforage.setItem('student', this.toReadStudent[nextStudentIndex])
            this.studentInfo = this.toReadStudent[nextStudentIndex]
          }
        }
        this.reviewType = this.studentInfo.reviewType
        this.homeworkAppealType = this.studentInfo.homeworkAppealType
        this.$router.replace({ path, query: newQuery })
        this.reset()
      } else {
        this.noToReadStudent = true
      }
    },
    // 切换学生后重新请求数据
    reset() {
      this.getStudentQuestion()
    },
    // 上传语音
    uploadFile(file) {
      let fd = new FormData()
      fd.append('file', file)
      return this.$http.post(
        `/teacherApi/upload/uploadCommonFile/voice/homework/yuwen`,
        fd,
        {
          headers: {
            upload: true
          }
        }
      )
    },
    // 上次批阅图片
    uploadFileImage(file) {
      let fd = new FormData()
      fd.append('file', file)
      return this.$http.post(
        `/teacherApi/upload/uploadCommonFile/img/homework/yuwen`,
        fd,
        {
          headers: {
            upload: true
          }
        }
      )
    },
    // 单题提交批阅
    submitReadOver(val, isD) {
      if (isD == undefined) {
        isD = false
      }
      if (!isD && this.toRead.length == 0) {
        this.isDialog = false
      }
      setTimeout(async () => {
        if (this.isToView) {
          this.$message.info('正在批阅')
          return false
        }
        this.loading = this.$loading({
          lock: true,
          text: '批阅中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fontSize: '14px',
          zIndex: 99999999
        })
        let fileImage = this.$refs.subjectiveItem.getFile()
        let fileImageUrl = [] // 图片地址
        let uploadFileRes
        let fileUrl // 语音地址

        if (this.file) {
          uploadFileRes = await this.uploadFile(this.file)
        }

        if (fileImage) {
          let arr = []
          for (let key in fileImage) {
            arr[key - 1] = fileImage[key]
          }
          let index = 0
          while (index < arr.length) {
            if (!arr[index]) {
              index++
              continue
            }
            let uploadFileImageRes = await this.uploadFileImage(arr[index])
            if (uploadFileImageRes && uploadFileImageRes.data.flag === 1) {
              let remote = uploadFileImageRes.data.infos
              if (remote[0]) {
                fileImageUrl[index] = remote[0]
              }
            }
            index++
          }
        }

        if (uploadFileRes && uploadFileRes.data.flag === 1) {
          let remote = uploadFileRes.data.infos
          if (remote[0]) {
            fileUrl = remote[0]
          }
        }
        let ifLast = 0
        if (this.toRead.length === 1) {
          ifLast = 1
        } else if (this.toRead.length > 1) {
          ifLast = 0
        } else {
          ifLast = 1
        }
        let isTrue = val == 2 ? 0 : val == 0 ? 1 : 2
        let reviewList =
          this.questionInfo.reviewList &&
          this.questionInfo.reviewList.filter(item => item.reviewUserType === 2)
        let resultJsonArray = [
          {
            ifLast: ifLast,
            isTrue: isTrue,
            reviewResult: val,
            studentAnswerId: this.questionInfo.studentAnswerId
            // studentAnswerReviewId:
            //   reviewList && reviewList.length && reviewList[0].studentAnswerReviewId || null
          }
        ]
        if (reviewList && reviewList.length) {
          resultJsonArray[0].studentAnswerReviewId =
            reviewList[0].studentAnswerReviewId
        }
        if (fileUrl) {
          resultJsonArray[0].reviewVoice = fileUrl
        }
        if (fileImageUrl.length) {
          // 数组合并
          let files = []

          if (
            this.techerReviewList.length &&
            this.techerReviewList[0].reviewFile &&
            this.techerReviewList[0].reviewFile.length
          ) {
            files = this.techerReviewList[0].reviewFile.split(',')
          } else if (this.fileList.length) {
            files = this.fileList.map(item => item.answerFileUrl)
          }

          let uploadFile = []
          files.forEach((item, index) => {
            if (fileImageUrl[index] !== undefined) {
              uploadFile.push(fileImageUrl[index])
            } else {
              uploadFile.push(item)
            }
          })

          resultJsonArray[0].reviewFile = uploadFile.join(',')
        }
        this.isToView = true
        let data = {
          ifDone: 0,
          homeworkId: this.$route.query.homeworkId,
          studentInfoId: this.$route.query.studentId,
          resultJsonArray: resultJsonArray
        }
        this.$store
          .dispatch('marking/teacherAllReview', data)
          .then(({ data }) => {
            if (data.flag === 1) {
              this.setCurrentReviewType(val, isD)
              this.file = null
            } else {
              this.$message.warning('批阅作业失败')
            }
            this.loading.close()
            this.isToView = false
          })
          .catch(() => {
            this.loading.close()
            this.isToView = false
          })
      })
    },
    // 计算下一个问题
    computedNextQuestion(isD) {
      if (this.toRead.length) {
        let nextQuestionIndex = this.allToReadIndex[0]
        let item = this.subtopicList[nextQuestionIndex[0]]
        let child = item.children[nextQuestionIndex[1]]
        this.subtopicId = child.id
        this.$nextTick(() => {
          if (this.$refs.subtopicList) {
            this.$refs.subtopicList.scrollIntoView()
          }
        })
        this.subtopicChange({ item, child })
      } else {
        let item = this.subtopicList[this.currentIndex[0]].children[
          this.currentIndex[1]
        ]
        this.getQuestionInfo(item.id)
        this.updateStudentReview()
        if (this.toReadStudent.length) {
          let lastStudentId = this.toReadStudent[this.toReadStudent.length - 1]
            .studentId
          if (
            this.studentInfo.studentId === lastStudentId &&
            (this.isDialog || isD)
          ) {
            this.isDialog = false
            this.noToReadStudent = true
          } else if (this.isDialog || isD) {
            this.isDialog = false
            this.nextReviewStudent = true
            this.isNextDialog = true
          }
        } else {
          if (this.haveRead && (this.isDialog || isD)) {
            this.isDialog = false
            this.noToReadStudent = true
          } else if (isD) {
            this.$router.go(-1)
            this.$message.success('恭喜您全部作业批阅完成')
          }
        }
      }
    },
    // 更新学生批阅状态
    updateStudentReview() {
      this.studentInfo.reviewType = 1
      this.studentInfo.homeworkAppealType = 3
      localforage.setItem('student', this.studentInfo)
      console.log(this.toReadStudent)
      for (let i = 0, count = this.studentList.length; i < count; i++) {
        if (this.studentList[i].studentId === this.$route.query.studentId) {
          this.studentList[i].reviewType = 1
          this.studentList[i].homeworkAppealType = 3
          localforage.setItem('list', this.studentList)
          return false
        }
      }
      console.log(this.toReadStudent)
    },
    // 设置当前题的答题状态
    setCurrentReviewType(val, isD) {
      let state
      switch (val) {
        case 2:
          state = 2
          break
        case 1:
          state = 4
          break
        case 0:
          state = 3
          break
      }
      this.questionInfo.score = val
      let item = this.subtopicList[this.currentIndex[0]].children[
        this.currentIndex[1]
      ]
      this.$set(item, 'state', state)
      this.$set(item, 'hasRewive', 1)
      if (item.questionIsappeal === true) {
        this.$set(item, 'questionIsappeal', false)
      }
      this.computedNextQuestion(isD)
      // return this.getQuestionInfo(item.id)
    },
    // 把所有未批阅的设置成对
    setAllReviewType() {
      this.allToReadIndex.forEach(item => {
        let subtopicItem = this.subtopicList[item[0]].children[item[1]]
        this.$set(subtopicItem, 'state', 2)
        if (subtopicItem.questionIsappeal === true) {
          this.$set(subtopicItem, 'questionIsappeal', false)
        }
        this.$set(subtopicItem, 'hasRewive', 1)
      })
    },
    // 全部批阅
    hanldeReadOver() {
      setTimeout(async () => {
        this.loading = this.$loading({
          lock: true,
          text: '批阅中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fontSize: '14px',
          zIndex: 99999999
        })
        // 查看当前主观题是否需要上传涂鸦和语音
        let fileImage = this.$refs.subjectiveItem.getFile()
        let fileImageUrl = [] // 图片地址
        let uploadFileRes
        let fileUrl // 语音地址
        let resultJsonArray = [...this.toRead]
        if (this.file) {
          uploadFileRes = await this.uploadFile(this.file)
          var type = 0
          resultJsonArray.forEach((item, index) => {
            if (item.homeworkQuestionId == this.homeworkQuestionId) {
              type = 1
            }
          })
          if (type == 0) {
            let reviewList =
              (this.questionInfo.reviewList &&
                this.questionInfo.reviewList.filter(
                  item => item.reviewUserType === 2
                )) ||
              []
            let resultJson = {
              hasRewive: this.questionInfo.hasRewive,
              score: this.questionInfo.score,
              ifLast: 0,
              homeworkQuestionId: this.questionInfo.homeworkQuestionId,
              studentAnswerId: this.questionInfo.studentAnswerId,
              studentAnswerReviewId:
                (reviewList &&
                  reviewList[0] &&
                  reviewList[0].studentAnswerReviewId) ||
                null
            }
            resultJsonArray.push(resultJson)
          }
        }

        if (fileImage) {
          let arr = []
          for (let key in fileImage) {
            arr[key - 1] = fileImage[key]
          }
          let index = 0
          while (index < arr.length) {
            if (!arr[index]) {
              index++
              continue
            }
            let uploadFileImageRes = await this.uploadFileImage(arr[index])
            if (uploadFileImageRes && uploadFileImageRes.data.flag === 1) {
              let remote = uploadFileImageRes.data.infos
              if (remote[0]) {
                fileImageUrl[index] = remote[0]
              }
            }
            index++
          }
        }

        if (uploadFileRes && uploadFileRes.data.flag === 1) {
          let remote = uploadFileRes.data.infos
          if (remote[0]) {
            fileUrl = remote[0]
          }
        } // 查看当前主观题是否需要上传涂鸦和语音

        resultJsonArray = resultJsonArray.map((item, index) => {
          let obj = {
            ...item
          }
          var reviewResult = 2
             if (
                item.hasRewive == 1 ||
                item.hasRewive == 4 ||
                (item.hasRewive == 2 &&
                  (item.questionIsappeal == undefined ||
                    item.questionIsappeal == 2))
              ) {
                reviewResult = item.score
              }
              var isTrue = reviewResult == 2 ? 0 : reviewResult == 0 ? 1 : 2
              obj.reviewResult=reviewResult 
              obj.isTrue=isTrue 
          if (
            item.homeworkQuestionId === this.questionInfo.homeworkQuestionId
          ) {
            obj.studentAnswerId = this.questionInfo.studentAnswerId
            let reviewList =
              this.questionInfo.reviewList &&
              this.questionInfo.reviewList.filter(
                item => item.reviewUserType === 2
              )
            if (reviewList && reviewList.length) {
              obj.studentAnswerReviewId = reviewList[0].studentAnswerReviewId
            }
            if (fileUrl) {
              obj.reviewVoice = fileUrl
            }
            if (fileImageUrl.length) {
              // 数组合并
              let files = []

              if (
                this.techerReviewList.length &&
                this.techerReviewList[0].reviewFile &&
                this.techerReviewList[0].reviewFile.length
              ) {
                files = this.techerReviewList[0].reviewFile.split(',')
              } else if (this.fileList.length) {
                files = this.fileList.map(item => item.answerFileUrl)
              }
              let uploadFile = []
              files.forEach((item, index) => {
                if (fileImageUrl[index] !== undefined) {
                  uploadFile.push(fileImageUrl[index])
                } else {
                  uploadFile.push(item)
                }
              })
              obj.reviewFile = uploadFile.join(',')
            }
          }
          return obj
        })
        if (resultJsonArray.length === 1) {
          resultJsonArray[0].ifLast = 1
        }
        let data = {
          homeworkId: this.item.homeworkId,
          ifDone: 1,
          studentInfoId: this.$route.query.studentId,
          resultJsonArray: resultJsonArray
        }
        this.$store
          .dispatch('marking/teacherAllReview', data)
          .then(({ data }) => {
            if (data.flag === 1) {
              this.readVisible = false
              this.setAllReviewType()
              this.computedNextQuestion(true)
              this.file = null
              //this.$message.success('恭喜您全部作业批阅完成')
            } else {
              this.$message.warning('批阅失败')
            }
            this.loading.close()
          })
          .catch(() => {
            this.loading.close()
          })
      })
    },
    // 切换当前文章的详情
    subtopicChange({ item, child }) {
      this.file = null
      this.tagData[2].value = item.questionNumber
      this.currentIndex = [item.index, child.index]
      this.questionId = item.questionId
      this.timeCostName = item.topic
      this.itemList[0].value = relativeTime(item.readTime)
      this.itemList[1].value = relativeTime(item.answerTime)
      this.getQuestionInfo(child.id)
    },
    // 获取当前文章的子题详情
    getQuestionInfo(id) {
      let data = {
        homeworkQuestionId: id,
        studentInfoId: this.$route.query.studentId,
        teacherId: this.userInfo.teacherId
      }
      return this.$http('/api/teacher/homework/question/info', { params: data })
        .then(res => {
          this.$store.commit('marking/IMGURL', {})
          if (res.data.flag === 1) {
            let remote = res.data.infos
            this.$store.commit('marking/QUESTIONINFO', remote)
            console.log(this.$store.state.marking.questionInfo)
            this.questionInfo = this.$store.state.marking.questionInfo
            this.$set(this.tagData[0], 'value', remote.workbookName)
            this.$set(this.tagData[1], 'value', remote.workbookChapterPage)
            this.$set(this.tagData[3], 'value', remote.questionYytypeName)
            this.questionType = remote.questionTypeCode
            let obj = {
              id: remote.questionId,
              topicName: '题目',
              topicType: questionType[remote.questionTypeCode],
              topicProblem: remote.questionStem,
              topicMain: remote.questionStem,
              reference: remote.questionAnswer,
              analysis: remote.questionAnalysis
            }
            if (remote.questionTypeCode === 3) {
              let answer = obj.reference
              obj.reference = answer ? (answer === 'N' ? '错误' : '正确') : null
            }
            if (remote.questionTypeCode === 4) {
              let questionArr = []
              let question = {}
              if (remote.childQuestionList && remote.childQuestionList.length) {
                let children = remote.childQuestionList.map((item, index) => {
                  question = {
                    id: item.questionId,
                    answer: item.questionAnswer,
                    reply: item.answerContent
                  }
                  if (item.optionsList && item.optionsList.length) {
                    question.options = item.optionsList.map(item => {
                      return {
                        label: item.questionContent,
                        value: item.questionOption
                      }
                    })
                  }
                  questionArr.push(question)
                  return {
                    id: item.questionId,
                    topicName: '子题' + (index + 1),
                    topicProblem: item.questionStem,
                    topicMain: item.questionStem,
                    reference: item.questionAnswer,
                    analysis: item.questionAnalysis
                  }
                })
                obj.children = children
              }
              this.multipleChoiceQuestionValue = 0
              this.questionGroupList = questionArr
            }
            if (
              remote.questionTypeCode === 1 ||
              remote.questionTypeCode === 2
            ) {
              obj.options = remote.optionsList.map(item => {
                return {
                  label: item.questionContent,
                  value: item.questionOption
                }
              })
            }
            if (remote.questionTypeCode === 5) {
              this.answer = JSON.parse(remote.questionAnswer)
              this.reply = JSON.parse(remote.answerContent)
              let strArr = []
              this.answer.forEach((item, index) => {
                item.answer.forEach(element => {
                  strArr.push(decodeURIComponent(element))
                })
              })
              obj.reference = ''
              obj.referenceArr = strArr
            } else if (remote.questionTypeCode !== 4) {
              if (remote.questionTypeCode === 6) {
                let url = null
                this.questionInfo = remote
                // 判断当前老师是否有语音
                if (remote.reviewList && remote.reviewList.length) {
                  let reviewList = remote.reviewList.filter(item => {
                    return item.reviewUserType === 2
                  })
                  if (reviewList.length && reviewList[0].reviewVoiceStr) {
                    url = reviewList[0].reviewVoiceStr
                  }
                }
                this.$nextTick().then(() => {
                  if (this.$refs.recorder && url) {
                    this.$refs.recorder.audioURL = url
                  } else {
                    this.$refs.recorder.audioURL = null
                  }
                })
              } else {
                ;(this.answer = remote.questionAnswer),
                  (this.reply = remote.answerContent)
              }
            }
            this.questionGroup = obj.options
            this.topicData = obj
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 获取当前学生左侧的列表
    getStudentQuestion() {
      let data = {
        homeworkClassId: this.$route.query.homeworkClassId,
        studentId: this.$route.query.studentId
      }
      this.$http('/api/teacher/homework/ArticleReviewQuestionList', {
        params: data
      })
        .then(res => {
          if (res.data.flag === 1) {
            let remote = res.data.infos
            this.$store.commit('marking/QUESTIONINFOLIST', remote)
            var defaultObj = {}
            if (
              remote.articleQuestionList &&
              remote.articleQuestionList.length
            ) {
              this.subtopicList = remote.articleQuestionList.map(
                (item, index) => {
                  let obj = {
                    id: item.homeworkQuestionId,
                    index: index,
                    ...item,
                    topic: '阅读' + toChinesNum(index + 1)
                  }
                  if (item.childQuestionList && item.childQuestionList.length) {
                    obj.children = item.childQuestionList.map(
                      (child, index) => {
                        child.questionScore = '2' // 分数
                        let childObj = {} // 子题
                        let state // 作业状态
                        let questionIsappeal = child.questionIsappeal === 1 // 是否申诉
                        let studentIsView // 是否已经批阅
                        // 主观题
                        if (child.hasRewive !== 2) {
                          // 不是学生批阅的
                          if (child.hasRewive === 0) {
                            // 没有批阅
                            state = 1
                          } else {
                            if (child.questionScore == child.score) {
                              // 对
                              state = 2
                            } else if (child.score == 0) {
                              // 错
                              state = 3
                            } else {
                              // 半对
                              state = 4
                            }
                          }
                        } else {
                          // 是学生批阅的
                          if (child.questionIsappeal === 1) {
                            // 有申诉
                            state = 5
                          } else {
                            if (child.hasRewive === 0) {
                              state = 1
                            } else {
                              if (child.questionScore == child.score) {
                                state = 2
                              } else if (child.score == 0) {
                                state = 3
                              } else {
                                state = 4
                              }
                            }
                          }
                        }
                        childObj = {
                          id: child.homeworkQuestionId,
                          index: index,
                          ...child,
                          questionIsappeal: questionIsappeal,
                          state: state
                        }
                        return childObj
                      }
                    )
                  }
                  return obj
                }
              )
            }
            if (this.toRead.length) {
              this.haveRead = true
              this.computedNextQuestion(false)
            } else {
              this.haveRead = false
              // if (
              //   this.subtopicList.length &&
              //   this.subtopicList[0].children.length
              // ) {
              //   defaultObj['item'] = this.subtopicList[0]
              //   defaultObj['child'] = this.subtopicList[0].children[0]
              // }
              //return obj

              if (
                this.subtopicList.length &&
                this.subtopicList[0].children.length
              ) {
                defaultObj['item'] = this.subtopicList[0]
                defaultObj['child'] = this.subtopicList[0].children[0]
              }
              this.subtopicId = defaultObj.child.id
              this.subtopicChange(defaultObj)
            }
          }
          if (this.toRead.length) {
            this.haveRead = true
            this.computedNextQuestion(false)
          } else {
            this.haveRead = false
            if (
              this.subtopicList.length &&
              this.subtopicList[0].children.length
            ) {
              defaultObj['item'] = this.subtopicList[0]
              defaultObj['child'] = this.subtopicList[0].children[0]
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 查看原文
    lookOriginal() {
      this.$refs['original'].id = this.questionId
      this.$refs['original'].visible = true
    },
    // 点击完成批阅
    readOver() {
      if (this.toRead.length === 0) {
        let fileImage
        if (this.$refs.subjectiveItem != undefined) {
          fileImage = this.$refs.subjectiveItem.getFile()
        }
        if (
          (this.file != undefined && this.file != null) ||
          (fileImage != undefined && fileImage != null)
        ) {
          this.submitReadOver(Number(this.questionInfo.score), true)
        } else {
          if (this.isNextDialog) {
            if (this.toReadStudent.length > 0) {
              // 打开下个学生模态框
              this.nextReviewStudent = true
            } else {
              // 打开没有学生代批阅模态框
              //this.noStudent = true
              this.$router.go(-1)
              this.$message.success('恭喜您全部作业批阅完成')
              return
            }
          } else {
            this.$router.go(-1)
            this.$message.success('恭喜您全部作业批阅完成')
            return
          }
        }
      } else {
        this.readVisible = true
      }
    }
  }
}
</script>
