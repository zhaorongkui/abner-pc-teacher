<style scoped>
.question-number {
  font-size:14px;
  font-weight:bold;
  color:rgba(94,132,173,1);
  line-height:35px;
}
.number-box li {
  cursor: pointer;
  display: inline-block;
  width:40px;
  height:40px;
  background:rgba(255,255,255,1);
  border:2px solid rgba(214, 225, 229, 1);
  border-radius:8px;
  font-size:16px;
  font-weight:500;
  color:rgba(131,131,131,1);
  line-height:36px;
  margin-right: 14px;
  text-align: center;
}
.number-box li:last-child {
  margin-right: 0;
}

.number-box li.number-box-current {
  background: #399EFF;
  border-radius:8px;
  color: #ffffff;
  border-color: #399EFF;
}

</style>
<template>
  <div class="multiple-choice-question">
    <ul class="number-box">
      <li v-for="(item, index) in questionGroupList.length" :key="index" @click="changeQuestionNumber(index)" :class="value === index ? 'number-box-current' : '' ">{{item}}</li>
    </ul>
    <a-divider style="margin: 20px 0;" />
    <div class="question-list-box">
      <question-group :answer="questionGroupList[value].answer" :reply="questionGroupList[value].reply" :options="questionGroupList[value].options" />
    </div>
  </div>
</template>

<script>
// 选择题
import QuestionGroup from './QuestionGroup'
export default {
  name: 'MultipleChoiceQuestion',
  components: {QuestionGroup},
  props: {
    questionGroupList: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    changeQuestionNumber (num) {
      if (num === this.value) {
        return false;
      }
      this.value = num;
      this.$emit('input', this.value)
      this.$emit('on-change', this.value)
    }
  }

}
</script>

