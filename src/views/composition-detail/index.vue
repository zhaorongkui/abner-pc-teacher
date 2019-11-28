<template>
  <div
    style="width: 1180px;overflow: visible;height: 100%;margin: 0 auto;position: relative;scrollbar-width: none;"
  >
    <template v-if="!isScore">
      <div
        v-if="!isTeacherReviewOK"
        class="float_button"
        @click="startScore"
        style="top: 300px;"
      >
        <img src="../../assets/img/grading-assignment/write.png" />
        <span>开始评分</span>
      </div>
      <div
        v-if="isMarking && !isTeacherReviewOK"
        class="float_button"
        @click="finishMark"
        style="top: 387px;"
      >
        <span>完成<br />批阅</span>
      </div>
      <div
        v-if="isTeacherReviewOK && myVoice"
        class="float_button"
        @click="playAudio"
        style="top: 300px;height: auto;"
      >
        <audio
          v-show="false"
          ref="myVoice"
          id="isMyVoicePlay"
          :src="myVoice"
        ></audio>
        <img
          v-if="!isMyVoicePlay"
          src="../../assets/img/grading-assignment/start.png"
          style="width: 44px;height: 44px;"
        />
        <img
          v-else
          src="../../assets/img/play/play1.gif"
          style="width: 44px;height: 44px;"
        />
        <span>我的评语</span>
      </div>
    </template>
    <div
      style="width: 1180px;margin: 0 auto;position: relative;height: 100%;overflow: auto;scrollbar-width: none;"
    >
      <div style="margin: 26px 3px 18px;">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <router-link to="/work">作业</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="/work-grading-assignment">学生列表</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item
            >作文详情（{{ pageData.studentName }}）</a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
      <FullScreen
        v-if="showFullScreen"
        @toParentsClose="closeFullScreen"
        :getImageSrc="imageSrc"
        :imgLists="imgLists1"
      ></FullScreen>
      <div class="all_detail_content">
        <span class="title">标题</span>
        <!-- <h4 class="composition_title" v-if="data.compositionType === 1 || data.compositionType === 2">{{data.compositionTitle}}</h4>
        <h4 class="composition_title" v-else>材料作文</h4> -->
        <h4 class="composition_title">{{ data.compositionTitle }}</h4>
        <hr style="border: 0;border-top: 1px solid #eee;" />
        <div class="grade">
          <div>
            <span>作业要求</span
            ><span>{{ data.compositionType | getType }}</span>
          </div>
          <div>
            <span>{{ data.compositionRequire | getRequire }}</span>
          </div>
          <div>
            <span style="margin: 0;"
              >作文字数不少于{{ data.compositionWordNum }}</span
            >
          </div>
          <div>
            <span>满分50</span>
          </div>
          <div>
            <span style="margin: 0;">班级</span
            ><span style="border: 0;">{{ data.gradeClassName }}</span>
          </div>
          <div class="score_area" v-if="!isTeacherReviewOK">
            <p>互评平均分</p>
            <template v-if="!isMarking">
              <h3 :style="{ color: '#FDA158', fontSize: '20px' }">待批阅</h3>
              <img src="../../assets/img/grading-assignment/not_mark.png" />
            </template>
            <template v-else>
              <h3 :style="{ color: average === 50 ? '#13a99f' : '#0710A0' }">
                {{ average }}
              </h3>
              <img
                v-if="average === 50"
                src="../../assets/img/grading-assignment/over_score.png"
              />
              <img
                v-else
                src="../../assets/img/grading-assignment/other_score.png"
              />
            </template>
          </div>
          <div class="score_area" v-else>
            <p>我的评分</p>
            <h3
              :style="{
                color: Number(teacherScore) === 50 ? '#13a99f' : '#0710A0'
              }"
            >
              {{ teacherScore }}
            </h3>
            <img
              v-if="Number(teacherScore) === 50"
              src="../../assets/img/grading-assignment/over_score.png"
            />
            <img
              v-else
              src="../../assets/img/grading-assignment/other_score.png"
            />
          </div>
        </div>
        <hr v-show="!open" style="border: 0;border-top: 1px solid #eee;" />
        <div class="open_composition_detail" v-show="!open">
          <p>写作分析指导</p>
          <div>
            <audio
              v-show="false"
              ref="userVoice"
              id="userVoicePlay"
              preload="auto"
              :src="data.compositionConductVoiceStr"
            ></audio>
            <div style="width: 360px;">
              <a-button
                type="primary"
                class="play_audio"
                @click="handlePlayClick"
                v-if="data.compositionConductVoiceStr"
              >
                <div>
                  <span class="word">点击播放</span>
                  <img
                    v-show="!isPlay"
                    style="width: 20px;height: 18px;margin-left: 11px;"
                    src="../../assets/img/publish/audio_horn.png"
                  />
                  <img
                    v-show="isPlay"
                    style="width: 20px;height: 18px;margin-left: 11px;"
                    src="../../assets/img/play/play.gif"
                  />
                </div>
              </a-button>
              <a-button
                type="primary"
                class="play_audio mute_btn"
                disabled
                v-else
              >
                <div>
                  <span class="word">暂无录音</span>
                  <img
                    style="width: 20px;height: 18px;margin-left: 11px;"
                    src="../../assets/img/publish/mute.png"
                  />
                </div>
              </a-button>
              <el-input
                type="textarea"
                placeholder="写作指导"
                class="composition_textarea"
                :value="data.compositionConductText"
                readonly
              >
              </el-input>
            </div>
            <div class="composition_pic">
              <p>阅读材料</p>
              <img
                @click="handleCarouselClick1(data.compositionMaterialImgStr)"
                v-if="data.compositionMaterialImgStr"
                :src="data.compositionMaterialImgStr"
              />
              <img
                v-else
                :class="'moren'"
                src="../../assets/img/grading-assignment/moren.png"
              />
            </div>
            <div class="composition_pic">
              <p>范文提供</p>
              <img
                @click="handleCarouselClick1(data.compositionModelImgStr)"
                v-if="data.compositionModelImgStr"
                :src="data.compositionModelImgStr"
              />
              <img
                v-else
                :class="'moren'"
                src="../../assets/img/grading-assignment/moren.png"
              />
            </div>
          </div>
        </div>
        <div class="open_area" @click="open = !open">
          <img v-if="open" src="../../assets/img/grading-assignment/open.png" />
          <img v-else src="../../assets/img/grading-assignment/close.png" />
          <span v-if="open">展开</span>
          <span v-else>收起</span>
        </div>
      </div>
      <div class="composition_content clearfix">
        <div style="position: relative;">
          <a-carousel
            :dots="false"
            arrows
            v-if="slideLists && slideLists.length"
            :afterChange="handleCarouselChange"
            :beforeChange="handleBeforeChange"
            style="width: 576px;height: 446px;"
          >
            <button
              :disabled="prevDisabled"
              :style="{ cursor: prevDisabled ? 'not-allowed' : 'pointer' }"
              slot="prevArrow"
              slot-scope="props"
              class="custom-slick-arrow custom_arrow_left"
            >
              <a-icon
                type="caret-left"
                style="font-size: 16px;"
                :style="{
                  color: prevDisabled ? 'rgba(0, 0, 0, .3)' : 'rgba(0, 0, 0, 1)'
                }"
              />
            </button>
            <button
              :disabled="nextDisabled"
              :style="{ cursor: nextDisabled ? 'not-allowed' : 'pointer' }"
              slot="nextArrow"
              slot-scope="props"
              class="custom-slick-arrow custom_arrow_right"
            >
              <a-icon
                type="caret-right"
                style="font-size: 16px;"
                :style="{
                  color: nextDisabled ? 'rgba(0, 0, 0, .3)' : 'rgba(0, 0, 0, 1)'
                }"
              />
            </button>
            <div
              v-for="(slide, index) in slideLists"
              :key="slide.fileSort"
              @click="handleCarouselClick(slide)"
              style="backgroud: #000;color: #fff;cursor: pointer;position: relative;width: 576px;height: 446px;"
            >
              <img
                :id="`slide${index}`"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
                :src="slide.answerFileUrlStr"
              />
            </div>
          </a-carousel>
          <div class="slide_index">
            <span>{{ nowPage }}</span
            >/{{ slideLists.length }}
          </div>
        </div>
        <div>
          <h4 class="eval_title">作文评语及修改建议</h4>
          <img
            class="appeal_img"
            v-if="appeal === 1"
            src="../../assets/img/grading-assignment/appeal.png"
          />
          <img
            class="appeal_img"
            v-if="appeal === 3"
            src="../../assets/img/grading-assignment/appealOK.png"
          />
          <ul class="std_eval_list">
            <li v-for="oneEval in evalLists">
              <div class="user_eval_list">
                <div>
                  <img
                    v-if="oneEval.reviewUserName === '我'"
                    src="../../assets/img/grading-assignment/name.png"
                  />
                  <img
                    v-else
                    src="../../assets/img/grading-assignment/name1.png"
                  />
                  <p v-if="oneEval.reviewUserName">
                    {{ oneEval.reviewUserName }}
                  </p>
                  <p v-else-if="oneEval.studentName">
                    {{ oneEval.studentName }}
                  </p>
                </div>
                <div class="show_score">
                  <p
                    v-if="
                      oneEval.teacherCommentContent &&
                        oneEval.reviewUserType === 2
                    "
                    class="eval_content"
                  >
                    {{ oneEval.teacherCommentContent | cutDollar }}
                  </p>
                  <p
                    v-else-if="
                      oneEval.studentCommentContent &&
                        oneEval.reviewUserType !== 2
                    "
                    class="eval_content"
                  >
                    {{ oneEval.studentCommentContent | cutDollar }}
                  </p>
                  <p
                    v-else-if="oneEval.reviewUserType === 2"
                    class="eval_content"
                  >
                    没有填写评语及修改建议
                  </p>
                  <p
                    v-else-if="oneEval.reviewUserType !== 2"
                    class="eval_content"
                  >
                    该学生还没有写评语及修改建议
                  </p>
                  <p
                    v-if="
                      !oneEval.reviewResult ||
                        (oneEval.reviewUserType === 2 && !teacherScore)
                    "
                    class="no_comment"
                  >
                    未评
                  </p>
                  <div v-else-if="oneEval.reviewUserType === 2 && teacherScore">
                    <p
                      :class="
                        Number(teacherScore) === 50 ? 'fullScore' : 'lowScore'
                      "
                    >
                      {{ teacherScore }}
                    </p>
                    <p>我的评分</p>
                  </div>
                  <div
                    v-else-if="oneEval.reviewUserType === 2 && !teacherScore"
                  >
                    <p
                      :class="
                        Number(oneEval.reviewResult) === 50
                          ? 'fullScore'
                          : 'lowScore'
                      "
                    >
                      {{ oneEval.reviewResult }}
                    </p>
                    <p>我的评分</p>
                  </div>
                  <div v-else>
                    <p
                      :class="
                        Number(oneEval.reviewResult) === 50
                          ? 'fullScore'
                          : 'lowScore'
                      "
                    >
                      {{ oneEval.reviewResult }}
                    </p>
                    <p>互评分数</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import FullScreen from './components/fullScreen'
export default {
  name: 'composition-detail',
  data() {
    return {
      pageData: {
        studentName: ''
      },
      nowPage: 1,
      open: true,
      isScore: false,
      isMarking: false,
      showFullScreen: false,
      isTeacherReviewOK: false,
      isMyVoicePlay: false,
      myVoiceFlag: false,
      playFlag: false,
      isPlay: false,
      prevDisabled: true,
      nextDisabled: false,
      workbookPageQuestionnumList: [],
      appeal: 0,
      average: 0,
      fullId: 0,
      teacherScore: 0,
      fullscreen: null,
      count: 0,
      type: 0,
      data: {
        compositionConductText: '',
        compositionConductVoiceStr: '',
        compositionMaterialImgStr: '',
        compositionModelImgStr: '',
        compositionRequire: '',
        compositionTitle: '',
        compositionType: null,
        compositionWordNum: 0,
        gradeClassName: '',
        homeworkEndtime: null,
        homeworkQuestionId: 0,
        homeworkStarttime: null
      },
      slideLists: [],
      evalLists: [],
      imgLists1: [],
      imageSrc: '',
      myVoice: ''
    }
  },
  components: {
    FullScreen
  },
  filters: {
    getType(val) {
      switch (Number(val)) {
        case 1:
          return '命题作文'
          break
        case 2:
          return '半命题作文'
          break
        case 3:
          return '材料作文'
          break
        default:
          return '命题作文'
          break
      }
    },
    getRequire(val) {
      switch (Number(val)) {
        case 1:
          return '文体不限'
          break
        case 2:
          return '记叙文'
          break
        case 3:
          return '议论文'
          break
        default:
          return '文体不限'
          break
      }
    },
    cutDollar(val) {
      if (val.indexOf('$') === -1) {
        return val
      }
      return val.split('$').join('')
    },
    getDayFormat(val) {
      let time1 = new Date(val)
      let month = time1.getMonth() + 1
      let day = time1.getDate()
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      return `${month}月${day}日`
    }
  },
  mounted() {
    // console.log(this.$route.params)
    if (this.$route.params.record) {
      this.pageData = this.$route.params.record
      this.appeal = this.pageData.homeworkAppealType
      // this.fetchStudentCompositionTitle();
      this.fetchTeacherData()
      this.fetchStudentData()
      this.$nextTick(() => {
        let userVoice = document.getElementById('userVoicePlay')
        userVoice.addEventListener('ended', () => {
          this.playFlag = false
          this.isPlay = false
        })
        userVoice.addEventListener('pause', () => {
          this.playFlag = false
          this.isPlay = false
        })
      })
    } else {
      localforage.getItem('compositionStdInfo').then(res => {
        // console.log(res)
        localforage.getItem('workListItem').then(response => {
          this.pageData = Object.assign(res, response)
          this.appeal = this.pageData.homeworkAppealType
          // this.fetchStudentCompositionTitle();
          this.fetchTeacherData()
          this.fetchStudentData()
          this.$nextTick(() => {
            let userVoice = document.getElementById('userVoicePlay')
            userVoice.addEventListener('ended', () => {
              this.playFlag = false
              this.isPlay = false
            })
            userVoice.addEventListener('pause', () => {
              this.playFlag = false
              this.isPlay = false
            })
          })
        })
      })
    }
  },
  methods: {
    fetchTeacherData() {
      // 获取老师发布的作文要求
      this.$http
        .get('/api/teacher/homework/compositionInfoReview', {
          params: {
            homeworkId: this.pageData.homeworkId,
            studentId: this.pageData.studentInfoId
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.flag === 1) {
            this.data = res.data.infos
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // fetchStudentCompositionTitle() {
    //   // 获取老师发布的作文要求
    //   this.$http.get('/api/student/homework/composition/group', {
    //     params: {
    //       homeworkId: this.pageData.homeworkId,
    //       studentInfoId: this.pageData.studentInfoId
    //     }
    //   }).then(res => {
    //     console.log(res);
    //     if(res.data.flag === 1) {
    //       //
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    fetchStudentData() {
      // 获取学生的作文详情
      this.$http
        .get('/api/student/homework/composition/info', {
          params: {
            homeworkId: this.pageData.homeworkId,
            studentInfoId: this.pageData.studentInfoId
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.infos) {
            let composition = { ...res.data.infos }
            let review = composition.homeworkStudentAnswerCompositionReview
            let group = composition.homeworkGroupStudentList
            let slide = composition.studentHomeworkAnswerFileList
            if (slide && slide.length) {
              this.slideLists.splice(0, this.slideLists.length, ...slide)
              // this.$nextTick(() => {
              //   // console.log(this.$refs.slide0.style)
              //   console.log(document.querySelector('#slide0').style);
              // })
            }
            if (group && group.length) {
              if (review && review.length) {
                group.map(val => {
                  review.map(value => {
                    if (val.studentInfoId === value.reviewUserId) {
                      this.isMarking = true
                      val = Object.assign(val, value)
                    }
                  })
                })
                let all = 0
                let num = 0
                review.map(val => {
                  if (val.reviewResult) {
                    all += Number(val.reviewResult)
                    num++
                  }
                })
                this.average = Math.round(all / num)
                review.map(val => {
                  if (val.reviewUserType === 2) {
                    this.isTeacherReviewOK = true
                    if (val.reviewResult) {
                      this.teacherScore = val.reviewResult
                    } else {
                      this.teacherScore = this.average
                    }
                    let teacher = { ...val }
                    teacher.reviewUserName = '我'
                    if (teacher.reviewVoiceUrl) {
                      this.myVoice = teacher.reviewVoiceUrl
                      this.isMyVoicePlay = false
                      this.$nextTick(() => {
                        let voice = document.getElementById('isMyVoicePlay')
                        voice.addEventListener('ended', () => {
                          this.myVoiceFlag = false
                          this.isMyVoicePlay = false
                        })
                        voice.addEventListener('pause', () => {
                          this.myVoiceFlag = false
                          this.isMyVoicePlay = false
                        })
                      })
                    }
                    group.unshift(teacher)
                  }
                })
                this.evalLists.splice(0, this.evalLists.length, ...group)
                // console.log(group)
                let teacherId = this.$store.state.userInfo.teacherId
              } else {
                this.isMarking = false
                this.isTeacherReviewOK = false
                this.average = 0
                this.teacherScore = 0
                this.evalLists.splice(0, this.evalLists.length, ...group)
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 跑马灯的下边下标
    handleCarouselChange(current) {
      this.nowPage = current + 1
    },
    //
    handleBeforeChange(from, to) {
      if (to === this.slideLists.length - 1) {
        this.prevDisabled = false
        this.nextDisabled = true
      } else if (to === 0) {
        this.prevDisabled = true
        this.nextDisabled = false
      } else {
        this.prevDisabled = false
        this.nextDisabled = false
      }
    },
    // 跑马灯点击事件
    handleCarouselClick(slide) {
      this.imageSrc = slide.answerFileUrlStr
      this.imgLists1 = [...this.slideLists]
      this.showFullScreen = true
    },
    // 老师图片素材范文点击事件
    handleCarouselClick1(slide) {
      this.imageSrc = slide
      this.showFullScreen = true
    },
    // 播放老师的语音
    handlePlayClick() {
      if (this.playFlag) {
        this.$refs.userVoice.pause()
        this.$refs.userVoice.currentTime = 0
        return false
      }
      this.$refs.userVoice.play()
      this.isPlay = true
      this.playFlag = true
    },
    // 开始评分
    startScore() {
      this.pageData.slideLists = this.slideLists
      localforage.setItem('compositionStdInfo', this.pageData).then(() => {
        this.$router.push({
          name: 'grading-mark',
          params: { record: this.pageData }
        })
      })
    },
    // 完成批阅
    finishMark() {
      this.$http
        .post('/api/teacher/homework/compositionReview', {
          requestParam: JSON.stringify({
            answerReview: {
              // chapterScore:this.numThree, //篇章得分	number	                如是完成批阅此字段可不传
              // contentScore:this.numOne,   //内容得分	number	                如是完成批阅此字段可不传
              // languageScore:this.numTwo,  //语言得分	number	                如是完成批阅此字段可不传
              // reviewResult:this.score,    //批阅得分（计算之后的分数）	number	  如是完成批阅此字段可不传
              //reviewVoice	              //批阅语音	string	                  如是完成批阅此字段可不传(非必传)
              //teacherCommentContent:    s//老师评论	string	                  如是完成批阅此字段可不传非必传
              // writeScore:this.lastnum	    //书写得分	number	              如是完成批阅此字段可不传
              //studentCommentContent	      //评论内容	string	多个用$分割（学生批阅不需传此字段）   非必传
              //studentCommentId	          //评论内容id	number	多个用,分割（学生批阅不需传此字段） 非必传

              reviewUserId: this.$store.state.userInfo.teacherId, //批阅人id	number	必传
              reviewUserName: this.$store.state.userInfo.teacherName, //批阅人姓名	string	必传
              reviewUserType: 2, //批阅人类型	number	1 学生 2 老师
              studentAnswerId: this.pageData.studentAnswerId //学生答案id	number	必传
            },
            homeworkId: this.pageData.homeworkId, //作业id	number	必传
            homeworkStudentId: this.pageData.homeworkStudentId, //作业学生id	number	必传
            studentInfoId: this.pageData.studentInfoId, //被批作业的学生id	number	必传
            ifDone: 1 //是否完成批阅	number	1直接点击完成批阅2老师评分（学生评分不传此对象）
          })
        })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            this.$message.success('批阅完成！')
            this.fetchTeacherData()
            this.fetchStudentData()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    playAudio() {
      if (this.myVoiceFlag) {
        this.$refs.myVoice.pause()
        this.$refs.myVoice.currentTime = 0
        this.myVoiceFlag = false
        this.isMyVoicePlay = false
        return false
      }
      this.$refs.myVoice.play()
      this.myVoiceFlag = true
      this.isMyVoicePlay = true
    },
    closeFullScreen(val) {
      this.showFullScreen = val
      this.imgLists1.splice(0, this.imgLists1.length)
    }
    // nextBtn() {
    //   this.pageIndex++
    //   for (
    //     var i = this.pageIndex;
    //     i < this.workbookPageInfoListRefactor.length;
    //     i++
    //   ) {
    //     if (
    //       this.workbookPageInfoListRefactor[i].workbookPageQuestionnum === 0
    //     ) {
    //       this.pageIndex += 1
    //     } else {
    //       break
    //     }
    //   }
    //   if (this.pageIndex > this.workbookPageInfoListRefactor.length - 1) {
    //     this.fullscreen = false //全屏展示的控制无限循环
    //   } else {
    //     this.fullscreen = true //全屏展示的控制无限循环
    //   }
    //   if (this.pageIndex >= this.workbookPageInfoListRefactor.length - 1) {
    //     this.pageIndex = this.workbookPageInfoListRefactor.length - 1
    //   }
    //   this.workbookPageInfoListRefactor.forEach((item, index) => {
    //     if (index === this.pageIndex) {
    //       this.pageNumIndex = item.workbookPage
    //     }
    //   })
    //   if (this.pageIndex >= 15 && this.count < this.pageLength - 1) {
    //     this.fullscreen = true
    //     this.count++
    //     this.pageIndex = 0
    //   }
    //   this.workbookPageInfoListRefactor = this.group(
    //     this.workbookPageInfoList,
    //     16
    //   )[this.count]

    //   if (this.currentWorkbookChapterParentCode !== '') {
    //     this.isSelectAll(this.currentWorkbookChapterParentCode)
    //   } else {
    //     this.isSelectAll(this.currentWorkbookChapterChildCode)
    //   }
    // },
    // prveBtn() {
    //   if (this.count == 0) {
    //     for (let i = 0; i < this.workbookPageInfoListRefactor.length - 1; i++) {
    //       if (
    //         this.workbookPageInfoListRefactor[i].workbookPageQuestionnum != 0
    //       ) {
    //         var index = i
    //         if (this.pageIndex === index) {
    //           this.type = 3
    //           return false
    //         }
    //         break
    //       }
    //     }
    //   }
    //   this.pageIndex--
    //   if (this.pageIndex < 0) {
    //     this.pageIndex = 0
    //     if (this.count > 0) {
    //       this.count--
    //       this.pageIndex = 0
    //       if (this.count === 0) {
    //         this.count = 0
    //       }
    //       this.workbookPageInfoListRefactor = this.group(
    //         this.workbookPageInfoList,
    //         16
    //       )[this.count]
    //       for (
    //         var i = this.workbookPageInfoListRefactor.length - 1;
    //         i > 0;
    //         i--
    //       ) {
    //         if (
    //           this.workbookPageInfoListRefactor[i].workbookPageQuestionnum != 0
    //         ) {
    //           this.pageIndex = i
    //           break
    //         }
    //       }
    //     }
    //   } else {
    //     for (
    //       let i = this.pageIndex;
    //       i >=
    //       this.workbookPageInfoListRefactor.length -
    //         (this.workbookPageInfoListRefactor.length - this.pageIndex);
    //       i--
    //     ) {
    //       if (
    //         this.workbookPageInfoListRefactor[i].workbookPageQuestionnum === 0
    //       ) {
    //         this.pageIndex--
    //       } else {
    //         break
    //       }
    //     }
    //   }
    //   if (this.count == 0 && this.pageIndex < 0) {
    //     this.type = 3
    //   }
    //   this.workbookPageInfoListRefactor.forEach((item, index) => {
    //     if (index === this.pageIndex) {
    //       this.pageNumIndex = item.workbookPage
    //     }
    //   })
    //   if (this.currentWorkbookChapterParentCode !== '') {
    //     this.isSelectAll(this.currentWorkbookChapterParentCode)
    //   } else {
    //     this.isSelectAll(this.currentWorkbookChapterChildCode)
    //   }
    // },
  }
}
</script>

<style lang="scss" scoped>
.grade {
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
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
</style>

<style scoped>
.all_detail_content {
  scrollbar-width: none;
  box-shadow: rgb(186, 213, 238) 0px 2px 10px;
  border-radius: 4px;
  padding: 20px 40px;
  position: relative;
  background: #fff;
}
.title {
  position: absolute;
  left: 0;
  display: inline-block;
  width: 44px;
  height: 24px;
  background: #56acff;
  color: #fff;
  line-height: 24px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  font-size: 12px;
  text-align: center;
}
.composition_title {
  text-align: center;
  font-size: 16px;
  color: #4e5f71;
  margin-bottom: 20px;
}
.score_area {
  width: 82px;
  height: 98px;
  position: absolute;
  right: 18px;
  top: 0;
  border: 1px solid #e9e9e9;
  box-shadow: 0 2px 8px rgba(186, 213, 238, 0.29);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
  text-align: center;
  background: #fff;
}
.score_area p {
  font-size: 12px;
  color: #aaa;
  line-height: 18px;
  margin-top: 15px;
}
.score_area h3 {
  font-weight: 600;
  font-size: 30px;
  color: #0710a0;
  line-height: 45px;
  margin-top: -5px;
}
.score_area img {
  width: 54px;
  height: 21px;
  margin-top: -35px;
  margin-left: 15px;
}
.open_composition_detail {
  margin-left: -22px;
  margin-top: 20px;
  margin-right: -22px;
}
.open_composition_detail > p {
  width: 90px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #ffb463;
  color: #f4781e;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
}
.open_composition_detail > div {
  display: flex;
  margin-top: 8px;
  justify-content: center;
}
.composition_pic {
  height: 140px;
  border-radius: 6px;
  border: 1px solid #dedede;
  margin-left: 20px;
  width: 370px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.composition_pic p {
  width: 60px;
  height: 24px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-left: 20px;
  border: 1px solid #56acff;
  color: #56acff;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  position: absolute;
  left: -23px;
  top: 15px;
  background: #fff;
}
.composition_pic img {
  width: 100%;
  height: 100%;
}
.composition_pic img.moren {
  width: 61px;
  height: 61px;
}
.composition_content {
  margin-top: 11px;
  height: 500px;
  margin-bottom: 20px;
}
.composition_content > div:first-child {
  width: 620px;
  height: 490px;
  float: left;
  box-shadow: 0 2px 10px #bad5ee;
  padding: 22px;
  background: #fff;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
}
.composition_content > div:last-child {
  width: 550px;
  height: 490px;
  float: right;
  box-shadow: 0 2px 10px #bad5ee;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  position: relative;
}
.slide_index {
  width: 48px;
  height: 34px;
  background: #fff;
  position: absolute;
  bottom: 16px;
  left: 55px;
  text-align: center;
  line-height: 36px;
  font-size: 17px;
  color: #838383;
  border: 1px solid #dfdfdf;
  box-shadow: 0 4px 4px rgba(186, 213, 238, 0.29);
}
.slide_index span {
  color: #339bff;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
}
.ant-carousel >>> .custom-slick-arrow {
  width: 34px;
  height: 34px;
  position: absolute;
  bottom: 0;
  z-index: 88;
  text-align: center;
  background: #fff;
  line-height: 46px;
  display: block;
  border: 1px solid #dfdfdf;
  box-shadow: -4px 4px 4px rgba(186, 213, 238, 0.29);
}
.ant-carousel >>> .custom_arrow_left {
  left: 0;
  top: 428px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.ant-carousel >>> .custom_arrow_right {
  left: 80px;
  top: 428px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  width: 100%;
}
.eval_title {
  width: 154px;
  height: 24px;
  background: #ffb463;
  color: #fff;
  border-radius: 12px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  margin: 0 auto;
}
.std_eval_list {
  height: 402px;
  margin: 20px auto;
  overflow-y: auto;
}
.std_eval_list li {
  width: 100%;
  margin-top: 10px;
  min-height: 100px;
}
.std_eval_list li:first-child {
  margin-top: 0;
}
.user_eval_list {
  position: relative;
  padding: 31px 32px 24px 22px;
  border-radius: 6px;
  border: 1px solid #dedede;
  left: 2px;
  width: 508px;
}
.user_eval_list > div:first-child {
  width: 68px;
  height: 28px;
  position: absolute;
  left: -3px;
  top: 2px;
}
.user_eval_list > div:first-child img {
  width: 68px;
  height: 28px;
}
.user_eval_list > div:first-child p {
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 50%;
  margin-left: 10px;
  margin-top: -9px;
  width: 48px;
  text-align: center;
}
.open_area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  margin: 20px auto 0;
  cursor: pointer;
}
.open_area img {
  width: 14px;
  height: 14px;
}
.open_area span {
  margin-left: 10px;
}
.show_score {
  display: flex;
  justify-content: center;
  align-items: center;
}
.show_score .eval_content {
  width: 375px;
  min-height: 35px;
  padding-right: 30px;
  font-size: 14px;
  color: #4e5f71;
  margin-top: 8px;
  line-height: 18px;
}
.show_score div {
  display: flex;
  flex-direction: column;
  color: #999;
  font-size: 12px;
  text-align: center;
  padding-left: 20px;
  align-self: flex-start;
  border-left: 1px solid #ddd;
}
.show_score > div > p.lowScore {
  font-size: 20px;
  color: #1059ff;
}
.show_score > div > p.fullScore {
  font-size: 20px;
  color: #53bbb3;
}
.show_score > .no_comment {
  height: 35px;
  border-left: 1px solid #ddd;
  line-height: 35px;
  color: #fda158;
  font-size: 16px;
  width: 68px;
  font-size: 16px;
  text-align: center;
  padding-left: 20px;
}
.play_audio {
  width: 360px;
  height: 40px;
}
.play_audio > .word {
  font-size: 14px;
}
.mute_btn {
  background: #dddddd;
  border: 1px solid #cccccc;
}
.mute_btn > .word {
  color: #999;
}
.composition_textarea {
  width: 360px;
  margin-top: 13px;
}
.composition_textarea >>> .el-textarea__inner {
  height: 88px;
  resize: none;
}
.float_button {
  width: 88px;
  height: 64px;
  border: 1px solid #1059ff;
  background: #fff;
  border-radius: 12px;
  color: #1059ff;
  font-size: 16px;
  padding: 7px 10px 10px;
  text-align: center;
  position: absolute;
  z-index: 99;
  right: -88px;
  cursor: pointer;
}
.float_button img {
  width: 26px;
  height: 26px;
  display: block;
  margin: 0 auto 4px;
}
.float_button > span {
  line-height: 16px;
}
.appeal_img {
  position: absolute;
  right: 23px;
  width: 30px;
  height: 30px;
  top: 17px;
}
@media screen and (max-width: 1400px) {
  .float_button {
    position: fixed;
    right: 0;
  }
}
</style>