<template>
  <div class="work-type-error">
    <div class="work-type-conent-1">
      <div class="work-type-conent-left">
        <div>
          <span>{{ textbookName }}</span>
          <span>{{ textbookTeachingmateriaName }}</span>
        </div>
        <div class="scroll">
          <ul class="menu">
            <template>
              <li
                v-for="(item, index) in workbookChaptersListTree"
                :key="index"
              >
                <div
                  @click="
                    selectUnit(
                      item.textbookChapterCode,
                      item.textbookChapterName
                    )
                  "
                  :class="
                    currentWorkbookChapterParentCode == item.textbookChapterCode
                      ? 'hover-div'
                      : currentWorkbookChapterChildCode.indexOf(
                          item.textbookChapterCode
                        ) != -1
                      ? 'hover-div-1'
                      : ''
                  "
                >
                  {{ item.textbookChapterName }}
                </div>
                <template v-if="item.childrens.length > 0">
                  <ul v-for="items in item.childrens" :key="items.index">
                    <li
                      :class="
                        currentWorkbookChapterChildCode ==
                        items.textbookChapterCode
                          ? 'hover-li'
                          : ''
                      "
                      v-if="
                        WorkbookChapterCodeList.indexOf(
                          item.textbookChapterCode
                        ) != -1
                      "
                      @click="
                        selectSesstion(
                          items.textbookChapterCode,
                          items.textbookChapterName
                        )
                      "
                    >
                      {{ items.textbookChapterName }}
                    </li>
                  </ul>
                </template>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="work-type-conent-right-1">
        <div></div>
        <div v-if="workbookPageQuestionnumList.length != 0" class="question">
          <div>
            <span>{{ unitOfSelectSesstionName }}</span>
            <span
              >本页共{{
                workbookPageQuestionnumList.length > 0
                  ? workbookPageQuestionnumList.length
                  : 0
              }}题</span
            >
            <!-- <div class="select-all" v-if="isSomeChecked" @click="someToAll">
              <span></span><span>本页全选</span>
            </div> -->
            <el-checkbox class="headCheckbox" v-model="isAllChecked" @change="selectAll">{{
              isAllChecked ? '取消本页全选' : '本页全选'
            }}</el-checkbox>
          </div>
          <div>
            <div
              v-for="(item, index) in workbookPageQuestionnumList"
              :key="index"
              class="el-div"
            >
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
                <div @click="errorStudensNumber(item.wrongquestionStudents)">
                  <span>做错人数</span>
                  <span>{{
                    item.wrongquestionStudents != undefined &&
                    item.wrongquestionStudents
                      ? item.wrongquestionStudents.length
                      : 0
                  }}</span>
                </div>

                <p
                  :class="
                    addWorkIdList.indexOf(item.questionId) == -1
                      ? ''
                      : 'hover-p2'
                  "
                  @click="addWork(item.questionId)"
                >
                  <span v-if="addWorkIdList.indexOf(item.questionId) == -1"
                    >加入作业</span
                  >
                  <span v-else>移出作业</span>
                  <span v-if="false">禁用</span>
                </p>
              </div>
            </div>
            <div class="load-more" v-if="isShowMoreAll">
              <span @click="changePage" v-if="!isShowMore">查看更多</span>
              <span v-else>暂无更多数据</span>
            </div>
          </div>
        </div>
        <div class="null" v-if="workbookPageQuestionnumList.length == 0">
          <img src="../../../assets/img/publish/nulldata.png" alt="" />
          <span>当前错题作业暂无数据</span>
        </div>
      </div>
      <ClassifyDialog
        v-if="showDialog"
        @toParentEvents="closeChildDialog"
        @toParentEvent="getId"
        @toParentEventStore="addCollectStore"
      ></ClassifyDialog>
      <div class="error-dialog-wrap" v-if="showdialog">
        <div class="error-dialog">
          <p>
            <span>提示</span>
            <img
              src="../../../assets/img/publish/close.png"
              alt=""
              @click="close"
            />
          </p>
          <p>
            <span v-for="(item, index) in errorStudentsNumber" :key="index">{{
              item.studentName
            }}</span>
          </p>
          <div>
            <button @click="close">知道了</button>
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
  </div>
</template>

<script>
import $ from 'jquery'
import imageView from 'vue-imageview'
import ClassifyDialog from './componentsOfChild/ClassifyDialog.vue'
export default {
  name: '',
  data() {
    return {
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      currentPage: 1,
      grade: '',
      info: {
        workBookId: '',
        workbookChapterCode: '',
        workbookChapterPage: ''
      },
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
      addStoreList: '', //添加收藏数据
      workbookPageQuestionnumList: [], //题目数据
      tizuWorkbookPageQuestionnumList: [], //题组题目数据
      addWorkbookPageQuestionnumList: [],
      addWorkIdList: [], //添加作业id集合
      addStoreIdList: [], //添加收藏的id集合
      answerIdList: [],
      isAllChecked: false, // 正在进行中的数据是否被选中
      isSomeChecked: false, //半选状态
      showAnswer: false,
      showDialog: false,
      showdialog: false, //错题人数弹框
      WorkbookChapterCodeList: [], //unit code集合
      currentWorkbookChapterParentCode: '',
      currentWorkbookChapterChildCode: '',
      currentWorkbookChapterCode: '',
      workbookChaptersList: [],
      workbookChaptersAllList: [],
      workbookChaptersListTree: [],
      arrAll: [],
      isShowMore: false,
      isShowMoreAll: true,
      errorStudentsNumber: [],
      unitOfSelectSesstionName: ''
    }
  },
  created() {},
  mounted() {
    this.$store.dispatch('publish/wrongQuestion').then(data => {
      this.workbookChaptersAllList = data.data.infos //接收全部数据
      this.workBookListTree(this.workbookChaptersAllList)
      this.$nextTick().then(() => {
        if (document.getElementsByClassName('hover-li').length == 0) {
          document.querySelectorAll('.scroll')[0].scrollTop =
            document.getElementsByClassName('hover-div')[0].offsetTop - 300
        } else {
          document.querySelectorAll('.scroll')[0].scrollTop =
            document.getElementsByClassName('hover-li')[0].offsetTop - 300
        }
      })
    })
  },
  computed: {
    textbookName() {
      return this.$store.state.userInfo.textbookName
    },
    textbookTeachingmateriaName() {
      return this.$store.state.userInfo.textbookTeachingmateriaName
    },
    errorAddWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.errorWorkAllList
      },
      set: function(v) {
        this.$store.commit('publish/ERRORWORKALLLIST', v)
      }
    }
  },
  watch: {
    errorAddWorkbookPageQuestionnumAllList(val) {
      if (val.length == 0) {
        this.isAllChecked = false
      }
      this.addWorkIdList = []
      val.forEach(item => {
        this.workbookPageQuestionnumList.forEach(items => {
          if (item.questionId === items.questionId) {
            this.addWorkIdList.push(item.questionId)
          }
          if (
            this.addWorkIdList.length == 0 ||
            this.addWorkIdList.length < this.workbookPageQuestionnumList.length
          ) {
            this.isAllChecked = false
          } else {
            this.isAllChecked = true
          }
        })
      })
    }
  },
  components: {
    ClassifyDialog,
    imageView
  },
  methods: {
    hideImageView() {
      this.picflag = false
    },
    errorStudensNumber(arr) {
      this.showdialog = true
      this.errorStudentsNumber = arr
    },
    close() {
      this.showdialog = false
    },
    getId(id) {
      this.collectonGroupId = id
    },
    changePage() {
      this.currentPage++
    },
    workBookNameChange(val) {
      this.workbookChaptersAllList.forEach(item => {
        if (val === item.workbookName) {
          this.workbookChaptersList = item.workbookChapters
          this.workBookListTree(this.workbookChaptersList)
          this.workbookId = item.workbookId
          localStorage.setItem('workbookId', JSON.stringify(this.workbookId))
        }
      })
    },
    selectUnit(code, name) {
      this.unitOfSelectSesstionName = name
      this.currentPage = 1
      if (this.WorkbookChapterCodeList.includes(code)) {
        for (var i = 0; i < this.WorkbookChapterCodeList.length; i++) {
          if (this.WorkbookChapterCodeList[i] === code) {
            this.WorkbookChapterCodeList.splice(i, 1)
          }
        }
      } else {
        this.WorkbookChapterCodeList.push(code)
      }
      this.currentWorkbookChapterParentCode = code
      this.currentWorkbookChapterCode = ''
      this.currentWorkbookChapterChildCode = ''
      this.workbookPageQuestionnumList = []
      this.wrongQuestionlist(
        this.currentPage,
        this.currentWorkbookChapterParentCode,
        this.errorAddWorkbookPageQuestionnumAllList
      )
    },
    selectSesstion(code, name) {
      this.unitOfSelectSesstionName = name
      this.currentPage = 1
      this.currentWorkbookChapterChildCode = code
      this.currentWorkbookChapterCode = ''
      this.currentWorkbookChapterParentCode = ''
      this.workbookPageQuestionnumList = []
      this.wrongQuestionlist(
        this.currentPage,
        this.currentWorkbookChapterChildCode,
        this.errorAddWorkbookPageQuestionnumAllList
      )
    },
    selectAll(val) {
      this.isAllChecked = val
      this.addWorkIdList = []
      this.addWorkbookPageQuestionnumList = []
      this.workbookPageQuestionnumList.forEach(item => {
        this.addWorkIdList.push(item.questionId)
        this.addWorkbookPageQuestionnumList.push(item)
      })

      if (
        this.errorAddWorkbookPageQuestionnumAllList == undefined ||
        this.errorAddWorkbookPageQuestionnumAllList.length === 0
      ) {
        this.errorAddWorkbookPageQuestionnumAllList = this.workbookPageQuestionnumList.slice()
      } else {
        if (this.isAllChecked) {
          this.arrAll = [...this.errorAddWorkbookPageQuestionnumAllList]
          this.errorAddWorkbookPageQuestionnumAllList.forEach(item => {
            if (this.addWorkIdList.includes(item.questionId)) {
              this.arrAll.forEach((items, index) => {
                if (items.questionId === item.questionId) {
                  this.arrAll.splice(index, 1)
                }
              })
            }
          })
          this.errorAddWorkbookPageQuestionnumAllList = [
            ...this.arrAll,
            ...this.workbookPageQuestionnumList
          ]
        } else {
          var arr = [...this.errorAddWorkbookPageQuestionnumAllList]
          this.errorAddWorkbookPageQuestionnumAllList.forEach(item => {
            if (this.addWorkIdList.includes(item.questionId)) {
              arr.forEach((items, index) => {
                if (items.questionId === item.questionId) {
                  arr.splice(index, 1)
                }
              })
            }
          })
          this.errorAddWorkbookPageQuestionnumAllList = arr
          this.addWorkIdList = []
        }
      }
      this.$emit(
        'toParentEventOflength',
        this.errorAddWorkbookPageQuestionnumAllList.length
      )
      localStorage.setItem(
        'errorAddWorkbookPageQuestionnumAllList',
        JSON.stringify(this.errorAddWorkbookPageQuestionnumAllList)
      )
      this.$store.commit(
        'publish/ERRORWORKALLLIST',
        this.errorAddWorkbookPageQuestionnumAllList
      )
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
            this.wrongQuestionlist(
              this.currentPage,
              this.currentWorkbookChapterParentCode,
              this.errorAddWorkbookPageQuestionnumAllList
            )
          }
        })
      } else {
        this.showDialog = true
      }
    },
    addCollectStore() {
      this.$store
        .dispatch('publish/addStore', this.CollectionInfos)
        .then(data => {
          if (data.flag === 1) {
            this.$message.success('收藏成功')
            this.showDialog = false
            this.wrongQuestionlist(
              this.currentPage,
              this.currentWorkbookChapterParentCode,
              this.errorAddWorkbookPageQuestionnumAllList
            )
          } else {
            this.showDialog = false
            this.$message.error(data.message)
          }
          this.addStoreList = data.infos
        })
    },
    addWork(id) {
      if (this.addWorkIdList.includes(id)) {
        for (var i = 0; i < this.addWorkIdList.length; i++) {
          if (this.addWorkIdList[i] === id) {
            this.addWorkIdList.splice(i, 1)
            this.addWorkbookPageQuestionnumList.splice(i, 1)
            if (this.addWorkIdList.length === 0) {
              this.isSomeChecked = false
            }
          }
        }
        this.errorAddWorkbookPageQuestionnumAllList.forEach((item, index) => {
          if (item.questionId === id) {
            this.errorAddWorkbookPageQuestionnumAllList.splice(index, 1)
          }
        })
      } else {
        this.addWorkIdList.push(id)
        this.workbookPageQuestionnumList.forEach(item => {
          if (id === item.questionId) {
            this.addWorkbookPageQuestionnumList.push(item)
            this.errorAddWorkbookPageQuestionnumAllList.push(item) //全部数据
          }
        })
      }
      localStorage.setItem(
        'errorAddWorkbookPageQuestionnumAllList',
        JSON.stringify(this.errorAddWorkbookPageQuestionnumAllList)
      )
      this.$store.commit(
        'publish/ERRORWORKALLLIST',
        this.errorAddWorkbookPageQuestionnumAllList
      )
      if (
        this.addWorkbookPageQuestionnumList.length ===
        this.workbookPageQuestionnumList.length
      ) {
        this.isAllChecked = true
        this.isSomeChecked = false
      } else {
        this.isAllChecked = false
        if (this.addWorkbookPageQuestionnumList.length > 0) {
          this.isSomeChecked = true
        }
      }
      this.$emit(
        'toParentEventOflength',
        this.errorAddWorkbookPageQuestionnumAllList.length
      )
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
    closeChildDialog(val) {
      this.showDialog = val
    },
    //转换成树结构
    workBookListTree(list) {
      let arr = []
      list.forEach(item => {
        if (item.textbookChapterLevel === 2) {
          this.workbookChaptersListTree.push(item)
        }
        if (item.textbookChapterLevel === 3) {
          arr.push(item)
        }
      })

      this.workbookChaptersListTree.forEach((item, index) => {
        this.workbookChaptersListTree[index] = { ...item, childrens: [] }
        arr.forEach(items => {
          if (
            this.workbookChaptersListTree[index].textbookChapterId ===
            items.textbookChapterParentid
          ) {
            this.workbookChaptersListTree[index].childrens.push(items)
          }
        })
      })

      this.currentWorkbookChapterParentCode = this.workbookChaptersListTree[0].textbookChapterCode
      this.unitOfSelectSesstionName = this.workbookChaptersListTree[0].textbookChapterName
      this.WorkbookChapterCodeList.push(this.currentWorkbookChapterParentCode)

      this.wrongQuestionlist(
        this.currentPage,
        this.currentWorkbookChapterParentCode,
        this.errorAddWorkbookPageQuestionnumAllList
      )
      return this.workbookChaptersListTree
    },
    wrongQuestionlist(p, id, list) {
      this.addWorkIdList = []
      this.info = {
        page: p,
        textbookChapterCode: id
      }
      this.$store
        .dispatch('publish/wrongQuestionlist', this.info)
        .then(data => {
          this.workbookPageQuestionnumList = data.data.infos
          if (
            this.workbookPageQuestionnumList.length < 10 &&
            this.workbookPageQuestionnumList.length > 0
          ) {
            this.isShowMoreAll = true
            this.isShowMore = true
          } else {
            this.isShowMore = false
            if (this.currentPage === 1) {
              this.isShowMoreAll = false
            }
          }
          list.forEach(item => {
            this.workbookPageQuestionnumList.forEach(items => {
              if (items.teacherQuestionCollectonId != undefined) {
                this.addStoreIdList.push(items.teacherQuestionCollectonId)
              }

              if (item.questionId === items.questionId) {
                this.addWorkIdList.push(item.questionId)
              }
            })
          })

          if (this.workbookPageQuestionnumList.length > 0) {
            if (
              this.addWorkIdList.length ===
              this.workbookPageQuestionnumList.length
            ) {
              this.isAllChecked = true
            } else if (
              this.addWorkIdList.length > 0 &&
              this.addWorkIdList.length <
                this.workbookPageQuestionnumList.length
            ) {
              this.isAllChecked = false
              this.isSomeChecked = true
            } else {
              this.isAllChecked = false
            }
          } else {
            this.isAllChecked = false
          }

          this.$nextTick().then(() => {
            var that = this
            // const ViewerDom = document.getElementById('index')
            // this.Viewer = new Viewer(ViewerDom, {
            //   // 相关配置项,详情见下面
            // })
            if (this.workbookPageQuestionnumList.length > 0) {
              $('.question img').click(function() {
                that.picflag = true
                that.imgArr = []
                that.imgArr.push($(this).attr('src'))
              })
            }
          })
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
.work-type-error {
  @include wh(1200px, 700px);
  margin: 20px auto 0;
  img {
    width: auto;
  }
  .work-type-conent-1 {
    margin: 21px auto 0;
    @include wh(100%, 630px);
    background: #fff;
    @include fj();
    .work-type-conent-left {
      @include wh(288px, 100%);
      border: 1px solid rgba(233, 233, 233, 1);
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
      border-radius: 4px 0px 0px 4px;
      input::-webkit-input-placeholder {
        color: #596878 !important;
        font-size: 13px !important;
      }
      > div:nth-of-type(1) {
        @include wh(100%, 67px);
        margin: 0 auto;
        background: rgba(57, 158, 255, 1);
        border-radius: 4px 0px 0px 4px;
        @include fj(center);
        flex-flow: column;
        align-items: center;
        @include sc(16px, #fff);
        span:nth-child(2) {
          @include sc(14px, #fff);
        }
      }
      > div:nth-of-type(2) {
        margin-top: 10px;
        overflow: scroll;
        height: 87%;
        .menu li {
          @include wh(88%, auto);
          margin: 10px auto 0;
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
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
          }
          > div.hover-div {
            background: rgba(16, 89, 255, 1);
            border: 1px solid rgba(16, 89, 255, 1);
            color: #fff;
          }
          > div.hover-div-1 {
            background: rgba(229, 240, 254, 1);
            border: 1px solid rgba(229, 240, 254, 1);
            color: #1059ff;
          }
          > div.hover-div-2 {
            @include sc(14px, #4e5f71);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(185, 185, 185, 1);
          }

          ul {
            overflow: auto;
          }
          ul li {
            @include wh(94%, 40px);
            float: right;
            @include sc(14px, #4e5f71);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(185, 185, 185, 1);
            box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
            border-radius: 8px;
            margin-top: 10px;
            text-align: left;
            line-height: 40px;
            padding-left: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
          li.hover-li {
            background: rgba(16, 89, 255, 1);
            border: 1px solid rgba(16, 89, 255, 1);
            color: #fff;
          }
        }
      }
    }
    .work-type-conent-right-1 {
      @include wh(912px, 630px);
      border: 1px solid rgba(233, 233, 233, 1);
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
      border-radius: 0px 4px 4px 0px;
      > div:nth-of-type(1) {
        @include wh(100%, 15px);
      }
      > div.question {
        height: 97%;
        .headCheckbox{
          z-index: 0;
        }
        > div:nth-of-type(1) {
          @include wh(100%, 25px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 20px 0;
          span {
            @include sc(14px, #aaaaaa);
          }
          .select-all {
            @include wh(86px, 100%px);
            @include fj();
            margin-bottom: 2px;
            align-items: center;
            span:nth-child(1) {
              @include wh(20px, 20px);
              background: #409eff;
              margin-top: -2px;
            }
            span:nth-child(2) {
              font-weight: 500;
            }
          }
        }
        > div:nth-child(2) {
          overflow: scroll;
          height: 96%;
          padding-bottom: 20px;
          > div.el-div {
            width: 96%;
            min-height: 120px;
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
                  border-bottom: 1px solid #ddd;
                  padding: 10px 20px;
                  position: relative;
                  > p {
                    @include sc(14px, #3d4d65);
                    padding: 0 0 20px 0;
                    word-wrap: break-word;
                    width: 94%;
                    height: 45px;
                    overflow: hidden;
                  }
                  > p.hover-pp {
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
                      i {
                        display: inline;
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
                @include fj();
                align-items: center;
                > p:nth-child(1) {
                  @include fj(flex-start);
                  align-items: center;
                  span {
                    @include wh(auto, 15px);
                    padding: 0 20px;
                    border-right: 1px solid #ddd;
                    @include fj(center);
                    i:nth-child(1) {
                      @include sc(12px, #909090);
                    }
                    i:nth-child(2) {
                      @include sc(12px, #909090);
                      margin-left: 12px;
                    }
                  }
                }
                > p:nth-child(2) {
                  cursor: pointer;
                  margin-right: 10px;
                  padding-left: 25px;
                  background: url(../../../assets/img/publish/jiarushouc.png)
                    no-repeat center left;
                  background-size: 26% 100%;
                }
                > p:nth-child(2).hover-p1 {
                  background: url(../../../assets/img/publish/shoucang.png)
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
              position: relative;
              > div {
                @include wh(100%, 25px);
                position: absolute;
                left: 0;
                top: 0;
                background: rgba(253, 161, 87, 1);
                border-radius: 0px 0px 25px 25px;
                text-align: center;
                line-height: 25px;
                cursor: pointer;
                span {
                  @include sc(12px, #fff);
                  text-align: center;
                }
                span:nth-child(2) {
                  margin-left: 10px;
                  text-decoration: underline;
                }
              }
              img {
                @include wh(24px, 24px);
              }
              > p {
                @include wh(90px, 30px);
                @include fj(center);
                align-items: center;
                padding-left: 16px;
                cursor: pointer;
              }
              > p:nth-of-type(2) {
                margin-top: 15px;
              }

              p:nth-child(2) {
                cursor: pointer;
                background: url(../../../assets/img/publish/addwork.png)
                  no-repeat 10% center rgba(86, 172, 255, 1) !important;
                background-size: 15% 50% !important;
                border: 1px solid rgba(57, 158, 255, 1);
                box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
                border-radius: 15px;

                span {
                  @include sc(14px, #fff);
                }
              }
              p:nth-child(2).hover-p2 {
                background: url(../../../assets/img/publish/deletework.png)
                  no-repeat 12% center #fff !important;
                background-size: 15% 50% !important;
                border: 1px solid rgba(57, 158, 255, 1);
                box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
                border-radius: 15px;

                span {
                  @include sc(14px, #399eff);
                }
              }
              // span {
              //   @include sc(14px, #676767);
              // }
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
              display: block;
              width: 110px;
              height: 20px;
              line-height: 20px;
              @include sc(12px, #b0b0b0);
              cursor: pointer;
              text-align: center;
            }
            span.jz {
              display: block;
              background: url(../../../assets/img/publish/jiazai.png) no-repeat
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
    .error-dialog-wrap {
      @include wh(100%, 100%);
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.4);
      @include fj(center);
      align-items: center;
      .error-dialog {
        @include wh(500px, 320px);
        background: #fff;
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 12px;
        > p:nth-child(1) {
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
        > p:nth-child(2) {
          @include wh(96%, 180px);
          margin: 20px auto 0;
          display: flex;
          flex-wrap: wrap;
          span {
            height: 30px;
            padding: 0 8px;
            background: #f7fafe;
            border-radius: 8px;
            line-height: 30px;
            margin-left: 20px;
          }
        }
        > div {
          @include wh(100%, auto);
          @include fj(center);
          margin-top: 10px;
          button {
            @include wh(160px, 36px);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(16, 89, 255, 1);
            box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
            border-radius: 18px;
            @include sc(14px, #1059ff);
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
}
</style>
