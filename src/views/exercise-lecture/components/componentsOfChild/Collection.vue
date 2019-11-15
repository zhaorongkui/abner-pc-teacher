<template>
  <div class="work-type-conent-coll-1">
    <div class="work-type-conent-left">
      <div>
        <div @click="editClassify">编辑分类</div>
      </div>
      <div>
        <ul class="menu">
          <li @click="spreadChange(0)">
            <div :class="groupType == 0 ? 'hover-div' : ''">
              我的收藏
            </div>
          </li>
          <template v-for="(item, index) in addGrouplist">
            <li
              :key="index"
              v-if="item.collectonGroupId != 0"
              @click="spreadChange(index + 1, item.collectonGroupId)"
            >
              <div
                :class="groupType == index + 1 ? 'hover-div' : ''"
                style="display:flex;"
              >
                <i
                  style="width:88%;display:block;margin-right:5px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                  >{{ item.groupName }}</i
                >
                <img
                  src="../../../../assets/img/publish/ssss.png"
                  alt=""
                  @click.stop="deletGroup(item.collectonGroupId)"
                />
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="work-type-conent-right-1">
      <div></div>
      <div class="question" v-if="collectonQuestionsList.length != 0">
        <div></div>
        <div class="collect-group">
          <div v-for="(item, index) in collectonQuestionsList" :key="index">
            <div v-if="item.questionTypeCode != 8" class="el-divs">
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
                        <span v-html="items.questionStem"></span>
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
                    <h6 @click="hideAnswerBtn(item.questionId)">
                      收起
                    </h6>
                  </div>
                </div>
                <div>
                  <p>
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
                        style="max-width:110px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                        v-if="item.questionSourceId == 1"
                        >{{ item.workbookName }}</i
                      >
                      <i
                        style="max-width:50px;overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;"
                        v-if="item.questionSourceId == 2"
                        >{{ item.paperName }}</i
                      >
                    </span>
                    <span
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
                  </p>
                  <p
                    :class="
                      item.teacherQuestionCollectonId == undefined ||
                      item.teacherQuestionCollectonId == null ||
                      item.teacherQuestionCollectonId == ''
                        ? ''
                        : 'hover-p1'
                    "
                    @click="cancelStore(item.teacherQuestionCollectonId)"
                  >
                    <span>取消收藏</span>
                  </p>
                </div>
              </div>
              <div>
                <p @click="fullScreen(item.questionId)">
                  <span>全屏展示</span>
                </p>
                <p
                  :class="changeClassfilyIdIndex == index ? 'hover-p3' : ''"
                  @click="
                    changeClassify(index, item.teacherQuestionCollectonId)
                  "
                >
                  <span>修改分类</span>
                </p>
              </div>
            </div>
            <!-- 阅读 -->
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
                  <p>
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
                  </p>
                  <p
                    :class="
                      item.teacherQuestionCollectonId == undefined ||
                      item.teacherQuestionCollectonId == null ||
                      item.teacherQuestionCollectonId == ''
                        ? ''
                        : 'hover-p1'
                    "
                    @click="cancelStore(item.teacherQuestionCollectonId)"
                  >
                    <span>取消收藏</span>
                  </p>
                </div>
              </div>
              <div>
                <p @click="fullScreen(item.questionId)">
                  <span>全屏展示</span>
                </p>
                <p
                  :class="changeClassfilyIdIndex == index ? 'hover-p3' : ''"
                  @click="
                    changeClassify(index, item.teacherQuestionCollectonId)
                  "
                >
                  <span>修改分类</span>
                </p>
              </div>
            </div>
          </div>
          <div class="load-more" v-if="isShowMoreAll">
            <span @click="changePage" v-if="!isShowMore" class="jz"
              >点击加载更多</span
            >

            <span v-else>暂无更多数据</span>
          </div>
        </div>
      </div>
      <div class="null" v-else>
        <img src="../../../../assets/img/publish/nulldata.png" alt="" />
        <span>当前收藏中暂无数据</span>
      </div>
    </div>
    <ClassifyDialog
      v-if="showDialog"
      @toParentEvents="closeChildDialog"
      @toParentEvent="getId"
      @toParentEventStore="addCollectStore"
    ></ClassifyDialog>
    <div class="modal" v-if="showClassify">
      <CreateClassify
        v-if="showClassify"
        :type="1"
        @toParentEvent-c="addGroupName"
        @toParentEvent-cl="close"
      ></CreateClassify>
    </div>
    <FullScreen
      v-if="showFullScreen"
      @toParentsClose="closeFullScreen"
      @toParentChange="changePage"
      :type="type"
      :isShowMore="isShowMore"
      :workbookPageQuestionnumList="collectonQuestionsList"
      :fullId="fullId"
    >
    </FullScreen>
    <div class="del-coll-wrap" v-if="showDeldialog">
      <div class="del-dialog">
        <p>
          <span>提示</span>
          <img
            src="../../../../assets/img/publish/close.png"
            alt=""
            @click="closeDeldialog"
          />
        </p>
        <span>删除分类将会删除该分类下的所有收藏试题？</span>
        <div>
          <button @click="cancle">取消删除</button>
          <button @click="confirm">确认删除</button>
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
import LookOriginal from '../../../../components/LookOriginal'
import $ from 'jquery'
import imageView from 'vue-imageview'
import ClassifyDialog from './ClassifyDialog.vue'
import CreateClassify from './CreateClassify.vue'
import FullScreen from './fullScreen.vue'
export default {
  name: '',
  data() {
    return {
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      currentPage: 1,
      currentinfo: {
        page: '',
        id: ''
      },
      showDialog: false,
      showClassify: false,
      showDeldialog: false,
      pageIndex: 0,
      addGrouplist: [],
      groupType: 0,
      collectionGroupId: 0,
      collectonGroupId: '',
      teacherQuestionCollectonId: '',
      deletGroupId: '',
      //collectonQuestionsList: [],
      answerIdList: [],
      addWorkIdList: [],
      changeClassfilyIdIndex: null,
      tizuWorkbookPageQuestionnumList: [],
      isShowMore: false,
      isShowMoreAll: true,
      showFullScreen: false,
      type: 1 //判断是收藏点击
    }
  },
  computed: {
    collectonQuestionsList: {
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
    CreateClassify,
    FullScreen,
    imageView,
    LookOriginal
  },
  mounted() {
    this.collectonQuestionsList = []
    this.$store.dispatch('publish/getGroup').then(data => {
      if (data.flag === 1) {
        this.addGrouplist = data.infos
        this.groupType = this.addGrouplist[0].collectonGroupId
      }
      this.addGrouplist.length > 0 ? (this.groupType = 1) : (this.groupType = 0)
      this.collectionGroupId = data.infos[0].collectonGroupId
      this.getGroupQuestions(this.collectionGroupId, this.currentPage)
    })
  },
  methods: {
    lookOriginal(obj) {
      this.$refs['original'].id = obj.questionId
      this.$refs['original'].visible = true
    },
    hideImageView() {
      this.picflag = false
      this.picflag = false
    },
    getId(id) {
      this.collectonGroupId = id
    },
    changePage() {
      this.currentPage++
      this.getGroupQuestions(this.collectionGroupId, this.currentPage)
    },
    closeChildDialog() {
      this.showDialog = false
      this.changeClassfilyIdIndex = null
    },
    close() {
      this.showClassify = false
    },
    //有关删除收藏分组方法
    closeDeldialog() {
      this.showDeldialog = false
    },
    cancle() {
      this.showDeldialog = false
    },
    confirm() {
      this.$store.dispatch('publish/delGroup', this.deletGroupId).then(data => {
        if (data.flag === 1) {
          this.showDeldialog = false
          this.$message.success('删除分组成功')
          this.addGrouplist.forEach((item, index) => {
            if (this.deletGroupId === item.collectonGroupId) {
              this.addGrouplist.splice(index, 1)
            }
          })
        }
      })
    },

    spreadChange(index, id) {
      this.currentPage = 1
      this.groupType = index
      this.collectionGroupId = id
      this.collectonQuestionsList = []
      this.getGroupQuestions(this.collectionGroupId, this.currentPage)
    },
    editClassify() {
      this.showClassify = true
    },
    addGroupName(val) {
      this.addGroupNames = val
      this.$store.dispatch('publish/addGroup', val).then(data => {
        if (data.flag === 1) {
          this.showClassify = false
        }
        this.$store.dispatch('publish/getGroup').then(data => {
          if (data.flag === 1) {
            this.addGrouplist = data.infos
          }
        })
      })
    },
    deletGroup(id) {
      this.deletGroupId = id
      this.showDeldialog = true
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
    fullScreen(id) {
      this.showFullScreen = true
      this.fullId = id
    },
    closeFullScreen(val) {
      this.showFullScreen = val
    },
    changeClassify(index, id) {
      this.teacherQuestionCollectonId = id
      this.changeClassfilyIdIndex = index
      this.showDialog = true
    },
    addCollectStore() {
      var obj = {
        collectonGroupId: this.collectonGroupId,
        teacherQuestionCollectonId: this.teacherQuestionCollectonId
      }
      this.$store.dispatch('publish/moveGroup', obj).then(data => {
        if (data.flag === 1) {
          this.showDialog = false
          this.$message.success('修改成功')
          this.changeClassfilyIdIndex = null
          this.collectonQuestionsList.forEach((item, index) => {
            if (
              item.teacherQuestionCollectonId == this.teacherQuestionCollectonId
            ) {
              this.collectonQuestionsList.splice(index, 1)
            }
          })
        }
      })
    },
    cancelStore(id) {
      this.$store.dispatch('publish/cancelStore', id).then(data => {
        if (data.flag === 1) {
          this.$message.success('取消收藏成功')
          this.collectonQuestionsList.forEach((item, index) => {
            if (item.teacherQuestionCollectonId == id) {
              this.collectonQuestionsList.splice(index, 1)
            }
          })
          //this.getGroupQuestions(this.collectionGroupId, this.currentPage)
        }
      })
    },
    getGroupQuestions(id, page) {
      //this.collectonQuestionsList = []
      this.currentinfo = {
        page: page,
        id: id
      }
      this.$store
        .dispatch('publish/getGroupQuestions', this.currentinfo)
        .then(data => {
          if (data.flag === 1) {
            data.infos.forEach(item => {
              this.collectonQuestionsList.push(item.sectionSubjectQuestionInfo)
            })
            this.$nextTick().then(() => {
              var that = this
              if (this.collectonQuestionsList.length > 0) {
                $('.question .el-divs img').click(function() {
                  that.picflag = true
                  that.imgArr = []
                  that.imgArr.push($(this).attr('src'))
                })
              }
            })
            if (data.infos.length < 10) {
              this.isShowMoreAll = true
              this.isShowMore = true
            } else {
              this.isShowMoreAll = true
              this.isShowMore = false
              // if (this.currentPage === 1) {
              //   this.isShowMoreAll = false
              // }
            }
            if (this.collectonQuestionsList.length == 0) {
              this.isShowMoreAll = false
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.work-type-conent-coll-1 {
  .tag-list-1 {
    @include wh(100%, 30px);
    display: flex;
    justify-content: space-between !important;
    align-items: center;
    border-top: 1px solid #ddd;
    > p:nth-child(1) {
      @include fj(flex-start);
      align-items: center;
      @include wh(auto, 30px);
      > span {
        @include wh(auto, 15px);
        padding: 0 20px;
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

    p:nth-child(2) {
      margin-right: 10px;
      padding-left: 25px;
      background: url(../../../../assets/img/publish/jiarushouc.png) no-repeat
        center left;
      background-size: 28% 100%;
      span {
        @include sc(12px, #676767);
      }
    }
    p:nth-child(2).hover-p1 {
      background: url(../../../../assets/img/publish/shoucang.png) no-repeat
        center left;
      background-size: 28% 100%;
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
.work-type-conent-coll-1 {
  margin: 21px auto 0;
  @include wh(100%, 91%);
  background: #fff;
  @include fj();
  scrollbar-width: none;
  .modal {
    @include wh(100%, 100%);
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .work-type-conent-left {
    @include wh(288px, 100%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    display: flex;
    flex-direction: column;
    > div:nth-of-type(1) {
      @include wh(100%, auto);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      flex: 0 0 80px;
      > div:nth-child(1) {
        @include wh(86%, 42px);
        border-radius: 21px;
        background: url(../../../../assets/img/publish/fabu.png) no-repeat 6%
          center rgba(57, 158, 255, 1);
        background-size: 11% 64%;
        text-align: left;
        padding-left: 18%;
        line-height: 43px;
        @include sc(14px, #fff);
      }
      > div:nth-child(2) {
        @include wh(86%, 42px);
        background: rgba(229, 240, 254, 1);
        border-radius: 8px;
        text-align: left;
        padding-left: 6%;
        line-height: 43px;
        @include sc(14px, #1059ff);
        margin-top: 11px;
      }
    }
    > div:nth-of-type(2) {
      margin-top: 10px;
      flex: auto;
      padding-bottom: 5px;
      overflow: scroll;
      .menu {
        padding-bottom: 30px;
      }
      .menu li {
        @include wh(85%, auto);
        margin: 10px auto 0;
        > div {
          display: block;
          @include wh(100%, 40px);
          text-align: left;
          line-height: 40px;
          padding-left: 6%;
          @include sc(14px, #4e5f71);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(185, 185, 185, 1);
          border-radius: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          img {
            float: right;
            margin: 11px 10px 0 0;
            @include wh(15px, 18px);
          }
        }
        > div.hover-div {
          @include sc(14px, #1059ff);
          border: 1px solid rgba(229, 240, 254, 1);
          background: rgba(229, 240, 254, 1);
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
    > div:nth-of-type(1) {
      @include wh(100%, auto);
      flex: 0 0 10px;
    }
    > div.question {
      @include wh(100%, auto);
      flex: auto;
      overflow: scroll;
      > div:nth-of-type(1) {
      }
      > div.collect-group {
        @include wh(100%, auto);
        padding-bottom: 30px;
        > div {
          > div {
            width: 96%;
            min-height: 40px;
            @include fj();
            margin: 15px auto 0;
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
                    height: 45px;
                    overflow: hidden;
                    width: 94%;
                  }
                  > p.hover-pp {
                    @include sc(14px, #3d4d65);
                    height: auto;
                    overflow: auto;
                  }
                  > .pp {
                    overflow: hidden;
                    height: 0;
                    width: 94%;
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
                  > .pp.hover-ppp {
                    overflow: auto;
                    height: auto;
                  }
                  > span {
                    @include sc(12px, #919fb1);
                  }
                  h6 {
                    @include wh(37px, 13px);
                    @include sc(12px, #919fb1);
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    background: url(../../../../assets/img/publish/zhankai.png)
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
                      i {
                        display: inline;
                      }
                    }
                    p {
                      display: inline-block;
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
                div.hover-div {
                  height: auto;
                  overflow: auto;
                  border-bottom: 1px solid #ddd;
                }
              }
              > div:nth-child(2) {
                @include wh(100%, 30px);
                @include fj();
                align-items: center;
                > p:nth-child(1) {
                  @include fj(flex-start);
                  align-items: center;
                  @include wh(auto, 30px);
                  > span {
                    @include wh(auto, 15px);
                    padding: 0 20px;
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

                p:nth-child(2) {
                  margin-right: 10px;
                  padding-left: 25px;
                  background: url(../../../../assets/img/publish/jiarushouc.png)
                    no-repeat center left;
                  background-size: 28% 100%;
                  span {
                    @include sc(12px, #676767);
                  }
                }
                p:nth-child(2).hover-p1 {
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
              }
              p {
                background: url(../../../../assets/img/publish/fulls.png)
                  no-repeat center left;
                background-size: 20% 100%;
              }
              p.hover-p2 {
                background: url(../../../../assets/img/publish/yichu.png)
                  no-repeat center left;
                background-size: 20% 100%;
              }
              p:nth-child(2) {
                margin-top: 15px;
                cursor: pointer;
                background: url(../../../../assets/img/publish/xiugai2.png)
                  no-repeat 1% center !important;
                background-size: 21% 99% !important;
              }
              p:nth-child(2).hover-p3 {
                background: url(../../../../assets/img/publish/xiugai1.png)
                  no-repeat 1% center !important;
                background-size: 21% 99% !important;
              }
              span {
                @include sc(14px, #676767);
              }
            }
          }
        }

        > div.load-more {
          @include wh(100%, 20px);
          min-height: 0px;
          margin-top: 20px;
          @include fj(center);
          align-items: center;
          background: 0;
          border: 0;
          box-shadow: inherit;
          span {
            @include sc(12px, #b0b0b0);
            cursor: pointer;
          }
          span.jz {
            text-align: center;
            width: 120px;
            display: block;
            background: url(../../../../assets/img/publish/jiazai.png) no-repeat
              left top;
            background-size: 12% 85%;
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
  .del-coll-wrap {
    @include wh(100%, 100%);
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    @include fj(center);
    align-items: center;
    .del-dialog {
      @include wh(500px, 320px);
      background: #fff;
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      border-radius: 12px;
      p {
        @include wh(100%, 48px);
        margin: 0 auto;
        padding: 0 20px;
        @include fj(space-between);
        align-items: center;
        border-bottom: 1px solid #ddd;
        span {
          @include sc(14px, #5e84ad);
        }
        img {
          @include wh(14px, 14px);
        }
      }
      > span {
        display: block;
        @include wh(100%, auto);
        margin: 80px auto 0;
        text-align: center;
        @include sc(17px, #3d4d65);
      }
      > div {
        @include wh(100%, auto);
        @include fj(center);
        margin-top: 80px;
        button {
          @include wh(160px, 36px);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(16, 89, 255, 1);
          box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
          border-radius: 18px;
          @include sc(14px, #1059ff);
          cursor: pointer;
          outline: none;
        }
        button:nth-child(2) {
          background: #1059ff;
          box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
          border-radius: 18px;
          @include sc(14px, #fff);
          margin-left: 23px;
          border: 0;
        }
      }
    }
  }
}
</style>
