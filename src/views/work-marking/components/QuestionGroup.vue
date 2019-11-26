<template>
  <div class="answer">
    <div class="question-index">
      <h3>题号</h3>
      <ul>
        <li
          v-for="(item, index) of questionInfo.childQuestionList"
          :key="index"
          @click="handleIndex(index)"
          :class="currentIndex === index ? 'active' : ''"
        >
          {{ index + 1 }}
        </li>
      </ul>
    </div>
    <div class="reference-version">
      <h3>参考答案</h3>
      <ul class="reference-version-list">
        <li
          v-for="(item, index) of list.optionsList"
          :key="index"
          :class="
            list.questionAnswer.indexOf(item.questionOption) !== -1
              ? 'avtive'
              : ''
          "
        >
          <span>{{ item.questionOption }} </span>
          <div class="text" v-html="item.questionContent"></div>
        </li>
      </ul>
      <div class="answers-mark">
        <button>正确答案</button>
        <button>错误答案</button>
      </div>
    </div>
    <div class="student-answers">
      <h3>学生答案</h3>
      <ul class="reference-version-list">
        <li
          v-for="(item, index) of list.optionsList"
          :key="index"
          :class="[
            list.answerContent.indexOf(item.questionOption) !== -1 &&
            list.questionAnswer.indexOf(item.questionOption) !== -1
              ? 'active'
              : '',
            list.answerContent.indexOf(item.questionOption) !== -1 &&
            list.questionAnswer.indexOf(item.questionOption) === -1
              ? 'warn'
              : ''
          ]"
        >
          <div>{{ item.questionOption }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['questionInfo'],
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    list() {
      return this.questionInfo.childQuestionList[this.currentIndex]
    }
  },
  methods: {
    handleIndex(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
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
      flex-wrap: wrap;
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
      .active {
        background-color: #399eff;
        color: #fff;
        border: 2px solid #399eff;
      }
    }
  }
  .reference-version {
    width: 260px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    position: absolute;
    top: 140px;
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
      // display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      padding: 0 10px;

      li {
        flex: 0 0 50%;
        width: 100%;
        min-height: 50px;
        background: rgba(240, 240, 240, 1);
        border-radius: 5px;
        margin-bottom: 8px;
        padding: 0 10px 10px 10px;
        line-height: 50px;
        font-size: 16px;
        // display: flex;
        align-items: center;
        word-break: break-all;
        display: flex;
        padding: 5px;
        span {
          margin-right: 10px;
        }
        > div {
          width: 100%;
          // display: flex;
          display: block;
          color: #fd6265;
          height: 100%;
        }
      }
      .avtive {
        background: rgba(221, 221, 221, 1);
        div {
          color: #13a99f;
        }
      }
    }
  }
  .student-answers {
    width: 90px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    position: absolute;
    top: 140px;
    left: 280px;
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
      position: relative;
      li {
        width: 100%;
        height: 50px;
        background: rgba(221, 221, 221, 1);
        border-radius: 5px;
        margin-bottom: 8px;
        padding: 0 10px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(240, 240, 240, 1);
        word-break: break-all;
      }
      .active {
        background: #c4f3f0;
        border: 1px solid rgba(19, 169, 159, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        color: #4e5f71;
        position: relative;
      }
      .active::after {
        content: '';
        width: 32px;
        height: 32px;
        background-image: url('../../../assets/img/publish/result_right.png');
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        right: -52px;
        transform: translateY(-50%);
      }
      .warn {
        background: #ffebeb;
        border: 1px solid rgba(255, 99, 101, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        position: relative;
      }
      .warn::after {
        content: '';
        width: 32px;
        height: 32px;
        background-image: url('../../../assets/img/publish/result_wrong.png');
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        right: -52px;
        transform: translateY(-50%);
      }
    }
  }
  .answers-mark {
    position: absolute;
    bottom: -35px;
    left: 0px;
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
</style>
