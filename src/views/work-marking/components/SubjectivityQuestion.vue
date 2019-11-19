<template>
  <div class="subjectivity-question">
    <div class="top-wrap">
      <div class="question-top">
        <div class="header">
          <div class="left">
            <div>
              <span>练习册名称</span>
              <span>{{ questionInfo.workbookName }}</span>
            </div>
            <div>
              <span>页数</span
              ><span>{{ questionInfo.workbookChapterPage }}</span>
            </div>
            <div>
              <span>题号</span><span>{{ questionInfo.questionNumber }}</span>
            </div>
            <div>
              <span>题型</span
              ><span>{{ questionInfo.questionYytypeName }}</span>
            </div>
          </div>
          <div
            class="right"
            @click="handleCollect"
            v-if="!questionInfo.teacherQuestionCollectonId"
          >
            <img src="../../../assets/img/ic_collect_heart@2x.png" alt="" />
            <span>加入收藏</span>
          </div>
          <div class="right" @click="handleCancleCollect" v-else>
            <img
              class="cancle"
              src="../../../assets/img/collected.png"
              alt=""
            />
            <span>取消收藏</span>
          </div>
        </div>
        <div class="question-main" :class="isShow ? 'show' : ''">
          <div class="question-stem">
            <div class="topic">题目</div>
            <div class="stem" v-html="questionInfo.questionStem"></div>
          </div>
          <div class="reference">
            <div class="topic">参考答案</div>
            <template v-if="questionInfo.questionTypeCode === 5">
              <ul class="gap-fill">
                <li v-for="(item, index) of questionAnswer" :key="index">
                  <div class="index">{{ index + 1 }}、</div>
                  <p v-for="(value, index) of item.answer" :key="index">
                    <span
                      v-if="item.property === 1"
                      v-html="decodeURIComponent(value)"
                    >
                    </span>
                    <span v-else>
                      {{ value }}
                    </span>
                  </p>
                </li>
              </ul>
            </template>
            <div class="stem" v-else v-html="questionInfo.questionAnswer"></div>
          </div>
          <div class="analysis">
            <div class="topic">解析</div>
            <div class="stem" v-html="questionInfo.questionAnalysis"></div>
          </div>
        </div>

        <div class="footer">
          <template v-if="!isShow">
            <span @click="handleShow">
              <img src="../../../assets/img/publish/zk.png" alt="" /><span
                >展开</span
              >
            </span>
          </template>
          <template v-else>
            <span @click="handleShow">
              <img src="../../../assets/img/publish/sq.png" alt="" /><span
                >收起</span
              >
            </span>
          </template>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 学生互评 -->
      <PeerGrading :questionInfo="questionInfo"></PeerGrading>
      <div class="canvas">
        <div class="share" @click="share">
          <img
            src="../../../assets/img/shareNormal.png"
            alt=""
            v-if="questionInfo.ifShare == 1"
          />
          <img src="../../../assets/img/shareOut.png" alt="" v-else />
          <span v-if="questionInfo.ifShare == 1">分享全班</span>
          <span v-else class="hover-span">分享全班</span>
        </div>
        <template
          v-if="
            techerReviewList.length > 0 && techerReviewList[0].reviewFileStr
          "
        >
          <EditCanvas
            :src="techerReviewList[0].reviewFileStr.split(',')[picIndex - 1]"
            @importImg="handleImportImg"
            :picIndex="picIndex"
          ></EditCanvas>
          <div class="pagination">
            <ul>
              <li @click="handleLeft">
                <a-icon type="caret-left" />
              </li>
              <li>
                <span>{{ picIndex }}</span
                >/{{ techerReviewList[0].reviewFileStr.split(',').length }}
              </li>
              <li
                @click="
                  handleRight(
                    techerReviewList[0].reviewFileStr.split(',').length
                  )
                "
              >
                <a-icon type="caret-right" />
              </li>
            </ul>
            <!-- <a-pagination
              v-model="picIndex"
              :defaultPageSize="1"
              simple
              :total="techerReviewList[0].reviewFileStr.split(',').length"
            /> -->
          </div>
        </template>
        <template v-else-if="fileList.length > 0">
          <EditCanvas
            :src="fileList[picIndex - 1].answerFileUrlStr"
            :picIndex="picIndex"
            @importImg="handleImportImg"
          ></EditCanvas>
          <div class="pagination">
            <!-- <a-pagination
              v-model="picIndex"
              simple
              :defaultPageSize="1"
              :total="fileList.length"
            /> -->
            <ul>
              <li @click="handleLeft">
                <a-icon type="caret-left" />
              </li>
              <li>
                <span>{{ picIndex }}</span
                >/{{ fileList.length }}
              </li>
              <li @click="handleRight(fileList.length)">
                <a-icon type="caret-right" />
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="default-pic">
            <img src="../../../assets/img/pic_homepage_empty@2x.png" alt="" />
            没有上传答案图片
          </div>
        </template>
      </div>
    </div>
    <div class="review-toolbar">
      <div class="complete" @click="hanldeVisble">
        <p>完成</p>
        <p>批阅</p>
      </div>
      <div class="stay" v-if="count">
        <p>{{ count }}</p>
        <p>待批阅</p>
      </div>
      <div class="my-graded" v-if="hasRewive !== 3">
        <h3>我的评分</h3>
        <ul class="gradedList" v-if="subjectAbbreviation === 'yingyu'">
          <li
            @click="hanldeReadOverOne(Number(questionInfo.questionScore))"
            class="full"
            :class="
              (questionInfo.hasRewive === 1 || questionInfo.hasRewive === 4) &&
              Number(questionInfo.score) === Number(questionInfo.questionScore)
                ? 'active'
                : ''
            "
          >
            满
          </li>
          <li
            v-for="item of Number(questionInfo.questionScore)"
            :key="item"
            @click="
              hanldeReadOverOne(Number(questionInfo.questionScore) - item)
            "
            :class="
              (questionInfo.hasRewive === 1 || questionInfo.hasRewive === 4) &&
              Number(questionInfo.score) ===
                Number(questionInfo.questionScore) - item
                ? 'active'
                : ''
            "
          >
            {{ Number(questionInfo.questionScore) - item }}
          </li>
        </ul>
        <ul class="gradedList" v-else>
          <li
            :class="
              (questionInfo.hasRewive === 1 || questionInfo.hasRewive === 4) &&
              Number(questionInfo.score) === 2
                ? 'active'
                : ''
            "
            @click="hanldeReadOverOne(2)"
          >
            <img src="../../../assets/img/publish/result_right.png" alt="" />
          </li>
          <li
            :class="
              (questionInfo.hasRewive === 1 || questionInfo.hasRewive === 4) &&
              Number(questionInfo.score) === 1
                ? 'active'
                : ''
            "
            @click="hanldeReadOverOne(1)"
          >
            <img src="../../../assets/img/publish/result_half.png" alt="" />
          </li>
          <li
            :class="
              (questionInfo.hasRewive === 1 || questionInfo.hasRewive === 4) &&
              Number(questionInfo.score) === 0
                ? 'active'
                : ''
            "
            @click="hanldeReadOverOne(0)"
          >
            <img src="../../../assets/img/publish/result_wrong.png" alt="" />
          </li>
        </ul>
      </div>
      <div class="leave-message" v-if="hasRewive !== 3">
        <Recorder :questionInfo="questionInfo"></Recorder>
      </div>
      <div class="next-student" @click="nextStudent" v-if="isShowNextStudent">
        <p>下个</p>
        <p>学生</p>
      </div>
    </div>

    <a-modal
      title="提示"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="null"
    >
      <div class="read-over">
        <p>
          还有<span>{{ count }}</span
          >道题未批阅哦 ～
        </p>
        <p>
          若点击“完成批阅”，未批阅的题将按照
          <span style="color:red">做对</span> 处理
        </p>
        <div>
          <button @click="hanldeReadOver">完成批阅</button>
          <button @click="handleCancel">继续批阅</button>
        </div>
      </div>
    </a-modal>
    <a-modal
      title="提示"
      :visible="isappeal"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="null"
    >
      <div class="read-over">
        <p>
          {{ studentName }}同学还有<span style="color:#d9b18c"
            >&nbsp;&nbsp;{{ isappealNum }}&nbsp;&nbsp;</span
          >个重批申请未处理
        </p>
        <p>
          是否将未重批的题按照<span style="color:red">&nbsp;&nbsp;做对</span>
          处理
        </p>
        <div>
          <button @click="hanldeReadOver">完成批阅</button>
          <button @click="handleCancel">继续批阅</button>
        </div>
      </div>
    </a-modal>
    <a-modal
      title="提示"
      :visible="noStudent"
      v-if="noStudent"
      @cancel="handleCancelStudent"
      :footer="null"
    >
      <div class="read-over">
        <h3>恭喜你，没有待批阅的学生了</h3>
        <div>
          <span>作业名称</span>
          <span>{{ item.homeworkName }}</span>
        </div>
        <div>
          <span>作业班级</span><span>{{ item.gradeClassname }}</span>
        </div>
        <div>
          <button @click="handleGoList">知道了</button>
        </div>
      </div>
    </a-modal>
    <!-- 还有几名学生 -->
    <a-modal
      title="提示"
      :visible="noReviewStudent"
      @ok="handleOk"
      @cancel="handleCancelNoReviewStudent"
      :footer="null"
    >
      <div class="read-over">
        <h4>还有{{ noRewiveStudentList.length }}名学生的作业待批阅</h4>
        <div>
          <button @click="handleGoList">退出批阅</button>
          <button @click="nextStudent">下一个学生</button>
        </div>
      </div>
    </a-modal>
    <CollectonModal
      v-if="isShowCollect"
      :item="item"
      @onHideCollect="handleHideCollect"
      :questionInfo="questionInfo"
    ></CollectonModal>

    <!-- <div
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
    </div> -->
  </div>
</template>

<script>
// import imageView from 'vue-imageview'
// import $ from 'jquery'
import localforage from 'localforage'
import PeerGrading from './PeerGrading'
import Recorder from './Recorder'
import CollectonModal from './CollectonModal'
import EditCanvas from './EditCanvas'
export default {
  name: '',
  components: { PeerGrading, Recorder, CollectonModal, EditCanvas },
  // 当前批阅作业详情
  props: ['questionInfo'],
  data() {
    return {
      // picflag: false,
      // imgArr: [],
      // imageIndex: 0,
      rewiveType: false,
      isShow: false,
      //picIndex: 1,
      visible: false,
      isappeal: false,
      item: null,
      studentList: null,
      noRewiveStudentList: [],
      nextHomeworkQuestionId: null,
      nextStudentInfoId: null,
      student: null,
      noStudent: false,
      isShowNextStudent: false,
      noReviewStudent: false,
      noReviewStudentCount: 0,
      isShowCollect: false,
      // 涂鸦文件
      blob: null,
      //是否需要弹框
      isDialog: true,
      ifShare: 0
    }
  },
  computed: {
    studentName() {
      return this.$store.state.marking.studentName
    },
    picIndex: {
      get: function() {
        return this.$store.state.marking.picIndex
      },
      set: function(v) {
        this.$store.commit('marking/PICINDEX', v)
      }
    },
    questionAnswer() {
      return (
        this.questionInfo.questionAnswer &&
        JSON.parse(this.questionInfo.questionAnswer)
      )
    },
    // 试题列表信息
    questionListInfo() {
      return this.$store.state.marking.questionListInfo
    },
    hasRewive() {
      let hasRewive
      this.questionListInfo &&
        this.questionListInfo.homeworkQuestionList.forEach(item => {
          if (item.homeworkQuestionId === this.homeworkQuestionId) {
            hasRewive = item.hasRewive
          }
        })
      return hasRewive
    },
    // 试题列表
    list() {
      return (
        (this.questionListInfo && this.questionListInfo.homeworkQuestionList) ||
        []
      )
    },
    // 主观题列表
    subjectivelist() {
      return (
        (this.list && this.list.filter(item => item.questionType === 1)) || []
      )
    },
    // 主观未批阅列表
    noRewiveList() {
      return this.subjectivelist.filter(
        item =>
          item.hasRewive === 0 ||
          (item.hasRewive === 2 && item.questionIsappeal === 1)
      )
    },
    // 主观带批阅数量
    count() {
      let count = 0
      if (this.subjectivelist.length > 0) {
        this.subjectivelist.forEach(item => {
          if (item.hasRewive === 0) {
            count += 1
          } else {
            if (this.questionListInfo.hasRewive !== 2) {
              if (item.questionIsappeal && item.questionIsappeal === 1) {
                count += 1
              }
            } else {
              if (
                this.questionListInfo.reviewType === 2 ||
                this.questionListInfo.reviewType === 4
              ) {
                if (item.questionIsappeal && item.questionIsappeal === 1) {
                  count += 1
                }
              } else {
                count += 1
              }
            }
          }
        })
      }
      return count
    },
    //是否有申诉状态
    isappealNum() {
      let count = 0
      if (this.list.length > 0) {
        this.list.forEach(item => {
          if (item.questionIsappeal == 1) {
            count++
          }
        })
      }
      return count
    },
    // 学科
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    },
    homeworkQuestionId() {
      return this.$store.state.marking.homeworkQuestionId
    },
    reviewVoice() {
      return this.$store.state.marking.reviewVoice
    },
    // 教师批阅列表
    techerReviewList() {
      return (
        (this.questionInfo.reviewList &&
          this.questionInfo.reviewList.filter(
            item => item.reviewUserType === 2
          )) ||
        []
      )
    },
    // 批阅的文件
    fileList() {
      let result = []
      this.questionInfo.reviewList &&
        this.questionInfo.reviewList.forEach(item => {
          if (item.reviewUserType === 2 && item.reviewFileStr) {
            result.push(item)
          }
        })
      if (result.length === 0) {
        result = this.questionInfo.fileList || []
      }
      return result
    }
  },
  watch: {
    count(val) {
      // 判断是否重批
      //localforage.getItem('item').then(item => {
      //localforage.getItem('list').then(list => {
      localforage.getItem('student').then(student => {
        // this.item = item
        // this.studentList = list
        // this.student = student
        this.rewiveType =
          student.reviewType === 1 ||
          student.reviewType === 4 ||
          (student.reviewType === 2 && val === 0)
      })
      //})
      //})
    },
    reviewVoice: {
      handler(value) {
        //console.log(value)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    share() {
      this.ifShare = 0
      if (
        (this.questionInfo.hasRewive == 1 ||
          this.questionInfo.hasRewive == 4) &&
        this.questionInfo.isTrue == 0
      ) {
        if (this.questionInfo.ifShare == 0) {
          this.ifShare = 1
        }
        this.$http
          .post('/api/teacher/homework/shareStudentAnswer', {
            ifShare: this.ifShare,
            studentAnswerId: this.questionInfo.studentAnswerId
          })
          .then(({ data }) => {
            if (data.flag === 1) {
              if (this.ifShare == 0) {
                this.$message.success('分享成功')
              } else {
                this.$message.success('取消分享成功')
              }

              this.$store.dispatch('marking/questionInfo')
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$message.error('正确答案才能分享全班哦～')
      }
    },
    //  hideImageView() {
    //   this.picflag = false
    // },
    // 导出图片
    handleImportImg(blob) {
      this.blob = blob
    },
    // 隐藏收藏模态框
    handleHideCollect() {
      this.isShowCollect = false
    },
    handleShow() {
      this.isShow = !this.isShow
    },
    hanldeVisble() {
      if (this.isappealNum > 0) {
        this.isappeal = true
        return
      }
      if (this.count === 0) {
        //let resultJsonArrayAll=[...this.subjectivelist]
        let resultJsonArray = [...this.noRewiveList]
        // var type=0;
        //  resultJsonArrayAll.forEach((item, index) => {
        //   if(item.hasRewive==2){
        //   type=1;
        //   }
        // })
        //if(type==1){
        if (resultJsonArray.length > 0) {
          this.hanldeReadOver()
        } else {
          if (this.reviewVoice || this.blob) {
            this.hanldeReadOverOne()
          } else {
            if (
              this.student.reviewType == 0 ||
              this.student.homeworkIsappeal == 1
            ) {
              if (this.noRewiveStudentList.length > 0) {
                // 打开下个学生模态框
                this.noReviewStudent = true
              } else {
                // 打开没有学生代批阅模态框
                //this.noStudent = true
                this.$router.go(-1)
                this.$message.success('恭喜您全部作业批阅完成')
                return
              }
            } else {
              this.$router.go(-1)
              this.$message.success('恭喜您全部作业批阅完成')
              return
            }
          }
        }
        // if (this.reviewVoice || this.blob) {
        // } else {
        //   this.$router.go(-1)
        //   this.$message.success('恭喜您全部作业批阅完成')
        //   return
        // }
      } else {
        this.visible = true
      }
    },
    handleOk() {
      this.visible = false
      this.isappeal = false
    },
    handleCancel() {
      this.visible = false
      this.isappeal = false
    },
    handleCancelStudent() {
      this.noStudent = false
      this.isDialog = false
    },
    handleCancelNoReviewStudent() {
      this.noReviewStudent = false
      this.isShowNextStudent = true
      this.isDialog = false
    },
    handleGoList() {
      this.$message.success('恭喜您全部作业批阅完成')
      this.$router.go(-1)
    },
    hanldeReadOver() {
      var self = this
      setTimeout(function() {
        self.loading = self.$loading({
          lock: true,
          text: '批阅中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fontSize: '14px',
          zIndex: 99999999
        })
        // 批阅结果数组json
        //let resultJsonArrayAll=[...self.subjectivelist]
        let resultJsonArray = [...self.noRewiveList]
        //var isScore=0
        // if(resultJsonArray.length==0){
        // resultJsonArrayAll.forEach((item, index) => {
        //   if((item.hasRewive==2&&(item.questionIsappeal==undefined||item.questionIsappeal==2)&&item.homeworkQuestionId!=self.homeworkQuestionId)||(item.homeworkQuestionId==self.homeworkQuestionId)){
        //    var type=0
        //    resultJsonArray.forEach((items, index) => {
        //      if(items.homeworkQuestionId==item.homeworkQuestionId){
        //        type=1
        //      }
        //    })
        //    if(type==0&&(item.hasRewive==2||self.blob||self.reviewVoice)){
        //      resultJsonArray.push(item)
        //    }
        //   }
        // })
        // }else{
        //isScore=1
        var type = 0
        resultJsonArray.forEach((item, index) => {
          if (item.homeworkQuestionId == self.homeworkQuestionId) {
            type = 1
          }
        })
        if (type == 0 && (self.blob || self.reviewVoice)) {
          let reviewList =
            (self.questionInfo.reviewList &&
              self.questionInfo.reviewList.filter(
                item => item.reviewUserType === 2
              )) ||
            []
          let resultJson = {
            hasRewive: self.questionInfo.hasRewive,
            score: self.questionInfo.score,
            ifLast: 0,
            homeworkQuestionId: self.questionInfo.homeworkQuestionId,
            studentAnswerId: self.questionInfo.studentAnswerId,
            studentAnswerReviewId:
              (reviewList &&
                reviewList[0] &&
                reviewList[0].studentAnswerReviewId) ||
              null
          }
          resultJsonArray.push(resultJson)
        }
        //}

        // 未批阅数组
        resultJsonArray.forEach((item, index) => {
          //英语
          if (self.subjectAbbreviation === 'yingyu') {
            // 主观填空题
            if (
              self.questionInfo.questionTypeCode === 5 &&
              self.questionInfo.answerConten
            ) {
              // 试题答案
              let questionAnswerList = JSON.parse(
                self.questionInfo.questionAnswer
              )
              // 批阅答案
              let answerContentList = JSON.parse(
                self.questionInfo.answerContent
              )
              //批阅结果
              let reviewResult
              questionAnswerList.forEach((item, index) => {
                if (!answerContentList[index].questionTeacherScore) {
                  answerContentList[index].questionTeacherScore = item.score
                  reviewResult += item.score
                } else {
                  reviewResult += answerContentList[index].questionTeacherScore
                }
              })
              // 是否答对
              let isTrue =
                self.questionInfo.questionScore == reviewResult ? 0 : 1

              resultJsonArray[index] = {
                ...item,
                isTrue: isTrue,
                ifLast: 0,
                reviewResult: reviewResult,
                answerContent: JSON.stringify(answerContentList),
                studentAnswerReviewId:
                  (item.reviewList &&
                    item.reviewList[0] &&
                    item.reviewList[0].studentAnswerReviewId) ||
                  null
              }
            } else {
              var reviewResult = item.questionScore
              if (
                item.hasRewive == 1 ||
                item.hasRewive == 4 ||
                (item.hasRewive == 2 &&
                  (item.questionIsappeal == undefined ||
                    item.questionIsappeal == 2))
              ) {
                //if(isScore!=1){
                reviewResult = item.score
                //}
              }
              // else if(item.hasRewive==1||item.hasRewive==4){
              //    reviewResult=item.score
              // }
              var isTrue = reviewResult == item.questionScore ? 0 : 1
              //主观题
              resultJsonArray[index] = {
                ...item,
                isTrue: isTrue,
                ifLast: 0,
                reviewResult: reviewResult,
                studentAnswerReviewId:
                  (item.reviewList &&
                    item.reviewList[0] &&
                    item.reviewList[0].studentAnswerReviewId) ||
                  null
              }
              //console.log(item.questionScore)
            }
          } else {
            // 非英语
            if (
              self.questionInfo.questionTypeCode === 5 &&
              self.questionInfo.answerConten
            ) {
              // 主观填空题
              // 批阅答案
              let answerContentList = JSON.parse(
                self.questionInfo.answerContent
              )
              // 试题答案
              let questionAnswerList = JSON.parse(
                self.questionInfo.questionAnswer
              )
              // 批阅结果
              let reviewResult

              answerContentList.forEach((item, index) => {
                if (!answerContentList[index].questionTeacherScore) {
                  answerContentList[index].questionTeacherScore = 2
                  reviewResult += 2
                } else {
                  reviewResult += answerContentList[index].questionTeacherScore
                }
              })
              let isTrue = questionAnswerList.length * 2 == reviewResult ? 0 : 1

              resultJsonArray[index] = {
                ...item,
                isTrue: isTrue,
                ifLast: 0,
                reviewResult: reviewResult,
                answerContent: JSON.stringify(answerContentList),
                studentAnswerReviewId:
                  (item.reviewList &&
                    item.reviewList[0] &&
                    item.reviewList[0].studentAnswerReviewId) ||
                  null
              }
            } else {
              var reviewResult = 2
              if (
                item.hasRewive == 1 ||
                item.hasRewive == 4 ||
                (item.hasRewive == 2 &&
                  (item.questionIsappeal == undefined ||
                    item.questionIsappeal == 2))
              ) {
                //if(item.hasRewive==2&&(item.questionIsappeal==undefined||item.questionIsappeal==2)){
                //if(isScore!=1){
                reviewResult = item.score
                //}
              }
              // else if(item.hasRewive==1||item.hasRewive==4){
              //     reviewResult=item.score
              // }
              var isTrue = reviewResult == 2 ? 0 : reviewResult == 0 ? 1 : 2
              resultJsonArray[index] = {
                ...item,
                isTrue: isTrue,
                ifLast: 0,
                reviewResult: reviewResult,
                studentAnswerReviewId:
                  (item.reviewList &&
                    item.reviewList[0] &&
                    item.reviewList[0].studentAnswerReviewId) ||
                  null
              }
            }
          }
        })
        if (self.reviewVoice && self.blob) {
          let fd = new FormData()
          fd.append('file', self.reviewVoice)
          self.$http
            .post(
              `/teacherApi/upload/uploadCommonFile/voice/homework/${self.subjectAbbreviation}`,
              fd,
              {
                headers: {
                  upload: true
                }
              }
            )
            .then(({ data }) => {
              let reviewVoice = data.infos[0]
              var str = {}
              var i = 0
              for (let key in self.blob) {
                let fd = new FormData()
                fd.append('file', self.blob[key])
                self.$http
                  .post(
                    `/teacherApi/upload/uploadCommonFile/img/homework/${self.subjectAbbreviation}`,
                    fd,
                    {
                      headers: {
                        upload: true
                      }
                    }
                  )
                  .then(({ data }) => {
                    let reviewFile = data.infos[0]
                    str[key] = reviewFile
                    i++
                    if (i == Object.keys(self.blob).length) {
                      var strFiles = ''
                      if (
                        self.techerReviewList.length > 0 &&
                        self.techerReviewList[0].reviewFile
                      ) {
                        var arr = self.techerReviewList[0].reviewFile.split(',')
                        arr.forEach((item, index) => {
                          if (str[index + 1] != undefined) {
                            strFiles += str[index + 1] + ','
                          } else {
                            if (index == arr.length - 1) {
                              strFiles += item
                            } else {
                              strFiles += item + ','
                            }
                          }
                        })
                      } else {
                        var arr1 = self.fileList
                        arr1.forEach((item, index) => {
                          if (str[index + 1] != undefined) {
                            strFiles += str[index + 1] + ','
                          } else {
                            if (index == arr1.length - 1) {
                              strFiles += item.answerFileUrl
                            } else {
                              strFiles += item.answerFileUrl + ','
                            }
                          }
                        })
                      }
                      resultJsonArray.forEach((item, index) => {
                        if (
                          item.homeworkQuestionId === self.homeworkQuestionId
                        ) {
                          resultJsonArray[index] = {
                            ...item,
                            reviewVoice: reviewVoice || null,
                            reviewFile: strFiles,
                            studentAnswerReviewId:
                              (item.reviewList &&
                                item.reviewList[0] &&
                                item.reviewList[0].studentAnswerReviewId) ||
                              null
                          }
                        }
                      })

                      self.$store
                        .dispatch('marking/teacherAllReview', {
                          homeworkId: self.item.homeworkId,
                          ifDone: 1,
                          studentInfoId: self.student.studentInfoId,
                          resultJsonArray: resultJsonArray
                        })
                        .then(({ data }) => {
                          if (data.flag === 1) {
                            self.$store.dispatch('marking/questionInfo')
                            // 刷新试题详情数据
                            self.$store.dispatch('marking/getQuestionList', {
                              homeworkId: self.item.homeworkId,
                              studentInfoId: self.student.studentInfoId
                            })

                            self.loading.close()
                            self.visible = false
                            self.isappeal = false
                            self.blob = null
                            // 判断是否存在下个学生带批阅 ，有弹哥提示，1.返回列表，2.批阅下个学生
                            self.noRewiveStudentList.forEach((item, index) => {
                              if (
                                item.studentInfoId ===
                                self.student.studentInfoId
                              ) {
                                if (
                                  index ===
                                  self.noRewiveStudentList.length - 1
                                ) {
                                  self.nextStudentInfoId =
                                    self.noRewiveStudentList[0].studentInfoId
                                } else {
                                  self.nextStudentInfoId =
                                    self.noRewiveStudentList[
                                      index + 1
                                    ].studentInfoId
                                }
                                self.noRewiveStudentList.splice(index, 1)
                              }
                            })
                            if (self.noRewiveStudentList.length > 0) {
                              // 打开下个学生模态框
                              self.noReviewStudent = true
                            } else {
                              // 打开没有学生代批阅模态框
                              //  if(isScore==0){
                              // self.handleGoList()
                              // return
                              // }else{
                              self.noStudent = true
                              //}
                            }
                          }
                        })
                    }
                    //str += reviewFile + ','
                  })
              }
            })
        } else if (self.reviewVoice) {
          let fd = new FormData()
          fd.append('file', self.reviewVoice)
          self.$http
            .post(
              `/teacherApi/upload/uploadCommonFile/voice/homework/${self.subjectAbbreviation}`,
              fd,
              {
                headers: {
                  upload: true
                }
              }
            )
            .then(({ data }) => {
              let reviewVoice = data.infos[0]
              resultJsonArray.forEach((item, index) => {
                if (item.homeworkQuestionId === self.homeworkQuestionId) {
                  resultJsonArray[index] = {
                    ...item,
                    reviewVoice: reviewVoice || null,
                    studentAnswerReviewId:
                      (item.reviewList &&
                        item.reviewList[0] &&
                        item.reviewList[0].studentAnswerReviewId) ||
                      null
                  }
                }
              })
              self.$store
                .dispatch('marking/teacherAllReview', {
                  homeworkId: self.item.homeworkId,
                  ifDone: 1,
                  studentInfoId: self.student.studentInfoId,
                  resultJsonArray: resultJsonArray
                })
                .then(({ data }) => {
                  if (data.flag === 1) {
                    self.$store.dispatch('marking/questionInfo')
                    // 刷新试题详情数据
                    self.$store.dispatch('marking/getQuestionList', {
                      homeworkId: self.item.homeworkId,
                      studentInfoId: self.student.studentInfoId
                    })
                    self.visible = false
                    self.isappeal = false
                    self.loading.close()

                    // 判断是否存在下个学生带批阅 ，有弹哥提示，1.返回列表，2.批阅下个学生
                    self.noRewiveStudentList.forEach((item, index) => {
                      if (item.studentInfoId === self.student.studentInfoId) {
                        if (index === self.noRewiveStudentList.length - 1) {
                          self.nextStudentInfoId =
                            self.noRewiveStudentList[0].studentInfoId
                        } else {
                          self.nextStudentInfoId =
                            self.noRewiveStudentList[index + 1].studentInfoId
                        }
                        self.noRewiveStudentList.splice(index, 1)
                      }
                    })
                    if (self.noRewiveStudentList.length > 0) {
                      // 打开下个学生模态框
                      self.noReviewStudent = true
                    } else {
                      // 打开没有学生代批阅模态框
                      // if(isScore==0){
                      // self.handleGoList()
                      // return
                      // }else{
                      self.noStudent = true
                      // }
                    }
                  }
                })
            })
        } else if (self.blob) {
          var str = {}
          var i = 0
          for (let key in self.blob) {
            let fd = new FormData()
            fd.append('file', self.blob[key])
            self.$http
              .post(
                `/teacherApi/upload/uploadCommonFile/img/homework/${self.subjectAbbreviation}`,
                fd,
                {
                  headers: {
                    upload: true
                  }
                }
              )
              .then(({ data }) => {
                let reviewFile = data.infos[0]
                str[key] = reviewFile
                i++
                if (i == Object.keys(self.blob).length) {
                  var strFiles = ''
                  if (
                    self.techerReviewList.length > 0 &&
                    self.techerReviewList[0].reviewFile
                  ) {
                    var arr = self.techerReviewList[0].reviewFile.split(',')
                    arr.forEach((item, index) => {
                      if (str[index + 1] != undefined) {
                        strFiles += str[index + 1] + ','
                      } else {
                        if (index == arr.length - 1) {
                          strFiles += item
                        } else {
                          strFiles += item + ','
                        }
                      }
                    })
                  } else {
                    var arr1 = self.fileList
                    arr1.forEach((item, index) => {
                      if (str[index + 1] != undefined) {
                        strFiles += str[index + 1] + ','
                      } else {
                        if (index == arr1.length - 1) {
                          strFiles += item.answerFileUrl
                        } else {
                          strFiles += item.answerFileUrl + ','
                        }
                      }
                    })
                  }
                  resultJsonArray.forEach((item, index) => {
                    if (item.homeworkQuestionId === self.homeworkQuestionId) {
                      resultJsonArray[index] = {
                        ...item,
                        reviewVoice: null,
                        reviewFile: strFiles,
                        studentAnswerReviewId:
                          (item.reviewList &&
                            item.reviewList[0] &&
                            item.reviewList[0].studentAnswerReviewId) ||
                          null
                      }
                    }
                  })

                  self.$store
                    .dispatch('marking/teacherAllReview', {
                      homeworkId: self.item.homeworkId,
                      ifDone: 1,
                      studentInfoId: self.student.studentInfoId,
                      resultJsonArray: resultJsonArray
                    })
                    .then(({ data }) => {
                      if (data.flag === 1) {
                        self.$store.dispatch('marking/questionInfo')
                        // 刷新试题详情数据
                        self.$store.dispatch('marking/getQuestionList', {
                          homeworkId: self.item.homeworkId,
                          studentInfoId: self.student.studentInfoId
                        })
                        self.visible = false
                        self.isappeal = false
                        self.blob = null
                        self.loading.close()

                        // 判断是否存在下个学生带批阅 ，有弹哥提示，1.返回列表，2.批阅下个学生
                        self.noRewiveStudentList.forEach((item, index) => {
                          if (
                            item.studentInfoId === self.student.studentInfoId
                          ) {
                            if (index === self.noRewiveStudentList.length - 1) {
                              self.nextStudentInfoId =
                                self.noRewiveStudentList[0].studentInfoId
                            } else {
                              self.nextStudentInfoId =
                                self.noRewiveStudentList[
                                  index + 1
                                ].studentInfoId
                            }
                            self.noRewiveStudentList.splice(index, 1)
                          }
                        })
                        if (self.noRewiveStudentList.length > 0) {
                          // 打开下个学生模态框
                          self.noReviewStudent = true
                        } else {
                          // 打开没有学生代批阅模态框
                          // if(isScore==0){
                          //    self.handleGoList()
                          //    return
                          //   }else{
                          self.noStudent = true
                          //}
                        }
                      }
                    })
                }
              })
          }
        } else {
          self.$store
            .dispatch('marking/teacherAllReview', {
              homeworkId: self.item.homeworkId,
              ifDone: 1,
              studentInfoId: self.student.studentInfoId,
              resultJsonArray: resultJsonArray
            })
            .then(({ data }) => {
              if (data.flag === 1) {
                self.$store.dispatch('marking/questionInfo')
                // 刷新试题详情数据
                self.$store.dispatch('marking/getQuestionList', {
                  homeworkId: self.item.homeworkId,
                  studentInfoId: self.student.studentInfoId
                })
                self.visible = false
                self.isappeal = false
                self.loading.close()
                // 判断是否存在下个学生带批阅 ，有弹哥提示，1.返回列表，2.批阅下个学生
                self.noRewiveStudentList.forEach((item, index) => {
                  if (item.studentInfoId === self.student.studentInfoId) {
                    if (index === self.noRewiveStudentList.length - 1) {
                      self.nextStudentInfoId =
                        self.noRewiveStudentList[0].studentInfoId
                    } else {
                      self.nextStudentInfoId =
                        self.noRewiveStudentList[index + 1].studentInfoId
                    }
                    self.noRewiveStudentList.splice(index, 1)
                  }
                })
                if (self.noRewiveStudentList.length > 0) {
                  // 打开下个学生模态框
                  self.noReviewStudent = true
                } else {
                  // 打开没有学生代批阅模态框
                  //  if(isScore==0){
                  //     self.handleGoList()
                  //     return
                  //     }else{
                  self.noStudent = true
                  // }
                }
              }
            })
        }
      })
    },
    hanldeReadOverOne(value) {
      // 判断英语学科
      // 是否最后一题
      var self = this
      setTimeout(function() {
        let ifLast = 0
        if (self.count === 1) {
          self.subjectivelist.forEach(item => {
            if (item.homeworkQuestionId === self.homeworkQuestionId) {
              if (
                item.hasRewive === 0 ||
                (item.hasRewive === 2 && item.questionIsappeal === 1)
              ) {
                ifLast = 1
              }
            }
          })
        } else if (self.count > 1) {
          ifLast = 0
        } else {
          ifLast = 1
        }
        //批阅集合
        let reviewList =
          (self.questionInfo.reviewList &&
            self.questionInfo.reviewList.filter(
              item => item.reviewUserType === 2
            )) ||
          []
        // 是否答对
        let isTrue
        var isD = false
        // let answerContent
        //英语
        if (value != undefined && self.subjectAbbreviation === 'yingyu') {
          // 英语
          isTrue = value == Number(self.questionInfo.questionScore) ? 0 : 1
        } else if (value != undefined && self.subjectAbbreviation != 'yingyu') {
          // 非英语
          isTrue = value == 2 ? 0 : value == 0 ? 1 : 2
        } else {
          isD = true
          self.isDialog = true
          value = self.questionInfo.score
          if (self.subjectAbbreviation === 'yingyu') {
            isTrue = value == Number(self.questionInfo.questionScore) ? 0 : 1
          } else {
            isTrue = value == 2 ? 0 : value == 0 ? 1 : 2
          }
        }
        self.loading = self.$loading({
          lock: true,
          text: '批阅中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          fontSize: '14px',
          zIndex: 99999999
        })
        if (self.reviewVoice && self.blob) {
          let fd = new FormData()
          fd.append('file', self.reviewVoice)
          self.$http
            .post(
              `/teacherApi/upload/uploadCommonFile/voice/homework/${self.subjectAbbreviation}`,
              fd,
              {
                headers: {
                  upload: true
                }
              }
            )
            .then(({ data }) => {
              var str = {}
              var i = 0
              let reviewVoice = data.infos[0]
              for (let key in self.blob) {
                let fd = new FormData()
                fd.append('file', self.blob[key])
                self.$http
                  .post(
                    `/teacherApi/upload/uploadCommonFile/img/homework/${self.subjectAbbreviation}`,
                    fd,
                    {
                      headers: {
                        upload: true
                      }
                    }
                  )
                  .then(({ data }) => {
                    let reviewFile = data.infos[0]
                    str[key] = reviewFile
                    var strFiles = ''
                    i++
                    if (i == Object.keys(self.blob).length) {
                      if (
                        self.techerReviewList.length > 0 &&
                        self.techerReviewList[0].reviewFile
                      ) {
                        var arr = self.techerReviewList[0].reviewFile.split(',')
                        arr.forEach((item, index) => {
                          if (str[index + 1] != undefined) {
                            strFiles += str[index + 1] + ','
                          } else {
                            if (index == arr.length - 1) {
                              strFiles += item
                            } else {
                              strFiles += item + ','
                            }
                          }
                        })
                      } else {
                        var arr1 = self.fileList
                        arr1.forEach((item, index) => {
                          if (str[index + 1] != undefined) {
                            strFiles += str[index + 1] + ','
                          } else {
                            if (index == arr1.length - 1) {
                              strFiles += item.answerFileUrl
                            } else {
                              strFiles += item.answerFileUrl + ','
                            }
                          }
                        })
                      }
                      // 批阅结果数组json
                      let resultJsonArray = [
                        {
                          // answerContent: payload.answerContent,
                          ifLast: ifLast,
                          isTrue: isTrue,
                          reviewResult: value,
                          reviewFile: strFiles,
                          reviewVoice: reviewVoice || null,
                          studentAnswerId: self.questionInfo.studentAnswerId,
                          studentAnswerReviewId:
                            (reviewList &&
                              reviewList[0] &&
                              reviewList[0].studentAnswerReviewId) ||
                            null
                        }
                      ]

                      self.teacherAllReview(resultJsonArray, isD)
                    }
                  })
              }
            })
        } else if (self.reviewVoice) {
          let fd = new FormData()
          fd.append('file', self.reviewVoice)
          self.$http
            .post(
              `/teacherApi/upload/uploadCommonFile/voice/homework/${self.subjectAbbreviation}`,
              fd,
              {
                headers: {
                  upload: true
                }
              }
            )
            .then(({ data }) => {
              let reviewVoice = data.infos[0]
              // 批阅结果数组json
              let resultJsonArray = [
                {
                  // answerContent: payload.answerContent,
                  ifLast: ifLast,
                  isTrue: isTrue,
                  reviewResult: value,
                  // reviewFile: reviewFile,
                  reviewVoice: reviewVoice || null,
                  studentAnswerId: self.questionInfo.studentAnswerId,
                  studentAnswerReviewId:
                    (reviewList &&
                      reviewList[0] &&
                      reviewList[0].studentAnswerReviewId) ||
                    null
                }
              ]

              self.teacherAllReview(resultJsonArray, isD)
            })
        } else if (self.blob) {
          var str = {}
          var i = 0
          for (let key in self.blob) {
            let fd = new FormData()
            fd.append('file', self.blob[key])
            self.$http
              .post(
                `/teacherApi/upload/uploadCommonFile/img/homework/${self.subjectAbbreviation}`,
                fd,
                {
                  headers: {
                    upload: true
                  }
                }
              )
              .then(({ data }) => {
                let reviewFile = data.infos[0]
                str[key] = reviewFile
                var strFiles = ''
                i++
                if (i == Object.keys(self.blob).length) {
                  if (
                    self.techerReviewList.length > 0 &&
                    self.techerReviewList[0].reviewFile
                  ) {
                    var arr = self.techerReviewList[0].reviewFile.split(',')
                    arr.forEach((item, index) => {
                      if (str[index + 1] != undefined) {
                        strFiles += str[index + 1] + ','
                      } else {
                        if (index == arr.length - 1) {
                          strFiles += item
                        } else {
                          strFiles += item + ','
                        }
                      }
                    })
                  } else {
                    var arr1 = self.fileList
                    arr1.forEach((item, index) => {
                      if (str[index + 1] != undefined) {
                        strFiles += str[index + 1] + ','
                      } else {
                        if (index == arr1.length - 1) {
                          strFiles += item.answerFileUrl
                        } else {
                          strFiles += item.answerFileUrl + ','
                        }
                      }
                    })
                  }
                  // 批阅结果数组json
                  let resultJsonArray = [
                    {
                      // answerContent: payload.answerContent,
                      ifLast: ifLast,
                      isTrue: isTrue,
                      reviewResult: value,
                      reviewFile: strFiles,
                      // reviewVoice: reviewVoice || null,
                      studentAnswerId: self.questionInfo.studentAnswerId,
                      studentAnswerReviewId:
                        (reviewList &&
                          reviewList[0] &&
                          reviewList[0].studentAnswerReviewId) ||
                        null
                    }
                  ]

                  self.teacherAllReview(resultJsonArray, isD)
                  self.blob = null
                }
              })
          }
        } else {
          // 批阅结果数组json
          let resultJsonArray = [
            {
              // answerContent: payload.answerContent,
              ifLast: ifLast,
              isTrue: isTrue,
              reviewResult: value,
              // reviewFile: reviewFile,
              // reviewVoice: reviewVoice || null,
              studentAnswerId: self.questionInfo.studentAnswerId,
              studentAnswerReviewId:
                (reviewList &&
                  reviewList[0] &&
                  reviewList[0].studentAnswerReviewId) ||
                null
            }
          ]

          self.teacherAllReview(resultJsonArray, isD)
        }
      })
    },
    computedNextHomeworkQuestionId() {
      // 计算下个试题ID、下个学生ID
      this.nextHomeworkQuestionId = null

      let currentIndex = null
      this.noRewiveList.forEach((item, index) => {
        if (item.homeworkQuestionId === this.homeworkQuestionId) {
          currentIndex = index
        }
      })

      if (currentIndex === null) {
        this.nextHomeworkQuestionId =
          this.noRewiveList[0] && this.noRewiveList[0].homeworkQuestionId
      } else {
        if (currentIndex === this.noRewiveList.length - 1) {
          this.nextHomeworkQuestionId = this.noRewiveList[0].homeworkQuestionId
        } else {
          this.nextHomeworkQuestionId = this.noRewiveList[
            currentIndex + 1
          ].homeworkQuestionId
        }
      }
    },
    teacherAllReview(resultJsonArray, isD) {
      var self = this
      self.$store
        .dispatch('marking/teacherAllReview', {
          ifDone: 0,
          homeworkId: self.item.homeworkId,
          studentInfoId: self.student.studentInfoId,
          resultJsonArray: resultJsonArray
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            self.loading.close()
            self.blob = null
            if (isD) {
              self.handleGoList()
              return
            }
            if (self.rewiveType) {
              self.isDialog = false
            }
            // 计算下个试题I
            self.computedNextHomeworkQuestionId()
            self.$store.dispatch('marking/questionInfo')
            // 刷新试题详情数据
            self.$store
              .dispatch('marking/getQuestionList', {
                homeworkId: self.item.homeworkId,
                studentInfoId: self.student.studentInfoId
              })
              .then(() => {
                if (self.noRewiveList.length === 0) {
                  // 刷新当前学生列表
                  self.noRewiveStudentList.forEach((item, index) => {
                    if (item.studentInfoId === self.student.studentInfoId) {
                      if (index === self.noRewiveStudentList.length - 1) {
                        self.nextStudentInfoId =
                          self.noRewiveStudentList[0].studentInfoId
                      } else {
                        self.nextStudentInfoId =
                          self.noRewiveStudentList[index + 1].studentInfoId
                      }

                      self.noRewiveStudentList.splice(index, 1)
                    }
                  })
                  if (self.noRewiveStudentList.length > 0 && self.isDialog) {
                    self.isDialog = false
                    // 打开下个学生模态框
                    self.noReviewStudent = true
                  } else if (self.isDialog) {
                    self.isDialog = false
                    self.noStudent = true
                  }
                } else {
                  self.computedNextQuestion()
                }
              })
          }
        })
    },
    computedNextQuestion() {
      var self = this
      self.$store.commit(
        'marking/UPDATEHOMEWORKQUESTIONID',
        self.nextHomeworkQuestionId
      )
      // 获取对应试题ID的作业详情
      self.$store.dispatch('marking/questionInfo')

      self.$store.dispatch('marking/getQuestionList', {
        homeworkId: self.item.homeworkId,
        studentInfoId: self.student.studentInfoId
      })
    },
    nextStudent() {
      this.isDialog = true
      //  关闭下个学生模态框
      this.noReviewStudent = false

      let studentName
      this.studentList.forEach(item => {
        if (item.studentInfoId === this.nextStudentInfoId) {
          studentName = item.studentName
        }
      })
      this.$store.commit('marking/STUDENTNAME', studentName)
      this.isShowNextStudent = false
      // 初始化下个学生的信息
      this.$store
        .dispatch('marking/getQuestionList', {
          homeworkId: this.item.homeworkId,
          studentInfoId: this.nextStudentInfoId
        })
        .then(data => {
          if (data.flag === 1) {
            // 批阅试题列表
            let list = data.infos.homeworkQuestionList
            this.$store.commit('marking/STUDENTINFOID', this.nextStudentInfoId)
            // 主观题列表
            let subjectivelist = list.filter(item => item.questionType === 1)
            // 客观题列表
            let objectiveslist = list.filter(item => item.questionType === 2)
            // 设置列表中默认的作业试题ID
            let homeworkQuestionId = subjectivelist[0]
              ? subjectivelist[0].homeworkQuestionId
              : objectiveslist[0].homeworkQuestionId

            this.$store.commit(
              'marking/UPDATEHOMEWORKQUESTIONID',
              homeworkQuestionId
            )
            // 获取对应试题ID的作业详情
            this.$store.dispatch('marking/questionInfo')

            // 更改this.student
            this.studentList.forEach(item => {
              if (item.studentInfoId === this.nextStudentInfoId) {
                localforage.setItem('student', item).then(student => {
                  this.student = student
                })
              }
            })
          }
        })
    },
    // 显示收藏框
    handleCollect() {
      this.isShowCollect = true
    },
    handleCancleCollect() {
      this.$http
        .get('/api/collection/teacher/delCollection', {
          params: {
            teacherQuestionCollectionId: this.questionInfo
              .teacherQuestionCollectonId
          }
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.$message.success('取消收藏成功')
            this.$store.dispatch('marking/questionInfo')
          } else {
            this.$message.error('取消收藏失败')
          }
        })
    },
    handleLeft() {
      var self = this
      setTimeout(function() {
        if (self.picIndex === 1) return
        self.picIndex -= 1
      })
    },
    handleRight(maxLength) {
      var self = this
      setTimeout(function() {
        if (self.picIndex === maxLength) return
        self.picIndex += 1
      })
    }
  },
  mounted() {
    // this.$nextTick().then(() => {
    //   var that = this
    //   $('.question-main img').click(function() {
    //     that.picflag = true
    //     that.imgArr = []
    //     that.imgArr.push($(this).attr('src'))
    //   })
    // })
    // 判断是否重批
    localforage.getItem('item').then(item => {
      localforage.getItem('list').then(list => {
        localforage.getItem('student').then(student => {
          this.item = item
          this.studentList = list
          this.student = student
          this.rewiveType =
            this.student.reviewType === 1 ||
            this.student.reviewType === 4 ||
            (this.student.reviewType === 2 && this.count === 0)

          // 待批阅学生列表
          let result
          if (this.student.reviewType === 0) {
            result = this.studentList.filter(
              item =>
                item.reviewType === this.student.reviewType &&
                item.reviewType === 0 &&
                item.submitType === 3
            )
          } else {
            result = this.studentList.filter(
              item =>
                item.homeworkIsappeal === this.student.homeworkIsappeal &&
                item.homeworkIsappeal === 1 &&
                item.submitType === 3
            )
          }
          this.noRewiveStudentList = result
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.share {
  position: absolute;
  right: 2%;
  top: 10%;
  z-index: 999;
  color: #999;
  padding: 6px 20px;
  background: #f7f7f7;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  span {
    color: #8493a8;
    font-size: 14px;
  }
  span.hover-span {
    color: #ff971d;
  }
}
.subjectivity-question {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .top-wrap {
    // width: 100%;
    flex: 0 0 118px;
    height: 118px;
    position: relative;
    z-index: 999;
    margin-right: -10px;
    margin-left: -10px;

    .question-top {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
      border-radius: 4px;
      padding: 0 10px;
      position: absolute;
      top: 0;
      left: 0;
      .header {
        width: 100%;
        height: 40px;
        flex: 0 0 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        .left {
          display: flex;
          align-items: center;
          div {
            padding: 0 20px;
            span:first-child {
              font-size: 12px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              margin-right: 10px;
            }
            span:last-child {
              font-size: 16px;
              font-weight: 400;
              color: rgba(94, 132, 173, 1);
            }
          }
          div:first-child {
            padding-left: 0;
          }
          div:not(:last-child) {
            border-right: 1px solid #eee;
          }
        }
        .right {
          cursor: pointer;
          img {
            width: 16px;
            height: 14px;
            margin-right: 10px;
          }
          .cancle {
            width: 30px;
            height: auto;
            margin-right: 5px;
          }
        }
      }
      .question-main {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        height: 48px;
        overflow: hidden;
        .question-stem {
          display: flex;
          .topic {
            margin-right: 10px;
            flex: 0 0 44px;
            width: 44px;
            height: 24px;
            line-height: 24px;
            background: rgba(86, 172, 255, 1);
            border-radius: 0px 12px 12px 0px;
            padding-left: 5px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .stem {
            flex: auto;
            font-size: 16px;
            font-weight: 400;
            color: rgba(78, 95, 113, 1);
            word-break: break-all;
          }
        }
        .reference,
        .analysis {
          padding: 20px;
          font-size: 14px;
          .topic {
            margin-top: 30px;
            width: 64px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            background: rgba(86, 172, 255, 1);
            border-radius: 12px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 20px;
          }
          .gap-fill {
            li {
              display: flex;
            }
          }
        }
      }

      .show {
        height: auto;
        overflow: auto;
      }
      .footer {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        img {
          height: 14px;
          width: 14px;
          margin-right: 5px;
        }
      }
    }
  }
  .main {
    flex: auto;
    height: 100%;
    width: 100%;
    position: relative;
    .canvas {
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 30px;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .default-pic {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        img {
          margin-bottom: 20px;
        }
      }
      .pagination {
        position: absolute;
        right: 0;
        bottom: 0;
        ul {
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(223, 223, 223, 1);
          li {
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          li:nth-child(2) {
            width: auto;
            min-width: 34px;
            border-right: 1px solid rgba(223, 223, 223, 1);
            border-left: 1px solid rgba(223, 223, 223, 1);
            padding: 0 5px;
            span {
              color: #339bff;
            }
          }
        }
      }
    }
  }
  .review-toolbar {
    width: 88px;
    position: absolute;
    top: 0;
    right: 0;
    .complete {
      width: 88px;
      height: 64px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(16, 89, 255, 1);
      box-shadow: 0px 8px 9px 0px rgba(16, 17, 99, 0.16);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 10px;
      p {
        font-size: 18px;
        font-weight: 400;
        color: rgba(16, 89, 255, 1);
      }
    }
    .stay {
      width: 88px;
      height: 54px;
      background: #fef28f;
      border: 1px solid #ffe400;
      border-radius: 12px 12px 0px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;
      margin-bottom: 10px;
      p:first-child {
        font-size: 28px;
        font-weight: 400;
        color: rgba(240, 113, 36, 1);
      }
      p:last-child {
        font-size: 14px;
        font-weight: 400;
        color: rgba(240, 113, 36, 1);
      }
    }
    .my-graded {
      width: 88px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(223, 223, 223, 1);
      box-shadow: 0px 8px 20px 0px rgba(186, 213, 238, 0.29);
      margin-bottom: 10px;
      h3 {
        height: 40px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(88, 104, 120, 1);
        line-height: 40px;
        text-align: center;
      }
      .gradedList {
        width: 100%;
        max-height: 200px;
        // padding: 0 0 10px;
        overflow-y: auto;
        .full {
          color: #53bbb3;
        }
        .active {
          background-color: rgba(16, 89, 255, 1);
          color: #fff;
        }
        li {
          width: 76px;
          height: 38px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(185, 185, 185, 1);
          box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
          border-radius: 19px;
          margin: 10px auto;
          line-height: 38px;
          text-align: center;
          font-size: 26px;
          font-weight: 400;
          color: rgba(16, 89, 255, 1);
          cursor: pointer;
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .leave-message {
      width: 88px;
      height: 106px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(223, 223, 223, 1);
      box-shadow: 0px 8px 20px 0px rgba(186, 213, 238, 0.29);
      border-radius: 0px 0px 12px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 10px;
    }
    .next-student {
      width: 82px;
      height: 82px;
      margin: 0 auto;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: linear-gradient(
        -30deg,
        rgba(13, 17, 125, 1),
        rgba(4, 15, 181, 1)
      );
      box-shadow: 0px 8px 20px 0px rgba(16, 17, 99, 0.31);

      font-size: 18px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 20px;
    }
  }
}
.read-over {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 180px;
  p {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(61, 77, 101, 1);
  }
  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  div {
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    span:first-child {
      display: inline-block;
      width: 100px;
      color: #ddd;
      margin-left: 120px;
    }
    span:last-child {
      color: #fda157;
    }
  }
  div:last-child {
    text-align: center;
  }

  button {
    margin-top: 20px;
    width: 160px;
    height: 36px;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
  }
  button:first-child {
    margin-right: 20px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(16, 89, 255, 1);
    box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
    color: #1059ff;
  }
  button:last-child {
    background: #1059ff;
    color: #fff;
    box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
  }
}
</style>
