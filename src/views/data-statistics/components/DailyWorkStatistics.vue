<template>
  <div class="daily-work-statistics-wrap">
    <div class="nav">
      <router-link to="./work">作业 &nbsp;&nbsp;></router-link>
      <router-link to="/work-grading-assignment" v-if="pathType == 2"
        >&nbsp;&nbsp;学生列表 &nbsp;></router-link
      >
      <span>&nbsp;&nbsp;数据分析</span>
    </div>
    <div class="daily-work-statistics">
      <div class="daily-work-statistics-infos">
        <div class="daily-work-statistics-infos-top">
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
        <div class="daily-work-statistics-infos-bottom">
          <div
            class="daily-english-work-statistics-infos-bottom-left daily-work-statistics-infos-bottom-left"
            v-if="subjectAbbreviation == 'yingyu'"
          >
            <img
              src="../../../assets/img/publish/homework_tongji_defen.png"
              alt=""
            />
            <div>
              <span
                >{{ dailyHomeworkStatisticalInfo.avageScore
                }}<i>/{{ dailyHomeworkStatisticalInfo.totalScore }}</i></span
              >
              <span>平均得分</span>
            </div>
          </div>
          <div class="daily-work-statistics-infos-bottom-left">
            <img
              src="../../../assets/img/publish/homework_tongji_zq.png"
              alt=""
            />
            <div>
              <span
                >{{
                  dailyHomeworkStatisticalInfo.trueRate != undefined
                    ? dailyHomeworkStatisticalInfo.trueRate
                    : 0
                }}<i>%</i></span
              >
              <span>正确率</span>
            </div>
          </div>
          <div class="daily-work-statistics-infos-bottom-right">
            <div>
              <div
                id="myChart"
                :style="{ width: '155px', height: '155px' }"
              ></div>
            </div>
            <div>
              <div
                class="wt"
                v-if="
                  dailyHomeworkStatisticalInfo.unFinishStudentCount !=
                    undefined &&
                    dailyHomeworkStatisticalInfo.unFinishStudentCount != 0
                "
              >
                <span></span>
                <span>
                  <i @click="showDialogBtn"
                    >未完成
                    {{ dailyHomeworkStatisticalInfo.unFinishStudentCount }}人</i
                  >
                  <i
                    >{{ dailyHomeworkStatisticalInfo.unFinishStudentRate }}%</i
                  ></span
                >
              </div>
              <div class="yt">
                <span></span>
                <div>
                  <span>
                    <i
                      >已完成
                      {{ dailyHomeworkStatisticalInfo.finishStudentCount }}人</i
                    >
                    <i
                      >{{ dailyHomeworkStatisticalInfo.finishStudentRate }}%</i
                    ></span
                  >
                  <span>
                    <i
                      >待批阅
                      {{ dailyHomeworkStatisticalInfo.unReviewCount }}人</i
                    >
                    <i
                      >{{ dailyHomeworkStatisticalInfo.unReviewRate }}%</i
                    ></span
                  >
                  <span>
                    <i
                      >已批阅
                      {{ dailyHomeworkStatisticalInfo.reviewCount }}人</i
                    >

                    <i>{{ dailyHomeworkStatisticalInfo.reviewRate }}%</i></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="daily-work-statistics-list">
        <div>
          <span v-if="subjectAbbreviation == 'yingyu'">
            平均得分
            <span class="sort">
              <i
                class="sort-caret ascending"
                :class="
                  sortColumn === 'avageScore' && sortRule === 'Asc'
                    ? 'active'
                    : ''
                "
                @click="handleSort('avageScore', 'Asc')"
              ></i>
              <i
                class="sort-caret descending"
                :class="
                  sortColumn === 'avageScore' && sortRule === 'Desc'
                    ? 'active'
                    : ''
                "
                @click="handleSort('avageScore', 'Desc')"
              ></i>
            </span>
          </span>
          <span>
            正确率
            <span class="sort">
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
              ></i>
            </span>
          </span>
        </div>
        <div style="scrollbar-width: none;">
          <div
            class="subject-item"
            v-for="(item, index) in dailyHomeworkQuestionList"
            :key="index"
            @click="toPage('work-answer-results', item.homeworkQuestionId)"
          >
            <p v-html="item.questionStem"></p>
            <p>
              <span v-if="subjectAbbreviation == 'yingyu'">
                <i>平均得分</i>
                <i
                  ><i>{{ item.avageScore }}</i
                  ><i>/{{ item.questionScore }}</i></i
                >
              </span>
              <span>
                <i>正确率</i>
                <i
                  ><i>{{ item.result }}</i
                  ><i>%</i></i
                >
              </span>
              <span>
                <i>错误人数</i>
                <i>{{ item.wrongStudentCount }}</i>
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
      workbookPageQuestionnumList: [],
      fullid: '',
      showFullScreen: false,
      dailyHomeworkQuestionList: [],
      dailyHomeworkStatisticalInfo: {},
      questionIds: [],
      subjectAbbreviation: '',
      sortColumn: '',
      sortRule: 'Asc',
      showDialog: false
    }
  },

  computed: {},
  components: {
    FullScreen,
    Dialog
  },
  created() {
    window.addEventListener('pageshow', function(event) {
      console.log(event)
    })
  },
  mounted() {
    console.log(this.pathType)
    this.subjectAbbreviation = this.$store.state.userInfo.subjectAbbreviation
    this.dailyHomeworkStatistical()
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
    handleSort(n, s) {
      this.sortColumn = n
      this.sortRule = s
      this.dailyHomeworkQuestionList.sort((a, b) => {
        return s == 'Asc'
          ? Number(a[n]) - Number(b[n])
          : Number(b[n]) - Number(a[n])
      })
      var arr = []
      this.dailyHomeworkQuestionList.forEach(item => {
        this.workbookPageQuestionnumList.forEach(items => {
          if (item.questionInfoId == items.questionInfoId) {
            arr.push(items)
          }
        })
      })
      this.workbookPageQuestionnumList = arr
    },
    showfullScreen(id) {
      this.showFullScreen = true
      this.fullid = id
    },
    closefullScreen() {
      this.showFullScreen = false
    },
    dailyHomeworkStatistical() {
      this.$http
        .get('/api/teacher/homework/statistical/index', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId,
            homeworkType: this.dataItem.homeworkType
          }
        })
        .then(res => {
          this.dailyHomeworkQuestionList =
            res.data.infos.questionList != undefined
              ? res.data.infos.questionList
              : []
          this.dailyHomeworkQuestionList.forEach(item => {
            this.questionIds.push(item.questionInfoId)
          })
          localforage
            .setItem('dailyList', this.dailyHomeworkQuestionList)
            .then(() => {})
          this.dailyHomeworkStatisticalInfo = res.data.infos.statisticalInfo
          this.$nextTick().then(() => {
            this.drawPie()
          })
          this.dailyHomeworkAll()
        })
    },
    dailyHomeworkAll() {
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
            radius: ['0%', '85%'],
            data: [
              { value: this.dailyHomeworkStatisticalInfo.finishStudentRate },
              { value: this.dailyHomeworkStatisticalInfo.unFinishStudentRate }
            ],
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['90%', '92%'],
            data: [
              { value: this.dailyHomeworkStatisticalInfo.finishStudentRate },
              { value: this.dailyHomeworkStatisticalInfo.unFinishStudentRate }
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
.daily-work-statistics-wrap {
  // #myChart {
  //   > div {
  //     width: 250px !important;
  //     height: 250px !important;
  //   }
  // }
  // canvas {
  //   width: 250px !important;
  //   height: 250px !important;
  //   top: -25px !important;
  //   left: -15px !important;
  // }
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
  .daily-work-statistics {
    display: flex;
    flex-direction: column;
    height: 91%;
    .daily-work-statistics-infos {
      @include wh(100%, 230px);
      background: #fff;
      //display: flex;
      flex-direction: column;
      .daily-work-statistics-infos-top {
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
      .daily-work-statistics-infos-bottom {
        @include wh(96%, 160px);
        margin: 0 auto;
        @include fj(space-around);
        align-items: center;
        flex: auto;
        .daily-work-statistics-infos-bottom-left {
          @include wh(300px, 120px);
          background: url(../../../assets/img/publish/bg_homework_tongji_zq.png)
            no-repeat center;
          @include fj(center);
          align-items: center;
          margin: 0 0px 0 20px;
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
        .daily-english-work-statistics-infos-bottom-left:nth-child(1) {
          background: url(../../../assets/img/publish/bg_homework_tongji_defen.png)
            no-repeat center;
        }
        .daily-work-statistics-infos-bottom-right {
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
                  //border-bottom: 1px solid rgba(222, 235, 234, 1);
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
    .daily-work-statistics-list {
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
        @include wh(1150px, auto);
        overflow: scroll;
        margin: 70px auto 0;
        overflow: auto;
        flex: auto;
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
            @include wh(352px, 70px);
            margin: 10px auto 0;
            overflow: hidden;
          }
          > p:nth-child(2) {
            @include wh(100%, 60px);
            background: rgba(250, 251, 255, 1);
            border-radius: 5px;
            @include fj();
            align-items: center;
            padding: 0 8px;
            span {
              height: 36px;
              @include fj(flex-start);
              align-items: flex-end;
              > i:nth-child(1) {
                @include sc(14px, #aaa);
                float: left;
              }
              > i:nth-child(2) {
                @include sc(28px, #4e5f71);
                line-height: 30px;
                margin-left: 5px;
                @include fj(flex-start);
                align-items: flex-end;
                i:nth-child(1) {
                  @include sc(28px, #4e5f71);
                  line-height: 33px;
                }
                i:nth-child(2) {
                  @include sc(14px, #4e5f71);
                  line-height: 21px;
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
