<template>
  <div class="word-work">
    <div class="menu">
      <header>
        {{ textBookName }}
        <span>{{
          this.$store.state.userInfo.textbookTeachingmateriaName
        }}</span>
      </header>
      <ul class="menu-list">
        <template v-for="(item, index) of wordList">
          <WordWorkMenuItem
            :key="item.textbookChapterCode"
            :index="index"
            :item="item"
          ></WordWorkMenuItem>
        </template>
      </ul>
    </div>
    <div class="content">
      <div class="toolbar">
        <div class="page">
          <span class="text">按页码选择</span>
          <div class="picker">
            <a-popover placement="bottom" :overlayStyle="overlayStyle">
              <template slot="content">
                <ul class="popover-list">
                  <li
                    v-for="(item, menuIndex) of wordList"
                    :key="menuIndex"
                    class="item"
                  >
                    <p>{{ item.textbookChapterName }}</p>
                    <ul>
                      <li
                        v-for="(item, pageIndex) of item.wordPageList"
                        :key="pageIndex"
                        @click="handleStartPicker(menuIndex, pageIndex)"
                        :class="
                          startMenuIndex === menuIndex &&
                          startPageIndex === pageIndex
                            ? 'active'
                            : ''
                        "
                      >
                        P{{ pageIndex + 1 }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </template>
              <a-button>{{ startPage }}</a-button>
            </a-popover>
          </div>

          <span class="line">-</span>
          <div class="picker">
            <a-popover placement="bottom" :overlayStyle="overlayStyle">
              <template slot="content">
                <ul class="popover-list">
                  <li
                    v-for="(item, menuIndex) of wordList"
                    :key="menuIndex"
                    class="item"
                  >
                    <p>{{ item.textbookChapterName }}</p>
                    <ul>
                      <li
                        v-for="(item, pageIndex) of item.wordPageList"
                        :key="pageIndex"
                        @click="handleEndPicker(menuIndex, pageIndex)"
                        :class="
                          endMenuIndex === menuIndex &&
                          endPageIndex === pageIndex
                            ? 'active'
                            : ''
                        "
                      >
                        P{{ pageIndex + 1 }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </template>
              <a-button>{{ endPage }}</a-button>
            </a-popover>
          </div>

          <div class="reset" @click="handleReset">重置</div>
        </div>
        <div class="tip">
          <div class="tip-text">
            每个单词对应 3 种题型：单词跟读、单词听写、英译汉
          </div>
          <img src="../../../assets/img/publish/help.png" alt="" />
        </div>
      </div>
      <div class="list">
        <template v-for="(item, pageIndex) of wordPageList">
          <WordWorkListitem
            :key="genID(pageIndex)"
            :pageIndex="pageIndex"
            :item="item"
          ></WordWorkListitem>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import WordWorkMenuItem from './WordWorkMenuItem'
import WordWorkListitem from './WordWorkListitem'
export default {
  name: '',
  components: { WordWorkMenuItem, WordWorkListitem },
  data() {
    return {
      overlayStyle: {
        width: '300px',
        height: '350px'
      },
      startMenuIndex: null,
      startPageIndex: null,
      endMenuIndex: null,
      endPageIndex: null,
      startPage: '', //开始页数
      endPage: '' // 结束页数
    }
  },
  computed: {
    textBookName() {
      return this.$store.getters.textbookName
    },
    wordList() {
      return this.$store.state.publish.wordList
    },
    index() {
      return this.checkList[0] || 0
    },
    wordPageList() {
      return (
        (this.$store.getters['publish/wordPageList'] &&
          this.$store.getters['publish/wordPageList'].wordPageList) ||
        []
      )
    }
  },

  methods: {
    genID(length) {
      return Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36)
    },
    handleStartPicker(menuIndex, pageIndex) {
      this.startMenuIndex = menuIndex
      this.startPageIndex = pageIndex
      this.startPage = 'P' + (pageIndex + 1)
      if (this.endPage) {
        this.handleChoice()
      }
    },
    handleEndPicker(menuIndex, pageIndex) {
      this.endMenuIndex = menuIndex
      this.endPageIndex = pageIndex
      this.endPage = 'P' + (pageIndex + 1)
      if (this.startPage) {
        this.handleChoice()
      }
    },
    handleChoice() {
      if (
        this.startPageIndex > this.endPageIndex
        // this.endMenuIndex < this.startMenuIndex ||
        // (this.endMenuIndex > this.startMenuIndex &&
        //   this.startPageIndex > this.endPageIndex)
      ) {
        this.$message.warning('开始页码大于结束页码，请重新选择页码')
      } else {
        this.$store.commit('publish/RESETWORDLIST')
        this.$store.commit('publish/UPDATEPAGEWORD', {
          startMenuIndex: this.startMenuIndex,
          startPageIndex: this.startPageIndex,
          endMenuIndex: this.endMenuIndex,
          endPageIndex: this.endPageIndex
        })
      }
    },
    handleReset() {
      this.startMenuIndex = null
      this.startPageIndex = null
      this.endMenuIndex = null
      this.endPageIndex = null
      this.startPage = ''
      this.endPage = ''
      this.$store.commit('publish/RESETWORDLIST')
    }
  },
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        localforage.getItem('wordList').then(value => {
          if (value) {
            this.$store.commit('publish/TEXTBOOKWORD', value)
          } else {
            this.$store.dispatch('publish/textbookWord')
          }
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.word-work {
  width: 1200px;
  height: 82%;
  margin: 20px auto 0;
  display: flex;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 0px 4px 4px 0px;
  .menu {
    flex: 0 0 280px;
    width: 280px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-right: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    header {
      height: 67px;
      text-align: center;
      background-color: #399eff;
      border-radius: 4px 0px 0px 4px;
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      span {
        margin-top: 5px;
        font-size: 14px;
      }
    }
    .menu-list {
      padding: 0 15px 20px;
    }
  }
  .content {
    height: 100%;
    width: 920px;
    flex: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    .toolbar {
      height: 67px;
      flex: 0 0 67px;
      text-align: center;
      line-height: 67px;
      font-size: 16px;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      .page {
        flex: auto;
        height: 100%;
        padding-left: 20px;
        display: flex;
        align-items: center;
        .text {
          display: block;
          height: 100%;
          width: 72px;

          font-weight: 400;
          color: rgba(78, 95, 113, 1);
        }
        span {
          margin: 0 5px;
        }
        .picker {
          width: 78px;
          height: 34px;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            width: 78px;
            height: 34px;
            line-height: 34px;
            text-align: center;
          }
        }
        .choice,
        .reset {
          width: 98px;
          height: 34px;
          line-height: 34px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(228, 235, 238, 1);
          border-radius: 16px;
          font-weight: 400;
          color: rgba(113, 113, 113, 1);
          margin: 0 15px;
        }
        .choice:active,
        .reset:active {
          color: rgba(16, 89, 255, 1);
          border: 1px solid rgba(16, 89, 255, 1);
        }
      }
      .tip {
        flex: auto;
        height: 100%;
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          width: 26px;
          height: 26px;
        }
        .tip-text {
          display: none;
          margin-top: 14px;
          font-weight: 400;
          color: rgba(89, 104, 120, 1);
          height: 60px;
          line-height: 49px;
          padding: 0 20px;
          background-image: url('../../../assets/img/publish/tips.png');
          background-size: 100% 100%;
        }
      }
      .tip:hover .tip-text {
        display: block;
      }
    }
    .list {
      flex: auto;
      height: 100%;
      overflow-y: auto;
      padding-bottom: 100px;
    }
  }
}
.popover-list {
  .item {
    margin: 10px;
    p {
      color: #717171;
      margin-bottom: 10px;
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      li {
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        color: #838383;
        border: 1px solid #838383;
        margin-right: 10px;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
      }
    }

    .active {
      color: #1059ff;
      border: 1px solid #1059ff;
    }
  }
}
</style>
