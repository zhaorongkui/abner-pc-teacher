<template>
  <div class="answer">
    <div class="answer-true">
      <h3>参考答案</h3>
      <div>{{ questionInfo.questionAnswer === "Y" ? "正确" : "错误" }}</div>
    </div>
    <div class="answer-false">
      <h3>学生答案</h3>
      <div
        :class="
          questionInfo.answerContent !== questionInfo.questionAnswer
            ? 'right'
            : 'wrong'
        "
      >
        {{ questionInfo.answerContent === "Y" ? "正确" : "错误" }}
      </div>
    </div>
    <div class="answer-result">
      <template
        v-if="questionInfo.answerContent === questionInfo.questionAnswer"
      >
        <img src="../../../assets/img/publish/result_right.png" alt="" />
        <span class="right">做对了</span>
      </template>
      <template v-else>
        <img src="../../../assets/img/publish/result_wrong.png" alt="" />
        <span class="wrong">做错了</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["questionInfo"],
  data() {
    return {};
  }
};
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
  padding: 116px 0 0 124px;
  display: flex;

  .answer-true {
    width: 86px;
    height: 96px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    margin-right: 12px;
    h3 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(78, 95, 113, 1);
      text-align: center;
      padding: 10px 0;
    }
    > div {
      width: 74px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto;
      background: rgba(221, 221, 221, 1);
      border-radius: 12px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(78, 95, 113, 1);
    }
  }
  .answer-false {
    width: 86px;
    height: 96px;
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    margin-right: 12px;
    h3 {
      font-size: 14px;
      font-weight: 400;
      color: rgba(78, 95, 113, 1);
      text-align: center;
      padding: 10px 0;
    }
    > div {
      width: 74px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto;
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      border-radius: 12px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(78, 95, 113, 1);
    }
    .right {
      border: 1px solid #13a99f;
      background-color: #c4f3f0;
    }
    .wrong {
      background-color: #ffebeb;
      border: 1px solid rgba(255, 99, 101, 1);
    }
  }
  .answer-result {
    height: 96px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 12px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
    span {
      margin-bottom: 6px;
    }
    .right {
      color: #13a99f;
    }
    .wrong {
      color: rgba(255, 99, 101, 1);
    }
  }
}
</style>
