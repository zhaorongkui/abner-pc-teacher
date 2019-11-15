<template>
  <div class="task-list">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in list" :key="index">
        <div class="task-list-item">
          <div class="content">
            <div class="task-mark">
              <div class="homeworkType">
                <!-- {{ slide.homeworkType === 1 ? '日常' : '错题' }} -->
                {{ slide.homeworkType | getWorkType }}
              </div>
              <div class="isHp" v-if="slide.appealNum > 0">申</div>
              <div class="appeal" v-if="slide.isHp === 1">互</div>
            </div>
            <div class="main">
              <template v-if="slide.homeworkStartTime > taskCurrentTime">
                <div>
                  <img
                    class="noTask"
                    src="../../../assets/img/pic_homepage_card_book@2x.png"
                    alt=""
                  />
                </div>
              </template>
              <template v-else>
                <div class="count">{{ slide.waitReviewNum }}</div>
                <p class="toRead">待批阅</p>
              </template>
              <p class="currentDate">{{ slide.homeworkName }}</p>
              <p class="deadline">
                截止时间：{{
                  slide.homeworkEndtime | formatDate('yyyy-MM-dd hh:mm')
                }}
              </p>
              <p class="gradeClass">
                {{ slide.grade | filtergrade }}{{ slide.gradeClassname }}
              </p>
              <div
                class="process"
                v-if="slide.homeworkStartTime < taskCurrentTime"
              >
                <div>完成情况</div>
                <div class="tooltip">
                  <div class="process-bar">
                    <div
                      class="processing"
                      :style="{
                        width:
                          (slide.finishStudentNum / slide.studentNum) * 100 +
                          '%'
                      }"
                    >
                      <div class="submiter">
                        已交：{{ slide.finishStudentNum }}人
                      </div>
                    </div>
                  </div>
                </div>
                <div>共{{ slide.studentNum }}人</div>
              </div>
              <CountDown
                v-if="slide.homeworkStartTime > taskCurrentTime"
                :startTime="slide.homeworkStartTime"
                :nowTime="taskCurrentTime"
              ></CountDown>
              <div
                class="btn"
                @click="handleGo(slide)"
                v-else-if="slide.waitReviewNum > 0"
              >
                去批阅
              </div>
              <div class="btn" @click="handleGo(slide)" v-else>去查看</div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import localforage from 'localforage'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import CountDown from './CountDown'
export default {
  name: 'carrousel',
  components: {
    swiper,
    swiperSlide,
    CountDown
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      }
    }
  },
  computed: {
    taskCurrentTime() {
      return this.$store.state.home.taskCurrentTime
    }
  },
  filters: {
    getWorkType(val) {
      if (!val) {
        return '暂无'
      }
      let value = Number(val)
      switch (value) {
        case 1:
          return '日常'
        case 2:
          return '错题'
        case 5:
          return '阅读'
        case 6:
          return '作文'
        default:
          return '暂无'
      }
    },
    filtergrade(value) {
      switch (value) {
        case '1':
          return '一年级'
        case '2':
          return '二年级'
        case '3':
          return '三年级'
        case '4':
          return '四年级'
        case '5':
          return '五年级'
        case '6':
          return '六年级'
        case '7':
          return '七年级'
        case '8':
          return '八年级'
        case '9':
          return '九年级'
        case '10':
          return '高一'
        case '11':
          return '高二'
        case '12':
          return '高三'
      }
    }
  },
  methods: {
    handleGo(slide) {
      localforage.setItem('workListItem', slide).then(() => {
        this.$router.push({
          name: 'work-grading-assignment',
          params: { item: slide }
        })
      })
      localforage.setItem('dataStatistics', slide)
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-container,
.swiper-slide {
  width: 100%;
  height: 100%;
}
.task-list {
  scrollbar-width: none;
  width: 100%;
  height: 455px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-wrap: nowrap;
  .task-list-item {
    height: 100%;
    flex: 0 0 33.33%;
    .content {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      background-image: url('../../../assets/img/bg_homepage_card@2x.png');
      background-size: 100% 100%;
    }
  }
}
.task-mark {
  padding: 20px 0 0;
  width: 100%;
  height: 44px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  .homeworkType {
    float: left;
    width: 36px;
    height: 24px;
    background: rgba(86, 172, 255, 1);
    border-radius: 0px 12px 12px 0px;
    text-align: center;
    line-height: 24px;
    margin-left: 7px;
  }
  .appeal,
  .isHp {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    float: right;
    text-align: center;
    line-height: 24px;
  }
  .appeal {
    background: rgba(255, 99, 101, 1);
    margin-right: 10px;
  }
  .isHp {
    background: rgba(86, 172, 255, 1);
    margin-right: 18px;
  }
}
.main {
  text-align: center;
  .count {
    font-size: 48px;
    font-weight: bold;
    color: rgba(7, 16, 160, 1);
  }
  .toRead {
    font-size: 12px;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
  }
  .noTask {
    width: 42px;
    height: 50px;
    margin-bottom: 43px;
  }
  .currentDate {
    font-size: 20px;
    font-weight: bold;
    color: #5e84ad;
    margin-top: 24px;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .deadline {
    font-size: 14px;
    font-weight: 400;
    color: rgba(150, 150, 150, 1);
    margin-bottom: 10px;
  }
  .gradeClass {
    width: 100px;
    margin: 0 auto 10px;
    background: rgba(60, 99, 157, 1);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
  .process {
    width: 100%;
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    color: rgba(150, 150, 150, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    div {
      flex: auto;
    }
    div:nth-child(2) {
      width: 100px;
      cursor: pointer;
    }
    .process-bar {
      width: 100%;
      height: 8px;
      background-color: #e8f0fb;
      border-radius: 4px;
      .processing {
        height: 8px;
        background-color: #56acff;
        border-radius: 4px;
        position: relative;
        .submiter {
          height: 28px;
          line-height: 24px;
          min-width: 90px;
          padding: 0 10px;
          background-image: url('../../../assets/img/ic_index_jiaoxuejindu_yijiaobg_normal@2x.png');
          background-size: 100% 100%;
          position: absolute;
          top: -26px;
          right: 0;
          transform: translateX(50%);
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .btn {
    width: 140px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 45px auto 0;
    background: #1059ff;
    border: 1px solid #1059ff;
    box-shadow: 0px 4px 6px 0px rgba(16, 89, 255, 0.2);
    border-radius: 16px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
</style>
