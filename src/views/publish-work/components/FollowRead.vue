<template>
  <div class="follow">
    <header class="homework-header">
      <div class="left">
        <div class="title">题目</div>
      </div>
    </header>
    <div class="wrap">
      <div class="line"></div>
      <div
        class="questionDetail"
        v-for="(item, index) of item.videoQuestionStemList"
        :key="index"
      >
        <FollowReadItem
          @updateIndex="handleUpdateIndex"
          :index="index"
          :item="item"
          :currentIndex="currentIndex"
        ></FollowReadItem>
      </div>
    </div>
  </div>
</template>

<script>
import FollowReadItem from './FollowReadItem'
export default {
  name: '',
  components: { FollowReadItem },
  props: ['item'],
  data() {
    return {
      currentIndex: null
    }
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
    },
    handleUpdateIndex(index) {
      this.currentIndex = index
    },
    resetAudio() {}
  },
  mounted() {
    // console.log(this.item)
  }
}
</script>

<style lang="scss" scoped>
.follow {
  position: relative;
}
.wrap {
  max-height: 500px;
  overflow-y: auto;
  font-size: 14px;
}
.line {
  position: absolute;
  top: 44px;
  left: 41px;
  height: calc(100% - 44px);
  width: 1px;
  background-color: #eee;
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
