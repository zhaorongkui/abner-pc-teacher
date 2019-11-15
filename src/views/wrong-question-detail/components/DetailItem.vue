<template>
  <div class="menu-item" v-if="item.sectionSubjectQuestionInfo">
    <div class="content">
      <div class="body">
        <div
          class="stem"
          v-html="item.sectionSubjectQuestionInfo.questionStem"
        ></div>
        <!-- 选择题选项 -->
        <div
          v-if="
            item.sectionSubjectQuestionInfo.questionTypeCode === 1 ||
              item.sectionSubjectQuestionInfo.questionTypeCode === 2
          "
        >
          <ChoiceItem
            :questionOptions="item.sectionSubjectQuestionInfo.questionOptions"
          ></ChoiceItem>
        </div>
        <div v-show="toggle" class="main">
          <div
            class="title"
            v-if="item.sectionSubjectQuestionInfo.questionTypeCode !== 4"
          >
            参考答案
          </div>
          <!-- 选择题 -->
          <template
            v-if="
              item.sectionSubjectQuestionInfo.questionTypeCode === 1 ||
                item.sectionSubjectQuestionInfo.questionTypeCode === 2 ||
                item.sectionSubjectQuestionInfo.questionTypeCode === 6
            "
          >
            <div v-html="item.sectionSubjectQuestionInfo.questionAnswer"></div>
          </template>
          <!-- 判断题 -->
          <template
            v-if="item.sectionSubjectQuestionInfo.questionTypeCode === 3"
          >
            <TrueOrFalse
              :trueOrFalse="item.sectionSubjectQuestionInfo.questionAnswer"
            ></TrueOrFalse>
          </template>
          <!-- 填空题 -->
          <template
            v-if="item.sectionSubjectQuestionInfo.questionTypeCode === 5"
          >
            <GapFilling
              :answer="item.sectionSubjectQuestionInfo.questionAnswer"
            ></GapFilling>
          </template>
          <template
            v-if="item.sectionSubjectQuestionInfo.questionTypeCode === 4"
          >
            <!-- {题组} -->
            <ChildQuestionInfoList></ChildQuestionInfoList>
          </template>
          <div
            class="title"
            v-if="item.sectionSubjectQuestionInfo.questionTypeCode !== 4"
          >
            解析
          </div>
          <div
            v-if="item.sectionSubjectQuestionInfo.questionTypeCode !== 4"
            v-html="item.sectionSubjectQuestionInfo.questionAnalysis"
          ></div>
          <!-- <div class="title">学生过往答案</div>
          <div>
            {{ item.questionAnswerinfo }}
          </div> -->
        </div>
        <div class="toggle" @click="handleToggle">
          <template v-if="toggle">
            <div>
              <img
                src="../../../assets/img/ic_fabu_yulan_danciup@2x.png"
                alt=""
              />
              <span>收起</span>
            </div>
          </template>
          <template v-else>
            <div>
              <img
                src="../../../assets/img/ic_fabu_yulan_danci_zhan@2x.png"
                alt=""
              />
              <span>展开</span>
            </div>
          </template>
        </div>
      </div>
      <ul class="footer">
        <li>
          来源
          <span>{{
            (item.sectionSubjectQuestionInfo.questionSourceId === 1
              ? item.sectionSubjectQuestionInfo.workbookName
              : item.sectionSubjectQuestionInfo.paperName) || '--'
          }}</span>
        </li>
        <li>
          页数
          <span>{{
            item.sectionSubjectQuestionInfo.workbookChapterPage || '--'
          }}</span>
        </li>
        <li>
          题号
          <span>{{
            item.sectionSubjectQuestionInfo.questionNumber || '--'
          }}</span>
        </li>
        <li>
          题型
          <span>{{
            item.sectionSubjectQuestionInfo.questionTypeName || '--'
          }}</span>
        </li>
        <li>
          难易度
          <span>{{
            item.sectionSubjectQuestionInfo.questionDegreedifficulty === '0.75'
              ? '简单'
              : item.sectionSubjectQuestionInfo.questionDegreedifficulty ===
                '0.5'
              ? '中等'
              : '困难' || '--'
          }}</span>
        </li>
        <li>
          分值
          <span>{{
            item.sectionSubjectQuestionInfo.questionScore || '--'
          }}</span>
        </li>
      </ul>
    </div>
    <div class="collect">
      <div
        class="wrap"
        v-if="item.sectionSubjectQuestionInfo.teacherQuestionCollectonId"
        @click="
          handleCancleCollecton(
            item.sectionSubjectQuestionInfo.teacherQuestionCollectonId
          )
        "
      >
        <img src="../../../assets/img/collected.png" alt="" />
        <span>取消收藏</span>
      </div>
      <div class="wrap" v-else @click="handleAddCollecton">
        <img src="../../../assets/img/collect.png" alt="" />
        <span>加入收藏</span>
      </div>
    </div>
    <CollectonModal
      v-if="isShowCollect"
      :item="item"
      @onHideCollect="handleHideCollect"
      :studentInfoId="studentInfoId"
      :questionYytypeId="questionYytypeId"
      :wrongquestionTimeStart="wrongquestionTimeStart"
      :wrongquestionTimeEnd="wrongquestionTimeEnd"
    ></CollectonModal>
  </div>
</template>

<script>
import ChoiceItem from './ChoiceItem' // 选择题题干
import TrueOrFalse from './TrueOrFalse' // 判断题
import GapFilling from './GapFilling' // 填空题
import ChildQuestionInfoList from './ChildQuestionInfoList' // 题组
import CollectonModal from './CollectonModal'
export default {
  name: 'detail-item',
  components: {
    TrueOrFalse,
    ChoiceItem,
    GapFilling,
    ChildQuestionInfoList,
    CollectonModal
  },
  props: [
    'item',
    'studentInfoId',
    'questionYytypeId',
    'wrongquestionTimeStart',
    'wrongquestionTimeEnd'
  ],
  data() {
    return {
      toggle: false,
      isShowCollect: false
    }
  },
  computed: {
    currentPage() {
      return this.$store.state.question.currentPage
    }
  },
  mounted() {},
  methods: {
    handleToggle() {
      if (
        !this.toggle &&
        this.item.sectionSubjectQuestionInfo.questionTypeCode === 4
      ) {
        this.$store.dispatch('question/homeworkDetail', {
          questionInfoId: this.item.sectionSubjectQuestionInfo.questionInfoId,
          questionTypeCode: this.item.sectionSubjectQuestionInfo
            .questionTypeCode
        })
      }
      this.toggle = !this.toggle
    },
    // 取消收藏
    handleCancleCollecton(teacherQuestionCollectionId) {
      this.$http
        .get('/api/collection/teacher/delCollection', {
          params: {
            teacherQuestionCollectionId: teacherQuestionCollectionId
          }
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.$store.commit(
              'question/UPDATECURRENTPAGE',
              this.currentPage - 1
            )
            this.$message.success('取消收藏成功')
            this.$store.dispatch('question/getList', {
              studentInfoId: this.studentInfoId,
              questionYytypeId: this.questionYytypeId.join(','),
              wrongquestionTimeStart: this.wrongquestionTimeStart,
              wrongquestionTimeEnd: this.wrongquestionTimeEnd
            })
          } else {
            this.$message.error('取消收藏失败')
          }
        })
    },
    // 显示收藏模态框
    handleAddCollecton() {
      this.isShowCollect = true
    },
    // 隐藏收藏模态框
    handleHideCollect() {
      this.isShowCollect = false
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
    flex: 0 0 578px;
    width: 578px;
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
        overflow: hidden;
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
        margin-bottom: 10px;
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
        div {
          word-break: break-all;
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
    width: 270px;
    overflow: hidden;
    .wrap {
      height: 138px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    img {
      width: 37px;
      height: 37px;
      margin-right: 4px;
    }
  }
}
</style>
