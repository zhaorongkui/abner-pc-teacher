<style scoped>
.student-analyze {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.student-table-list {
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

</style>
<template>
  <div class="student-analyze">
    <div class="use-select margin-bottom-10">
      <filtrate v-model="selectValue" :selectData="gradeClassList" :selectName="selectName" @on-change="classChange"/> 
    </div>
    <div class="student-table-list" ref='studentTableList'>
      <a-table 
        class="hwd-table" 
        :pagination='false' 
        :scroll="{y: tableHeight}"
        :columns="columns" 
        :dataSource="data"
        :customRow="lookStudentInfo"
      >
        <span slot="avageScore" slot-scope="avageScore">
          <template v-if="avageScore">
            {{avageScore + '分'}}
          </template>
          <template v-else>
            --
          </template>
        </span>
        <span slot="avageReadSpeed" slot-scope="avageReadSpeed">
          <template v-if="avageReadSpeed">
            {{avageReadSpeed + '字/分钟'}}
          </template>
          <template v-else>
            --
          </template>
        </span>
        <span slot="avageTrueRate" slot-scope="avageTrueRate">
          <template v-if="avageTrueRate">
            {{avageTrueRate + '%'}}
          </template>
          <template v-else> -- </template>
        </span>
        <span slot="avageSubmitRate" slot-scope="avageSubmitRate">
          <template v-if="avageSubmitRate">
            {{avageSubmitRate + '%'}}
          </template>
          <template v-else>
            --
          </template>
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import Filtrate from '../../../components/Filtrate'
const columns = [{
  width: 228,
  align: 'center',
  title: '学生姓名',
  dataIndex: 'studentName',
  key: 'studentName',
}, {
  width: 228,
  align: 'center',
  title: '阅读综合评分',
  dataIndex: 'avageScore',
  key: 'avageScore',
  sorter: (a, b) => a.avageScore - b.avageScore,
  scopedSlots: { customRender: 'avageScore' }
}, {
  width: 228,
  align: 'center',
  title: '阅读速度',
  dataIndex: 'avageReadSpeed',
  key: 'avageReadSpeed',
  sorter: (a, b) => a.avageReadSpeed - b.avageReadSpeed,
  scopedSlots: { customRender: 'avageReadSpeed' }
}, {
  width: 228,
  align: 'center',
  title: '正确率',
  dataIndex: 'avageTrueRate',
  key: 'avageTrueRate',
  sorter: (a, b) => a.avageTrueRate - b.avageTrueRate,
  scopedSlots: { customRender: 'avageTrueRate' }
}, {
  width: 228,
  align: 'center',
  title: '提交率',
  dataIndex: 'avageSubmitRate',
  key: 'avageSubmitRate',
  sorter: (a, b) => a.avageSubmitRate - b.avageSubmitRate,
  scopedSlots: { customRender: 'avageSubmitRate' }
}];

export default {
  name: 'student-analyze',
  components: {Filtrate},
  data() {
    return {
      tableHeight: 0,
      selectValue: 0,
      data: [],
      columns,
      selectName: '班级'
    }
  },
  computed: {
    gradeClassList () {
      return this.$store.getters.gradeClassList.map((item) => {
        return {
          value: item.gradeClassid,
          label: item.gradeClassname
        }
      })
    }
  },
  created () {
    this.selectValue = this.gradeClassList[0].value 
    if (this.selectValue) {
      this.getStudentDetailsData()
    }
  },
  mounted () {
    this.getTableHeight()
    window.onresize = () => {
      this.getTableHeight()
    }
  },
  methods: {
    lookStudentInfo (record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              name: 'studentDetails',
              query: {
                studentName: record.studentName,
                studentId: record.studentId,
                classId: this.selectValue
              }
            })
          }
        }
      }
    },
    getTableHeight() {
      if (this.$refs.studentTableList) {
        this.tableHeight = this.$refs.studentTableList.offsetHeight - 64
      }
    },
    classChange () {
      this.getStudentDetailsData()
    },
    getStudentDetailsData () {
      let gradeClassId = this.selectValue
      let data = {
        gradeClassId
      }
      this.$http('/api/teacher/homework/analysis/student', {params: data}).then((res) => {
        console.log(res)
        if (res.data.flag === 1 && res.data.infos && res.data.infos.length) {
          this.data = res.data.infos.map((item) => {
            return {
              studentId: item.studentInfoId,
              studentName: item.studentName || '--',
              avageReadSpeed: item.avageReadSpeed ? Number(item.avageReadSpeed) * 60 : 0,
              avageScore: item.avageScore ? Number(item.avageScore) : 0,
              avageSubmitRate: item.avageSubmitRate ? Number(item.avageSubmitRate) : 0,
              avageTrueRate: item.avageTrueRate ? Number(item.avageTrueRate) : 0
            }
          })
        } else {
          this.data = []
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>
