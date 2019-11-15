<template>
  <div class="tabbar">
    <h3 v-if="subjectivelist.length > 0">主观题</h3>
    <ul v-for="(item, index) of subjectivelist" :key="item.homeworkQuestionId">
      <TabBarItem :index="index" :item="item"></TabBarItem>
    </ul>
    <h3 v-if="objectiveslist.length > 0">客观题</h3>
    <ul v-for="(item, index) of objectiveslist" :key="item.homeworkQuestionId">
      <TabBarItem
        :index="subjectivelist.length + index"
        :item="item"
      ></TabBarItem>
    </ul>
  </div>
</template>

<script>
import TabBarItem from '../components/TabBarItem'
export default {
  name: '',
  components: { TabBarItem },
  data() {
    return {}
  },
  computed: {
    list() {
      return (
        (this.$store.state.marking.questionListInfo &&
          this.$store.state.marking.questionListInfo.homeworkQuestionList) ||
        []
      )
    },
    // 主观题列表
    subjectivelist() {
      return this.list.filter(item => item.questionType === 1)
    },
    // 客观题列表
    objectiveslist() {
      return this.list.filter(item => item.questionType === 2)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.tabbar {
  flex: 0 0 130px;
  width: 130px;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  margin-right: 10px;
  background-color: #fff;
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  h3 {
    padding: 12px 0;
  }
}
</style>
