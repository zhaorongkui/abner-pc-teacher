<template>
  <div class="english-speaking-work-statistics-wrap">
    <div class="nav">
      <router-link to="work">作业 &nbsp;&nbsp;></router-link>
      <router-link to="/work-grading-assignment" v-if="pathType != 1"
        >&nbsp;&nbsp;学生列表 &nbsp;></router-link
      >
      <span>&nbsp;&nbsp;数据分析</span>
    </div>
    <div class="english-speaking-work-statistics-infos">
      <div class="english-speaking-work-statistics-infos-top">
        <span>
          <i>作业名称</i>
          <i>{{ dataItem.homeworkName }}</i>
        </span>
        <span>
          <i>班级</i>
          <i>{{ dataItem.gradeClassname }}</i>
        </span>
        <span
          ><i>人数</i> <i>{{ dataItem.studentNum }}</i>
        </span>
        <span @click="toPage('work-grading-assignment', dataItem, '')"
          >学生列表</span
        >
      </div>
      <div class="english-speaking-work-statistics-infos-bottom">
        <div class="english-speaking-work-statistics-infos-bottom-l">
          <div
            @click="selectItem(index, item.homeworkQuestionId)"
            v-for="(item, index) in englishSpeakingList"
            :key="index"
          >
            <div :class="selectType == index ? 'hover-div' : ''">
              <p
                :class="selectType == index ? 'hover-p' : ''"
                v-html="item.questionStemContent"
              ></p>
              <span></span>
              <span>
                <i>{{ item.topScore }}</i>
                <i>最高得分</i>
              </span>
            </div>
            <img
              src="../../../assets/img/publish/ic_homepage_word_arrow_sellected.png"
              alt=""
              v-if="selectType == index"
            />
          </div>
        </div>
        <div class="english-speaking-work-statistics-infos-bottom-r">
          <div>
            <span>学生姓名</span>
            <span>
              最高得分
              <span class="sort">
                <i
                  class="sort-caret ascending"
                  :class="
                    sortColumn === 'topScore' && sortRule === 'Asc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('topScore', 'Asc')"
                ></i>
                <i
                  class="sort-caret descending"
                  :class="
                    sortColumn === 'topScore' && sortRule === 'Desc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('topScore', 'Desc')"
                ></i>
              </span>
            </span>
          </div>
          <div>
            <div
              v-for="(items, index) in studentAnswerList"
              :key="index"
              @click="
                toPage(
                  'work-answer-results-english',
                  items.studentId,
                  items.studentName
                )
              "
            >
              <p>{{ items.studentName }}</p>
              <p v-if="items.submitType == 3">
                {{ items.topScore }}
                <span v-if="parseInt(items.topScore) < 60">&nbsp;(不及格)</span>
              </p>
              <p v-if="items.submitType == 1">--</p>
              <p v-if="items.submitType == 2" class="wz">未完成</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: '',
  props: ['dataItem', 'pathType'],
  data() {
    return {
      selectType: 0,
      lineWidth: 218,
      strokeWidth: 12,
      showHeader: false,
      showWordViewWrap: false,
      selectItemHover: false,
      englishSpeakingList: [],
      studentAnswerList: [],
      sortColumn: '',
      sortRule: 'Asc'
    }
  },
  watch: {
    '$route.path'(value) {
      this.path = value
    }
  },

  computed: {},
  components: {},
  mounted() {
    this.$http
      .get('/api/teacher/homework/statistical/video/index', {
        params: {
          gradeClassId: this.dataItem.gradeClassid,
          homeworkId: this.dataItem.homeworkId
        }
      })
      .then(res => {
        this.englishSpeakingList = res.data.infos
        this.studentAnswerList = this.englishSpeakingList[0].studentAnswerList
      })
  },
  methods: {
    selectItem(t, id) {
      this.selectType = t
      this.englishSpeakingList.forEach(item => {
        if (item.homeworkQuestionId == id) {
          this.studentAnswerList = item.studentAnswerList
        }
      })
    },
    handleSort(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.studentAnswerList.sort((a, b) => {
        return s == 'Asc'
          ? (a[n] == undefined ? 0 : Number(a[n])) -
              (b[n] == undefined ? 0 : Number(b[n]))
          : (b[n] == undefined ? 0 : Number(b[n])) -
              (a[n] == undefined ? 0 : Number(a[n]))
      })
    },
    viewWord() {
      this.showWordViewWrap = true
    },
    close() {
      this.showWordViewWrap = false
    },
    toPage(path, id, name) {
      localStorage.setItem('studentName', name)
      localStorage.setItem('t', 2)
      localforage
        .setItem('performanceList', this.studentAnswerList)
        .then(() => {
          localforage.setItem('studentInfoId', id).then(() => {
            this.$router.push({
              name: path,
              params: {
                studentInfoId: id,
                dataItem: this.dataItem,
                performanceList: this.studentAnswerList
              }
            })
          })
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.english-speaking-work-statistics-wrap {
  @include wh(1200px, 100%);
  margin: 0 auto;
  .nav {
    @include wh(1200px, auto);
    overflow: auto;
    height: 60px;
    @include fj(flex-start);
    align-items: center;
    a,
    span {
      float: left;
      margin-left: 5px;
      @include sc(14px, #5e84ad);
    }
  }
  .el-progress--circle .el-progress__text,
  .el-progress--dashboard .el-progress__text {
    top: 40%;
    font-size: 49px !important;
    color: #53a2f1;
  }
  .el-table td,
  .el-table th {
    height: 50px;
    padding: 0;
  }
  .el-table .cell {
    text-align: center;
  }
  .el-table__row td:nth-child(1) .cell {
    color: #1059ff;
  }
  .el-table__header-wrapper {
    display: none;
  }
  .english-speaking-work-statistics-infos {
    @include wh(100%, 88%);
    background: #fff;
    display: flex;
    flex-direction: column;
    .english-speaking-work-statistics-infos-top {
      @include wh(94%, 50px);
      margin: 0 auto;
      border-bottom: 1px solid rgba(225, 232, 238, 1);
      @include fj(flex-start);
      align-items: center;
      flex: 0 0 50px;
      position: relative;
      > span {
        height: 17px;
        padding: 0 15px;
        @include fj(center);
        align-items: center;
        border-right: 1px solid rgba(244, 244, 244, 1);
        i:nth-child(1) {
          @include sc(12px, #999);
        }
        i:nth-child(2) {
          @include sc(14px, #5e84ad);
          margin-left: 18px;
        }
      }
      > span:nth-child(3) {
        border-right: 0;
      }
      > span:nth-child(1) {
        padding-left: 0;
      }
      > span:nth-child(4) {
        @include wh(50px, auto);
        background: rgba(239, 144, 81, 0);
        border: 1px solid rgba(16, 89, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
        border-radius: 25px;
        position: absolute;
        right: -100px;
        top: 10px;
        @include fj(center);
        align-items: center;
        @include sc(16px, rgba(16, 89, 255, 1));
        font-weight: bold;
        cursor: pointer;
        padding: 20px 20px;
      }
    }
    .english-speaking-work-statistics-infos-bottom {
      @include wh(94%, auto);
      margin: 0 auto;
      @include fj();
      flex: auto;
      padding-top: 10px;
      overflow: scroll;
      .english-speaking-work-statistics-infos-bottom-l {
        @include wh(800px, 100%);
        flex: 0 0 800px;
        overflow: scroll;
        > div {
          @include wh(98%, 84px);
          @include fj();
          align-items: center;
          margin-top: 20px;
          > div:nth-child(1) {
            @include wh(97%, 100%);
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(222, 222, 222, 1);
            @include fj();
            align-items: center;
            > p {
              width: 80%;
              height: 30px;
              overflow: hidden;
              word-break: break-all;
              padding-left: 15px;
              font-size: 16px;
            }
            p.hover-p {
              color: #1059fe;
            }
            span:nth-child(2) {
              @include wh(1px, 70%);
              background: rgba(213, 213, 213, 1);
            }
            span:nth-child(3) {
              margin-right: 30px;
              @include fj(space-around);
              flex-direction: column;
              align-items: center;
              i:nth-child(1) {
                @include sc(30px, #0810a1);
              }
              i:nth-child(2) {
                @include sc(14px, #aaa);
              }
            }
          }
          div.hover-div {
            border: 1px solid rgba(16, 89, 254, 1);
          }
          > img {
            @include wh(13px, 19px);
          }
        }
      }
      .english-speaking-work-statistics-infos-bottom-r {
        display: flex;
        flex-direction: column;
        flex: auto;
        @include wh(auto, 100%);
        overflow: auto;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 0px 4px 4px 4px;
        > div:nth-child(1) {
          @include wh(96%, 50px);
          margin: 10px auto 0;
          background: #bbd7ff;
          border: 1px solid rgba(187, 215, 255, 1);
          border-radius: 5px 5px 0px 0px;
          @include fj(space-around);
          @include sc(15px, #5e84ad);
          align-items: center;
          flex: 0 0 50px;
          span {
            width: 50%;
            text-align: center;
          }
        }
        > div:nth-child(2) {
          @include wh(96%, auto);
          margin: 0 auto;
          flex: auto;
          overflow: scroll;
          padding-bottom: 20px;
          border: 1px solid #ddd;
          > div {
            @include wh(100%, 50px);
            @include fj();
            cursor: pointer;
            p {
              @include wh(50%, 50px);
              @include fj(center);
              align-items: center;
              @include sc(15px, #333333);
              span {
                @include sc(15px, rgba(255, 39, 39, 1));
              }
            }
            p.wz {
              color: rgb(255, 99, 101);
            }
          }
          > div:nth-of-type(even) {
            background: #fafbfe;
          }
        }
      }
    }
  }
}
.sort {
  width: 10% !important;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}
.sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
.sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 4px;
}
.sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 6px;
}
.sort-caret.ascending.active {
  border-bottom-color: #409eff;
}
.sort-caret.descending.active {
  border-top-color: #409eff;
}
</style>
