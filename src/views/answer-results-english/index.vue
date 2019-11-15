<template>
  <div class="read-wrap">
    <div class="nav">
      <router-link to="/work">作业 &nbsp;&nbsp;></router-link>
      <router-link to="/work-grading-assignment"
        >&nbsp;&nbsp;{{ path }} &nbsp;&nbsp;></router-link
      >
      <span>&nbsp;&nbsp;{{ studentName }}</span>
    </div>
    <div>
      <ReadingBtn
        @toParentsEvent="readBtn"
        :readingTextData="readingTextData"
        :readSDentenceData="readSDentenceData"
        :selectStateType="selectStateType"
      ></ReadingBtn>
      <div class="infos">
        <div>
          <span
            ><i>试题来源</i
            ><i>{{ videoQuestionStemList.textbookName }}</i></span
          >
          <span></span>
          <span
            ><i>单元</i
            ><i>{{ videoQuestionStemList.textbookChapterName }}</i></span
          >
          <span></span>
          <span
            ><i>小节</i><i>{{ videoQuestionStemList.unitModelName }}</i></span
          >
        </div>
        <div>
          <div class="reading-stem-wrap">
            <div
              class="reading-stem"
              v-if="videoQuestionStemList.questionType == 1"
            >
              <div class="stem-answer-infos">
                <div>题目</div>
                <div class="answer-infos">
                  <p>{{ videoQuestionStemList.questionTitle }}</p>
                  <p>{{ videoQuestionStemList.questionTitleTranslate }}</p>
                </div>
              </div>
              <div class="answer-infos-type">
                <div
                  class="answer-infos-type-1"
                  v-for="(item,
                  index) in videoQuestionStemList.videoQuestionStemList"
                  :key="index"
                >
                  <p>
                    <span>原文</span>
                    <!-- <span
                      v-if="true"
                      v-html="item.questionStemContent"
                      ref="menuItem"
                    ></span> -->
                    <span v-html="evaluatingResultStr"></span>
                  </p>

                  <p>
                    <span>翻译</span>
                    <span v-html="item.questionStemTranslate"></span>
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="follow-up">
              <div class="follow-up-infos">
                <div>题目</div>
                <div>
                  <p>{{ videoQuestionStemList.questionTitle }}</p>
                  <p>{{ videoQuestionStemList.questionTitleTranslate }}</p>
                </div>
              </div>
              <div
                v-for="(item,
                index) in videoQuestionStemList.videoQuestionStemList"
                :key="index"
                @click="selectItem(index)"
              >
                <div
                  class="follow-up-answer-infos"
                  :class="selectItemType == index ? 'hover-p' : ''"
                >
                  <p>
                    <span></span>
                    <!-- <span
                      v-html="evaluatingResultStr"
                      v-if="
                        selectItemType == index && evaluatingResultStr != ''
                      "
                    ></span> -->
                    <span
                      v-html="
                        evaluatingResultStr != '' && selectItemType == index
                          ? evaluatingResultStr
                          : item.questionStemContent
                      "
                      ref="menuItem"
                      :class="
                        selectItemType == index && evaluatingResultStr == ''
                          ? 'hover-span'
                          : ''
                      "
                    ></span>
                  </p>

                  <p>
                    <span></span>
                    <span
                      v-html="item.questionStemTranslate"
                      :class="
                        selectItemType == index && evaluatingResultStr == ''
                          ? 'hover-span'
                          : ''
                      "
                    ></span>
                  </p>
                </div>

                <img
                  src="../../assets/img/publish/ic_homepage_word_arrow_sellected.png"
                  alt=""
                  v-if="selectItemType == index"
                />
              </div>
            </div>
          </div>
          <div>
            <div v-if="evaluatingResult.result != undefined" class="yz">
              <span>
                <i>得分</i>
                <i class="score">{{
                  Number(evaluatingResult.result.overall) != 100
                    ? evaluatingResult.result.overall
                    : ''
                }}</i>
                <i class="allscore">{{
                  Number(evaluatingResult.result.overall) == 100 ? '满' : ''
                }}</i>
              </span>
              <img
                src="../../assets/img/publish/fenshu.png"
                alt=""
                v-if="Number(evaluatingResult.result.overall) != 100"
              />
              <img
                src="../../assets/img/publish/manf.png"
                alt=""
                v-else
                class="all-score"
              />
            </div>
            <div v-else class="wz">
              <span>
                <i>得分</i>
                <i>未做</i>
              </span>
            </div>
            <!-- <div class="pc" v-html="evaluatingResultStr"></div> -->
            <div></div>
            <div class="data-s">
              <div>
                <span>完整度</span>
                <span v-if="isShowwz" class="el-span-yz">{{
                  evaluatingResult.result != undefined
                    ? evaluatingResult.result.integrity
                    : 0
                }}</span>
                <span v-else class="el-span-wz">-</span>
                <span v-if="ylFlag" class="yl">
                  <i>遗漏词汇</i>
                  <i></i>
                </span>
                <span class="cf" v-if="cfFlag">
                  <i>重复词汇</i>
                  <i></i>
                </span>
              </div>
              <div>
                <span>准确度</span>
                <span v-if="isShowwz" class="el-span-yz">{{
                  videoQuestionStemList.videoQuestionStemList &&
                  videoQuestionStemList.videoQuestionStemList[0]
                    .videoHomeworkAnswerVideoList == undefined
                    ? 0
                    : evaluatingResult.result != undefined
                    ? evaluatingResult.result.pron
                    : 0
                }}</span>
                <span v-else class="el-span-wz">-</span>
                <span v-if="noFlag" class="bbj">
                  <i>单词发音</i>
                  <i>
                    <i>不标准</i>
                    <i></i>
                  </i>
                </span>
                <span v-if="ybFlag" class="yb">
                  <i>单词发音</i>
                  <i>
                    <i>一&nbsp;般</i>
                    <i></i>
                  </i>
                </span>
                <span v-if="goodFlag" class="good">
                  <i>单词发音</i>
                  <i>
                    <i style="margin-left:16px">很&nbsp;好</i>
                    <i></i>
                  </i>
                </span>
              </div>
              <div>
                <span>流畅度</span>
                <span
                  v-if="isShowwz && videoQuestionStemList.questionType == 1"
                  class="el-span-yz"
                  >{{
                    evaluatingResult.result != undefined
                      ? evaluatingResult.result.fluency
                      : 0
                  }}</span
                >
                <span
                  v-if="isShowwz && videoQuestionStemList.questionType == 2"
                  class="el-span-yz"
                  >{{
                    evaluatingResult.result != undefined
                      ? evaluatingResult.result.fluency.overall
                      : 0
                  }}</span
                >
                <span v-if="!isShowwz" class="el-span-wz">-</span>
                <span v-if="isShowwz">
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 2 &&
                        evaluatingResult.result != undefined &&
                        evaluatingResult.result.fluency.speed == 0
                    "
                    >平均语速</i
                  >
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 2 &&
                        evaluatingResult.result != undefined &&
                        evaluatingResult.result.fluency.speed == 0
                    "
                    style="color:#ff6365"
                    >较慢</i
                  >
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 1 && ldSpeed == 0
                    "
                    style="color:#ff6365"
                    >较慢</i
                  >
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 2 &&
                        evaluatingResult.result != undefined &&
                        evaluatingResult.result.fluency.speed == 1
                    "
                    style="color:#13a99f"
                    >适中</i
                  >
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 1 && ldSpeed == 1
                    "
                    style="color:#13a99f"
                    >适中</i
                  >
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 2 &&
                        evaluatingResult.result != undefined &&
                        evaluatingResult.result.fluency.speed == 2
                    "
                    style="color:#ff6365"
                    >较快</i
                  >
                  <i
                    v-if="
                      videoQuestionStemList.questionType == 1 && ldSpeed == 2
                    "
                    style="color:#ff6365"
                    >较快</i
                  >
                </span>
              </div>
            </div>
            <div class="audio-play">
              <span v-if="isShowwz">
                朗读次数
                <i>{{ answerVideoAllUrl.length }}</i>
                <i>/&nbsp;{{ answerVideoAllUrl.length }}</i>
              </span>
              <div class="audio-btn">
                <div class="prve-btn" v-if="isShowwz">
                  <img
                    src="../../assets/img/publish/left-normal.png"
                    alt=""
                    v-if="audioCount == 0"
                  />
                  <img
                    src="../../assets/img/publish/left-hover.png"
                    alt=""
                    v-if="audioCount > 0"
                    @click="prve_btn"
                  />
                  <span>上一次</span>
                </div>
                <div class="play-btn" v-if="isShowwz">
                  <img
                    src="../../assets/img/publish/play-normal.png"
                    alt=""
                    @click="play_btn"
                    v-if="audioFlag"
                  />
                  <img
                    src="../../assets/img/publish/play-hover.png"
                    alt=""
                    @click="play_btn"
                    v-else
                  />
                  <audio
                    ref="audioRef"
                    :src="audioUrl"
                    controls="controls"
                    style="display:none;"
                  />
                  <p v-if="audioFlag">
                    <span>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                    <span>正在播放第{{ audioCount + 1 }}次</span>
                    <span>
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </span>
                  </p>
                </div>
                <div v-else class="play-btn">
                  <img src="../../assets/img/publish/play_dis.png" alt="" />
                </div>
                <div class="next-btn" v-if="isShowwz">
                  <img
                    src="../../assets/img/publish/right-normal.png"
                    alt=""
                    v-if="audioCount >= answerVideoAllUrl.length - 1"
                  />
                  <img
                    src="../../assets/img/publish/right-hover.png"
                    alt=""
                    v-if="audioCount < answerVideoAllUrl.length - 1"
                    @click="next_btn"
                  />
                  <span>下一次</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="select-student">
      <span @click="prvetBtn">上一个学生</span>
      <span @click="nextBtn">下一个学生</span>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'

import ReadingBtn from './components/ReadingBtn'
var path = ''
export default {
  name: '',
  data() {
    return {
      selecThtype: 0,
      selectItemType: 0,
      isShowwz: true,
      showfullscreen: false,
      readingTextData: [],
      readSDentenceData: [],
      videoQuestionStemList: [],
      performanceList: [], //学生列表
      count: 0,
      studentInfoId: '',
      dataItem: '',
      selectStateType: '',
      evaluatingResult: {}, //评测结果
      evaluatingResultStr: '',
      answerVideoAllUrl: [], //音频数据
      audioUrl: '',
      audioCount: 0,
      ylFlag: false,
      ybFlag: false,
      goodFlag: false,
      noFlag: false,
      cfFlag: false,
      ldSpeed: null,
      audioFlag: false,
      studentName: '',
      path: '',
      type: '',
      zjFlag: false
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'work-data-statistics') {
      path = '数据分析'
    } else {
      path = '学生列表'
    }
    next()
  },
  computed: {},
  components: {
    ReadingBtn
  },
  mounted() {
    this.path = path
    this.type = localStorage.getItem('t')
    this.studentName = localStorage.getItem('studentName')
    localforage.getItem('workListItem').then(value => {
      this.dataItem = value
      if (!this.$route.params.studentInfoId) {
        localforage.getItem('studentInfoId').then(value => {
          this.studentInfoId = value
          //获取英语听说查看答题结果数据
          this.homeworkInfo()
          if (!this.$route.params.performanceList) {
            localforage.getItem('performanceList').then(value => {
              this.performanceList = value
              if (this.performanceList.length != 0) {
                this.performanceList.forEach((item, index) => {
                  if (item.studentInfoId == this.studentInfoId) {
                    this.count = index
                  }
                })
              }
            })
            return
          }
        })
        return
      }
      this.studentInfoId = this.$route.params.studentInfoId
      this.homeworkInfo()
      this.performanceList = this.$route.params.performanceList
      if (this.performanceList.length != 0) {
        this.performanceList.forEach((item, index) => {
          if (item.studentInfoId == this.studentInfoId) {
            this.count = index
          }
        })
      }
    })
  },
  methods: {
    selectItem(t) {
      this.isShowwz = true
      this.ylFlag = false
      this.ybFlag = false
      this.goodFlag = false
      this.noFlag = false
      this.cfFlag = false
      this.audioCount = 0
      this.ldSpeed = null
      this.audioFlag = false
      this.answerVideoAllUrl = []
      this.evaluatingResultStr = ''
      this.evaluatingResult = {}
      if (this.$refs.audioRef != undefined) {
        if (this.$refs.audioRef.paused) {
          this.$refs.audioRef.play()
        } else {
          this.$refs.audioRef.pause()
        }
      }

      this.selectItemType = t
      if (
        this.videoQuestionStemList.videoQuestionStemList[t]
          .videoHomeworkAnswerVideoList != undefined
      ) {
        this.videoQuestionStemList.videoQuestionStemList[
          t
        ].videoHomeworkAnswerVideoList.forEach(item => {
          this.answerVideoAllUrl.push(item.answerVideoAllUrl)
          if (item.isTopScore == 0) {
            this.evaluatingResult = JSON.parse(item.evaluatingResult)
            this.evaluatingResultsOfzj(this.evaluatingResult)
          }
        })
      } else {
        this.evaluatingResultsOfzj()
      }
    },
    play_btn() {
      this.audioFlag = !this.audioFlag
      this.audioCount = 0
      if (this.$refs.audioRef.paused) {
        this.$refs.audioRef.currentTime = 0
        this.$refs.audioRef.src = this.answerVideoAllUrl[this.audioCount]
        this.$refs.audioRef.play()
        this.$refs.audioRef.addEventListener(
          'ended',
          this.playEndedHandler,
          false
        )
        this.$refs.audioRef.loop = false
      } else {
        this.$refs.audioRef.pause()
      }
    },
    prve_btn() {
      this.audioFlag = true
      this.audioCount--
      if (this.audioCount == 0) {
        this.audioCount = 0
      }
      this.$refs.audioRef.src = this.answerVideoAllUrl[this.audioCount]
      this.$refs.audioRef.play()
      this.$refs.audioRef.addEventListener(
        'ended',
        this.playEndedHandler_prve,
        false
      )
      this.$refs.audioRef.loop = false
    },
    next_btn() {
      this.audioFlag = true
      this.audioCount++
      if (this.audioCount > this.answerVideoAllUrl.length - 1) {
        this.audioCount = this.answerVideoAllUrl.length - 1
      }
      this.$refs.audioRef.src = this.answerVideoAllUrl[this.audioCount]
      this.$refs.audioRef.play()
      this.$refs.audioRef.addEventListener(
        'ended',
        this.playEndedHandler,
        false
      )
      this.$refs.audioRef.loop = false
    },
    playEndedHandler() {
      this.audioCount++
      this.$refs.audioRef.src = this.answerVideoAllUrl[this.audioCount]
      this.$refs.audioRef.play()
      if (this.audioCount > this.answerVideoAllUrl.length - 1) {
        this.audioFlag = false
        this.$refs.audioRef.removeEventListener(
          'ended',
          this.playEndedHandler,
          false
        )
      }
    },
    playEndedHandler_prve() {
      this.audioCount--
      this.$refs.audioRef.src = this.answerVideoAllUrl[this.audioCount]
      this.$refs.audioRef.play()
      if (this.audioCount <= 0) {
        this.audioFlag = false
        this.$refs.audioRef.removeEventListener(
          'ended',
          this.playEndedHandler_prve,
          false
        )
      }
    },
    readBtn(id, type) {
      this.isShowwz = true
      this.ylFlag = false
      this.ybFlag = false
      this.goodFlag = false
      this.noFlag = false
      this.cfFlag = false
      this.ldSpeed = null
      this.audioCount = 0
      this.audioFlag = false
      this.answerVideoAllUrl = []
      this.evaluatingResultStr = ''
      this.evaluatingResult = {}
      if (this.isShowwz) {
        if (this.$refs.audioRef.paused) {
          this.$refs.audioRef.play()
        } else {
          this.$refs.audioRef.pause()
        }
      }

      //this.isShowwz = val
      this.selectStateType = id
      if (type == 'ld') {
        this.readingTextData.forEach((item, index) => {
          if (item.questionId == id) {
            this.videoQuestionStemList = this.readingTextData[index]
          }
        })
        if (
          this.videoQuestionStemList.videoQuestionStemList[0]
            .videoHomeworkAnswerVideoList != undefined
        ) {
          this.videoQuestionStemList.videoQuestionStemList[0].videoHomeworkAnswerVideoList.forEach(
            item => {
              this.answerVideoAllUrl.push(item.answerVideoAllUrl)
              if (item.isTopScore == 0) {
                this.evaluatingResult = JSON.parse(item.evaluatingResult)
                this.evaluatingResults(this.evaluatingResult)
              }
            }
          )
        }
      } else {
        this.readSDentenceData.forEach((item, index) => {
          if (item.questionId == id) {
            this.videoQuestionStemList = this.readSDentenceData[index]
          }
        })
        if (
          this.videoQuestionStemList.videoQuestionStemList[0]
            .videoHomeworkAnswerVideoList != undefined
        ) {
          this.videoQuestionStemList.videoQuestionStemList[0].videoHomeworkAnswerVideoList.forEach(
            item => {
              this.answerVideoAllUrl.push(item.answerVideoAllUrl)
              if (item.isTopScore == 0) {
                this.evaluatingResult = JSON.parse(item.evaluatingResult)
                this.evaluatingResultsOfzj(this.evaluatingResult)
              }
            }
          )
        }
      }
      //this.videoQuestionStemList = data
    },
    selecTh(t) {
      this.selecThtype = t
    },
    nextBtn() {
      this.readingTextData = []
      this.readSDentenceData = []
      this.evaluatingResult = {}
      this.ylFlag = false
      this.ybFlag = false
      this.goodFlag = false
      this.noFlag = false
      this.cfFlag = false
      this.isShowwz = true
      this.ldSpeed = null
      this.audioCount = 0
      this.audioFlag = false
      this.answerVideoAllUrl = []
      this.count++
      if (this.count >= this.performanceList.length - 1) {
        this.count = this.performanceList.length - 1
      }

      if (this.type == 1) {
        this.studentInfoId = this.performanceList[this.count].studentInfoId
      } else {
        this.studentInfoId = this.performanceList[this.count].studentId
      }
      this.studentName = this.performanceList[this.count].studentName
      this.homeworkInfo()
      localforage.setItem('studentInfoId', this.studentInfoId).then(() => {})
    },
    prvetBtn() {
      this.evaluatingResult = {}
      this.readingTextData = []
      this.readSDentenceData = []
      this.ylFlag = false
      this.ybFlag = false
      this.goodFlag = false
      this.noFlag = false
      this.cfFlag = false
      this.ldSpeed = null
      this.isShowwz = true
      this.audioCount = 0
      this.audioFlag = false
      this.answerVideoAllUrl = []
      this.count--
      if (this.count <= 0) {
        this.count = 0
      }

      if (this.type == 1) {
        this.studentInfoId = this.performanceList[this.count].studentInfoId
      } else {
        this.studentInfoId = this.performanceList[this.count].studentId
      }
      this.studentName = this.performanceList[this.count].studentName
      this.homeworkInfo()
      localforage.setItem('studentInfoId', this.studentInfoId).then(() => {})
    },
    //英语听说答题结果
    homeworkInfo() {
      this.$http
        .get('/api/teacher/homework/video/info', {
          params: {
            homeworkId: this.dataItem.homeworkId,
            studentId: this.studentInfoId
          }
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.readingTextData = []
            this.readSDentenceData = []
            res.data.infos.forEach(item => {
              if (item.questionType == 1) {
                this.readingTextData.push(item)
              } else {
                this.readSDentenceData.push(item)
              }
            })
            localStorage.setItem(
              'readingTextData',
              JSON.stringify(this.readingTextData)
            )
            localStorage.setItem(
              'readSDentenceData',
              JSON.stringify(this.readSDentenceData)
            )
            if (this.readSDentenceData.length == 0) {
              this.videoQuestionStemList = this.readingTextData[0]
              this.selectStateType = this.readingTextData[0].questionId
              if (
                this.videoQuestionStemList.videoQuestionStemList[0]
                  .videoHomeworkAnswerVideoList != undefined
              ) {
                this.videoQuestionStemList.videoQuestionStemList[0].videoHomeworkAnswerVideoList.forEach(
                  item => {
                    this.answerVideoAllUrl.push(item.answerVideoAllUrl)
                    if (item.isTopScore == 0) {
                      if (item.evaluatingResultType == 0) {
                        this.evaluatingResult = this.videoQuestionStemList.videoQuestionStemList[0].questionStemContent
                      } else {
                        this.evaluatingResult = JSON.parse(
                          item.evaluatingResult
                        )
                        this.evaluatingResults(this.evaluatingResult)
                      }
                    }
                  }
                )
              } else {
                this.isShowwz = false
                this.evaluatingResults(this.evaluatingResult)
              }
            }
            if (this.readingTextData.length == 0) {
              this.videoQuestionStemList = this.readSDentenceData[0]
              this.selectStateType = this.readSDentenceData[0].questionId
              if (
                this.videoQuestionStemList.videoQuestionStemList[0]
                  .videoHomeworkAnswerVideoList != undefined
              ) {
                this.videoQuestionStemList.videoQuestionStemList[0].videoHomeworkAnswerVideoList.forEach(
                  item => {
                    this.answerVideoAllUrl.push(item.answerVideoAllUrl)
                    if (item.isTopScore == 0) {
                      if (item.evaluatingResultType == 0) {
                        this.evaluatingResult = this.videoQuestionStemList.videoQuestionStemList[0].questionStemContent
                      } else {
                        this.evaluatingResult = JSON.parse(
                          item.evaluatingResult
                        )
                        this.evaluatingResultsOfzj(this.evaluatingResult)
                      }
                    }
                  }
                )
              } else {
                this.isShowwz = false
                this.evaluatingResultsOfzj(this.evaluatingResult)
              }
            }
            if (
              this.readingTextData.length == 0 &&
              this.readSDentenceData.length == 0
            ) {
              this.videoQuestionStemList = []
            }
            if (
              this.readingTextData.length != 0 &&
              this.readSDentenceData.length != 0
            ) {
              this.videoQuestionStemList = this.readSDentenceData[0]
              this.selectStateType = this.readSDentenceData[0].questionId
              if (
                this.videoQuestionStemList.videoQuestionStemList[0]
                  .videoHomeworkAnswerVideoList != undefined
              ) {
                this.videoQuestionStemList.videoQuestionStemList[0].videoHomeworkAnswerVideoList.forEach(
                  item => {
                    this.answerVideoAllUrl.push(item.answerVideoAllUrl)
                    if (item.isTopScore == 0) {
                      if (item.evaluatingResultType == 0) {
                        this.evaluatingResult = this.videoQuestionStemList.videoQuestionStemList[0].questionStemContent
                      } else {
                        this.evaluatingResult = JSON.parse(
                          item.evaluatingResult
                        )
                        this.evaluatingResultsOfzj(this.evaluatingResult)
                      }
                    }
                  }
                )
              } else {
                this.isShowwz = false
              }
            }
          }
        })
    },
    evaluatingResults(obj = {}) {
      if (obj.result == undefined) {
        this.isShowwz = false
      }
      this.evaluatingResultStr = ''
      if (obj.result != undefined) {
        for (var i = 0; i < obj.result.details.length; i++) {
          this.ldSpeed += obj.result.details[i].fluency.speed
          for (var j = 0; j < obj.result.details[i].snt_details.length; j++) {
            if (
              obj.result.details[i].snt_details[j].dp_type != undefined &&
              obj.result.details[i].snt_details[j].dp_type == 1
            ) {
              if (obj.result.details[i].snt_details[j].char.endsWith('</>')) {
                this.evaluatingResultStr +=
                  '<span class="yl">' +
                  obj.result.details[i].snt_details[j].char.substring(
                    0,
                    obj.result.details[i].snt_details[j].char.length - 3
                  ) +
                  '</span>&nbsp;</>'
              } else {
                this.evaluatingResultStr +=
                  '<span class="yl">' +
                  obj.result.details[i].snt_details[j].char +
                  '</span>&nbsp;'
              }

              this.ylFlag = true
            } else if (
              obj.result.details[i].snt_details[j].score >= 0 &&
              obj.result.details[i].snt_details[j].score < 60
            ) {
              if (obj.result.details[i].snt_details[j].char.endsWith('</>')) {
                this.evaluatingResultStr +=
                  '<span class="no">' +
                  obj.result.details[i].snt_details[j].char.substring(
                    0,
                    obj.result.details[i].snt_details[j].char.length - 3
                  ) +
                  '</span>&nbsp;</>'
              } else {
                this.evaluatingResultStr +=
                  '<span class="no">' +
                  obj.result.details[i].snt_details[j].char +
                  '</span>&nbsp;'
              }
              this.noFlag = true
            } else if (
              obj.result.details[i].snt_details[j].dp_type != undefined &&
              obj.result.details[i].snt_details[j].dp_type == 2
            ) {
              this.cfFlag = true
              if (obj.result.details[i].snt_details[j].char.endsWith('</>')) {
                this.evaluatingResultStr +=
                  '<span class="cf">' +
                  obj.result.details[i].snt_details[j].char.substring(
                    0,
                    obj.result.details[i].snt_details[j].char.length - 3
                  ) +
                  '</span>&nbsp;</>'
              } else {
                this.evaluatingResultStr +=
                  '<span class="cf">' +
                  obj.result.details[i].snt_details[j].char +
                  '</span>&nbsp;'
              }
            } else if (
              obj.result.details[i].snt_details[j].score >= 60 &&
              obj.result.details[i].snt_details[j].score < 80
            ) {
              this.ybFlag = true
              if (obj.result.details[i].snt_details[j].char.endsWith('</>')) {
                this.evaluatingResultStr +=
                  '<span class="yb">' +
                  obj.result.details[i].snt_details[j].char.substring(
                    0,
                    obj.result.details[i].snt_details[j].char.length - 3
                  ) +
                  '</span>&nbsp;</>'
              } else {
                this.evaluatingResultStr +=
                  '<span class="yb">' +
                  obj.result.details[i].snt_details[j].char +
                  '</span>&nbsp;'
              }
            } else if (obj.result.details[i].snt_details[j].score >= 80) {
              this.goodFlag = true
              if (obj.result.details[i].snt_details[j].char.endsWith('</>')) {
                this.evaluatingResultStr +=
                  '<span class="good">' +
                  obj.result.details[i].snt_details[j].char.substring(
                    0,
                    obj.result.details[i].snt_details[j].char.length - 3
                  ) +
                  '</span>&nbsp;</>'
              } else {
                this.evaluatingResultStr +=
                  '<span class="good">' +
                  obj.result.details[i].snt_details[j].char +
                  '</span>&nbsp;'
              }
            }
          }
        }

        this.ldSpeed = Math.floor(this.ldSpeed / obj.result.details.length)
        this.evaluatingResultStr = this.regReplace(
          this.videoQuestionStemList.videoQuestionStemList[0]
            .questionStemContentCustom,
          this.evaluatingResultStr.split('</>')
        )
      }
    },
    evaluatingResultsOfzj(obj = {}) {
      if (obj.result == undefined) {
        this.isShowwz = false
      }
      this.evaluatingResultStr = ''
      if (obj.result != undefined) {
        for (var i = 0; i < obj.result.details.length; i++) {
          if (
            obj.result.details[i].dp_type != undefined &&
            obj.result.details[i].dp_type == 1
          ) {
            if (obj.result.details[i].char.endsWith('</>')) {
              this.evaluatingResultStr +=
                '<span class="yl">' +
                obj.result.details[i].char.substring(
                  0,
                  obj.result.details[i].char.length - 3
                ) +
                '</span>&nbsp;</>'
            } else {
              this.evaluatingResultStr +=
                '<span class="yl">' +
                obj.result.details[i].char +
                '</span>&nbsp;'
            }
            this.ylFlag = true
          } else if (
            obj.result.details[i].score >= 0 &&
            obj.result.details[i].score < 60
          ) {
            if (obj.result.details[i].char.endsWith('</>')) {
              this.evaluatingResultStr +=
                '<span class="no">' +
                obj.result.details[i].char.substring(
                  0,
                  obj.result.details[i].char.length - 3
                ) +
                '</span>&nbsp;</>'
            } else {
              this.evaluatingResultStr +=
                '<span class="no">' +
                obj.result.details[i].char +
                '</span>&nbsp;'
            }
            this.noFlag = true
          } else if (
            obj.result.details[i].dp_type != undefined &&
            obj.result.details[i].dp_type == 2
          ) {
            this.cfFlag = true
            if (obj.result.details[i].char.endsWith('</>')) {
              this.evaluatingResultStr +=
                '<span class="cf">' +
                obj.result.details[i].char.substring(
                  0,
                  obj.result.details[i].char.length - 3
                ) +
                '</span>&nbsp;</>'
            } else {
              this.evaluatingResultStr +=
                '<span class="cf">' +
                obj.result.details[i].char +
                '</span>&nbsp;'
            }
          } else if (
            obj.result.details[i].score >= 60 &&
            obj.result.details[i].score < 80
          ) {
            this.ybFlag = true
            if (obj.result.details[i].char.endsWith('</>')) {
              this.evaluatingResultStr +=
                '<span class="yb">' +
                obj.result.details[i].char.substring(
                  0,
                  obj.result.details[i].char.length - 3
                ) +
                '</span>&nbsp;</>'
            } else {
              this.evaluatingResultStr +=
                '<span class="yb">' +
                obj.result.details[i].char +
                '</span>&nbsp;'
            }
          } else if (obj.result.details[i].score >= 80) {
            this.goodFlag = true
            if (obj.result.details[i].char.endsWith('</>')) {
              this.evaluatingResultStr +=
                '<span class="good">' +
                obj.result.details[i].char.substring(
                  0,
                  obj.result.details[i].char.length - 3
                ) +
                '</span>&nbsp;</>'
            } else {
              this.evaluatingResultStr +=
                '<span class="good">' +
                obj.result.details[i].char +
                '</span>&nbsp;'
            }
          }
        }

        this.evaluatingResultStr = this.regReplace(
          this.videoQuestionStemList.videoQuestionStemList[this.selectItemType]
            .questionStemContentCustom,
          this.evaluatingResultStr.split('</>')
        )

        this.zjFlag = false
      } else {
        this.isShowwz = false
        this.zjFlag = true
        // this.evaluatingResultStr = this.videoQuestionStemList.videoQuestionStemList[
        //   this.selectItemType
        // ].questionStemContent
      }
    },
    regReplace(str, arr) {
      var reg = /<c>([^<\/]+)<\/c>/g
      var result, //最终输出结果
        out, //每次运行正则exec返回的匹配结果。
        index, //匹配项在字符串中位置
        length //匹配项长度

      result = str.split('') //将待匹配的字符串分开成数组，等待处理
      var k = -1
      while ((out = reg.exec(str))) {
        //当匹配成功返回out数组，如果没有匹配项或达到字符串末尾返回null
        k = k + 1
        if (k < arr.length) {
          length = out[0].length //匹配项长度
          for (var i = 0; i < length; i++) {
            //从开始匹配的位置，根据匹配项长度循环替换为*
            index = reg.lastIndex
            if (i == length - 1) {
              result.splice(index - length + i, 1, arr[k])
            } else {
              result.splice(index - length + i, 1, '')
            }
          }
        }
      }
      return result.join('') //返回结果
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.read-wrap {
  @include wh(1200px, 96%);
  margin: 0 auto;
  position: relative;
  .nav {
    overflow: auto;
    height: 60px;
    @include fj(flex-start);
    align-items: center;
    a,
    span {
      float: left;
      margin-left: 5px;
      @include sc(14px, #5e84ad);
    }
  }
  > div:nth-child(2) {
    @include wh(100%, 91%);
    @include fj();
    > div.infos {
      width: 80%;
      flex: auto;
      height: 100%;
      margin-left: 10px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      > div:nth-child(1) {
        @include wh(96%, auto);
        margin: 0 auto;
        flex: 0 0 50px;
        display: flex;
        align-items: center;
        > span {
          @include fj();
          align-items: center;
          i:nth-child(1) {
            @include sc(12px, #999);
          }
          i:nth-child(2) {
            @include sc(14px, #5e84ad);
          }
        }
        > span:nth-of-type(odd) {
          padding: 0px 15px;
          i:nth-child(2) {
            margin-left: 10px;
          }
        }
        > span:nth-child(1) {
          padding-left: 0;
        }
        > span:nth-of-type(even) {
          @include wh(1px, 13px);
          background: rgba(244, 244, 244, 1);
        }
      }
      > div:nth-child(2) {
        display: flex;
        flex: auto;
        @include wh(96%, 100%);
        margin: 0 auto;
        > div:nth-child(1) {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: scroll;
          padding-bottom: 5px;
          @include wh(auto, 98%);
          flex: 0 0 640px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          border-radius: 4px;
          .reading-stem {
            @include wh(100%, auto);
            padding-bottom: 20px;
            .stem-answer-infos {
              @include wh(100%, auto);
              margin-top: 10px;
              min-height: 60px;
              @include fj();
              > div:nth-child(1) {
                @include wh(auto, 24px);
                background: rgba(86, 172, 255, 1);
                border-radius: 0px 12px 12px 0px;
                text-align: center;
                line-height: 24px;
                @include sc(12px, #fff);
                flex: 0 0 44px;
              }
              .answer-infos {
                @include wh(auto, auto);
                flex: auto;
                margin-left: 10px;
                padding: 0 10px 10px;
                > p {
                  width: 100%;
                  @include sc(14px, #4e5f71);
                  line-height: 20px;
                }
              }
            }
            .answer-infos-type {
              @include wh(94%, auto);
              border-top: 1px solid #eee;
              padding-top: 10px;
              margin: 0 auto;
              .answer-infos-type-1 {
                @include wh(96%, auto);
                margin: 0 auto;
                > p {
                  @include fj();
                  flex-direction: column;

                  > span:nth-child(1) {
                    background: rgba(86, 172, 255, 1);
                    border-radius: 12px;
                    @include fj(center);
                    align-items: center;
                    @include sc(12px, #fff);
                  }
                  > span:nth-child(2) {
                    margin: 10px;
                    word-break: break-all;

                    @include sc(14px, #4e5f71);
                  }

                  span.good {
                    color: #13a99f !important;
                  }
                  span.no {
                    color: #fda157 !important;
                  }
                  span.yb {
                    color: #4e5f71 !important;
                  }
                  span.yl {
                    color: #ff6365 !important;
                  }
                  span.cf {
                    color: #1059ff !important;
                  }
                }
                > p:nth-child(1) {
                  span:nth-child(1) {
                    @include wh(66px, 24px);
                  }
                }
                > p:nth-child(2) {
                  > span:nth-child(1) {
                    @include wh(41px, 24px);
                  }
                }
              }
            }
          }
          .follow-up {
            @include wh(100%, auto);
            padding-bottom: 20px;
            .follow-up-infos {
              @include wh(100%, auto);
              margin-top: 10px;
              min-height: 60px;
              @include fj();
              > div:nth-child(1) {
                @include wh(auto, 24px);
                background: rgba(86, 172, 255, 1);
                border-radius: 0px 12px 12px 0px;
                text-align: center;
                line-height: 24px;
                @include sc(12px, #fff);
                flex: 0 0 44px;
              }
              > div:nth-child(2) {
                @include wh(auto, auto);
                flex: auto;
                margin-left: 10px;
                padding: 0 10px 10px;
                > p {
                  width: 100%;
                  @include sc(14px, #4e5f71);
                  line-height: 20px;
                }
              }
            }
            > div:nth-child(n + 2) {
              @include wh(94%, auto);
              @include fj();
              align-items: center;
              margin: 10px auto 0;
              cursor: pointer;
              .follow-up-answer-infos {
                @include wh(96%, auto);
                border: 1px solid #eee;
                border-radius: 8px;
                padding: 10px;
                > p {
                  @include fj();
                  flex-direction: column;

                  > span:nth-child(1) {
                    background: rgba(86, 172, 255, 1);
                    border-radius: 12px;
                    @include fj(center);
                    align-items: center;
                    @include sc(12px, #fff);
                  }
                  > span:nth-child(2) {
                    @include sc(14px, #4e5f71);
                  }
                  span.good {
                    color: #13a99f !important;
                  }
                  span.no {
                    color: #fda157 !important;
                  }
                  span.yb {
                    color: #4e5f71 !important;
                  }
                  span.yl {
                    color: #ff6365 !important;
                  }
                  span.cf {
                    color: #1059ff !important;
                  }
                }
                > p:nth-child(1) {
                  margin-bottom: 10px;
                  span:nth-child(1) {
                  }
                }
                > p:nth-child(2) {
                  span:nth-child(1) {
                  }
                }
              }
              > .follow-up-answer-infos.hover-p {
                border: 1px solid #1059ff;
              }
              > .follow-up-answer-infos .hover-span {
                color: #1059ff !important;
              }
              img {
                @include wh(20px, 29px);
              }
            }
          }
        }
        > div:nth-child(2) {
          height: 98%;
          flex: auto;
          margin-left: 20px;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          overflow: scroll;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          > div.yz {
            background: url(../../assets/img/publish/result_mark.png) no-repeat
              center;
            background-size: 100% 100%;
            @include wh(120px, 122px);
            @include fj(center);
            align-items: center;
            flex-direction: column;
            margin: 0 auto;
            > span {
              @include fj(center);
              flex-direction: column;
              align-items: center;
              margin-top: -20px;
              i:nth-child(1) {
                margin-top: 15px;
                @include sc(12px, #aaa);
                font-weight: bold;
              }
              i.score {
                margin-top: 5px;
                @include sc(36px, rgba(16, 89, 255, 1));
              }
              i.allscore {
                margin-top: 3px;
                font-weight: bold;
                @include sc(30px, #13a99f);
              }
            }
            img {
              margin: -10px -10px 0 0px;
              @include wh(56px, 21px);
            }
            img.all-score {
              margin-top: 0 !important;
            }
          }
          > div.wz {
            background: url(../../assets/img/publish/result_mark.png) no-repeat
              center;
            background-size: 100% 100%;
            @include wh(120px, 122px);
            margin: 10px auto 0;
            @include fj(center);
            align-items: center;
            flex-direction: column;
            > span {
              @include fj(center);
              flex-direction: column;
              align-items: center;
              margin-top: -30px;
              i:nth-child(1) {
                margin-top: 10px;
                @include sc(12px, #aaa);
                font-weight: bold;
              }
              i:nth-child(2) {
                margin-top: 10px;
                @include wh(44px, 44px);
                background: rgba(253, 161, 87, 1);
                border: 1px solid rgba(253, 161, 87, 1);
                border-radius: 50%;
                @include sc(14px, #fff);
                @include fj(center);
                align-items: center;
              }
            }
          }
          > div.pc {
            @include wh(320px, auto);
            max-height: 200px;
            padding: 10px 0;
            margin: 0 auto;
            word-break: break-all;
            overflow: scroll;
            @include sc(14px, #aaaaaa);
            line-height: 24px;
          }
          > div:nth-child(3) {
            @include wh(94%, auto);
            margin: 0 auto;
            border-bottom: 1px solid #eee;
          }
          > div.data-s {
            @include fj();
            @include wh(94%, auto);
            margin: 10px auto 0;
            padding: 0 30px 20px;
            border-bottom: 1px solid #eee;
            > div {
              @include wh(70px, auto);
              @include fj(flex-start);
              flex-direction: column;
              align-items: center;
              span.el-span-yz {
                @include wh(70px, 69px);
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(223, 223, 223, 1);
                box-shadow: 0px 8px 20px 0px rgba(186, 213, 238, 0.29);
                border-radius: 50%;
                @include fj(center);
                align-items: center;
                margin-top: 10px;
                @include sc(32px, #fda157);
              }
              span.el-span-wz {
                @include wh(70px, 69px);
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(223, 223, 223, 1);
                box-shadow: 0px 8px 20px 0px rgba(186, 213, 238, 0.29);
                border-radius: 50%;
                @include fj(center);
                align-items: center;
                margin-top: 10px;
                @include sc(32px, #4e5f71);
              }
            }
            > div:nth-child(1) {
              span.yl {
                @include fj();
                flex-direction: column;
                margin-top: 10px;
                i:nth-child(1) {
                  @include sc(12px, #aaa);
                }
                i:nth-child(2) {
                  margin-top: 2px;
                  @include wh(44px, 10px);
                  background: rgba(255, 99, 101, 1);
                }
              }
              span.cf {
                @include fj();
                flex-direction: column;
                margin-top: 10px;
                i:nth-child(1) {
                  @include sc(12px, #aaa);
                }
                i:nth-child(2) {
                  margin-top: 2px;
                  @include wh(44px, 10px);
                  background: rgba(16, 89, 255, 1);
                }
              }
            }
            > div:nth-child(2) {
              @include wh(auto, auto);
              span:nth-of-type(n + 3) {
                @include fj();
                flex-direction: column;
                align-items: center;
                margin-top: 10px;
                i:nth-child(1) {
                  @include sc(12px, #aaa);
                }
                i:nth-child(2) {
                  @include fj();
                  align-items: center;
                  i:nth-child(1) {
                    font-size: 12px;
                    margin-right: 5px;
                  }
                  i:nth-child(2) {
                    @include wh(44px, 10px);
                  }
                }
              }
              span.bbj {
                i:nth-child(2) {
                  i:nth-child(1) {
                    color: #fda157;
                  }
                  i:nth-child(2) {
                    background: rgba(253, 161, 87, 1);
                  }
                }
              }
              span.yb {
                i:nth-child(2) {
                  i:nth-child(1) {
                    color: #4e5f71;
                    margin-left: 14px;
                  }
                  i:nth-child(2) {
                    background: rgba(78, 95, 113, 1);
                  }
                }
              }
              span.good {
                i:nth-child(2) {
                  i:nth-child(1) {
                    margin-left: 26px;
                    color: #13a99f;
                  }
                  i:nth-child(2) {
                    background: rgba(19, 169, 159, 1);
                  }
                }
              }
            }
            > div:nth-child(3) {
              span:nth-child(3) {
                margin-top: 10px;
                @include fj();
                flex-direction: column;
                align-items: center;
              }
            }
          }
          .audio-play {
            @include fj();
            flex-direction: column;
            align-items: center;
            padding-bottom: 20px;
            > span {
              @include fj();
              margin-top: 10px;
              align-items: center;
              i:nth-child(1) {
                @include sc(18px, #1059ff);
                margin: 0 5px;
              }
              i:nth-child(2) {
                @include sc(14px, #596878);
              }
            }
            .audio-btn {
              @include fj(center);
              width: 80%;
              margin: 20px auto 0;
              > div {
                @include fj();
                flex-direction: column;
                align-items: center;
                height: 82px;
              }
              .prve-btn {
                margin: 6px 10px 0 0;
                img {
                  @include wh(60px, 60px);
                }
              }
              .next-btn {
                margin: 6px 0 0 10px;
                img {
                  @include wh(60px, 60px);
                }
              }
              .play-btn {
                @include wh(128px, auto);
                p {
                  @include fj();
                  align-items: center;
                }
                span {
                  @include fj();
                  align-items: flex-end;
                  i {
                    background: #56acff;
                    margin-left: 2px;
                  }
                  i:nth-child(1) {
                    @include wh(2px, 12px);
                    -webkit-animation: 1s 0.1s living linear infinite backwards
                      normal;
                    animation: 1s 0.1s living linear infinite backwards normal;
                    -webkit-animation-delay: -1.1s;
                  }
                  i:nth-child(2) {
                    @include wh(2px, 12px);
                    -webkit-animation: 1s 0.3s living linear infinite backwards
                      normal;
                    animation: 1s 0.3s living linear infinite backwards normal;
                    -webkit-animation-delay: -1.3s;
                  }
                  i:nth-child(3) {
                    @include wh(2px, 12px);
                    -webkit-animation: 1s 0.6s living linear infinite backwards
                      normal;
                    animation: 1s 0.6s living linear infinite backwards normal;
                    -webkit-animation-delay: -1.6s;
                  }
                  i:nth-child(4) {
                    @include wh(2px, 10px);
                    -webkit-animation: 1s 0.6s living linear infinite backwards
                      normal;
                    animation: 1s 0.6s living linear infinite backwards normal;
                    -webkit-animation-delay: -1.8s;
                  }
                }
                span:nth-child(2) {
                  margin: 0 5px;
                }
                img {
                  @include wh(70px, 70px);
                }
              }
            }
          }
        }
      }
    }
  }
  > div.select-student {
    position: absolute;
    right: -80px;
    bottom: 40px;
    @include fj();
    flex-direction: column;
    align-items: center;
    span {
      @include wh(46px, auto);
      padding: 20px 20px;
      @include fj(center);
      align-content: center;
      background: rgba(239, 144, 81, 0);
      border: 1px solid rgba(16, 89, 255, 1);
      box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
      border-radius: 23px;
      @include sc(14px, #1059ff);
      font-weight: bold;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
  @-webkit-keyframes living {
    0% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 0 10px;
      transform-origin: 0 10px;
    }
    50% {
      -webkit-transform: scaleY(0.3);
      transform: scaleY(0.3);
      -webkit-transform-origin: 0 10px;
      transform-origin: 0 10px;
    }
    100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 0 10px;
      transform-origin: 0 10px;
    }
  }
  @keyframes living {
    0% {
      -webkit-transform: scaleY(1);
      -ms-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 0 10px;
      -ms-transform-origin: 0 10px;
      transform-origin: 0 10px;
    }
    50% {
      -webkit-transform: scaleY(0.3);
      -ms-transform: scaleY(0.3);
      transform: scaleY(0.3);
      -webkit-transform-origin: 0 10px;
      -ms-transform-origin: 0 10px;
      transform-origin: 0 10px;
    }
    100% {
      -webkit-transform: scaleY(1);
      -ms-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 0 10px;
      -ms-transform-origin: 0 10px;
      transform-origin: 0 10px;
    }
  }
}
</style>
