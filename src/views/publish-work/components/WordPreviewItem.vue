<template>
  <div class="item">
    <div class="header">
      <div class="left">
        <div class="toggle" @click="handleToggle">
          <img src="../../../assets/img/publish/zk.png" alt="" v-if="!toggle" />
          <img src="../../../assets/img/publish/sq.png" alt="" v-if="toggle" />
          <span v-if="!toggle">
            展开列表
          </span>
          <span v-if="toggle">
            收起列表
          </span>
        </div>
        <span class="line"></span>
        <p class="name">{{ item.textbookChapterName }}</p>
        <p class="count">共{{ pageCount }}单词</p>
      </div>
      <div class="right">
        <div class="page">
          {{
            item.wordPageList.length === 1
              ? 'P1'
              : 'P1~P' + item.wordPageList.length
          }}
        </div>
        <span></span>
        <div class="del" @click="handleMenu(wordMenuIndex)">
          <img src="../../../assets/img/publish/delete.png" alt="" />
          <span>移出本单元</span>
        </div>
      </div>
    </div>
    <div class="content" v-show="toggle">
      <template v-for="(page, pageIndex) of item.wordPageList">
        <div
          class="page"
          :key="pageIndex"
          :ref="wordMenuIndex + pageIndex"
          v-if="filterPage(page)"
        >
          <div class="header">
            <span>P{{ pageIndex + 1 }}</span>
            <div class="remove" @click="handleRemove(wordMenuIndex, pageIndex)">
              <img src="../../../assets/img/publish/delete.png" alt="" />
              <span>移出本页</span>
            </div>
          </div>
          <div class="main">
            <ul class="word-list">
              <template v-for="(word, wordIndex) of page.wordInfoList">
                <Word
                  :key="wordIndex"
                  :word="word"
                  :wordIndex="wordIndex"
                  :pageIndex="pageIndex"
                  :wordMenuIndex="wordMenuIndex"
                ></Word>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Word from './Word'
export default {
  name: '',
  components: { Word },
  props: ['item', 'wordMenuIndex'],
  data() {
    return {
      toggle: false
    }
  },
  computed: {
    // 当前page选中数量
    pageCount() {
      let list = this.item.wordPageList
      let length = 0
      list.forEach(item => {
        item.wordInfoList.forEach(word => {
          if (word.active) {
            length += 1
          }
        })
      })
      return length
    }
  },
  methods: {
    handleToggle() {
      this.toggle = !this.toggle
    },
    handleChoice(wordMenuIndex, pageIndex, wordIndex) {
      this.$store.commit('publish/UPDATEWORD', {
        wordMenuIndex: wordMenuIndex,
        pageIndex: pageIndex,
        wordIndex: wordIndex
      })
    },
    handleRemove(wordMenuIndex, pageIndex) {
      this.$refs[wordMenuIndex + pageIndex][0].style.display = 'none'
      this.$store.commit('publish/REMOVEPAGE', {
        wordMenuIndex: wordMenuIndex,
        pageIndex: pageIndex
      })
    },
    handleMenu(wordMenuIndex) {
      this.$store.commit('publish/RemoveMenu', {
        wordMenuIndex: wordMenuIndex
      })
    },
    filterPage(page) {
      return page.wordInfoList.some(item => item.active)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(185, 185, 185, 1);
  box-shadow: 0px 2px 4px 0px rgba(186, 213, 238, 0.29);
  border-radius: 8px;
  margin-bottom: 12px;
  > .header {
    width: 100%;
    height: 42px;

    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .toggle {
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 16px;
        background-color: #ddd;
        margin: 0 10px;
      }
      .name,
      .count {
        padding: 0 10px;
        height: 25px;
        min-width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(232, 232, 232, 1);
        border-radius: 8px;
        margin: 0 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .page {
        width: 88px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(232, 232, 232, 1);
        border-radius: 8px;
        margin-right: 20px;
      }
      .del {
        width: 110px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(16, 89, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(186, 213, 238, 0.29);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(16, 89, 255, 1);
        }
        img {
          width: 16px;
          height: 19px;
        }
      }
    }
  }
  .content {
    padding: 20px;
    .page {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 14px;
          font-weight: 400;
          color: rgba(94, 132, 173, 1);
        }
        .remove {
          width: 110px;
          height: 28px;
          border: 1px solid rgba(16, 89, 255, 1);
          box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            font-size: 12px;
            font-weight: 400;
            color: rgba(16, 89, 255, 1);
          }
          img {
            width: 15px;
            height: 18px;
          }
        }
      }
      .main {
        .word-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          .word-item {
            width: 190px;
            height: 60px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-left: 30px;
            padding-left: 20px;
            background-size: 100% 100%;
            background-image: url('../../../assets/img/publish/select2.png');
          }
          .word-item.active {
            color: rgba(16, 89, 255, 1);
            background-image: url('../../../assets/img/publish/select1.png');
          }
        }
      }
    }
  }
}
</style>
