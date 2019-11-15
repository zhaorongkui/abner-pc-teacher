<template>
  <div class="wrap-popover">
    <div class="popover">
      <div class="head">
        <span class="chapter">
          <img
            class="popup-logo"
            src="../../../assets/img/ic_homepage_popup_part@2x.png"
            alt=""
          />{{ text }}</span
        >
        <span v-if="ingoreState === 0" @click="openIngoreWarn">
          <img src="../../../assets/img/ic_homepage_warn@2x.png" alt="" />
          打开预警</span
        >
        <span v-if="ingoreState === 1" @click="closeIngoreWarn">
          <img src="../../../assets/img/ic_homepage_warn_no@2x.png" alt="" />
          忽略预警</span
        >
      </div>
      <div class="rate" v-if="pageHomeworkInfo.length > 0">
        <div class="true-rate">
          <h3 v-if="trueRate !== '--'">{{ trueRate }}<span>%</span></h3>
          <h3 v-else>--</h3>
          <p>正确率</p>
        </div>
        <div class="finish-rate">
          <h3 v-if="submitRate !== '--'">{{ submitRate }}<span>%</span></h3>
          <h3 v-else>--</h3>
          <p>提交率</p>
        </div>
      </div>

      <ul class="list" v-if="pageHomeworkInfo.length > 0">
        <li class="item" v-for="(item, index) of list" :key="index">
          <div class="homework">
            <ul class="homework-info">
              <li>
                <div>
                  <img src="../../../assets/img/icon_class@2x.png" alt="" />{{
                    item.gradeClassname
                  }}
                </div>
                <template v-if="item.children.length > 0">
                  <div v-if="handleTrueRate(item) === '--'">正确率 --</div>
                  <div v-else>正确率{{ handleTrueRate(item) }}%</div>

                  <div v-if="handleFinishRate(item) === '--'">提交率 --</div>
                  <div v-else>提交率{{ handleFinishRate(item) }}%</div>
                </template>
                <template v-else>
                  <div>正确率 --</div>
                  <div>提交率 --</div>
                </template>
              </li>
              <li
                class="homework"
                v-if="item.children.length === 0"
                :key="index"
              >
                <span>--</span>
                <span>--</span>
                <span>--</span>
              </li>
              <li
                v-else
                v-for="(homework, index) of item.children"
                class="homework"
                :key="index"
              >
                <span>{{ homework.homeworkName }}</span>
                <span
                  :class="
                    homework.trueRate && homework.trueRate < trueRateWarn
                      ? 'warn'
                      : ''
                  "
                  >{{
                    (homework.trueRate && homework.trueRate + '%') || '--'
                  }}</span
                >
                <span
                  :class="
                    homework.submitRate && homework.submitRate < submitRateWarn
                      ? 'warn'
                      : ''
                  "
                  >{{
                    (homework.submitRate && homework.submitRate + '%') || '--'
                  }}</span
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="no-homework" v-else>
        <div class="homepage-empty">
          <img src="../../../assets/img/pic_homepage_empty@2x.png" alt="" />
          <p>还没有布置过作业~</p>
        </div>
      </div>
      <div class="publish-btn" @click="handleGo">布置作业</div>
    </div>
  </div>
</template>

<script>
import { message as Message } from 'ant-design-vue'
export default {
  name: '',
  components: {},
  props: [
    'name',
    'text',
    'ingoreState',
    'textbookChapterId',
    'textbookId',
    'textbookChapterCode'
  ],
  // props: {
  //   name: {
  //     type: String
  //   },
  //   text: {
  //     type: String
  //   },
  //   ingoreState: {
  //     type: Number,
  //     required: true
  //   },
  //   textbookChapterId: {
  //     type: Number,
  //     require: true
  //   },
  //   textbookId: {
  //     type: Number,
  //     required: true
  //   },
  //   textbookChapterCode: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      overlayStyle: {
        width: '580px',
        height: '500px'
      }
    }
  },
  computed: {
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    },
    gradeClass() {
      return this.$store.state.userInfo.classes
    },
    pageHomeworkInfo() {
      return this.$store.state.home.pageHomeworkInfo
    },
    list() {
      let list = [...this.gradeClass]
      list.forEach((classes, index) => {
        list[index] = { ...classes, children: [] }
        this.pageHomeworkInfo.forEach(item => {
          if (classes.gradeClassid === item.gradeClassid) {
            list[index].children.push(item)
          }
        })
      })
      return list
    },
    trueRate() {
      let rate = 0
      let length = this.gradeClass.length

      this.list.forEach(item => {
        let isUndefined = item.children.every(
          value => value.trueRate === undefined
        )
        if (isUndefined) {
          length -= 1
        }
        let gradeClassRate = this.handleTrueRate(item)
        if (gradeClassRate !== '--') {
          rate += gradeClassRate
        }
      })
      if (length === 0) {
        return '--'
      }
      let result = rate / length
      if (result === 0) {
        return 0
      }
      return result.toFixed(1)
    },
    submitRate() {
      let rate = 0
      let length = this.gradeClass.length
      let count = this.gradeClass.length
      this.list.forEach(item => {
        let isUndefined = item.children.every(
          value => value.submitRate === undefined
        )
        if (isUndefined) {
          length -= 1
        }
        if (item.children.length === 0) {
          count -= 1
        }
        let gradeClassRate = this.handleFinishRate(item)
        if (gradeClassRate !== '--') {
          rate += gradeClassRate
        }
      })
      if (length === 0) {
        return '--'
      }
      let result = rate / count
      if (result === 0) {
        return 0
      }
      return result.toFixed(1)
    },
    teacherWarnValue() {
      return this.$store.state.home.teacherWarnValue
    },
    submitRateWarn() {
      return this.teacherWarnValue.submitRateWarn
    },
    trueRateWarn() {
      return this.teacherWarnValue.trueRateWarn
    }
  },
  mounted() {},
  methods: {
    handleFinishRate(item) {
      let length = item.children.length
      let rate = 0
      let isUndefined = item.children.every(
        value => value.submitRate === undefined
      )
      if (isUndefined) return '--'

      item.children.forEach(value => {
        if (value.submitRate !== undefined) {
          rate += Number(value.submitRate)
        }
      })
      let result = rate / length
      if (result === 0) {
        return 0
      }
      return Number(result.toFixed(1))
    },
    handleTrueRate(item) {
      let length = item.children.length
      let rate = 0
      let isUndefined = item.children.every(
        value => value.trueRate === undefined
      )
      if (isUndefined) return '--'

      item.children.forEach(value => {
        if (value.trueRate == undefined) {
          length -= 1
        } else {
          rate += Number(value.trueRate)
        }
      })
      let result = rate / length
      if (result === 0) {
        return 0
      }
      return Number(result.toFixed(1))
    },
    openIngoreWarn() {
      this.$http
        .post('/teacherApi/index/openIngoreWarn', {
          teacherId: this.$store.getters.teacherId,
          textbookChapterId: this.textbookChapterId,
          textbookId: this.textbookId
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            Message.success('打开成功')
            this.$emit('onHide')
            this.$store.dispatch('home/pageHomeworkChapter')
          }
        })
    },
    closeIngoreWarn() {
      this.$http
        .post('/teacherApi/index/closeIngoreWarn', {
          teacherId: this.$store.getters.teacherId,
          textbookChapterId: this.textbookChapterId,
          textbookId: this.textbookId,
          textbookChapterCode: this.textbookChapterCode
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            Message.success('忽略成功')
            this.$emit('onHide')
            this.$store.dispatch('home/pageHomeworkChapter')
          }
        })
    },
    handleGo() {
      this.$router.push('/publish-work')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-popover {
  width: 520px;
  height: 100vh;
  padding: 0 10px;
  position: absolute;
  top: -136px;
  left: 280px;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 9999;
  scrollbar-width: none;
}
.popover {
  width: 500px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0px 8px 12px 0px rgba(167, 167, 167, 0.33);
  border-radius: 10px;
}
.head {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  background-color: #1059ff;
  font-size: 14px;
  color: #fff;
  .chapter {
    font-size: 18px;
    max-width: 390px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    img {
      width: 30px;
      height: 30px;
    }
  }
  span {
    cursor: pointer;
  }
  img {
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    margin-top: -4px;
  }
}
.popup-logo {
  width: 30px;
  height: auto;
  margin-right: 10px;
}
.rate {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #1059ff;

  h3 {
    font-size: 30px;
    color: #fff;
    text-align: center;
    span {
      font-size: 12px;
    }
  }
  p {
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
.list {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  .item {
    width: 100%;
    height: auto;
    display: flex;
    margin-bottom: 10px;
    .grade-class {
      // width: 24px;
      flex: 0 0 60px;
      background: rgba(99, 147, 255, 1);
      border-radius: 4px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .homework {
      flex: auto;
      padding: 10px;
      .homework-info {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(233, 233, 233, 1);
        li {
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 10px;
          img {
            width: 18px;
            height: 18px;
            margin-right: 14px;
          }
          span {
            flex: 0 0 25%;
            font-size: 12px;
            flex-wrap: nowrap;
          }
          span:nth-child(1) {
            flex: 0 0 50%;
          }
          div {
            flex: 0 0 25%;
          }
          div:nth-child(1) {
            flex: 0 0 50%;
          }
        }
        li:nth-child(1) {
          background-color: #f2f6fd;
        }
      }
    }
  }
}
.no-homework {
  .homepage-empty {
    height: 291px;
    text-align: center;
    img {
      width: 200px;
      height: 175px;
      margin-top: 40px;
    }
    p {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: rgba(97, 129, 202, 1);
    }
  }
}
.publish-btn {
  width: 460px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 20px auto;
  background: rgba(16, 89, 255, 1);
  border-radius: 20px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.warn {
  color: red;
}
</style>
