<template>
  <div class="question">
    <div class="question-stem">
      <QuestionHeader :questionInfo="questionInfo"></QuestionHeader>
      <div class="stem">
        <div class="question-header">
          <div class="title">
            <div>题目</div>
          </div>
          <div class="content" v-html="questionInfo.questionStem"></div>
        </div>
        <div class="question-body" v-show="isShow">
          fdlksfjlsjfdskljdklsjkldsaj
        </div>
      </div>
      <div class="expand">
        <div v-if="!isShow" @click="handleIsShow">
          <img
            src="../../../assets/img/ic_fabu_yulan_danci_zhankai@2x.png"
            alt=""
          />
          <span>展开</span>
        </div>
        <div v-else @click="handleIsShow">
          <img
            src="../../../assets/img/ic_fabu_yulan_danci_shouqi@2x.png"
            alt=""
          />
          <span>收起</span>
        </div>
      </div>
    </div>
    <div class="scrawl"></div>
  </div>
</template>

<script>
import QuestionHeader from './QuestionHeader'
export default {
  name: '',
  components: {
    QuestionHeader
    // AnswerResultsForPd
  },
  props: ['list'],
  data() {
    return {
      isShow: false
    }
  },

  computed: {
    questionInfo() {
      return this.$store.state.marking.questionInfo
    }
  },
  methods: {
    handleIsShow() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  flex: auto;
  height: 100%;
  position: relative;
  .question-stem {
    width: 100%;
    min-height: 112px;
    max-height: 100%;
    overflow-y: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    > .stem {
      flex: auto;
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      position: relative;
      .question-header {
        display: flex;
        .title {
          flex: 0 0 64px;
          > div {
            width: 44px;
            height: 24px;
            line-height: 24px;
            background: rgba(86, 172, 255, 1);
            border-radius: 0px 12px 12px 0px;
            padding-left: 10px;
            color: #fff;
            font-size: 12px;
          }
        }
        .content {
          flex: auto;
          font-size: 16px;
          font-weight: 400;
          color: rgba(78, 95, 113, 1);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .question-body {
        padding: 10px 10px 10px 64px;
        font-size: 14px;
        height: 200px;
      }
    }
    > .expand {
      flex: 0 0 30px;
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 14px;
          height: 14px;
          display: block;
          margin-right: 4px;
        }
      }
    }
  }
  .scrawl {
    width: 100%;
    position: absolute;
    top: 122px;
    left: 0;
    height: calc(100% - 122px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
    border-radius: 4px;
  }
}
</style>
