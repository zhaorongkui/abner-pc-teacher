<template>
  <div class="work-menu">
    <div class="header">
      <Headline title="班级选择"> </Headline>
    </div>
    <ul class="classGradeList">
      <li
        class="item"
        :class="!gradeClassId ? 'active' : ''"
        @click="selectGrade()"
      >
        全部班级
      </li>
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
export default {
  name: 'work-menu',
  components: { Headline },
  data() {
    return {}
  },
  computed: {
    gradeClassId() {
      return this.$store.state.work.gradeClassId
    },
    classesList() {
      return this.$store.state.userInfo.classes
    }
  },
  methods: {
    selectGrade(item) {
      if (document.querySelector('.content .list')) {
        document.querySelector('.content .list').scrollTop = 0
      }

      this.$store.commit(
        'work/UPDATEGRADECLASSID',
        (item && item.gradeClassid) || null
      )
      this.$store.commit('work/UPDATECURRENTPAGE', 1)
      this.$store.dispatch('work/homeworkList')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.work-menu {
  width: 180px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
.header {
  flex: 0 0 60px;
  padding: 10px;
  display: flex;
  align-items: center;
}
.classGradeList {
  padding: 0 15px;
  flex: auto;
  overflow: auto;
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
