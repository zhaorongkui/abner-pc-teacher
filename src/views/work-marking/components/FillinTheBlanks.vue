<template>
  <div class="answer">
    <div class="reference-answer">
      <h3>参考答案</h3>
      <ul>
        <li v-for="(item, index) of questionAnswer" :key="index">
          <div class="index">{{ index + 1 }}、</div>
          <p v-for="(value, index) of item.answer" :key="index">
            <span v-if="item.property === 1" v-html="decodeURIComponent(value)">
            </span>
            <span v-else>
              {{ value }}
            </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="student-answer">
      <h3>学生答案</h3>
      <ul>
        <template v-if="subjectAbbreviation === 'yingyu'">
          <li
            v-for="(item, index) of answerContent"
            :key="index"
            :class="
              (item.questionTeacherScore || item.questionStudentScore) ===
              questionAnswer[index].score
                ? 'active'
                : 'warn'
            "
          >
            <template v-if="item.type === '1'">
              <img :src="item.answer" alt="" />
            </template>
            <template v-else>
              {{ item.answer }}
            </template>
          </li>
        </template>
        <template v-else>
          <li
            v-for="(item, index) of answerContent"
            :key="index"
            :class="
              (item.questionTeacherScore || item.questionStudentScore) === '2'
                ? 'active'
                : 'warn'
            "
          >
            <p></p>
            <template v-if="item.type === '1'">
              <img :src="item.answer" alt="" />
            </template>
            <template v-else>
              {{ item.answer }}
            </template>
          </li>
        </template>
      </ul>
    </div>
    <div class="result">
      <h3></h3>
      <ul>
        <li v-for="(item, index) of state" :key="index">
          <template v-if="item === true">
            <img
              @click="handleScore(2)"
              src="../../../assets/img/publish/result_right.png"
              alt=""
            />
            <img
              @click="handleScore(0)"
              src="../../../assets/img/publish/title_wrong.png"
              alt=""
            />
          </template>
          <template v-else-if="item === false">
            <img
              @click="handleScore(2)"
              src="../../../assets/img/publish/title_right.png"
              alt=""
            />
            <img
              @click="handleScore(0)"
              src="../../../assets/img/publish/result_wrong.png"
              alt=""
            />
          </template>
          <template v-else>
            <img
              @click="handleScore(2)"
              src="../../../assets/img/publish/title_right.png"
              alt=""
            />
            <img
              @click="handleScore(0)"
              src="../../../assets/img/publish/title_wrong.png"
              alt=""
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['questionInfo', 'item', 'student'],
  data() {
    return {}
  },
  computed: {
    questionListInfo() {
      return this.$store.state.marking.questionListInfo
    },
    questionAnswer() {
      return (
        this.questionInfo.questionAnswer &&
        JSON.parse(this.questionInfo.questionAnswer)
      )
    },
    answerContent() {
      return (
        this.questionInfo.answerContent &&
        JSON.parse(this.questionInfo.answerContent)
      )
    },
    state() {
      let result = []
      this.questionAnswer.forEach((outItem, outIndex) => {
        this.answerContent.forEach((innerItem, innerIndex) => {
          if (outIndex === innerIndex) {
            if (this.subjectAbbreviation === 'yingyu') {
              if (
                innerItem.questionTeacherScore ||
                innerItem.questionStudentScore
              ) {
                if (
                  (innerItem.questionTeacherScore ||
                    innerItem.questionStudentScore) ===
                  this.questionAnswer[innerIndex].score
                ) {
                  result.push(true)
                } else {
                  result.push(false)
                }
              } else {
                result.push(-1)
              }
            } else {
              if (
                innerItem.questionTeacherScore ||
                innerItem.questionStudentScore
              ) {
                if (
                  (innerItem.questionTeacherScore ||
                    innerItem.questionStudentScore) === '2'
                ) {
                  result.push(true)
                } else {
                  result.push(false)
                }
              } else {
                result.push(-1)
              }
            }
          }
        })
      })
      console.log(result)
      return result
    },
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    },
    subjectivelist() {
      return (
        (this.list && this.list.filter(item => item.questionType === 1)) || []
      )
    },
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
    }
  },
  methods: {
    compareText(textOne, textTwo) {
      var arrText = [textOne, textTwo]
      var arrValue = []
      var arr
      var reg = /((\b)[’'](m|s|re|d|ll))|(n’t|n't)|([：:；;，,。.！!？?…()（）—\-‘’“”"'])|(\s|\t|\r|\n)/g
      for (var i = 0; i < arrText.length; i++) {
        var value = arrText[i]
        while ((arr = reg.exec(arrText[i])) != null) {
          //exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。
          var groupValue = arr[0]
          if (groupValue.indexOf('m') > 0) {
            value = value.replace(groupValue, 'am')
          } else if (groupValue.indexOf('s') > 0) {
            value = value.replace(groupValue, 'is')
          } else if (groupValue.indexOf('re') > 0) {
            value = value.replace(groupValue, 'are')
          } else if (groupValue.indexOf('d') > 0) {
            value = value.replace(groupValue, 'had')
          } else if (groupValue.indexOf('ll') > 0) {
            value = value.replace(groupValue, 'will')
          } else if (groupValue == 'n’t' || groupValue == "n't") {
            value = value.replace(groupValue, 'not')
          } else {
            value = value.replace(groupValue, '')
          }
        }
        arrValue.push(value)
      }
      return arrValue[0] == arrValue[1]
    },
    hanldeReadOverOne(value) {
      // 判断英语学科
      // 是否最后一题
      let ifLast = 0
      if (this.count === 1) {
        this.subjectivelist.forEach(item => {
          if (item.homeworkQuestionId === this.homeworkQuestionId) {
            if (
              item.hasRewive === 0 ||
              (item.hasRewive === 1 && item.questionIsappeal === 1)
            ) {
              ifLast = 1
            }
          }
        })
      } else if (this.count > 1) {
        ifLast = 0
      } else {
        ifLast = 1
      }
      //批阅集合
      let reviewList = this.questionInfo.reviewList.filter(
        item => item.reviewUserType === 2
      )
      // 是否答对
      let isTrue
      // 批阅结果
      let reviewResult
      //	答案内容
      let answerContent

      //英语
      if (this.subjectAbbreviation === 'yingyu') {
        // 英语
        // isTrue = value === Number(this.questionInfo.questionScore) ? 0 : 1
      } else {
        // 非英语
        // isTrue = value === 2 ? 0 : value === 0 ? 0 : 1
      }
      // 批阅结果数组json
      let resultJsonArray = [
        {
          // answerContent: payload.answerContent,
          ifLast: ifLast,
          isTrue: isTrue,
          reviewResult: reviewResult,
          // reviewFile: payload.reviewFile,
          // reviewVoice: payload.reviewVoice,
          studentAnswerId: this.questionInfo.studentAnswerId,
          studentAnswerReviewId:
            (reviewList && reviewList.studentAnswerReviewId) || null
        }
      ]
      this.$store
        .dispatch('marking/teacherAllReview', {
          ifDone: 0,
          homeworkId: this.item.homeworkId,
          studentInfoId: this.student.studentInfoId,
          resultJsonArray: resultJsonArray
        })
        .then(({ data }) => {
          if (data.falg === 1) {
            this.$message.success('批阅成功')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  width: 440px;
  // height: 100%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 116px 0 10px 46px;
  overflow-y: auto;
  > div {
    width: 148px;
    margin-right: 12px;
    float: left;
    h3 {
      height: 41px;
      padding: 10px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: rgba(78, 95, 113, 1);
    }
    ul {
      height: auto;
      li {
        margin: 0 auto;
        width: 135px;
        height: 76px;
        border-radius: 5px;
        border: 1px solid #dddddd;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        word-break: break-all;
        .index {
          width: 27px;
          height: 32px;
          line-height: 32px;
          padding-left: 10px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(185, 185, 185, 1);
          box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
          border-radius: 16px 0px 0px 16px;
          position: absolute;
          top: 0;
          left: -34px;
          z-index: 1;
        }
      }
      .active {
        background-color: #c4f3f0;
        border: 1px solid rgba(19, 169, 159, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      }
      .warn {
        background-color: #ffebeb;
        border: 1px solid rgba(255, 99, 101, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      }
    }
  }
  > div:last-child {
    width: 32px;
    ul > li {
      margin: 0 auto;
      width: 32px;
      height: 76px;
      line-height: 76px;
      border-radius: 5px;
      border: 1px solid #dddddd;
      margin-bottom: 10px;
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      word-break: break-all;
      img {
        width: 32px;
        height: 32px;
      }
      img:last-child {
        margin-top: 5px;
      }
    }
  }
  .reference-answer {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
  }
  .student-answer {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
  }
}
</style>
