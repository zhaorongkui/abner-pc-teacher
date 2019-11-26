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
</style>
<template>
  <div>
    <a-table
      class="hwd-table-question-list"
      :columns="readQuestionTableColumns"
      :dataSource="readQuestionTableData"
      :pagination="false"
    >
      <template slot="error" slot-scope="error">
        <u
          style="cursor: pointer"
          v-if="error.length"
          @click="() => lookErrorStudent(error)"
          >{{ error.length }}</u
        >
        <u v-else>0</u>
      </template>
    </a-table>
    <el-dialog
      class="custom_dialog"
      :visible.sync="showUnfinishedStdModal"
      :append-to-body="true"
      :width="'500px'"
    >
      <div slot="title">
        <h4>本空做错学生{{ errorStudentList.length }}人</h4>
      </div>

      <div class="composition_student_list">
        <ul v-if="errorStudentList.length">
          <li v-for="std in errorStudentList" :key="std">{{ std }}</li>
        </ul>
      </div>
      <span slot="footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'customTableList',
  data() {
    return {
      errorStudentList: [],
      showUnfinishedStdModal: false,
      readQuestionTableData: [],
      readQuestionTableColumns: [
        {
          title: ' ',
          align: 'center',
          customRender: (text, record, index) => {
            return <span>{index + 1}</span>
          }
        },
        {
          title: '参考答案',
          key: 'answer',
          dataIndex: 'answer',
          align: 'center',
          customRender: (text, record) => {
            return <span style="color: #1059FF;">{record.answer.join('')}</span>
          }
        },
        {
          title: '做对人数',
          key: 'trueStudentList',
          align: 'center',
          dataIndex: 'trueStudentList'
        },
        {
          title: '做错人数',
          key: 'errorStudentList',
          align: 'center',
          dataIndex: 'errorStudentList',
          scopedSlots: { customRender: 'error' }
        },
        {
          title: '未提交人数',
          key: 'unSubmitStudentList',
          align: 'center',
          dataIndex: 'unSubmitStudentList'
        }
      ]
    }
  },
  computed: {},
  methods: {
    lookErrorStudent(arr) {
      this.errorStudentList = arr
      this.showUnfinishedStdModal = true
    }
  }
}
</script>
