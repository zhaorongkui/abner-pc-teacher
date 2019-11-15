<template>
  <li
    class="word-item"
    :class="word.active ? 'active' : ''"
    @click="handleChoice(wordMenuIndex, pageIndex, wordIndex)"
    v-if="isShow"
  >
    {{ word.word }}
  </li>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['word', 'wordMenuIndex', 'pageIndex', 'wordIndex'],
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleChoice(wordMenuIndex, pageIndex, wordIndex) {
      this.$store.commit('publish/UPDATEWORD', {
        wordMenuIndex: wordMenuIndex,
        pageIndex: pageIndex,
        wordIndex: wordIndex
      })
    }
  },
  mounted() {
    this.isShow = this.word.active
  }
}
</script>

<style lang="scss" scoped>
</style>
