<template>
  <div class="read-analyze" ref="readAnalyze">
    <a-table
      class="hwd-table-student-list"
      style="width: 1140px;"
      :scroll="{ x: 1140, y: tableHeight }"
      :pagination="false"
      rowKey="key"
      :columns="columns"
      :dataSource="data"
      :customRow="onClick"
    >
      <template slot="progress" slot-scope="progress">
        <el-progress :percentage="progress"></el-progress>
      </template>
      <template slot="readTimeSpent" slot-scope="readTimeSpent">
        <template v-if="readTimeSpent">
          {{ readTimeSpent | relativeTime }}
        </template>
        <template v-else>--</template> </template>
      <template slot="readSpeed" slot-scope="readSpeed">
        <template v-if="readSpeed">
          {{ readSpeed + '字/分钟' }}
        </template>
        <template v-else >--</template>
      </template>
      <template slot="correctRate" slot-scope="correctRate">
        {{ correctRate ? correctRate.toFixed(1) + '%' : '--' }}
      </template>
      <template slot="submitTime" slot-scope="submitTime">
        <template v-if="submitTime">
          {{ submitTime | formatDate }}
        </template>
        <template v-else >--</template>
      </template>
      <template slot="status" slot-scope="status">
        <span>{{ status }}</span>
      </template>
    </a-table>
  </div>
</template>

<script>
import localforage from 'localforage'
const submitType = {
  '1': '未提交',
  '2': '未完成',
  '3': '已完成'
}
const reviewType = {
  '0': '待批阅',
  '1': '教师批阅',
  '2': '学生批阅',
  '3': '教师批阅',
  '4': '教师批阅'
}
const homeworkAppealType = {
  '1': '申诉',
  '2': '未申诉',
  '3': '未处理'
}
export default {
  props: ['item'],
  data() {
    return {
      tableHeight: 0,
      data: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          align: 'center',
          width: 126,
          key: 'name',
          customRender: (text, record, index) => {
            if (record.homeworkAppealType === 1) {
              return (
                <div>
                  <a-avatar style="background: #FF6365">申</a-avatar>{' '}
                  <span>{text}</span>
                </div>
              )
            } else if (record.homeworkAppealType === 3) {
              return (
                <div style="display:flex;align-items:center">
                  <div style="position: relative;margin-right:5px">
                    <a-avatar style="background: #FF6365;">申</a-avatar>
                    <a-icon
                      class="processed"
                      type="check-circle"
                      theme="filled"
                    />
                  </div>
                  <span>{text}</span>
                </div>
              )
            } else {
              return <span>{text}</span>
            }
          }
        },
        {
          title: '作业进度',
          dataIndex: 'progress',
          align: 'center',
          width: 163,
          key: 'progress',
          scopedSlots: { customRender: 'progress' },
          sorter: (a, b) => a.progress - b.progress
        },
        {
          title: '阅读总耗时',
          dataIndex: 'readTimeSpent',
          align: 'center',
          width: 163,
          key: 'readTimeSpent',
          scopedSlots: { customRender: 'readTimeSpent' },
          sorter: (a, b) => a.readTimeSpent - b.readTimeSpent
        },
        {
          title: '阅读速度',
          dataIndex: 'readSpeed',
          align: 'center',
          width: 163,
          key: 'readSpeed',
          scopedSlots: { customRender: 'readSpeed' },
          sorter: (a, b) => a.readSpeed - b.readSpeed
        },
        {
          title: '正确率',
          dataIndex: 'correctRate',
          align: 'center',
          width: 163,
          key: 'correctRate',
          scopedSlots: { customRender: 'correctRate' },
          sorter: (a, b) => a.correctRate - b.correctRate
        },
        {
          title: '提交时间',
          dataIndex: 'submitTime',
          align: 'center',
          width: 200,
          key: 'submitTime',
          scopedSlots: { customRender: 'submitTime' },
          sorter: (a, b) => a.submitTime - b.submitTime
        },
        {
          title: '作业状态',
          dataIndex: 'status',
          align: 'center',
          sorter: true,
          width: 163,
          key: 'status',
          customRender: (text, record, index) => {
            if (record.submitType === 1) {
              return <span style="color: #FF6365">{text}</span>
            } else if (record.reviewType === 0) {
              return <span style="color: #1059FF">{text}</span>
            } else {
              return <span>{text}</span>
            }
          }
        }
      ],
      submitType,
      reviewType
    }
  },
  created() {
    this.getStudentList('')
  },
  mounted() {
    this.getTableHeight()
    window.onresize = () => {
      this.getTableHeight()
    }
  },
  methods: {
    getTableHeight() {
      if (this.$refs.readAnalyze) {
        this.tableHeight = this.$refs.readAnalyze.offsetHeight - 54
      }
    },
    onClick(record, index) {
      return {
        on: {
          click: () => {
            if (record.submitType === 1) {
              this.$message.warning('该学生还未提交作业')
              return false
            }
            if (record.submitType === 2) {
              this.$message.warning('该学生还未完成作业')
              return false
            }
            // 学生信息
            localforage.setItem('student', record)
            // 学生列表信息
            localforage.setItem('list', this.data)
            // 班级信息
            localforage.setItem('item', this.item)
            this.$router.push({
              name: 'readItemDetails',
              query: {
                homeworkId: this.item.homeworkId,
                homeworkClassId: this.item.homeworkClassId,
                studentId: record.studentId
              }
            })
          }
        }
      }
    },
    getStudentList() {
      let data = {
        homeworkClassId: this.item.homeworkClassId
      }
      this.$http('/api/teacher/homework/ArticleStudentList', { params: data })
        .then(res =>  {
          if (res.data.flag === 1) {
            let remote = res.data.infos
            // let remote = [{"studentId":1647,"finishRate":"100","submitTime":1565690799000,"answerTime":3,"submitType":3,"readSpeed":9,"studentName":"喜羊羊","homeworkAppealType":2,"readTime":4,"reviewType":0,"questionNumber":1},{"studentId":1648,"submitType":1,"studentName":"美羊羊","homeworkAppealType":2,"reviewType":0,"questionNumber":1},{"studentId":1649,"finishRate":"50","submitTime":1565690556000,"answerTime":3,"submitType":3,"trueRate":"50","readSpeed":9,"studentName":"懒羊羊","homeworkAppealType":2,"readTime":4,"reviewType":3,"questionNumber":1}];
            this.data = remote.map(item => {
              let obj = {
                studentId: item.studentId, // 学生id
                name: item.studentName, // 学生姓名
                progress: item.finishRate ? parseInt(item.finishRate) : 0, // 作业进度
                homeworkAppealType: item.homeworkAppealType || 0, // 申诉状态
                readTimeSpent: (item.answerTime || 0) + (item.readTime || 0), // 阅读总时间
                readSpeed: item.readSpeed ? item.readSpeed * 60 : 0, // 阅读数据
                correctRate: item.trueRate ? Number(item.trueRate) : 0, // 正确率
                submitTime: item.submitTime || null, // 提交时间
                submitType: item.submitType || 0, // 提交状态
                reviewType: item.reviewType // 批阅状态
              }
              if (item.submitType === 3) {
                obj.status = this.reviewType[item.reviewType]
              } else {
                obj.status = this.submitType[item.submitType]
              }
              return obj
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
.processed {
  position: absolute;
  right: 0;
  border-radius: 50%;
  background: #ffffff;
  bottom: 0;
  color: #13a99f;
}
.read-analyze {
  min-height: 0;
  flex: 1;
}
</style>
