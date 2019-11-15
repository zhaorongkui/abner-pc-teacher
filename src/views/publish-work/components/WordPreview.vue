<template>
  <div class="word-preview">
    <div class="title">
      <span>作业内容预览(共{{ wordHomeWorkCount }}题)</span>
      <img
        src="../../../assets/img/publish/close.png"
        alt=""
        @click="handleClose"
      />
    </div>
    <ul class="list">
      <template v-for="(item, wordMenuIndex) of wordList">
        <li class="item" v-if="filterItem(item)" :key="wordMenuIndex">
          <WordPreviewItem
            :item="item"
            :wordMenuIndex="wordMenuIndex"
          ></WordPreviewItem>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import WordPreviewItem from './WordPreviewItem'
export default {
  name: '',
  components: { WordPreviewItem },
  data() {
    return {
      toggle: false
    }
  },
  computed: {
    wordList() {
      return this.$store.state.publish.wordList
    },
    wordHomeWorkCount() {
      return this.$store.getters['publish/wordHomeWorkCount']
    }
  },
  watch: {
    wordHomeWorkCount(value) {
      if (value === 0) {
        this.handleClose()
        this.$message.warning('单词已清空，请重新选择单词布置作业')
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('onClose')
    },
    filterItem(obj) {
      let result = false
      obj.wordPageList.forEach(item => {
        if (!result) {
          result = item.wordInfoList.some(item => item.active)
        }
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.word-preview {
  width: 1200px;
  height: 700px;
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px 0px 0px 4px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate((-50%, -50%));
  display: flex;
  flex-direction: column;
  .title {
    height: 67px;
    flex: 0 0 67px;
    border-bottom: 1px solid #ddd;
    color: #1059ff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      width: 14px;
      height: 14px;
      position: absolute;
      right: 20px;
      top: 25px;
    }
  }
  .list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    flex: auto;
    padding: 20px;
  }
}
</style>
