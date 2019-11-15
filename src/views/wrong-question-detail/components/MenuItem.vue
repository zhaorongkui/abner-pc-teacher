<template>
  <div class="menu-item">
    <div
      class="sub-item"
      :class="[
        currentTextbookChapterCode &&
        currentTextbookChapterCode.indexOf(item.textbookChapterCode) !== -1
          ? 'sub-active'
          : ''
      ]"
      @click="handleShowChild(item)"
    >
      {{ item.textbookChapterName }}
    </div>
    <ul
      class="list"
      v-if="
        currentTextbookChapterCode &&
          currentTextbookChapterCode.indexOf(item.textbookChapterCode) !== -1
      "
      v-show="isShow"
    >
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
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: [
    'currentTextbookChapterCode',
    'item',
    'studentInfoId',
    'questionYytypeId',
    'wrongquestionTimeStart',
    'wrongquestionTimeEnd'
  ],
  data() {
    return {
      isShow: false
    }
  },
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
    },
    handleShowChild(item) {
      if (this.currentTextbookChapterId === item.textbookChapterId) return
      this.$store.commit('question/UPDATECHAPTERCODE', item.textbookChapterCode)
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
