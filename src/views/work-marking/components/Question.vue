<template>
  <div class="question">
    <template v-if="questionInfo.questionProperty === 2">
      <div class="header">
        <div class="left">
          <div>
            <span>练习册名称</span>
            <span>{{ questionInfo.workbookName }}</span>
          </div>
          <div>
            <span>页数</span><span>{{ questionInfo.workbookChapterPage }}</span>
          </div>
          <div>
            <span>题号</span><span>{{ questionInfo.questionNumber }}</span>
          </div>
          <div>
            <span>题型</span><span>{{ questionInfo.questionYytypeName }}</span>
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
            style="width:26px;height:26px"
          />
          <span>取消收藏</span>
        </div>
      </div>
      <!-- 客观题 -->
      <div class="content" v-if="questionInfo.questionProperty === 2">
        <div class="question" v-if="questionInfo.questionTypeCode === 4">
          <div class="question-stem">
            <div class="topic">题目</div>
            <div class="stem" v-html="questionInfo.questionStem"></div>
          </div>
          <div
            class="question-item"
            v-for="(questionInfo, index) of questionInfo.childQuestionList"
            :key="index"
          >
            <div class="question-stem">
              <div class="topic">题目</div>
              <div class="stem" v-html="questionInfo.questionStem"></div>
            </div>
            <div class="reference">
              <div class="topic">参考答案</div>
              <div class="stem" v-if="questionInfo.questionTypeCode === 5">
                <ul>
                  <li
                    v-for="(item, index) of JSON.parse(
                      questionInfo.questionAnswer
                    )"
                    :key="index"
                  >
                    <template v-for="(answer, innerIndex) of item.answer">
                      <span :key="innerIndex">
                        {{ index + 1 }}、{{ answer }}
                        <span v-if="innerIndex + 1 !== item.answer.length"
                          >或</span
                        ></span
                      >
                    </template>
                  </li>
                </ul>
              </div>
              <div class="stem" v-else>
                {{ questionInfo.questionAnswer }}
              </div>
            </div>
            <div class="analysis">
              <div class="topic">解析</div>
              <div class="stem" v-html="questionInfo.questionAnalysis"></div>
            </div>
          </div>
        </div>
        <div class="question" v-else>
          <div class="question-stem">
            <div class="topic">题目</div>
            <div class="stem" v-html="questionInfo.questionStem"></div>
          </div>
          <!-- <div
          class="option"
          v-if="
            questionInfo.questionTypeCode === 1 ||
              questionInfo.questionTypeCode === 2
          "
        >
          <div class="topic">选项</div>
          <ul>
            <li v-for="(item, index) of questionInfo.optionsList" :key="index">
              <span>{{ item.questionOption }} </span>、
              <span v-html="item.questionContent"></span>
            </li>
          </ul>
        </div> -->
          <div class="reference">
            <div class="topic">参考答案</div>
            <div class="stem" v-if="questionInfo.questionTypeCode === 5">
              <ul>
                <li
                  v-for="(item, index) of JSON.parse(
                    questionInfo.questionAnswer
                  )"
                  :key="index"
                >
                  {{ index + 1 }}、
                  <template v-for="(answer, innerIndex) of item.answer">
                    <span :key="innerIndex">
                      {{ answer }}
                      <span v-if="innerIndex + 1 !== item.answer.length"
                        >或</span
                      ></span
                    >
                  </template>
                </li>
              </ul>
            </div>
            <div class="stem" v-else-if="questionInfo.questionTypeCode === 3">
              {{ questionInfo.questionAnswer === 'Y' ? '正确' : '错误' }}
            </div>
            <div class="stem" v-else>
              {{ questionInfo.questionAnswer }}
            </div>
          </div>
          <div class="analysis">
            <div class="topic">解析</div>
            <div class="stem" v-html="questionInfo.questionAnalysis"></div>
          </div>
        </div>

        <!-- 选择题 -->
        <ChoiceQuestion
          :questionInfo="questionInfo"
          v-if="
            questionInfo.questionTypeCode === 1 ||
              questionInfo.questionTypeCode === 2
          "
        ></ChoiceQuestion>

        <!-- 判断题 -->
        <TrueOrFalseQuestions
          :questionInfo="questionInfo"
          v-else-if="questionInfo.questionTypeCode === 3"
        ></TrueOrFalseQuestions>
        <!-- 填空题 -->
        <GapFillingQuestion
          :questionInfo="questionInfo"
          v-else-if="questionInfo.questionTypeCode === 5"
        >
        </GapFillingQuestion>
        <!-- 题组 -->
        <QuestionGroup
          :questionInfo="questionInfo"
          v-else-if="questionInfo.questionTypeCode === 4"
        ></QuestionGroup>
      </div>
    </template>
    <!-- 主观题 -->
    <template v-if="questionInfo.questionProperty === 1">
      <!-- 填空主观题 -->
      <template
        v-if="questionInfo.questionTypeCode === 5 && questionInfo.answerContent"
      >
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
              style="width:26px;height:26px"
            />
            <span>取消收藏</span>
          </div>
        </div>
        <div class="content">
          <div class="question">
            <div class="question-stem">
              <div class="topic">题目</div>
              <div class="stem" v-html="questionInfo.questionStem"></div>
            </div>
            <div class="reference">
              <div class="topic">参考答案</div>
              <div class="stem" v-if="questionInfo.questionTypeCode === 5">
                <ul>
                  <li
                    v-for="(item, index) of JSON.parse(
                      questionInfo.questionAnswer
                    )"
                    :key="index"
                    :style="{ display: 'flex' }"
                  >
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
              </div>
              <div class="stem" v-else-if="questionInfo.questionTypeCode === 3">
                {{ questionInfo.questionAnswer === 'Y' ? '正确' : '错误' }}
              </div>
              <div class="stem" v-else>
                {{ questionInfo.questionAnswer }}
              </div>
            </div>
            <div class="analysis">
              <div class="topic">解析</div>
              <div class="stem" v-html="questionInfo.questionAnalysis"></div>
            </div>
          </div>
          <FillinTheBlanks
            :item="item"
            :student="student"
            :questionInfo="questionInfo"
          ></FillinTheBlanks>
        </div>
      </template>
      <!-- 常规主观题 -->
      <template v-else>
        <SubjectivityQuestion
          :questionInfo="questionInfo"
        ></SubjectivityQuestion>
      </template>
    </template>
    <CollectonModal
      v-if="isShowCollect"
      :item="item"
      @onHideCollect="handleHideCollect"
      :questionInfo="questionInfo"
    ></CollectonModal>

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
import imageView from 'vue-imageview'
import $ from 'jquery'
import ChoiceQuestion from './ChoiceQuestion'
import TrueOrFalseQuestions from './TrueOrFalseQuestions'
import GapFillingQuestion from './GapFillingQuestion'
import QuestionGroup from './QuestionGroup'
import SubjectivityQuestion from './SubjectivityQuestion'
import FillinTheBlanks from './FillinTheBlanks'
import CollectonModal from './CollectonModal'
export default {
  name: '',
  components: {
    ChoiceQuestion,
    TrueOrFalseQuestions,
    GapFillingQuestion,
    QuestionGroup,
    SubjectivityQuestion,
    FillinTheBlanks,
    CollectonModal,
    imageView
  },
  // 获取作业列表单元信息 item
  // 学生列表单元信息 student
  props: ['item', 'student'],
  data() {
    return {
      isShowCollect: false,
      picflag: false,
      imgArr: [],
      imageIndex: 0
    }
  },
  computed: {
    // 批阅作业详情
    questionInfo() {
      return this.$store.state.marking.questionInfo
    }
  },
  watch: {
    questionInfo(val) {
      if (JSON.stringify(val) != '{}') {
        this.$nextTick().then(() => {
          var that = this
          $('.question-main img').click(function() {
            that.picflag = true
            that.imgArr = []
            that.imgArr.push($(this).attr('src'))
          })
          $('.reference img').click(function() {
            that.picflag = true
            that.imgArr = []
            that.imgArr.push($(this).attr('src'))
          })
        })
        this.$nextTick().then(() => {
          var that = this
          $('.stem img').click(function() {
            that.picflag = true
            that.imgArr = []
            that.imgArr.push($(this).attr('src'))
          })
        })
        this.$nextTick().then(() => {
          var that = this
          $('.reference-version-list img').click(function() {
            that.picflag = true
            that.imgArr = []
            that.imgArr.push($(this).attr('src'))
          })
        })

        this.$nextTick().then(() => {
          var that = this
          $('.analysis img').click(function() {
            that.picflag = true
            that.imgArr = []
            that.imgArr.push($(this).attr('src'))
          })
        })
      }
    }
  },
  mounted() {},
  methods: {
    hideImageView() {
      this.picflag = false
    },
    // 显示收藏框
    handleCollect() {
      this.isShowCollect = true
    },
    // 隐藏收藏模态框
    handleHideCollect() {
      this.isShowCollect = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  width: 950px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  .header {
    width: 100%;
    height: 40px;
    flex: 0 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
      img {
        width: 16px;
        height: 14px;
        margin-right: 10px;
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .question {
      width: 540px;
      height: 100%;
      overflow-y: auto;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      .question-item {
        width: 90%;
        margin: 10px auto;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 222, 222, 1);
        box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }
      .question-stem {
        padding: 20px;
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
      .option {
        width: 100%;
        padding: 20px;
        .topic {
          margin-right: 10px;
          flex: 0 0 44px;
          width: 44px;
          height: 24px;
          line-height: 24px;
          background: rgba(86, 172, 255, 1);
          border-radius: 12px;
          text-align: center;
          line-height: 24px;

          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        ul {
          margin-top: 20px;
          li {
            display: flex;
          }
        }
      }
      .reference,
      .analysis {
        padding: 20px;
        font-size: 14px;
        .topic {
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
      }
    }
    .answer {
      width: 440px;
      height: 100%;
      overflow-y: auto;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      position: relative;
      .question-index {
        position: absolute;
        top: 24px;
        left: 20px;
        h3 {
          font-size: 14px;
          font-weight: bold;
          color: rgba(94, 132, 173, 1);
        }
        ul {
          display: flex;
          margin-top: 10px;
          li {
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: rgba(255, 255, 255, 1);
            border: 2px solid rgba(214, 225, 229, 1);
            border-radius: 8px;
            margin-right: 10px;
          }
        }
      }
      .reference-version {
        width: 265px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(185, 185, 185, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 12px;
        position: absolute;
        top: 116px;
        left: 16px;
        h3 {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          color: rgba(78, 95, 113, 1);
        }
        .reference-version-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 10px;

          li {
            width: 100%;
            min-height: 50px;
            background: rgba(221, 221, 221, 1);
            border-radius: 5px;
            margin-bottom: 8px;
            padding: 0 10px;
            line-height: 50px;
            font-size: 16px;
          }
        }
      }
      .student-answers {
        width: 90px;
        // height: 268px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(185, 185, 185, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 12px;
        position: absolute;
        top: 116px;
        left: 294px;
        h3 {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          color: rgba(78, 95, 113, 1);
        }
        .reference-version-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          li {
            width: 100%;
            height: 50px;
            background: rgba(221, 221, 221, 1);
            border-radius: 5px;
            margin-bottom: 8px;
            padding: 0 10px;
            line-height: 50px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
        }
      }
      .answers-mark {
        position: absolute;
        top: 430px;
        left: 16px;
        button:first-child {
          width: 58px;
          height: 21px;
          background: rgba(19, 169, 159, 1);
          border-radius: 4px;
          color: #fff;
          margin-right: 10px;
        }
        button:last-child {
          width: 58px;
          height: 21px;
          background: rgba(253, 98, 101, 1);
          border-radius: 4px;
          color: #fff;
        }
      }
    }
  }
}
</style>
