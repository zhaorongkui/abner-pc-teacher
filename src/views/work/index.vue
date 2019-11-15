<template>
  <div class="work">
    <WorkMenu></WorkMenu>
    <AppContent>
      <WorkList @flagEvent="flagHandel"></WorkList>
    </AppContent>
    <PublishBtn @click.native="savePageInfo"></PublishBtn>
  </div>
</template>

<script>
import localforage from 'localforage'
import AppContent from '../../components/AppContent'
import PublishBtn from '../../components/PublishHomeweek'
import WorkMenu from './components/WorkMenu'
import WorkList from './components/WorkList'
export default {
  name: 'wrong-topic',
  components: {
    AppContent,
    PublishBtn,
    WorkMenu,
    WorkList
  },
  data() {
    return {
      flagEvent: null
    }
  },
  mounted() {},
  methods: {
    flagHandel(val) {
      this.flagEvent = val
    },
    start() {
      localStorage.setItem('workType', '1')
      this.$store.commit('work/UPDATEHOMEWORKTYPE', '1,2,3,4,5,6')
      localforage.getItem('userInfo').then(value => {
        if (value) {
          this.$store.commit('GETUSERINFO', value)
          // 获取作业列表
          this.$store.commit('work/UPDATECURRENTPAGE', 1)
          this.$store.dispatch('work/homeworkList')
        }
      })
    },
    savePageInfo() {
      localforage.setItem('savePageInfoReturnToRootPage', 'work')
    }
  },
  activated() {
    if (this.$route.meta.isBack == false) {
      this.start()
    } else {
      document.querySelector(
        '.content .list'
      ).scrollTop = this.$route.meta.savedPosition
      if (this.flagEvent == true) {
        this.$store.dispatch('work/homeworkListUptateOne', this.flagEvent)
      } else {
        this.$store.dispatch('work/homeworkListUptateOne')
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.meta.back) {
      to.meta.isBack = true
    } else {
      to.meta.isBack = false
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.work {
  width: 1200px;
  height: calc(100vh - 70px);
  padding: 15px 0;
  margin: 0 auto;
  display: flex;
  position: relative;
}
</style>
