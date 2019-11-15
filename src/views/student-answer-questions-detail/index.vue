<style scoped>
.student-answer-questions-detail {
  margin-top: 20px;
  width: 1200px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 42px);
}
.slot-box {
  padding: 20px;
  display: flex;
}
.slot-left {
  flex: 1;
}
.slot-right {
  cursor: pointer;
  display: flex;
  color: rgba(86,172,255,1);
  font-size:16px;
  font-weight:400;
  justify-content: center;
  align-items: center;
}
.eye {
  margin: 0 10px;
  font-size:25px;
  display: inline-flex;
  width: 39px;
  height: 39px;
  border-radius: 50%;
  box-shadow:0px 3px 10px 0px rgba(100,100,100,0.31);
  justify-content: center;
  align-items: center;
}
.content-student {
  width: 100%;
  display: flex;
}
.conten-statistical {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.statistical-value {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size:18px;
  font-weight:400;
  color:rgba(55, 111, 214, 1);
}
.question-detail {
  min-height: 0;
  flex: 1;
  display: flex;
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
  flex-direction: column
}
.details-info {
  display: flex;
  margin-bottom: 14px;
}
.view-question {
  display: inline-block;
  cursor: pointer;
  font-size:14px;
  font-weight:400;
  color:rgba(86,172,255,1);
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
  background:rgba(255,255,255,1);
  border:1px solid rgba(222, 222, 222, 1);
  border-radius:4px;
  overflow: auto;
}
</style>
<template>
  <div class="student-answer-questions-detail">
    <div class="margin-bottom-20">
      <div class="content-info margin-bottom-10">
        <contents-detailsCard name="说明文">
          <div class="slot-box">
            <div class="slot-left">
            <tag-list :data="info" />
            <a-divider style="margin: 20px 0" />
            <tag-list color="#999999" :data="ability" />
            </div>
            <div class="slot-right" @click='lookOriginal'>
              <span class="eye"><a-icon type="eye" /></span><span>查看原文</span>
            </div>
          </div>
        </contents-detailsCard>
      </div>
      <div class="content-student">
        <div class="conten-statistical">
          <contents-detailsCard style="width: 290px" v-for="(item, index) in statistical" :name="item.label" :key="index">
            <div class="statistical-value">{{item.value}}</div>
          </contents-detailsCard>
        </div>
      </div>
    </div>
    <div class="question-detail">
      <div class="details-left card margin-right-10">
        <subtopic-list v-model="subtopicId" :list="subtopicList" @on-change="subtopicChange" />
      </div>
      <div class="details-right card">
        <div class="details-main">
          <div class="details-topic">
            <topic :titleToMain='true' :value="currentChildQuestionId" :topicData="topicData" />
          </div>
          <div class="details-reply margin-left-10">
            <topic-item title="答题区">
              <question-group style='margin: 76px 0 0 29px;' :options="questionGroup" v-if="questionType === 1" :answer="answer" :reply="reply" :key="'questionGroup'" />
              <question-group style='margin: 76px 0 0 29px;' :options="questionGroup" :multiple="true" v-if="questionType === 2" :answer="answer" :reply="reply" :key="'multpleQuestionGroup'" />
              <true-of-false style='margin: 96px 0 0 0;' v-else-if="questionType === 3" :answer="answer" :reply="reply" />
              <multiple-choice-question style='margin: 20px 0 0 10px;' v-else-if="questionType === 4" :questionGroupList='questionGroupList' @on-change="multipleChoiceQuestionChange"/>
              <fill-in-the-blanks style='margin: 36px 0 0 29px;' v-else-if="questionType === 5" :answer="answer" :reply="reply" />
              <div style='margin: 20px 0;' v-else-if="questionType === 6">
                <subjective-item :questionInfo="questionInfo" /> 
              </div>
            </topic-item>
          </div>
        </div>
      </div>
    </div>
    <look-original ref="original" />
  </div>
</template>
<script>
import ContentsDetailsCard from '../../components/ContentsDetailsCard'
import LookOriginal from '../../components/LookOriginal'
import TagList from '../../components/TagList'
import SubtopicList from '../../components/SubtopicList'
import SubjectiveItem from '../../components/answerDetails/SubjectiveItem'
import TopicItem from '../../components/problem/topic-item'
import Topic from '../../components/problem/topic'
import TrueOfFalse from '../../components/answerDetails/TrueOfFalse'
import QuestionGroup from '../../components/answerDetails/QuestionGroup'
import FillInTheBlanks from '../../components/answerDetails/FillInTheBlanks'
import MultipleChoiceQuestion from '../../components/answerDetails/MultipleChoiceQuestion'
import {relativeTime} from '../../filters'
const questionType = {
  '1': '单选题',
  '2': '多选题',
  '3': '判断题',
  '4': '题组',
  '5': '填空题',
  '6': '主观题'
}
export default {
  name: 'studentAnswerQuestionsDetail',
  components: {
    ContentsDetailsCard,
    LookOriginal,
    TagList,
    TrueOfFalse,
    QuestionGroup,
    FillInTheBlanks,
    MultipleChoiceQuestion,
    SubtopicList,
    TopicItem,
    Topic,
    SubjectiveItem
  },
  computed: {
    currentChildQuestionId () {
      if (this.questionGroupList.length) {
        return this.questionGroupList[this.multipleChoiceQuestionValue].id
      } else {
        return 0
      }
    },
    teacherId () {
      return this.$store.getters.teacherId
    },
    section () {
      return this.$store.getters.section
    },
    subjectAbbreviation () {
      return this.$store.getters.subjectAbbreviation
    }
  },
  data () {
    return {
      info: [
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
          label: '子题数',
          value: '--'
        },
        {
          label: '阅读量',
          value: '--'
        },
        {
          label: '相关主题',
          value: '--'
        }
      ],
      ability: [
        {
          label: '能力维度',
          value: ['--']
        }
      ],
      statistical: [
        {
          label: '正确率',
          value: '--'
        },
        {
          label: '阅读用时',
          value: '--'
        },
        {
          label: '作答用时',
          value: '--'
        },
        {
          label: '阅读速度',
          value: '--'
        },
      ],
      multipleChoiceQuestionValue: 0, // 题组中当前选中的题的value
      questionInfo: null, // 当前题的详情
      answer: null, // 正确答案
      reply: null, // 学生回答
      questionGroup: [], // 选择题选项选项
      questionGroupList: [], // 题组
      questionId: null, // 当前问题id
      questionType: null, // 当前问题类型
      subtopicId: null, // 左侧列表id
      topicData: {}, // 问题题干解析答案
      subtopicList: [], // 左侧列表
      audioURL: null, // 语音url
      rightNumber: 0
    }
  },
  created () {
    this.studentQuestionList()
  },
  methods: {
    studentQuestionList() {
      let {homeworkId = null, homeworkQuestionId = null, questionId = null, studentId = null} = this.$route.query
      let data = {
        homeworkId,
        homeworkQuestionId,
        questionType: null,	
        studentInfoId: studentId 
      }
      this.$http.get('/api/student/homework/question/list', {params: data}).then(res => {
        if (res.data.flag===1) {
          let remote = res.data.infos
          this.homeworkClassId = remote.homeworkClassId
          if (remote.homeworkQuestionList&&remote.homeworkQuestionList.length) {
            let obj = {
              id: homeworkQuestionId,
              index: 0,
              children: []
            }
            this.rightNumber = 0
            obj.children = remote.homeworkQuestionList.map((child, index) => {
              child.questionScore = '2' // 分数
              let childObj = {} // 子题
              let state; // 作业状态
              let questionIsappeal = child.questionIsappeal === 1 // 是否申诉
              let studentIsView; // 是否已经批阅
              // 主观题
              if (child.hasRewive !== 2) { // 不是学生批阅的
                if (child.hasRewive === 0) { // 没有批阅
                  state = 1
                } else {
                  if (child.questionScore == child.score) { // 对
                    this.rightNumber += 1
                    state = 2
                  } else if (child.score == 0) { // 错
                    state = 3
                  } else { // 半对
                    state = 4
                  }
                }
              } else { // 是学生批阅的
                if (child.questionIsappeal === 1) { // 有申诉
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
                state: state,
              }
              return childObj
            }) 
            this.subtopicList = [obj]
          }
          let defaultObj = {item: null, child: null};
          if (this.subtopicList.length && this.subtopicList[0].children.length) {
            defaultObj.item = this.subtopicList[0]
            defaultObj.child = this.subtopicList[0].children[0]
          }
          this.subtopicId = defaultObj.child.id
          this.subtopicChange(defaultObj)
          this.getQuestionInfo()
        }
      }).catch(err => {
        console.error(err)
      })
    },
    subtopicChange ({item, child}) {
      this.currentIndex = [item.index, child.index]
      this.questionId = item.questionId
      this.getQuestionContent(child.homeworkQuestionId)
    },
    getQuestionContent (id) {
      let data = {
        homeworkQuestionId: id,
        studentInfoId: this.$route.query.studentId
      }
      this.$http('/api/student/homework/question/info', {params: data}).then((res) => {
        if (res.data.flag === 1) {
          let remote = res.data.infos
          console.log('答题详情', remote)
          this.questionType = remote.questionTypeCode
          let obj = {
            id: remote.questionId,
            topicName: '题目',
            topicType: questionType[remote.questionTypeCode],
            topicProblem: remote.questionStem,
            topicMain: remote.questionStem,
            reference: remote.questionAnswer,
            analysis: remote.questionAnalysis,
          }
          if (remote.questionTypeCode === 4) {
            let questionArr = []
            let question = {}
            if (remote.childQuestionList&&remote.childQuestionList.length) {
              let children = remote.childQuestionList.map((item, index) => {
                question = {
                  id: item.questionId,
                  answer: item.questionAnswer,
                  reply: item.answerContent
                }
                if (item.optionsList&&item.optionsList.length) {
                  question.options = item.optionsList.map((item) => {
                    return {
                      label: item.questionContent,
                      value: item.questionOption
                    }
                  })
                }
                questionArr.push(question)
                return {
                  id: item.questionId,
                  topicName: '子题' + index + 1,
                  topicProblem: item.questionStem,
                  topicMain: item.questionStem,
                  reference: item.questionAnswer,
                  analysis: item.questionAnalysis,
                }
              })
              obj.children = children
            }
            this.questionGroupList = questionArr
          }
          if (remote.questionTypeCode === 1 || remote.questionTypeCode === 2) {
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
            let src = ''
            this.answer.forEach((item, index) => {
              src += `<span>${index+1}、 ${item.answer.join('，')}；</span>`
            })
            obj.reference = `<p>${src}</p>`
          } else if(remote.questionTypeCode !==4) {
            if (remote.questionTypeCode === 6) {
              let url = null
              this.questionInfo = remote
              // 判断当前老师是否有语音
              if (remote.reviewList && remote.reviewList.length) {
                let reviewList = remote.reviewList.filter((item) => {
                  return item.reviewUserType === 2
                })
                if (reviewList.length && reviewList[0].reviewVoiceStr) {
                  url = reviewList[0].reviewVoiceStr
                }
              }
              this.audioURL = url
            } else {
              this.answer = remote.questionAnswer,
              this.reply = remote.answerContent
            }
          } 
          this.questionGroup = obj.options
          this.topicData = obj
        }
      }).catch(err => {
        console.error(err)
      })
    },
    articleQuestionInfo() {
      /**
        abilityDimensions	能力纬度字符串	string	
        answerTime	作答时长（秒）	number	
        finishQuestionNum	完成题数	number	
        homeworkQuestionId	作业试题ID	number	
        questionArticleTitle	文章标题	string	
        questionId	试题id	number	
        questionInfoId	试题id	number	
        questionNum	文章总题数	number	
        questionNumber	试题题号	number	
        questionStem	题干	string	
        questionUuid	试题uuid	string	
        readTime	阅读时长（秒）	number	
        workbookChapterPage	试题所在页码	number	
        workbookName	练习册名称	string
      */
      let {questionId = null, studentId = null} = this.$route.query
      let data = {
        articleId: questionId,
        studentId: studentId,
        homeworkClassId: this.homeworkClassId,
        section: this.section,
        subjectAbbreviation: this.subjectAbbreviation,
      }     
      this.$http.get('/api/student/homework/article/question/info', {params: data}).then(res => {
        if (res.data.flag === 1) {
          let remote = res.data.infos
          if (this.rightNumber && remote.questionNum) {
            this.statistical[0].value = ((this.rightNumber / remote.questionNum) * 100).toFixed(1) + '%'; // 正确率
          } else {
            this.statistical[0].value = '0%'; // 正确率
          }
          this.statistical[1].value = remote.readTime?relativeTime(remote.readTime):'--'; // 阅读用时
          this.statistical[2].value = remote.readTime?relativeTime(remote.answerTime):'--'; // 作答用时
          let textNum = this.info[4].value;
          if (textNum && remote.readTime) {
            this.statistical[3].value = textNum/remote.readTime * 60 + '字/分钟';
          } else {
            this.statistical[3].value = '--'; // 阅读速度
          }
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getQuestionInfo() {
      let {questionId = null, studentId = null} = this.$route.query
      let data = {
        questionId,
        studentId: studentId,
        section: this.section,
        subjectAbbreviation: this.subjectAbbreviation,
        teacherId: this.teacherId
      }
      this.$http.get('/api/question/article/info', {params: data}).then((res) => {
        if (res.data.flag === 1) {
          let remote = res.data.infos
          this.info[0].value = remote.workbookName
          this.info[1].value = remote.workbookChapterPage
          this.info[2].value = remote.questionNumber
          this.info[3].value = remote.questionChildNum
          this.info[4].value = remote.questionTextNum
          this.info[5].value = remote.questionTitleName
          this.ability[0].value = remote.dimensionNames.split('|').map(item => $.trim(item))
          this.articleQuestionInfo()
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    lookOriginal () {
      let {questionId} = this.$route.query
      this.$refs['original'].id = questionId;
      this.$refs['original'].visible = true;
    }
  }
}
</script>