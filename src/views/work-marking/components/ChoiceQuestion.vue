<template>
  <div class="answer">
    <div class="wrap">
      <div class="reference-version">
        <h3>参考答案</h3>
        <ul class="reference-version-list">
          <li
            v-for="(item, index) of questionInfo.optionsList"
            :key="index"
            :class="
              questionInfo.questionAnswer.indexOf(item.questionOption) !== -1
                ? 'avtive'
                : ''
            "
          >
            <span>{{ item.questionOption }} </span>
            <span v-html="item.questionContent" class="text"></span>
          </li>
        </ul>
      </div>
      <div class="student-answers">
        <h3>学生答案</h3>
        <ul class="reference-version-list">
          <li
            v-for="(item, index) of questionInfo.optionsList"
            :key="index"
            :class="[
              questionInfo.answerContent.indexOf(item.questionOption) !== -1 &&
              questionInfo.questionAnswer.indexOf(item.questionOption) !== -1
                ? 'active'
                : '',
              questionInfo.answerContent.indexOf(item.questionOption) !== -1 &&
              questionInfo.questionAnswer.indexOf(item.questionOption) === -1
                ? 'warn'
                : ''
            ]"
          >
            <span>{{ item.questionOption }} </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="answers-mark">
      <button>正确答案</button>
      <button>错误答案</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['questionInfo'],
  data() {
    return {}
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
  padding-top: 116px;
  padding-left: 16px;
  overflow: hidden;
  .wrap {
    width: 100%;
    overflow: hidden;
    display: flex;
  }
  .reference-version {
    width: 265px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    // position: absolute;
    // top: 116px;
    // left: 16px;
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
        background: rgba(240, 240, 240, 1);

        border-radius: 5px;
        margin-bottom: 8px;
        padding: 0 10px;
        line-height: 50px;
        font-size: 16px;
        display: flex;
        align-items: center;
        word-break: break-all;
        span {
          margin-right: 10px;
        }
        span:last-child {
          color: #fd6265;
        }
      }
      .avtive {
        background: rgba(221, 221, 221, 1);
        span:last-child {
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
    display: flex;
    flex-direction: column;
    h3 {
      height: 40px;
      flex: 0 0 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      color: rgba(78, 95, 113, 1);
    }
    .reference-version-list {
      flex: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      li {
        width: 100%;
        // height: 50px;
        flex: 1;
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
    // position: absolute;
    // top: 430px;
    // left: 16px;
    margin-top: 30px;
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
