<template>
  <div class="work-type-conent-coll">
    <div class="work-type-conent-left">
      <div>
        <div @click="editClassify">编辑分类</div>
      </div>
      <div>
        <ul class="menu">
          <li @click="spreadChange(0)">
            <div :class="groupType == 0 ? 'hover-div' : ''">我的收藏</div>
          </li>
          <template v-for="(item, index) in addGrouplist">
            <li
              :key="index"
              v-if="item.collectonGroupId != 0"
              @click="spreadChange(index + 1, item.collectonGroupId)"
            >
              <div :class="groupType == index + 1 ? 'hover-div' : ''">
                {{ item.groupName }}
                <img
                  src="../../../../assets/img/publish/ssss.png"
                  alt
                  @click.stop="deletGroup(item.collectonGroupId)"
                />
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="work-type-conent-right">
      <div class="collect-group">
        <template v-if="collectonQuestionsList.length">
          <read-list-card
            v-for="item in collectonQuestionsList"
            :data="item"
            :selected="workListById"
            :key="item.questionId"
            @look="lookOriginal"
            @on-add-work="addWork"
            @on-add-favorites="deleteCollection"
          ></read-list-card>
        </template>
        <div class="null" v-else>
          <img src="../../../../assets/img/publish/nulldata.png" alt />
          <span>您还没有收藏的阅读训练题目，快去收藏吧！</span>
        </div>
        <div class="load-more" v-if="isShowMoreAll">
          <span @click="changePage" v-if="!isShowMore" class="jz"
            >点击加载更多</span
          >
          <span v-else>暂无更多数据</span>
        </div>
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
    <div class="del-coll-wrap" v-if="showDeldialog">
      <div class="del-dialog">
        <p>
          <span>提示</span>
          <img
            src="../../../../assets/img/publish/close.png"
            alt
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
    <look-original ref="original"></look-original>
  </div>
</template>

<script>
import ReadListCard from '../../../../components/ReadListCard'
import LookOriginal from '../../../../components/LookOriginal'
import ClassifyDialog from './ClassifyDialog.vue'
import CreateClassify from './CreateClassify.vue'
export default {
  name: 'ReadCollection',
  components: {
    ClassifyDialog,
    CreateClassify,
    ReadListCard,
    LookOriginal
  },
  data() {
    return {
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
      collectonQuestionsList: [],
      answerIdList: [],
      addWorkIdList: [],
      changeClassfilyIdIndex: null,
      tizuWorkbookPageQuestionnumList: [],
      arrAll: [],
      isShowMore: false,
      isShowMoreAll: true
    }
  },
  computed: {
    workList() {
      return this.$store.getters['work/readWorkList']
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
  watch: {
    addWorkbookPageQuestionnumAllList(val) {
      this.getGroupQuestions(this.collectionGroupId, this.currentPage, val)
    }
  },
  mounted() {
    this.$store.dispatch('publish/getGroup').then(data => {
      if (data.flag === 1) {
        this.addGrouplist = data.infos
        //this.groupType = this.addGrouplist[0].collectonGroupId
      }
      //this.addGrouplist.length > 0 ? (this.groupType = 1) : (this.groupType = 0)
      this.collectionGroupId = 0
      this.getGroupQuestions(
        this.collectionGroupId,
        this.currentPage,
        this.addWorkbookPageQuestionnumAllList
      )
    })
  },
  methods: {
    deleteCollection(data) {
      let params = {
        teacherQuestionCollectionId: data.teacherQuestionCollectonId
      }
      this.$http('/api/collection/teacher/delCollection', { params })
        .then(res => {
          if (res.data.flag === 1) {
            let obj = {
              collectonId: null,
              findId: data.questionId
            }
            this.setWorlCollecton(obj)
            this.$message.success('取消收藏成功')
            this.updatePage()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    setWorlCollecton(obj) {
      this.$store.commit('work/SET_TECHER_QUESTION_COLLECTONID', obj)
    },
    lookOriginal(obj) {
      this.$refs['original'].id = obj.questionId
      this.$refs['original'].visible = true
    },
    getId(id) {
      this.collectonGroupId = id
    },
    changePage() {
      this.currentPage++
      this.getGroupQuestions(
        this.collectionGroupId,
        this.currentPage,
        this.addWorkbookPageQuestionnumAllList,
        true
      )
    },
    updatePage() {
      this.currentPage = 0
      this.getGroupQuestions(
        this.collectionGroupId,
        this.currentPage,
        this.addWorkbookPageQuestionnumAllList
      )
    },
    closeChildDialog() {
      this.showDialog = false
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
      this.changeClassfilyIdIndex = null
      this.getGroupQuestions(
        this.collectionGroupId,
        this.currentPage,
        this.addWorkbookPageQuestionnumAllList
      )
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
            console.log(data)
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
    addWork(data) {
      let workListById = this.workListById
      let workList = this.workList
      if (workListById.includes(data.questionId)) {
        workList = workList.filter(item => {
          return item.questionId !== data.questionId
        })
        workListById = workListById.filter(item => {
          return item !== data.questionId
        })
        this.$store.commit('work/SETREADWORKLIST', workList)
        this.$store.commit('work/SETREADWORKLISTBYID', workListById)
        // this.$message.success('移出成功')
      } else {
        workListById.push(data.questionId)
        workList.push(data)
        this.$store.commit('work/SETREADWORKLIST', workList)
        this.$store.commit('work/SETREADWORKLISTBYID', workListById)
        // this.$message.success('加入成功')
      }
      // if (this.addWorkIdList.includes(id)) {
      //   for (var i = 0; i < this.addWorkIdList.length; i++) {
      //     if (this.addWorkIdList[i] === id) {
      //       this.addWorkIdList.splice(i, 1)
      //     }
      //   }
      //   this.addWorkbookPageQuestionnumAllList.forEach((item, index) => {
      //     if (item.questionId === id) {
      //       this.addWorkbookPageQuestionnumAllList.splice(index, 1)
      //     }
      //   })
      // } else {
      //   this.addWorkIdList.push(id)
      //   if (this.addWorkbookPageQuestionnumAllList.length != 0) {
      //     this.collectonQuestionsList.forEach(items => {
      //       if (items.questionId === id) {
      //         this.addWorkbookPageQuestionnumAllList.push(items) //全部数据
      //       }
      //     })
      //   } else {
      //     this.collectonQuestionsList.forEach(item => {
      //       if (item.questionId === id) {
      //         this.addWorkbookPageQuestionnumAllList.push(item)
      //       }
      //     })
      //   }
      // }
      // localStorage.setItem(
      //   'addWorkbookPageQuestionnumAllList',
      //   JSON.stringify(this.addWorkbookPageQuestionnumAllList)
      // )
      // this.$store.commit(
      //   'publish/WORKALLLIST',
      //   this.addWorkbookPageQuestionnumAllList
      // )
      // this.$emit(
      //   'toParentEventOflength',
      //   this.addWorkbookPageQuestionnumAllList.length
      // )
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
          this.getGroupQuestions(
            this.collectionGroupId,
            this.currentPage,
            this.addWorkbookPageQuestionnumAllList
          )
        }
      })
    },
    cancelStore(id) {
      this.$store.dispatch('publish/cancelStore', id).then(data => {
        if (data.flag === 1) {
          this.getGroupQuestions(
            this.collectionGroupId,
            this.currentPage,
            this.addWorkbookPageQuestionnumAllList
          )
        }
      })
    },
    getGroupQuestions(id, page, list, bool) {
      this.currentinfo = {
        page: page,
        id: id
      }
      this.$store
        .dispatch('publish/getGroupArticleQuestions', this.currentinfo)
        .then(data => {
          if (data.flag === 1) {
            console.table(data.infos)
            if (bool) {
              this.collectonQuestionsList = this.collectonQuestionsList.concat(
                data.infos
              )
            } else {
              this.collectonQuestionsList = data.infos
            }

            if (this.collectonQuestionsList.length === 10) {
              this.isShowMore = false
              this.isShowMoreAll = true
            } else {
              this.isShowMoreAll = true
              this.isShowMore = true
            }
            list.forEach(item => {
              this.collectonQuestionsList.forEach(items => {
                if (item.questionId === items.questionId) {
                  this.addWorkIdList.push(item.questionId)
                }
              })
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.work-type-conent-coll {
  margin: 21px auto 0;
  @include wh(100%, 90%);
  background: #fff;
  @include fj();
  img {
    width: auto;
  }
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
    padding-bottom: 5px;
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
}
.work-type-conent-right {
  @include wh(912px, 100%);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 0px 4px 4px 0px;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.collect-group {
  @include wh(100%, 98%);
  padding-bottom: 10px;
  overflow: scroll;
}
.load-more {
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
    background: url(../../../../assets/img/publish/jiazai.png) no-repeat left
      top;
    background-size: 12% 85%;
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
.null {
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
</style>
