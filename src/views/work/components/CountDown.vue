<template>
  <div class="count-down">
    <p class="text">距离开始</p>
    <span>{{ cdd && cdd.charAt(0) }}</span>
    <span>{{ cdd && cdd.charAt(1) }}</span>
    日
    <span>{{ cdh && cdh.charAt(0) }}</span>
    <span>{{ cdh && cdh.charAt(1) }}</span>
    时
    <span>{{ cdm && cdm.charAt(0) }}</span>
    <span>{{ cdm && cdm.charAt(1) }}</span>
    分
  </div>
</template>

<script>
import { setInterval } from 'timers'
export default {
  name: '',
  components: {},
  props: ['startTime', 'nowTime'],
  data() {
    return {
      timer: null,
      currentTimes: 0,
      day: 0,
      hour: 0,
      min: 0
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.work.currentTime
    },
    restSec() {
      let setTime = new Date(this.startTime)
      let currentTime = new Date(this.currentTime)
      return setTime.getTime() - currentTime.getTime()
    },
    cdd() {
      let day = parseInt(this.restSec / (60 * 60 * 24 * 1000))
      return day > 9 ? String(day) : `0${day}`
    },
    cdh() {
      let hour = parseInt((this.restSec / (60 * 60 * 1000)) % 24)
      return hour > 9 ? String(hour) : `0${hour}`
    },
    cdm() {
      let min = parseInt((this.restSec / (60 * 1000)) % 60)
      return min > 9 ? String(min) : `0${min}`
    }
  },
  mounted() {
    this.currentTimes = this.nowTime
    this.timer = setInterval(() => {
      this.currentTimes += 1000 * 60
      this.$store.commit('work/CURRENTTIME', this.currentTimes)
      if (this.startTime < this.currentTimes) {
        clearInterval(this.timer)
      }
    }, 1000 * 60)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.count-down {
  display: flex;
  align-items: center;
  .text {
    height: 100%;
    font-size: 16px;
    font-weight: bold;
    color: rgba(170, 170, 170, 1);
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  span {
    display: inline-block;
    text-align: center;
    line-height: 79px;
    width: 25px;
    height: 79px;
    background-image: url('../../../assets/img/bg_homework_time_julikaishi_card@2x.png');
    background-size: 100% 100%;
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
