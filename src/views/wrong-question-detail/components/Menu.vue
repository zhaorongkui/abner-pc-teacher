<template>
  <ul class="menu">
    <li>章节选择</li>
    <li class="group" v-for="(item, index) of list" :key="index">
      <div
        class="sub-item"
        :class="
          item.textbookChapterId == currentTextbookChapterId ? 'active' : ''
        "
        v-if="item.textbookChapterIslast === 1"
        @click="handleClickChapter(item)"
      >
        {{ item.textbookChapterName }}
      </div>
      <template v-else>
        <!-- <div
          class="sub-item"
          :class="[
            currentTextbookChapterCode &&
            currentTextbookChapterCode.indexOf(item.textbookChapterCode) !== -1
              ? 'sub-active'
              : '',
            item.textbookChapterCode === currentTextbookChapterCode
              ? 'active'
              : ''
          ]"
          @click="handleClickChapter(item)"
        >
          {{ item.textbookChapterName }}
        </div>
        <ul class="list">
          <li
            class="item"
            :class="
              child.textbookChapterCode === currentTextbookChapterCode
                ? 'active'
                : ''
            "
            v-for="(child, index) of item.children"
            :key="index"
            @click="handleClickChapter(child)"
          >
            {{ child.textbookChapterName }}
          </li>
        </ul> -->
        <MenuItem
          :currentTextbookChapterCode="currentTextbookChapterCode"
          :item="item"
          :studentInfoId="studentInfoId"
          :questionYytypeId="questionYytypeId"
          :wrongquestionTimeStart="wrongquestionTimeStart"
          :wrongquestionTimeEnd="wrongquestionTimeEnd"
        ></MenuItem>
      </template>
    </li>
  </ul>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  name: 'question-menu',
  components: { MenuItem },
  props: [
    'studentInfoId',
    'questionYytypeId',
    'wrongquestionTimeStart',
    'wrongquestionTimeEnd'
  ],
  data() {
    return {}
  },
  computed: {
    resourceChapterList() {
      return this.$store.state.question.textbookChapter
    },
    textBook() {
      return this.$store.state.userInfo.textbookName
    },
    list() {
      let list = []
      this.resourceChapterList.forEach(item => {
        if (item.textbookChapterLevel === 2) {
          list.push({ ...item, children: [] })
        }
      })
      list.forEach((item, index) => {
        this.resourceChapterList.forEach(child => {
          if (item.textbookChapterId === child.textbookChapterParentid) {
            list[index].children.push(child)
          }
        })
      })
      return list
    },
    currentTextbookChapterId() {
      return this.$store.state.question.currentTextbookChapterId
    },
    currentTextbookChapterCode() {
      return this.$store.state.question.currentTextbookChapterCode
    }
  },
  mounted() {},
  methods: {
    handleClickChapter(item) {
      if (this.currentTextbookChapterId === item.textbookChapterId) return
      this.$store.commit('question/UPDATECHAPTERCODE', item.textbookChapterCode)
      this.$store.commit('question/UPDATECHAPTERID', item.textbookChapterId)
      this.$store.commit('question/UPDATECURRENTPAGE', 1)
      this.$store.dispatch('question/getList', {
        studentInfoId: this.studentInfoId,
        questionYytypeId: this.questionYytypeId.join(','),
        wrongquestionTimeStart: this.wrongquestionTimeStart,
        wrongquestionTimeEnd: this.wrongquestionTimeEnd
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-size: 14px;
  header {
    padding: 0 10px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 8px;
    margin-top: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
  .group {
    margin: 0 auto;
    .sub-item,
    .item {
      padding: 0 10px;
      width: 100%;
      height: 42px;
      line-height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 8px;
      margin-top: 10px;
      cursor: pointer;
    }
    .sub-item {
      border: 1px solid rgba(210, 210, 210, 1);
    }
    .sub-active {
      background: rgba(229, 240, 254, 1);
    }
    .list {
      padding-left: 12px;
    }
    .item {
      // width: 248px;
      // margin-left: 12px;
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(210, 210, 210, 1);
    }
    .active {
      background: rgba(16, 89, 255, 1);
      border: 1px solid rgba(16, 89, 255, 1);
      color: #fff;
    }
  }
}
</style>
