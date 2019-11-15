<style scoped>
.topic-box {
  width: 100%;
  min-height: 100%;
  border:1px solid rgba(222, 222, 222, 1);
  box-shadow:0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius:4px;
}
.topic-title {
  display: flex;
  padding-right: 21px;
  justify-content: space-between;
  margin-top: 18px;
}
.topic-name {
  padding: 0 6px;
  height:24px;
  line-height: 24px;
  color: #ffffff;
  background:rgba(86,172,255,1);
  border-radius:12px;
  margin-left: 21px;
}
.topic-name-left {
  padding: 0 6px;
  height:24px;
  line-height: 24px;
  color: #ffffff;
  background:rgba(86,172,255,1);
  border-radius:0px 12px 12px 0px;
  margin-left: 0;
}

.topic-type {
  padding: 0 15px;
  height:24px;
  line-height: 24px;
  color: #f4781e;
  border:1px solid rgba(244, 120, 30, 1);
  border-radius:12px;
  margin-left: 21px;
}
.topic-data {
  flex: 1;
  font-size:16px;
  font-weight:400;
  color:rgba(78,95,113,1);
}

.topic-main {
  padding: 11px 21px;
}
.option-list {
  padding-left: 23px;
  display: flex;
  font-size:14px;
  font-weight:400;
  color:rgba(78,95,113,1);
}
.option-list p {
  flex: 1;
  max-width: 100%;
  word-wrap: break-word;
  word-break: normal;
}
.option-box {
  margin-bottom: 10px
}
.current-border {
  border-color:#1059FF
}
</style>

<template>
  <div class="topic" id="topic-all" style="height: 100%;word-wrap: break-word;word-break: normal;max-width: 540px;">
    <div class="topic-box" :class="{'current-border': value === questiondata.questionInfoId}" :id="'topic-' + questiondata.questionInfoId">
      <div class='topic-title' v-if="!(!showTitle && !showType)">
        <div v-if="questiondata.questionTypeCode === 4 && questiondata.childInfoList && questiondata.childInfoList.length" class='topic-name' :class="{'topic-name-left': titleIsLeft}">题目</div>
        <div v-else-if="questiondata.questionTypeCode && questiondata.questionTypeCode !== 4" class='topic-name' :class="{'topic-name-left': titleIsLeft}">题目</div>
        <div v-else class='topic-name' :class="{'topic-name-left': titleIsLeft}">子题{{childkey + 1}}</div>
        <div v-if="!titleToMain" class="topic-data margin-left-20" v-html="questiondata.questionStem"></div>
        <div v-if="showType && questiondata.topicType" class='topic-type'>{{questiondata.topicType}}</div>
      </div>
      <div class='topic-main'>
        <div v-if="titleToMain" class="topic-data margin-left-20" v-html="questiondata.questionStem"></div>

        <div class="option-box" v-if="questiondata.optionsList&&questiondata.optionsList.length">
          <template v-for="(item, index) in questiondata.optionsList">
            <div :key="index" class="option-list">
              <span>{{item.questionOption + '. '}}</span><p v-html="item.questionContent"></p>
            </div>
          </template>
        </div>
        <template v-if="questiondata.questionAnswer">
          <topic-item title="参考答案" :htmlStr="answer" :questiontype="questiondata.questionTypeCode"></topic-item>
        </template>
        <template v-if="questiondata.questionAnalysis">
          <topic-item title="解析" :htmlStr="questiondata.questionAnalysis"></topic-item>
        </template>
        <template v-if="questiondata.thought">
          <topic-item title="解题思路" :htmlStr="questiondata.thought"></topic-item>
        </template>
        <template v-if="questiondata.childInfoList && questiondata.childInfoList.length">
          <template v-for="(item, index) in questiondata.childInfoList">
            <topic 
              :value='value'
              :questiondata="item" 
              :key="index" 
              :childkey="index"
              style="marginBottom: 10px" 
              :showType="false" />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import topicItem from './topic-item'
export default {
  name: 'Topic',
  components: {topicItem},
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    childkey: {
      type: Number
    },
    questiondata: {
      type: Object
    },
    showType: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    titleToMain: {
      type: Boolean,
      default: false
    },
    titleIsLeft: {
      type: Boolean,
      default: true
    },
    topicData: {
      type: Object,
      default () {
        return {
          topicName: '默认标题',
          topicProblem: '题目问题',
          topicType: '题目类型',
          topicMain: '默认内容默认内容默认内容默认内容默认内容默认内容',
          reference: '参考内容',
          thought: '解题思路',
          analysis: '解析内容',
          children: [
            {
              topicName: '默认标题',
              topicProblem: '题目问题',
              topicType: '题目类型',
              topicMain: '默认内容默认内容默认内容默认内容默认内容默认内容',
              reference: '参考内容',
              analysis: '解析内容',
            },
            {
              topicName: '默认标题',
              topicProblem: '题目问题',
              topicType: '题目类型',
              topicMain: '默认内容默认内容默认内容默认内容默认内容默认内容',
              reference: '参考内容',
              analysis: '解析内容',
            },
            {
              topicName: '默认标题',
              topicProblem: '题目问题',
              topicType: '题目类型',
              topicMain: '默认内容默认内容默认内容默认内容默认内容默认内容',
              reference: '参考内容',
              analysis: '解析内容',
            }
          ]
        }
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    answer() {
      if(this.questiondata.questionAnswer && this.questiondata.questionTypeCode === 5) {
        let src = '';
        let data = JSON.parse(this.questiondata.questionAnswer);
        data.forEach((item, index) => {
          src += `<span>${index+1}、 ${decodeURIComponent(item.answer.join('，'))}</span><br/>`
        })
        return `<p>${src}</p >`
      }else {
        return this.questiondata.questionAnswer || ''
      }
    }
  },
  methods: {
    setValue(getValue, time) {
      if(time === 1) {
        let dom = document.getElementById('topic-all')
        dom.scrollIntoView()
      }else {
        let dom = document.getElementById('topic-' + getValue)
        dom.scrollIntoView()
      }
    }
  }
}
</script>
