<template>
  <div class="childQuestionInfoList">
    <li
      class="item"
      v-for="(item, index) of childQuestionInfoList"
      :key="index"
    >
      <ChildItem :item="item"></ChildItem>
    </li>
  </div>
</template>

<script>
import ChildItem from './ChildItem'
export default {
  name: 'childQuestionInfoList',
  components: { ChildItem },
  data() {
    return {}
  },
  computed: {
    childQuestionInfoList() {
      return this.$store.state.question.childQuestionInfoList
    }
  }
}
</script>

<style lang="scss" scoped>
.childQuestionInfoList {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
</style>
