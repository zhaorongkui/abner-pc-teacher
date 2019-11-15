<template>
  <div class="data-analysis">
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/work">作业</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>数据分析</a-breadcrumb-item>
        <!-- <a-breadcrumb-item>作业完成情况</a-breadcrumb-item> -->
      </a-breadcrumb>
    </div>
    <div class="data-analysis-chart card margin-bottom-20">
      <div class="data-analysis-info">
        <tag-list :data="tagListData" />
      </div>
      <a-divider style="margin: 20px 0" />
      <div class="data-analysis-chart-table">
        <div class="data-analysis-radio-progress">
          <radial-progress
            :completed-steps="Number(data.submitRate)"
            :total-steps="100"
            class="margin-right-100"
            style="margin-left: 154px;"
            :diameter="154"
          >
            <div class="read-analyze-text-color-default">
              <span class="read-analyze-text-large">{{
                Number(data.submitRate)
              }}</span>
              <span class="read-analyze-text-samll">%</span>
            </div>
            <div
              class="read-analyze-text-samll right-submit-text-color-default"
            >
              提交率
            </div>
          </radial-progress>
          <radial-progress
            :completed-steps="Number(data.trueRate)"
            :total-steps="100"
            :diameter="154"
          >
            <div class="read-analyze-text-color-default">
              <span class="read-analyze-text-large">{{
                Number(data.trueRate)
              }}</span>
              <span class="read-analyze-text-samll">%</span>
            </div>
            <div
              class="read-analyze-text-samll right-submit-text-color-default"
            >
              正确率
            </div>
          </radial-progress>
        </div>
        <div class="data-analysis-chart-pie">
          <div>
            <div
              id="myChart"
              :style="{ width: '155px', height: '155px' }"
            ></div>
          </div>
          <div>
            <div>
              <span></span>
              <span
                @click="getUnfinishedStd"
                :style="{
                  cursor:
                    data.studentNum - data.finishStudentNum > 0
                      ? 'pointer'
                      : 'default'
                }"
                ><u
                  >未完成人数 {{ data.studentNum - data.finishStudentNum }}人</u
                >
                <span class="prominent1"
                  >{{ data.unFinishStudentRate }}%</span
                ></span
              >
            </div>
            <div>
              <span></span>
              <div>
                <span
                  >已完成人数 {{ data.finishStudentNum }}人
                  <span class="prominent2"
                    >{{ data.finishStudentRate }}%</span
                  ></span
                >
                <span
                  >待批阅人数 {{ data.unreviewCount }}人
                  <span class="prominent2">{{ data.unReviewRate }}%</span></span
                >
                <span
                  >已批阅人数 {{ data.reviewCount }}人
                  <span class="prominent2">{{ data.reviewRate }}%</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <RouterBtn
        class="float_button"
        :text="'学生列表'"
        :path="'work-grading-assignment'"
        style="right: -45px;top: 20px;"
      ></RouterBtn>
    </div>
    <div class="directory-item card">
      <a-alert message="阅读篇目列表" type="info" />
      <div class="directory-item-list">
        <custom-made-card
          v-for="item in directoryItemList"
          @click.native="goToSeeQuestion(item, item1)"
          :title="item.title"
          style="width: 560px;height: 179px;"
          :key="item.index"
        >
          <directory-item-content :data="item" />
        </custom-made-card>
      </div>
    </div>

    <el-dialog
      class="custom_dialog"
      :visible.sync="showUnfinishedStdModal"
      :append-to-body="true"
      :width="'500px'"
    >
      <div slot="title">
        <h4>未完成学生{{ compositionStd.length }}人</h4>
      </div>

      <div class="composition_student_list">
        <ul>
          <li v-for="std in compositionStd" :key="std.studentInfoId">
            {{ std.studentName }}
          </li>
        </ul>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
        style="display: flex;justify-content: center;"
      >
        <a-button
          v-if="!isSendRemind"
          type="primary"
          @click="handleRemindStd()"
          class="remind_btn"
          >提醒他们写作业</a-button
        >
        <a-button v-else type="primary" disabeld class="remind_ok_btn"
          >提醒他们写作业</a-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { relativeTime } from '../../filters'
import RouterBtn from '../../components/RouterBtn'
import localforage from 'localforage'
import TagList from '../../components/TagList'
import CustomMadeCard from '../../components/CustomMadeCard'
import RadialProgress from '../../components/RadialProgress'
import DirectoryItemContent from './components/DirectoryItemContent'
import { isString } from 'util'
export default {
  name: 'data-analysis',
  components: {
    CustomMadeCard,
    RadialProgress,
    TagList,
    DirectoryItemContent,
    RouterBtn
  },
  data() {
    return {
      showUnfinishedStdModal: false,
      compositionStd: [],
      isSendRemind: false,
      data: {
        finishStudentNum: 0,
        finishStudentRate: 0,
        gradeClassid: 0,
        gradeClassname: '',
        homeworkName: '',
        questionNumber: 0,
        reviewCount: 0,
        reviewRate: 0,
        studentNum: 0,
        submitRate: 0,
        trueRate: 0,
        unFinishStudentRate: 0,
        unReviewRate: 0,
        unreviewCount: 0
      },
      tagListData: [],
      directoryItemList: [],
      analysisData: {},
      item1: {}
    }
  },
  mounted() {
    if (this.$route.params.item) {
      this.item1 = this.$route.params.item
      this.getChartData()
      this.tagListData.push(
        {
          label: '训练名称',
          value: this.item1.homeworkName
        },
        {
          label: '班级',
          value: this.item1.gradeClassname
        },
        {
          label: '人数',
          value: this.item1.studentNum
        },
        {
          label: '类型',
          value: '阅读训练'
        }
      )
      this.item1.questionNumber
        ? this.tagListData.push({
            label: '篇目数',
            value: this.item1.questionNumber + '篇'
          })
        : ''
    } else {
      localforage.getItem('workListItem').then(value => {
        this.item1 = value
        this.getChartData()
        this.tagListData.push(
          {
            label: '训练名称',
            value: this.item1.homeworkName
          },
          {
            label: '班级',
            value: this.item1.gradeClassname
          },
          {
            label: '人数',
            value: this.item1.studentNum
          },
          {
            label: '类型',
            value: '阅读训练'
          }
        )
        this.item1.questionNumber
          ? this.tagListData.push({
              label: '篇目数',
              value: this.item1.questionNumber + '篇'
            })
          : ''
      })
    }
  },
  methods: {
    getChartData() {
      this.$http
        .get('/api/teacher/homework/statistical/article/index', {
          params: {
            homeworkClassId: this.item1.homeworkClassId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            this.data = Object.assign(this.data, {
              ...res.data.infos.info
            })
            this.directoryItemList = []
            let questionList = res.data.infos.articleList
            console.log(questionList)
            questionList.map((val, index) => {
              this.directoryItemList.push({
                title: '篇目' + String(index + 1),
                correctRate: val.avageTrueRate ? val.avageTrueRate : 0,
                averageTime: val.avageUseTime
                  ? relativeTime(val.avageUseTime)
                  : '0',
                ability: val.dimensionNames ? val.dimensionNames : '',
                questionId: val.questionId,
                homeworkQuestionId: val.homeworkQuestionId
              })
            })
            // 渲染表格
            this.$nextTick().then(() => {
              this.drawPie()
            })
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
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#13A99F', '#DDDDDD'],
        series: [
          {
            type: 'pie',
            radius: ['0%', '85%'],
            data: [
              { value: this.data.finishStudentRate },
              { value: this.data.unFinishStudentRate }
            ],
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['90%', '92%'],
            data: [
              { value: this.data.finishStudentRate },
              { value: this.data.unFinishStudentRate }
            ],
            labelLine: {
              show: false
            }
          }
        ]
      })
    },
    // 未完成作业学生列表
    getUnfinishedStd() {
      this.$http
        .get('/api/teacher/homework/unfinish/students', {
          params: {
            homeworkClassId: this.item1.homeworkClassId
          }
        })
        .then(res => {
          if (res.data.infos.studentList && res.data.infos.studentList.length) {
            this.isSendRemind = !res.data.infos.remind
            this.compositionStd.splice(
              0,
              this.compositionStd.length,
              ...res.data.infos.studentList
            )
            this.showUnfinishedStdModal = true
          } else {
            this.$message.error('已无未完成学生！')
            return false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 作文提醒
    handleRemindStd() {
      let arr = []
      this.compositionStd.map(val => {
        arr.push(val.studentInfoId)
      })
      this.$http
        .post('/api/teacher/homework/remind', {
          homeworkClassId: this.item1.homeworkClassId,
          studentIds: arr && arr.length ? arr.join(',') : null,
          teacherId: this.$store.state.userInfo.teacherId
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.showUnfinishedStdModal = false
            this.$message.success('已经提醒学生去完成作业')
            this.showUnfinishedStdModal = false
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('提醒学生完成作业失败！')
            return false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 看题
    goToSeeQuestion(item, item1) {
      localStorage.setItem('questionId', item.questionId)
      this.$router.push({
        name: 'read-question-details',
        params: {
          item: this.item,
          item1: this.item1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.data-analysis-chart {
  position: relative;
}
.data-analysis-chart-pie {
  @include wh(400px, auto);
  @include fj();
  align-items: center;
  margin-left: 148px;
  > div:nth-child(2) {
    margin-left: 40px;
    margin-right: 90px;
    > div:nth-child(1) {
      @include wh(197px, 38px);
      background: rgba(221, 221, 221, 0.04);
      border: 1px solid rgba(221, 221, 221, 1);
      @include fj(center);
      align-items: center;
      span:nth-child(1) {
        @include wh(11px, 11px);
        background: rgba(221, 221, 221, 1);
        border-radius: 50%;
      }
      span:nth-child(2) {
        @include sc(14px, #7b8187);
        margin-left: 8px;
      }
    }
    > div:nth-child(2) {
      @include wh(197px, 100px);
      background: rgba(19, 169, 159, 0.04);
      border: 1px solid rgba(19, 169, 159, 1);
      @include fj(center);
      align-items: top;
      margin-top: 10px;
      > span {
        @include wh(11px, 11px);
        background: rgba(19, 169, 159, 1);
        border-radius: 50%;
        margin: 14px 8px 0 0;
      }
      > div {
        @include fj(center);
        align-items: center;
        flex-direction: column;
        span:nth-child(1) {
          @include sc(14px, #13a99f);
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(222, 235, 234, 1);
        }
        span:nth-child(2) {
          @include sc(14px, #13a99f);
          margin: 6px 0 6px 0;
        }
        span:nth-child(3) {
          @include sc(14px, #13a99f);
        }
      }
    }
  }
  .prominent1 {
    width: 56px !important;
    height: auto !important;
    display: inline-block;
    border-radius: 6px !important;
    background: rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  .prominent2 {
    width: 56px;
    display: inline-block;
    border-radius: 6px;
    background: rgba(19, 169, 159, 0.15);
    padding: 0 !important;
    text-align: center;
  }
}
</style>

<style scoped>
.directory-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.directory-item-list {
  flex: 1;
  margin-top: 10px;
  overflow: auto;
}
.breadcrumb {
  padding-bottom: 20px;
}
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
.remind_btn {
  width: 160px;
  height: 36px;
  border-radius: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(16, 89, 255, 0.27) 0px 3px 4px;
}
.remind_ok_btn {
  width: 160px;
  height: 36px;
  border-radius: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #dedede;
  border-color: #dedede;
  box-shadow: #dedede 0px 3px 4px;
}
@media screen and (max-width: 1300px) {
  .data-analysis-chart .float_button {
    position: fixed!important;
    right: 25px!important;
    top: 145px!important;
  }
}
</style>