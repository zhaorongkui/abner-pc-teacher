<template>
  <div class="week-calendar">
    <header>
      <Headline title="周历"></Headline>
    </header>

    <ul class="calendar-list">
      <li class="calendar-week">
        <template v-if="week">
          <span class="weekday">第{{ week }}周</span>
          <span class="day">本学期</span>
        </template>
        <template v-else>
          <span class="weekday">假期</span>
        </template>
      </li>
      <li
        class="calendar-day"
        v-for="(item, index) of calendarData"
        :key="index"
        @click="handleSelectDay(item.taskId, index)"
      >
        <span class="weekday" :class="{ task: item.hasTask === 0 }">
          周{{ index | mapIndexToNum }}
        </span>
        <span
          v-if="today === item.taskTime"
          :class="['day', 'today', { active: currentIndex === index }]"
        >
          今天
        </span>
        <span v-else :class="['day', { active: currentIndex === index }]">
          {{ new Date(item.taskTime) | formatDate('M-d') }}
        </span>
      </li>
    </ul>
    <ul class="info-list">
      <template v-if="noPublishGrade.length === 0">
        <li class="info-item">当前没有班级需要发布作业</li>
      </template>
      <template v-else>
        <li class="info-item">
          <img
            src="../../../assets/img/ic_homepage_zhouli_tips@2x.png"
            alt=""
          />
          <span v-for="(item, index) of noPublishGrade" :key="index">
            <template>
              {{ item.gradeClassname }}、
            </template> </span
          >今日还未发布作业
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '../../../filters/index'
import Headline from '../../../components/Headline'
export default {
  name: '',
  components: { Headline },
  filters: {
    mapIndexToNum(value) {
      switch (value) {
        case 0:
          return '日'
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        case 4:
          return '四'
        case 5:
          return '五'
        case 6:
          return '六'
      }
    }
  },
  data() {
    return {
      currentIndex: null
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.home.calendarData.currentTime
    },
    today() {
      return formatDate(this.currentTime, 'yyyy-MM-dd')
    },
    calendarData() {
      return (
        (this.$store.state.home.calendarData.infos &&
          this.$store.state.home.calendarData.infos.tasks) ||
        []
      )
    },
    week() {
      return (
        this.$store.state.home.calendarData.infos &&
        this.$store.state.home.calendarData.infos.week
      )
    },
    noPublishGrade() {
      return this.$store.state.home.noPublishGrade || []
    }
  },
  mounted() {
    this.$store.dispatch('home/timeLine')
    this.$store.dispatch('home/getNoPublishGrade')
  },
  methods: {
    handleSelectDay(taskId, index) {
      if (this.currentIndex === index) return
      this.currentIndex = index
      this.$store.dispatch('home/firstPage', taskId)
    }
  }
}
</script>

<style lang="scss" scoped>
.week-calendar {
  scrollbar-width: none;
  flex: 1;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  margin-right: 10px;
}
header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
}
.calendar-list {
  height: 90px;
  background: rgba(16, 89, 255, 0.03);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin: 10px;
  .calendar-week,
  .calendar-day {
    flex: 1;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .weekday {
      margin-bottom: 10px;
      position: relative;
    }
    .day {
      width: 41px;
      height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .today {
      background: rgba(86, 172, 255, 0);
      border: 1px solid rgba(255, 153, 102, 1);
      box-shadow: 0px 4px 8px 0px rgba(255, 153, 102, 0.19);
      border-radius: 50%;
      color: #f07124;
    }
    .active {
      background-color: #56acff;
      color: #fff;
      border: #fff;
      border-radius: 50%;
    }
    .task::after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #e32d4b;
      position: absolute;
      top: -4px;
      right: -4px;
    }
  }
  .calendar-week {
    flex: 0 0 100px;
    background: rgba(67, 124, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(42, 133, 220, 0.19);
    border-radius: 4px;
    border-top-right-radius: 20px 45px;
    border-bottom-right-radius: 20px 45px;
    .weekday {
      font-size: 16px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .day {
      width: 100%;
      color: rgba(255, 255, 255, 0.67);
      border: none;
      border-radius: none;
    }
  }
}
.info-list {
  height: 80px;
  margin-top: 32px;
  padding: 0 10px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .info-item {
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(84, 101, 126, 1);
    img {
      width: 40px;
      height: 38px;
      margin-right: 7px;
    }
    .data {
      font-size: 12px;
      color: rgba(170, 170, 170, 1);
    }
  }
}
</style>
