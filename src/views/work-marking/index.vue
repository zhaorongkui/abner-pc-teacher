<template>
  <div class="work-marking">
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/work">作业</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/work-grading-assignment">学生列表</router-link>
        </a-breadcrumb-item>

        <a-breadcrumb-item>{{ studentName }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="main">
      <TabBar></TabBar>
      <Question :item="item" :student="student"></Question>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import TabBar from './components/TabBar'
import Question from './components/Question'
export default {
  name: '',
  components: { TabBar, Question },
  data() {
    return {
      item: null,
      student: null
    }
  },
  computed: {
    list() {
      return (
        (this.$store.state.marking.questionListInfo &&
          this.$store.state.marking.questionListInfo.homeworkQuestionList) ||
        []
      )
    },
    studentName() {
      return this.$store.state.marking.studentName
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      var that = this
      $('.question-main img').click(function() {
        that.picflag = true
        that.imgArr = []
        that.imgArr.push($(this).attr('src'))
      })
    })
    // 获取作业列表单元信息
    localforage.getItem('item').then(item => {
      // 学生列表单元信息
      localforage.getItem('student').then(student => {
        this.item = item
        this.student = student
        this.$store.commit('marking/STUDENTNAME', student.studentName)

        // 获取批阅试题列表
        this.$store
          .dispatch('marking/getQuestionList', {
            homeworkId: item.homeworkId,
            studentInfoId: student.studentInfoId
          })
          .then(data => {
            if (data.flag === 1) {
              // 批阅试题列表
              let list = data.infos.homeworkQuestionList
              // commit('QUESTIONINFOLIST', data.infos)
              this.$store.commit('marking/STUDENTINFOID', student.studentInfoId)
              // 主观题列表
              let subjectivelist = list.filter(item => item.questionType === 1)
              // 客观题列表
              let objectiveslist = list.filter(item => item.questionType === 2)
              // 设置列表中默认的作业试题ID
              let homeworkQuestionId = subjectivelist[0]
                ? subjectivelist[0].homeworkQuestionId
                : objectiveslist[0].homeworkQuestionId
              if (subjectivelist != undefined) {
                for (var i = 0; i < subjectivelist.length; i++) {
                  if (
                    subjectivelist[i].questionType == 1 &&
                    (subjectivelist[i].hasRewive == 0 ||
                      (subjectivelist[i].hasRewive == 2 &&
                        subjectivelist[i].questionIsappeal == 1))
                  ) {
                    homeworkQuestionId = subjectivelist[i].homeworkQuestionId
                    break
                  }
                }
                this.$store.commit(
                  'marking/UPDATEHOMEWORKQUESTIONID',
                  homeworkQuestionId
                )
              }

              // 获取对应试题ID的作业详情
              this.$store.dispatch('marking/questionInfo')
            }
          })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.work-marking {
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .breadcrumb {
    flex: 0 0 60px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .main {
    width: 100%;
    height: 100%;
    flex: auto;
    padding-bottom: 10px;
    display: flex;
    position: relative;
    // background: rgba(255, 255, 255, 1);
    // box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
    // border-radius: 4px;
  }
}
</style>
