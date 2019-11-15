<style scoped>
.question-group-main {
  display: flex;
  align-items: flex-start;
}
.answer-box,
.reply-box {
  padding: 6px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(185, 185, 185, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 12px;
}
.box-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(78, 95, 113, 1);
  text-align: center;
}
.answer-box {
  margin-right: 12px;
}
.option {
  cursor: pointer;
  width: 252px;
  min-height: 50px;
  overflow: hidden;
  background: rgba(240, 240, 240, 1);
  border-radius: 5px;
  padding: 0 13px;
  align-items: center;
  display: flex;
  margin-top: 8px;
}
.option-value {
  font-size: 16px;
  font-weight: 400;
  word-break: break-all;
  color: rgba(170, 170, 170, 1);
  margin-right: 14px;
}
.option-label {
  flex: 1;
  font-size: 16px;
  font-weight: 400;
}
.reply-option {
  cursor: pointer;
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 76px;
  min-height: 50px;
  background: rgba(240, 240, 240, 1);
  border-radius: 5px;
  margin-top: 8px;
  line-height: 50px;
}
.reply-option-value {
  font-size: 16px;
  font-weight: 400;
  word-break: break-all;
  color: rgba(78, 95, 113, 1);
}

.option-success {
  color: rgba(19, 169, 159, 1);
  background: rgba(221, 221, 221, 1);
}

.option-error {
  color: rgba(253, 98, 101, 1);
}

.reply-option-success {
  background: #c4f3f0;
  border: 1px solid rgba(19, 169, 159, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
}
.reply-option-success::before {
  content: '做对了!';
  color: #13a99f;
}
.reply-option-error {
  background: #ffebeb;
  border: 1px solid rgba(255, 99, 101, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
}
.reply-option-error::before {
  content: '做错了!';
  color: #ff6365;
  display: flex;
  align-items: center;
}

.reply-option-success::before,
.reply-option-error::before {
  position: absolute;
  font-size: 14px;
  top: 0;
  bottom: 0;
  right: -70px;
  margin: auto 0;
}
</style>
<template>
  <div class="question-group">
    <div class="question-group-main">
      <div class="answer-box">
        <div class="box-title">参考答案</div>
        <template v-for="(item, index) in options">
          <div
            class="option"
            :key="index"
            :class="
              answer.includes(item.value) ? 'option-success' : 'option-error'
            "
          >
            <span class="option-value">{{ item.value }}</span>
            <p class="option-label" v-html="item.label"></p>
          </div>
        </template>
      </div>
      <div class="reply-box">
        <div class="box-title">学生答案</div>
        <template v-for="(item, index) in options">
          <div
            v-if="!multiple"
            class="reply-option"
            :key="index"
            :class="
              item.value === reply
                ? isSuccess
                  ? 'reply-option-success'
                  : 'reply-option-error'
                : ''
            "
          >
            <span class="reply-option-value">{{ item.value }}</span>
          </div>
          <div
            v-else
            class="reply-option"
            :key="index"
            :class="
              reply.includes(item.value)
                ? answer.includes(item.value)
                  ? 'reply-option-success'
                  : 'reply-option-error'
                : ''
            "
          >
            <span class="reply-option-value">{{ item.value }}</span>
          </div>
        </template>
      </div>
    </div>
    <div style="marginTop: 40px">
      <legend-list :legendList="legendList" />
    </div>
  </div>
</template>

<script>
// 题组
import LegendList from '../LegendList'
export default {
  name: 'questionGroup',
  components: { LegendList },
  props: {
    answer: {
      type: [String, Array],
      required: ''
    },
    reply: {
      type: [String, Array],
      required: ''
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    legendList: {
      type: Array,
      default() {
        return [
          {
            text: '正确答案',
            bgColor: '#13A99F',
            color: '#ffffff'
          },
          {
            text: '错误答案',
            bgColor: '#FD6265',
            color: '#ffffff'
          }
        ]
      }
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSuccess() {
      return this.answer === this.reply
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
