<template>
  <div class="item">
    <header>
      <div class="toggle">
        <img
          @click="handleToggle"
          v-show="!toggle"
          src="../../../assets/img/publish/zk.png"
          alt=""
        />
        <img
          @click="handleToggle"
          v-show="toggle"
          src="../../../assets/img/publish/sq.png"
          alt=""
        />
      </div>
      <div class="count">
        <span class="word-count">单词数量{{ item.wordInfoList.length }}</span>
        <span class="choice-count">已选数量{{ pageCount }}</span>
        <span class="line"></span>
        <el-checkbox v-model="checked" @change="onChange"
          >P{{ item.page }}</el-checkbox
        >
      </div>
    </header>
    <div class="content" v-show="toggle">
      <ul>
        <template v-for="(item, wordIndex) of item.wordInfoList">
          <WordItem
            :wordIndex="wordIndex"
            :pageIndex="pageIndex"
            :key="item.wordId"
            :item="item"
          ></WordItem>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import WordItem from './WordItem'
export default {
  name: '',
  components: { WordItem },
  props: ['item', 'pageIndex'],
  data() {
    return {
      toggle: false,
      checked: false
    }
  },
  computed: {
    wordList() {
      return this.$store.state.publish.wordList
    },
    wordMenuIndex() {
      return this.$store.state.publish.wordMenuIndex
    },
    // 当前page选中数量
    pageCount() {
      let list = this.wordList
      let length = 0
      list.forEach((element, index) => {
        if (index === this.wordMenuIndex) {
          element.wordPageList.forEach((item, innerIndex) => {
            if (innerIndex === this.pageIndex) {
              item.wordInfoList.forEach(word => {
                if (word.active) {
                  length += 1
                }
              })
            }
          })
        }
      })
      return length
    }
  },
  methods: {
    onChange() {
      this.$store.commit('publish/UPDATEPAGE', {
        pageIndex: this.pageIndex
      })
    },
    handleToggle() {
      this.toggle = !this.toggle
    }
  },
  mounted() {
    this.toggle = this.item.wordInfoList.some(item => item.active)
    this.checked = this.item.wordInfoList.every(item => item.active)
  }
}
</script>

<style lang="scss" scoped>
.item {
  width: 860px;
  margin: 20px auto;

  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 8px;

  header {
    width: 100%;
    height: 42px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    .toggle {
      img {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
    .count {
      .word-count {
        display: inline-block;
        width: 110px;
        height: 24px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(94, 132, 173, 1);
        font-weight: 400;
        background: rgba(232, 232, 232, 1);
        border-radius: 8px;
        text-align: center;
        line-height: 24px;
        margin-right: 16px;
      }
      .choice-count {
        display: inline-block;
        width: 110px;
        height: 24px;
        background: rgba(253, 161, 87, 1);
        border-radius: 8px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 24px;
        margin-right: 16px;
      }
    }
  }
  .content {
    padding: 20px;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
