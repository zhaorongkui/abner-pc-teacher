<template>
  <div class="read-the-text">
    <header class="homework-header">
      <div class="left">
        <div class="title">题目</div>
      </div>
      <div class="right">
        <img
          src="../../../assets/img/publish/fabu_read_details_play@2x.png"
          alt=""
          @click="handleAudio"
        />
        <audio
          ref="audioRef"
          :src="item.videoQuestionStemList[0].questionStemVideo"
          controls="controls"
          style="display:none;"
        />
      </div>
    </header>
    <div class="wrap">
      <div class="questionTitle">{{ item.questionTitle }}</div>
      <div class="yuanwen">原文</div>
      <div
        class="questionDetail"
        v-for="(item, index) of item.videoQuestionStemList"
        :key="index"
      >
        <div v-html="item.questionStemContent"></div>
      </div>
      <div class="yuanwen">解析</div>
      <div v-html="item.questionStemTranslate"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['item'],
  data() {
    return {}
  },
  methods: {
    handleAudio() {
      if (this.$refs.audioRef.paused) {
        // 暂停中
        this.$refs.audioRef.currentTime = 0
        this.$refs.audioRef.play()
      } else {
        // 播放中
        this.$refs.audioRef.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  max-height: 500px;
  overflow-y: auto;
  font-size: 14px;
}
.homework-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    .title {
      width: 44px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background: rgba(86, 172, 255, 1);
      border-radius: 0px 12px 12px 0px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .right {
    img {
      width: 36px;
      height: 36px;
    }
  }
}
.questionTitle {
  margin: 20px 0;
}
.yuanwen {
  width: 40px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: rgba(86, 172, 255, 1);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
