<template>
  <div class="full-screen-wrap-1">
    <div
      class="full-screen"
      v-swiperleft="{ fn: nextBtn, name: '左滑' }"
      v-swiperight="{ fn: prveBtn, name: '右滑' }"
    >
      <div>
        <img
          src="../../../../assets/img/publish/close.png"
          alt=""
          class="close"
          @click="close"
        />
        <div>
          <img
            src="../../../../assets/img/publish/left_normal.png"
            alt=""
            class="prveBtn"
            v-if="ShowSelectLeft"
            @mouseenter="handelover"
          />
          <img
            src="../../../../assets/img/publish/left_selected.png"
            alt=""
            class="prveBtn"
            v-else
            @mouseleave="handeleave"
            @click="prveBtn"
          />
          <img
            src="../../../../assets/img/publish/right_normal.png"
            alt=""
            class="nextBtn"
            v-if="ShowSelectRight"
            @mouseenter="handelover1"
          />
          <img
            src="../../../../assets/img/publish/right_selected.png"
            alt=""
            class="nextBtn"
            v-else
            @mouseleave="handeleave1"
            @click="nextBtn"
          />
        </div>

        <div v-if="currentFullScreenList.questionTypeCode != 8">
          <span>
            <i>试题来源</i>
            <i
              style="max-width:100px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
              >{{ currentFullScreenList.questionSourceName }}</i
            >
          </span>
          <span>
            <i>页数</i>
            <i>{{ currentFullScreenList.workbookChapterPage }}</i>
          </span>
          <span>
            <i>题号</i>
            <i>{{ currentFullScreenList.questionNumber }}</i>
          </span>
          <span>
            <i>题型</i>
            <i
              style="max-width:100px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
              >{{ currentFullScreenList.questionTypeName }}</i
            >
          </span>
        </div>
        <div v-else>
          <span>
            <i>分类</i>
            <i
              style="max-width:100px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
              >{{ currentFullScreenList.questionTextTypeName }}</i
            >
          </span>
          <span>
            <i>相关主题</i>
            <i>{{ currentFullScreenList.questionTitleName }}</i>
          </span>
          <span>
            <i>阅读能力维度</i>
            <i>{{ currentFullScreenList.abilityDimensions }}</i>
          </span>
          <span>
            <i>子题数</i>
            <i
              style="max-width:100px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
              >{{ currentFullScreenList.questionChildNum }}</i
            >
          </span>
          <span>
            <i>阅读量</i>
            <i
              style="max-width:100px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
              >{{ currentFullScreenList.questionTextNum }}</i
            >
          </span>
        </div>
        <div ref="elememt" v-if="currentFullScreenList.questionTypeCode != 8">
          <div class="answer" :style="scaleFun">
            <div>题目</div>
            <div class="answer-infos">
              <p v-html="currentFullScreenList.questionStem"></p>
              <div
                v-if="
                  currentFullScreenList.questionTypeCode == 4 ||
                    currentFullScreenList.questionTypeCode == 2 ||
                    currentFullScreenList.questionTypeCode == 1
                "
                class="pp"
              >
                <div
                  v-for="(t, index) in currentFullScreenList.questionOptions"
                  :key="index"
                >
                  <p>{{ t.questionOption }}、</p>
                  <p v-html="t.questionContent"></p>
                </div>
              </div>
              <div :class="isZk ? '' : 'hover-div'" class="answer-infos-1">
                <p v-if="currentFullScreenList.questionTypeCode == 3">
                  <span>参考答案</span>
                  <span>{{
                    currentFullScreenList.questionAnswer == 'Y'
                      ? '正确'
                      : '错误'
                  }}</span>
                </p>
                <p
                  class="tk"
                  v-else-if="currentFullScreenList.questionTypeCode == 5"
                >
                  <span>参考答案</span>
                  <span
                    v-for="(items, index) in JSON.parse(
                      currentFullScreenList.questionAnswer
                    )"
                    :key="index"
                  >
                    <i>{{ index + 1 }}、</i>
                    <template
                      v-if="items.property != undefined && items.property == 1"
                    >
                      <i
                        v-for="(i, index) in items.answer"
                        :key="index"
                        v-html="decodeURIComponent(i)"
                      ></i>
                    </template>
                    <template v-else>
                      <i
                        v-for="(i, index) in items.answer"
                        :key="index"
                        v-html="i"
                      ></i>
                    </template>
                  </span>
                </p>
                <p
                  v-if="
                    currentFullScreenList.questionTypeCode != 4 &&
                      currentFullScreenList.questionTypeCode != 3 &&
                      currentFullScreenList.questionTypeCode != 5
                  "
                >
                  <span>参考答案</span>
                  <span v-html="currentFullScreenList.questionAnswer"></span>
                </p>

                <p v-if="currentFullScreenList.questionTypeCode != 4">
                  <span>解析</span>
                  <span v-html="currentFullScreenList.questionAnalysis"></span>
                </p>
              </div>
              <div
                class="subject-child"
                v-if="currentFullScreenList.questionTypeCode == 4"
              >
                <div
                  v-for="(items, index) in tizuWorkbookPageQuestionnumList"
                  :key="index"
                  class="child-sub"
                  :class="zkFlagOfanswer ? '' : 'hover-div1'"
                >
                  <p>子题目</p>
                  <div>
                    <p v-html="items.questionStem"></p>
                    <p class="tz">
                      <a
                        v-for="(t, index) in items.questionOptions"
                        :key="index"
                      >
                        <span>{{ t.questionOption }}、</span>
                        <span v-html="t.questionContent"></span>
                      </a>
                    </p>
                  </div>
                </div>

                <div :class="isZk ? 'hover-div' : 'hover-div'" class="zk-con">
                  <span
                    class="zk"
                    v-if="textFlag"
                    @click="
                      showAnswerBtn(
                        currentFullScreenList.questionId,
                        currentFullScreenList.questionInfoId,
                        currentFullScreenList.questionTypeCode
                      )
                    "
                    >展开</span
                  >
                  <span class="sq" v-if="!textFlag" @click="showAnswerBtns()"
                    >隐藏</span
                  >
                </div>

                <div v-if="isAnswer" class="answer-infos-2">
                  <template v-for="items in tizuWorkbookPageQuestionnumList">
                    <p>
                      <span>参考答案</span>
                      <span v-html="items.questionAnswer"></span>
                    </p>
                    <p>
                      <span>解析</span>
                      <span v-html="items.questionAnalysis"></span>
                    </p>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阅读 -->
        <div
          ref="elememt"
          v-if="currentFullScreenList.questionTypeCode == 8"
          style="overflow:scroll"
        >
          <div class="original-topic" :style="scaleFun">
            <div
              class="original-content margin-bottom-20"
              v-html="currentFullScreenList.questionStem"
            ></div>
            <div :class="isZk ? '' : 'hover-div'" class="answer-infos-read">
              <template v-for="(item, index) in topicData">
                <topic
                  style="margin-bottom: 20px"
                  referenceColor="#1059FF"
                  :topic-data="item"
                  :key="index"
                />
              </template>
            </div>
          </div>
        </div>
        <!-- 展开收起 -->
        <div>
          <a
            href="javascript:;"
            v-if="isZk"
            @click="
              zk(
                currentFullScreenList.questionId,
                currentFullScreenList.questionInfoId,
                currentFullScreenList.questionTypeCode
              )
            "
          >
            <img src="../../../../assets/img/publish/zzkk.png" alt="" />
            <span>展开答案</span>
          </a>
          <a href="javascript:;" @click="sq" v-else>
            <img src="../../../../assets/img/publish/ssqq.png" alt="" />
            <span>收起答案</span>
          </a>
        </div>
        <div class="scale">
          <span @click="add">+</span>
          <span @click="reduce">-</span>
        </div>
      </div>
    </div>

    <div
      style="position:fixed;left:0;
    top:0;background:rgba(0,0,0,0.3);width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999999999"
      v-if="picflag"
    >
      <imageView
        :imgArr="imgArr"
        :showImageView="true"
        :imageIndex="imageIndex"
        v-on:hideImage="hideImageView"
      ></imageView>
    </div>
  </div>
</template>
<script>
import Topic from '../../../../components/problem/topic'
import imageView from 'vue-imageview'
import $ from 'jquery'
import { setTimeout } from 'timers'
export default {
  props: [
    'fullId',
    'fullscreen',
    'type',
    'isShowMore',
    'count',
    'workbookType'
  ],
  data() {
    return {
      loag: 0,
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      isZk: true,
      ShowSelectLeft: true,
      ShowSelectRight: true,
      fullScreenList: '',
      //fullid: '',
      currentFullScreenList: [],
      tizuWorkbookPageQuestionnumList: [],
      childSubjectList: [],
      currentPage: 0,
      domfull: '',
      workbookPageQuestionnumLists: '',
      nextFlag: false,
      prveFlag: false,
      isAnswer: false,
      zkFlagOfanswer: true,
      textFlag: true,
      scale: [1, 1.3, 1.6, 1.9, 2.2],
      scaleIndex: 0,
      setWidth: '',
      setHeight: '',
      scaleFun: '',
      topicData: [],
      originalInfo: {
        abilityDimensions: '',
        childQuestionInfoList: [],
        questionArticleTitle: '',
        questionChildNum: 0,
        questionId: 0,
        questionInfoId: 0, // 分段试题id
        questionSourceId: 0, // 试题来源ID
        questionSourceName: '', // 试题来源名称
        questionStem: '', // 题干	string
        questionTextNum: 0, // 字数	number
        questionTypeCode: '', // 试题编码
        questionUuid: '', // 试题uuid
        styleName: '', // 文体名称	string
        subjectAbbreviation: '', // 学科简称
        subjectId: 0, // 学科ID
        subjectName: '', // 学科名
        teacherQuestionCollectonId: 0, // 老师收藏id	number
        themeName: '' //	主题名称
      }
    }
  },
  components: { imageView, Topic },

  computed: {
    workbookPageQuestionnumList: {
      get: function() {
        return this.$store.state.work.workbookPageQuestionnumLists
      },
      set: function(v) {
        this.$store.commit('work/TESTS', v)
      }
    },
    fullid: {
      get: function() {
        return this.$store.state.publish.fullid
      },
      set: function(v) {
        this.$store.commit('publish/FULLID', v)
      }
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {
    fullid(val) {
      this.workbookPageQuestionnumList.forEach((item, index) => {
        if (item.questionId === val) {
          this.currentFullScreenList = item
          this.currentPage = index
        }
      })
      if (this.currentPage == this.workbookPageQuestionnumList.length - 1) {
        this.nextFlag = true
      } else {
        this.nextFlag = false
      }
      if (this.workbookType == 2) {
        this.nextFlag = false
      }
      if (this.currentPage == 0) {
        this.prveFlag = true
      }
    },
    workbookPageQuestionnumList(val) {
      if (val.length == 0) {
        this.prveFlag = true
      }
      if (this.prve) {
        this.currentPage = val.length
      }
      if (this.loag == 1) {
        this.currentPage = val.length - 1
      }
    }
  },
  created() {},
  mounted() {
    //去掉电脑自带滑动效果
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function() {
      history.pushState(null, null, document.URL)
    })

    this.scaleIndex = this.scale.length - 1
    this.scaleFn()
    this.requestFullScreen(document.documentElement)
    this.workbookPageQuestionnumList.forEach((item, index) => {
      if (item.questionId === this.fullId) {
        this.currentFullScreenList = item
        this.getOriginalData(item.questionId)
        this.currentPage = index
      }
    })
    if (this.currentPage == this.workbookPageQuestionnumList.length - 1) {
      this.nextFlag = true
    }
    if (this.workbookType == 2) {
      this.nextFlag = false
    }
    if (this.currentPage == 0) {
      this.prveFlag = true
    }
    this.$nextTick().then(() => {
      var that = this
      // const ViewerDom = document.getElementById('index')
      // this.Viewer = new Viewer(ViewerDom, {
      //   // 相关配置项,详情见下面
      // })
      if (this.workbookPageQuestionnumList.length > 0) {
        $('.answer-infos img').click(function() {
          that.picflag = true
          that.imgArr = []
          that.imgArr.push($(this).attr('src'))
        })
      }
    })
  },
  methods: {
    getOriginalData(id) {
      let data = {
        questionId: id,
        teacherId: this.userInfo.teacherId,
        section: this.userInfo.section,
        subjectAbbreviation: 'yuwen'
      }
      this.$http
        .get('/api/question/articleInfo', { params: data })
        .then(res => {
          if (res.data.flag === 1) {
            let remote = res.data.infos
            let {
              grade,
              abilityDimensions,
              childQuestionInfoList,
              questionArticleTitle,
              questionChildNum,
              questionId,
              questionInfoId, // 分段试题id
              questionSourceId, // 试题来源ID
              questionSourceName, // 试题来源名称
              questionStem, // 题干	string
              questionTextNum, // 字数	number
              questionTypeCode, // 试题编码
              questionUuid, // 试题uuid
              styleName, // 文体名称	string
              subjectAbbreviation, // 学科简称
              subjectId, // 学科ID
              subjectName, // 学科名
              teacherQuestionCollectonId, // 老师收藏id	number
              themeName //	主题名称
            } = remote
            this.originalInfo = {
              grade,
              abilityDimensions,
              childQuestionInfoList,
              questionArticleTitle,
              questionChildNum,
              questionId,
              questionInfoId, // 分段试题id
              questionSourceId, // 试题来源ID
              questionSourceName, // 试题来源名称
              questionStem, // 题干	string
              questionTextNum, // 字数	number
              questionTypeCode, // 试题编码
              questionUuid, // 试题uuid
              styleName, // 文体名称	string
              subjectAbbreviation, // 学科简称
              subjectId, // 学科ID
              subjectName, // 学科名
              teacherQuestionCollectonId, // 老师收藏id	number
              themeName //	主题名称
            }
            this.createQuestionChild()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    createQuestionChild() {
      let arr = []
      this.topicData = this.getChildrenquestionInfoList(this.originalInfo)
    },
    getChildrenquestionInfoList(data) {
      let arr = []
      if (data.childQuestionInfoList && data.childQuestionInfoList.length) {
        data.childQuestionInfoList.forEach((item, index) => {
          let obj = {
            index: index + 1,
            topicProblem: item.questionStem,
            topicMain: item.questionStem,
            reference: item.questionAnswer,
            analysis: item.questionAnalysis
          }
          if (item.questionTypeCode === 3) {
            let answer = obj.reference
            obj.reference = answer ? (answer === 'N' ? '错误' : '正确') : null
          }
          if (item.childQuestionInfoList && item.childQuestionInfoList.length) {
            obj.children = this.getChildrenquestionInfoList(item)
          }
          if (item.questionTypeCode === 1 || item.questionTypeCode === 2) {
            if (item.questionOptions && item.questionOptions.length) {
              obj.options = item.questionOptions.map(item => {
                return {
                  label: item.questionContent,
                  value: item.questionOption
                }
              })
            }
          }

          if (item.questionTypeCode === 5) {
            let answer = JSON.parse(item.questionAnswer)
            let src = ''
            answer.forEach((item, index) => {
              src += `<span>${index + 1}、 ${item.answer.join('，')}；</span>`
            })
            obj.reference = `<p>${src}</p>`
          }
          arr.push(obj)
        })
      }
      return arr
    },
    hideImageView() {
      this.picflag = false
    },
    add() {
      this.scaleIndex++
      if (this.scaleIndex > this.scale.length - 1) {
        this.scaleIndex = this.scale.length - 1
      }
      this.scaleFn()
    },
    reduce() {
      this.scaleIndex--
      if (this.scaleIndex < 0) {
        this.scaleIndex = 0
      }
      this.scaleFn()
    },
    scaleFn() {
      this.setWidth =
        this.$refs.elememt.offsetWidth / this.scale[this.scaleIndex]
      this.setHeight =
        this.$refs.elememt.offsetHeight / this.scale[this.scaleIndex]
      this.scaleFun = `transform:scale(${this.scale[this.scaleIndex]});width:${
        this.setWidth
      }px;height:${this.setHeight}px`
    },
    requestFullScreen(element) {
      var requestMethod =
        element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen //IE11
      if (requestMethod) {
        requestMethod.call(element)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        //for Internet Explorer
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    },

    zk(id, questionInfoId, questionTypeCode) {
      if (questionTypeCode === 4) {
        this.$store
          .dispatch('publish/homeworkDetail', {
            questionInfoId: questionInfoId,
            questionTypeCode: questionTypeCode
          })
          .then(data => {
            this.tizuWorkbookPageQuestionnumList =
              data.infos.childQuestionInfoList

            this.isAnswer = true
          })
      }
      this.isZk = false
    },
    sq() {
      this.isZk = true
      this.isAnswer = false
    },
    handelover1() {
      this.ShowSelectRight = false
    },
    handelover() {
      this.ShowSelectLeft = false
    },
    handeleave1() {
      this.ShowSelectRight = true
    },
    handeleave() {
      this.ShowSelectLeft = true
    },
    showAnswerBtn(id, questionInfoId, questionTypeCode) {
      if (questionTypeCode === 4) {
        this.$store
          .dispatch('publish/homeworkDetail', {
            questionInfoId: questionInfoId,
            questionTypeCode: questionTypeCode
          })
          .then(data => {
            this.tizuWorkbookPageQuestionnumList =
              data.infos.childQuestionInfoList
          })
      }
      this.textFlag = false
      this.zkFlagOfanswer = false
    },
    showAnswerBtns() {
      this.textFlag = true
      this.zkFlagOfanswer = true
    },
    nextBtn() {
      var self = this
      this.isZk = true
      this.prveFlag = false
      if (
        this.nextFlag &&
        self.type != 1 &&
        self.workbookType != 2 &&
        self.type != 2
      ) {
        this.$emit('toParentNext')
        //this.$emit('toParentChange')
        self.currentPage = -1
        this.nextFlag = false
      }
      self.currentPage++
      ;(function(currentPage) {
        setTimeout(function() {
          if (
            currentPage == self.workbookPageQuestionnumList.length - 2 &&
            self.type == 1
          ) {
            //self.$emit('toParentNext')
            self.$emit('toParentChange')
          }
          if (self.type == 1) {
            if (self.isShowMore) {
              if (currentPage >= self.workbookPageQuestionnumList.length - 1) {
                currentPage = self.workbookPageQuestionnumList.length - 1
                self.currentPage = self.workbookPageQuestionnumList.length - 1
                self.currentFullScreenList =
                  self.workbookPageQuestionnumList[currentPage]
                self.fullid = self.currentFullScreenList.questionId
                this.prveFlag = true
                self.loag = 0 //判断数据的条数
                self.$message.warn('已经是最后一题')
                return false
              } else {
                self.currentFullScreenList =
                  self.workbookPageQuestionnumList[currentPage]
                self.fullid = self.currentFullScreenList.questionId
              }
            } else {
              self.currentFullScreenList =
                self.workbookPageQuestionnumList[currentPage]
              self.fullid = self.currentFullScreenList.questionId
            }
          } else {
            if (self.type == 2) {
              if (currentPage > self.workbookPageQuestionnumList.length - 1) {
                self.currentPage = self.workbookPageQuestionnumList.length - 1
                self.loag = 0 //判断数据的条数
                self.$message.warn('已经是最后一题')
                return false
              } else {
                self.currentFullScreenList =
                  self.workbookPageQuestionnumList[currentPage]
                self.fullid = self.currentFullScreenList.questionId
              }
            } else {
              if (self.workbookType == 2) {
                if (currentPage > self.workbookPageQuestionnumList.length - 1) {
                  self.currentPage = self.workbookPageQuestionnumList.length - 1
                  self.$message.warn('已经是最后一题')
                  self.loag = 0 //判断数据的条数
                  return false
                } else {
                  self.currentFullScreenList =
                    self.workbookPageQuestionnumList[currentPage]
                  self.fullid = self.currentFullScreenList.questionId
                }
              } else {
                if (self.workbookPageQuestionnumList.length == 0) {
                  self.prveFlag = true
                  self.loag = 1 //判断数据的条数
                  self.$message.warn('已经是最后一题')
                  return false
                }
                if (
                  self.workbookPageQuestionnumList.length != 0 &&
                  self.fullscreen == false
                ) {
                  self.loag = 0 //判断数据的条数
                  self.prveFlag = true
                  self.currentPage = self.workbookPageQuestionnumList.length - 1
                  self.$message.warn('已经是最后一题')
                  return false
                }
                self.currentFullScreenList =
                  self.workbookPageQuestionnumList[currentPage]
                self.fullid = self.currentFullScreenList.questionId
              }
            }
          }
          self.getOriginalData(self.currentFullScreenList.questionId)
        }, 400)
      })(self.currentPage)
    },
    prveBtn() {
      var self = this
      this.isZk = true
      this.prve = true
      if (
        this.prveFlag &&
        self.type != 1 &&
        self.workbookType != 2 &&
        self.type != 2
      ) {
        this.$emit('toParentPrve')
        this.prveFlag = false
      }

      setTimeout(function() {
        self.currentPage--
        if (self.type == 1 || self.type == 2) {
          if (self.currentPage <= 0) {
            self.currentPage = 0
            self.currentFullScreenList =
              self.workbookPageQuestionnumList[self.currentPage]
            self.fullid = self.currentFullScreenList.questionId
            self.$message.warn('已经是最后一题')
            return false
          }
          self.currentFullScreenList =
            self.workbookPageQuestionnumList[self.currentPage]
          self.fullid = self.currentFullScreenList.questionId
        } else {
          if (self.workbookType == 2) {
            if (self.currentPage <= 0) {
              self.currentPage = 0
              self.currentFullScreenList =
                self.workbookPageQuestionnumList[self.currentPage]
              self.fullid = self.currentFullScreenList.questionId
              self.$message.warn('已经是最后一题')
              self.loag = 0 //判断数据的条数
              return false
            } else {
              self.currentFullScreenList =
                self.workbookPageQuestionnumList[self.currentPage]
              self.fullid = self.currentFullScreenList.questionId
            }
          } else {
            if (self.type === 3) {
              if (self.currentPage < 0) {
                self.currentPage = 0
                self.$message.warn('已经是最后一题')
                self.currentFullScreenList =
                  self.workbookPageQuestionnumList[self.currentPage]
                self.fullid = self.currentFullScreenList.questionId
                return false
              } else {
                self.currentFullScreenList =
                  self.workbookPageQuestionnumList[self.currentPage]
                self.fullid = self.currentFullScreenList.questionId
              }
            } else {
              if (self.currentPage < 0) {
                self.currentPage = self.workbookPageQuestionnumList.length - 1
              }
              self.currentFullScreenList =
                self.workbookPageQuestionnumList[self.currentPage]
              self.fullid = self.currentFullScreenList.questionId
            }
          }
        }
        self.getOriginalData(self.currentFullScreenList.questionId)
      }, 400)
    },
    close() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitExitFullscreen
        ? document.webkitExitFullscreen()
        : ''
      this.$emit('toParentsClose')
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variable.scss';
.full-screen-wrap-1 {
  scrollbar-width: none;
  .answer-infos-read {
    scrollbar-width: none;
    @include wh(100%, 0);
    overflow: auto;
  }
  div.hover-div {
    height: auto;
    overflow: auto;
  }
}

.full-screen-wrap-1 {
  scrollbar-width: none;
  @include wh(100%, 100%);
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  @include fj(center);
  align-items: center;
  > div {
    @include wh(100%, 100%);
    @include fj(center);
    align-items: center;
  }
}
.full-screen {
  scrollbar-width: none;
  @include wh(98%, 96%);
  background: rgba(245, 247, 241, 1);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px;
  position: relative;
  transform: scale(1);
  > div {
    scrollbar-width: none;
    @include wh(100%, 100%);
    img.close {
      width: 14px !important;
      height: 14px !important;
      position: absolute;
      right: 25px;
      top: 20px;
    }
    img.nextBtn {
      @include wh(45px, 45px);
    }
    img.prveBtn {
      @include wh(45px, 45px);
    }
    > div:nth-child(2) {
      scrollbar-width: none;
      @include wh(98%, 0);
      @include fj();
      position: absolute;
      top: 45%;
      left: 1%;
      z-index: 999;
    }
    > div:nth-child(3) {
      scrollbar-width: none;
      @include wh(94%, 70px);
      margin: 0 auto;
      border-bottom: 1px solid rgba(222, 222, 222, 1);
      @include fj(flex-start);
      align-items: center;
      span {
        margin-right: 10px;
        margin-left: 13px;
        i:nth-child(1) {
          margin-right: 6px;
          @include sc(12px, #999);
        }
        i:nth-child(2) {
          @include sc(14px, #5e84ad);
        }
      }
    }
    > div:nth-child(4) {
      scrollbar-width: none;
      @include wh(92%, 78%);
      position: absolute;
      top: -3%;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      @include fj(center);
      align-items: center;
      .answer {
        scrollbar-width: none;
        @include wh(100%, 100%);
        margin: 0 auto;
        overflow: scroll;
        @include fj();
        > div:nth-child(1) {
          scrollbar-width: none;
          @include wh(44px, 24px);
          background: rgba(86, 172, 255, 1);
          border-radius: 0px 12px 12px 0px;
          text-align: center;
          line-height: 24px;
          @include sc(12px, #fff);
        }
        .answer-infos {
          scrollbar-width: none;
          @include wh(95%, auto);
          > p {
            width: 100%;
            min-height: 70px;
            @include sc(14px, #4e5f71);
            line-height: 20px;
          }
          > .pp {
            margin: 20px 0 20px 0;
            overflow: auto;
            height: auto;
            > div {
              scrollbar-width: none;
              overflow: auto;
              margin-bottom: 10px;
              @include fj(flex-start);
              > p {
                word-break: break-all;
                padding-right: 10px;
                float: left;
                @include sc(14px, #3d4d65);
              }
            }
          }
          > div.answer-infos-1 {
            scrollbar-width: none;
            @include wh(100%, 0);
            overflow: auto;
            > p {
              margin-top: 20px;
              > span:nth-child(1) {
                display: block;
                @include wh(64px, 24px);
                background: rgba(86, 172, 255, 1);
                border-radius: 12px;
                @include sc(12px, #fff);
                text-align: center;
                line-height: 24px;
              }
              > span:nth-child(2) {
                display: block;
                margin: 10px 0px 0 10px;
                line-height: 20px;
              }
            }
            .tk {
              span:nth-of-type(n + 2) {
                display: block;
                background: none !important;
                color: #415f71;
                min-height: 30px;
                margin-left: 10px;
                i {
                  @include sc(14px, #415f71);
                }
              }
            }
          }
          .subject-child {
            scrollbar-width: none;
            @include wh(100%, auto);
            margin-top: 10px;
            > div.child-sub {
              scrollbar-width: none;
              width: 100%;
              overflow: hidden;
              height: 0;
              border: 0;
              border-radius: 4px;
              position: relative;
              margin-top: 0px;
              padding-bottom: 0px;
              > p:nth-child(1) {
                @include wh(54px, 24px);
                background: rgba(86, 172, 255, 1);
                border-radius: 0px 12px 12px 0px;
                position: absolute;
                left: 0;
                top: 10px;
                text-align: center;
                line-height: 24px;
                @include sc(12px, #fff);
              }
              > div {
                scrollbar-width: none;
                @include wh(88%, auto);
                float: left;
                margin: 10px 0 0 80px;
                @include sc(14px, #4e5f71);
                > p:nth-child(2) {
                  margin-top: 10px;
                }
                .tz {
                  a {
                    display: block;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-top: 5px;
                    @include sc(14px, #415f71);
                    span:nth-child(1) {
                      margin-right: 0px;
                    }
                  }
                }
              }
            }
            > div.zk-con {
              scrollbar-width: none;
              overflow: auto;
              height: 0;
              > span.zk {
                @include wh(74px, 24px);
                background: rgba(245, 247, 241, 1);
                border: 1px solid rgba(86, 172, 255, 1);
                border-radius: 12px;
                background: url(../../../../assets/img/publish/zhank.png)
                  no-repeat 20% center;
                background-size: 15%, 100%;
                float: right;
                margin: 20px 0 20px 0;
                @include sc(14px, #399eff);
                text-align: center;
                line-height: 24px;
                padding-left: 17px;
                cursor: pointer;
              }
              > span.sq {
                @include wh(74px, 24px);
                background: rgba(245, 247, 241, 1);
                border: 1px solid rgba(86, 172, 255, 1);
                border-radius: 12px;
                background: url(../../../../assets/img/publish/shouq.png)
                  no-repeat 20% center;
                background-size: 15%, 100%;
                float: right;
                margin: 20px 0 20px 0;
                @include sc(14px, #399eff);
                text-align: center;
                line-height: 24px;
                padding-left: 17px;
                cursor: pointer;
              }
            }
            > div.hover-div {
              height: auto;
              overflow: auto;
            }
            > div.hover-div1 {
              height: auto;
              overflow: auto;
              border: 1px solid rgba(222, 222, 222, 1);
              box-shadow: 0px 3px 3px 0px rgba(168, 168, 168, 0.1);
              margin-top: 10px;
              padding-bottom: 10px;
            }

            > div.answer-infos-2 {
              @include wh(100%, 0);
              float: left;
              p {
                margin-top: 20px;
                span:nth-child(1) {
                  display: block;
                  @include wh(64px, 24px);
                  background: rgba(86, 172, 255, 1);
                  border-radius: 12px;
                  @include sc(12px, #fff);
                  text-align: center;
                  line-height: 24px;
                }
                span:nth-child(2) {
                  display: block;
                  margin: 10px 0px 0 10px;
                  line-height: 20px;
                }
              }
            }
          }

          > div.hover-div {
            height: auto;
            overflow: auto;
          }
        }
      }
    }

    > div:nth-child(5) {
      scrollbar-width: none;
      @include wh(100%, 30px);
      position: absolute;
      bottom: 60px;
      left: 0%;
      a {
        @include fj(center);
        align-items: center;
        img {
          @include wh(10px, 12px);
          margin-right: 5px;
        }
        span {
          @include sc(14px, #5e84ad);
        }
      }
    }
    .scale {
      @include wh(30px, 100px);
      @include fj();
      flex-flow: column;
      position: fixed;
      right: 100px;
      bottom: 150px;
      span {
        @include wh(30px, 30px);
        border: 1px solid rgba(219, 222, 224, 1);
        box-shadow: 0px 1px 2px 0px rgba(129, 161, 64, 0.11);
        border-radius: 2px;
        @include sc(30px, #aaa);
        text-align: center;
        line-height: 22px;
        cursor: pointer;
      }
    }
  }
}
</style>
