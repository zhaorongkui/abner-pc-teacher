<template>
  <div class="wrong-topic-menu">
    <div class="header">
      <Headline title="班级选择"></Headline>
    </div>
    <ul class="classGradeList">
      <li
        class="item"
        v-for="(item, index) of classesList"
        :key="index"
        :class="item.gradeClassid === gradeClassId ? 'active' : ''"
        @click="selectGrade(item)"
      >
        {{ item.gradeClassname }}
      </li>
    </ul>
  </div>
</template>

<script>
import Headline from '@/components/Headline'
import localforage from 'localforage'
export default {
  name: 'wrong-topic-menu',
  components: { Headline },
  data() {
    return {}
  },
  computed: {
    gradeClassId() {
      return this.$store.state.question.gradeClassId
    },
    classesList() {
      return this.$store.state.userInfo.classes
    }
  },
  methods: {
    selectGrade(item) {
      this.$store.commit('question/UPDATEGRADECLASSID', item.gradeClassid)
      this.$store.commit('question/UPDATESORT', {
        sortColumn: 'ERROR_COUNT',
        sortRule: 'Desc'
      })
      this.$store.dispatch('question/wrongQuestionList')
      this.$store.dispatch('question/isSendAll')
    }
  },
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.$store.commit(
          'question/UPDATEGRADECLASSID',
          this.classesList[0].gradeClassid
        )
        this.$store.dispatch('question/wrongQuestionList')
        this.$store.dispatch('question/isSendAll')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.wrong-topic-menu {
  height: 100%;
  overflow-y: auto;
}
.header {
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
}
.classGradeList {
  width: 280px;
  padding: 0 15px;
  margin: 0 auto;
  .item {
    height: 36px;
    color: rgba(78, 95, 113, 1);
    border-radius: 36px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    line-height: 36px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .active {
    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    background: rgba(18, 90, 255, 1);
  }
}
</style>
