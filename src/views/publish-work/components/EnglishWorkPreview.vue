<template>
  <div class="English-work-preview">
    <div>
      <div>
        <img
          src="../../../assets/img/publish/zk.png"
          alt=""
          v-if="!showEnglish"
          @click="showEnglishBtn"
        />
        <img
          src="../../../assets/img/publish/sq.png"
          alt=""
          v-if="showEnglish"
          @click="hideEnglishBtn"
        />
        <span> {{ item.questionType === 1 ? '课文朗读' : '逐句跟读' }}</span>
        <span>{{ item.textbookChapterName }}</span>
      </div>
      <div class="add" v-if="!item.active" @click="handleSelectItem">
        <img src="../../../assets/img/ic_fabu_hw_add@2x.png" alt="" /><span
          >加入作业</span
        >
      </div>
      <div class="delete" v-else @click="handleRemove">
        <img src="../../../assets/img/ic_fabu_hw_delete@2x.png" alt="" /><span
          >移出作业</span
        >
      </div>
    </div>
    <template v-if="showEnglish">
      <div
        class="content"
        v-for="(item, index) of item.videoQuestionStemList"
        :key="index"
        :class="showEnglish ? 'hover-div' : ''"
      >
        <div v-html="item.questionStemContent"></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['item'],
  data() {
    return {
      showEnglish: false
    }
  },
  methods: {
    showEnglishBtn() {
      this.showEnglish = true
    },
    hideEnglishBtn() {
      this.showEnglish = false
    },
    handleRemove() {
      this.$store.commit('publish/CANCLEONEITEM', this.item)
    },
    handleSelectItem() {
      this.$store.commit('publish/ADDONEITEM', this.item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.English-work-preview {
  @include wh(96%, auto);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(185, 185, 185, 1);
  box-shadow: 0px 2px 4px 0px rgba(186, 213, 238, 0.29);
  border-radius: 8px;
  margin: 20px auto;
  > div:nth-child(1) {
    @include fj();
    align-items: center;
    padding: 0 20px;
    @include wh(100%, 100%);
    min-height: 50px;
    > div:nth-child(1) {
      display: flex;
      align-items: center;
      img {
        @include wh(18px, 18px);
        float: left;
      }
      span:nth-child(2) {
        padding: 3px 10px;
        @include sc(14px, #5e84ad);
        background: rgba(232, 232, 232, 1);
        border-radius: 8px;
        float: left;
        margin: 0 20px;
      }
      span:nth-child(3) {
        @include sc(14px, #596878);
        float: left;
      }
    }
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  > div:nth-child(2) {
    @include sc(14px, #333);
    padding: 20px;
    word-break: break-all;
    line-height: 20px;
  }
  > div:nth-child(2).hover-div {
    border-top: 1px solid #ddd;
  }
}
.content {
  padding: 20px;
  font-size: 14px;
}
.add {
  padding: 0 10px;
  height: 30px;
  background: rgba(57, 158, 255, 1);
  border: 1px solid rgba(57, 158, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  span {
    color: #fff;
  }
  img {
    width: 10px;
    height: 10px;
  }
}
.delete {
  padding: 0 10px;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(57, 158, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  span {
    color: #399eff;
  }
  img {
    width: 10px;
    height: 10px;
  }
}
</style>
