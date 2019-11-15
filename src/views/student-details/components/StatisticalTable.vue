<style scoped>
.sdtatistical-table {
  height: 100%;
  display: flex;
  flex-direction: column
}
.table-box {
  min-height: 0;
  width: 100%;
  flex: 1
}
</style>
<template>
  <div class="sdtatistical-table">
    <div class="fileter-data">
      <filtrate class="margin-bottom-10" v-model="questionTextTypeValue" :selectData="questionTextType" :selectName="'文体'"/> 
      <filtrate class="margin-bottom-10" v-model="questionTitleValue" :selectData="questionTitle" :selectName="'先关主题'"/> 
    </div>
    <headline title="阅读篇目统计表" />
    <div class="table-box" ref="tableBox">
      <a-table 
        class="hwd-table"
        :scroll="{y: tableHeight}"
        :columns="columns"
        :dataSource="dataFilter"
        :pagination="false"
        :customRow="studentQuestionAnswer"
      >
        <span slot="questionTitle" slot-scope="questionTitle">
          <template v-if="questionTitle">
            {{questionTitleObj[questionTitle] || '--'}}
          </template>
          <template v-else>
            --
          </template>
        </span>
        <span slot="readSpeed" slot-scope="readSpeed">
          <template v-if="readSpeed">
            {{readSpeed + '字/分钟'}}
          </template>
          <template v-else>
            --
          </template>
        </span>
        <span slot="finishRate" slot-scope="finishRate">
          <template v-if="finishRate">
            {{finishRate + '%'}}
          </template>
          <template v-else> -- </template>
        </span>
        <span slot="trueRate" slot-scope="trueRate">
          <template v-if="trueRate">
            {{trueRate + '%'}}
          </template>
          <template v-else> -- </template>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import Filtrate from '../../../components/Filtrate'
import Headline from '../../../components/Headline'
import {relativeTime, formatDate} from '../../../filters'
export default {
  name: 'sdtatistical-table',
  components: {Filtrate, Headline},
  data () {
    return  {
      data: [],
      tableHeight: 0,
      columns: [
        {
          title: '篇目标题',
          align: 'center',
          width: 142,
          dataIndex: "questionArticleTitle",
          key: "questionArticleTitle",
        },
        {
          title: '文体',
          align: 'center',
          width: 132,
          dataIndex: "questionTextType",
          key: "questionTextType",
        },
        {
          title: '相关主题',
          align: 'center',
          width: 142,
          dataIndex: "questionTitle",
          key: "questionTitle",
          sorter: (a, b) => a.questionTitle - b.questionTitle,
          scopedSlots: { customRender: 'questionTitle' }
        },
        {
          title: '阅读量',
          align: 'center',
          width: 132,
          dataIndex: "wordCount",
          key: "wordCount",
          sorter: (a, b) => a.wordCount - b.wordCount,
        },
        {
          title: '完成率',
          align: 'center',
          width: 132,
          dataIndex: "finishRate",
          key: "finishRate",
          sorter: (a, b) => a.finishRate - b.finishRate,
          scopedSlots: { customRender: 'finishRate' }
        },
        {
          title: '正确率',
          align: 'center',
          width: 132,
          dataIndex: "trueRate",
          key: "trueRate",
          sorter: (a, b) => a.trueRate - b.trueRate,
          scopedSlots: { customRender: 'trueRate' }
        },
        {
          title: '阅读速度',
          align: 'center',
          width: 142,
          dataIndex: "readSpeed",
          key: "readSpeed",
          sorter: (a, b) => a.readSpeed - b.readSpeed,
          scopedSlots: { customRender: 'readSpeed' }
        },
        {
          title: '训练时间',
          align: 'center',
          width: 202,
          dataIndex: "homeworkStarttime",
          key: "homeworkStarttime",
          customRender: (text, record, index) => {
            // reviewType 0未批阅 1老师批阅 2学生批阅 3系统批阅 4老师加学生批阅	
            // submitType	1未答 2未完成 3已完成
            if (record.submitType === 1 || record.submitType === null) {
              return <span style="color: #FF6365">{"整篇未做"}</span>
            } else if (record.submitType === 2) {
              return <span style="color: #FF6365">{"未完成"}</span>
            } else if (record.reviewType === 0 || record.reviewType === null) {
              return <span style="color: #1059FF">{"未批阅"}</span>
            } else {
              return <span>{record.homeworkStarttime?formatDate(record.homeworkStarttime):'--'}</span>
            }
          }
        },
      ],
      questionTextTypeValue: '全部',
      questionTitleValue: '全部',
      questionTextType: [],
      questionTitle: []
    }
  },
  computed: {
    questionTitleObj () {
      let obj = {}
      this.questionTitle.forEach((item) => {
        obj[item.value] = item.label
      })
      return obj
    },
    section () {
      return this.$store.getters.section
    },
    subjectAbbreviation () {
      return this.$store.getters.subjectAbbreviation
    },
    dataFilter () {
      let arr = []
      arr = this.data.filter((item) => {
        return this.questionTitleValue === "全部" ? true : item.questionTitle === this.questionTitleValue
      })
      arr = arr.filter((item) => {
        return this.questionTextTypeValue === "全部" ? true : item.questionTextType === this.questionTextTypeValue
      })
      return arr
    }
  },
  created () {
    this.articleStatistical()
    this.getQuestionTextType()
    this.getQuestionTitle()
  },
  mounted () {
    this.getTableHeight()
    window.onresize = () => {
      this.getTableHeight()
    }
  },
  methods: {
    getTableHeight() {
      if (this.$refs.tableBox) {
        this.tableHeight = this.$refs.tableBox.offsetHeight - 178
      }
    },
    studentQuestionAnswer (record, index) {
      return {
        on: {
          click: () => {
            console.log(record)
            let {studentId = null, studentName = '该'} = this.$route.query
            if (!record.submitType || record.submitType === 0) {
              this.$message.info(`${studentName}同学未做此篇目的作答部分`);
              return false;
            }
            this.$router.push({
              name: 'studentQuestionDetails',
              query: {
                questionId: record.articleId,
                homeworkId: record.homeworkId,
                homeworkQuestionId: record.homeworkQuestionId,
                studentId,
                homeworkClassId: record.classId
              }
            })
          }
        }
      }
    },
    getQuestionTextType() {
      this.$http.get('/api/system/questionTextType/list').then(res => {
        if (res.data.flag === 1) {
          this.questionTextType = res.data.infos.map((item) => {
            return {
              label: item.dataKey,
              value: item.dataKey
            }
          })
          this.questionTextType.reverse()
          this.questionTextType.push({value:'全部',label:'全部'})
          this.questionTextType.reverse()
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getQuestionTitle() {
      this.$http.get('/api/system/questionTitle/list').then(res => {
        if (res.data.flag === 1) {
          this.questionTitle = res.data.infos.map((item) => {
            return {
              label: item.dataKey,
              value: item.dataValue
            }
          })
          this.questionTitle.reverse()
          this.questionTitle.push({value:'全部',label:'全部'})
          this.questionTitle.reverse()
        }
      }).catch(err => {
        console.error(err)
      })
    },
    articleStatistical() {
      let {studentId = null} = this.$route.query
      let data = {
        studentId,
        section: this.section,
        subjectAbbreviation: this.subjectAbbreviation
      }
      /**
        answerTime	答题时间		
        articleId	文章ID		
        finishRate	完成率		
        homeworkClassId	作业班级ID		
        homeworkId	作业ID		
        homeworkQuestionId	作业试题ID		
        homeworkStarttime	作业开始时间		
        questionArticleTitle	文章标题		
        questionStem	文章内容		
        questionTextType	试题文本类型		
        questionTextTypeName	试题文本类型名称		
        questionTitle	试题相关主题		
        questionTitleName	试题相关主题名称		
        readSpeed	阅读速度		
        readTime	阅读时间		
        reviewType	批阅状态：0-未批阅，1-老师批阅，2-学生批阅，3-系统批阅，4-老师加学生批阅		
        submitType	作业状态 1：未答 2：未完成 3：已完成		
        trueRate	正确率		
        wordCount	单词数量
      */
      this.$http.get('/api/student/homework/analysis/article/statistical', {params: data}).then(res => {
        if (res.data.flag === 1) {
          let remote = res.data.infos
          if (remote&&remote.length) {
            this.data = remote.map(item => {
              return {
                articleId: item.articleId,
                homeworkClassId: item.homeworkClassId,
                reviewType: item.reviewType || null,
                submitType: item.submitType || null,
                homeworkId: item.homeworkId,
                questionArticleTitle: item.questionArticleTitle || '--',
                homeworkQuestionId: item.homeworkQuestionId,
                questionTitleName: item.questionTitleName || '--',
                questionTextType: item.questionTitleName || '--',
                questionTitle: item.questionTextType || '--',
                wordCount: item.wordCount || 0,
                finishRate: item.finishRate ? Number(item.finishRate) : null,
                trueRate: item.trueRate ? Number(item.trueRate) : null,
                readSpeed: item.readSpeed ? Number(item.readSpeed) * 60 : 0,
                homeworkStarttime: item.homeworkStarttime
              }
            }) 
          }
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
