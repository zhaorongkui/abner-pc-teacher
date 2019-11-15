<template>
  <div class="menu-item" v-if="item">
    <div class="content">
      <div class="body">
        <div class="stem" v-html="item.questionStem"></div>
        <!-- 选择题选项 -->
        <div v-if="item.questionTypeCode === 1 || item.questionTypeCode === 2">
          <ChoiceItem :questionOptions="item.questionOptions"></ChoiceItem>
        </div>
        <div v-show="toggle" class="main">
          <div class="title" v-if="item.questionTypeCode !== 4">
            参考答案
          </div>
          <!-- 选择题 -->
          <template
            v-if="
              item.questionTypeCode === 1 ||
                item.questionTypeCode === 2 ||
                item.questionTypeCode === 6
            "
          >
            <div v-html="item.questionAnswer"></div>
          </template>
          <!-- 判断题 -->
          <template v-if="item.questionTypeCode === 3">
            <TrueOrFalse :trueOrFalse="item.questionAnswer"></TrueOrFalse>
          </template>
          <!-- 填空题 -->
          <template v-if="item.questionTypeCode === 5">
            <GapFilling :answer="item.questionAnswer"></GapFilling>
          </template>
          <template v-if="item.questionTypeCode === 4">
            <!-- {题组} -->
            <ChildQuestionInfoList></ChildQuestionInfoList>
          </template>
          <div class="title" v-if="item.questionTypeCode !== 4">
            解析
          </div>
          <div
            v-if="item.questionTypeCode !== 4"
            v-html="item.questionAnalysis"
          ></div>
          <!-- <div class="title">学生过往答案</div>
          <div>
            {{ item.questionAnswerinfo }}
          </div> -->
        </div>
      </div>
      <ul class="footer">
        <li>
          来源
          <span>{{
            (item.questionSourceId === 1 ? '试卷' : '练习册') || '--'
          }}</span>
        </li>
        <li>
          页数
          <span>{{ item.workbookChapterPage || '--' }}</span>
        </li>
        <li>
          题号
          <span>{{ item.questionNumber || '--' }}</span>
        </li>
        <li>
          题型
          <span>{{ item.questionTypeName || '--' }}</span>
        </li>
        <li>
          难易度
          <span>{{
            item.questionDegreedifficulty === '0.75'
              ? '简单'
              : item.questionDegreedifficulty === '0.5'
              ? '中等'
              : '困难' || '--'
          }}</span>
        </li>
        <li>
          分值
          <span>{{ item.questionScore || '--' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ChoiceItem from './ChoiceItem' // 选择题题干
import TrueOrFalse from './TrueOrFalse' // 判断题
import GapFilling from './GapFilling' // 填空题
import ChildQuestionInfoList from './ChildQuestionInfoList' // 题组
export default {
  name: 'child-item',
  components: { TrueOrFalse, ChoiceItem, GapFilling, ChildQuestionInfoList },
  props: ['item'],
  data() {
    return {
      toggle: true
    }
  },
  methods: {
    handleToggle() {
      if (!this.toggle && this.item.questionTypeCode === 4) {
        this.$store.dispatch('question/homeworkDetail', {
          questionInfoId: this.item.questionInfoId,
          questionTypeCode: this.item.questionTypeCode
        })
      }
      this.toggle = !this.toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  .content {
    flex: auto;
    display: flex;
    flex-direction: column;
    .body {
      padding: 20px;
      flex: auto;
      position: relative;
      .stem {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        color: rgba(78, 95, 113, 1);
        margin-bottom: 20px;
        p {
          font-size: 14px;
        }
      }
      .toggle {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: 10px;
          height: 12px;
          margin-right: 5px;
        }
      }
      .main {
        .title {
          display: inline-block;
          border-radius: 12px;
          background-color: #56acff;
          color: #fff;
          padding: 0 10px;
          height: 24px;
          line-height: 24px;
          margin: 10px 0;
        }
      }
    }
    .footer {
      padding: 0 20px;
      border-top: 1px solid rgba(222, 222, 222, 1);
      height: 30px;
      font-size: 12px;
      font-weight: 400;

      display: flex;
      align-items: center;
      li {
        flex: auto;
        border-right: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        span {
          color: #757575;
          margin-left: 5px;
        }
      }
      // li:nth-child(4) {
      // flex: 0 0 30%;
      // }
      li:last-child {
        border-right: none;
      }
    }
  }
  .collect {
    border-left: 1px solid rgba(222, 222, 222, 1);
    flex: 0 0 270px;
    .wrap {
      height: 138px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 37px;
      height: 37px;
      margin-right: 4px;
    }
  }
}
</style>
