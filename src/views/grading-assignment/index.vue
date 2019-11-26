<template>
  <div class="grading-assignment" v-if="item">
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/work">作业</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>学生列表</a-breadcrumb-item>
        <!-- <a-breadcrumb-item>作业完成情况</a-breadcrumb-item> -->
      </a-breadcrumb>
    </div>
    <div class="content">
      <div class="grade">
        <div>
          <span>作业名称</span><span>{{ item.homeworkName || '' }}</span>
        </div>
        <div>
          <span>班级</span><span>{{ item.gradeClassname || '' }}</span>
        </div>
        <div>
          <span>人数</span><span>{{ item.studentNum || 0 }}</span>
        </div>
        <template v-if="item.homeworkType === 5">
          <div><span>类型</span><span>阅读训练</span></div>
          <div>
            <span>篇目数</span><span>{{ item.questionNumber }}</span>
          </div>
        </template>
        <div v-if="item.homeworkType === 6">
          <span>类型</span><span style="border-right: 0;">作文任务</span>
        </div>
        <div
          v-if="item.homeworkType === 6 && showRemindBtn"
          style="position: absolute; right: 0;"
        >
          <button
            class="small_bell_btn"
            @click="handleAutoReminder"
            v-if="!isSend"
          >
            <img src="../../assets/img/bell.png" />
            <span
              style="margin-left: 9px;font-size: 16px;color: #730099;font-weight: 600;padding: 0;"
              >一键提醒互评</span
            ></button
          ><button class="small_bell_btn1" v-else disabled>
            <img src="../../assets/img/bell1.png" />
            <span
              style="margin-left: 9px;font-size: 16px;color: #999;font-weight: 600;padding: 0;"
              >已提醒互评</span
            >
          </button>
        </div>
        <RouterBtn
          class="float_button"
          :text="text"
          :path="routeUrl"
          style="top: 5px;z-index: 99;"
        ></RouterBtn>
      </div>
      <EnglishListeningAndSpeaking
        v-if="item.homeworkType === 3"
        :item="item"
      ></EnglishListeningAndSpeaking>
      <WrongQuestion
        v-if="item.homeworkType === 2"
        :item="item"
      ></WrongQuestion>
      <ReadStudentList
        v-if="item.homeworkType === 5"
        :item="item"
      ></ReadStudentList>
      <WordQuestion v-if="item.homeworkType === 4" :item="item"></WordQuestion>
      <EnglishDaily
        v-if="item.homeworkType === 1 && subjectAbbreviation === 'yingyu'"
        :item="item"
      ></EnglishDaily>
      <OtherSubject
        v-if="item.homeworkType === 1 && subjectAbbreviation !== 'yingyu'"
        :item="item"
      ></OtherSubject>
      <CompositionTable v-if="item.homeworkType === 6"></CompositionTable>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'

import EnglishListeningAndSpeaking from './components/EnglishListeningAndSpeaking'
import EnglishDaily from './components/EnglishDaily'
import OtherSubject from './components/OtherSubject'
import WrongQuestion from './components/WrongQuestion'
import WordQuestion from './components/WordQuestion'
import RouterBtn from '../../components/RouterBtn'
import http from '../../api/index'
import CompositionTable from './components/CompositionTable'
import ReadStudentList from './components/ReadStudentList'
export default {
  name: 'grading-assignment',
  components: {
    EnglishListeningAndSpeaking,
    EnglishDaily,
    OtherSubject,
    WrongQuestion,
    WordQuestion,
    RouterBtn,
    CompositionTable,
    ReadStudentList
  },
  data() {
    return {
      isSend: false,
      item: null,
      showRemindBtn: true,
      text: '',
      routeUrl: ''
    }
  },
  computed: {
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    }
  },
  mounted() {
    if (this.$route.params.dataItem) {
      this.item = this.$route.params.dataItem
      if (this.item.homeworkType == 3) {
        this.text = '数据分析'
        this.routeUrl = 'work-data-statistics'
      }
      if (this.item.homeworkType == 1 || this.item.homeworkType == 2) {
        this.text = '数据分析'
        this.routeUrl = 'work-data-statistics'
      }

      if (this.item.homeworkType == 5) {
        this.text = '数据分析'
        this.routeUrl = 'work-read-data-analysis'
      }
      if (Number(this.item.homeworkType) === 6) {
        this.showBtn()
        this.text = '数据分析'
      }
    } else {
      if (!this.$route.params.item) {
        localforage.getItem('workListItem').then(value => {
          this.item = value
          if (this.item.homeworkType == 4) {
            this.text = '单词统计'
            this.routeUrl = 'work-data-statistics-word'
          }
          if (this.item.homeworkType == 3) {
            this.text = '数据分析'
            this.routeUrl = 'work-data-statistics'
          }
          if (this.item.homeworkType == 1 || this.item.homeworkType == 2) {
            this.text = '数据分析'
            this.routeUrl = 'work-data-statistics'
          }
          if (this.item.homeworkType == 5) {
            this.text = '数据分析'
            this.routeUrl = 'work-read-data-analysis'
          }
          if (Number(this.item.homeworkType) === 6) {
            this.showBtn()
            this.text = '数据分析'
            this.routeUrl = 'work-composition-data-analysis'
          }
        })
        return
      }
      this.item = this.$route.params.item
      if (this.item.homeworkType == 4) {
        this.text = '单词统计'
        this.routeUrl = 'work-data-statistics-word'
      }
      if (this.item.homeworkType == 3) {
        this.text = '数据分析'
        this.routeUrl = 'work-data-statistics'
      }
      if (this.item.homeworkType == 1 || this.item.homeworkType == 2) {
        this.text = '数据分析'
        this.routeUrl = 'work-data-statistics'
      }
      if (Number(this.item.homeworkType) === 6) {
        this.showBtn()
        this.text = '数据分析'
        this.routeUrl = 'work-composition-data-analysis'
      }
      if (this.item.homeworkType == 5) {
        this.text = '数据分析'
        this.routeUrl = 'work-read-data-analysis'
      }
    }
  },
  methods: {
    showBtn() {
      this.$http
        .get('/api/teacher/homework/ifShowHp', {
          params: {
            homeworkClassId: this.item.homeworkClassId
          }
        })
        .then(res => {
          let status = res.data.infos
          Number(status.ifShowHp)
            ? (this.showRemindBtn = false)
            : (this.showRemindBtn = true)
          Number(status.isHpSend) ? (this.isSend = true) : (this.isSend = false)
        })
      // this.$http.get('/api/teacher/system/time').then(res => {
      //   let systemTime = res.data.infos;
      //   if(this.item.homeworkEndtime < new Date(systemTime).getTime()) {
      //     this.showRemindBtn = false;
      //   }else {
      //     this.showRemindBtn = true;
      //     this.isRemindSend()
      //   }
      // })
    },
    toPage(path) {
      this.$router.push(path)
    },
    // 一键提醒
    handleAutoReminder() {
      http
        .get('/api/notice/teacher/remindHp', {
          params: {
            homeworkClassId: this.item.homeworkClassId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            this.$message.success('互评提醒已发送！')
            this.showBtn()
          } else {
            res.data.message
              ? this.$message.error(res.data.message)
              : this.$message.error('互评提醒发送失败！')
          }
        })
        .catch(err => {
          this.$message.error('互评提醒发送失败！')
          console.log(err)
        })
    }
    // 判断是否已提醒
    // isRemindSend() {
    //   // 判断今日是否已发送提醒
    //   this.$http
    //     .post('/api/notice/teacher/isRemindHp', {
    //       homeworkClassId: this.item.homeworkClassId
    //     })
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.flag === 1) {
    //         Number(res.data.infos.isHpSend) === 0
    //           ? (this.isSend = false)
    //           : (this.isSend = true)
    //       } else {
    //         console.log(res.data.message)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.grading-assignment {
  width: 1180px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  .breadcrumb {
    flex: 0 0 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .content {
    flex: auto;
    // height: 100%;
    height: calc(100% - 140px);
    margin-bottom: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 4px 8px 8px 8px;
    .grade {
      flex: 0 0 40px;
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      position: relative;
      > div {
        span:first-child {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-right: 20px;
        }
        span:last-child {
          font-size: 14px;
          font-weight: 400;
          color: rgba(94, 132, 173, 1);
          padding-right: 20px;
        }
      }
      > div:not(:first-child) {
        span {
          margin-left: 20px;
        }
      }
      > div:not(:last-child) {
        span:last-child {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
}
</style>

<style>
.small_bell_btn {
  background: #ffe400;
  width: 167px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(173, 118, 0, 0.52);
}
.small_bell_btn img,
.small_bell_btn1 img {
  width: 18px;
  height: 21px;
}
.small_bell_btn1 {
  background: #ddd;
  width: 167px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: not-allowed;
  box-shadow: 0 2px 6px rgba(169, 169, 169, 0.52);
}
.small_bell_btn span,
.small_bell_btn1 span {
  line-height: 21px;
  border: 0;
}
@media screen and (max-width: 1300px) {
  .float_button {
    position: fixed !important;
    right: 25px !important;
    top: 300px !important;
  }
}
</style>
