<template>
  <div class="publish-wrap" v-if="quitFlag">
    <div class="publish-mask">
      <div class="publish-top">
        <div class="publish-top-1" @click="selectNav('zydx')">
          <img
            src="../../assets/img/publish/blue.png"
            alt=""
            v-if="step1 == 0"
          />
          <img
            src="../../assets/img/publish/gree.png"
            alt=""
            v-if="step1 == 1"
          />
          <img
            src="../../assets/img/publish/quan1.png"
            alt=""
            class="quan-state"
            v-if="quanState1 == 1"
          />
          <img
            src="../../assets/img/publish/quan2.png"
            alt=""
            class="quan-state quan"
            v-if="quanState1 == 0"
          />
          <i v-if="quanState1 == 0">1</i>
          <p class="hover-p">作业对象</p>
        </div>
        <div class="publish-top-2">
          <img
            src="../../assets/img/publish/bluegray.png"
            alt=""
            v-if="step2 == 0"
          />
          <img
            src="../../assets/img/publish/greeblue.png"
            alt=""
            v-if="step2 == 1"
          />
          <img
            src="../../assets/img/publish/gree2.png"
            alt=""
            v-if="step2 == 2"
          />
          <img
            src="../../assets/img/publish/bluegree.png"
            alt=""
            v-if="step2 == 3"
          />
        </div>
        <div
          class="publish-top-3"
          @click="selectNav('zynr')"
          v-if="!isComposition"
        >
          <img
            src="../../assets/img/publish/gray.png"
            alt=""
            v-if="step3 == 0"
          />
          <img
            src="../../assets/img/publish/blue.png"
            alt=""
            v-if="step3 == 1"
          />
          <img
            src="../../assets/img/publish/gree.png"
            alt=""
            v-if="step3 == 2"
          />
          <img
            src="../../assets/img/publish/quan1.png"
            alt=""
            v-if="quanState2 == 2"
            class="quan-state"
          />
          <img
            src="../../assets/img/publish/quan2.png"
            alt=""
            class="quan-state quan"
            v-if="quanState2 == 1"
          />
          <span class="quan-state quan-state-1" v-if="quanState2 == 0">2</span>
          <i v-if="quanState2 == 1">2</i>
          <p :class="step3 == 0 ? '' : 'hover-p'">作业内容</p>
        </div>
        <div class="publish-top-4" v-if="!isComposition">
          <img
            src="../../assets/img/publish/gray2.png"
            alt=""
            v-if="step4 == 0"
          />
          <img
            src="../../assets/img/publish/bluegray.png"
            alt=""
            v-if="step4 == 1"
          />
          <img
            src="../../assets/img/publish/greeblue.png"
            alt=""
            v-if="step4 == 2"
          />
          <img
            src="../../assets/img/publish/greegray.png"
            alt=""
            v-if="step4 == 3"
          />
        </div>
        <div class="publish-top-5" @click="selectNav('zyyq')">
          <img
            src="../../assets/img/publish/blue.png"
            alt=""
            v-if="step5 == 1"
          />
          <img
            src="../../assets/img/publish/gray.png"
            alt=""
            v-if="step5 == 0"
          />
          <img
            src="../../assets/img/publish/quan2.png"
            alt=""
            v-if="quanState3 == 1"
            class="quan-state quan"
          />
          <span class="quan-state quan-state-1" v-if="quanState3 == 0">3</span>
          <i v-if="quanState3 == 1 && !isComposition">3</i>
          <i v-if="isComposition">2</i>
          <p v-if="!isComposition" :class="step5 == 0 ? '' : 'hover-p'">
            作业要求
          </p>
          <p v-else :class="step5 == 0 ? '' : 'hover-p'">写作要求</p>
        </div>
        <div class="publish-top-4" v-if="isComposition">
          <img src="../../assets/img/publish/bluewhite.png" alt="" />
        </div>
        <div class="publish-top-5" v-if="isComposition">
          <img src="../../assets/img/publish/white.png" alt="" />
          <!-- <span class="quan-state quan-state-1"></span> -->
          <i></i>
          <p></p>
        </div>
      </div>
      <PublishState
        v-if="count == 0"
        @toParentEvents="toPageType"
        @toParentEventlen="getLength"
        @toParentEventlenerror="getLengtherror"
      ></PublishState>
      <WorkDaily
        v-if="count == 1 && PageType == 1"
        @toParentEventOflen="getWorkLength"
      ></WorkDaily>
      <WordWork v-if="count == 1 && PageType == 4"></WordWork>
      <EnglishWork v-if="count == 1 && PageType == 3"></EnglishWork>
      <ErrorQustion
        v-if="count == 1 && PageType == 2"
        @toParentEventOflength="getErrorWorkLength"
      ></ErrorQustion>
      <!-- 阅读作业内容 -->
      <ReadHomework v-if="count === 1 && PageType == 5"></ReadHomework>
      <!-- 日常作业要求 -->
      <WorkDailyDemand
        v-if="(count == 2 && PageType == 1) || (count == 2 && PageType == 2)"
        :isApproval="isApproval"
        :isHomeworkQuestionType="isHomeworkQuestionType"
        :classList="workClass"
        @toParentEventVal="getInputVal"
        @toParentEventStart="getStartVal"
        @toParentEventEnd="getEndVal"
        @toParentEventHp="getHpVal"
        @toParentEventHps="getHpVals"
      ></WorkDailyDemand>
      <!-- 单词作业要求 -->
      <WordWorkDemand
        v-if="count == 2 && PageType == 4"
        :classList="workClass"
        @toParentEventVal="getInputVal"
        @toParentEventStart="getStartVal"
        @toParentEventEnd="getEndVal"
      ></WordWorkDemand>
      <!-- 听说作业要求 -->
      <EnglishWorkDemand
        v-if="count == 2 && PageType == 3"
        :isApproval="isApproval"
        :classList="workClass"
        @toParentEventVal="getInputVal"
        @toParentEventStart="getStartVal"
        @toParentEventEnd="getEndVal"
        @toParentTranslate="getTranslate"
      ></EnglishWorkDemand>
      <!-- 阅读作业要求 -->
      <ReadWorkDemand
        v-if="count === 2 && PageType == 5"
        :isApproval="isApproval"
        @toParentEventVal="getInputVal"
        :isHomeworkQuestionType="isHomeworkQuestionType"
        @toParentEventStart="getStartVal"
        @toParentEventEnd="getEndVal"
        @toParentEventHp="getHpVal"
        :classList="workClass"
      ></ReadWorkDemand>
      <!-- 作文作业要求 -->
      <CompositionDemand
        v-if="count == 2 && PageType == 6"
        :classInfo="compositionGradeClassInfo"
        ref="compositionHomework"
        @homeworkPublishSuccess="clearNull"
      ></CompositionDemand>
      <WorkPreview
        :index="PageType"
        v-if="showPreview"
        @toParentsEvents="hideWorkPreview"
        @toParentEventlenerror="getLengtherror"
        @toParentEventlen="getLength"
      ></WorkPreview>
      <div class="publish-btn">
        <p class="prev-btn" @click="prevBtn" v-if="count != 0">
          <img src="../../assets/img/publish/left.png" alt="" />
          <span>上一步</span>
        </p>
        <p class="next-btn" @click="nextBtn" v-if="count != 2">
          <span>下一步</span
          ><img src="../../assets/img/publish/right.png" alt="" />
        </p>
        <p class="next-btn publish" @click="hanldePublish" v-if="count == 2">
          <span>发布</span
          ><img
            src="../../assets/img/publish/fabuicon.png"
            alt=""
            style="width:15px;height:15px;margin-top:-3px;"
          />
        </p>
      </div>
    </div>
    <!-- 日常 -->
    <div
      class="selected"
      v-if="count != 0 && PageType == 1"
      @click="showWorkPreview"
    >
      <span>{{ worklength }}</span>
      <span>已选题量</span>
    </div>
    <!-- 单词 -->
    <div
      class="selected"
      v-if="count != 0 && PageType == 4"
      @click="showWorkPreview"
    >
      <span>{{ wordHomeWorkCount }}</span>
      <span>已选题量</span>
    </div>
    <!-- 听说 -->
    <div
      class="selected"
      v-if="count != 0 && PageType == 3"
      @click="showWorkPreview"
    >
      <span>{{ selectedItemList.length }}</span>
      <span>已选题量</span>
    </div>
    <!-- 错题 -->
    <div
      class="selected"
      v-if="count != 0 && PageType == 2"
      @click="showWorkPreview"
    >
      <span>{{ errorWorklength }}</span>
      <span>已选题量</span>
    </div>
    <div class="quit-publish">
      <span></span>
      <p @click="quitPublish">
        <img src="../../assets/img/publish/tuichu.png" alt="" />
        <span>退出</span>
      </p>
    </div>
    <!-- 退出弹框 -->
    <div class="dialog-publish-wrap" v-if="showPublishDialig">
      <div class="publish-dialog">
        <p>
          <span>提示</span>
          <img src="../../assets/img/publish/close.png" alt="" @click="close" />
        </p>
        <span>你确定要放弃布置作业吗？</span>
        <div>
          <div>
            <span>班级</span>
            <p v-if="PageType == 1">
              <span v-for="(item, index) in selectClassList" :key="index"
                >{{ item.grade | grade }}&nbsp;{{ item.gradeClassname }}
              </span>
            </p>
            <p v-if="PageType == 2">
              <span v-for="(item, index) in errorClasslist" :key="index"
                >{{ item.grade | grade }}{{ item.gradeClassname }}
              </span>
            </p>
            <p v-if="PageType == 3">
              <span v-for="(item, index) in selectClassList" :key="index"
                >{{ item.grade | grade }}{{ item.gradeClassname }}
              </span>
            </p>
            <p v-if="PageType == 4">
              <span v-for="(item, index) in selectClassList" :key="index"
                >{{ item.grade | grade }}{{ item.gradeClassname }}
              </span>
            </p>
            <p v-if="PageType == 5">
              <span v-for="(item, index) in selectClassList" :key="index"
                >{{ item.grade | grade }}{{ item.gradeClassname }}
              </span>
            </p>
            <p v-if="PageType == 6">
              <span v-for="(item, index) in readClassList" :key="index"
                >{{ item.grade | grade }}{{ item.gradeClassname }}
              </span>
            </p>
          </div>
          <div>
            <span>已选题数</span>
            <span v-if="PageType == 1">{{
              addWorkbookPageQuestionnumAllList.length != 0
                ? addWorkbookPageQuestionnumAllList.length
                : 0
            }}</span>
            <span v-if="PageType == 2">
              {{
                errorAddWorkbookPageQuestionnumAllList.length != 0
                  ? errorAddWorkbookPageQuestionnumAllList.length
                  : 0
              }}
            </span>
            <span v-if="PageType == 3">{{
              selectedItemList.length != 0 ? selectedItemList.length : 0
            }}</span>
            <span v-if="PageType == 4">
              {{ wordHomeWorkCount != 0 ? wordHomeWorkCount : 0 }}
            </span>
            <span v-if="PageType == 5">
              {{ workList.length }}
            </span>
          </div>
          <div>
            <span>类型</span>
            <span v-if="PageType == 1">日常作业</span>
            <span v-if="PageType == 4">单词作业</span>
            <span v-if="PageType == 3">英语听说</span>
            <span v-if="PageType == 5">阅读训练</span>
            <span v-if="PageType == 2">错题作业</span>
          </div>
        </div>
        <div>
          <button @click="fqfb">放弃布置</button>
          <button @click="jxfb">继续布置</button>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      class="custom_dialog"
      :visible.sync="isSureQuit"
      :append-to-body="true"
      :width="'500px'"
    >
      <div slot="title">
        <h4>提示</h4>
      </div>
      <p>是否放弃编辑内容并返回上一页？</p>
      <img src="../../assets/img/publish/zuowen_bg.png" />
      <span
        slot="footer"
        class="dialog-footer"
        style="width: 100%;display: flex;justify-content: center;margin-top: 56px;"
      >
        <a-button
          type="primary"
          ghost
          @click="isSureQuit = false"
          style="width: 160px;height: 36px;border-radius: 18px;"
          >取消</a-button
        >
        <a-button
          type="primary"
          @click="sureQuit"
          style="width: 160px;height: 36px;border-radius: 18px;margin-left: 23px;"
          >确认</a-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import localforage from 'localforage'
import PublishState from './components/PublishState'
import WorkDaily from './components/WorkDaily'
import WordWork from './components/WordWork'
import EnglishWork from './components/EnglishWork'
import ErrorQustion from './components/ErrorQustion'
import WorkDailyDemand from './components/WorkDailyDemand'
import WordWorkDemand from './components/WordWorkDemand'
import EnglishWorkDemand from './components/EnglishWorkDemand'
import WorkPreview from './components/WorkPreview'
import ReadHomework from './components/ReadHomework'
import ReadWorkDemand from './components/ReadWorkDemand'
import CompositionDemand from './components/CompositionDemand'
import http from '../../api/index'
import $ from 'jquery'
export default {
  name: '',
  data() {
    return {
      count: 0, //控制头部导航的全局变量
      step1: 0, //控制第1导航的显示
      step2: 0, //控制第2导航的显示
      step3: 0, //控制第3导航的显示
      step4: 0, //控制第4导航的显示
      step5: 0, //控制第5导航的显示
      quanState1: 0, //控制状态指向的圈1
      quanState2: 0, //控制状态指向的圈2
      quanState3: 0, //控制状态指向的圈3
      flag: false, //控制发布作业导航栏的跳转
      PageType: 1, //控制作业类型
      showPreview: false,
      isSureQuit: false,
      dailyQuestionnumAllList: [],
      errorQuestionnumAllList: [],
      quitFlag: true,
      errorWorklength: 0,
      worklength: 0,
      compositionGradeClassInfo: {},
      isApproval: false, //是否互批
      isApprovals: false, //是否互批
      workClass: [], //非错误作业班级列表
      selectClassList: [], //非错误作业班级列表
      errorClasslist: [], //错误班级列表
      quitType: '', //作文回退的类型
      //发布作业信息
      requestParam: {
        classDataList: [],
        homeworkMain: {},
        questionList: {
          articles: [],
          questions: {
            questionBack: [],
            workbook: []
          }
        }
      },
      workName: '',
      endTime: '',
      startTime: '',
      isHomeworkQuestionType: 0,
      showPublishDialig: false,
      isComposition: false,
      stateSave: {
        count: 0,
        quanState1: 0,
        quanState2: 0,
        quanState3: 0,
        step1: 0,
        step2: 0,
        step3: 0,
        step4: 0,
        step5: 0
      },
      isTranslate: true, // 是否翻译
      systime: ''
    }
  },
  computed: {
    homeworkType() {
      return this.$store.state.work.homeworkType
    },
    //日常作业加入题量
    readClassList: {
      get: function() {
        return this.$store.state.work.classList
      },
      set: function(v) {
        this.$store.commit('work/SET_CLASS_LIST', v)
      }
    },
    readClassListById: {
      get: function() {
        return this.$store.state.work.classListById
      },
      set: function(v) {
        this.$store.commit('work/SET_CLASS_LIST_BY_ID', v)
      }
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    workList() {
      return this.$store.state.work.readWorkList
    },
    wordHomeWorkCount() {
      return this.$store.getters['publish/wordHomeWorkCount']
    },
    //日常作业加入题量
    addWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.workAllList
      },
      set: function(v) {
        this.$store.commit('publish/WORKALLLIST', v)
      }
    },
    //错题作业加入题量
    errorAddWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.errorWorkAllList
      },
      set: function(v) {
        this.$store.commit('publish/ERRORWORKALLLIST', v)
      }
    },
    // 单词作业要求题型
    hqtnJson() {
      return this.$store.state.publish.hqtnJson
    },
    // 听说作业list
    selectedItemList() {
      return (
        this.$store.state.publish.selectedItemList &&
        this.$store.state.publish.selectedItemList.filter(item => item.active)
      )
    }
  },
  components: {
    PublishState,
    WorkDaily,
    WordWork,
    ErrorQustion,
    EnglishWork,
    WorkDailyDemand,
    WordWorkDemand,
    EnglishWorkDemand,
    WorkPreview,
    ReadHomework,
    ReadWorkDemand,
    CompositionDemand
  },
  created() {
    let readWorkList = JSON.parse(localStorage.getItem('readWorkList'))
    let readWorkListById = JSON.parse(localStorage.getItem('readWorkListById'))
    this.$store.commit('work/SETREADWORKLIST', readWorkList || [])
    this.$store.commit('work/SETREADWORKLISTBYID', readWorkListById || [])
  },
  mounted() {
    //this.clearNull()
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function() {
      history.pushState(null, null, document.URL)
    })

    this.flag =
      localStorage.getItem('flag') != null ? localStorage.getItem('flag') : true

    //  获取状态
    this.stateSave =
      JSON.parse(localStorage.getItem('stateSave')) != null
        ? JSON.parse(localStorage.getItem('stateSave'))
        : {
            count: 0,
            quanState1: 0,
            quanState2: 0,
            quanState3: 0,
            step1: 0,
            step2: 0,
            step3: 0,
            step4: 0,
            step5: 0,
            isComposition: false
          }
    this.count = this.stateSave.count
    this.quanState1 = this.stateSave.quanState1
    this.quanState2 = this.stateSave.quanState2
    this.quanState3 = this.stateSave.quanState3
    this.step1 = this.stateSave.step1
    this.step2 = this.stateSave.step2
    this.step3 = this.stateSave.step3
    this.step4 = this.stateSave.step4
    this.step5 = this.stateSave.step5
    this.isComposition = this.stateSave.isComposition
      ? this.stateSave.isComposition
      : false

    localforage.getItem('selectClassToPublishCompositionInfo').then(res => {
      this.compositionGradeClassInfo = res
    })

    if (
      localStorage.getItem('type') != null &&
      localStorage.getItem('type') != ''
    ) {
      this.PageType = localStorage.getItem('type')
    } else {
      if (
        localStorage.getItem('workType') != null &&
        localStorage.getItem('workType') != ''
      ) {
        this.PageType = localStorage.getItem('workType')
      } else {
        this.PageType = this.homeworkType
      }
    }
    this.$store.commit('publish/TYPE', this.workType)
    // //错题作业数量数目
    this.errorWorklength =
      this.errorAddWorkbookPageQuestionnumAllList != undefined
        ? this.errorAddWorkbookPageQuestionnumAllList.length
        : 0

    //日常作业数量数目
    this.worklength =
      this.addWorkbookPageQuestionnumAllList != undefined
        ? this.addWorkbookPageQuestionnumAllList.length
        : 0
  },
  methods: {
    //  试题预览 日常
    //清空数据
    clearNull() {
      // 清除英语听说
      this.$store.commit('publish/UPDATESELECTEDITEMLIST')
      localforage.removeItem('selectedItemList')
      // 清除单词
      this.$store.commit('publish/RESETWORDLIST')
      this.$store.commit('publish/UPDATEWORDMENUINDEX', 0)
      localforage.removeItem('wordList')

      localStorage.setItem('flag', null)
      localStorage.setItem(
        'addWorkbookPageQuestionnumAllList',
        JSON.stringify([])
      )
      this.$store.commit('publish/WORKALLLIST', [])
      localStorage.setItem(
        'errorAddWorkbookPageQuestionnumAllList',
        JSON.stringify([])
      )
      this.$store.commit('work/SETREADWORKLIST', [])
      this.$store.commit('work/SETREADWORKLISTBYID', [])
      this.$store.commit('publish/ERRORWORKALLLIST', [])
      localStorage.setItem('selectClassList', JSON.stringify([])) //非错题作业id
      localStorage.setItem('classType', JSON.stringify([])) //非错题作业列表
      localStorage.setItem('errorClassType', null) //错题作业id
      localStorage.setItem('errorClasslist', JSON.stringify([])) ////错题作业列表
      this.$store.commit('publish/ERRORCLASSTYPE', null)
      this.$store.commit('publish/ERRORCLASSLIST', [])
      this.$store.commit('publish/CLASSTYPE', [])
      this.$store.commit('publish/SELECTCLASSLIST', [])
      localStorage.setItem('type', '')
      this.$store.commit('publish/TYPE', '')
      this.stateSave = {
        count: 0,
        quanState1: 0,
        quanState2: 0,
        quanState3: 0,
        step1: 0,
        step2: 0,
        step3: 0,
        step4: 0,
        step5: 0,
        isComposition: false
      }
      localStorage.removeItem('stateSave', JSON.stringify(this.stateSave))
      localforage.removeItem('selectedItemList')
    },
    getLength(len) {
      this.worklength = len
    },
    //日常作业
    getWorkLength(len) {
      this.worklength = len
    },
    //获取作业名称
    getInputVal(val) {
      this.workName = val
    },
    //获取开始时间
    getStartVal(val) {
      this.startTime = val
    },
    //获取结束时间
    getEndVal(val) {
      this.endTime = val
    },
    //互批
    getHpVal(val) {
      this.isApproval = val
    },
    //互批
    getHpVals(val) {
      this.isApprovals = val
    },
    // 翻译
    getTranslate(val) {
      this.isTranslate = val
    },
    //  试题预览 错误
    getLengtherror(len) {
      this.errorWorklength = len
    },
    //错误作业
    getErrorWorkLength(len) {
      this.errorWorklength = len
    },

    toPageType(val) {
      this.PageType = val
    },
    //退出按钮
    quitPublish() {
      if (
        this.isComposition &&
        Number(this.PageType) === 6 &&
        this.count === 2
      ) {
        this.quitType = 'quitPublish'
        this.isSureQuit = true
        return false
      }
      this.selectClassList = JSON.parse(localStorage.getItem('selectClassList'))
        ? JSON.parse(localStorage.getItem('selectClassList'))
        : []
      this.errorClasslist = JSON.parse(localStorage.getItem('errorClasslist'))
        ? JSON.parse(localStorage.getItem('errorClasslist'))
        : null
      if (
        this.addWorkbookPageQuestionnumAllList.length > 0 ||
        (this.errorAddWorkbookPageQuestionnumAllList != undefined &&
          this.errorAddWorkbookPageQuestionnumAllList.length > 0) ||
        this.selectedItemList.length > 0 ||
        this.wordHomeWorkCount > 0 ||
        this.workList.length > 0
      ) {
        this.showPublishDialig = true
      } else {
        this.clearNull()
        this.$router.push('./home')
      }
    },
    sureQuit() {
      if (this.quitType === 'prevBtn' || this.quitType === 'zydx') {
        this.quitType = ''
        this.quanState1 = 0
        this.quanState2 = 0
        this.quanState3 = 0
        this.step1 = 0
        this.step2 = 0
        this.step3 = 0
        this.step4 = 0
        this.step5 = 0
        this.count = 0
        this.isComposition = false
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5,
          isComposition: this.isComposition
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
        this.isSureQuit = false
        return false
      }
      this.selectClassList = JSON.parse(localStorage.getItem('selectClassList'))
        ? JSON.parse(localStorage.getItem('selectClassList'))
        : []
      this.errorClasslist = JSON.parse(localStorage.getItem('errorClasslist'))
        ? JSON.parse(localStorage.getItem('errorClasslist'))
        : null
      if (
        this.addWorkbookPageQuestionnumAllList.length > 0 ||
        (this.errorAddWorkbookPageQuestionnumAllList != undefined &&
          this.errorAddWorkbookPageQuestionnumAllList.length > 0) ||
        this.workList.length > 0
      ) {
        this.showPublishDialig = true
      } else {
        this.clearNull()
        this.$router.push('./home')
      }
    },
    close() {
      this.showPublishDialig = false
    },
    //继续发布
    jxfb() {
      this.showPublishDialig = false
    },
    //放弃发布
    fqfb() {
      this.quitFlag = false
      this.clearNull()
      this.$router.push('./home')
    },
    //点击最顶导航按钮的样式切换
    selectNav(n) {
      if (n === 'zydx') {
        if (
          this.isComposition &&
          Number(this.PageType) === 6 &&
          this.isSureQuit === false
        ) {
          this.quitType = 'zydx'
          this.isSureQuit = true
          return false
        }
        this.count = 0
        this.quanState1 = 0
        this.quanState2 = 0
        this.quanState3 = 0
        this.step1 = 0
        this.step2 = 0
        this.step3 = 0
        this.step4 = 0
        this.step5 = 0
        this.flag = false
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
      }
      if (n === 'zynr') {
        if (
          JSON.parse(localStorage.getItem('classType')).length === 0 &&
          this.PageType == 1
        ) {
          this.$message.warning(' 至少选择一个班级')
          return false
        }

        if (
          JSON.parse(localStorage.getItem('errorClasslist')).length === 0 &&
          this.PageType === 2
        ) {
          this.$message.warning(' 至少选择一个班级')
          return false
        }
        if (Number(this.PageType) == 6) {
          localforage
            .getItem('selectClassToPublishCompositionInfo')
            .then(response => {
              console.log(response)
              this.compositionGradeClassInfo = response
              // 获取当前班级当天是否已发布过作文作业
              let params = {
                gradeClassId: response.gradeClassid,
                teacherId: this.$store.getters.teacherId
              }
              this.$http
                .get('/api/teacher/homework/ifPublishComposition', {
                  params: params
                })
                .then(res => {
                  let isPublish = res.data.infos.ifPublish
                    ? res.data.infos.ifPublish
                    : 0
                  if (Number(isPublish) === 0) {
                    this.workClass = JSON.parse(
                      localStorage.getItem('selectClassList')
                    )
                      ? JSON.parse(localStorage.getItem('selectClassList'))
                      : []
                    this.isComposition = true
                    this.quanState1 = 1
                    this.quanState2 = 2
                    this.quanState3 = 1
                    this.step1 = 1
                    this.step2 = 1
                    this.step3 = 2
                    this.step4 = 2
                    this.step5 = 1
                    this.count = 2
                  } else if (Number(isPublish) > 0) {
                    this.$message.error(
                      '每天只能发布一篇作文，明天再来发布吧！'
                    )
                  }
                })
            })
          return false
        } else {
          this.isComposition = false
        }

        if (
          this.PageType == 2 &&
          JSON.parse(localStorage.getItem('errorClasslist'))[0]
            .classWrongQuestionCount == 0
        ) {
          this.$message.warning(
            $('.publish-class .hover-li p')
              .find('span:nth-child(1)')
              .text() + '没有错题'
          )
          return false
        }
        this.count = 1
        this.flag = true
        localStorage.setItem('flag', this.flag)
        this.quanState1 = 1
        this.quanState2 = 1
        this.quanState3 = 0
        this.step1 = 1
        this.step2 = 1
        this.step3 = 1
        this.step4 = 1
        this.step5 = 0
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
      }
      if (n === 'zyyq') {
        if (Number(this.PageType) === 6) {
          return false
        }
        if (
          JSON.parse(localStorage.getItem('classType')).length === 0 &&
          this.PageType == 1
        ) {
          this.$message.warning(' 至少选择一个班级')
          this.flag = false
          return false
        }

        if (
          JSON.parse(localStorage.getItem('errorClasslist')).length === 0 &&
          this.PageType == 2
        ) {
          this.$message.warning(' 至少选择一个班级')
          this.flag = false
          return false
        }
        if (
          this.PageType == 2 &&
          JSON.parse(localStorage.getItem('errorClasslist'))[0]
            .classWrongQuestionCount == 0
        ) {
          this.$message.warning(
            $('.publish-class .hover-li p')
              .find('span:nth-child(1)')
              .text() + '没有错题'
          )
          this.flag = false
          return false
        } else {
          this.flag = true
        }
        if (this.PageType == 1) {
          if (this.addWorkbookPageQuestionnumAllList.length === 0) {
            this.$message.warning('请选择题目')
            this.flag = false
            return false
          } else {
            this.flag = true
          }
        }
        if (this.PageType == 4) {
          if (this.wordHomeWorkCount === 0) {
            this.flag = false
            this.$message.warning('请选择题目')
            return false
          } else {
            this.flag = true
          }
        }
        if (this.PageType == 3) {
          if (this.selectedItemList.length === 0) {
            this.flag = false
            this.$message.warning('请选择题目')
            return false
          } else {
            this.flag = true
          }
        }
        if (this.PageType == 2) {
          if (this.errorAddWorkbookPageQuestionnumAllList.length === 0) {
            this.flag = false
            this.$message.warning('请选择题目')
            return false
          } else {
            this.flag = true
          }
        }
        if (this.count === 1 && this.PageType == 5) {
          if (this.workList.length === 0) {
            this.$message.warning('请选择题目')
            return false
          }
        }
        if (this.flag) {
          this.count = 2
          this.quanState1 = 1
          this.quanState2 = 2
          this.quanState3 = 1
          this.step1 = 1
          this.step2 = 2
          this.step3 = 2
          this.step4 = 2
          this.step5 = 1
        }
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
        this.flag = false
      }

      if (this.count === 2 && this.PageType == 5) {
        for (var i = 0; i < this.workList.length; i++) {
          if (this.workList[i].questionProperty === 1) {
            this.isApproval = true
            this.isHomeworkQuestionType = 1
            break
          }
        }
      }
      if (this.count === 2 && this.PageType == 3) {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
          ? JSON.parse(localStorage.getItem('selectClassList'))
          : []
      }
      if (this.count === 2 && this.PageType == 4) {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
          ? JSON.parse(localStorage.getItem('selectClassList'))
          : []
      }
      if (this.count === 2 && this.PageType == 5) {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
          ? JSON.parse(localStorage.getItem('selectClassList'))
          : []
      }
      if (this.count === 2 && this.PageType == 2) {
        for (
          let i = 0;
          i < this.errorAddWorkbookPageQuestionnumAllList.length;
          i++
        ) {
          if (
            this.errorAddWorkbookPageQuestionnumAllList[i].questionProperty ===
            1
          ) {
            this.isApproval = true
            this.isHomeworkQuestionType = 1
            break
          }
        }
        this.workClass = JSON.parse(localStorage.getItem('errorClasslist'))
          ? JSON.parse(localStorage.getItem('errorClasslist'))
          : null
      }
    },
    //显示作业预览
    showWorkPreview() {
      if (this.PageType == 1) {
        this.dailyQuestionnumAllList = JSON.parse(
          localStorage.getItem('addWorkbookPageQuestionnumAllList')
        )
          ? JSON.parse(
              localStorage.getItem('addWorkbookPageQuestionnumAllList')
            )
          : []
        if (this.dailyQuestionnumAllList.length == 0) {
          this.$message.warning('请先选择题目加入作业')
          return
        }
        this.showPreview = true
      } else if (this.PageType == 2) {
        this.errorQuestionnumAllList = JSON.parse(
          localStorage.getItem('errorAddWorkbookPageQuestionnumAllList')
        )
          ? JSON.parse(
              localStorage.getItem('errorAddWorkbookPageQuestionnumAllList')
            )
          : []
        if (this.errorQuestionnumAllList.length == 0) {
          this.$message.warning('请先选择题目加入作业')
          return
        }
        this.showPreview = true
      } else if (this.PageType == 4) {
        if (this.wordHomeWorkCount === 0) {
          this.$message.warning('没有添加单词')
          return
        }
        this.showPreview = true
      } else if (this.PageType == 3) {
        if (this.selectedItemList.length === 0) {
          this.$message.warning('请先选择题目加入作业')
          return
        }
        this.$store.commit('publish/HIDESELECTEDITEMLIST')
        this.showPreview = true
      }
    },
    //隐藏作业预览
    hideWorkPreview() {
      this.showPreview = false
      if (
        this.worklength == 0 &&
        this.errorWorklength == 0 &&
        this.selectedItemList.length == 0 &&
        this.wordHomeWorkCount == 0
      ) {
        this.count = 1
        this.quanState1 = 1
        this.quanState2 = 1
        this.quanState3 = 0
        this.step1 = 1
        this.step2 = 1
        this.step3 = 1
        this.step4 = 1
        this.step5 = 0
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
      }
    },
    //下一步
    nextBtn() {
      if (this.count === 0) {
        if (
          JSON.parse(localStorage.getItem('classType')).length === 0 &&
          this.PageType != 2 &&
          this.PageType != 6
        ) {
          this.$message.warning(' 至少选择一个班级')
          return false
        }
        // if (
        //   JSON.parse(localStorage.getItem('errorClasslist')).length === 0 &&
        //   this.PageType === 2
        // ) {
        //   this.$message.warning(' 至少选择一个班级')
        //   return false
        // }
        // if (!this.readClassListById && this.PageType == 6) {
        //   this.$message.warning(' 至少选择一个班级')
        //   return false
        // }
        if (
          this.PageType == 2 &&
          JSON.parse(localStorage.getItem('errorClasslist'))[0]
            .classWrongQuestionCount == 0
        ) {
          this.$message.warning(
            $('.publish-class .hover-li p')
              .find('span:nth-child(1)')
              .text() + '没有错题'
          )
          return false
        }

        //作文   如果是作文   不要作业内容,且使用特殊的作业要求
        if (Number(this.PageType) === 6) {
          localforage
            .getItem('selectClassToPublishCompositionInfo')
            .then(response => {
              console.log(response)
              this.compositionGradeClassInfo = response
              // 获取当前班级当天是否已发布过作文作业
              let params = {
                gradeClassId: response.gradeClassid,
                teacherId: this.$store.getters.teacherId
              }
              this.$http
                .get('/api/teacher/homework/ifPublishComposition', {
                  params: params
                })
                .then(res => {
                  console.log(res)
                  let isPublish = res.data.infos.ifPublish
                    ? res.data.infos.ifPublish
                    : 0
                  if (Number(isPublish) === 0) {
                    this.workClass = JSON.parse(
                      localStorage.getItem('selectClassList')
                    )
                      ? JSON.parse(localStorage.getItem('selectClassList'))
                      : []
                    this.isComposition = true
                    this.quanState1 = 1
                    this.quanState2 = 2
                    this.quanState3 = 1
                    this.step1 = 1
                    this.step2 = 1
                    this.step3 = 2
                    this.step4 = 2
                    this.step5 = 1
                    this.count = 2
                  } else if (Number(isPublish) > 0) {
                    this.$message.error(
                      '每天只能发布一篇作文，明天再来发布吧！'
                    )
                  }
                })
            })
          return false
        } else {
          this.isComposition = false
        }
      }

      if (this.count === 1 && this.PageType == 1) {
        if (this.addWorkbookPageQuestionnumAllList.length === 0) {
          this.$message.warning('请选择题目')
          return false
        }
      }
      if (this.count === 1 && this.PageType == 4) {
        if (this.wordHomeWorkCount === 0) {
          this.$message.warning('请选择题目')
          return false
        }
      }
      if (this.count === 1 && this.PageType == 3) {
        if (this.selectedItemList.length === 0) {
          this.$message.warning('请选择题目')
          return false
        }
      }
      if (this.count === 1 && this.PageType == 2) {
        if (this.errorAddWorkbookPageQuestionnumAllList.length === 0) {
          this.$message.warning('请选择题目')
          return false
        }
      }

      if (this.count === 1 && this.PageType == 5) {
        if (this.workList.length === 0) {
          this.$message.warning('请选择题目')
          return false
        }
      }

      this.count++

      if (this.count === 1) {
        this.quanState1 = 1
        this.quanState2 = 1
        this.step1 = 1
        this.step2 = 1
        this.step3 = 1
        this.step4 = 1
        this.step5 = 0
        this.flag = true
      }
      if (this.count === 2) {
        this.quanState1 = 1
        this.quanState2 = 2
        this.quanState3 = 1
        this.step1 = 1
        this.step2 = 2
        this.step3 = 2
        this.step4 = 2
        this.step5 = 1
      }
      this.stateSave = {
        count: this.count,
        quanState1: this.quanState1,
        quanState2: this.quanState2,
        quanState3: this.quanState3,
        step1: this.step1,
        step2: this.step2,
        step3: this.step3,
        step4: this.step4,
        step5: this.step5
      }
      localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
      if (this.count === 2 && this.PageType == 4) {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
          ? JSON.parse(localStorage.getItem('selectClassList'))
          : []
      }
      if (this.count === 2 && this.PageType == 3) {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
          ? JSON.parse(localStorage.getItem('selectClassList'))
          : []
      }
      if (this.count === 2 && this.PageType == 5) {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
          ? JSON.parse(localStorage.getItem('selectClassList'))
          : []
      }
      if (this.count === 2 && this.PageType == 5) {
        for (var i = 0; i < this.workList.length; i++) {
          if (this.workList[i].questionProperty === 1) {
            this.isApproval = true
            this.isHomeworkQuestionType = 1
            break
          }
        }
      }
    },
    //上一步
    prevBtn() {
      if (
        this.isComposition &&
        Number(this.PageType) === 6 &&
        this.isSureQuit === false
      ) {
        this.quitType = 'prevBtn'
        this.isSureQuit = true
        return false
      }
      this.count--
      if (this.count === 1) {
        this.quanState1 = 1
        this.quanState2 = 1
        this.quanState3 = 0
        this.step1 = 1
        this.step2 = 1
        this.step3 = 1
        this.step4 = 1
        this.step5 = 0
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
      }
      if (this.count === 0) {
        this.quanState1 = 0
        this.quanState2 = 0
        this.step1 = 0
        this.step2 = 0
        this.step3 = 0
        this.step4 = 0
        this.step5 = 0
        this.stateSave = {
          count: this.count,
          quanState1: this.quanState1,
          quanState2: this.quanState2,
          quanState3: this.quanState3,
          step1: this.step1,
          step2: this.step2,
          step3: this.step3,
          step4: this.step4,
          step5: this.step5
        }
        localStorage.setItem('stateSave', JSON.stringify(this.stateSave))
        return false
      }
    },
    hanldePublish() {
      if (Number(this.PageType) === 6) {
        if (this.$store.state.compositionFlag) {
          this.$store.commit('COMPOTIONFLAG', false)
          this.$refs.compositionHomework.publishComposition()
        }
        return false
      }
      var self = this
      var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_()（）《》;、.。:~'\"\s]+$/
      //var reg = /^[\\u4e00-\\u9fa5a-zA-Z0-9_\\s.。'’/(/)/（/）/《/》/;/、/:/~/"]{2,20}/
      this.requestParam = {
        classDataList: [],
        homeworkMain: {},
        questionList: {
          articles: [],
          questions: {
            questionBack: [],
            workbook: []
          }
        }
      }
      if (this.workName == '') {
        this.workName = this.formatDates(new Date().getTime())
      }

      if (!reg.test(this.workName)) {
        this.$message.error('请勿输入特殊字符')
        return false
      }
      if (this.workName.length < 2) {
        {
          this.$message.error('请输入2-16个字的名称')
          return false
        }
      }

      if (this.startTime === '' && this.endTime === '') {
        this.$message.error('请选择时间')
        return false
      }

      this.$http.get('/api/teacher/system/time').then(res => {
        this.systime = res.data.infos
        //时间插件判断
        var start = new Date(this.startTime)
        start.setSeconds(0)
        start.setMilliseconds(0)
        var end = new Date(this.endTime)
        end.setSeconds(0)
        end.setMilliseconds(0)
        var chooseDate = new Date(this.systime)
        chooseDate.setSeconds(0)
        chooseDate.setMilliseconds(0)
        chooseDate.setMinutes(chooseDate.getMinutes() + 10)
        if (chooseDate.getMinutes() > 30) {
          chooseDate.setHours(chooseDate.getHours() + 1)
          chooseDate.setMinutes(0)
        } else {
          chooseDate.setMinutes(30)
        }
        if (start.getTime() < chooseDate.getTime()) {
          self.$message.error('开始时间不能早于当前时间')
          return false
        } else if (end.getTime() == start.getTime()) {
          self.$message.error('结束时间不能等于开始时间')
          return false
        } else if (end.getTime() < start.getTime()) {
          self.$message.error('结束时间不能早于开始时间')
          return false
        }

        if (this.PageType == 1 || this.PageType == 2) {
          this.publishBtn()
        } else if (this.PageType == 4) {
          if (this.hqtnJson.length == 0) {
            this.$message.error('至少选择一种题目类型')
            return false
          }
          let homeworkClassIds = []

          this.workClass.forEach(item => {
            homeworkClassIds.push(item.gradeClassid)
          })
          this.loading = this.$loading({
            lock: true,
            text: '作业发布中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            fontSize: '14px'
          })
          this.$store
            .dispatch('publish/publishWordWork', {
              homeworkClassIds: homeworkClassIds.join(','),
              homeworkName: this.workName,
              homeworkStarttime: this.startTime,
              homeworkEndtime: this.endTime
            })
            .then(({ data }) => {
              if (data.flag === 1) {
                this.$router.push('/work')
                this.$message.success('作业发布成功')
                this.loading.close()
                this.clearNull()
              }
            })
        } else if (this.PageType == 3) {
          if (this.selectedItemList.length > 50) {
            this.$message.warning('所选题目个数不能超过50道')
            return
          }
          // let homeworkClassList = []
          this.workClass.forEach((item, index) => {
            // homeworkClassList[index].grade = item.grade
            // homeworkClassList[index].gradeClassid = item.gradeClassid
            // homeworkClassList[index].gradeClassname = item.gradeClassname
            // homeworkClassList[index].homeworkEndtime = this.startTime
            // homeworkClassList[index].homeworkStarttime = this.endTime
            this.workClass[index] = {
              ...item,
              homeworkEndtime: this.endTime,
              homeworkStarttime: this.startTime
            }
          })
          let homeworkInfo = {
            homeworkName: this.workName,
            isTranslate: this.isTranslate,
            teacherId: this.$store.getters.teacherId,
            teacherName: this.$store.getters.teacherName
          }
          if (this.selectedItemList.length != 0) {
            this.loading = this.$loading({
              lock: true,
              text: '作业发布中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              fontSize: '14px'
            })
          } else {
            this.$message.warning('请选择题目')
          }

          this.$store
            .dispatch(
              'publish/publishEnglish',
              JSON.stringify({
                homeworkClassList: this.workClass,
                homeworkInfo: homeworkInfo,
                questionList: this.selectedItemList
              })
            )
            .then(({ data }) => {
              if (data.flag === 1) {
                this.$router.push('/work')
                this.$message.success('作业发布成功')
                this.loading.close()
                this.clearNull()
                localforage.removeItem('selectedItemList')
              }
            })
        } else if (this.PageType == 5) {
          if (this.workList.length > 50) {
            this.$message.warning('所选题目个数不能超过50道')
            return
          }
          if (this.workList.length == 0) {
            this.$message.error('请选择题目')
            return false
          }
          if (this.workClass.length == 0) {
            this.$message.error('请选择班级')
            return false
          }
          let classDataList = this.workClass.map(item => {
            return {
              gradeClassid: item.gradeClassid,
              homeworkEndtime: this.endTime,
              homeworkStarttime: this.startTime,
              studentNum: item.gradeClassQuestionnm
            }
          })
          let questionList = this.workList.map(item => {
            return {
              questionChildNum: item.questionChildNum,
              questionId: item.questionId,
              questionInfoId: item.questionInfoId,
              questionTextNum: item.questionTextNum,
              questionTextType: item.questionTextType,
              questionTextTypeName: item.questionTextTypeName,
              questionTitle: item.questionTitle,
              questionTitleName: item.questionTitleName
            }
          })

          let homeworkMain = {
            homeworkIshp: this.isApproval ? 1 : 2,
            homeworkName: this.workName,
            homeworkQuestionType: this.isHomeworkQuestionType,
            homeworkType: 5,
            questionNumber: questionList.length,
            section: this.userInfo.section,
            subjectAbbreviation: this.userInfo.subjectAbbreviation,
            teacherId: this.userInfo.teacherId,
            teacherName: this.userInfo.teacherName
          }
          let data = {
            requestParam: JSON.stringify({
              classDataList,
              questionList,
              homeworkMain
            })
          }
          this.loading = this.$loading({
            lock: true,
            text: '作业发布中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            fontSize: '14px'
          })
          http
            .post('/api/teacher/homework/publish/article', data)
            .then(res => {
              if (res.data.flag === 1) {
                this.$router.push('/work')
                this.$message.success('作业发布成功')
                this.loading.close()
                this.clearNull()
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    publishBtn() {
      this.isHomeworkQuestionType = 0
      if (this.isApproval) {
        for (
          let i = 0;
          i < this.addWorkbookPageQuestionnumAllList.length;
          i++
        ) {
          if (
            this.addWorkbookPageQuestionnumAllList[i].questionProperty === 1
          ) {
            this.isApproval = true
            this.isHomeworkQuestionType = 1
            break
          }
        }
        if (this.errorAddWorkbookPageQuestionnumAllList != undefined) {
          for (
            let i = 0;
            i < this.errorAddWorkbookPageQuestionnumAllList.length;
            i++
          ) {
            if (
              this.errorAddWorkbookPageQuestionnumAllList[i]
                .questionProperty === 1
            ) {
              this.isApproval = true
              this.isHomeworkQuestionType = 1
              break
            }
          }
        }
      }
      if (this.isApprovals) {
        for (
          let i = 0;
          i < this.addWorkbookPageQuestionnumAllList.length;
          i++
        ) {
          if (
            this.addWorkbookPageQuestionnumAllList[i].questionProperty === 1
          ) {
            this.isApprovals = true
            this.isHomeworkQuestionType = 1
            break
          }
        }
        if (this.errorAddWorkbookPageQuestionnumAllList != undefined) {
          for (
            let i = 0;
            i < this.errorAddWorkbookPageQuestionnumAllList.length;
            i++
          ) {
            if (
              this.errorAddWorkbookPageQuestionnumAllList[i]
                .questionProperty === 1
            ) {
              this.isApproval = true
              this.isHomeworkQuestionType = 1
              break
            }
          }
        }
      }
      for (let i = 0; i < this.addWorkbookPageQuestionnumAllList.length; i++) {
        if (this.addWorkbookPageQuestionnumAllList[i].questionProperty === 1) {
          this.isHomeworkQuestionType = 1
          break
        }
      }
      if (this.errorAddWorkbookPageQuestionnumAllList != undefined) {
        for (
          let i = 0;
          i < this.errorAddWorkbookPageQuestionnumAllList.length;
          i++
        ) {
          if (
            this.errorAddWorkbookPageQuestionnumAllList[i].questionProperty ===
            1
          ) {
            this.isHomeworkQuestionType = 1
            break
          }
        }
      }

      if (
        JSON.parse(localStorage.getItem('errorClasslist')) != null &&
        JSON.parse(localStorage.getItem('errorClasslist')) != undefined &&
        JSON.parse(localStorage.getItem('errorClasslist')).length != 0
      ) {
        this.workClass = JSON.parse(localStorage.getItem('errorClasslist'))
      } else {
        this.workClass = JSON.parse(localStorage.getItem('selectClassList'))
      }
      this.workClass.forEach(item => {
        item['homeworkStarttime'] = this.startTime
        item['homeworkEndtime'] = this.endTime
        this.requestParam.classDataList.push(item)
      })
      this.requestParam.homeworkMain = {
        homeworkArticleIshp: this.isApprovals ? 1 : 2,
        homeworkIshp: this.isApproval ? 1 : 2,
        homeworkName: this.workName,
        section: this.$store.state.userInfo.section,
        subjectAbbreviation: this.$store.state.userInfo.subjectAbbreviation,
        teacherId: this.$store.state.userInfo.teacherId,
        teacherName: this.$store.state.userInfo.teacherName
      }

      if (this.count === 2 && this.PageType == 1) {
        if (this.addWorkbookPageQuestionnumAllList.length <= 50) {
          if (this.addWorkbookPageQuestionnumAllList.length != 0) {
            this.addWorkbookPageQuestionnumAllList.forEach(item => {
              if (item.questionSourceId == 2) {
                let obj = {
                  questionId: item.questionId,
                  questionInfoId: item.questionInfoId,
                  questionProperty: item.questionProperty,
                  questionScore: item.questionScore
                }
                this.requestParam.questionList.questions.questionBack.push(obj)
              }
              if (item.questionSourceId == 1 && item.questionTypeCode != 8) {
                let obj = {
                  questionId: item.questionId,
                  questionInfoId: item.questionInfoId,
                  questionProperty: item.questionProperty,
                  questionScore: item.questionScore,
                  workbookChapterPageSort: item.workbookChapterPageSort,
                  workbookChapterPage: item.workbookChapterPage,
                  workbookId: item.workbookId
                }
                this.requestParam.questionList.questions.workbook.push(obj)
              }
              if (item.questionSourceId == 1 && item.questionTypeCode == 8) {
                let obj = {
                  questionChildNum: item.questionChildNum,
                  questionId: item.questionId,
                  questionInfoId: item.questionInfoId,
                  questionTextNum: item.questionTextNum,
                  questionTextType: item.questionTextType,
                  questionTextTypeName: item.questionTextTypeName,
                  questionTitle: item.questionTitle,
                  questionTitleName: item.questionTitleName
                }
                this.requestParam.questionList.articles.push(obj)
              }
            })
            this.loading = this.$loading({
              lock: true,
              text: '作业发布中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              fontSize: '14px'
            })
          } else {
            this.$message.warning('请选择题目')
          }
        } else {
          this.$message.warning('所选题目个数不能超过50道')
          return
        }
      }
      if (this.count === 2 && this.PageType == 2) {
        this.requestParam = {
          classDataList: [],
          homeworkInfo: {},
          questionList: []
        }
        this.workClass.forEach(item => {
          item['homeworkStarttime'] = this.startTime
          item['homeworkEndtime'] = this.endTime
          this.requestParam.classDataList.push(item)
        })
        this.requestParam.homeworkInfo = {
          homeworkIshp: this.isApproval ? 1 : 2,
          homeworkName: this.workName,
          section: this.$store.state.userInfo.section,
          subjectAbbreviation: this.$store.state.userInfo.subjectAbbreviation,
          teacherId: this.$store.state.userInfo.teacherId,
          teacherName: this.$store.state.userInfo.teacherName
        }
        if (this.selectedItemList.length > 100) {
          this.$message.warning('所选题目个数不能超过100道')
          return
        }
        if (this.errorAddWorkbookPageQuestionnumAllList != undefined) {
          this.errorAddWorkbookPageQuestionnumAllList.forEach(item => {
            this.requestParam.questionList.push(item)
          })
          this.loading = this.$loading({
            lock: true,
            text: '作业发布中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            fontSize: '14px'
          })
        } else {
          this.$message.warning('请选择题目')
        }
      }

      if (this.PageType == 1) {
        this.$store
          .dispatch('publish/publishWork', this.requestParam)
          .then(data => {
            if (data.flag === 1) {
              this.$router.push('/work')
              this.$message.success('作业发布成功')
              this.loading.close()
              this.clearNull()
            }
          })
      }
      if (this.PageType == 2) {
        this.$store
          .dispatch('publish/errorPublishWork', this.requestParam)
          .then(data => {
            if (data.flag === 1) {
              this.$router.push('/work')
              this.$message.success('作业发布成功')
              this.loading.close()
              this.clearNull()
            }
          })
      }
    },
    formatDates(value, format = 'MM月dd日作业') {
      var crtTime = new Date(value)
      return this.dateFtt(format, crtTime)
    },
    dateFtt(fmt, date) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    }
  },
  beforeDestroy() {
    localforage.removeItem('wordList')
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.publish-wrap {
  @include wh(100%, 100%);
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  opacity: 0;
  animation: op 0.2s 0s forwards;
  z-index: 899;
  .publish-mask {
    @include wh(100%, 100%);
    animation: translate 0.6s 0.5s forwards;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 999;
    background: #f0f7ff;
    .publish-top {
      @include wh(100%, 50px);
      display: flex;
      justify-content: center;
      div:nth-of-type(odd) {
        @include wh(31.5%, 50px);
        margin-left: -2px;
        cursor: pointer;
        img {
          @include wh(100%, 100%);
        }
      }
      div:nth-of-type(even) {
        cursor: pointer;
        @include wh(3.5%, 50px);
        margin-left: -2px;
        img {
          @include wh(100%, 100%);
        }
      }
      div {
        position: relative;
        img.quan-state,
        span.quan-state {
          @include wh(34px, 34px);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
        p {
          position: absolute;
          left: 56%;
          top: 27%;
          @include sc(16px, #aaa);
        }
        p.hover-p {
          color: #fff;
        }
        span.quan-state-1 {
          display: block;
          @include wh(31px, 31px);
          border: 2px solid rgba(170, 170, 170, 1);
          border-radius: 50%;
          @include sc(18px, #ababab);
          text-align: center;
          line-height: 30px;
        }
        img.quan {
          @include wh(36px, 31px);
        }
        i {
          @include wh(34px, 34px);
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 1%;
          margin: auto;
          font-style: inherit;
          @include sc(18px, #fff);
          text-align: center;
          line-height: 35px;
        }
      }
    }
    .publish-btn {
      @include wh(30%, auto);
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: fixed;
      z-index: 999;
      right: 10%;
      bottom: 15px;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        @include wh(100px, 32px);
        #{$attr}-radius: 30px;
        background: #1059ff;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        img {
          @include wh(6px, 10px);
          margin-left: 5px;
        }
        span {
          margin-top: -2px;
        }
      }
      p:nth-of-type(1) {
        img {
          margin-right: 5px;
        }
      }
      p.publish {
        @include wh(110px, 38px);
        background: #13a99f;
        img {
          @include wh(20px, 20px);
        }
      }
      .next-btn {
        margin-left: 10px;
      }
      .prev-btn {
      }
    }
  }
  .selected {
    @include wh(88px, 60px);
    background: #fddc94;
    border: 1px solid rgba(253, 220, 148, 1);
    border-radius: 16px;
    position: fixed;
    right: 10px;
    top: 45%;
    z-index: 99999;
    @include fj(space-around);
    flex-flow: column;
    align-items: center;
    cursor: pointer;
    span:nth-child(1) {
      @include sc(30px, #f07124);
      height: 30px;
      line-height: 27px;
    }
    span:nth-child(2) {
      @include sc(14px, #f07124);
      height: 14px;
      line-height: 12px;
    }
  }
  .quit-publish {
    position: absolute;
    right: 15px;
    top: 0;
    z-index: 999999999;
    @include fj();
    flex-flow: column;
    align-items: center;
    opacity: 0;
    animation: translates 0.8s 1.2s forwards;
    > span {
      display: block;
      @include wh(2px, 37px);
      background: #399eff;
    }
    p {
      display: block;
      @include wh(50px, 50px);
      background: #399eff;
      border-radius: 50%;
      @include fj(center);
      flex-flow: column;
      align-items: center;
      cursor: pointer;
      img {
        @include wh(22px, 22px);
      }
      span {
        @include sc(13px, #fff);
      }
    }
  }
  .dialog-publish-wrap {
    @include wh(100%, 100%);
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    @include fj(center);
    align-items: center;
    z-index: 9999999;
    .publish-dialog {
      @include wh(500px, 320px);
      background: #fff;
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      border-radius: 12px;
      > p {
        @include wh(100%, 48px);
        margin: 0 auto;
        padding: 0 20px;
        @include fj(space-between);
        align-items: center;
        border-bottom: 1px solid #ddd;
        span {
          @include sc(14px, #5e84ad);
        }
        img {
          @include wh(14px, 14px);
        }
      }
      > span {
        display: block;
        @include wh(100%, auto);
        margin: 20px auto 0;
        text-align: center;
        @include sc(17px, #3d4d65);
      }
      > div:nth-child(3) {
        margin-top: 20px;
        > div {
          @include wh(65%, auto);
          margin: 20px auto 0;
          border-bottom: 1px solid #ddd;
          padding-bottom: 3px;
          @include fj();
          justify-content: flex-start;
          > span:nth-child(1) {
            font-size: 12px;
            @include wh(65px, auto);
            text-align: right;
          }
          > p {
            margin-left: 20px;
          }
          > span:nth-child(2) {
            margin-left: 20px;
            span {
              margin-right: 10px;
            }
          }
        }
      }
      > div:nth-child(4) {
        @include wh(100%, auto);
        @include fj(center);
        margin-top: 25px;
        button {
          @include wh(160px, 36px);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(16, 89, 255, 1);
          box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
          border-radius: 18px;
          @include sc(14px, #1059ff);
          outline: none;
        }
        button:nth-child(2) {
          background: #1059ff;
          box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
          border-radius: 18px;
          @include sc(14px, #fff);
          margin-left: 23px;
          border: 0;
        }
      }
    }
  }
}

@keyframes translate {
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes translate-1 {
  0% {
    opacity: 0;
    transform: translate(0, 0%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 100%);
  }
}
@keyframes op {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes translates {
  0% {
    opacity: 0;
    transform: translate(0, -200px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>

<style scoped>
.custom_dialog >>> .el-dialog {
  height: 320px;
  position: relative;
}
.custom_dialog >>> .el-dialog__header {
  border-bottom: 1px solid #ddd;
  padding: 0;
}
.custom_dialog >>> .el-dialog__header div {
  width: 100%;
  text-align: left;
  padding-left: 23px;
  font-size: 14px;
  line-height: 48px;
}
.custom_dialog >>> .el-dialog__header h4 {
  color: #5e84ad;
  font-size: 14px;
}
.custom_dialog >>> .el-dialog__body {
  padding: 0;
}
.custom_dialog >>> .el-dialog__body p {
  text-align: center;
  font-size: 17px;
  color: rgb(61, 77, 101);
  margin-top: 71px;
  margin-bottom: 45px;
}
.custom_dialog >>> .el-dialog__body img {
  position: absolute;
  width: 452px;
  height: 124px;
  bottom: 0;
  left: 0;
}
</style>