<template>
  <div class="publish-state">
    <div class="publish-type">
      <h5>
        作业类型
      </h5>
      <div>
        <ul>
          <li :class="workType == 1 ? 'hover-li' : ''" @click="selectType(1)">
            <a href="javascript:;" :class="workType == 1 ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/rizuoye1.png"
                alt=""
                v-if="workType == 1"
              />
              <img
                src="../../../assets/img/publish/rizuoye2.png"
                alt=""
                v-if="workType != 1"
              />
            </a>
            <span :class="workType == 1 ? 'hover-span' : ''">日常作业</span>
          </li>
          <li :class="workType == 2 ? 'hover-li' : ''" @click="selectType(2)">
            <a href="javascript:;" :class="workType == 2 ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/cuo1.png"
                alt=""
                v-if="workType == 2"
              />
              <img
                src="../../../assets/img/publish/cuo2.png"
                alt=""
                v-if="workType != 2"
              />
            </a>
            <span :class="workType == 2 ? 'hover-span' : ''">错题作业</span>
          </li>
          <li
            :class="workType == 3 ? 'hover-li' : ''"
            @click="selectType(3)"
            v-if="subject == 'yingyu'"
          >
            <a href="javascript:;" :class="workType == 3 ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/ting1.png"
                alt=""
                v-if="workType == 3"
              />
              <img
                src="../../../assets/img/publish/ting2.png"
                alt=""
                v-if="workType != 3"
              />
            </a>
            <span :class="workType == 3 ? 'hover-span' : ''">英语听说</span>
          </li>
          <li
            :class="workType == 4 ? 'hover-li' : ''"
            @click="selectType(4)"
            v-if="subject == 'yingyu'"
          >
            <a href="javascript:;" :class="workType == 4 ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/dan1.png"
                alt=""
                v-if="workType == 4"
              />
              <img
                src="../../../assets/img/publish/dan2.png"
                alt=""
                v-if="workType != 4"
              />
            </a>
            <span :class="workType == 4 ? 'hover-span' : ''">单词作业</span>
          </li>
          <!-- <li
            :class="workType == 5 ? 'hover-li' : ''"
            @click="selectType(5)"
            v-if="subject == 'yuwen'"
          >
            <a href="javascript:;" :class="workType == 5 ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/read_icon.png"
                alt=""
                v-if="workType == 5"
              />
              <img
                src="../../../assets/img/publish/read_icon1.png"
                alt=""
                v-if="workType != 5"
              />
            </a>
            <span :class="workType == 5 ? 'hover-span' : ''">阅读训练</span>
          </li> -->
          <li
            :class="workType == 6 ? 'hover-li' : ''"
            @click="selectType(6)"
            v-if="subject == 'yuwen'"
          >
            <a href="javascript:;" :class="workType == 6 ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/read_icon.png"
                alt=""
                v-if="workType == 6"
              />
              <img
                src="../../../assets/img/publish/read_icon1.png"
                alt=""
                v-if="workType != 6"
              />
            </a>
            <span :class="workType == 6 ? 'hover-span' : ''">作文任务</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="publish-class">
      <h5>
        发布范围
      </h5>
      <div v-if="this.workType == 6">
        <ul>
          <li
            :class="readClassListById == item.gradeClassid ? 'hover-li' : ''"
            @click="readSelectClass(item.gradeClassid, item)"
            v-for="(item, index) in classListData"
            :key="index"
          >
            <div
              :class="readClassListById == item.gradeClassid ? 'hover-a' : ''"
            >
              <img
                src="../../../assets/img/publish/ban1.png"
                alt=""
                v-if="readClassListById == item.gradeClassid"
              />
              <img
                src="../../../assets/img/publish/ban2.png"
                alt=""
                v-if="readClassListById != item.gradeClassid"
              />
            </div>
            <p>
              <span>
                {{ item.grade | grade }} &nbsp;{{ item.gradeClassname }}
              </span>
              <span
                ><i>人数</i> <i>{{ item.gradeClassQuestionnm }}人</i></span
              >
            </p>
          </li>
        </ul>
      </div>
      <div v-else-if="this.workType != 2">
        <ul>
          <li
            :class="classType.includes(item.gradeClassid) ? 'hover-li' : ''"
            @click="selectClass(item.gradeClassid)"
            v-for="(item, index) in classListData"
            :key="index"
          >
            <div
              :class="classType.includes(item.gradeClassid) ? 'hover-a' : ''"
            >
              <img
                src="../../../assets/img/publish/ban1.png"
                alt=""
                v-if="classType.includes(item.gradeClassid)"
              />
              <img
                src="../../../assets/img/publish/ban2.png"
                alt=""
                v-if="!classType.includes(item.gradeClassid)"
              />
            </div>
            <p>
              <span>
                {{ item.grade | grade }} &nbsp;{{ item.gradeClassname }}
              </span>
              <span
                ><i>人数</i> <i>{{ item.gradeClassQuestionnm }}人</i></span
              >
            </p>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul>
          <li
            :class="errorClassType == item.gradeClassid ? 'hover-li' : ''"
            @click="selectErrorClass(item.gradeClassid)"
            v-for="(item, index) in classListData"
            :key="index"
          >
            <div :class="errorClassType == item.gradeClassid ? 'hover-a' : ''">
              <img
                src="../../../assets/img/publish/ban1.png"
                alt=""
                v-if="errorClassType == item.gradeClassid"
              />
              <img
                src="../../../assets/img/publish/ban2.png"
                alt=""
                v-if="errorClassType != item.gradeClassid"
              />
            </div>
            <p>
              <span>
                {{ item.grade | grade }} &nbsp;{{ item.gradeClassname }}
              </span>
              <span
                ><i>人数</i> <i>{{ item.gradeClassQuestionnum }}人</i></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="dialog-wrap" v-if="showdialog">
      <div class="dialog">
        <p>
          <span>提示</span>
          <img
            src="../../../assets/img/publish/close.png"
            alt=""
            @click="close"
          />
        </p>
        <span>修改作业类型将清空已选的作业内容，是否修改？</span>
        <div>
          <button @click="confirm(worktypeFz)">确认修改</button>
          <button @click="close">取消修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: '',
  props: [],
  data() {
    return {
      workType: 1, //控制类型的显示状态
      showdialog: false,
      worktypeFz: 0,
      subject: ''
    }
  },
  computed: {
    // 阅读作业
    workList() {
      return this.$store.state.work.readWorkList
    },
    readClassList: {
      get: function() {
        return this.$store.state.work.classList
      },
      set: function(v) {
        this.$store.commit('work/SET_CLASS_LIST', v)
      }
    },
    readClassListById: {
      get: function() {
        return this.$store.state.work.classListById
      },
      set: function(v) {
        this.$store.commit('work/SET_CLASS_LIST_BY_ID', v)
      }
    },
    homeworkType() {
      return this.$store.state.work.homeworkType
    },
    classListData() {
      return this.$store.state.publish.classList
    },
    addWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.workAllList
      },
      set: function(v) {
        this.$store.commit('publish/WORKALLLIST', v)
      }
    },
    errorAddWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.errorWorkAllList
      },
      set: function(v) {
        this.$store.commit('publish/ERRORWORKALLLIST', v)
      }
    },
    // 单词作业题数
    wordHomeWorkCount() {
      return this.$store.getters['publish/wordHomeWorkCount']
    },

    // 听说作业list
    selectedItemList() {
      return this.$store.state.publish.selectedItemList || []
    },
    classType: {
      get: function() {
        return this.$store.state.publish.classType
      },
      set: function(v) {
        this.$store.commit('publish/CLASSTYPE', v)
      }
    },
    selectClassList: {
      get: function() {
        return this.$store.state.publish.selectClassList
      },
      set: function(v) {
        this.$store.commit('publish/SELECTCLASSLIST', v)
      }
    },
    errorClassType: {
      get: function() {
        return this.$store.state.publish.errorClassType
      },
      set: function(v) {
        this.$store.commit('publish/ERRORCLASSTYPE', v)
      }
    },
    errorClasslist: {
      get: function() {
        return this.$store.state.publish.errorClasslist
      },
      set: function(v) {
        this.$store.commit('publish/ERRORCLASSLIST', v)
      }
    }
  },
  created() {
    this.readClassList = JSON.parse(localStorage.getItem('readClassList')) || []
    this.readClassListById =
      JSON.parse(localStorage.getItem('readClassListById')) || []
    this.subject = this.$store.state.userInfo.subjectAbbreviation
  },
  mounted() {
    if (
      localStorage.getItem('type') != null &&
      localStorage.getItem('type') != ''
    ) {
      this.workType = localStorage.getItem('type')
    } else {
      if (
        localStorage.getItem('workType') != null &&
        localStorage.getItem('workType') != ''
      ) {
        this.workType = localStorage.getItem('workType')
      } else {
        this.workType = this.homeworkType
      }
    }
    localStorage.setItem('type', this.workType)
    this.$store.commit('publish/TYPE', this.workType)
    if (this.workType == 2) {
      this.$store.dispatch('publish/errorPublishPageClass').then(res => {
        if (this.errorClasslist.length == 0) {
          this.errorClasslist.push(res.infos[0])
          this.errorClassType = res.infos[0].gradeClassid
          localStorage.setItem('errorClassType', this.errorClassType)
          localStorage.setItem(
            'errorClasslist',
            JSON.stringify(this.errorClasslist)
          )
          this.$store.commit('publish/ERRORCLASSTYPE', this.errorClassType)
          this.$store.commit('publish/ERRORCLASSLIST', this.errorClasslist)
        }
      })
    } else {
      this.$store.dispatch('publish/publishPageClass').then(res => {
        if (!this.readClassList.length) {
          this.readClassList.push(res.infos[0])
          this.readClassListById.push(res.infos[0].gradeClassid)
        }
        if (this.selectClassList.length == 0) {
          this.selectClassList.push(res.infos[0])
          this.classType.push(res.infos[0].gradeClassid)
          localStorage.setItem('classType', JSON.stringify(this.classType))
          localStorage.setItem(
            'selectClassList',
            JSON.stringify(this.selectClassList)
          )
          this.$store.commit('publish/CLASSTYPE', this.classType)
          this.$store.commit('publish/SELECTCLASSLIST', this.selectClassList)
        }
        localforage.setItem(
          'selectClassToPublishCompositionInfo',
          this.selectClassList[0]
        )
      })
    }
  },
  watch: {
    readWorkList(a, b, c) {
      console.log(a, b, c)
    }
  },
  methods: {
    readSelectClass(t, item) {
      this.readClassList = []
      this.readClassListById = t
      this.classListData.forEach(item => {
        if (item.gradeClassid === t) {
          this.readClassList.push(item)
        }
      })

      // if (this.readClassListById.includes(t)) {
      //   for (var i = 0; i < this.readClassListById.length; i++) {
      //     if (this.readClassListById[i] === t) {
      //       if (this.readClassListById.length !== 1) {
      //         this.readClassListById.splice(i, 1)
      //         this.readClassList.splice(i, 1)
      //       }
      //     }
      //   }
      // } else {
      //   this.classListData.forEach(item => {
      //     if (item.gradeClassid === t) {
      //       this.readClassListById.push(t)
      //       this.readClassList.push(item)
      //     }
      //   })
      // }
      localStorage.setItem(
        'readClassListById',
        JSON.stringify(this.readClassListById)
      )
      localStorage.setItem('readClassList', JSON.stringify(this.readClassList))
      localforage.setItem('selectClassToPublishCompositionInfo', item)
    },
    selectType(t) {
      this.worktypeFz = t
      localStorage.setItem('isApproval', false)
      localStorage.setItem('isHomeworkQuestionType', '')

      if (
        this.addWorkbookPageQuestionnumAllList.length > 0 ||
        (this.errorAddWorkbookPageQuestionnumAllList != undefined &&
          this.errorAddWorkbookPageQuestionnumAllList.length > 0) ||
        this.selectedItemList.length > 0 ||
        this.wordHomeWorkCount > 0 ||
        this.workList.length > 0
      ) {
        this.showdialog = true
      } else {
        this.$store.commit('work/SETREADWORKLIST', [])
        this.$store.commit('work/SETREADWORKLISTBYID', [])
        this.$store.commit('work/SET_CLASS_LIST', [])
        this.$store.commit('work/SET_CLASS_LIST_BY_ID', [])
        localStorage.setItem('selectClassList', JSON.stringify([])) //非错题作业id
        localStorage.setItem('classType', JSON.stringify([])) //非错题作业列表
        localStorage.setItem('errorClassType', null) //错题作业id
        localStorage.setItem('errorClasslist', JSON.stringify([])) ////错题作业列表
        this.$store.commit('publish/ERRORCLASSTYPE', null)
        this.$store.commit('publish/ERRORCLASSLIST', [])
        this.$store.commit('publish/CLASSTYPE', [])
        this.$store.commit('publish/SELECTCLASSLIST', [])
        this.workType = t
        this.errorClassType = null
        localStorage.setItem('type', t)
        this.$store.commit('publish/TYPE', t)
        if (t == 2) {
          this.$store.dispatch('publish/errorPublishPageClass').then(res => {
            this.errorClasslist.push(res.infos[0])
            this.errorClassType = res.infos[0].gradeClassid
            localStorage.setItem('errorClassType', this.errorClassType)
            localStorage.setItem(
              'errorClasslist',
              JSON.stringify(this.errorClasslist)
            )
            this.$store.commit('publish/ERRORCLASSTYPE', this.errorClassType)
            this.$store.commit('publish/ERRORCLASSLIST', this.errorClasslist)
          })
        } else {
          this.$store.dispatch('publish/publishPageClass').then(res => {
            this.readClassList.push(res.infos[0])
            this.readClassListById.push(res.infos[0].gradeClassid)
            this.selectClassList.push(res.infos[0])
            this.classType.push(res.infos[0].gradeClassid)
            localStorage.setItem('classType', JSON.stringify(this.classType))
            localStorage.setItem(
              'selectClassList',
              JSON.stringify(this.selectClassList)
            )
            this.$store.commit('publish/CLASSTYPE', this.classType)
            this.$store.commit('publish/SELECTCLASSLIST', this.selectClassList)
            localforage.setItem(
              'selectClassToPublishCompositionInfo',
              this.selectClassList[0]
            )
          })
        }
        this.$emit('toParentEvents', this.workType)
      }
    },
    selectClass(t) {
      if (this.classType.includes(t)) {
        for (var i = 0; i < this.classType.length; i++) {
          if (this.classType[i] === t) {
            this.classType.splice(i, 1)
            this.selectClassList.splice(i, 1)
          }
        }
      } else {
        this.classType.push(t)
        this.classListData.forEach(item => {
          if (item.gradeClassid === t) {
            this.selectClassList.push(item)
          }
        })
      }

      localStorage.setItem('classType', JSON.stringify(this.classType))
      localStorage.setItem(
        'selectClassList',
        JSON.stringify(this.selectClassList)
      )
      this.$store.commit('publish/CLASSTYPE', this.classType)
      this.$store.commit('publish/SELECTCLASSLIST', this.selectClassList)
      localforage.setItem(
        'selectClassToPublishCompositionInfo',
        this.selectClassList[0]
      )
    },
    selectErrorClass(t) {
      this.errorClasslist = []
      this.errorClassType = t
      this.classListData.forEach(item => {
        if (item.gradeClassid === t) {
          this.errorClasslist.push(item)
        }
      })
      localStorage.setItem('errorClassType', this.errorClassType)
      localStorage.setItem(
        'errorClasslist',
        JSON.stringify(this.errorClasslist)
      )
      this.$store.commit('publish/ERRORCLASSTYPE', this.errorClassType)
      this.$store.commit('publish/ERRORCLASSLIST', this.errorClasslist)
    },
    close() {
      this.showdialog = false
    },
    confirm(t) {
      this.workType = t
      if (
        this.workType == 1 ||
        this.workType == 3 ||
        this.workType == 4 ||
        this.workType == 6 ||
        this.workType == 5
      ) {
        // 清除英语听说
        this.$store.commit('publish/UPDATESELECTEDITEMLIST')
        localforage.removeItem('selectedItemList')
        // 清除单词
        this.$store.commit('publish/RESETWORDLIST')
        this.$store.commit('publish/UPDATEWORDMENUINDEX', 0)
        localforage.removeItem('wordList')

        this.$store.commit('work/SETREADWORKLIST', [])
        this.$store.commit('work/SETREADWORKLISTBYID', [])
        this.$store.commit('work/SET_CLASS_LIST', [])
        this.$store.commit('work/SET_CLASS_LIST_BY_ID', [])
        localStorage.setItem('errorClassType', null) //错题作业id
        localStorage.setItem('errorClasslist', JSON.stringify([])) ////错题作业列表
        this.$store.commit('publish/ERRORCLASSTYPE', null)
        this.$store.commit('publish/ERRORCLASSLIST', [])
        localStorage.setItem(
          'errorAddWorkbookPageQuestionnumAllList ',
          JSON.stringify([])
        )

        this.$store.commit('publish/ERRORWORKALLLIST', [])
        localStorage.setItem('selectClassList', JSON.stringify([]))
        localStorage.setItem('classType', JSON.stringify([]))
        this.$store.commit('publish/CLASSTYPE', [])
        this.$store.commit('publish/SELECTCLASSLIST', [])
        localStorage.setItem(
          'addWorkbookPageQuestionnumAllList',
          JSON.stringify([])
        )
        this.$store.commit('publish/WORKALLLIST', [])
        this.$emit('toParentEventlenerror', 0)
        this.$emit('toParentEventlen', 0)
        this.$store.commit('publish/UPDATESELECTEDITEMLIST')
        this.$store.commit('publish/TEXTBOOKWORD', [])
        this.$store.dispatch('publish/publishPageClass').then(res => {
          this.readClassList.push(res.infos[0])
          this.readClassListById.push(res.infos[0].gradeClassid)
          this.selectClassList.push(res.infos[0])
          this.classType.push(res.infos[0].gradeClassid)
          localStorage.setItem('classType', JSON.stringify(this.classType))
          localStorage.setItem(
            'selectClassList',
            JSON.stringify(this.selectClassList)
          )
          this.$store.commit('publish/CLASSTYPE', this.classType)
          this.$store.commit('publish/SELECTCLASSLIST', this.selectClassList)
        })
      }
      if (this.workType == 2) {
        localStorage.setItem('selectClassList', JSON.stringify([]))
        localStorage.setItem('classType', JSON.stringify([]))
        this.$store.commit('publish/CLASSTYPE', [])
        this.$store.commit('publish/SELECTCLASSLIST', [])
        localStorage.setItem(
          'addWorkbookPageQuestionnumAllList',
          JSON.stringify([])
        )
        this.$store.commit('publish/WORKALLLIST', [])
        this.$store.commit('publish/UPDATESELECTEDITEMLIST')
        this.$store.commit('publish/TEXTBOOKWORD', [])
        this.$emit('toParentEventlen', 0)
        this.$store.dispatch('publish/errorPublishPageClass').then(res => {
          this.errorClasslist.push(res.infos[0])
          this.errorClassType = res.infos[0].gradeClassid
          localStorage.setItem('errorClassType', this.errorClassType)
          localStorage.setItem(
            'errorClasslist',
            JSON.stringify(this.errorClasslist)
          )
          this.$store.commit('publish/ERRORCLASSTYPE', this.errorClassType)
          this.$store.commit('publish/ERRORCLASSLIST', this.errorClasslist)
        })
      }
      localStorage.setItem('type', t)
      this.$store.commit('publish/TYPE', t)
      this.$emit('toParentEvents', this.workType)
      this.showdialog = false
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.publish-state {
  @include wh(1200px, 80%);
  background: #fff;
  margin: 20px auto 0;
  overflow: auto;
  background: url(../../../assets/img/publish/bg1.png) no-repeat center;
  background-size: cover;
  h5 {
    @include sc(16px, #a9a9a9);
    margin: 0 19px 22px 0;
  }
  .publish-type {
    @include wh(90%, auto);
    margin: 41px 0 0 40px;
    overflow: auto;
    ul li {
      @include wh(190px, 55px);
      float: left;
      margin-right: 19px;
      #{$attr}-radius: 40px;
      #{$attr}: 1px solid #b9b9b9;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      margin-bottom: 20px;
      a {
        display: block;
        @include wh(35px, 35px);
        background: #399eff;
        display: flex;
        justify-content: center;
        align-items: center;
        #{$attr}-radius: 50%;
        margin-left: 15px;
        img {
          @include wh(18px, 18px);
        }
      }
      a.hover-a {
        background: #fff;
      }
      span {
        margin-left: 18px;
        color: #b9b9b9;
        font-size: 16px;
      }
      span.hover-span {
        color: #fff;
      }
    }
    li.hover-li {
      background: #399eff;
      color: #fff;
      border: 0;
    }
    li:nth-of-type(1) {
      margin-left: 0;
    }
  }
  .publish-class {
    @include wh(90%, auto);
    margin: 41px 0 0 40px;
    overflow: auto;
    div,
    ul {
      @include wh(100%, auto);
    }
    ul li {
      @include wh(290px, 90px);
      float: left;
      margin: 0px 22px 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ebebeb;
      cursor: pointer;
      border-radius: 8px;
      div {
        @include wh(60px, 60px);
        background: #ebebeb;
        display: flex;
        justify-content: center;
        align-items: center;
        #{$attr}-radius: 50%;
        margin-left: 15px;
        img {
          @include wh(33px, 23px);
        }
      }
      div.hover-a {
        background: #fff;
      }
      p {
        @include fj(space-between);
        align-items: center;
        flex-flow: column;
        @include wh(115px, 55%);
        font-size: 14px;
        margin-right: 78px;
        span {
          @include wh(100%, 20px);

          i {
            font-style: normal;
          }
        }
        span:nth-child(1) {
          @include wh(115px, 20px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        span:nth-child(2) {
          @include fj(space-around);
          align-items: center;
          @include wh(80%, 20px);
        }
      }
    }
    li.hover-li {
      overflow: hidden;
      background: url(../../../assets/img/publish/bg-banji.png) no-repeat center;
      background-size: cover;
      color: #fff;
    }
  }
  .dialog-wrap {
    @include wh(100%, 100%);
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    @include fj(center);
    align-items: center;
    .dialog {
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
