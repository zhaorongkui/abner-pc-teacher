<template>
  <div class="follow-read-item" @click="handleAudio">
    <div class="index">
      <div class="count" :class="currentIndex === index ? 'active' : ''">
        {{ index + 1 }}
      </div>
    </div>
    <div class="content" :class="currentIndex === index ? 'active' : ''">
      <div v-html="item.questionStemContent"></div>
      <div>
        <img
          src="../../../assets/img/publish/ic_fabu_read_sentence_details_playing@2x.png"
          alt=""
        />
      </div>
      <audio
        ref="audioRef"
        style="display:none"
        :src="item.questionStemVideo"
      ></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['index', 'item', 'currentIndex'],
  data() {
    return {
      isCruuent: false
    }
  },
  watch: {
    currentIndex(value) {
      if (value != this.index) {
        this.$refs.audioRef.pause()
      }
    }
  },
  methods: {
    handleAudio() {
      this.$emit('updateIndex', this.index)
      if (this.$refs.audioRef.paused) {
        // 暂停中
        this.$refs.audioRef.currentTime = 0
        this.$refs.audioRef.play()
      } else {
        // 播放中
        this.$refs.audioRef.pause()
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.follow-read-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin: 10px 0;

  .index {
    flex: 0 0 82px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .count {
      width: 40px;
      height: 40px;
      border: 2px solid rgba(214, 225, 229, 1);
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .active {
      border: 2px solid #56acff;
      background-color: #56acff;
      border-radius: 50%;
      color: #fff;
    }
  }
  .content {
    height: 80px;
    padding: 10px;
    flex: auto;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(185, 185, 185, 1);
    box-shadow: 0px 2px 4px 0px rgba(186, 213, 238, 0.29);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 19px;
      height: 15px;
    }
  }

  .active {
    border: 1px solid rgba(16, 89, 255, 1);
  }
}
</style>
