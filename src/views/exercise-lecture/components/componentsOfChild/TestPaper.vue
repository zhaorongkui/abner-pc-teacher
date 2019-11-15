<template>
  <div class="work-type-conent-test-1">
    <div class="work-type-conent-left">
      <div>
        <ul class="menu">
          <template>
            <li v-for="(item, index) in testPaperList" :key="item.index">
              <div
                @click="selectTestPaper(index, item.paperId)"
                :class="paperType == index ? 'hover-div' : ''"
              >
                {{ item.paperName }}
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="work-type-conent-right-1">
      <div class="title" v-if="paperChapterlist.length != 0">
        <span
          v-for="(item, index) in paperChapterlist"
          :key="item.index"
          @click="tapNav(index, 'anchor-' + item.paperChapterId)"
          :class="tapType == index ? 'hover-span' : ''"
        >
          {{ item.paperChapterName.split('（')[0] }}</span
        >
      </div>
      <div class="question" v-if="workbookPageQuestionnumList.length != 0">
        <div class="test-paper" id="test-paper">
          <div
            v-for="(item, index) in workbookPageQuestionnumList"
            :key="index"
          >
            <div
              :id="'anchor-' + item.paperChapterId"
              :class="'anchor-' + item.paperChapterId"
              style="display:none"
            >
              <span>{{ item.paperChapterName }}</span>
            </div>
            <div>
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
                      :class="
                        answerIdList.indexOf(item.questionId) != -1
                          ? 'hover-ppp'
                          : ''
                      "
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
                        <span class="cs">{{ index + 1 }}.</span>
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
                        <span class="ckda">参考答案</span>
                        <span v-html="items.questionAnswer"></span>
                      </p>
                      <p>
                        <span class="jx">解析</span>
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
                        v-for="(items, index) in JSON.parse(
                          item.questionAnswer
                        )"
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
                  <p
                    :class="
                      item.teacherQuestionCollectonId == undefined ||
                      item.teacherQuestionCollectonId == null ||
                      item.teacherQuestionCollectonId == ''
                        ? ''
                        : 'hover-p1'
                    "
                    @click="
                      addStore(
                        item.teacherQuestionCollectonId,
                        item.grade,
                        item.questionTypeCode,
                        item.questionId,
                        item.questionInfoId,
                        item.questionSourceId,
                        item.questionSourceName,
                        item.questionUuid
                      )
                    "
                  >
                    <span
                      v-if="
                        item.teacherQuestionCollectonId == undefined ||
                          item.teacherQuestionCollectonId == null ||
                          item.teacherQuestionCollectonId == ''
                      "
                      >加入收藏</span
                    >
                    <span v-else>取消收藏</span>
                  </p>
                </div>
              </div>
              <div>
                <p @click="fullScreen(item.questionId)">
                  <span>全屏展示</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="null"
        v-if="
          paperChapterlist.length == 0 ||
            workbookPageQuestionnumList.length == 0
        "
      >
        <img src="../../../../assets/img/publish/nulldata.png" alt="" />
        <span>当前试卷中暂无数据</span>
      </div>
    </div>
    <ClassifyDialog
      v-if="showDialog"
      @toParentEvents="closeChildDialog"
      @toParentEvent="getId"
      @toParentEventStore="addCollectStore"
    ></ClassifyDialog>
    <FullScreen
      v-if="showFullScreen"
      @toParentsClose="closeFullScreen"
      :workbookPageQuestionnumList="workbookPageQuestionnumList"
      :fullId="fullId"
      :type="2"
    ></FullScreen>

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
  </div>
</template>

<script>
import $ from 'jquery'
import imageView from 'vue-imageview'
import ClassifyDialog from './ClassifyDialog.vue'
import FullScreen from './fullScreen.vue'
import { setTimeout } from 'timers'
export default {
  name: '',
  data() {
    return {
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      checked: true,
      paperType: 0, //切换试卷列表的下标
      tapType: 0,
      showDialog: false,
      testPaperList: [], //试卷列表
      paperQuestion: [], //试题列表
      // workbookPageQuestionnumList: [], //筛选题目数据
      paperChapterlist: [], //章节列表
      showAnswer: false,
      paperId: '', //试卷id
      answerIdList: [],
      tizuWorkbookPageQuestionnumList: [], //题组数据
      isAllChecked: false, // 正在进行中的数据是否被选中
      isSomeChecked: false, //半选状态
      addWorkIdList: [], //添加作业id集合
      addWorkbookPageQuestionnumList: [],
      addStoreIdList: [], //添加收藏数据
      addStoreList: '', //添加收藏数据
      collectonGroupId: 0,
      CollectionInfos: {
        collectonGroupId: '',
        grade: '',
        questionId: '',
        questionInfoId: '',
        questionSourceId: '',
        questionSourceName: '',
        questionUuid: ''
      },
      addWorkbookPageQuestionnumAllList: [], //全部数据
      arrAll: [],
      showFullScreen: false,
      flag: true
    }
  },
  computed: {
    workbookPageQuestionnumList: {
      get: function() {
        return this.$store.state.work.workbookPageQuestionnumLists
      },
      set: function(v) {
        this.$store.commit('work/TESTS', v)
      }
    }
  },
  components: {
    ClassifyDialog,
    FullScreen,
    imageView
  },
  mounted() {
    this.workbookPageQuestionnumList = []
    this.addWorkbookPageQuestionnumAllList = JSON.parse(
      localStorage.getItem('addWorkbookPageQuestionnumAllList')
    )
      ? JSON.parse(localStorage.getItem('addWorkbookPageQuestionnumAllList'))
      : []
    this.$store.dispatch('publish/paperList').then(data => {
      this.testPaperList = data.infos
      this.paperId = data.infos[0].paperId
      this.$store.dispatch('publish/chapter', this.paperId).then(result => {
        this.paperChapterlist = result.infos.slice(1)
        this.getPaperQuestion(this.paperId)
      })
    })
  },
  methods: {
    hideImageView() {
      this.picflag = false
    },
    getId(id) {
      this.collectonGroupId = id
    },
    closeChildDialog(val) {
      this.showDialog = val
    },
    selectTestPaper(i, id) {
      this.tapType = 0
      this.paperId = id
      this.paperType = i
      this.workbookPageQuestionnumList = []
      this.$store.dispatch('publish/chapter', id).then(result => {
        this.paperChapterlist = result.infos.slice(1)
        this.getPaperQuestion(this.paperId)
      })
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
    addStore(
      id,
      grade,
      questionTypeCode,
      questionId,
      questionInfoId,
      questionSourceId,
      questionSourceName,
      questionUuid
    ) {
      this.CollectionInfos = {
        collectonGroupId: this.collectonGroupId,
        grade: grade,
        questionTypeCode: questionTypeCode,
        questionId: questionId,
        questionInfoId: questionInfoId,
        questionSourceId: questionSourceId,
        questionSourceName: questionSourceName,
        questionUuid: questionUuid
      }
      if (id != 'undefined' && id != null && id != '') {
        this.showDialog = false
        this.$store.dispatch('publish/cancelStore', id).then(data => {
          if (data.flag === 1) {
            this.$message.success('取消收藏成功')
            this.getPaperQuestion(this.paperId)
          }
        })
      } else {
        this.showDialog = true
      }
    },
    addCollectStore() {
      this.CollectionInfos.collectonGroupId = this.collectonGroupId
      this.$store
        .dispatch('publish/addStore', this.CollectionInfos)
        .then(data => {
          if (data.flag === 1) {
            this.$message.success('收藏成功')
            this.showDialog = false
            this.getPaperQuestion(this.paperId)
          }
          this.addStoreList = data.infos
        })
    },
    fullScreen(id) {
      this.showFullScreen = true
      this.fullId = id
    },
    closeFullScreen(val) {
      this.showFullScreen = val
    },
    tapNav(i, name) {
      var self = this
      document.querySelectorAll('.question')[0].scrollTop =
        document.getElementById(name).offsetTop - 300
      setTimeout(function() {
        self.tapType = i
      }, 70)
    },
    getPaperQuestion(id) {
      var self = this
      var arr = []
      //this.workbookPageQuestionnumList = []
      this.$store.dispatch('publish/getPaperQuestion', id).then(data => {
        this.paperQuestion = data.infos
        this.workbookPageQuestionnumList = data.infos
        var arr1 = []
        this.paperChapterlist.forEach(item => {
          this.workbookPageQuestionnumList.forEach(items => {
            if (items.paperChapterName == item.paperChapterName) {
              arr1.push(items)
            }
          })
        })
        this.workbookPageQuestionnumList = arr1
        // this.paperQuestion.forEach(item => {
        //   this.workbookPageQuestionnumList.push(item)
        // })
        this.$nextTick().then(() => {
          for (var i = 0; i < this.workbookPageQuestionnumList.length; i++) {
            document.getElementById(
              'anchor-' + this.workbookPageQuestionnumList[i].paperChapterId
            ).style.display = 'block'

            if (
              !arr.includes(this.workbookPageQuestionnumList[i].paperChapterId)
            ) {
              arr.push(this.workbookPageQuestionnumList[i].paperChapterId)
            }
          }
          var bescroll = $('.question').scrollTop()
          $('.question').scroll(function() {
            var afscroll = $('.question').scrollTop()
            var res = afscroll - bescroll
            if (res > 0) {
              if (
                $(this).scrollTop() + 250 + self.tapType * 10 >=
                  $('#anchor-' + arr[self.tapType + 1])[0].offsetTop &&
                self.flag
              ) {
                self.tapType++
                self.flag = false
              } else {
                self.flag = true
              }
              bescroll = afscroll
            } else {
              if (
                $(this).scrollTop() + 250 + self.tapType * 10 <=
                  $('#anchor-' + arr[self.tapType])[0].offsetTop &&
                self.flag
              ) {
                self.tapType--
                if (self.tapType <= 0) {
                  self.tapType = 0
                }
                self.flag = false
              } else {
                self.flag = true
              }
              bescroll = afscroll
            }
          })

          var that = this
          // const ViewerDom = document.getElementById('index')
          // this.Viewer = new Viewer(ViewerDom, {
          //   // 相关配置项,详情见下面
          // })
          if (this.workbookPageQuestionnumList.length > 0) {
            $('.test-paper img').click(function() {
              that.picflag = true
              that.imgArr = []
              that.imgArr.push($(this).attr('src'))
            })
          }
        })

        this.addWorkbookPageQuestionnumAllList.forEach(item => {
          this.workbookPageQuestionnumList.forEach(items => {
            if (item.questionId === items.questionId) {
              this.addWorkIdList.push(items.questionId)
            }
          })
        })
        if (
          this.workbookPageQuestionnumList.length != 0 &&
          this.addWorkIdList != 0
        ) {
          if (
            this.addWorkIdList.length ===
            this.workbookPageQuestionnumList.length
          ) {
            this.isAllChecked = true
          } else if (
            this.addWorkIdList.length > 0 &&
            this.addWorkIdList.length < this.workbookPageQuestionnumList.length
          ) {
            this.isAllChecked = false
            this.isSomeChecked = true
          }
        } else if (
          this.workbookPageQuestionnumList.length != 0 &&
          this.addWorkIdList == 0
        ) {
          this.isAllChecked = false
          this.isSomeChecked = false
        } else {
          this.isAllChecked = false
          this.isSomeChecked = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
#index {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  img {
    width: 0;
    height: 0;
  }
}
.pp {
  overflow: auto;
  height: 0;
  overflow: hidden;
  width: 94%;
  > div {
    overflow: auto;
    margin-top: 10px;
    @include fj(flex-start);
    > p {
      word-break: break-all;
      padding-right: 5px;
      float: left;
      @include sc(14px, #3d4d65);
    }
  }
}
.pp.hover-ppp {
  height: auto;
  overflow: auto;
}
.work-type-conent-test-1 {
  scrollbar-width: none;
  margin: 21px auto 0;
  @include wh(100%, 91%);
  background: #fff;
  @include fj();
  .work-type-conent-left {
    @include wh(288px, 100%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    padding-bottom: 5px;
    overflow: scroll;
    > div {
      margin-top: 21px;
      padding-bottom: 30px;
      .menu li {
        @include wh(88%, auto);
        margin: 10px auto 0;
        cursor: pointer;
        > div {
          display: block;
          @include wh(100%, 40px);
          text-align: left;
          line-height: 40px;
          padding-left: 18px;
          @include sc(14px, #4e5f71);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(185, 185, 185, 1);
          border-radius: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div.hover-div {
          background: #1059ff;
          @include sc(14px, #fff);
        }
      }
    }
  }
  .work-type-conent-right-1 {
    @include wh(912px, 100%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 0px 4px 4px 0px;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    > div.title {
      @include wh(100%, auto);
      padding: 10px 20px 10px;
      border-bottom: 1px solid rgba(244, 244, 244, 1);
      overflow: auto;
      flex: 0 0 63px;
      span {
        @include wh(auto, 34px);
        @include sc(14px, #4e5f71);
        padding: 0 12px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(214, 225, 229, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 34px;
        float: left;
        margin: 5px;
        cursor: pointer;
      }
      span.hover-span {
        border: 1px solid rgba(57, 158, 255, 1);
        border-radius: 4px;
        color: #399eff;
      }
    }
    > div.question {
      @include wh(100%, 100%);
      overflow: hidden;
      flex: auto;
      overflow: scroll;
      .test-paper {
        @include wh(100%, auto);
        padding-bottom: 30px;
        overflow: auto;
        > div {
          > div:nth-of-type(1) {
            @include wh(100%, auto);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px 0;
            flex: 0 0 30px;
            span {
              @include sc(14px, #aaaaaa);
            }
          }
          > div:nth-child(n + 2) {
            width: 95%;
            min-height: 40px;
            @include fj();
            margin: 10px auto 0;
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
                  padding: 10px 20px;
                  position: relative;
                  > p {
                    @include sc(14px, #3d4d65);
                    height: 45px;
                    overflow: hidden;
                    width: 94%;
                  }
                  > p.hover-pp {
                    height: auto;
                    overflow: auto;
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
                    background: url(../../../../assets/img/publish/zhankai.png)
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
                      margin: 10px 0 0 10px;
                      @include sc(14px, #415f71);
                    }
                    > span:nth-child(1) {
                      width: 80px;
                      height: 24px;
                      background: #56acff;
                      @include fj(center);
                      align-items: center;
                      border-radius: 12px;
                      color: #fff;
                    }
                  }
                  .answer {
                    @include wh(96%, auto);
                    margin: 0 auto 40px;
                    border: 1px solid rgba(222, 222, 222, 1);
                    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    > p {
                      margin: 10px 15px 15px;
                      > span.cs {
                        display: block;
                        border-radius: 12px;
                        @include sc(14px, rgba(86, 172, 255, 1));
                        margin-right: 10px;
                      }
                      > span.ckda {
                        @include wh(80px, 24px);
                        background: #56acff;
                        @include fj(center);
                        align-items: center;
                        border-radius: 12px;
                        color: #fff;
                      }
                      > span.jx {
                        @include wh(40px, 24px);
                        background: #56acff;
                        @include fj(center);
                        align-items: center;
                        border-radius: 12px;
                        color: #fff;
                      }
                      > span:nth-child(2) {
                        @include sc(14px, #415f71);
                        display: inline-block;
                        margin: 10px 0px 0 10px;
                      }
                      > span.tttt {
                        @include sc(14px, #415f71);
                        background: none;
                        line-height: 34px;
                        margin: 0;
                        display: inline-block;
                        p {
                          display: inline-block;
                        }
                      }
                    }
                    > p:nth-child(1) {
                      > span:nth-child(1) {
                        display: inline-block;
                        border-radius: 12px;
                        @include sc(14px, #415f71);
                        margin-right: 5px;
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
                    background: url(../../../../assets/img/publish/shouqi.png)
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
                      white-space: pre-wrap;
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
                    background: url(../../../../assets/img/publish/shouqi.png)
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
                  border-top: 1px solid #ddd;
                }
              }
              > div:nth-child(2) {
                @include wh(100%, 30px);
                @include fj(flex-end);
                align-items: center;
                border-top: 1px solid #ddd;
                p {
                  margin-right: 10px;
                  padding-left: 25px;
                  background: url(../../../../assets/img/publish/jiarushouc.png)
                    no-repeat center left;
                  background-size: 28% 100%;
                  span {
                    @include sc(12px, #676767);
                  }
                }
                p.hover-p1 {
                  background: url(../../../../assets/img/publish/shoucang.png)
                    no-repeat center left;
                  background-size: 28% 100%;
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
                @include wh(85%, auto);
                text-align: center;
                background: url(../../../../assets/img/publish/fulls.png)
                  no-repeat center left;
                background-size: 20% 100%;
              }

              p.hover-p2 {
                background: url(../../../../assets/img/publish/yichu.png)
                  no-repeat center left;
                background-size: 20% 100%;
              }
              span {
                @include sc(14px, #676767);
              }
            }
          }
        }
      }
    }
    > div.null {
      @include wh(100%, 100%);
      @include fj(center);
      flex-direction: column;
      align-items: center;
      img {
        @include wh(215px, 188px);
      }
      span {
        @include sc(14px, #6181ca);
        margin-top: 23px;
      }
    }
  }
}
</style>
