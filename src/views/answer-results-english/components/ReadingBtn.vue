<template>
  <div class="reading-text-wrap">
    <div class="reading-text-btn">
      <div v-if="readSDentenceData.length != 0">
        <span>逐句跟读</span>
        <ul>
          <li
            v-for="(item, index) in readSDentenceData"
            :key="index"
            @click="selectStateZ(item.questionId, 'zj')"
            :class="selectStateTypeId == item.questionId ? 'hover-li' : ''"
          >
            <span
              :class="selectStateTypeId == item.questionId ? 'hover-span1' : ''"
              >{{ index + 1 }}</span
            >
            <span
              :class="selectStateTypeId == item.questionId ? 'hover-span2' : ''"
              >{{ item.topScore != undefined ? item.topScore : 0 }}分</span
            >
            <span
              class="yz"
              :class="selectStateTypeId == item.questionId ? 'hover-span3' : ''"
              v-if="item.answerState != undefined && item.answerState == 2"
              >已做</span
            >
            <span
              class="wz"
              v-if="item.answerState == undefined"
              :class="selectStateTypeId == item.questionId ? 'hover-span3' : ''"
              >未做</span
            >
            <span
              style=" border: 1px solid #ddd;
          color: #ddd"
              class="wz"
              v-if="item.answerState == 1"
              :class="selectStateTypeId == item.questionId ? 'hover-span3' : ''"
              >未完</span
            >
          </li>
        </ul>
      </div>
      <div
        v-if="readingTextData.length != 0 && readSDentenceData.length != 0"
      ></div>
      <div v-if="readingTextData.length != 0">
        <span>课文朗读</span>
        <ul>
          <li
            v-for="(item, index) in readingTextData"
            :key="index"
            @click="selectStateR(item.questionId, 'ld')"
            :class="selectStateTypeId == item.questionId ? 'hover-li' : ''"
          >
            <span
              :class="selectStateTypeId == item.questionId ? 'hover-span1' : ''"
              >{{ index + 1 + readSDentenceData.length }}</span
            >
            <span
              :class="selectStateTypeId == item.questionId ? 'hover-span2' : ''"
              >{{ item.topScore != undefined ? item.topScore : 0 }}分</span
            >
            <span
              class="yz"
              :class="selectStateTypeId == item.questionId ? 'hover-span3' : ''"
              v-if="item.answerState != undefined && item.answerState == 2"
              >已做</span
            >
            <span
              class="wz"
              :class="selectStateTypeId == item.questionId ? 'hover-span3' : ''"
              v-else
              >未做</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['readingTextData', 'readSDentenceData', 'selectStateType'],
  data() {
    return {
      show: true
    }
  },
  created() {},
  computed: {
    selectStateTypeId() {
      return this.selectStateType
    },
    videoQuestionStemList() {
      if (this.readSDentenceData.length == 0) {
        return this.readingTextData[0]
      }
      if (this.readingTextData.length == 0) {
        return this.readSDentenceData[0]
      }
      if (
        this.readingTextData.length == 0 &&
        this.readSDentenceData.length == 0
      ) {
        return []
      }
      if (
        this.readingTextData.length != 0 &&
        this.readSDentenceData.length != 0
      ) {
        return this.readSDentenceData[0]
      }
      return []
    }
  },
  components: {},
  mounted() {},
  methods: {
    selectStateZ(id, type) {
      this.$emit('toParentsEvent', id, type)
    },
    selectStateR(id, type) {
      this.$emit('toParentsEvent', id, type)
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.reading-text-wrap {
  @include wh(130px, 100%);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  flex: 0 0 130px;
  .reading-text-btn {
    @include wh(100%, 100%);
    padding: 10px;
    > div {
      max-height: 50%;
      > span {
        @include sc(14px, #586878);
      }
      ul {
        margin-top: 10px;
        max-height: 47%;
        overflow: scroll;
      }
      ul li {
        @include wh(104px, 46px);
        background: rgba(255, 255, 255, 1);
        border: 1px solid #b9b9b9;
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 5px 23px 23px 5px;
        margin-bottom: 5px;
        @include fj();
        align-items: center;
        padding: 0 5px;
        cursor: pointer;
        span:nth-child(1) {
          @include sc(14px, #bdbebe);
        }
        span:nth-child(2) {
          @include sc(16px, #586878);
        }
        span.yz {
          @include wh(32px, 32px);
          text-align: center;
          line-height: 32px;
          @include sc(12px, rgba(19, 169, 159, 1));
          border: 1px solid rgba(19, 169, 159, 1);
          border-radius: 50%;
        }
        span.wz {
          @include wh(32px, 32px);
          text-align: center;
          line-height: 32px;
          border: 1px solid rgba(253, 161, 87, 1);
          color: rgba(253, 161, 87, 1);
          border-radius: 50%;
        }
        span:nth-child(1).hover-span1 {
          color: #fff;
        }
        span:nth-child(2).hover-span2 {
          color: #fff;
        }
        span:nth-child(3).hover-span3 {
          background: #fff;
          border: 0;
        }
      }
      li.hover-li {
        width: 110px;
        transition: all 0.2s;
        background: #1059ff;
        color: #fff;
        border: 0;
      }
    }
    > div:nth-child(2) {
      @include wh(100%, 1px);
      background: rgba(235, 235, 235, 1);
      margin: 20px 0;
    }
  }
}
</style>
