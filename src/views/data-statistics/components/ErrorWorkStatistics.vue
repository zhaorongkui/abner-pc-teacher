<template>
  <div class="error-work-statistics-wrap">
    <div class="nav">
      <router-link to="./work">作业 &nbsp;&nbsp;></router-link>
      <router-link to="/work-grading-assignment" v-if="pathType != 1"
        >&nbsp;&nbsp;学生列表 &nbsp;></router-link
      >
      <span>&nbsp;&nbsp;数据分析</span>
    </div>
    <div class="error-work-statistics">
      <div class="error-work-statistics-infos">
        <div class="error-work-statistics-infos-top">
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
          <span @click="toPage('work-grading-assignment', dataItem)"
            >学生列表</span
          >
        </div>
        <div class="error-work-statistics-infos-bottom">
          <div class="error-work-statistics-infos-bottom-left">
            <img
              src="../../../assets/img/publish/homework_tongji_wrong.png"
              alt=""
            />
            <div>
              <span
                >{{
                  100 -
                    parseInt(
                      errorHomeworkStatisticalInfo.trueRate != undefined
                        ? errorHomeworkStatisticalInfo.trueRate
                        : 0
                    )
                }}<i>%</i></span
              >
              <span>错误率</span>
            </div>
          </div>
          <div class="error-work-statistics-infos-bottom-right">
            <div>
              <div
                id="myChart"
                :style="{ width: '200px', height: '200px' }"
              ></div>
            </div>
            <div>
              <div
                class="wt"
                v-if="
                  errorHomeworkStatisticalInfo.unFinishStudentCount !=
                    undefined &&
                    errorHomeworkStatisticalInfo.unFinishStudentCount != 0
                "
              >
                <span></span>
                <span>
                  <i @click="showDialogBtn"
                    >未完成
                    {{ errorHomeworkStatisticalInfo.unFinishStudentCount }}人</i
                  >
                  <i
                    >{{ errorHomeworkStatisticalInfo.unFinishStudentRate }}%</i
                  ></span
                >
              </div>
              <div class="yt">
                <span></span>
                <div>
                  <span>
                    <i>
                      已完成
                      {{ errorHomeworkStatisticalInfo.finishStudentCount }}人</i
                    >

                    <i>{{ errorHomeworkStatisticalInfo.finishStudentRate }}%</i>
                  </span>
                  <span>
                    <i
                      >待批阅
                      {{ errorHomeworkStatisticalInfo.unReviewCount }}人</i
                    >
                    <i
                      >{{ errorHomeworkStatisticalInfo.unReviewRate }}%</i
                    ></span
                  >
                  <span
                    ><i
                      >已批阅
                      {{ errorHomeworkStatisticalInfo.reviewCount }}人</i
                    >
                    <i>{{ errorHomeworkStatisticalInfo.reviewRate }}%</i></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="error-work-statistics-list">
        <div>
          <span
            >本次错题人数
            <span class="sort">
              <i
                class="sort-caret ascending"
                :class="
                  sortColumn === 'wrongStudentCount' && sortRule === 'Asc'
                    ? 'active'
                    : ''
                "
                @click="handleSort('wrongStudentCount', 'Asc')"
              ></i>
              <i
                class="sort-caret descending"
                :class="
                  sortColumn === 'wrongStudentCount' && sortRule === 'Desc'
                    ? 'active'
                    : ''
                "
                @click="handleSort('wrongStudentCount', 'Desc')"
              ></i> </span
          ></span>
          <span
            >错误率<span class="sort">
              <i
                class="sort-caret ascending"
                :class="
                  sortColumn === 'result' && sortRule === 'Asc' ? 'active' : ''
                "
                @click="handleSort('result', 'Asc')"
              ></i>
              <i
                class="sort-caret descending"
                :class="
                  sortColumn === 'result' && sortRule === 'Desc' ? 'active' : ''
                "
                @click="handleSort('result', 'Desc')"
              ></i> </span
          ></span>
        </div>
        <div style="scrollbar-width: none;">
          <div
            class="subject-item"
            v-for="(item, index) in errorHomeworkQuestionList"
            :key="index"
            @click="toPage('work-answer-results', item.homeworkQuestionId)"
          >
            <p v-html="item.questionStem"></p>
            <p>
              <span>
                <i>本次错题人数</i>
                <i
                  ><i>{{ item.wrongStudentCount }}</i
                  ><i>/{{ item.studentNum }}</i></i
                >
              </span>
              <span>
                <i>错误率</i>
                <i
                  ><i>{{ 100 - parseInt(item.result) }}</i
                  ><i>%</i></i
                >
              </span>
            </p>
            <div @click.stop="showfullScreen(item.questionInfoId)">
              <img src="../../../assets/img/publish/qp.png" alt="" />
              <span>全屏展示</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FullScreen
      v-if="showFullScreen"
      :workbookPageQuestionnumList="workbookPageQuestionnumList"
      :fullid="fullid"
      @toParentsClose="closefullScreen"
    ></FullScreen>
    <Dialog
      v-if="showDialog"
      @toParentsEvent="close"
      :dataItem="dataItem"
    ></Dialog>
  </div>
</template>

<script>
import localforage from 'localforage'
import FullScreen from './FullScreen'
import Dialog from '../../../components/Dialog'

export default {
  name: '',
  props: ['dataItem', 'pathType'],
  data() {
    return {
      errorHomeworkQuestionList: [],
      workbookPageQuestionnumList: [],
      errorHomeworkStatisticalInfo: {},
      sortColumn: '',
      sortRule: 'Asc',
      questionIds: [],
      fullid: '',
      showFullScreen: false,
      showDialog: false
    }
  },

  computed: {},
  components: {
    FullScreen,
    Dialog
  },
  mounted() {
    this.errorHomeworkStatistical()
  },
  methods: {
    showDialogBtn() {
      this.showDialog = true
    },
    close(val) {
      this.showDialog = val
    },
    toPage(path, id) {
      localforage.removeItem('workListItemHomeWorkType').then(function() {})
      localforage.setItem('homeworkQuestionId', id).then(() => {
        this.$router.push({
          name: path,
          params: { homeworkQuestionId: id, dataItem: this.dataItem }
        })
      })
    },
    showfullScreen(id) {
      this.showFullScreen = true
      this.fullid = id
    },
    closefullScreen() {
      this.showFullScreen = false
    },
    handleSort(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.errorHomeworkQuestionList.sort((a, b) => {
        return s == 'Asc'
          ? Number(a[n]) - Number(b[n])
          : Number(b[n]) - Number(a[n])
      })
    },
    errorHomeworkStatistical() {
      this.$http
        .get('/api/teacher/homework/statistical/index', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId,
            homeworkType: this.dataItem.homeworkType
          }
        })
        .then(res => {
          this.errorHomeworkQuestionList = res.data.infos.questionList
          this.errorHomeworkQuestionList.forEach(item => {
            this.questionIds.push(item.questionInfoId)
          })
          localforage
            .setItem('dailyList', this.errorHomeworkQuestionList)
            .then(() => {})
          this.errorHomeworkStatisticalInfo = res.data.infos.statisticalInfo
          this.$nextTick().then(() => {
            this.drawPie()
          })
          this.errorHomeworkAll()
        })
    },
    errorHomeworkAll() {
      this.$http
        .get('/api/question/queryByQuestionIds', {
          params: {
            questionIds: this.questionIds.join(','),
            section: this.$store.state.userInfo.section,
            subjectAbbreviation: this.$store.state.userInfo.subjectAbbreviation,
            teacherId: this.$store.state.userInfo.teacherId
          }
        })
        .then(res => {
          this.workbookPageQuestionnumList = res.data.infos
        })
    },
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        color: ['#13A99F', '#DDDDDD'],
        series: [
          {
            type: 'pie',
            radius: ['0%', '45%'],
            data: [
              { value: this.errorHomeworkStatisticalInfo.finishStudentRate },
              { value: this.errorHomeworkStatisticalInfo.unFinishStudentRate }
            ],
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['50%', '52%'],
            data: [
              { value: this.errorHomeworkStatisticalInfo.finishStudentRate },
              { value: this.errorHomeworkStatisticalInfo.unFinishStudentRate }
            ],
            labelLine: {
              show: false
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.error-work-statistics-wrap {
  #myChart {
    > div {
      width: 250px !important;
      height: 250px !important;
    }
  }
  canvas {
    width: 250px !important;
    height: 250px !important;
    top: -25px !important;
    left: -15px !important;
  }
  @include wh(1200px, 100%);

  margin: 0 auto;
  .nav {
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
  .error-work-statistics {
    display: flex;
    flex-direction: column;
    height: 91%;

    .error-work-statistics-infos {
      @include wh(100%, 230px);
      background: #fff;
      // display: flex;
      flex-direction: column;
      .error-work-statistics-infos-top {
        @include wh(96%, 50px);
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
        > span:nth-child(4) {
          @include wh(50px, auto);
          background: rgba(239, 144, 81, 0);
          border: 1px solid rgba(16, 89, 255, 1);
          box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
          border-radius: 25px;
          position: absolute;
          right: -90px;
          top: 10px;
          @include fj(center);
          align-items: center;
          @include sc(16px, rgba(16, 89, 255, 1));
          font-weight: bold;
          cursor: pointer;
          padding: 20px 20px;
        }
      }
      .error-work-statistics-infos-bottom {
        @include wh(96%, 160px);
        margin: 0 auto;
        @include fj(space-around);
        align-items: center;
        flex: auto;
        .error-work-statistics-infos-bottom-left {
          @include wh(300px, 120px);
          background: url(../../../assets/img/publish/bg_homework_tongji_wrong.png)
            no-repeat center;
          @include fj(center);
          align-items: center;
          img {
            @include wh(68x, 68px);
          }
          div {
            margin-left: 23px;
            margin-top: -10px;
            @include wh(100px, auto);
            @include fj(flex-start);
            align-items: center;
            flex-direction: column;
            span:nth-child(1) {
              @include sc(38px, #fff);
              i {
                @include sc(14px, #fff);
              }
            }
            span:nth-child(2) {
              @include sc(14px, #fff);
            }
          }
        }
        .error-work-statistics-infos-bottom-right {
          @include wh(400px, 160px);
          @include fj();
          align-items: center;
          margin-left: 200px;
          > div:nth-child(1) {
          }
          > div:nth-child(2) {
            > div.wt {
              @include wh(197px, 38px);
              background: rgba(221, 221, 221, 0.04);
              border: 1px solid rgba(221, 221, 221, 1);
              @include fj(flex-start);
              align-items: center;
              span:nth-child(1) {
                @include wh(11px, 11px);
                background: rgba(221, 221, 221, 1);
                border-radius: 50%;
                margin: 0 8px 0 10px;
              }
              span:nth-child(2) {
                @include sc(14px, #7b8187);
                @include fj();
                align-items: center;

                i:nth-child(1) {
                  text-decoration: underline;
                  display: block;
                  margin-right: 10px;
                  cursor: pointer;
                }
                i:nth-child(2) {
                  padding: 0px 10px;
                  background: rgba(0, 0, 0, 0.15);
                  border-radius: 6px;
                }
              }
            }
            > div.yt {
              @include wh(197px, 100px);
              background: rgba(19, 169, 159, 0.04);
              border: 1px solid rgba(19, 169, 159, 1);
              @include fj(flex-start);
              align-items: top;
              margin-top: 10px;
              > span {
                @include wh(11px, 11px);
                background: rgba(19, 169, 159, 1);
                border-radius: 50%;
                margin: 14px 8px 0 11px;
              }
              > div {
                @include fj(center);
                align-items: flex-start;
                flex-direction: column;
                span {
                  @include fj();
                  align-items: center;
                  margin-right: 10px;

                  i:nth-child(1) {
                    display: block;
                    margin-right: 10px;
                  }
                  i:nth-child(2) {
                    display: block;
                    margin-right: 10px;
                    padding: 0px 10px;
                    background: rgba(19, 169, 159, 0.15);
                    border-radius: 6px;
                  }
                }
                span:nth-child(1) {
                  @include sc(14px, #13a99f);
                  padding-bottom: 5px;
                  border-bottom: 1px solid rgba(222, 235, 234, 1);
                }
                span:nth-child(2) {
                  @include sc(14px, #13a99f);
                  margin: 6px 0 6px 0;
                }
                span:nth-child(3) {
                  @include sc(14px, #13a99f);
                }
              }
            }
          }
        }
      }
    }
    .error-work-statistics-list {
      @include wh(100%, auto);
      flex: auto;
      margin-top: 10px;
      background: #fff;
      padding-bottom: 5px;
      overflow: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      > div:nth-of-type(1) {
        @include wh(95%, 50px);
        background: rgba(241, 246, 254, 1);
        border: 1px solid rgba(187, 215, 255, 1);
        border-radius: 4px;
        @include fj(flex-start);
        align-items: center;
        position: absolute;
        left: 2.5%;
        top: 10px;
        flex: 0 0 50px;
        > span {
          @include wh(100px, auto);
          @include sc(14px, #5e84ad);
          @include fj(flex-start);
          align-items: center;
        }
        > span:nth-child(1) {
          margin: 0 100px 0 20px;
        }
        > span:nth-child(2) {
        }
      }
      > div:nth-of-type(2) {
        scrollbar-width: none;
        @include wh(1150px, auto);
        overflow: scroll;
        margin: 70px auto 0;
        overflow: auto;
        flex: auto;
        scrollbar-width: none;
        > div.subject-item {
          @include wh(370px, 170px);
          float: left;
          margin: 10px 0px 0 10px;
          overflow: auto;
          @include fj();
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          position: relative;
          > p:nth-child(1) {
            @include wh(352px, 67px);
            margin: 10px auto 0;
            overflow: hidden;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          > p:nth-child(2) {
            @include wh(100%, 60px);
            background: rgba(250, 251, 255, 1);
            border-radius: 5px;
            @include fj();
            align-items: center;
            padding: 0 20px;
            span {
              height: 36px;
              @include fj(flex-start);
              align-items: flex-end;
              > i:nth-child(1) {
                @include sc(14px, #aaa);
                float: left;
              }
              > i:nth-child(2) {
                margin-left: 10px;
                float: left;
                @include fj(center);
                align-items: flex-end;
                i:nth-child(1) {
                  @include sc(30px, #4e5f71);
                  line-height: 34px;
                }
                i:nth-child(2) {
                  @include sc(20px, #4e5f71);
                  line-height: 25px;
                }
              }
            }
          }
          > div {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 99;
            background: #aaa;
            @include fj(center);
            align-items: center;
            @include wh(90px, 26px);
            cursor: pointer;
            img {
              @include wh(12px, 12px);
            }
            span {
              margin-left: 6px;
              @include sc(12px, #fff);
            }
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
  margin: 0 !important;
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
