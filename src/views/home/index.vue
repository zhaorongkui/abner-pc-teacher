<template>
  <div class="home">
    <AppMenu>
      <div class="menu-wrap">
        <header>
          <Headline title="教学进度"></Headline>
          <div class="rule" @click="hanldeShowRule">
            提醒规则<a-icon type="right" />
          </div>
          <div class="warnRule" v-if="isShowRule">
            <div class="modal"></div>
            <warnRule @onClick="hanldeShowRule"></warnRule>
          </div>
        </header>
        <Menu></Menu>
      </div>
    </AppMenu>
    <AppContent>
      <div class="flexbox wrap">
        <WeekCalender></WeekCalender>
        <TrendAnalyse></TrendAnalyse>
      </div>
      <Task></Task>
    </AppContent>
    <PublishBtn @click.native="savePageInfo"></PublishBtn>
  </div>
</template>

<script>
import AppMenu from '../../components/AppMenu'
import AppContent from '../../components/AppContent'
import Headline from '../../components/Headline'
import Menu from './components/Menu'
import WeekCalender from './components/WeekCalendar'
import TrendAnalyse from './components/TrendAnalyse'
import Task from './components/Task'
import PublishBtn from '../../components/PublishHomeweek'
import warnRule from './components/WarnRule'
import localforage from 'localforage'
export default {
  name: '',
  components: {
    AppMenu,
    AppContent,
    Menu,
    Headline,
    WeekCalender,
    TrendAnalyse,
    Task,
    PublishBtn,
    warnRule
  },

  data() {
    return {}
  },
  computed: {
    isShowRule() {
      return this.$store.state.home.isShowRule
    }
  },
  mounted() {
    localStorage.setItem('workType', '1')
    this.$store.commit('work/UPDATEHOMEWORKTYPE', 1)
    this.$store.dispatch('home/teacherWarnSet')
  },
  methods: {
    hanldeShowRule() {
      this.$store.dispatch('home/toggleIsShowRule')
    },
    savePageInfo() {
      localforage.setItem('savePageInfoReturnToRootPage', 'home')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 1200px;
  height: 100%;
  padding: 15px 0;
  display: flex;
  position: relative;
  scrollbar-width: none;
}
.menu-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  flex: 0 0 60px;
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(84, 101, 126, 1);
  position: relative;
  .rule {
    cursor: pointer;
  }
  .warnRule {
    width: 320px;
    height: 270px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    position: absolute;
    top: 10px;
    right: -330px;
    z-index: 99;
    .modal {
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }
  }
}
.task-wrap {
  flex: auto;
}
.wrap {
  height: 300px;
  flex: 0 0 300px;
}
</style>
