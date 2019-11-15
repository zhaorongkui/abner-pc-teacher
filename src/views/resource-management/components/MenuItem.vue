<template>
  <li class="group">
    <div
      class="sub-item"
      :class="
        item.textbookChapterCode === currentTextbookChapterCode ? 'active' : ''
      "
      v-if="item.textbookChapterIslast === 1"
      @click="handleClickChapter(item.textbookChapterCode)"
    >
      {{ item.textbookChapterName }}
    </div>
    <template v-else>
      <div
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
        @click="handleClickChapter(item.textbookChapterCode, true)"
      >
        {{ item.textbookChapterName }}
      </div>
      <ul class="list" v-if="isShow">
        <li
          class="item"
          :class="
            child.textbookChapterCode === currentTextbookChapterCode
              ? 'active'
              : ''
          "
          v-for="(child, index) of item.children"
          :key="index"
          @click="handleClickChapter(child.textbookChapterCode)"
        >
          {{ child.textbookChapterName }}
        </li>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['item', 'updateViewer'],
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    currentTextbookChapterCode() {
      return this.$store.state.resource.currentTextbookChapterCode
    }
  },
  methods: {
    handleClickChapter(code = null, flag) {
      if (flag) {
        this.isShow = !this.isShow
      }
      if (this.currentTextbookChapterCode === code) return
      this.$store.commit('resource/UPDATECHAPTERCODE', code)
      this.$store.commit('resource/UPDATERESOURCETYPE', 0)
      this.$store.commit('resource/CURRENTPAGE', 1)
      this.$store.dispatch('resource/queryResourceList').then(() => {
        this.updateViewer()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  width: 260px;
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
  .item {
    width: 248px;
    margin-left: 12px;
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
</style>
