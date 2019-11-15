<template>
  <div class="work-type-conent-1">
    <div class="work-type-conent-left">
      <div>
        <el-select
          v-model="workBookName"
          :placeholder="
            workBookName != '' && workBookName != null
              ? workBookName
              : workbookChaptersAllList.length > 0
              ? workbookChaptersAllList[0].workbookName
              : '请选择'
          "
          @change="workBookNameChange"
        >
          <el-option
            v-for="item in workbookChaptersAllList"
            :key="item.workbookName"
            :label="item.workbookName"
            :value="item.workbookName"
          >
          </el-option>
        </el-select>
      </div>
      <div class="scroll">
        <ul class="menu">
          <template>
            <li v-for="(item, index) in workbookChaptersListTree" :key="index">
              <div
                :class="
                  currentWorkbookChapterParentCode == item.workbookChapterCode
                    ? 'hover-div-0'
                    : currentWorkbookChapterChildCode.indexOf(
                        item.workbookChapterCode
                      ) != -1
                    ? 'hover-div-1'
                    : ''
                "
                @click.stop="selectUnits(item.workbookChapterCode)"
              >
                <i>{{ item.workbookChapterName }}</i>
                <img
                  src="../../../../assets/img/publish/xxjt.png"
                  alt=""
                  :class="
                    WorkbookChapterCodeList.indexOf(item.workbookChapterCode) !=
                    -1
                      ? 'hover-img'
                      : ''
                  "
                  @click.stop="selectUnit(item.workbookChapterCode)"
                />
              </div>
              <template v-if="item.childrens.length > 0">
                <ul v-for="items in item.childrens" :key="items.index">
                  <li
                    :class="
                      currentWorkbookChapterChildCode ==
                      items.workbookChapterCode
                        ? 'hover-li'
                        : ''
                    "
                    v-if="
                      WorkbookChapterCodeList.indexOf(
                        item.workbookChapterCode
                      ) != -1
                    "
                    @click="selectSesstion(items.workbookChapterCode)"
                  >
                    {{ items.workbookChapterName }}
                  </li>
                </ul>
              </template>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="work-type-conent-right">
      <div
        v-if="workbookPageInfoList.length != 0 && workbookType == 1"
        class="page"
      >
        <span v-if="workbookPageInfoList.length > 0" @click="prveBtn"></span>
        <ul>
          <li
            v-for="(item, index) in workbookPageInfoListRefactor"
            :key="item.index"
            @click="
              selectPage(
                item.workbookPageQuestionnum +
                  item.workbookPageQuestionArticlenum,
                index,
                item.workbookPage
              )
            "
            :class="
              item.workbookPageQuestionnum +
                item.workbookPageQuestionArticlenum ==
              0
                ? 'hover-li-1'
                : pageIndex == index
                ? 'hover-li-2'
                : 'hover-li-0'
            "
          >
            {{ 'P' + item.workbookPage }}
          </li>
        </ul>
        <span v-if="workbookPageInfoList.length > 0" @click="nextBtn"></span>
      </div>
      <ability-screening
        v-model="workBookTypeValue"
        :data="abilityDimensionList"
        v-if="workbookType === 2"
        @on-change="changeAbilityScreening"
      ></ability-screening>
      <div v-if="workbookPageQuestionnumList.length != 0" class="question">
        <div>
          <!-- <span>第{{ pageNumIndex }}页</span>
          <span>本页共{{ workbookPageQuestionnumList.length }}题</span>
          <div class="select-all" v-if="isSomeChecked" @click="someToAll">
            <span></span><span>本页全选</span>
          </div>
          <el-checkbox v-model="isAllChecked" @change="selectAll" v-else>{{
            isAllChecked ? '取消本页全选' : '本页全选'
          }}</el-checkbox> -->
        </div>
        <div class="question-scroll">
          <template>
            <div
              v-for="(item, index) in workbookPageQuestionnumList"
              :key="index"
              class="gg"
            >
              <div class="el-div" v-if="item.questionTypeCode != 8">
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
                        v-for="(items,
                        index) in tizuWorkbookPageQuestionnumList"
                        :key="index"
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
                        ><i>题型</i><i>{{ item.questionYytypeName }}</i></span
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
                  <p @click="fullScreen(item.questionId)">
                    <span>全屏展示</span>
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
                        ><i>相关主题</i
                        ><i>{{ item.questionTitleName }}</i></span
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
                <div class="ee">
                  <p @click="fullScreen(item.questionId)">
                    <span>全屏展示</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div
        class="null"
        v-if="
          workbookPageInfoList.length == 0 ||
            workbookPageQuestionnumList.length == 0
        "
      >
        <img src="../../../../assets/img/publish/nulldata.png" alt="" />
        <span>当前练习册中暂无数据</span>
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
      @toParentNext="nextBtn"
      @toParentPrve="prveBtn"
      :fullId="fullId"
      :fullscreen="fullscreen"
      :count="count"
      :type="type"
      :workbookType="workbookType"
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
    <look-original ref="original"></look-original>
  </div>
</template>

<script>
import $ from 'jquery'
import AbilityScreening from '../../../../components/AbilityScreening'
import LookOriginal from '../../../../components/LookOriginal'
import imageView from 'vue-imageview'
import ClassifyDialog from './ClassifyDialog.vue'
import FullScreen from './fullScreen.vue'
export default {
  name: '',
  data() {
    return {
      picflag: false,
      imgArr: [],
      imageIndex: 0,
      grade: '',
      workBookName: '',
      pageIndex: 0,
      pageNum: [],
      count: 0,
      pageLength: '',
      pageNumIndex: '',
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
      // collectionGroupList: [], //分组数据
      // workbookPageQuestionnumList: [], //题目数据
      tizuWorkbookPageQuestionnumList: [], //题组题目数据
      addWorkbookPageQuestionnumList: [],
      addStoreIdList: [], //添加收藏的id集合
      answerIdList: [],
      workbookPageQuestionnum: '',
      showAnswer: false,
      showDialog: false,
      showFullScreen: false,
      WorkbookChapterCodeList: [], //unit code集合
      showChildWorkbookChapterParentCode: '', //控制子集展开收起的code 码
      workbookPageInfoList: '', //页码数据
      workbookPageInfoListRefactor: [], //页码数据重构
      currentWorkbookChapterParentCode: '',
      currentWorkbookChapterChildCode: '',
      currentWorkbookChapterCode: '',
      workbookId: '', //练习册id
      currentWorkBookName: null,
      workbookChaptersList: [],
      workbookChaptersAllList: [],
      workbookChaptersListTree: [],
      arrAll: [],
      fullId: '',
      fullscreen: true,
      type: '',
      flag: true,
      playerOptions: {
        width: '800px',
        height: '450px',
        autoplay: true,
        // muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            // mp4
            // src: 'http://vjs.zencdn.net/v/oceans.mp4'
            src:
              'https://lochi-sit.oss-cn-beijing.aliyuncs.com/img/question/yuwen/20191017/4458f5cef9ad4b45833468431e6eb0b4.png'
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        // poster:
        //   'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
        poster: ''
      },
      workBookTypeValue: '全部', //阅读
      abilityDimensionList: [], //阅读维度刷选
      workbookType: '' //练习册类型
    }
  },
  created() {
    this.workbookId = JSON.parse(localStorage.getItem('workbookId'))
    this.workbookName =
      localStorage.getItem('workbookName') != null &&
      localStorage.getItem('workbookName') != undefined &&
      localStorage.getItem('workbookName') != ''
        ? localStorage.getItem('workbookName')
        : ''
  },
  mounted() {
    //this.Viewer.destroy()

    this.$store.dispatch('publish/publishPageWorkHomeList').then(data => {
      this.workbookChaptersAllList = data.data.infos.workbookList //接收全部数据
      this.abilityDimensionList = data.data.infos.abilityDimensionList
      if (
        this.workbookId != undefined &&
        this.workbookId != null &&
        this.workbookId != ''
      ) {
        this.workbookChaptersAllList.forEach(item => {
          if (this.workbookId === item.workbookId) {
            this.workBookName = item.workbookName
            this.workbookType = item.workbookType
            //this.workbookChaptersList = item.workbookChapters
          } else {
            //this.workbookChaptersList = data.data.infos[0].workbookChapters
            this.workbookId = this.workbookChaptersAllList[0].workbookId
            this.workbookType = this.workbookChaptersAllList[0].workbookType
          }
        })
      } else {
        //this.workbookChaptersList = data.data.infos[0].workbookChapters //接收第一组数据
        //this.workbookId = data.data.infos[0].workbookId
        this.workbookId = this.workbookChaptersAllList[0].workbookId
        this.workbookType = this.workbookChaptersAllList[0].workbookType
        localStorage.setItem(
          'workbookId',
          JSON.stringify(this.workbookChaptersAllList[0].workbookId)
        )
      }
      this.getChapter() //获取练习册章节
    })
  },
  computed: {
    workbookPageQuestionnumLists: {
      get: function() {
        return this.$store.state.work.workbookPageQuestionnumLists
      },
      set: function(v) {
        this.$store.commit('work/TESTS', v)
      }
    },
    workbookPageQuestionnumList() {
      if (this.workBookTypeValue === '全部') {
        return this.workbookPageQuestionnumLists
      } else {
        //console.log(this.workbookArticleList)
        let value = this.workBookTypeValue.split(',')
        var arr = this.workbookPageQuestionnumLists.filter(item => {
          let abilityDimensionsArr = []
          if (item.abilityDimensions) {
            abilityDimensionsArr = $.trim(item.abilityDimensions).split('|')
          }
          //console.log('abilityDimensionsArr', abilityDimensionsArr)
          //console.log('value', value)
          let count = abilityDimensionsArr.filter(item => {
            let str = $.trim(item)
            return value.includes(str)
          })
          //console.log('count', count)
          return count.length
        })
        return arr
      }
    }
  },
  components: {
    ClassifyDialog,
    FullScreen,
    imageView,
    LookOriginal,
    AbilityScreening
  },
  methods: {
    changeAbilityScreening() {},
    lookOriginal(obj) {
      this.$refs['original'].id = obj.questionId
      this.$refs['original'].visible = true
    },
    hideImageView() {
      this.picflag = false
    },
    playerReadied(player) {
      // seek to 10s
      player.currentTime()
    },
    getId(id) {
      this.collectonGroupId = id
    },
    workBookNameChange(val) {
      this.currentWorkbookChapterParentCode = ''
      this.currentWorkbookChapterChildCode = ''
      this.currentWorkbookChapterCode = ''
      this.workbookPageQuestionnumLists = []
      this.addWorkbookPageQuestionnumList = []
      this.WorkbookChapterCodeList = []
      this.workbookChaptersListTree = []
      this.workbookChaptersAllList.forEach(item => {
        if (val === item.workbookName) {
          this.workbookChaptersList = item.workbookChapters
          this.workbookId = item.workbookId
          this.workbookType = item.workbookType
          this.getChapter() //获取练习册章节
          localStorage.setItem('workbookId', JSON.stringify(this.workbookId))
        }
      })
      localStorage.setItem('workbookName', val)
    },
    selectUnit(code) {
      if (this.WorkbookChapterCodeList.includes(code)) {
        for (var i = 0; i < this.WorkbookChapterCodeList.length; i++) {
          if (this.WorkbookChapterCodeList[i] === code) {
            this.WorkbookChapterCodeList.splice(i, 1)
          }
        }
      } else {
        this.WorkbookChapterCodeList.push(code)
      }
    },
    selectUnits(code) {
      this.currentWorkbookChapterParentCode = code
      this.currentWorkbookChapterCode = ''
      this.currentWorkbookChapterChildCode = ''
      this.workbookPageQuestionnumLists = []
      this.count = 0
      this.workbookChaptersList.forEach(item => {
        if (code === item.workbookChapterCode) {
          this.workbookPageInfoList = item.workbookPageInfoList
          this.workbookPageInfoListRefactor = this.group(
            this.workbookPageInfoList,
            16
          )[this.count]
        }
        for (let j = 0; j < this.workbookPageInfoList.length; j++) {
          if (
            this.workbookPageInfoList[j].workbookPageQuestionnum +
              this.workbookPageInfoList[j].workbookPageQuestionArticlenum !=
            0
          ) {
            this.pageNum.push(this.workbookPageInfoList[j].workbookPage)
            this.pageNumIndex = this.workbookPageInfoList[j].workbookPage
            this.pageIndex = j
            break
          } else {
            this.pageNumIndex = this.workbookPageInfoList[j].workbookPage
          }
        }
      })
      this.isSelectAll(code)
    },
    selectSesstion(code) {
      this.currentWorkbookChapterChildCode = code
      this.currentWorkbookChapterCode = ''
      this.currentWorkbookChapterParentCode = ''
      this.workbookPageQuestionnumLists = []
      this.count = 0
      this.workbookChaptersList.forEach(item => {
        if (code === item.workbookChapterCode) {
          this.workbookPageInfoList = item.workbookPageInfoList
          this.workbookPageInfoListRefactor = this.group(
            this.workbookPageInfoList,
            16
          )[this.count]
        }
        for (let j = 0; j < this.workbookPageInfoList.length; j++) {
          if (
            this.workbookPageInfoList[j].workbookPageQuestionnum +
              this.workbookPageInfoList[j].workbookPageQuestionArticlenum !=
            0
          ) {
            this.pageNum.push(this.workbookPageInfoList[j].workbookPage)
            this.pageNumIndex = this.workbookPageInfoList[j].workbookPage
            this.pageIndex = j
            break
          } else {
            this.pageNumIndex = this.workbookPageInfoList[j].workbookPage
          }
        }
        //localStorage.setItem('workbookPageInfoList', this.workbookPageInfoList)
      })

      this.isSelectAll(code)
    },
    prveBtn() {
      this.type = ''
      this.fullscreen = true //全屏展示的控制无限循环
      var flag = false
      if (this.count == 0) {
        for (let i = 0; i < this.workbookPageInfoListRefactor.length - 1; i++) {
          if (
            this.workbookPageInfoListRefactor[i].workbookPageQuestionnum +
              this.workbookPageInfoListRefactor[i]
                .workbookPageQuestionArticlenum !=
            0
          ) {
            var index = i
            if (this.pageIndex === index) {
              this.type = 3
              return false
            }
            break
          }
        }
      }
      this.pageIndex--

      if (this.pageIndex <= 0) {
        flag = true
        this.pageIndex = 0
        if (this.count > 0) {
          this.count--
          this.pageIndex = 0
          if (this.count === 0) {
            this.count = 0
          }
          this.workbookPageInfoListRefactor = this.group(
            this.workbookPageInfoList,
            16
          )[this.count]

          for (
            var i = this.workbookPageInfoListRefactor.length - 1;
            i > 0;
            i--
          ) {
            if (
              this.workbookPageInfoListRefactor[i].workbookPageQuestionnum +
                this.workbookPageInfoListRefactor[i]
                  .workbookPageQuestionArticlenum !=
              0
            ) {
              this.pageIndex = i
              break
            }
          }
        }
      } else {
        for (
          let i = this.pageIndex;
          i >=
          this.workbookPageInfoListRefactor.length -
            (this.workbookPageInfoListRefactor.length - this.pageIndex);
          i--
        ) {
          if (
            this.workbookPageInfoListRefactor[i].workbookPageQuestionnum +
              this.workbookPageInfoListRefactor[i]
                .workbookPageQuestionArticlenum ===
            0
          ) {
            this.pageIndex--
          } else {
            break
          }
        }
      }
      if (this.count == 0 && flag) {
        this.type = 3
      }
      this.workbookPageInfoListRefactor.forEach((item, index) => {
        if (index === this.pageIndex) {
          this.pageNumIndex = item.workbookPage
        }
      })
      if (this.currentWorkbookChapterParentCode !== '') {
        this.isSelectAll(this.currentWorkbookChapterParentCode)
      } else {
        this.isSelectAll(this.currentWorkbookChapterChildCode)
      }
    },
    nextBtn() {
      this.pageIndex++
      for (
        var i = this.pageIndex;
        i < this.workbookPageInfoListRefactor.length;
        i++
      ) {
        if (
          this.workbookPageInfoListRefactor[i].workbookPageQuestionnum +
            this.workbookPageInfoListRefactor[i]
              .workbookPageQuestionArticlenum ===
          0
        ) {
          this.pageIndex += 1
        } else {
          break
        }
      }
      if (this.pageIndex > this.workbookPageInfoListRefactor.length - 1) {
        this.fullscreen = false //全屏展示的控制无限循环
      } else {
        this.fullscreen = true //全屏展示的控制无限循环
      }
      if (this.pageIndex >= this.workbookPageInfoListRefactor.length - 1) {
        this.pageIndex = this.workbookPageInfoListRefactor.length - 1
      }
      this.workbookPageInfoListRefactor.forEach((item, index) => {
        if (index === this.pageIndex) {
          this.pageNumIndex = item.workbookPage
        }
      })
      if (this.pageIndex >= 15 && this.count < this.pageLength - 1) {
        //this.fullscreen = true
        this.count++
        this.pageIndex = 0
      }
      this.workbookPageInfoListRefactor = this.group(
        this.workbookPageInfoList,
        16
      )[this.count]

      if (this.currentWorkbookChapterParentCode !== '') {
        this.isSelectAll(this.currentWorkbookChapterParentCode)
      } else {
        this.isSelectAll(this.currentWorkbookChapterChildCode)
      }
    },
    selectPage(num, t, p) {
      this.workbookPageQuestionnum = num
      this.pageNumIndex = p
      if (num === 0) {
        this.$message.warning('当前页码下没有题目')
        return
      } else {
        this.workbookPageQuestionnumLists = []
        this.pageIndex = t
        if (this.currentWorkbookChapterParentCode !== '') {
          this.isSelectAll(this.currentWorkbookChapterParentCode)
        } else {
          this.isSelectAll(this.currentWorkbookChapterChildCode)
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
            this.$store
              .dispatch('publish/workbookPageQuestion', this.info)
              .then(data => {
                this.workbookPageQuestionnumLists = data.infos
              })
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
            this.showDialog = false
            this.$message.success('收藏成功')
            this.$store
              .dispatch('publish/workbookPageQuestion', this.info)
              .then(data => {
                this.workbookPageQuestionnumLists = data.infos
              })
          }
          this.addStoreList = data.infos
        })
    },
    fullScreen(id) {
      this.fullscreen = true
      this.type = ''
      this.showFullScreen = true
      this.fullId = id
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
    closeFullScreen(val) {
      this.showFullScreen = val
    },
    //转换成树结构
    workBookListTree(list) {
      if (this.workbookType == 1) {
        let arr = []
        list.forEach(item => {
          if (item.workbookChapterLevel === 2) {
            this.workbookChaptersListTree.push(item)
          }
          if (item.workbookChapterLevel === 3) {
            arr.push(item)
          }
        })

        this.workbookChaptersListTree.forEach((item, index) => {
          this.workbookChaptersListTree[index] = { ...item, childrens: [] }
          arr.forEach(items => {
            if (
              this.workbookChaptersListTree[index].workbookChapterId ===
              items.workbookChapterParentid
            ) {
              this.workbookChaptersListTree[index].childrens.push(items)
            }
          })
        })

        this.currentWorkbookChapterParentCode = this.workbookChaptersListTree[0].workbookChapterCode
        this.WorkbookChapterCodeList.push(this.currentWorkbookChapterParentCode)
        this.workbookPageInfoList = this.workbookChaptersListTree[0].workbookPageInfoList
        for (let j = 0; j < this.workbookPageInfoList.length; j++) {
          if (
            this.workbookPageInfoList[j].workbookPageQuestionnum +
              this.workbookPageInfoList[j].workbookPageQuestionArticlenum !=
            0
          ) {
            this.pageNum.push(this.workbookPageInfoList[j].workbookPage)
            this.pageNumIndex = this.workbookPageInfoList[j].workbookPage
            this.pageIndex = j
            break
          } else {
            this.pageNumIndex = this.workbookPageInfoList[j].workbookPage
          }
        }
        this.isSelectAll(this.currentWorkbookChapterParentCode)
        //页码重构成功 默认显示第一条
        this.workbookPageInfoListRefactor = this.group(
          this.workbookPageInfoList,
          16
        )[this.count]
      }

      if (this.workbookType == 2) {
        let arr = []
        list.forEach(item => {
          if (item.workbookChapterLevel === 2) {
            this.workbookChaptersListTree.push(item)
          }
          if (item.workbookChapterLevel === 3) {
            arr.push(item)
          }
        })

        this.workbookChaptersListTree.forEach((item, index) => {
          this.workbookChaptersListTree[index] = { ...item, childrens: [] }
          arr.forEach(items => {
            if (
              this.workbookChaptersListTree[index].workbookChapterId ===
              items.workbookChapterParentid
            ) {
              this.workbookChaptersListTree[index].childrens.push(items)
            }
          })
        })

        this.currentWorkbookChapterParentCode = this.workbookChaptersListTree[0].workbookChapterCode
        this.WorkbookChapterCodeList.push(this.currentWorkbookChapterParentCode)
        this.workbookPageInfoList = this.workbookChaptersListTree[0].workbookPageInfoList

        this.isSelectAll(this.currentWorkbookChapterParentCode)
      }
      return this.workbookChaptersListTree
    },
    group(array, subGroupLength) {
      this.pageLength = Math.ceil(parseInt(array.length) / 16)
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    },
    isSelectAll(id) {
      this.addStoreIdList = []
      if (this.workbookType == 1) {
        this.info = {
          workBookId: this.workbookId,
          workbookChapterCode: id,
          workbookChapterPage: this.pageNumIndex
        }
      } else {
        this.info = {
          workBookId: this.workbookId,
          workbookChapterCode: id
        }
      }

      this.$store
        .dispatch('publish/workbookPageQuestion', this.info)
        .then(data => {
          this.workbookPageQuestionnumLists = data.infos
          this.workbookPageQuestionnumLists.forEach(items => {
            if (items.teacherQuestionCollectonId != undefined) {
              this.addStoreIdList.push(items.teacherQuestionCollectonId)
            }
          })
          this.$nextTick().then(() => {
            var that = this
            if (this.workbookPageQuestionnumLists.length > 0) {
              $('.work-type-conent-right .el-div img').click(function() {
                that.picflag = true
                that.imgArr = []
                that.imgArr.push($(this).attr('src'))
              })
            }
          })
        })
    },
    getChapter() {
      this.$http
        .get('/api/workbook/chapter', {
          params: {
            workbookId: this.workbookId,
            workbookType: this.workbookType
          }
        })
        .then(({ data }) => {
          this.workbookChaptersList = data.infos
          this.workBookListTree(this.workbookChaptersList)
          this.$nextTick().then(() => {
            if (document.getElementsByClassName('hover-li').length == 0) {
              $('.scroll').scrollTop(
                document.getElementsByClassName('hover-div-0')[0].offsetTop -
                  300
              )
            } else {
              $('.scroll').scrollTop(
                document.getElementsByClassName('hover-li')[0].offsetTop - 300
              )
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.work-type-conent-1 {
  .tag-list-1 {
    @include wh(100%, 30px);
    @include fj();
    border-top: 1px solid #ddd;
    align-items: center;
    margin-top: 10px;
    > p:nth-child(1) {
      @include fj(flex-start);
      align-items: center;
      @include wh(auto, 30px);
      > span {
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

    p:nth-child(2) {
      margin-right: 10px;
      padding-left: 25px;
      cursor: pointer;
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
    min-height: 120px;
  }
  .read-list-card > div.ee {
    width: 15%;
    height: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    border-left: 1px solid #ebebeb;

    p {
      @include wh(85%, auto);
      text-align: center;
      background: url(../../../../assets/img/publish/fulls.png) no-repeat center
        left;
      background-size: 20% 100%;
      span {
        font-size: 14px;
        color: #676767;
      }
    }
  }
  .card-body {
    display: flex;
    padding: 5px 0px;
    min-height: 40px;
  }
  .body-main {
    cursor: pointer;
    flex: 1;
    max-height: 55px;
    min-height: 70px;
    overflow: hidden;
    border: 0 !important;
    padding: 10px 20px;
    font-size: 14px;
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
.work-type-conent-1 {
  scrollbar-width: none;
  img {
    width: auto;
  }
  margin: 21px auto 0;
  @include wh(100%, 91%);
  background: #fff;
  @include fj();
  .work-type-conent-left {
    @include wh(288px, 100%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 4px 0px 0px 4px;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    input::-webkit-input-placeholder {
      color: #596878 !important;
      font-size: 13px !important;
    }
    > div:nth-of-type(1) {
      @include wh(100%, auto);
      margin: 0 auto;
      background: rgba(57, 158, 255, 1);
      border-radius: 4px 0px 0px 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 67px;
    }
    > div:nth-of-type(2) {
      margin-top: 10px;
      flex: auto;
      overflow: scroll;
      .menu {
        height: auto;
        padding-bottom: 30px;
      }
      .menu li {
        @include wh(88%, auto);
        margin: 10px auto 0;
        > div {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          @include wh(100%, 40px);
          text-align: left;
          line-height: 40px;
          padding-left: 18px;
          @include sc(14px, #4e5f71);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(185, 185, 185, 1);
          border-radius: 8px;
          cursor: pointer;
          @include fj();
          align-items: center;
          i {
            width: 90%;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          img {
            @include wh(12px, 8px);
            margin-right: 5px;
          }
          img.hover-img {
            transform: rotate(-180deg);
          }
        }
        > div.hover-div-0 {
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
          @include wh(92%, 40px);
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
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        li.hover-li {
          background: rgba(16, 89, 255, 1);
          border: 1px solid rgba(16, 89, 255, 1);
          color: #fff;
        }
      }
    }
  }
  .work-type-conent-right {
    @include wh(912px, 100%);
    border: 1px solid rgba(233, 233, 233, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 0px 4px 4px 0px;
    display: flex;
    flex-direction: column;
    padding-bottom: 5px;
    > div.page {
      @include wh(100%, auto);
      @include fj();
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid rgba(244, 244, 244, 1);
      flex: 0 0 66px;
      span {
        @include wh(34px, 34px);
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(214, 225, 229, 1);
        cursor: pointer;
      }
      span:nth-of-type(1) {
        border-radius: 4px 0px 0px 4px;
        background: url(../../../../assets/img/publish/ic-left.png) no-repeat
          center;
        background-size: 25% 40%;
      }
      span:nth-of-type(2) {
        border-radius: 0px 4px 4px 0px;
        background: url(../../../../assets/img/publish/ic-right.png) no-repeat
          center;
        background-size: 25% 40%;
      }
      ul {
        @include wh(90%, 66px);
        overflow: hidden;
        li {
          @include wh(34px, 34px);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(214, 225, 229, 1);
          margin-left: 14px;
          float: left;
          margin-top: 16px;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
        }
        li.hover-li-0 {
          border: 1px solid #1059ff;
          color: #1059ff;
        }
        li.hover-li-1 {
          border: 1px solid rgba(214, 225, 229, 1);
          color: #838383;
        }
        li.hover-li-2 {
          background: rgba(16, 89, 255, 1);
          border: 1px solid rgba(16, 89, 255, 1);
          color: #fff;
        }
      }
    }
    > div.question {
      overflow: scroll;
      flex: auto;
      > div:nth-of-type(1) {
        @include wh(100%, 0px);
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
        padding-bottom: 20px;
        > div {
          > div.el-div {
            width: 96%;
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
                  border-bottom: 1px solid #ddd;
                  padding: 10px 20px;
                  position: relative;
                  > p {
                    @include sc(14px, #3d4d65);
                    padding: 0 0 20px 0;
                    word-wrap: break-word;
                    height: 45px;
                    overflow: hidden;
                    width: 94%;
                  }
                  > p.hover-pp {
                    height: auto;
                    overflow: auto;
                  }
                  > .pp {
                    height: 0;
                    overflow: hidden;
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
                    i:nth-child(1) {
                      @include sc(12px, #909090);
                    }
                    i:nth-child(2) {
                      @include sc(12px, #909090);
                      margin-left: 12px;
                    }
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
</style>
