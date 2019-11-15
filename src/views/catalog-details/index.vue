<style scoped>
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
  display: flex;
}
.conten-statistical {
  display: flex;
}
.student-filter {
  flex: 1
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
.student-filter-box {
  width: 390px;
  padding: 3px 10px;
}
</style>
<template>
  <div class="reading">
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
        <div class="student-filter">
          <contents-detailsCard name="班级">
            <div class="student-filter-box">
              <student-filter :data="gradeClassList" v-model="classId" @on-change="classChange"></student-filter>
            </div>
          </contents-detailsCard>
        </div>
        <div class="conten-statistical">
          <contents-detailsCard style="margin-left: 10px;" :style="{width: (item.width?item.width:200)+'px'}" v-for="(item, index) in statistical" :name="item.label" :key="index">
            <div class="statistical-value">{{item.value}}</div>
          </contents-detailsCard>
        </div>
      </div>
    </div>
    <div class="table-card card" ref="tableCard">
      <a-table 
        :scroll="{y: tableHeight}" 
        class="hwd-table" 
        :columns="columns" 
        :dataSource="data" 
        :pagination="false"
        :customRow="studentQuestionAnswer"
      >
        <template slot="readTime" slot-scope="readTime">
          <template v-if="readTime">
            <span>{{readTime | relativeTime}}</span>
          </template>
          <template v-else>--</template>
        </template>
        <template slot="readSpeed" slot-scope="readSpeed">
          <template v-if="readSpeed">
            {{ readSpeed + '字/分钟' }}
          </template>
          <template v-else >--</template>
        </template>
        <template slot="avageTrueRate" slot-scope="avageTrueRate">
          <template v-if="avageTrueRate">
            {{ avageTrueRate + '%' }}
          </template>
          <template v-else >--</template>
        </template>
      </a-table>
    </div>
    <look-original ref="original" />
  </div>
</template>

<script>
import ContentsDetailsCard from '../../components/ContentsDetailsCard'
import StudentFilter from '../../components/StudentFilter'
import LookOriginal from '../../components/LookOriginal'
import TagList from '../../components/TagList'
import {relativeTime, formatDate} from '../../filters'

export default {
  name: "catalog-details",
  components: {
    ContentsDetailsCard,
    StudentFilter,
    LookOriginal,
    TagList
  },
  computed: {
    gradeClassList () {
      return this.$store.getters.gradeClassList.map((item) => {
        return {
          value: item.gradeClassid,
          label: item.gradeClassname
        }
      })
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
      data: [],
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
          label: '完成率',
          value: '--',
          width: 200
        },
        {
          label: '正确率',
          value: '--',
          width: 200
        },
        {
          label: '平均阅读用时',
          value: '--',
          width: 300
        }
      ],
      columns: [
        {
          title: "姓名",
          align: 'center',
          width: 228,
          dataIndex: "studentName",
          key: "studentName",
        },
        {
          title: "阅读用时",
          align: 'center',
          width: 228,
          dataIndex: "readTime",
          sorter: (a, b) => a.readTime - b.readTime,
          scopedSlots: { customRender: 'readTime' },
          key: "readTime"
        },
        {
          title: "阅读速度",
          align: 'center',
          width: 228,
          dataIndex: "readSpeed",
          sorter: (a, b) => a.readSpeed - b.readSpeed,
          scopedSlots: { customRender: 'readSpeed' },
          key: "readSpeed"
        },
        {
          title: "正确率",
          align: 'center',
          width: 228,
          dataIndex: "avageTrueRate",
          sorter: (a, b) => a.avageTrueRate - b.avageTrueRate,
          scopedSlots: { customRender: 'avageTrueRate' },
          key: "avageTrueRate",
        },
        {
          title: "完成训练时间",
          align: 'center',
          width: 228,
          dataIndex: "submitTime",
          key: "submitTime",
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
              return <span>{record.submitTime?formatDate(record.submitTime):'--'}</span>
            }
          }
        }
      ],
      classId: '',
      tableHeight: 0
    }
  },
  created () {
    this.classId = this.gradeClassList[0].value
    this.getStudentData()
    this.getQuestionInfo()
  },
  mounted () {
    this.getTableHeight()
    window.onresize = () => {
      this.getTableHeight()
    }
  },
  methods: {
    studentQuestionAnswer (record, index) {
      return {
        on: {
          click: () => {
            if (!record.submitType || record.submitType === 0) {
              this.$message.info(`${record.studentName}同学未做此篇目的作答部分`);
              return false;
            }
            let {questionId, homeworkId} = this.$route.query
            this.$router.push({
              name: 'studentQuestionDetails',
              query: {
                questionId,
                homeworkId,
                homeworkQuestionId: record.homeworkQuestionId,
                studentId: record.studentId,
                homeworkClassId: this.classId
              }
            })
          }
        }
      }
    },
    getTableHeight() {
      if (this.$refs.tableCard) {
        this.tableHeight = this.$refs.tableCard.offsetHeight - 119
      }
    },
    lookOriginal () {
      let {questionId} = this.$route.query
      this.$refs['original'].id = questionId;
      this.$refs['original'].visible = true;
    },
    classChange () {
      this.getStudentData()
    },
    getQuestionInfo () {
      let {questionId} = this.$route.query
      if (!questionId) {
        return false
      }
      let data = {
        questionId,
        section: this.section,
        subjectAbbreviation: this.subjectAbbreviation,
        teacherId: this.teacherId
      }
      /**
        dimensionNames	能力纬度字符串		
        grade	年级		
        questionChildNum	子题数		
        questionId	试题ID		
        questionInfoId	分段试题ID		
        questionNumber	题号		
        questionSourceId	试题来源ID		
        questionSourceName	试题来源名		
        questionTextNum	字数		
        questionTextTypeName	文本类型名称		
        questionTitleName	相关主题		
        questionTypeCode	试题类型		
        questionUuid	试题唯一编码		
        section	学段		
        subjectAbbreviation	学科简称		
        subjectId	学科ID		
        subjectName	学科名		
        teacherQuestionCollectonId	老师收藏ID		
        workbookChapterPage	页码		
        workbookName	试题来源-练习册名
      */
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
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    getStudentData () {
      let {questionId, homeworkId} = this.$route.query
      if (!questionId || !homeworkId) {
        return false
      }
      let data = {
        articleId: questionId,
        gradeClassid: this.classId,
        homeworkId: homeworkId
      }
      /**
      statistical		object	
        avageFinishRate	平均完成率		
        avageReadTime	平均阅读耗时		
        avageTrueRate	平均正确率		
      studentArticleStatisticalList		array<object>	
        answerTime	作答用时		
        homeworkQuestionId	文章试题ID		
        readSpeed	阅读速度		
        readTime	阅读用时		
        reviewType	批阅状态		
        studentId	学生ID		
        studentName	学生名		
        submitTime	完成训练时间		
        submitType	提交状态		
        trueRate	正确率
      */
      this.$http.get('/api/teacher/homework/analysis/article/student', {params: data}).then(res => {
        console.log(res)
        if (res.data.flag === 1) {
          if (res.data.infos.statistical) {
            let {avageFinishRate = 0, avageReadTime = null, avageTrueRate = 0} = res.data.infos.statistical
            this.statistical[0].value = avageFinishRate + '%'
            this.statistical[1].value = avageTrueRate + '%'
            this.statistical[2].value = avageReadTime ? relativeTime(avageReadTime) : '0'
          } else {
            this.statistical[0].value = '--'
            this.statistical[1].value = '--'
            this.statistical[2].value = '--'
          }
          let studentArticleStatisticalList = res.data.infos.studentArticleStatisticalList
          if (studentArticleStatisticalList && studentArticleStatisticalList.length) {
            console.log('学生完成情况', studentArticleStatisticalList)
            this.data = studentArticleStatisticalList.map((item) => {
              return {
                // reviewType 0未批阅 1老师批阅 2学生批阅 3系统批阅 4老师加学生批阅	
                reviewType: item.reviewType || null,
                // submitType	1未答 2未完成 3已完成
                submitType: item.submitType || null,
                studentId: item.studentId,
                homeworkQuestionId: item.homeworkQuestionId,
                studentName: item.studentName || null, 
                readTime: item.readTime || null,
                readSpeed: item.readSpeed ? item.readSpeed * 60 : 0,
                trueRate: item.trueRate ? Number(item.trueRate) : 0,
                submitTime: item.submitTime || null
              }
            })
          } else {
            this.data = []
          }
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>