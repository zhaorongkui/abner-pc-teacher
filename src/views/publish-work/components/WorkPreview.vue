<template>
  <div class="work-preview-wrap">
    <div class="work-preview-daily" v-if="index == 1">
      <div>
        <span>作业内容预览(共{{ addWorkList.length }}题)</span>
        <img
          src="../../../assets/img/publish/close.png"
          alt=""
          @click="close"
        />
      </div>
      <div class="daily-work">
        <div v-for="item in addWorkList" :key="item.index">
          <div v-if="item.questionTypeCode != 8">
            <div>
              <div>
                <div>
                  <p
                    v-html="item.questionStem"
                    :class="
                      answerIdList.indexOf(item.questionId) != -1
                        ? 'hover-pp'
                        : ''
                    "
                  ></p>
                  <div
                    v-if="
                      item.questionTypeCode == 4 ||
                        item.questionTypeCode == 2 ||
                        item.questionTypeCode == 1
                    "
                    class="pp"
                  >
                    <div
                      v-for="(t, index) in item.questionOptions"
                      :key="index"
                    >
                      <p>{{ t.questionOption }}、</p>
                      <p v-html="t.questionContent"></p>
                    </div>
                  </div>
                  <h6
                    @click="
                      showAnswerBtn(
                        item.questionId,
                        item.questionInfoId,
                        item.questionTypeCode
                      )
                    "
                    v-if="
                      item.questionTypeCode == 4 &&
                        answerIdList.indexOf(item.questionId) == -1
                    "
                  >
                    展开
                  </h6>
                  <h6
                    @click="showAnswerBtn(item.questionId, '', '')"
                    v-if="
                      item.questionTypeCode != 4 &&
                        answerIdList.indexOf(item.questionId) == -1
                    "
                  >
                    展开
                  </h6>
                </div>
                <div
                  v-if="item.questionTypeCode == 4"
                  class="show-answer"
                  :class="
                    answerIdList.indexOf(item.questionId) != -1
                      ? 'hover-div'
                      : ''
                  "
                >
                  <div class="answer-1">
                    <span>解题思路</span>
                    <span v-html="item.questionAnalysis"></span>
                  </div>
                  <div
                    class="answer"
                    v-for="(items, index) in tizuWorkbookPageQuestionnumList"
                    :key="items.index"
                  >
                    <p>
                      <span>{{ index + 1 }}.</span>
                      <span v-html="items.questionStem" class="tttt"></span>
                    </p>
                    <p class="tz">
                      <a
                        v-for="(t, index) in items.questionOptions"
                        :key="index"
                      >
                        <span>{{ t.questionOption }}、</span>
                        <span v-html="t.questionContent"></span>
                      </a>
                    </p>
                    <p>
                      <span>参考答案</span>
                      <span v-html="items.questionAnswer"></span>
                    </p>
                    <p>
                      <span>解析</span>
                      <span v-html="items.questionAnalysis"></span>
                    </p>
                  </div>
                  <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
                </div>
                <div
                  :class="
                    answerIdList.indexOf(item.questionId) != -1
                      ? 'hover-div'
                      : ''
                  "
                  class="show-answer-1"
                  v-else-if="item.questionTypeCode == 3"
                >
                  <p>
                    <span>参考答案</span>
                    <span>{{
                      item.questionAnswer == 'Y' ? '正确' : '错误'
                    }}</span>
                  </p>
                  <p>
                    <span>解析</span>
                    <span v-html="item.questionAnalysis"></span>
                  </p>
                  <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
                </div>
                <div
                  :class="
                    answerIdList.indexOf(item.questionId) != -1
                      ? 'hover-div'
                      : ''
                  "
                  class="show-answer-1"
                  v-else-if="item.questionTypeCode == 5"
                >
                  <p class="tk">
                    <span>参考答案</span>
                    <span
                      v-for="(items, index) in JSON.parse(item.questionAnswer)"
                      :key="index"
                    >
                      <i>{{ index + 1 }}、</i>
                      <template
                        v-if="
                          items.property != undefined && items.property == 1
                        "
                      >
                        <i
                          v-for="(i, index) in items.answer"
                          :key="index"
                          v-html="decodeURIComponent(i)"
                        ></i>
                      </template>
                      <template v-else>
                        <i
                          v-for="(i, index) in items.answer"
                          :key="index"
                          v-html="i"
                        ></i>
                      </template>
                    </span>
                  </p>
                  <p>
                    <span>解析</span>
                    <span v-html="item.questionAnalysis"></span>
                  </p>
                  <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
                </div>
                <div
                  :class="
                    answerIdList.indexOf(item.questionId) != -1
                      ? 'hover-div'
                      : ''
                  "
                  class="show-answer-1"
                  v-else
                >
                  <p>
                    <span>参考答案</span>
                    <span v-html="item.questionAnswer"></span>
                  </p>
                  <p>
                    <span>解析</span>
                    <span v-html="item.questionAnalysis"></span>
                  </p>
                  <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
                </div>
              </div>
              <div>
                <span
                  ><i>题型</i><i>{{ item.questionYytypeName }}</i></span
                >
                <!-- <span v-if="item.questionDegreedifficulty == 0.25"
                ><i>难易度</i><i>简单</i></span
              >
              <span v-if="item.questionDegreedifficulty == 0.5"
                ><i>难易度</i><i>中等</i></span
              >
              <span v-if="item.questionDegreedifficulty == 0.75"
                ><i>难易度</i><i>困难</i></span
              >
              <span v-if="item.questionDegreedifficulty == undefined"
                ><i>难易度</i><i>--</i></span
              > -->
                <span
                  ><i>试题来源</i><i>{{ item.questionSourceName }}</i></span
                >
                <span v-if="item.workbookChapterPage != undefined"
                  ><i>页数</i
                  ><i>{{
                    item.workbookChapterPage != undefined
                      ? item.workbookChapterPage
                      : '--'
                  }}</i></span
                >
                <span
                  ><i>题号</i><i>{{ item.questionNumber }}</i></span
                >
                <span
                  ><i>分值</i><i>{{ item.questionScore }}</i></span
                >
              </div>
            </div>
            <div>
              <!-- <p >
              <img src="../../../assets/img/publish/yichu.png" alt="" />
              <span>移出作业</span>
              <span>加入作业</span>
            </p> -->
              <p
                :class="
                  addWorkId.indexOf(item.questionId) == -1 ? '' : 'hover-p2'
                "
                @click="deleteWork(item.questionId)"
              >
                <span v-if="addWorkId.indexOf(item.questionId) == -1"
                  >移出作业</span
                >
                <span v-else>加入作业</span>
              </p>
            </div>
          </div>
          <div class="read-list-card" v-else>
            <div class="card-box">
              <div class="card-body">
                <div
                  class="body-main"
                  @click="lookOriginal(item)"
                  v-html="item.questionStem"
                ></div>
              </div>
              <div class="tag-list-1">
                <span
                  ><i>分类</i><i>{{ item.questionTextTypeName }}</i></span
                >
                <span
                  ><i>相关主题</i><i>{{ item.questionTitleName }}</i></span
                >

                <span
                  ><i>子题数</i><i>{{ item.questionChildNum }}</i></span
                >
                <span
                  ><i>阅读量</i><i>{{ item.questionTextNum }}</i></span
                >
              </div>
            </div>
            <div>
              <p
                :class="
                  addWorkId.indexOf(item.questionId) == -1 ? '' : 'hover-p2'
                "
                @click="deleteWork(item.questionId)"
              >
                <span v-if="addWorkId.indexOf(item.questionId) == -1"
                  >移出作业</span
                >
                <span v-else>加入作业</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="work-preview-word" v-if="index == 4">
      <WordPreview @onClose="close"></WordPreview>
    </div>
    <div class="work-preview-english" v-if="index == 3">
      <div>
        <span>作业内容预览(共{{ selectedItemList.length }}题)</span>
        <img
          src="../../../assets/img/publish/close.png"
          alt=""
          @click="close"
        />
      </div>
      <div class="EnglishPreview-wrap">
        <EnglishWorkPreview
          v-for="(item, index) of selectedItemList"
          :key="index"
          :item="item"
        ></EnglishWorkPreview>
      </div>
    </div>
    <div class="work-preview-error" v-if="index == 2">
      <div>
        <span>作业内容预览(共{{ errorWorkList.length }}题)</span>
        <img
          src="../../../assets/img/publish/close.png"
          alt=""
          @click="close"
        />
      </div>
      <div class="daily-work">
        <div v-for="item in errorWorkList" :key="item.index">
          <div>
            <div>
              <div>
                <p
                  v-html="item.questionStem"
                  :class="
                    answerIdList.indexOf(item.questionId) != -1
                      ? 'hover-pp'
                      : ''
                  "
                ></p>
                <div
                  v-if="
                    item.questionTypeCode == 4 ||
                      item.questionTypeCode == 2 ||
                      item.questionTypeCode == 1
                  "
                  class="pp"
                >
                  <div v-for="(t, index) in item.questionOptions" :key="index">
                    <p>{{ t.questionOption }}、</p>
                    <p v-html="t.questionContent"></p>
                  </div>
                </div>
                <h6
                  @click="
                    showAnswerBtn(
                      item.questionId,
                      item.questionInfoId,
                      item.questionTypeCode
                    )
                  "
                  v-if="
                    item.questionTypeCode == 4 &&
                      answerIdList.indexOf(item.questionId) == -1
                  "
                >
                  展开
                </h6>
                <h6
                  @click="showAnswerBtn(item.questionId, '', '')"
                  v-if="
                    item.questionTypeCode != 4 &&
                      answerIdList.indexOf(item.questionId) == -1
                  "
                >
                  展开
                </h6>
              </div>
              <div
                v-if="item.questionTypeCode == 4"
                class="show-answer"
                :class="
                  answerIdList.indexOf(item.questionId) != -1 ? 'hover-div' : ''
                "
              >
                <div class="answer-1">
                  <span>解题思路</span>
                  <span v-html="item.questionAnalysis"></span>
                </div>
                <div
                  class="answer"
                  v-for="(items, index) in tizuWorkbookPageQuestionnumList"
                  :key="items.index"
                >
                  <p>
                    <span>{{ index + 1 }}、</span>
                    <span v-html="items.questionStem"></span>
                  </p>
                  <p class="tz">
                    <a v-for="(t, index) in items.questionOptions" :key="index">
                      <span>{{ t.questionOption }}</span>
                      <span v-html="t.questionContent"></span>
                    </a>
                  </p>
                  <p>
                    <span>参考答案</span>
                    <span v-html="items.questionAnswer"></span>
                  </p>
                  <p>
                    <span>解析</span>
                    <span v-html="items.questionAnalysis"></span>
                  </p>
                </div>
                <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
              </div>
              <div
                :class="
                  answerIdList.indexOf(item.questionId) != -1 ? 'hover-div' : ''
                "
                class="show-answer-1"
                v-else-if="item.questionTypeCode == 3"
              >
                <p>
                  <span>参考答案</span>
                  <span>{{
                    item.questionAnswer == 'Y' ? '正确' : '错误'
                  }}</span>
                </p>
                <p>
                  <span>解析</span>
                  <span v-html="item.questionAnalysis"></span>
                </p>
                <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
              </div>
              <div
                :class="
                  answerIdList.indexOf(item.questionId) != -1 ? 'hover-div' : ''
                "
                class="show-answer-1"
                v-else-if="item.questionTypeCode == 5"
              >
                <p class="tk">
                  <span>参考答案</span>
                  <span
                    v-for="(items, index) in JSON.parse(item.questionAnswer)"
                    :key="index"
                  >
                    <i>{{ index + 1 }}、</i>
                    <template
                      v-if="items.property != undefined && items.property == 1"
                    >
                      <i
                        v-for="(i, index) in items.answer"
                        :key="index"
                        v-html="decodeURIComponent(i)"
                      ></i>
                    </template>
                    <template v-else>
                      <i
                        v-for="(i, index) in items.answer"
                        :key="index"
                        v-html="i"
                      ></i>
                    </template>
                  </span>
                </p>
                <p>
                  <span>解析</span>
                  <span v-html="item.questionAnalysis"></span>
                </p>
                <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
              </div>
              <div
                :class="
                  answerIdList.indexOf(item.questionId) != -1 ? 'hover-div' : ''
                "
                class="show-answer-1"
                v-else
              >
                <p>
                  <span>参考答案</span>
                  <span v-html="item.questionAnswer"></span>
                </p>
                <p>
                  <span>解析</span>
                  <span v-html="item.questionAnalysis"></span>
                </p>
                <h6 @click="hideAnswerBtn(item.questionId)">收起</h6>
              </div>
            </div>
            <div>
              <span
                ><i>题型</i
                ><i
                  style="max-width:50px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                  >{{ item.questionYytypeName }}</i
                ></span
              >
              <!-- <span v-if="item.questionDegreedifficulty == 0.25"
                ><i>难易度</i><i>简单</i></span
              >
              <span v-if="item.questionDegreedifficulty == 0.5"
                ><i>难易度</i><i>中等</i></span
              >
              <span v-if="item.questionDegreedifficulty == 0.75"
                ><i>难易度</i><i>困难</i></span
              >
              <span v-if="item.questionDegreedifficulty == undefined"
                ><i>难易度</i><i>--</i></span
              > -->
              <span
                ><i>试题来源</i
                ><i
                  style="max-width:50px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                  >{{ item.questionSourceName }}</i
                ></span
              >
              <span v-if="item.workbookChapterPage != undefined"
                ><i>页数</i
                ><i>{{
                  item.workbookChapterPage != undefined
                    ? item.workbookChapterPage
                    : '--'
                }}</i></span
              >
              <span
                ><i>题号</i
                ><i
                  style="max-width:50px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                  >{{ item.questionNumber }}</i
                ></span
              >
              <span
                ><i>分值</i><i>{{ item.questionScore }}</i></span
              >
            </div>
          </div>
          <div>
            <!-- <p @click="delerrorWork(item.questionId)">
              <img src="../../../assets/img/publish/yichu.png" alt="" />
              <span>移出作业</span>
            </p> -->
            <p
              :class="
                errorWorkId.indexOf(item.questionId) == -1 ? '' : 'hover-p2'
              "
              @click="delerrorWork(item.questionId)"
            >
              <span v-if="errorWorkId.indexOf(item.questionId) == -1"
                >移出作业</span
              >
              <span v-else>加入作业</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      style="position:fixed;left:0;
    top:0;background:rgba(0,0,0,0.3);width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999999999"
      v-if="picflag"
    >
      <imageView
        :imgArr="imgArr"
        :showImageView="true"
        :imageIndex="imageIndex"
        v-on:hideImage="hideImageView"
      ></imageView>
    </div>
    <look-original ref="original"></look-original>
  </div>
</template>

<script>
import LookOriginal from '../../../components/LookOriginal'
import $ from 'jquery'
import imageView from 'vue-imageview'
import WordPreview from './WordPreview'
import EnglishWorkPreview from './EnglishWorkPreview'
export default {
  name: '',
  components: {
    WordPreview,
    EnglishWorkPreview,
    imageView,
    LookOriginal
  },
  props: ['index'],
  data() {
    return {
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      value: '',
      showChild: true,
      flag: true,
      pageIndex: 0,
      checked: true,
      answerIdList: [],
      tizuWorkbookPageQuestionnumList: [],
      addWorkId: [],
      errorWorkId: [],
      addWorkList: [],
      errorWorkList: []
    }
  },
  computed: {
    selectedItemList() {
      return this.$store.state.publish.selectedItemList
    },
    //日常作业加入题量
    addWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.workAllList
      },
      set: function(v) {
        this.$store.commit('publish/WORKALLLIST', v)
      }
    },
    //错题作业加入题量
    errorAddWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.errorWorkAllList
      },
      set: function(v) {
        this.$store.commit('publish/ERRORWORKALLLIST', v)
      }
    }
  },
  mounted() {
    this.addWorkList = JSON.parse(
      localStorage.getItem('addWorkbookPageQuestionnumAllList')
    )
    this.errorWorkList = JSON.parse(
      localStorage.getItem('errorAddWorkbookPageQuestionnumAllList')
    )

    this.$nextTick().then(() => {
      var that = this
      // const ViewerDom = document.getElementById('index')
      // this.Viewer = new Viewer(ViewerDom, {
      //   // 相关配置项,详情见下面
      // })
      if (this.errorWorkList.length > 0 || this.addWorkList.length > 0) {
        $('.daily-work img').click(function() {
          that.picflag = true
          that.imgArr = []
          that.imgArr.push($(this).attr('src'))
        })
      }
    })
  },
  methods: {
    lookOriginal(obj) {
      this.$refs['original'].id = obj.questionId
      this.$refs['original'].visible = true
    },
    hideImageView() {
      this.picflag = false
    },
    spreadChange() {
      if (this.flag) {
        this.showChild = false
        this.flag = !this.flag
      } else {
        this.showChild = true
        this.flag = !this.flag
      }
    },
    showWordBtn() {
      this.showWord = !this.showWord
    },
    selectPage(t) {
      this.pageIndex = t
    },
    showAnswerBtn(id, questionInfoId, questionTypeCode) {
      if (!this.answerIdList.includes(id)) {
        this.answerIdList.push(id)
      }
      if (questionTypeCode === 4) {
        this.$store
          .dispatch('publish/homeworkDetail', {
            questionInfoId: questionInfoId,
            questionTypeCode: questionTypeCode
          })
          .then(data => {
            this.tizuWorkbookPageQuestionnumList =
              data.infos.childQuestionInfoList
          })
      }
    },
    hideAnswerBtn(id) {
      if (this.answerIdList.includes(id)) {
        for (var i = 0; i < this.answerIdList.length; i++) {
          if (this.answerIdList[i] === id) {
            this.answerIdList.splice(i, 1)
          }
        }
      }
    },
    deleteWork(id) {
      let workList = []
      if (this.addWorkId.includes(id)) {
        for (var i = 0; i < this.addWorkId.length; i++) {
          this.addWorkList.forEach(item => {
            if (item.questionId == id) {
              item.flag = false
            }
          })
          if (this.addWorkId[i] === id) {
            this.addWorkId.splice(i, 1)
          }
        }
      } else {
        this.addWorkId.push(id)
        this.addWorkList.forEach(item => {
          if (item.questionId == id) {
            item.flag = true
          }
        })
      }

      workList = this.addWorkList.filter(item => {
        return item.flag != true
      })
      this.addWorkbookPageQuestionnumAllList = workList

      localStorage.setItem(
        'addWorkbookPageQuestionnumAllList',
        JSON.stringify(this.addWorkbookPageQuestionnumAllList)
      )
      this.$store.commit(
        'publish/WORKALLLIST',
        this.addWorkbookPageQuestionnumAllList
      )
      if (this.index == 1) {
        this.$emit(
          'toParentEventlen',
          this.addWorkbookPageQuestionnumAllList.length
        )
      }
    },
    delerrorWork(id) {
      let workList = []
      if (this.errorWorkId.includes(id)) {
        for (var i = 0; i < this.errorWorkId.length; i++) {
          this.errorWorkList.forEach(item => {
            if (item.questionId == id) {
              item.flag = false
            }
          })
          if (this.errorWorkId[i] === id) {
            this.errorWorkId.splice(i, 1)
          }
        }
      } else {
        this.errorWorkId.push(id)
        this.errorWorkList.forEach(item => {
          if (item.questionId == id) {
            item.flag = true
          }
        })
      }

      workList = this.errorWorkList.filter(item => {
        return item.flag != true
      })
      this.errorAddWorkbookPageQuestionnumAllList = workList
      localStorage.setItem(
        'errorAddWorkbookPageQuestionnumAllList',
        JSON.stringify(this.errorAddWorkbookPageQuestionnumAllList)
      )
      this.$store.commit(
        'publish/ERRORWORKALLLIST',
        this.errorAddWorkbookPageQuestionnumAllList
      )
      if (this.index == 2) {
        this.$emit(
          'toParentEventlenerror',
          this.errorAddWorkbookPageQuestionnumAllList.length
        )
      }
    },
    close() {
      this.$emit('toParentsEvents', false)
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.work-preview-wrap {
  .tag-list-1 {
    @include wh(90%, 30px);
    @include fj(flex-start);
    align-items: center;
    border-top: 1px solid #ddd;
    > span {
      @include wh(auto, 15px);
      padding: 0 26px;
      border-right: 1px solid #ddd;
      @include fj(center);
      > i:nth-child(1) {
        @include sc(12px, #909090);
      }
      > i:nth-child(2) {
        @include sc(12px, #909090);
        margin-left: 12px;
      }
    }
    span:nth-child(6) {
      border-right: none;
    }
  }

  .read-list-card {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    width: 96%;
    margin: 15px auto 0;
  }

  .card-body {
    display: flex;
    padding: 5px 26px;
  }
  .body-main {
    cursor: pointer;
    flex: 1;
    max-height: 55px;
    overflow: hidden;
    border: 0 !important;
  }
  .add-work {
    cursor: pointer;
    width: 143px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #dddddd;
  }
  .work-action {
    height: 30px;
    display: flex;
    background: rgba(57, 158, 255, 1);
    border: 1px solid rgba(57, 158, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
    border-radius: 15px;
    padding: 0 6px;
    color: #ffffff;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .work-action span {
    margin-left: 3px;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    padding: 13px 17px;
    border-top: 1px solid #dddddd;
  }

  .add-favorites {
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
  }
  .already-joined {
    color: #fda157;
  }
  .card-box {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .work-action-remove {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(57, 158, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
    border-radius: 15px;
    color: #399eff;
  }
}
.work-preview-wrap {
  @include wh(100%, 100%);
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  img {
    width: auto;
  }
  .work-preview-daily {
    @include wh(1200px, 94%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate((-50%, -50%));
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    > div:nth-child(1) {
      @include wh(1200px, 67px);
      border-bottom: 1px solid #ddd;
      @include fj(center);
      flex: 0 0 67px;
      align-items: center;
      position: relative;
      img {
        @include wh(14px, 14px);
        position: absolute;
        right: 20px;
        top: 25px;
      }
      span {
        @include sc(16px, #1059ff);
      }
    }
    .daily-work {
      @include wh(96%, auto);
      margin: 0 auto;
      overflow: scroll;
      flex: auto;
      padding-bottom: 40px;
      > div {
        > div {
          width: 100%;
          min-height: 40px;
          @include fj();
          margin: 25px auto 0;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          > div:nth-child(1) {
            @include wh(85%, auto);
            @include fj();
            flex-flow: column;
            > div:nth-child(1) {
              @include fj();
              flex-flow: column;
              > div:nth-child(1) {
                width: 100%;
                min-height: 40px;
                border-bottom: 1px solid #ddd;
                padding: 10px 20px;
                position: relative;
                > p {
                  @include sc(14px, #3d4d65);
                  word-break: break-all;
                  height: 45px;
                  overflow: hidden;
                  width: 94%;
                }

                > p.hover-pp {
                  height: auto;
                  overflow: auto;
                }
                > .pp {
                  overflow: auto;
                  > div {
                    overflow: auto;
                    margin-top: 10px;
                    @include fj(flex-start);

                    p {
                      word-break: break-all;
                      padding-right: 10px;
                      float: left;
                      @include sc(14px, #3d4d65);
                    }
                  }
                }
                > span {
                  @include sc(12px, #919fb1);
                }
                h6 {
                  @include wh(37px, 13px);
                  @include sc(12px, #919fb1);
                  position: absolute;
                  right: 10px;
                  top: 35px;
                  background: url(../../../assets/img/publish/zhankai.png)
                    no-repeat left center;
                  background-size: 25% 80%;
                  text-align: right;
                  line-height: 13px;
                  cursor: pointer;
                }
              }
              > div.show-answer-1 {
                @include wh(100%, 0);
                overflow: hidden;
                word-break: break-all;
                position: relative;
                > p {
                  margin: 20px;
                  @include sc(14px, #3d4d65);
                  > span {
                    display: block;
                    background: rgba(86, 172, 255, 1);
                    border-radius: 12px;
                    @include sc(14px, #fff);
                    word-break: break-all;
                  }
                  > span:nth-child(1) {
                    text-align: center;
                    line-height: 24px;
                    @include wh(80px, 24px);
                  }
                  > span:nth-of-type(2) {
                    @include sc(14px, #415f71);
                    background: none;
                    padding-left: 10px;
                    line-height: 34px;
                  }
                }
                .tk {
                  span:nth-of-type(n + 2) {
                    display: block;
                    padding-left: 10px !important;
                    background: none !important;
                    color: #415f71;
                    min-height: 30px;
                  }
                }
                > p:nth-child(2) {
                  margin-top: 20px;
                }
                > p:nth-child(2) span:nth-child(1) {
                  @include wh(46px, 24px);
                }
                h6 {
                  @include wh(37px, 13px);
                  @include sc(12px, #919fb1);
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  background: url(../../../assets/img/publish/shouqi.png)
                    no-repeat left center;
                  background-size: 25% 80%;
                  text-align: right;
                  line-height: 13px;
                  cursor: pointer;
                }
              }
              > div.show-answer {
                @include wh(100%, 0);
                overflow: hidden;
                word-break: break-all;
                position: relative;
                .answer-1 {
                  @include wh(96%, auto);
                  margin: 0 auto;
                  padding: 15px 0;
                  @include fj();
                  flex-flow: column;
                  > span {
                    @include sc(14px, rgba(86, 172, 255, 1));
                    word-break: break-all;
                  }
                  > span:nth-child(2) {
                    margin-top: 10px;
                    @include sc(14px, #415f71);
                  }
                }
                .answer {
                  @include wh(96%, auto);
                  margin: 0 auto 40px;
                  border: 1px solid rgba(222, 222, 222, 1);
                  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
                  border-radius: 10px;
                  > p {
                    margin: 15px;
                    > span:nth-child(1) {
                      display: block;
                      border-radius: 12px;
                      @include sc(14px, rgba(86, 172, 255, 1));
                    }
                    > span:nth-of-type(2) {
                      @include sc(14px, #415f71);
                      background: none;
                      line-height: 34px;
                    }
                    .tttt {
                      p {
                        display: inline-block;
                      }
                    }
                  }
                  .tz {
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
                }

                h6 {
                  @include wh(37px, 13px);
                  @include sc(12px, #919fb1);
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  background: url(../../../assets/img/publish/shouqi.png)
                    no-repeat left center;
                  background-size: 25% 80%;
                  text-align: right;
                  line-height: 13px;
                  cursor: pointer;
                }
              }
              div.hover-div {
                height: auto;
                overflow: auto;
                border-bottom: 1px solid #ddd;
              }
            }
            > div:nth-child(2) {
              @include wh(100%, 30px);
              @include fj(flex-start);
              align-items: center;
              > span {
                @include wh(auto, 15px);
                padding: 0 26px;
                border-right: 1px solid #ddd;
                @include fj(center);
                > i:nth-child(1) {
                  @include sc(12px, #909090);
                }
                > i:nth-child(2) {
                  @include sc(12px, #909090);
                  margin-left: 12px;
                }
              }
              span:nth-child(6) {
                border-right: none;
              }
            }
          }
          > div:nth-of-type(2) {
            @include wh(15%, auto);
            @include fj(center);
            align-items: center;
            flex-flow: column;
            border-left: 1px solid rgba(235, 235, 235, 1);
            img {
              @include wh(24px, 24px);
            }
            p {
              @include wh(90px, 30px);
              @include fj(center);
              align-items: center;
              padding-left: 16px;
              cursor: pointer;
              background: url(../../../assets/img/publish/deletework.png)
                no-repeat 12% center #fff;
              background-size: 15% 50%;
              border: 1px solid rgba(57, 158, 255, 1);
              box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
              border-radius: 15px;
              span {
                @include sc(14px, #399eff);
              }
            }

            p.hover-p2 {
              background: url(../../../assets/img/publish/addwork.png) no-repeat
                10% center rgba(86, 172, 255, 1);
              background-size: 15% 50%;
              border: 1px solid rgba(57, 158, 255, 1);
              box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
              border-radius: 15px;
              span {
                @include sc(14px, #fff);
              }
            }
          }
        }
      }
    }
  }
  .work-preview-english {
    @include wh(1200px, 94%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate((-50%, -50%));
    display: flex;
    flex-direction: column;
    > div:nth-child(1) {
      @include wh(1200px, 67px);
      flex: 0 0 67px;
      border-bottom: 1px solid #ddd;
      @include sc(16px, #1059ff);
      @include fj(center);
      align-items: center;
      position: relative;
      img {
        @include wh(14px, 14px);
        position: absolute;
        right: 20px;
        top: 25px;
      }
    }
    .EnglishPreview-wrap {
      width: 1200px;
      height: 100%;
      flex: auto;
      overflow-y: auto;
      padding: 10px;
    }
  }
  .work-preview-error {
    @include wh(1200px, 94%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate((-50%, -50%));
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    > div:nth-child(1) {
      @include wh(1200px, 67px);
      border-bottom: 1px solid #ddd;
      @include fj(center);
      align-items: center;
      position: relative;
      flex: 0 0 67px;
      img {
        @include wh(14px, 14px);
        position: absolute;
        right: 20px;
        top: 25px;
      }
      span {
        @include sc(16px, #1059ff);
      }
    }
    .daily-work {
      @include wh(96%, 90%);
      margin: 0 auto;
      overflow: scroll;
      flex: auto;
      padding-bottom: 40px;
      > div {
        width: 100%;
        min-height: 120px;
        @include fj();
        margin: 25px auto 0;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 222, 222, 1);
        box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        > div:nth-child(1) {
          @include wh(85%, auto);
          @include fj();
          flex-flow: column;
          > div:nth-child(1) {
            @include fj();
            flex-flow: column;
            > div:nth-child(1) {
              width: 100%;
              min-height: 40px;
              border-bottom: 1px solid #ddd;
              padding: 10px 20px;
              position: relative;
              > p {
                @include sc(14px, #3d4d65);
                word-break: break-all;
                height: 45px;
                overflow: hidden;
                width: 94%;
              }
              > p.hover-pp {
                height: auto;
                overflow: auto;
              }
              > .pp {
                overflow: auto;
                > div {
                  overflow: auto;
                  margin-top: 10px;
                  @include fj(flex-start);
                  > p {
                    word-break: break-all;
                    padding-right: 10px;
                    float: left;
                    @include sc(14px, #3d4d65);
                  }
                }
              }
              > span {
                @include sc(12px, #919fb1);
              }
              h6 {
                @include wh(37px, 13px);
                @include sc(12px, #919fb1);
                position: absolute;
                right: 10px;
                top: 35px;
                background: url(../../../assets/img/publish/zhankai.png)
                  no-repeat left center;
                background-size: 25% 80%;
                text-align: right;
                line-height: 13px;
                cursor: pointer;
              }
            }
            > div.show-answer-1 {
              @include wh(100%, 0);
              overflow: hidden;
              word-break: break-all;
              position: relative;
              > p {
                margin: 20px;
                @include sc(14px, #3d4d65);
                .span {
                  display: block;
                  background: rgba(86, 172, 255, 1);
                  border-radius: 12px;
                  @include sc(14px, #fff);
                  word-break: break-all;
                }
                .span:nth-child(1) {
                  text-align: center;
                  line-height: 24px;
                  @include wh(80px, 24px);
                }
                .span:nth-of-type(2) {
                  @include sc(14px, #415f71);
                  background: none;
                  padding-left: 10px;
                  line-height: 34px;
                }
              }
              .tk {
                span:nth-of-type(n + 2) {
                  display: block;
                  padding-left: 10px !important;
                  background: none !important;
                  color: #415f71;
                  min-height: 30px;
                  i {
                  }
                }
              }
              > p:nth-child(2) {
                margin-top: 20px;
              }
              > p:nth-child(2) span:nth-child(1) {
                @include wh(46px, 24px);
              }
              h6 {
                @include wh(37px, 13px);
                @include sc(12px, #919fb1);
                position: absolute;
                right: 10px;
                bottom: 10px;
                background: url(../../../assets/img/publish/shouqi.png)
                  no-repeat left center;
                background-size: 25% 80%;
                text-align: right;
                line-height: 13px;
                cursor: pointer;
              }
            }
            > div.show-answer {
              @include wh(100%, 0);
              overflow: hidden;
              word-break: break-all;
              position: relative;
              .answer-1 {
                @include wh(96%, auto);
                margin: 0 auto;
                padding: 15px 0;
                @include fj();
                flex-flow: column;
                > span {
                  @include sc(14px, rgba(86, 172, 255, 1));
                  word-break: break-all;
                }
                .span:nth-child(2) {
                  margin-top: 10px;
                  @include sc(14px, #415f71);
                }
              }
              .answer {
                @include wh(96%, auto);
                margin: 0 auto 40px;
                border: 1px solid rgba(222, 222, 222, 1);
                box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                > p {
                  margin: 15px;
                  > span:nth-child(1) {
                    display: block;
                    border-radius: 12px;
                    @include sc(14px, rgba(86, 172, 255, 1));
                  }
                  > span:nth-of-type(2) {
                    @include sc(14px, #415f71);
                    background: none;
                    line-height: 34px;
                  }
                  .tttt {
                    p {
                      display: inline-block;
                    }
                  }
                }
                .tz {
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
              }

              h6 {
                @include wh(37px, 13px);
                @include sc(12px, #919fb1);
                position: absolute;
                right: 10px;
                bottom: 10px;
                background: url(../../../assets/img/publish/shouqi.png)
                  no-repeat left center;
                background-size: 25% 80%;
                text-align: right;
                line-height: 13px;
                cursor: pointer;
              }
            }
            div.hover-div {
              height: auto;
              overflow: auto;
              border-bottom: 1px solid #ddd;
            }
          }
          > div:nth-child(2) {
            @include wh(100%, 30px);
            @include fj(flex-start);
            align-items: center;
            > span {
              @include wh(auto, 15px);
              padding: 0 26px;
              border-right: 1px solid #ddd;
              @include fj(center);
              > i:nth-child(1) {
                @include sc(12px, #909090);
              }
              > i:nth-child(2) {
                @include sc(12px, #909090);
                margin-left: 12px;
              }
            }
            span:nth-child(6) {
              border-right: none;
            }
          }
        }
        > div:nth-of-type(2) {
          @include wh(15%, auto);
          @include fj(center);
          align-items: center;
          flex-flow: column;
          border-left: 1px solid rgba(235, 235, 235, 1);
          img {
            @include wh(24px, 24px);
          }
          p {
            background: url(../../../assets/img/publish/deletework.png)
              no-repeat 12% center #fff;
            background-size: 15% 50%;
            border: 1px solid rgba(57, 158, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
            border-radius: 15px;
            span {
              @include sc(14px, #399eff);
            }
            @include wh(90px, 30px);
            @include fj(center);
            align-items: center;
            padding-left: 16px;
            cursor: pointer;
          }

          p.hover-p2 {
            background: url(../../../assets/img/publish/addwork.png) no-repeat
              10% center rgba(86, 172, 255, 1);
            background-size: 15% 50%;
            border: 1px solid rgba(57, 158, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
            border-radius: 15px;
            span {
              @include sc(14px, #fff);
            }
          }
        }
      }
    }
  }
}
</style>
