<template>
  <div class="work-type-conent">
    <div class="work-type-conent-left">
      <div>
        <el-select
          v-model="workBookName"
          placeholder="请选择"
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
      <div class="scroll" v-if="workbookType == 1">
        <ul class="menu">
          <template>
            <li v-for="(item, index) in workbookChaptersListTree" :key="index">
              <div
                @click="selectUnits(item.workbookChapterCode)"
                :class="
                  publishPageWorkHomeProgressP == item.textBookChapterCode &&
                  currentWorkbookChapterCode == item.workbookChapterCode
                    ? 'hover-div-0'
                    : currentWorkbookChapterChildCode.indexOf(
                        item.workbookChapterCode
                      ) != -1
                    ? 'hover-div-1'
                    : currentWorkbookChapterParentCode ===
                      item.workbookChapterCode
                    ? 'hover-div-0'
                    : publishPageWorkHomeProgressC != '' &&
                      publishPageWorkHomeProgressC.indexOf(
                        item.textBookChapterCode
                      ) != -1 &&
                      item.textBookChapterCode.length >= 7
                    ? 'hover-div-1'
                    : ''
                "
              >
                <i>{{ item.workbookChapterName }}</i>
                <img
                  src="../../../../assets/img/publish/xxjt.png"
                  alt=""
                  :class="
                    publishPageWorkHomeProgressP == item.textBookChapterCode ||
                    WorkbookChapterCodeList.indexOf(item.workbookChapterCode) !=
                      -1 ||
                    (publishPageWorkHomeProgressC != '' &&
                      publishPageWorkHomeProgressC.indexOf(
                        item.textBookChapterCode
                      ) != -1 &&
                      item.textBookChapterCode.length >= 7)
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
                      publishPageWorkHomeProgressC ==
                        items.textBookChapterCode &&
                      currentWorkbookChapterCode == items.workbookChapterCode
                        ? 'hover-li'
                        : currentWorkbookChapterChildCode ===
                          items.workbookChapterCode
                        ? 'hover-li'
                        : ''
                    "
                    v-if="
                      publishPageWorkHomeProgressP ==
                        item.textBookChapterCode ||
                        WorkbookChapterCodeList.indexOf(
                          item.workbookChapterCode
                        ) != -1 ||
                        (publishPageWorkHomeProgressC != '' &&
                          publishPageWorkHomeProgressC.indexOf(
                            item.textBookChapterCode
                          ) != -1 &&
                          item.textBookChapterCode.length >= 7)
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
      <div class="scroll" v-else>
        <ul class="menu">
          <template>
            <li v-for="(item, index) in workbookChaptersListTree" :key="index">
              <div
                @click="selectUnits(item.textBookChapterCode)"
                :class="
                  currentWorkbookChapterChildCode == '' &&
                  currentWorkbookChapterParentCode == item.workbookChapterCode
                    ? 'hover-div-0'
                    : currentWorkbookChapterChildCode.indexOf(
                        item.workbookChapterCode
                      ) != -1
                    ? 'hover-div-1'
                    : currentWorkbookChapterCode != item.workbookChapterCode
                    ? ''
                    : 'hover-div-0'
                "
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
                      currentWorkbookChapterChildCode ===
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
      <div
        v-if="
          workbookPageQuestionnumList.length != 0 ||
            abilityDimensinFiltration.length != 0
        "
        class="question"
      >
        <div v-if="workbookType == 1">
          <span>第{{ pageNumIndex }}页</span>
          <span>本页共{{ workbookPageQuestionnumList.length }}题</span>
          <!-- <div class="select-all" v-if="isSomeChecked" @click="someToAll">
            <span></span><span>本页全选</span>
          </div> -->
          <el-checkbox v-model="isAllChecked" @change="selectAll">{{
            isAllChecked ? '取消全选' : '本页全选'
          }}</el-checkbox>
        </div>
        <div v-if="workbookType == 2">
          <span>本页共{{ abilityDimensinFiltration.length }}题</span>
          <!-- <div class="select-all" v-if="isSomeChecked" @click="someToAll">
            <span></span><span>本页全选</span>
          </div> -->
          <el-checkbox v-model="isAllChecked" @change="selectAll">{{
            isAllChecked ? '取消全选' : '本页全选'
          }}</el-checkbox>
        </div>
        <div class="question-scroll">
          <template v-if="workbookType === 1">
            <div
              v-for="(item, index) in workbookPageQuestionnumList"
              :key="index"
            >
              <div v-if="item.questionTypeCode != 8" class="el-div">
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
                        style="width:94%"
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
                      <!-- <span v-if="item.questionDegreedifficulty == 0.25"
                    ><i>难易度</i><i>简单</i></span
                  >
                  <span v-if="item.questionDegreedifficulty == 0.5"
                    ><i>难易度</i><i>中等</i></span
                  >
                  <span v-if="item.questionDegreedifficulty == 0.75"
                    ><i>难易度</i><i>困难</i></span
                  > -->
                      <!-- <span v-if="item.questionDegreedifficulty == undefined"
                    ><i>难易度</i><i>--</i></span
                  > -->
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
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <read-list-card
              v-for="item in abilityDimensinFiltration"
              :datas="item"
              :selected="workListById"
              :key="item.questionId"
              @look="lookOriginal"
              @on-add-work="addWorks"
              @on-add-favorites="addStores"
            >
            </read-list-card>
          </template>
        </div>
      </div>
      <div
        class="null"
        v-if="
          (workbookPageInfoList.length == 0 ||
            workbookPageQuestionnumList.length == 0) &&
            workbookType == 1
        "
      >
        <img src="../../../../assets/img/publish/nulldata.png" alt="" />
        <span>当前练习册中暂无数据</span>
      </div>
      <div
        class="null"
        v-if="
          (abilityDimensinFiltration.length == 0 ||
            abilityDimensinFiltrations.length == 0) &&
            workbookType == 2
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
import imageView from 'vue-imageview'
import $ from 'jquery'
import ClassifyDialog from './ClassifyDialog.vue'
import AbilityScreening from '../../../../components/AbilityScreening'
import ReadListCard from '../../../../components/ReadListCard'
import LookOriginal from '../../../../components/LookOriginal'
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
      workbookPageQuestionnumList: [], //题目数据
      tizuWorkbookPageQuestionnumList: [], //题组题目数据
      addWorkbookPageQuestionnumList: [],
      addWorkIdList: [], //添加作业id集合
      addStoreIdList: [], //添加收藏的id集合
      answerIdList: [],
      workbookPageQuestionnum: '',
      isAllChecked: false, // 正在进行中的数据是否被选中
      isSomeChecked: false, //半选状态
      showAnswer: false,
      showDialog: false,
      WorkbookChapterCodeList: [], //unit code集合
      showChildWorkbookChapterParentCode: '', //控制子集展开收起的code 码
      workbookPageInfoList: '', //页码数据
      workbookPageInfoListRefactor: [], //页码数据重构
      currentWorkbookChapterParentCode: '',
      currentWorkbookChapterChildCode: '',
      currentWorkbookChapterCode: '',
      workbookIndexParent: 0,
      workbookId: '', //练习册id
      currentWorkBookName: null,
      workbookChaptersList: [],
      workbookChaptersAllList: [],
      workbookChaptersListTree: [],
      publishPageWorkHomeProgress: '',
      publishPageWorkHomeProgressC: '',
      publishPageWorkHomeProgressP: '',
      p_flag: false,
      arrAll: [],
      flag: true,
      workBookTypeValue: '全部', //阅读
      abilityDimensionList: [], //阅读维度刷选
      workbookType: '' //练习册类型
      //abilityDimensinFiltrations: []
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

    this.$store.dispatch('publish/publishPageWorkHomeList').then(data => {
      this.workbookChaptersAllList = data.data.infos.workbookList //接收全部数据
      this.abilityDimensionList = data.data.infos.abilityDimensionList
      if (
        this.workbookId != undefined &&
        this.workbookId != null &&
        this.workbookId != ''
      ) {
        this.workbookChaptersAllList.forEach(item => {
          if (this.workbookId == item.workbookId) {
            this.workBookName = item.workbookName
            this.workbookType = item.workbookType
            //this.workbookChaptersList = item.workbookChapters
          } else {
            //this.workbookChaptersList = data.data.infos[0].workbookChapters
            this.workbookId = this.workbookChaptersAllList[0].workbookId
            this.workBookName = this.workbookChaptersAllList[0].workbookName
            this.workbookType = this.workbookChaptersAllList[0].workbookType
            localStorage.setItem(
              'workbookId',
              JSON.stringify(this.workbookChaptersAllList[0].workbookId)
            )
          }
        })
      } else {
        //this.workbookChaptersList = data.data.infos[0].workbookChapters //接收第一组数据
        this.workbookId = this.workbookChaptersAllList[0].workbookId
        this.workBookName = this.workbookChaptersAllList[0].workbookName
        this.workbookType = this.workbookChaptersAllList[0].workbookType
        localStorage.setItem(
          'workbookId',
          JSON.stringify(this.workbookChaptersAllList[0].workbookId)
        )
      }
      if (data.result != undefined) {
        if (data.result.infos != null) {
          this.publishPageWorkHomeProgress =
            data.result.infos.textbookChapterCode
        }
      }
      this.getChapter() //获取练习册章节
    })
  },
  computed: {
    abilityDimensinFiltrations: {
      get: function() {
        return this.$store.state.work.abilityDimensinFiltrations
      },
      set: function(v) {
        this.$store.commit('work/ABILITS', v)
      }
    },
    abilityDimensinFiltration() {
      if (this.workBookTypeValue === '全部') {
        return this.abilityDimensinFiltrations
      } else {
        //console.log(this.workbookArticleList)
        let value = this.workBookTypeValue.split(',')
        var arr = this.abilityDimensinFiltrations.filter(item => {
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
    },
    workListById() {
      return this.$store.getters['work/readWorkListById']
    },
    addWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.workAllList
      },
      set: function(v) {
        this.$store.commit('publish/WORKALLLIST', v)
      }
    }
  },
  mounted() {},
  watch: {
    addWorkbookPageQuestionnumAllList(val) {
      this.addWorkIdList = []
      this.$store.commit('work/SETREADWORKLISTBYID', [])
      var workListById = this.workListById
      if (val.length == 0) {
        this.isAllChecked = false
      }
      val.forEach(item => {
        if (this.workbookType == 1) {
          this.workbookPageQuestionnumList.forEach(items => {
            if (item.questionId === items.questionId) {
              this.addWorkIdList.push(item.questionId)
            }
            if (
              this.addWorkIdList.length == 0 ||
              this.addWorkIdList.length <
                this.workbookPageQuestionnumList.length
            ) {
              this.isAllChecked = false
            } else {
              this.isAllChecked = true
            }
          })
        } else {
          this.abilityDimensinFiltration.forEach(items => {
            if (item.questionId === items.questionId) {
              workListById.push(item.questionId)
            }
            if (
              workListById.length == 0 ||
              workListById.length < this.abilityDimensinFiltration.length
            ) {
              this.isAllChecked = false
            } else {
              this.isAllChecked = true
            }
            this.$store.commit('work/SETREADWORKLISTBYID', workListById)
          })
        }
      })
    }
  },
  components: {
    ClassifyDialog,
    imageView,
    AbilityScreening,
    ReadListCard,
    LookOriginal
  },
  methods: {
    lookOriginal(obj) {
      this.$refs['original'].id = obj.questionId
      this.$refs['original'].visible = true
    },
    changeAbilityScreening(str) {
      // let arr = this.abilityDimensinFiltrations.filter(item => {
      //   return item.abilityDimensions == str
      // })
      // this.abilityDimensinFiltration = arr
    },
    hideImageView() {
      this.picflag = false
    },
    getId(id) {
      this.collectonGroupId = id
    },
    workBookNameChange(val) {
      this.publishPageWorkHomeProgressC = ''
      this.publishPageWorkHomeProgressP = ''
      this.currentWorkbookChapterParentCode = ''
      this.currentWorkbookChapterChildCode = ''
      this.currentWorkbookChapterCode = ''
      this.workbookPageQuestionnumList = []
      this.addWorkIdList = []
      this.addWorkbookPageQuestionnumList = []
      this.WorkbookChapterCodeList = []
      this.workbookChaptersListTree = []
      this.workbookPageInfoListRefactor = []
      this.count = 0
      this.p_flag = false
      this.$store.dispatch('publish/publishPageWorkHomeProgress').then(data => {
        if (data) {
          this.publishPageWorkHomeProgress = data.infos.textbookChapterCode
        }
      })
      this.workbookChaptersAllList.forEach(item => {
        if (val === item.workbookName) {
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
      this.publishPageWorkHomeProgressC = ''
      this.currentWorkbookChapterParentCode = code
      this.currentWorkbookChapterCode = code
      this.publishPageWorkHomeProgress = ''
      this.currentWorkbookChapterChildCode = ''
      this.publishPageWorkHomeProgressP = ''
      this.workbookPageQuestionnumList = []
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
      this.isSelectAll(this.addWorkbookPageQuestionnumAllList)
    },
    selectSesstion(code) {
      this.currentWorkbookChapterChildCode = code
      this.currentWorkbookChapterCode = code
      this.publishPageWorkHomeProgress = ''
      this.currentWorkbookChapterParentCode = ''
      this.workbookPageQuestionnumList = []
      this.count = 0
      if (this.workbookType == 1) {
        this.workbookChaptersList.forEach(item => {
          if (code === item.workbookChapterCode) {
            this.workbookPageInfoList = item.workbookPageInfoList
            this.workbookPageInfoListRefactor = this.group(
              this.workbookPageInfoList,
              16
            )[this.count]
          }
          for (let j = 0; j < this.workbookPageInfoList.length; j++) {
            if (this.workbookPageInfoList[j].workbookPageQuestionnum != 0) {
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
      }
      this.isSelectAll(this.addWorkbookPageQuestionnumAllList)
    },
    prveBtn() {
      if (this.count == 0) {
        for (let i = 0; i < this.workbookPageInfoListRefactor.length - 1; i++) {
          if (
            this.workbookPageInfoListRefactor[i].workbookPageQuestionnum != 0
          ) {
            var index = i
            if (this.pageIndex === index) {
              return false
            }
            break
          }
        }
      }
      this.pageIndex--
      if (this.pageIndex < 0) {
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
              this.workbookPageInfoListRefactor[i].workbookPageQuestionnum != 0
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
            this.workbookPageInfoListRefactor[i].workbookPageQuestionnum === 0
          ) {
            this.pageIndex--
          } else {
            break
          }
        }
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
          this.workbookPageInfoListRefactor[i].workbookPageQuestionnum === 0
        ) {
          this.pageIndex += 1
        } else {
          break
        }
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
        this.count++
        this.pageIndex = 0
      }

      this.workbookPageInfoListRefactor = this.group(
        this.workbookPageInfoList,
        16
      )[this.count]

      this.isSelectAll(this.addWorkbookPageQuestionnumAllList)
    },
    selectPage(num, t, p) {
      this.workbookPageQuestionnum = num
      this.pageNumIndex = p
      if (num === 0) {
        this.$message.warning('当前页码下没有题目')
        return
      } else {
        this.workbookPageQuestionnumList = []
        this.pageIndex = t
        this.isSelectAll(this.addWorkbookPageQuestionnumAllList)
      }
    },
    selectAll(val) {
      if (this.workbookType == 1) {
        this.isAllChecked = val
        this.addWorkIdList = []
        this.addWorkbookPageQuestionnumList = []
        this.workbookPageQuestionnumList.forEach(item => {
          this.addWorkIdList.push(item.questionId)
          this.addWorkbookPageQuestionnumList.push(item)
        })
        if (this.addWorkbookPageQuestionnumAllList.length === 0) {
          this.addWorkbookPageQuestionnumAllList = this.workbookPageQuestionnumList.slice()
        } else {
          if (this.isAllChecked) {
            this.arrAll = [...this.addWorkbookPageQuestionnumAllList]
            this.addWorkbookPageQuestionnumAllList.forEach(item => {
              if (this.addWorkIdList.includes(item.questionId)) {
                this.arrAll.forEach((items, index) => {
                  if (items.questionId === item.questionId) {
                    this.arrAll.splice(index, 1)
                  }
                })
              }
            })
            this.addWorkbookPageQuestionnumAllList = [
              ...this.arrAll,
              ...this.workbookPageQuestionnumList
            ]
          } else {
            let arr = [...this.addWorkbookPageQuestionnumAllList]
            this.addWorkbookPageQuestionnumAllList.forEach(item => {
              if (this.addWorkIdList.includes(item.questionId)) {
                arr.forEach((items, index) => {
                  if (items.questionId === item.questionId) {
                    arr.splice(index, 1)
                  }
                })
              }
            })
            this.addWorkbookPageQuestionnumAllList = arr
            this.addWorkIdList = []
          }
        }

        this.$store.commit(
          'publish/WORKALLLIST',
          this.addWorkbookPageQuestionnumAllList
        )
        localStorage.setItem(
          'addWorkbookPageQuestionnumAllList',
          JSON.stringify(this.addWorkbookPageQuestionnumAllList)
        )
        this.$emit(
          'toParentEventOflength',
          this.addWorkbookPageQuestionnumAllList.length
        )
      }
      if (this.workbookType == 2) {
        this.isAllChecked = val
        this.addWorkIdList = []
        this.addWorkbookPageQuestionnumList = []
        this.abilityDimensinFiltration.forEach(item => {
          this.addWorkIdList.push(item.questionId)
          this.addWorkbookPageQuestionnumList.push(item)
        })
        if (this.addWorkbookPageQuestionnumAllList.length === 0) {
          this.addWorkbookPageQuestionnumAllList = this.abilityDimensinFiltration.slice()
        } else {
          if (this.isAllChecked) {
            this.arrAll = [...this.addWorkbookPageQuestionnumAllList]
            this.addWorkbookPageQuestionnumAllList.forEach(item => {
              if (this.addWorkIdList.includes(item.questionId)) {
                this.arrAll.forEach((items, index) => {
                  if (items.questionId === item.questionId) {
                    this.arrAll.splice(index, 1)
                  }
                })
              }
            })
            this.addWorkbookPageQuestionnumAllList = [
              ...this.arrAll,
              ...this.abilityDimensinFiltration
            ]
          } else {
            let arr = [...this.addWorkbookPageQuestionnumAllList]
            this.addWorkbookPageQuestionnumAllList.forEach(item => {
              if (this.addWorkIdList.includes(item.questionId)) {
                arr.forEach((items, index) => {
                  if (items.questionId === item.questionId) {
                    arr.splice(index, 1)
                  }
                })
              }
            })
            this.addWorkbookPageQuestionnumAllList = arr
            this.addWorkIdList = []
          }
        }

        this.$store.commit(
          'publish/WORKALLLIST',
          this.addWorkbookPageQuestionnumAllList
        )
        localStorage.setItem(
          'addWorkbookPageQuestionnumAllList',
          JSON.stringify(this.addWorkbookPageQuestionnumAllList)
        )
        this.$emit(
          'toParentEventOflength',
          this.addWorkbookPageQuestionnumAllList.length
        )
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
                this.workbookPageQuestionnumList = data.infos
              })
          }
        })
      } else {
        this.showDialog = true
      }
    },
    addStores(obj) {
      this.CollectionInfos = obj
      if (obj.teacherQuestionCollectonId) {
        this.showDialog = false
        this.$store
          .dispatch('publish/cancelStore', obj.teacherQuestionCollectonId)
          .then(data => {
            if (data.flag === 1) {
              this.$message.success('取消收藏成功')
              this.$store
                .dispatch('publish/workbookPageQuestion', this.info)
                .then(data => {
                  this.abilityDimensinFiltrations = data.infos
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
            this.$message.success('收藏成功')
            this.showDialog = false
            this.$store
              .dispatch('publish/workbookPageQuestion', this.info)
              .then(data => {
                if (this.workbookType == 1) {
                  this.workbookPageQuestionnumList = data.infos
                } else {
                  this.abilityDimensinFiltrations = data.infos
                }
              })
          }
          this.addStoreList = data.infos
        })
    },
    addWork(id) {
      if (this.addWorkIdList.includes(id)) {
        for (var i = 0; i < this.addWorkIdList.length; i++) {
          if (this.addWorkIdList[i] === id) {
            this.addWorkIdList.splice(i, 1)
            //this.addWorkbookPageQuestionnumList.splice(i, 1)
            if (this.addWorkIdList.length === 0) {
              this.isSomeChecked = false
            }
          }
        }
        this.addWorkbookPageQuestionnumAllList.forEach((item, index) => {
          if (item.questionId === id) {
            this.addWorkbookPageQuestionnumAllList.splice(index, 1)
          }
        })
      } else {
        this.addWorkIdList.push(id)
        if (this.workbookType == 1) {
          this.workbookPageQuestionnumList.forEach(item => {
            if (id === item.questionId) {
              //this.addWorkbookPageQuestionnumList.push(item)
              this.addWorkbookPageQuestionnumAllList.push(item) //全部数据
            }
          })
        } else {
          this.abilityDimensinFiltration.forEach(item => {
            if (id === item.questionId) {
              //this.addWorkbookPageQuestionnumList.push(item)
              this.addWorkbookPageQuestionnumAllList.push(item) //全部数据
            }
          })
        }
      }

      localStorage.setItem('addWorkIdList', JSON.stringify(this.addWorkIdList))
      localStorage.setItem(
        'addWorkbookPageQuestionnumAllList',
        JSON.stringify(this.addWorkbookPageQuestionnumAllList)
      )
      if (this.workbookType == 1) {
        if (
          this.addWorkIdList.length === this.workbookPageQuestionnumList.length
        ) {
          this.isAllChecked = true
          this.isSomeChecked = false
        } else {
          this.isAllChecked = false
          if (this.addWorkIdList.length > 0) {
            this.isSomeChecked = true
          }
        }
      } else {
        if (
          this.addWorkIdList.length === this.abilityDimensinFiltration.length
        ) {
          this.isAllChecked = true
          this.isSomeChecked = false
        } else {
          this.isAllChecked = false
          if (this.addWorkIdList.length > 0) {
            this.isSomeChecked = true
          }
        }
      }
      // this.$store.commit('work/SETREADADDLISTBYID', this.addWorkIdList)
      // localStorage.setItem(
      //   'readWorkListByIds',
      //   JSON.stringify(this.addWorkIdList)
      // )
      this.$emit(
        'toParentEventOflength',
        this.addWorkbookPageQuestionnumAllList.length
      )
    },
    addWorks(id) {
      let workListById = this.workListById
      if (workListById.includes(id)) {
        for (var i = 0; i < workListById.length; i++) {
          if (workListById[i] === id) {
            workListById.splice(i, 1)
            //this.addWorkbookPageQuestionnumList.splice(i, 1)
            if (workListById.length === 0) {
              this.isSomeChecked = false
            }
          }
        }
        this.addWorkbookPageQuestionnumAllList.forEach((item, index) => {
          if (item.questionId === id) {
            this.addWorkbookPageQuestionnumAllList.splice(index, 1)
          }
        })
      } else {
        workListById.push(id)
        this.abilityDimensinFiltration.forEach(item => {
          if (id === item.questionId) {
            //this.addWorkbookPageQuestionnumList.push(item)
            this.addWorkbookPageQuestionnumAllList.push(item) //全部数据
          }
        })
      }
      this.$store.commit('work/SETREADWORKLISTBYID', workListById)
      localStorage.setItem(
        'addWorkbookPageQuestionnumAllList',
        JSON.stringify(this.addWorkbookPageQuestionnumAllList)
      )

      if (workListById.length === this.abilityDimensinFiltration.length) {
        this.isAllChecked = true
        this.isSomeChecked = false
      } else {
        this.isAllChecked = false
        if (this.addWorkIdList.length > 0) {
          this.isSomeChecked = true
        }
      }
      this.$emit(
        'toParentEventOflength',
        this.addWorkbookPageQuestionnumAllList.length
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

        if (
          this.publishPageWorkHomeProgress === '' ||
          this.publishPageWorkHomeProgress === undefined
        ) {
           
          this.workbookPageInfoList = this.workbookChaptersListTree[0].workbookPageInfoList //接收第一组数据
          for (var j = 0; j < this.workbookPageInfoList.length; j++) {
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
        } else {
          for (var i = 0; i < this.workbookChaptersListTree.length; i++) {
            let str =
              this.workbookChaptersListTree[i].textBookChapterCode.length > 10
                ? this.workbookChaptersListTree[
                    i
                  ].textBookChapterCode.substring(0, 9)
                : this.workbookChaptersListTree[i].textBookChapterCode
            if (this.publishPageWorkHomeProgress === str) {
              this.publishPageWorkHomeProgressP = str
              this.currentWorkbookChapterCode = this.workbookChaptersListTree[
                i
              ].workbookChapterCode
              this.workbookPageInfoList = this.workbookChaptersListTree[
                i
              ].workbookPageInfoList
              for (let j = 0; j < this.workbookPageInfoList.length; j++) {
                if (
                  this.workbookPageInfoList[j].workbookPageQuestionnum +
                    this.workbookPageInfoList[j]
                      .workbookPageQuestionArticlenum !=
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
              this.p_flag = true
              break
            } else {
              for (
                let j = 0;
                j < this.workbookChaptersListTree[i].childrens.length;
                j++
              ) {
                let str1 =
                  this.workbookChaptersListTree[i].childrens[j]
                    .textBookChapterCode.length > 10
                    ? this.workbookChaptersListTree[i].childrens[
                        j
                      ].textBookChapterCode.substring(0, 9)
                    : this.workbookChaptersListTree[i].childrens[j]
                        .textBookChapterCode
                if (this.publishPageWorkHomeProgress === str1) {
                  this.publishPageWorkHomeProgressC = str1
                  this.currentWorkbookChapterCode = this.workbookChaptersListTree[
                    i
                  ].childrens[j].workbookChapterCode
                  this.workbookPageInfoList = this.workbookChaptersListTree[
                    i
                  ].childrens[j].workbookPageInfoList
                  for (let j = 0; j < this.workbookPageInfoList.length; j++) {
                    if (
                      this.workbookPageInfoList[j].workbookPageQuestionnum +
                        this.workbookPageInfoList[j]
                          .workbookPageQuestionArticlenum !=
                      0
                    ) {
                      this.pageNum.push(
                        this.workbookPageInfoList[j].workbookPage
                      )
                      this.pageNumIndex = this.workbookPageInfoList[
                        j
                      ].workbookPage
                      this.pageIndex = j
                      break
                    } else {
                      this.pageNumIndex = this.workbookPageInfoList[
                        j
                      ].workbookPage
                    }
                  }
                  this.p_flag = true
                  break
                }
              }
            }
          }
        }
        if (this.p_flag != true) {
          this.currentWorkbookChapterParentCode = this.workbookChaptersListTree[0].workbookChapterCode
          this.WorkbookChapterCodeList.push(
            this.currentWorkbookChapterParentCode
          )
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
        }
        this.currentWorkbookChapterCode =
          this.currentWorkbookChapterCode == ''
            ? this.currentWorkbookChapterParentCode
            : this.currentWorkbookChapterCode
        this.isSelectAll(this.addWorkbookPageQuestionnumAllList)
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
          if (arr.length != 0) {
            arr.forEach(items => {
              if (
                this.workbookChaptersListTree[index].workbookChapterId ===
                items.workbookChapterParentid
              ) {
                this.workbookChaptersListTree[index].childrens.push(items)
              }
            })
          }
        })
        if (this.workbookChaptersListTree[0].childrens.length != 0) {
          this.currentWorkbookChapterChildCode = this.workbookChaptersListTree[0].childrens[0].workbookChapterCode
        }

        this.currentWorkbookChapterParentCode = this.workbookChaptersListTree[0].workbookChapterCode
        this.WorkbookChapterCodeList.push(this.currentWorkbookChapterParentCode)

        this.currentWorkbookChapterCode =
          this.currentWorkbookChapterChildCode != ''
            ? this.currentWorkbookChapterChildCode
            : this.currentWorkbookChapterParentCode

        this.isSelectAll(this.addWorkbookPageQuestionnumAllList)
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
    isSelectAll(list) {
      //var self = this
      this.addStoreIdList = []
      this.addWorkIdList = []
      if (this.workbookType == 1) {
        this.info = {
          workBookId: this.workbookId,
          workbookChapterCode: this.currentWorkbookChapterCode,
          workbookChapterPage: this.pageNumIndex
        }
      } else {
        this.info = {
          workBookId: this.workbookId,
          workbookChapterCode: this.currentWorkbookChapterCode
        }
      }

      this.$store
        .dispatch('publish/workbookPageQuestion', this.info)
        .then(data => {
          if (this.workbookType == 1) {
            this.workbookPageQuestionnumList = data.infos
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
                this.addWorkIdList.length <
                  this.workbookPageQuestionnumList.length
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

            this.$nextTick().then(() => {
              var that = this
              // const ViewerDom = document.getElementById('index')
              // this.Viewer = new Viewer(ViewerDom, {
              //   // 相关配置项,详情见下面
              // })
              if (this.workbookPageQuestionnumList.length > 0) {
                $('.question-scroll img').click(function() {
                  that.picflag = true
                  that.imgArr = []
                  that.imgArr.push($(this).attr('src'))
                })
              }
            })
          } else {
            this.abilityDimensinFiltrations = data.infos
            list.forEach(item => {
              this.abilityDimensinFiltrations.forEach(items => {
                if (items.teacherQuestionCollectonId != undefined) {
                  this.addStoreIdList.push(items.teacherQuestionCollectonId)
                }

                if (item.questionId === items.questionId) {
                  this.addWorkIdList.push(item.questionId)
                }
              })
            })

            if (
              this.abilityDimensinFiltrations.length != 0 &&
              this.addWorkIdList != 0
            ) {
              if (
                this.addWorkIdList.length ===
                this.abilityDimensinFiltrations.length
              ) {
                this.isAllChecked = true
              } else if (
                this.addWorkIdList.length > 0 &&
                this.addWorkIdList.length <
                  this.abilityDimensinFiltrations.length
              ) {
                this.isAllChecked = false
                this.isSomeChecked = true
              }
            } else if (
              this.abilityDimensinFiltrations.length != 0 &&
              this.addWorkIdList == 0
            ) {
              this.isAllChecked = false
              this.isSomeChecked = false
            } else {
              this.isAllChecked = false
              this.isSomeChecked = false
            }
            this.$nextTick().then(() => {
              var that = this
              // const ViewerDom = document.getElementById('index')
              // this.Viewer = new Viewer(ViewerDom, {
              //   // 相关配置项,详情见下面
              // })
              if (this.abilityDimensinFiltrations.length > 0) {
                $('.question-scroll .el-div img').click(function() {
                  that.picflag = true
                  that.imgArr = []
                  that.imgArr.push($(this).attr('src'))
                })
              }
            })
          }
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
.work-type-conent {
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
      background: url(../../../../assets/img/publish/addwork.png) no-repeat 10%
        center rgba(86, 172, 255, 1);
      background-size: 15% 50%;
      border: 1px solid rgba(57, 158, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
      border-radius: 15px;
      span {
        @include sc(14px, #fff);
      }
    }

    p.hover-p2 {
      background: url(../../../../assets/img/publish/deletework.png) no-repeat
        12% center #fff;
      background-size: 15% 50%;
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

.work-type-conent {
  img {
    width: auto;
  }
  margin: 21px auto 0;
  @include wh(100%, 90%);
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
      overflow: scroll;
      flex: auto;
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
      // flex: auto;
      height: 90%;
      overflow: scroll;
      > div:nth-of-type(1) {
        @include wh(100%, 50px);
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
        // height: 92%;
        padding-bottom: 100px;
        > div {
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
                  padding: 10px 20px 10px 20px;
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
                    overflow: auto;
                    height: 0;
                    overflow: hidden;
                    width: 94%;
                    margin-bottom: 0px !important;
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
                border-top: 1px solid #ddd;
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
                  cursor: pointer;
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
                @include wh(90px, 30px);
                @include fj(center);
                align-items: center;
                padding-left: 16px;
                cursor: pointer;
                background: url(../../../../assets/img/publish/addwork.png)
                  no-repeat 10% center rgba(86, 172, 255, 1);
                background-size: 15% 50%;
                border: 1px solid rgba(57, 158, 255, 1);
                box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
                border-radius: 15px;
                span {
                  @include sc(14px, #fff);
                }
              }

              p.hover-p2 {
                background: url(../../../../assets/img/publish/deletework.png)
                  no-repeat 12% center #fff;
                background-size: 15% 50%;
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
