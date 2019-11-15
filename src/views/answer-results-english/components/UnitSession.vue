<template>
  <div class="reading-stem-wrap">
    <div class="reading-stem" v-if="videoQuestionStemList.questionType == 1">
      <div class="stem-answer-infos">
        <div>题目</div>
        <div class="answer-infos">
          <p>{{ videoQuestionStemList.questionTitle }}</p>
        </div>
      </div>
      <div class="answer-infos-type">
        <div
          class="answer-infos-type-1"
          v-for="(item, index) in videoQuestionStemList.videoQuestionStemList"
          :key="index"
        >
          <p>
            <span>原文</span>
            <span v-html="item.questionStemContent" ref="menuItem"></span>
          </p>

          <p>
            <span>翻译</span>
            <span v-html="item.questionStemTranslate"></span>
          </p>
        </div>
      </div>
    </div>
    <div v-else class="follow-up">
      <div class="follow-up-infos">
        <div>题目</div>
        <div>
          <p>{{ videoQuestionStemList.questionTitle }}</p>
        </div>
      </div>
      <div>
        <div
          class="follow-up-answer-infos"
          :class="selectItemType == index ? 'hover-p' : ''"
          v-for="(item, index) in videoQuestionStemList.videoQuestionStemList"
          :key="index"
          @click="selectItem(index)"
        >
          <p>
            <span>原文</span>
            <span v-html="item.questionStemContent" ref="menuItem"></span>
          </p>

          <p>
            <span>翻译</span>
            <span v-html="item.questionStemTranslate"></span>
          </p>
        </div>

        <!-- <img
          src="../../../../assets/img/publish/ic_homepage_word_arrow_sellected.png"
          alt=""
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['studentInfoId'],
  data() {
    return {
      type: 1,
      selectItemType: 0,
      getMenuText: '',
      videoQuestionStemList: {}
    }
  },
  computed: {},
  components: {},
  mounted() {
    console.log(this.studentInfoId)
    this.homeworkInfo()
  },
  methods: {
    selectItem(t) {
      this.selectItemType = t
    },
    //英语听说答题结果
    homeworkInfo() {
      this.$http
        .get('/api/teacher/homework/video/info', {
          params: {
            homeworkId: this.dataItem.homeworkId,
            studentId: this.studentInfoId
          }
        })
        .then(res => {
          if (res.data.flag == 1) {
            res.data.infos.forEach(item => {
              if (item.questionType == 1) {
                this.readingTextData.push(item)
              } else {
                this.readSDentenceData.push(item)
              }
            })

            if (this.readSDentenceData.length == 0) {
              this.videoQuestionStemList = this.readingTextData[0]
            }
            if (this.readingTextData.length == 0) {
              this.videoQuestionStemList = this.readSDentenceData[0]
            }
            if (
              this.readingTextData.length == 0 &&
              this.readSDentenceData.length == 0
            ) {
              this.videoQuestionStemList = []
            }
            if (
              this.readingTextData.length != 0 &&
              this.readSDentenceData.length != 0
            ) {
              this.videoQuestionStemList = this.readSDentenceData[0]
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.reading-stem-wrap {
  @include wh(auto, 98%);
  flex: 0 0 640px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  border-radius: 4px;
  .reading-stem {
    @include wh(100%, auto);
    padding-bottom: 20px;
    .stem-answer-infos {
      @include wh(100%, auto);
      margin-top: 10px;
      min-height: 120px;
      @include fj();
      > div:nth-child(1) {
        @include wh(auto, 24px);
        background: rgba(86, 172, 255, 1);
        border-radius: 0px 12px 12px 0px;
        text-align: center;
        line-height: 24px;
        @include sc(12px, #fff);
        flex: 0 0 44px;
      }
      .answer-infos {
        @include wh(auto, auto);
        flex: auto;
        margin-left: 10px;
        padding: 0 10px 10px;
        > p {
          width: 100%;
          @include sc(14px, #4e5f71);
          line-height: 20px;
        }
      }
    }
    .answer-infos-type {
      @include wh(94%, auto);
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin: 0 auto;
      .answer-infos-type-1 {
        @include wh(96%, auto);
        margin: 0 auto;
        p {
          @include fj();
          flex-direction: column;

          span:nth-child(1) {
            background: rgba(86, 172, 255, 1);
            border-radius: 12px;
            @include fj(center);
            align-items: center;
            @include sc(12px, #fff);
          }
          span:nth-child(2) {
            margin: 10px;
            @include sc(14px, #4e5f71);
          }
        }
        p:nth-child(1) {
          span:nth-child(1) {
            @include wh(66px, 24px);
          }
        }
        p:nth-child(2) {
          span:nth-child(1) {
            @include wh(41px, 24px);
          }
        }
      }
    }
  }
  .follow-up {
    @include wh(100%, auto);
    padding-bottom: 20px;
    .follow-up-infos {
      @include wh(100%, auto);
      margin-top: 10px;
      min-height: 120px;
      @include fj();
      > div:nth-child(1) {
        @include wh(auto, 24px);
        background: rgba(86, 172, 255, 1);
        border-radius: 0px 12px 12px 0px;
        text-align: center;
        line-height: 24px;
        @include sc(12px, #fff);
        flex: 0 0 44px;
      }
      > div:nth-child(2) {
        @include wh(auto, auto);
        flex: auto;
        margin-left: 10px;
        padding: 0 10px 10px;
        > p {
          width: 100%;
          @include sc(14px, #4e5f71);
          line-height: 20px;
        }
      }
    }
    > div:nth-child(2) {
      @include wh(92%, auto);
      @include fj();
      align-items: center;
      margin: 10px auto 0;
      .follow-up-answer-infos {
        @include wh(100%, auto);
        padding: 5px;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 10px 10px;
        p {
          @include fj();
          flex-direction: column;

          span:nth-child(1) {
            background: rgba(86, 172, 255, 1);
            border-radius: 12px;
            @include fj(center);
            align-items: center;
            @include sc(12px, #fff);
          }
          span:nth-child(2) {
            margin: 10px;
            @include sc(14px, #4e5f71);
          }
        }
        p:nth-child(1) {
          span:nth-child(1) {
            @include wh(66px, 24px);
          }
        }
        p:nth-child(2) {
          span:nth-child(1) {
            @include wh(41px, 24px);
          }
        }
      }
      > .follow-up-answer-infos.hover-p {
        border: 1px solid #1059ff;
      }
    }
  }
}
</style>
