<style scoped>
.read-analyze {
  min-height: 0;
  flex: 1;
  overflow: hidden;
  position: relative;
}
</style>
<template>
  <div class="read-analyze" ref="readAnalyze">
    <a-table 
      :scroll="{y: tableHeight}" 
      :pagination='false' 
      class="hwd-table" 
      :columns="columns" 
      :dataSource="data"
      :customRow="lookAnalyzeInfo"
    >
      <span slot='questionTextNum' slot-scope="questionTextNum">
        <template v-if='questionTextNum'>
          {{questionTextNum + '字'}}
        </template>
        <template v-else>
          --
        </template>
      </span>
      <span slot='avageSubmitRate' slot-scope="avageSubmitRate">
        <template v-if='avageSubmitRate'>
          {{avageSubmitRate + '%'}}
        </template>
        <template v-else>
          --
        </template>
      </span>
      <span slot='avageTrueRate' slot-scope="avageTrueRate">
        <template v-if='avageTrueRate'>
          {{avageTrueRate + '%'}}
        </template>
        <template v-else>
          --
        </template>
      </span>
      <span slot='avageReadTime' slot-scope="avageReadTime">
        <template v-if='avageReadTime'>
          {{avageReadTime + '分钟'}}
        </template>
        <template v-else>
          --
        </template>
      </span>
      <span slot='createTime' slot-scope="createTime">
        <template v-if='createTime'>
          {{createTime | formatDate}}
        </template>
        <template v-else>
          --
        </template>
      </span>
      <span slot="action">
        <a-button @click="() => catalogDetails()">篇目详情</a-button>
      </span>
    </a-table>
    <no-data v-if="!data.length" button="马上发布" tips="还没有发布阅读训练哦～" />
  </div>
</template>

<script>
import NoData from '../../../components/noData'
const columns = [
  {
    align: 'center',
    width: 190,
    title: '篇目标题',
    dataIndex: 'questionArticleTitle',
    key: 'questionArticleTitle',
  },
  {
    align: 'center',
    width: 190,
    title: '阅读量',
    dataIndex: 'questionTextNum',
    key: 'questionTextNum',
    sorter: (a, b) => a.questionTextNum - b.questionTextNum,
    scopedSlots: { customRender: 'questionTextNum' }
  },
  {
    align: 'center',
    width: 190,
    title: '提交率',
    dataIndex: 'avageSubmitRate',
    key: 'avageSubmitRate',
    sorter: (a, b) => a.avageSubmitRate - b.questionTextNum,
    scopedSlots: { customRender: 'avageSubmitRate' }
  },
  {
    align: 'center',
    width: 190,
    title: '正确率',
    dataIndex: 'avageTrueRate',
    key: 'avageTrueRate',
    sorter: (a, b) => a.avageTrueRate - b.avageTrueRate,
    scopedSlots: { customRender: 'avageTrueRate' }
  },
  {
    align: 'center',
    width: 190,
    title: '平均阅读用时',
    dataIndex: 'avageReadTime',
    key: 'avageReadTime',
    sorter: (a, b) => a.avageReadTime - b.avageReadTime,
    scopedSlots: { customRender: 'avageReadTime' }
  },
  {
    align: 'center',
    width: 190,
    title: '发布时间',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: (a, b) => a.createTime - b.createTim,
    scopedSlots: { customRender: 'createTime' }
  }
];
export default {
  name: "read-analyze",
  components: {
    NoData
  },
  data() {
    return {
      tableHeight: 0,
      data: [],
      columns,
    }
  },
  computed: {
    section () {
      return this.$store.getters.section
    },
    subjectAbbreviation () {
      return this.$store.getters.subjectAbbreviation
    },
    teacherId () {
      return this.$store.getters.teacherId
    }
  },
  created () {
    this.getAnalysisArtivle()
  },
  mounted() {
    this.getTableHeight()
    window.onresize = () => {
      this.getTableHeight()
    }
  },
  methods: {
    lookAnalyzeInfo (record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name: 'catalogDetails',
              query: {
                questionId: record.questionId,
                homeworkId: record.homeworkId
              }
            })
          }
        }
      }
    },
    getTableHeight() {
      if (this.$refs.readAnalyze) {
        this.tableHeight = this.$refs.readAnalyze.offsetHeight - 64
      }
    },
    getAnalysisArtivle () {
      let data = {
        section: this.section,
        subjectAbbreviation: this.subjectAbbreviation,			
        teacherId: this.teacherId
      }
      //  avageFinishRate	平均完成率		
      //  avageReadTime	平均阅读时间		
      //  avageSubmitRate	平均提交率		
      //  avageTrueRate	平均正确率		
      //  createTime	发布时间		
      //  gradeClassids	文章发布班级ID集合	string	
      //  homeworkId	作业ID		
      //  homeworkQuestionId	作业试题ID		
      //  questionArticleTitle	文章标题		
      //  questionId	文章ID		
      //  questionStem	文章内容		
      //  questionTextNum	文章字数
      this.$http('/api/teacher/homework/analysis/article', {params: data}).then((res) => {
        let arr = []
        if (res.data.flag === 1) {
          arr = res.data.infos.map((item) => {
            return {
              homeworkId: item.homeworkId,
              questionId: item.questionId,
              questionArticleTitle: item.questionArticleTitle || '--',
              questionTextNum: item.questionTextNum || 0,
              avageSubmitRate: item.avageSubmitRate ? Number(item.avageSubmitRate) : 0,
              avageTrueRate: item.avageTrueRate ? Number(item.avageTrueRate) : 0,
              createTime: item.createTime || null,
              avageReadTime: item.avageReadTime || null
            }
          })
        }
        this.data = arr
      }).catch(err => {
        console.err(err)
      })
    }
  }
}
</script>
