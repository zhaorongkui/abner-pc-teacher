<style scoped>
.read-item-details {
  width: 1200px;
  display: flex;
  padding: 20px 0;
  height: calc(100% - 42px);
  overflow: auto;
}
.details-left {
  height: 100%;
  width: 130px;
  overflow: auto;
}
.details-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.details-info {
  display: flex;
  justify-content: space-between;
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
.breadcrumb-box {
  padding-top: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(94, 132, 173, 1);
}
.questiongroup {
  padding-top: 5px;
  padding-left: 20px;
}
.questiongroup p {
  font-size: 14px;
  color: #5e84ad;
  margin-bottom: 10px;
}
.questiongroup span {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 14px;
  border: 1px solid #d6e1e5;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
.questiongroup span.hover-span {
  background: #399eff;
  color: #fff;
}
</style>
<template>
  <div style="height: 100%">
    <div class="breadcrumb-box">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/work">作业</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/work-read-data-analysis">数据分析</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item
          >篇目详情(共{{ questionTypeList.length }}篇)</a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <div class="read-item-details">
      <div class="details-left card margin-right-10">
        <subtopic-list1
          ref="subtopicList"
          :typelist="questionTypeList"
          @on-change="handleQuestionTypeSelect"
        />
      </div>
      <div class="details-right card">
        <div class="details-info">
          <div style="flex: 1">
            <time-cost1
              :labeltitle="labeltitle"
              :avageAnswerTime="avageAnswerTime"
              :avageReadTime="avageReadTime"
            />
            <tag-list1 style="margin-left: 33px" :questiondata="questionData" />
          </div>
          <div class="view-question" @click="lookOriginal">
            <a-icon type="eye" /> 查看原文
          </div>
        </div>
        <div class="details-main">
          <div class="details-topic">
            <topic1
              ref="topic"
              :value="tagListValue"
              :questiondata="questionData"
            />
          </div>
          <div class="details-reply margin-left-10">
            <topic-item title="作答分析" />
            <template v-if="!isTable">
              <div
                class="questiongroup"
                v-if="questionData.questionTypeCode === 4"
              >
                <span
                  @click="selecTh(index)"
                  v-for="(item, index) in questionData.childInfoList"
                  :key="index"
                  :class="selecThtype == index ? 'hover-span' : ''"
                  >{{ index + 1 }}</span
                >
                <a-divider></a-divider>
              </div>
              <custom-circle-echarts
                ref="customCircleEcharts"
                :questiondata="questionData"
                @questionGroupCheck="questionGroupCheck"
              ></custom-circle-echarts>
            </template>
            <custom-table-list v-else ref="customTableList"></custom-table-list>
          </div>
        </div>
      </div>
      <look-original ref="original" />
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import customCircleEcharts from './components/customCircleEcharts'
import customTableList from './components/customTableList'
import TagList1 from './components/TagList1'
import TimeCost1 from './components/TimeCost1'
import topic1 from './components/topic1'
import LookOriginal from '../../components/LookOriginal'
import SubtopicList1 from './components/SubtopicList1'
import TopicItem from '../../components/problem/topic-item'
// import TrueOfFalse from '../../components/answerDetails/TrueOfFalse'
// import QuestionGroup from '../../components/answerDetails/QuestionGroup'
// import FillInTheBlanks from '../../components/answerDetails/FillInTheBlanks'
// import MultipleChoiceQuestion from '../../components/answerDetails/MultipleChoiceQuestion'
export default {
  name: 'read-question-details',
  components: {
    customCircleEcharts,
    customTableList,
    topic1,
    TagList1,
    TimeCost1,
    TopicItem,
    // TrueOfFalse,
    LookOriginal,
    SubtopicList1
    // QuestionGroup,
    // FillInTheBlanks,
    // MultipleChoiceQuestion
  },
  data() {
    return {
      tagListValue: null,
      item1: {},
      questionId: 0,
      selecThtype: 0,
      visible: true,
      questionTypeList: [],
      questionData: {},
      isTable: false,
      parentQuestionId: 0,
      avageAnswerTime: '',
      avageReadTime: '',
      labeltitle: 1
    }
  },
  mounted() {
    if (this.$route.params.item) {
      this.questionId = this.$route.params.item.questionId
      this.item1 = this.$route.params.item1
      this.getQuestionInfo()
    } else {
      this.questionId = localStorage.getItem('questionId')
      localforage.getItem('workListItem').then(value => {
        this.item1 = value
        this.getQuestionInfo()
      })
    }
  },
  methods: {
    getChartData(data) {
      this.selecThtype = 0
      this.$nextTick(() => {
        if (data.questionTypeCode == 4) {
          this.selecTh(0, 1)
          this.$refs.customCircleEcharts.drawPie(
            data.childInfoList[0].trueStudentCount || 0,
            data.childInfoList[0].errorStudentList != undefined
              ? data.childInfoList[0].errorStudentList.length
              : 0,
            data.childInfoList[0].unSubmitStudentCount || 0,
            data.childInfoList[0].halfTrueStudentCount || 0
          )
        } else {
          this.$refs.customCircleEcharts.drawPie(
            data.trueStudentCount || 0,
            data.errorStudentList != undefined
              ? data.errorStudentList.length
              : 0,
            data.unSubmitStudentCount || 0,
            data.halfTrueStudentCount || 0
          )
        }
      })
    },
    getTableData(data) {
      let tableData = data.fullQuestionStatistical
        ? JSON.parse(data.fullQuestionStatistical)
        : []
      let result = []
      tableData.map((val, index) => {
        result.push({
          index: index,
          answer: val.answer,
          errorStudentList: val.errorStudentList,
          errorStudentCount: val.errorStudentList.length,
          trueStudentCount: val.trueStudentCount,
          unSubmitStudentCount: val.unSubmitStudentCount
        })
      })
      this.$nextTick(() => {
        this.$refs.customTableList.readQuestionTableData = []
        this.$refs.customTableList.readQuestionTableData.push(...result)
      })
    },
    // 获取试题信息
    getQuestionInfo() {
      this.$http
        .get('/api/teacher/homework/statistical/article/question/list', {
          params: {
            homeworkClassId: this.item1.homeworkClassId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            this.questionTypeList.splice(
              0,
              this.questionTypeList.length,
              ...res.data.infos
            )
            this.questionTypeList.map(val => {
              if (val.questionId === Number(this.questionId)) {
                this.handleQuestionTypeSelect(val.childQuestion[0])
                this.$refs.subtopicList.setValue(val, 1)
              }
            })
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取试题类型失败！')
          }
        })
        .catch(err => {
          this.$message.error('获取试题类型失败！')
          console.log(err)
        })
    },
    lookOriginal() {
      this.$refs['original'].id = this.questionId
      this.$refs['original'].visible = true
    },
    handleQuestionTypeSelect(val) {
      this.$http
        .get('/api/teacher/homework/statistical/question/info', {
          params: {
            homeworkClassId: this.item1.homeworkClassId,
            homeworkQuestionId: val.homeworkQuestionId,
            teacherId: this.item1.teacherId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            let data = res.data.infos
            if (data.questionTypeCode === 3) {
              let answer = data.questionAnswer
              data.questionAnswer = answer
                ? answer === 'N'
                  ? '错误'
                  : '正确'
                : null
            }
            this.questionData = {
              ...data
            }
            let arr = []
            this.questionTypeList.map(value => {
              if (value.homeworkQuestionId === val.homeworkQuestionParentId) {
                arr.push(value)
              }
            })
            arr = this.questionTypeList.filter(
              value => value.homeworkQuestionId === val.homeworkQuestionParentId
            )
            this.questionId = arr[0].questionId
            this.avageAnswerTime = arr[0].avageAnswerTime
            this.avageReadTime = arr[0].avageReadTime
            this.labeltitle = arr[0].homeworkQuestionSort
            // 主观题
            if (val.questionTypeCode === 6) {
              this.isTable = false
              // 渲染图表
              this.getChartData(data)
            }
            // 填空题
            if (val.questionTypeCode === 5) {
              this.isTable = true
              // 渲染表格
              this.getTableData(data)
            }
            // 非填空非主观
            if (val.questionTypeCode !== 5 && val.questionTypeCode !== 6) {
              this.isTable = false
              // 渲染图表
              this.getChartData(data)
            }
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('获取分析数据失败！')
          }
        })
        .catch(err => {
          this.$message.error('获取分析数据失败！')
          console.log(err)
        })
    },
    // 题组选择
    questionGroupCheck(index, time) {
      if (
        this.questionData.childInfoList &&
        this.questionData.childInfoList[index]
      ) {
        let currentId = this.questionData.childInfoList[index].questionInfoId
        this.tagListValue = currentId
        this.$refs.topic.setValue(this.tagListValue, time)
      }
    },
    // 选题号
    selecTh(t, time) {
      this.selecThtype = t
      this.questionGroupCheck(t, time)
      // this.$refs.customCircleEcharts.drawPie(
      //   this.questionData.childInfoList[this.selecThtype]
      //     .trueStudentCount || 0,
      //   this.questionData.childInfoList[this.selecThtype]
      //     .errorStudentList != undefined
      //     ? this.questionData.childInfoList[this.selecThtype]
      //         .errorStudentList.length
      //     : 0,
      //   this.questionData.childInfoList[this.selecThtype]
      //     .unSubmitStudentCount || 0,
      //   this.questionData.childInfoList[this.selecThtype]
      //     .halfTrueStudentCount || 0
      // )
    }
  }
}
</script>
