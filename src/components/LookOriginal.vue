<style scoped>
.title-slot {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 56px;
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
.original-content {
  padding: 24px 14px;
  background: rgba(254, 252, 238, 1);
  border: 1px solid rgba(245, 241, 210, 1);
  border-radius: 8px;
}
.hwd-modal {
  z-index: 999;
}
</style>
<template>
  <div>
    <a-modal
      v-model="visible"
      width="1200px"
      :footer="null"
      :centered="true"
      class="hwd-modal"
    >
      <div slot="title">
        <div class="title-slot">
          <tag-list :data="modalTitleTags"></tag-list>
          <span class="add-favorites" @click="addFavorites"
            ><a-icon
              type="heart"
              theme="filled"
              :class="
                originalInfo.teacherQuestionCollectonId ? 'already-joined' : ''
              "
              style="marginRight: 10px"
            />{{
              (originalInfo.teacherQuestionCollectonId ? '取消' : '加入') +
                '收藏'
            }}</span
          >
        </div>
      </div>
      <div class="original-topic">
        <div
          class="original-content margin-bottom-20"
          v-html="originalInfo.questionStem"
        ></div>
        <div>
          <template v-for="(item, index) in topicData">
            <topic
              style="margin-bottom: 20px"
              referenceColor="#1059FF"
              :topic-data="item"
              :key="index"
            />
          </template>
        </div>
      </div>
      <ClassifyDialog
        v-if="showDialog"
        @toParentEvents="showDialog = false"
        @toParentEvent="getId"
        @toParentEventStore="addCollectStore"
      ></ClassifyDialog>
    </a-modal>
    <!-- <a-modal
      v-model="picflag"
      width="100%"
      :footer="null"
      :centered="true"
      class="hwd-modal"
    >
      <div
        style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999999999"
      >
        <img
          :src="imgArr[0]"
          alt=""
          style="transform: scale(2) !important;
  height: auto !important;
  width: auto !important;
  max-width: 45% !important;
  max-height: 45% !important;"
        />
      </div>
    </a-modal> -->
  </div>
</template>
<script>
// 查看原文组件

import TagList from './TagList'
import Topic from './problem/topic'
import ClassifyDialog from '../views/publish-work/components/componentsOfChild/ClassifyDialog'
export default {
  name: 'LookOriginal',
  components: { TagList, Topic, ClassifyDialog },
  data() {
    return {
      // picflag: false,
      // imgArr: [],
      // imageIndex: 0,
      id: null,
      visible: false,
      showDialog: false,
      topicData: [],
      originalInfo: {
        abilityDimensions: '',
        childQuestionInfoList: [],
        questionArticleTitle: '',
        questionChildNum: 0,
        questionId: 0,
        questionInfoId: 0, // 分段试题id
        questionSourceId: 0, // 试题来源ID
        questionSourceName: '', // 试题来源名称
        questionStem: '', // 题干	string
        questionTextNum: 0, // 字数	number
        questionTypeCode: '', // 试题编码
        questionUuid: '', // 试题uuid
        styleName: '', // 文体名称	string
        subjectAbbreviation: '', // 学科简称
        subjectId: 0, // 学科ID
        subjectName: '', // 学科名
        teacherQuestionCollectonId: 0, // 老师收藏id	number
        themeName: '' //	主题名称
      },
      collectonGroupId: 0,
      modalTitleTags: [
        {
          label: '分类',
          value: '暂无'
        },
        {
          label: '相关主题',
          value: '暂无'
        },
        {
          label: '阅读内容维度',
          value: '暂无'
        },
        {
          label: '子题数',
          value: '暂无'
        },
        {
          label: '阅读量',
          value: '暂无'
        }
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {
    visible(curVal, oldVal) {
      //console.log(curVal)
      if (curVal) {
        this.getOriginalData()
      }
    }
  },
  methods: {
    getOriginalData() {
      let data = {
        questionId: this.id,
        teacherId: this.userInfo.teacherId,
        section: this.userInfo.section,
        subjectAbbreviation: 'yuwen'
      }
      this.$http
        .get('/api/question/articleInfo', { params: data })
        .then(res => {
          console.log(res)
          if (res.data.flag === 1) {
            let remote = res.data.infos
            let {
              grade,
              abilityDimensions,
              childQuestionInfoList,
              questionArticleTitle,
              questionChildNum,
              questionId,
              questionInfoId, // 分段试题id
              questionSourceId, // 试题来源ID
              questionSourceName, // 试题来源名称
              questionStem, // 题干	string
              questionTextNum, // 字数	number
              questionTypeCode, // 试题编码
              questionUuid, // 试题uuid
              styleName, // 文体名称	string
              subjectAbbreviation, // 学科简称
              subjectId, // 学科ID
              subjectName, // 学科名
              teacherQuestionCollectonId, // 老师收藏id	number
              themeName //	主题名称
            } = remote
            this.originalInfo = {
              grade,
              abilityDimensions,
              childQuestionInfoList,
              questionArticleTitle,
              questionChildNum,
              questionId,
              questionInfoId, // 分段试题id
              questionSourceId, // 试题来源ID
              questionSourceName, // 试题来源名称
              questionStem, // 题干	string
              questionTextNum, // 字数	number
              questionTypeCode, // 试题编码
              questionUuid, // 试题uuid
              styleName, // 文体名称	string
              subjectAbbreviation, // 学科简称
              subjectId, // 学科ID
              subjectName, // 学科名
              teacherQuestionCollectonId, // 老师收藏id	number
              themeName //	主题名称
            }
            this.getTitleTags()
            this.createQuestionChild()
            // this.$nextTick().then(() => {
            //   var that = this

            //   $('.original-topic img').click(function() {
            //     that.picflag = true
            //     that.imgArr = []
            //     that.imgArr.push($(this).attr('src'))
            //   })
            //   $('.topic-item img').click(function() {
            //     that.picflag = true
            //     that.imgArr = []
            //     that.imgArr.push($(this).attr('src'))
            //   })
            // })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getTitleTags() {
      this.modalTitleTags = [
        {
          label: '分类',
          value: this.originalInfo.styleName
        },
        {
          label: '相关主题',
          value: this.originalInfo.themeName
        },
        {
          label: '阅读能力维度',
          value: this.originalInfo.abilityDimensions || '--'
        },
        {
          label: '子题数',
          value: this.originalInfo.questionChildNum
        },
        {
          label: '阅读量',
          value: this.originalInfo.questionTextNum
        }
      ]
    },
    getChildrenquestionInfoList(data) {
      let arr = []
      if (data.childQuestionInfoList && data.childQuestionInfoList.length) {
        data.childQuestionInfoList.forEach((item, index) => {
          let obj = {
            index: index + 1,
            topicProblem: item.questionStem,
            topicMain: item.questionStem,
            reference: item.questionAnswer,
            analysis: item.questionAnalysis
          }
          if (item.questionTypeCode === 3) {
            let answer = obj.reference
            obj.reference = answer ? (answer === 'N' ? '错误' : '正确') : null
          }
          if (item.childQuestionInfoList && item.childQuestionInfoList.length) {
            obj.children = this.getChildrenquestionInfoList(item)
          }
          if (item.questionTypeCode === 1 || item.questionTypeCode === 2) {
            if (item.questionOptions && item.questionOptions.length) {
              obj.options = item.questionOptions.map(item => {
                return {
                  label: item.questionContent,
                  value: item.questionOption
                }
              })
            }
          }

          if (item.questionTypeCode === 5) {
            let answer = JSON.parse(item.questionAnswer)
            let src = ''
            answer.forEach((item, index) => {
              src += `<span>${index + 1}、 ${item.answer.join('，')}；</span>`
            })
            obj.reference = `<p>${src}</p>`
          }
          arr.push(obj)
        })
      }
      return arr
    },
    createQuestionChild() {
      let arr = []
      this.topicData = this.getChildrenquestionInfoList(this.originalInfo)
      // if (this.originalInfo.childQuestionInfoList&&this.originalInfo.childQuestionInfoList.length) {
      //   this.originalInfo.childQuestionInfoList.forEach((item, index) => {
      //     let obj = {
      //       index: index + 1,
      //       topicProblem: item.questionStem,
      //       topicMain: item.questionStem,
      //       reference: item.questionAnswer,
      //       analysis: item.questionAnalysis,
      //     }
      //     if (item.questionTypeCode === 1 || item.questionTypeCode === 2) {
      //       obj.options = item.questionOptions.map(item => {
      //         return {
      //           label: item.questionContent,
      //           value: item.questionOption
      //         }
      //       })
      //     }

      //     if (item.questionTypeCode === 5) {
      //       let answer = JSON.parse(item.questionAnswer)
      //       let src = ''
      //       answer.forEach((item, index) => {
      //         src += `<span>${index+1}、 ${item.answer.join('，')}；</span>`
      //       })
      //       obj.reference = `<p>${src}</p>`
      //     }
      //     arr.push(obj)
      //   })
      // }
      // console.log(arr)
      // this.topicData = arr
    },
    addFavorites() {
      if (this.originalInfo.teacherQuestionCollectonId) {
        this.deleteCollection()
      } else {
        this.showDialog = true
      }
    },
    getId(id) {
      this.collectonGroupId = id
    },
    deleteCollection(data) {
      let params = {
        teacherQuestionCollectionId: this.originalInfo
          .teacherQuestionCollectonId
      }
      this.$http('/api/collection/teacher/delCollection', { params })
        .then(res => {
          if (res.data.flag === 1) {
            let obj = {
              collectonId: null,
              findId: this.originalInfo.questionId
            }
            this.$message.success('取消收藏成功')
            this.setWorlCollecton(obj)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    setWorlCollecton(obj) {
      this.originalInfo.teacherQuestionCollectonId = null
      this.$store.commit('work/SET_TECHER_QUESTION_COLLECTONID', obj)
    },
    addCollectStore() {
      let CollectionInfos = {
        collectonGroupId: this.collectonGroupId,
        grade: this.originalInfo.grade,
        questionId: this.originalInfo.questionId,
        questionTypeCode: this.originalInfo.questionTypeCode,
        questionInfoId: this.originalInfo.questionInfoId,
        questionSourceId: this.originalInfo.questionSourceId,
        questionSourceName: this.originalInfo.questionSourceName,
        questionUuid: this.originalInfo.questionUuid
      }
      this.$store.dispatch('publish/addStore', CollectionInfos).then(data => {
        if (data.flag === 1) {
          this.showDialog = false
          this.$store.commit('work/SET_TECHER_QUESTION_COLLECTONID', {
            collectonId: data.infos,
            findId: CollectionInfos.questionId
          })
          this.originalInfo.teacherQuestionCollectonId = data.infos
          this.CollectionInfos = null
          this.$message.success('收藏成功')
        } else {
          this.$message.error('收藏失败')
        }
      })
    }
  },
  mounted() {}
}
</script>