<template>
  <div class="word-work-statistics-wrap">
    <div class="nav">
      <router-link to="/work">作业 &nbsp; &nbsp;></router-link>
      <router-link to="/work-grading-assignment"
        >学生列表 &nbsp; &nbsp;></router-link
      >
      <span>单词统计 </span>
    </div>
    <div class="word-work-statistics-infos">
      <div class="word-work-statistics-infos-top">
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
        <RouterBtn :text="text" :path="routeUrl"></RouterBtn>
      </div>
      <div class="word-work-statistics-infos-bottom">
        <div class="word-work-statistics-infos-bottom-l">
          <div>
            <span></span>
            <span>整体完成情况</span>
          </div>
          <div>
            <div>
              <el-progress
                type="circle"
                :percentage="
                  homeworkMainClass.submitRate != undefined
                    ? Number(homeworkMainClass.submitRate)
                    : 0
                "
                :stroke-width="strokeWidth"
                :width="lineWidth"
              ></el-progress>
            </div>
            <div>
              <span>未提交</span>
              <span>{{
                homeworkMainClass.studentNum -
                  homeworkMainClass.finishStudentNum
              }}</span>
              <span>人</span>
              <span @click="viewStudent">查看</span>
            </div>
          </div>
        </div>
        <div class="word-work-statistics-infos-bottom-r">
          <div>
            <span>单词</span>
            <span>
              综合得分
              <span class="sort">
                <i
                  class="sort-caret ascending"
                  :class="
                    sortColumn === 'result' && sortRule === 'Asc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSorts('result', 'Asc')"
                ></i>
                <i
                  class="sort-caret descending"
                  :class="
                    sortColumn === 'result' && sortRule === 'Desc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSorts('result', 'Desc')"
                ></i>
              </span>
            </span>
          </div>
          <div>
            <p
              v-for="(item, index) in wordPerformanceList"
              :key="index"
              @click="viewWord(item.wordId, item.word, item.isWord)"
            >
              <span>{{ item.word != undefined ? item.word : '--' }}</span>
              <span>{{ item.result != undefined ? item.result : '--' }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="student-view-wrap" v-if="showStudentViewWrap">
      <div class="student-view">
        <div>
          <span
            >未完成的
            {{
              unfinishStudents != undefined ? unfinishStudents.length : 0
            }}人</span
          >
          <img
            src="../../assets/img/publish/close.png"
            alt=""
            @click="closes"
          />
        </div>
        <div>
          <span v-for="(item, index) in unfinishStudents" :key="index">{{
            item.studentName
          }}</span>
        </div>
        <div @click="remind" class="normal-btn" v-if="remindId == 1">
          提醒他们做作业
        </div>
        <div class="active-btn" v-else>
          提醒他们做作业
        </div>
      </div>
    </div>

    <div class="word-view-wrap" v-if="showWordViewWrap">
      <div class="word-view">
        <div>
          <span>{{ viewword }}</span>
          <img src="../../assets/img/publish/close.png" alt="" @click="close" />
        </div>
        <div>
          <div>
            <span>学生姓名</span>
            <span
              >综合得分
              <span class="sort">
                <i
                  class="sort-caret ascending"
                  :class="
                    sortColumn === 'wordSyntheticalScore' && sortRule === 'Asc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordSyntheticalScore', 'Asc')"
                ></i>
                <i
                  class="sort-caret descending"
                  :class="
                    sortColumn === 'wordSyntheticalScore' && sortRule === 'Desc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordSyntheticalScore', 'Desc')"
                ></i>
              </span>
            </span>
            <span v-if="homeworkQuestionType.indexOf('3') != -1 && isWord == 1"
              >跟读平均分
              <span class="sort">
                <i
                  class="sort-caret ascending"
                  :class="
                    sortColumn === 'wordReadFollow' && sortRule === 'Asc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordReadFollow', 'Asc')"
                ></i>
                <i
                  class="sort-caret descending"
                  :class="
                    sortColumn === 'wordReadFollow' && sortRule === 'Desc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordReadFollow', 'Desc')"
                ></i> </span
            ></span>
            <span v-if="homeworkQuestionType.indexOf('4') != -1 && isWord == 1"
              >听写正确率
              <span class="sort">
                <i
                  class="sort-caret ascending"
                  :class="
                    sortColumn === 'wordListenWrite' && sortRule === 'Asc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordListenWrite', 'Asc')"
                ></i>
                <i
                  class="sort-caret descending"
                  :class="
                    sortColumn === 'wordListenWrite' && sortRule === 'Desc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordListenWrite', 'Desc')"
                ></i> </span
            ></span>
            <span v-if="homeworkQuestionType.indexOf('5') != -1"
              >英译汉正确率
              <span class="sort">
                <i
                  class="sort-caret ascending"
                  :class="
                    sortColumn === 'wordEnglishChina' && sortRule === 'Asc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordEnglishChina', 'Asc')"
                ></i>
                <i
                  class="sort-caret descending"
                  :class="
                    sortColumn === 'wordEnglishChina' && sortRule === 'Desc'
                      ? 'active'
                      : ''
                  "
                  @click="handleSort('wordEnglishChina', 'Desc')"
                ></i> </span
            ></span>
          </div>
          <div>
            <p v-for="(item, index) in viewWordlist" :key="index">
              <span>{{ item.studentName }}</span>
              <span>{{
                item.wordSyntheticalScore != undefined
                  ? item.wordSyntheticalScore
                  : '--'
              }}</span>
              <span
                v-if="homeworkQuestionType.indexOf('3') != -1 && isWord == 1"
                >{{
                  item.wordReadFollow != undefined ? item.wordReadFollow : '--'
                }}</span
              >
              <span
                v-if="homeworkQuestionType.indexOf('4') != -1 && isWord == 1"
                >{{
                  item.wordListenWrite != undefined
                    ? item.wordListenWrite
                    : '--'
                }}</span
              >
              <span v-if="homeworkQuestionType.indexOf('5') != -1">{{
                item.wordEnglishChina != undefined
                  ? item.wordEnglishChina
                  : '--'
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import RouterBtn from '../../components/RouterBtn'
export default {
  name: '',
  data() {
    return {
      lineWidth: 218,
      strokeWidth: 12,
      showHeader: false,
      showWordViewWrap: false,
      showStudentViewWrap: false,
      dataItem: [],
      wordPerformanceList: [],
      unfinishStudents: [],
      homeworkMainClass: {},
      sortColumn: '',
      sortRule: 'Asc',
      text: '学生列表',
      routeUrl: '/work-grading-assignment',
      studentIdsList: [],
      remindId: '',
      viewWordlist: [],
      homeworkQuestionType: '',
      viewword: '',
      isWord: ''
    }
  },
  computed: {},
  components: {
    RouterBtn
  },
  mounted() {
    localforage.getItem('workListItem').then(value => {
      this.dataItem = value
      this.wordPerformance()
    })
  },
  methods: {
    handleSort(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.viewWordlist.sort((a, b) => {
        return s == 'Asc'
          ? (a[n] == undefined ? 0 : Number(a[n])) -
              (b[n] == undefined ? 0 : Number(b[n]))
          : (b[n] == undefined ? 0 : Number(b[n])) -
              (a[n] == undefined ? 0 : Number(a[n]))
      })
    },
    handleSorts(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.wordPerformanceList.sort((a, b) => {
        return s == 'Asc'
          ? (a[n] == undefined ? 0 : Number(a[n])) -
              (b[n] == undefined ? 0 : Number(b[n]))
          : (b[n] == undefined ? 0 : Number(b[n])) -
              (a[n] == undefined ? 0 : Number(a[n]))
      })
    },
    //查看未提交学生数
    viewStudent() {
      this.showStudentViewWrap = true
      this.unfinishStudent()
    },
    closes() {
      this.showStudentViewWrap = false
    },
    //查看单词统计
    viewWord(id, word, isWord) {
      this.isWord = isWord
      this.viewword = word
      this.showWordViewWrap = true
      this.$http
        .get('/api/teacher/homework/class/word/student', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId,
            questionId: id
          }
        })
        .then(res => {
          this.viewWordlist = res.data.infos
          this.homeworkQuestionType = res.data.infos[0].homeworkQuestionType
        })
    },
    close() {
      this.showWordViewWrap = false
    },
    //一键提醒
    remind() {
      this.$http
        .post('/api/teacher/homework/remind', {
          homeworkClassId: this.dataItem.homeworkClassId,
          studentIds:
            this.studentIdsList != undefined
              ? this.studentIdsList.join(',')
              : '',
          teacherId: this.$store.state.userInfo.teacherId
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.showStudentViewWrap = false
            this.$message.success('已经提醒学生去完成作业')
          }
        })
    },
    unfinishStudent() {
      this.$http
        .get('/api/teacher/homework/unfinish/students', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId
          }
        })
        .then(res => {
          this.remindId = res.data.infos.remind
          this.unfinishStudents = res.data.infos.studentList
          this.unfinishStudents.forEach(item => {
            this.studentIdsList.push(item.studentInfoId)
          })
        })
    },
    wordPerformance() {
      this.$http
        .get('/api/teacher/homework/class/word/performance', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId
          }
        })
        .then(res => {
          this.wordPerformanceList =
            res.data.infos.homeworkClassQuestionStatisticalList
          this.homeworkMainClass = res.data.infos.homeworkMainClass
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.word-work-statistics-wrap {
  @include wh(1200px, 100%);
  margin: 0 auto;
  .nav {
    @include wh(1200px, 60px);
    overflow: auto;
    @include fj(flex-start);
    align-items: center;
    a,
    span {
      display: block;
      float: left;
      margin-left: 10px;
      @include sc(14px, #5e84ad);
    }
  }
  .el-progress--circle .el-progress__text,
  .el-progress--dashboard .el-progress__text {
    top: 48%;
    font-size: 49px !important;
    color: #53a2f1;
  }
  tr {
    cursor: pointer !important;
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
  .word-work-statistics-infos {
    @include wh(100%, 88%);
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 0;
    .word-work-statistics-infos-top {
      @include wh(100%, 50px);
      margin: 0 auto;
      border-bottom: 1px solid rgba(225, 232, 238, 1);
      @include fj(flex-start);
      align-items: center;
      flex: 0 0 50px;
      position: relative;
      span {
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
      span:nth-child(3) {
        border-right: 0;
      }
      span:nth-child(1) {
        padding-left: 0;
      }
    }
    .word-work-statistics-infos-bottom {
      @include wh(100%, auto);
      margin: 0 auto;
      @include fj();
      flex: auto;
      padding-top: 10px;
      overflow: scroll;
      .word-work-statistics-infos-bottom-l {
        @include wh(535px, 100%);
        flex: 0 0 535px;
        > div:nth-child(1) {
          display: flex;
          align-items: center;
          height: 30px;
          span:nth-child(1) {
            @include wh(4px, 12px);
            background: rgba(6, 16, 168, 1);
          }
          span:nth-child(2) {
            @include sc(14px, #5e84ad);
            margin-left: 5px;
          }
        }
        > div:nth-child(2) {
          margin: 80px 0 0 0;
          @include fj();
          flex-direction: column;
          align-items: center;
          > div:nth-child(2) {
            width: 200px;
            margin-top: 20px;
            display: flex;
            align-items: flex-end;
            span:nth-child(1) {
              @include sc(14px, #969696);
            }
            span:nth-child(2) {
              @include sc(36px, #0610a8);
              margin: 0 10px;
              line-height: 34px;
            }
            span:nth-child(3) {
              @include sc(14px, #969696);
            }
            span:nth-child(4) {
              display: inline-block;
              @include wh(54px, 34px);
              background: rgba(237, 241, 246, 0);
              border: 1px solid rgba(16, 89, 255, 1);
              box-shadow: 0px 2px 8px 0px rgba(16, 89, 255, 0.27);
              border-radius: 17px;
              margin-left: 10px;
              text-align: center;
              line-height: 30px;
              @include sc(14px, rgba(16, 89, 255, 1));
              cursor: pointer;
            }
          }
        }
      }
      .word-work-statistics-infos-bottom-r {
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
          @include sc(16px, #5e84ad);
          align-items: center;
          flex: 0 0 50px;
          span {
            width: 50%;
            text-align: center;
          }
        }
        > div:nth-child(2) {
          @include wh(95%, 400px);
          margin: 0 auto;
          position: relative;
          z-index: 999;
          overflow: scroll;
          flex: auto;
          p {
            @include wh(100%, auto);
            min-height: 50px;
            @include fj();
            cursor: pointer;
            align-items: center;
            > span {
              width: 50%;
              @include fj(center);
              align-items: center;
              @include sc(16px, #4e5f71);
            }
            > span:nth-child(1) {
              word-break: break-all;
              color: #1059ff;
            }
          }
          p:nth-of-type(odd) {
            background: #fafbfe;
          }
        }
      }
    }
  }
  .word-view-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
    .word-view {
      @include wh(80%, 85%);
      background: #fff;
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
      border-radius: 4px 4px 4px 4px;
      display: flex;
      flex-direction: column;
      padding-bottom: 5px;
      > div:nth-child(1) {
        @include wh(100%, 40px);
        @include fj();
        align-items: center;
        padding: 0 15px;
        border: 1px solid rgba(237, 237, 237, 1);
        flex: 0 0 40px;
        span {
          @include sc(16px, #5e84ad);
        }
        img {
          @include wh(14px, 14px);
        }
      }
      > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        flex: auto;
        overflow: scroll;
        > div:nth-child(1) {
          @include wh(96%, 50px);
          margin: 10px auto 0;
          background: rgba(241, 246, 254, 1);
          border: 1px solid rgba(187, 215, 255, 1);
          border-radius: 5px 5px 0px 0px;
          @include fj(space-around);
          @include sc(16px, #5e84ad);
          align-items: center;
          flex: 0 0 50px;
          span {
            width: 50%;
            @include fj(center);
            align-items: center;
          }
        }
        > div:nth-child(2) {
          height: 100%;
          flex: auto;
          overflow: scroll;
          margin-top: 2px;
          > p {
            @include wh(96%, auto);
            min-height: 50px;
            @include fj();
            cursor: pointer;
            align-items: center;
            margin: 0 auto;
            > span {
              flex: 1;
              @include fj(center);
              align-items: center;
              @include sc(16px, #4e5f71);
            }
            > span:nth-child(1) {
              word-break: break-all;
              color: #1059ff;
            }
          }
          > p:nth-of-type(odd) {
            background: #fafbfe;
          }
        }
      }
    }
  }
  .student-view-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
    .student-view {
      @include wh(500px, 320px);
      background: #fff;
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
      border-radius: 4px 4px 4px 4px;
      display: flex;
      flex-direction: column;
      padding-bottom: 5px;
      overflow: hidden;
      > div:nth-child(1) {
        @include wh(100%, 40px);
        @include fj();
        align-items: center;
        padding: 0 15px;
        border: 1px solid rgba(237, 237, 237, 1);
        flex: 0 0 40px;
        span {
          @include sc(16px, #5e84ad);
        }
        img {
          @include wh(14px, 14px);
        }
      }
      > div:nth-child(2) {
        @include wh(90%, 180px);
        margin: 10px auto 0;
        overflow: scroll;
        span {
          float: left;
          height: 30px;
          padding: 0px 7px;
          background: #f7fafe;
          border-radius: 8px;
          margin: 10px 10px 0 0;
          @include fj(center);
          align-items: center;
          @include sc(14px, #aaa);
        }
      }
      > div.normal-btn {
        @include wh(159px, 36px);
        background: #1059ff;
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        border-radius: 18px;
        @include fj(center);
        align-items: center;
        @include sc(14px, #fefeff);
        margin: 20px auto 0;
        cursor: pointer;
      }
      > div.active-btn {
        @include wh(159px, 36px);
        background: #ddd;
        border-radius: 18px;
        @include fj(center);
        align-items: center;
        @include sc(14px, #fefeff);
        margin: 20px auto 0;
        cursor: pointer;
      }
    }
  }
}
.sort {
  width: 7% !important;
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
