<template>
  <div class="wrap-menu" @mouseleave="handleLeave">
    <ul class="menu" id="menu">
      <template v-for="(item, index) of list">
        <li
          class="menu-item-group"
          :key="index"
          :class="[
            item.hasHomework === 1 ? 'finish' : '',
            item.textbookChapterCode === textbookChapterCode ? 'active' : '',
            item.textbookChapterCode === textbookChapterCode ? 'anchor' : ''
          ]"
        >
          <template v-if="item.textbookChapterIslast === 1">
            <ul class="lastLevel">
              <li
                class="menu-item"
                :class="[
                  item.hasHomework === 1 ? 'finish' : '',
                  item.textbookChapterCode === textbookChapterCode
                    ? 'active'
                    : '',
                  item.textbookChapterCode === textbookChapterCode
                    ? 'anchor'
                    : '',
                  item.warnState === 1 ? 'warn' : ''
                ]"
                @mouseenter="handlePageHomeworkInfo(item)"
              >
                <div class="title">
                  <p>{{ item.textbookChapterName }}</p>
                </div>
              </li>
            </ul>
          </template>
          <template v-else>
            <div
              class="sub-menu"
              :class="[
                item.children.some(child => child.hasHomework === 1)
                  ? 'finish'
                  : '',
                item.children.some(
                  child => child.textbookChapterCode === textbookChapterCode
                )
                  ? 'active'
                  : ''
              ]"
            >
              <span>{{
                item.textbookChapterNum || item.textbookChapterName
              }}</span>
            </div>
            <ul class="group">
              <template v-for="(child, index) of item.children">
                <li
                  class="menu-item"
                  :class="[
                    child.hasHomework === 1 ? 'finish' : '',
                    child.textbookChapterCode === textbookChapterCode
                      ? 'active'
                      : '',
                    child.textbookChapterCode === textbookChapterCode
                      ? 'anchor'
                      : '',
                    child.warnState === 1 ? 'warn' : ''
                  ]"
                  v-if="
                    child.textbookChapterLevel === 3 &&
                      child.textbookChapterParentid === item.textbookChapterId
                  "
                  :key="index"
                  @mouseenter="handlePageHomeworkInfo(child)"
                >
                  <div class="title">
                    <p>{{ child.textbookChapterName }}</p>
                  </div>
                </li>
              </template>
            </ul>
          </template>
        </li>
      </template>
    </ul>
    <Popover
      v-if="isShow"
      :text="text"
      :ingoreState="ingoreState"
      :textbookChapterId="textbookChapterId"
      :textbookId="textbookId"
      :textbookChapterCode="itemTextbookChapterCode"
      @onHide="handleHide"
    ></Popover>
  </div>
</template>

<script>
import Popover from './Popover'
export default {
  name: 'home-menu',
  components: { Popover },
  filters: {},
  data() {
    return {
      isShow: false,
      text: null,
      ingoreState: null,
      textbookChapterId: null,
      textbookId: null,
      itemTextbookChapterCode: null
    }
  },
  computed: {
    chapterListData() {
      return this.$store.state.home.chapterListData
    },
    chapterList() {
      return this.chapterListData.chapterList || []
    },
    list() {
      let list = []
      this.chapterList.forEach(item => {
        if (item.textbookChapterLevel === 2) {
          list.push({ ...item, children: [] })
        }
      })
      list.forEach((item, index) => {
        this.chapterList.forEach(child => {
          if (item.textbookChapterId === child.textbookChapterParentid) {
            list[index].children.push(child)
          }
        })
      })
      return list
    },
    textbookChapterCode() {
      return (
        this.chapterListData.textbookChapterCode &&
        this.chapterListData.textbookChapterCode.slice(0, 10)
      )
    },
    gradeClassIds() {
      return this.$store.getters.gradeClassIds
    }
  },
  mounted() {
    this.$store.dispatch('home/pageHomeworkChapter').then(() => {
      let menu = document.getElementById('menu')
      let anchor = document.getElementsByClassName('anchor')[0]
      let height =
        anchor.getBoundingClientRect().top - menu.getBoundingClientRect().top
      menu.scrollTop = height - 200
    })
  },
  methods: {
    handlePageHomeworkInfo(item) {
      this.text = item.textbookChapterName
      this.ingoreState = item.ingoreState
      this.textbookChapterId = item.textbookChapterId
      this.textbookId = item.textbookId
      this.itemTextbookChapterCode = item.textbookChapterCode

      this.$store
        .dispatch('home/getPageHomeworkInfo', {
          gradeClassIds: this.gradeClassIds,
          textbookId: item.textbookId,
          textbookChapterCode: item.textbookChapterCode,
          teacherId: this.$store.state.userInfo.teacherId
        })
        .then(() => {
          this.isShow = true
        })
    },
    handleLeave() {
      this.isShow = true
    },
    handleHide() {
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-menu {
  flex: auto;
  height: 86%;
  position: relative;
  top: 0px;
  left: 0;
  scrollbar-width: none;
}
.menu {
  height: 100%;
  flex: auto;
  padding: 10px;
  overflow-y: auto;
  font-size: 14px;
  .menu-item-group {
    width: 100%;
    display: flex;
    margin-bottom: 10px;

    .lastLevel {
      width: 100%;
    }
  }
  .sub-menu {
    flex: 0 0 24px;
    display: flex;
    // padding: 10px 0;
    align-items: center;
    justify-content: center;
    color: #aaa;
    background-color: #eeeeee;
    border-radius: 4px;
    margin-right: 10px;
    span {
      font-size: 12px;
      width: 12px;
    }
  }
  .group {
    flex: 0 0 224px;
    width: 224px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .menu-item {
    width: 100%;
    height: 60px;
    padding-left: 10px;
    color: #777;
    border: 1px solid rgba(238, 238, 238, 1);
    border-left-width: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .menu-item:last-child {
    margin-bottom: 0;
  }
  .menu-item.warn::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: 10px;
  }
  .warn.menu-item::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    right: 0;
    top: 0;
  }
  .finish.sub-menu {
    color: #fff;
    background-color: #13a99e;
  }
  .finish.menu-item {
    color: #777;
    border: 1px solid #13a99e;
    border-left-width: 10px;
  }

  .active.sub-menu {
    color: #fff;
    background-color: #1059ff;
  }
  .active.menu-item {
    color: #fff;
    border: 1px solid #1059ff;
    background-color: #1059ff;
    border-left-width: 10px;
    height: 80px;
  }
  .active.menu-item:before {
    content: '';
    width: 43px;
    height: 69px;
    background-image: url('../../../assets/img/ic_homepage_leftlist_current@2x.png');
    background-size: 100% 100%;
    position: absolute;
    top: 6px;
    right: -6px;
  }
}
.title {
  width: 100%;
  height: 100%;
  display: flex;
  align-self: center;
  flex-direction: column;
  p {
    // display: flex;
    // align-items: center;
    display: block;
    line-height: 60px;
    text-align: left;
    flex: 1;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
