<template>
  <div class="work-stem-wrap">
    <div class="work-stem">
      <div class="stem-answer-infos">
        <div>题目</div>
        <div class="answer-infos">
          <!-- <p v-html="dailyhomeworkInfos.questionStem"></p> -->
          <div
            class="pp"
            v-if="
              dailyhomeworkInfos.questionTypeCode == 4 ||
                dailyhomeworkInfos.questionTypeCode == 2 ||
                dailyhomeworkInfos.questionTypeCode == 1
            "
          >
            <div>
              <p>A、</p>
              <p>222</p>
            </div>
            <div>
              <p>A、</p>
              <p>222</p>
            </div>
          </div>
        </div>
      </div>
      <div class="answer-infos-type">
        <!-- 题组 -->
        <div
          v-if="dailyhomeworkInfos.questionTypeCode == 4"
          class="answer-infos-type-4"
        >
          <div class="answer-sl">
            <span>解题思路</span>
            <span v-html="dailyhomeworkInfos.questionAnalysis"></span>
          </div>
          <div class="stem-child">
            <p>子题目</p>
            <div>
              <div
                v-for="(items, index) in dailyhomeworkInfos.childInfoList"
                :key="index"
                :id="'anchor-' + index"
              >
                <p>
                  <span>{{ index + 1 }}.</span>
                  <span class="tg-child" v-html="items.questionStem"></span>
                </p>
                <p class="tz">
                  <a v-for="(t, index) in items.optionsList" :key="index">
                    <p>{{ t.questionOption }}、</p>
                    <p v-html="t.questionContent"></p>
                  </a>
                </p>
                <div class="answer-child">
                  <template>
                    <p>
                      <span>参考答案</span>
                      <span v-html="items.questionAnswer"></span>
                    </p>
                    <p>
                      <span>解析</span>
                      <span v-html="items.questionAnalysis"></span>
                    </p>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 判断 -->
        <div
          v-else-if="dailyhomeworkInfos.questionTypeCode == 3"
          class="answer-infos-type-3 answer-infos-type-1"
        >
          <p>
            <span>参考答案</span>
            <span>{{
              dailyhomeworkInfos.questionAnswer == 'Y' ? '正确' : '错误'
            }}</span>
          </p>
          <p>
            <span>解析</span>
            <span v-html="dailyhomeworkInfos.questionAnalysis"></span>
          </p>
        </div>
        <!-- 填空 -->
        <div
          v-else-if="dailyhomeworkInfos.questionTypeCode == 5"
          class="answer-infos-type-5"
        >
          <p class="tk">
            <span>参考答案</span>
            <span
              v-for="(items, index) in JSON.parse(
                dailyhomeworkInfos.questionAnswer
              )"
              :key="index"
            >
              <i>{{ index + 1 }}、</i>
              <!-- <template v-if="item.property != undefined && item.property == 1">
                <i
                  v-for="(i, index) in items.answer"
                  :key="index"
                  v-html="i"
                ></i>
              </template> -->
              <template>
                <i v-for="(i, index) in items.answer" :key="index" v-html="i">
                </i>
              </template>
            </span>
          </p>
          <p>
            <span>解析</span>
            <span v-html="dailyhomeworkInfos.questionAnalysis"></span>
          </p>
        </div>
        <!-- 普通 -->
        <div v-else class="answer-infos-type-1">
          <p>
            <span>参考答案</span>
            <span v-html="dailyhomeworkInfos.questionAnswer"></span>
          </p>

          <p>
            <span>解析</span>
            <span v-html="dailyhomeworkInfos.questionAnalysis"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['dailyhomeworkInfos'],
  data() {
    return {}
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.work-stem-wrap {
  @include wh(540px, 100%);
  flex: 0 0 540px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .work-stem {
    @include wh(100%, 100%);
    overflow: scroll;
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
        @include wh(90%, auto);
        flex: auto;
        margin-left: 10px;

        > p {
          @include sc(14px, #4e5f71);
          line-height: 20px;
          overflow-x: hidden;
          padding-right: 10px;
        }
        > .pp {
          margin: 20px 0 20px 0;
          overflow: auto;
          > div {
            overflow: auto;
            margin-bottom: 10px;
            > p {
              float: left;
              @include sc(14px, #3d4d65);
            }
          }
        }
      }
    }
    .answer-infos-type-4 {
      @include wh(96%, auto);
      margin: 0 auto;
      .answer-sl {
        @include fj();
        flex-direction: column;
        span:nth-child(1) {
          @include sc(12px, #fff);
          @include wh(64px, 24px);
          background: #56acff;
          border-radius: 12px;
          @include fj(center);
          align-items: center;
          margin-bottom: 10px;
        }
        span:nth-child(2) {
          padding-left: 5px;
          @include sc(14px, #4e5f71);
        }
      }
      .stem-child {
        @include wh(100%, auto);
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 222, 222, 1);
        box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding-top: 15px;
        @include fj();
        > p {
          @include wh(auto, 24px);
          background: #56acff;
          border-radius: 12px;
          @include sc(12px, #fff);
          @include fj(center);
          align-items: center;
          border-radius: 0px 12px 12px 0px;
          flex: 0 0 54px;
        }
        > div {
          flex: auto;
          margin: 3px 10px 10px 10px;
          > div {
            > p {
              @include sc(14px, #4e5f71);
            }
            .tg-child {
              > p {
                display: inline-block;
              }
            }
            > p.tz {
              margin: 10px 0 0 10px;
              a {
                display: block;
                display: flex;
                justify-content: start;
                align-items: center;
                margin-top: 5px;
                @include sc(14px, #415f71);
                span:nth-child(1) {
                  margin-right: 10px;
                }
              }
            }
            .answer-child {
              margin: 15px 0 0 0px;
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
      }
    }
    .answer-infos-type-1 {
      @include wh(90%, auto);
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
    .answer-infos-type-5 {
      @include wh(90%, auto);
      margin: 0 auto;
      > p {
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
          margin-top: 10px;
          @include sc(14px, #4e5f71);
          > p {
            margin-left: 10px;
          }
        }
      }
      > p:nth-child(1) {
        span:nth-child(1) {
          @include wh(66px, 24px);
        }
      }
      > p:nth-child(2) {
        span:nth-child(1) {
          @include wh(41px, 24px);
        }
      }
      > p.tk {
        span:nth-of-type(n + 2) {
          display: block;
          padding-left: 10px !important;
          background: none !important;
          min-height: 30px;
          @include sc(14px, #4e5f71);
        }
      }
    }
  }
}
</style>
