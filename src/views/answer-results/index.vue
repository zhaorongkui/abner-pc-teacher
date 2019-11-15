<template>
  <div class="answer-results-wrap">
    <div class="single-items-wrap">
      <div class="nav">
        <router-link to="./work">作业 &nbsp;></router-link>
        <router-link
          to="./work-data-statistics"
          v-if="dataItem.homeworkType == 1"
          >日常作业 &nbsp;></router-link
        >
        <router-link
          to="./work-data-statistics"
          v-if="dataItem.homeworkType == 2"
          >错题作业 &nbsp;></router-link
        >
        <span>单题统计</span>
      </div>
      <div>
        <SingleItemBtn @toParentsEvent="selectId"></SingleItemBtn>
        <div class="infos">
          <div>
            <a href="javascript:;">
              <span
                ><i>试题来源</i
                ><i>{{ dailyhomeworkInfos.textbookName }}</i></span
              >
              <span></span>
              <span
                ><i>页数</i
                ><i>{{ dailyhomeworkInfos.workbookChapterPage }}</i></span
              >
              <span></span>
              <span
                ><i>题号</i><i>{{ dailyhomeworkInfos.questionNumber }}</i></span
              >
              <span></span>
              <span
                ><i>题型</i
                ><i>{{ dailyhomeworkInfos.questionYytypeName }}</i></span
              >
            </a>
            <a
              href="javascript:;"
              v-if="dailyhomeworkInfos.teacherQuestionCollectonId == undefined"
              class="addsc"
              @click="addStore"
            >
              <img src="../../assets/img/publish/heart.png" alt="" />
              <span>加入收藏</span>
            </a>
            <a href="javascript:;" v-else class="cancelsc" @click="cancleStore">
              <img src="../../assets/img/publish/shoucang.png" alt="" />
              <span>取消收藏</span>
            </a>
          </div>
          <div>
            <StemType :dailyhomeworkInfo="dailyhomeworkInfos"></StemType>

            <!-- 题组 -->
            <div
              class="zd-tongji-tz"
              v-if="dailyhomeworkInfos.questionTypeCode == 4"
            >
              <div>
                <span>作答分析</span>
                <div>
                  <div>
                    <span
                      @click="selecTh(index)"
                      v-anchor="index"
                      v-for="(item, index) in dailyhomeworkInfos.childInfoList
                        .length"
                      :key="index"
                      :class="selecThtype == index ? 'hover-span' : ''"
                      >{{ index + 1 }}</span
                    >
                  </div>
                </div>

                <div>
                  <div
                    id="myChart"
                    :style="{
                      width: '460px',
                      height: '300px',
                      margin: '0px auto 0 '
                    }"
                  ></div>
                </div>
                <img src="../../assets/img/publish/diwen.png" alt="" />
              </div>
            </div>
            <!-- 判断 -->
            <div
              class="zd-tongji-pd"
              v-if="dailyhomeworkInfos.questionTypeCode == 3"
            >
              <div>
                <span>作答分析</span>
                <div>
                  <div
                    id="myChart"
                    :style="{ width: '460px', height: '300px' }"
                  ></div>
                </div>
                <img src="../../assets/img/publish/diwen.png" alt="" />
              </div>
            </div>
            <!-- 主观 -->
            <div
              class="zd-tongji-zg zd-tongji-pd"
              v-if="
                dailyhomeworkInfos.questionTypeCode == 6 ||
                  dailyhomeworkInfos.questionTypeCode == 1 ||
                  dailyhomeworkInfos.questionTypeCode == 2
              "
            >
              <div>
                <span>作答分析</span>
                <div>
                  <div
                    id="myChart"
                    :style="{ width: '460px', height: '300px' }"
                  ></div>
                </div>
                <img src="../../assets/img/publish/diwen.png" alt="" />
              </div>
            </div>
            <!-- 填空 -->
            <div
              class="zd-tongji-zg zd-tongji-pd"
              v-if="
                dailyhomeworkInfos.questionTypeCode == 5 &&
                  dailyhomeworkInfos.questionProperty == 1
              "
            >
              <div>
                <span>作答分析</span>
                <div>
                  <div
                    id="myChart"
                    :style="{ width: '460px', height: '300px' }"
                  ></div>
                </div>
                <img src="../../assets/img/publish/diwen.png" alt="" />
              </div>
            </div>

            <!-- 填空 -->
            <div
              class="zd-tongji-tk"
              v-if="
                dailyhomeworkInfos.questionTypeCode == 5 &&
                  dailyhomeworkInfos.questionProperty == 2
              "
            >
              <span>作答分析</span>
              <div>
                <div>
                  <span>参考答案</span>
                  <span>做对人数</span>
                  <span>做错人数</span>
                  <span>未提交人数</span>
                </div>
                <div>
                  <p
                    v-for="(item, index) in JSON.parse(
                      dailyhomeworkInfos.fullQuestionStatistical
                    )"
                    :key="index"
                  >
                    <span
                      ><i>{{ index + 1 }}</i>
                      <span class="sssssss">
                        <i v-for="(i, index) in item.answer" :key="index">
                          {{ i }}</i
                        >
                      </span>
                    </span>
                    <span>{{ item.trueStudentCount }}</span>
                    <span>{{ item.errorStudentList.length }}</span>
                    <span>{{ item.unSubmitStudentCount }}</span>
                  </p>
                </div>
              </div>
              <img src="../../assets/img/publish/diwen.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-wrap" v-if="showdialogFlag">
        <div class="dialog">
          <p>
            <span
              >错题学生 -
              {{
                dailyhomeworkInfos.errorStudentList != undefined
                  ? dailyhomeworkInfos.errorStudentList.length
                  : 0
              }}
              人</span
            >
            <img
              src="../../assets/img/publish/close.png"
              alt=""
              @click="close"
            />
          </p>
          <div>
            <span
              v-for="(item, index) in dailyhomeworkInfos.errorStudentList"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <Dialog
        v-if="showDialog1"
        @toParentsEvent="closes"
        :dataItem="dataItem"
      ></Dialog>
    </div>
    <ClassifyDialog
      v-if="showDialog"
      @toParentEvents="closeChildDialog"
      @toParentEvent="getId"
      @toParentEventStore="addCollectStore"
    ></ClassifyDialog>
  </div>
</template>

<script>
import localforage from 'localforage'
import SingleItemBtn from './components/SingleItemBtn'
import StemType from './components/StemType'
import ClassifyDialog from './components/ClassifyDialog'
import Dialog from '../../components/Dialog'
export default {
  name: '',
  props: [],
  data() {
    return {
      selecThtype: 0,
      homeworkQuestionId: '',
      dailyhomeworkInfos: [],
      showdialogFlag: false,
      dataItem: '',
      showDialog: false,
      collectonGroupId: 0,
      CollectionInfos: {
        collectonGroupId: '',
        grade: '',
        questionTypeCode: '',
        questionId: '',
        questionInfoId: '',
        questionSourceId: '',
        questionSourceName: '',
        questionUuid: ''
      },
      grade: '',
      showDialog1: false //控制未提交学生弹框
    }
  },

  components: {
    SingleItemBtn,
    StemType,
    ClassifyDialog,
    Dialog
  },
  mounted() {
    this.grade =
      this.$store.state.userInfo.grade <= 9
        ? this.$store.state.userInfo.grade
        : this.$store.state.userInfo.grade == 10
        ? '高一'
        : this.$store.state.userInfo.grade == 11
        ? '高二'
        : '高三'
    if (!this.$route.params.homeworkQuestionId) {
      localforage.getItem('homeworkQuestionId').then(value => {
        this.homeworkQuestionId = value
        localforage.getItem('dataStatistics').then(value => {
          this.dataItem = value
          this.dailyhomeworkInfo()
        })
      })
      return
    }
    this.homeworkQuestionId = this.$route.params.homeworkQuestionId

    localforage.getItem('dataStatistics').then(value => {
      this.dataItem = value
      this.dailyhomeworkInfo()
    })
  },
  methods: {
    //未提交弹框的事件
    showDialogBtn() {
      this.showDialog1 = true
    },
    closes(val) {
      this.showDialog1 = val
    },
    //获取收藏分组id
    getId(id) {
      this.collectonGroupId = id
    },
    //点击显示收藏弹框
    addStore() {
      this.showDialog = true
    },
    //添加收藏
    addCollectStore() {
      this.CollectionInfos = {
        collectonGroupId: this.collectonGroupId,
        grade: this.grade,
        questionTypeCode: this.dailyhomeworkInfos.questionTypeCode,
        questionId: this.dailyhomeworkInfos.questionId,
        questionInfoId: this.dailyhomeworkInfos.questionInfoId,
        questionSourceId: this.dailyhomeworkInfos.questionSourceId,
        questionSourceName: this.dailyhomeworkInfos.questionSourceName,
        questionUuid: this.dailyhomeworkInfos.questionUuid
      }
      this.$store
        .dispatch('publish/addStore', this.CollectionInfos)
        .then(data => {
          if (data.flag === 1) {
            this.showDialog = false
            this.$message.success('收藏成功')
            this.dailyhomeworkInfo()
          }
        })
    },
    //取消收藏
    cancleStore() {
      this.$store
        .dispatch(
          'publish/cancelStore',
          this.dailyhomeworkInfos.teacherQuestionCollectonId
        )
        .then(data => {
          if (data.flag === 1) {
            this.$message.success('取消收藏成功')
            this.dailyhomeworkInfo()
          }
        })
    },
    //关闭收藏弹框
    closeChildDialog(val) {
      this.showDialog = val
    },
    //关闭错误学生弹框
    close() {
      this.showdialogFlag = false
    },
    selecTh(t) {
      this.selecThtype = t
      this.drawPie(
        this.dailyhomeworkInfos.childInfoList[this.selecThtype]
          .trueStudentCount,
        this.dailyhomeworkInfos.childInfoList[this.selecThtype]
          .errorStudentList != undefined
          ? this.dailyhomeworkInfos.childInfoList[this.selecThtype]
              .errorStudentList.length
          : 0,
        this.dailyhomeworkInfos.childInfoList[this.selecThtype]
          .unSubmitStudentCount,
        this.dailyhomeworkInfos.childInfoList[this.selecThtype]
          .halfTrueStudentCount
      )
    },
    selectId(id) {
      this.homeworkQuestionId = id
      this.dailyhomeworkInfo()
    },
    //日常作业统计详情
    dailyhomeworkInfo() {
      var self = this
      this.$http
        .get('/api/teacher/homework/statistical/question/info', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId,
            homeworkQuestionId: this.homeworkQuestionId,
            teacherId: this.$store.state.userInfo.teacherId
          }
        })
        .then(res => {
          this.dailyhomeworkInfos = res.data.infos
          this.$nextTick().then(() => {
            if (this.dailyhomeworkInfos.questionTypeCode == 4) {
              this.drawPie(
                this.dailyhomeworkInfos.childInfoList[this.selecThtype]
                  .trueStudentCount,
                this.dailyhomeworkInfos.childInfoList[this.selecThtype]
                  .errorStudentList != undefined
                  ? this.dailyhomeworkInfos.childInfoList[this.selecThtype]
                      .errorStudentList.length
                  : 0,
                this.dailyhomeworkInfos.childInfoList[this.selecThtype]
                  .unSubmitStudentCount,
                this.dailyhomeworkInfos.childInfoList[this.selecThtype]
                  .halfTrueStudentCount
              )
            } else {
              this.drawPie(
                this.dailyhomeworkInfos.trueStudentCount,
                this.dailyhomeworkInfos.errorStudentList != undefined
                  ? this.dailyhomeworkInfos.errorStudentList.length
                  : 0,
                this.dailyhomeworkInfos.unSubmitStudentCount,
                this.dailyhomeworkInfos.halfTrueStudentCount
              )
            }

            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.on('click', function(param) {
              if (param.name == '做错') {
                if (self.dailyhomeworkInfos.errorStudentList != undefined) {
                  self.showdialogFlag = true
                }
              }
              // if (param.name == '未提交') {
              //   self.showDialog1 = true
              // }
            })
          })
        })
    },
    drawPie(truerate, errorrate, unsubmit, half) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}人 {d}%  '
        },
        legend: {
          bottom: 'bottom',
          data: ['做对', '做错', '未提交', '半对']
        },
        color: [
          truerate != undefined && truerate != 0 ? '#13A99F' : '',
          errorrate != undefined && errorrate != 0 ? '#FD6265' : '',
          unsubmit != undefined && unsubmit != 0 ? '#ccc' : '',
          half != undefined && half != 0 ? '#FBA057' : ''
        ],
        series: [
          {
            type: 'pie',
            radius: ['0%', '57%'],
            label: {
              show: true,
              formatter: '{b}:{c}人 {d}%',
              fontSize: 12
            },
            labelLine: {
              length: 20,
              length2: 10
            },
            data: [
              truerate != undefined && truerate != 0
                ? {
                    value: truerate,
                    name: '做对'
                  }
                : {},
              errorrate != undefined && errorrate != 0
                ? {
                    value: errorrate,
                    name: '做错'
                  }
                : {},
              unsubmit != undefined && unsubmit != 0
                ? {
                    value: unsubmit,
                    name: '未提交'
                  }
                : {},
              half != undefined && half != 0
                ? {
                    value: half,
                    name: '半对'
                  }
                : {}
            ]
          },
          {
            type: 'pie',
            radius: ['60%', '62%'],
            data: [
              truerate != undefined && truerate != 0
                ? {
                    value: truerate,
                    name: '做对'
                  }
                : {},
              errorrate != undefined && errorrate != 0
                ? {
                    value: errorrate,
                    name: '做错'
                  }
                : {},
              unsubmit != undefined && unsubmit != 0
                ? {
                    value: unsubmit,
                    name: '未提交'
                  }
                : {},
              half != undefined && half != 0
                ? {
                    value: half,
                    name: '半对'
                  }
                : {}
            ],
            label: {
              show: false,
              padding: 20
            },
            labelLine: {
              length: 10,
              length2: 15
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
.answer-results-wrap {
  @include wh(100%, 100%);
}
.single-items-wrap {
  .dialog-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
    .dialog {
      @include wh(500px, auto);
      min-height: 120px;
      background: #fff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      > p {
        @include wh(100%, 48px);
        margin: 0 auto;
        padding: 0 20px;
        @include fj(space-between);
        align-items: center;
        border-bottom: 1px solid #ddd;
        flex: 0 0 48px;
        span {
          @include sc(14px, #5e84ad);
        }
        img {
          @include wh(14px, 14px);
        }
      }
      > div {
        width: 90%;
        margin: 0 auto;
        flex: auto;
        overflow: scroll;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        span {
          height: 20px;
          @include sc(14px, #aaa);
          margin: 20px 20px 10px 0px;
          padding: 0px 10px;
          background: #f7fafe;
          border-radius: 4px;
        }
      }
    }
  }
  // #myChart {
  //   > div {
  //     width: 440px !important;
  //     height: 300px !important;
  //   }
  // }
  // canvas {
  //   width: 350px !important;
  //   height: 350px !important;
  //   top: 4px !important;
  //   left: 0px !important;
  // }
  @include wh(1200px, 100%);
  overflow: auto;
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
  > div:nth-child(2) {
    @include wh(100%, 88%);
    @include fj();
    flex: auto;
    > div.infos {
      flex: auto;
      height: 100%;
      margin-left: 10px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      > div:nth-child(1) {
        @include wh(96%, 100%);
        margin: 0 auto;
        flex: 0 0 50px;
        @include fj();
        align-items: center;
        > a:nth-child(1) {
          @include fj();
          align-items: center;
          span {
            @include fj();
            align-items: center;
            i {
              margin-right: 10px;
            }
            i:nth-child(1) {
              @include sc(12px, #999999);
            }
            i:nth-child(2) {
              @include sc(14px, #5e84ad);
            }
          }
          span:nth-of-type(odd) {
            padding: 0px 15px;
          }
          span:nth-child(1) {
            padding-left: 0;
          }
          span:nth-of-type(even) {
            @include wh(1px, 13px);
            background: rgba(244, 244, 244, 1);
          }
        }
        a:hover {
          color: #000;
        }
        > a.addsc {
          @include fj();
          align-items: center;
          img {
            @include wh(16px, 14px);
          }
          > span {
            padding: 0 5px !important;
          }
        }
        > a.cancelsc {
          @include fj();
          align-items: center;
          img {
            @include wh(24px, 22px);
          }
          > span {
            padding: 0 5px !important;
          }
        }
      }
      > div:nth-child(2) {
        display: flex;
        flex: auto;
        @include wh(96%, 100%);
        margin: 0 auto;
        > div {
          height: 100%;
        }
        > div.zd-tongji-tz {
          flex: auto;
          margin-left: 20px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: scroll;
          > div:nth-child(1) {
            height: 100%;
            > span {
              @include fj(center);
              align-items: center;
              @include wh(64px, 24px);
              @include sc(12px, #fff);
              background: rgba(86, 172, 255, 1);
              border-radius: 12px;
              margin: 20px 0 0 20px;
            }
            > div:nth-child(2) {
              @include wh(400px, auto);
              margin: 20px auto 0;
              @include fj(flex-start);
              overflow: scroll;
              > div {
                display: flex;
                span {
                  @include wh(40px, 40px);
                  background: rgba(255, 255, 255, 1);
                  border: 2px solid rgba(214, 225, 229, 1);
                  border-radius: 8px;
                  margin-right: 10px;
                  @include fj(center);
                  align-items: center;
                  @include sc(16px, #838383);
                  margin-bottom: 10px;
                  cursor: pointer;
                }
                > span.hover-span {
                  background: #399eff;
                  border: 1px solid #399eff;
                  border-radius: 8px;
                  color: #fff;
                }
              }
            }

            img {
              @include wh(100%, 126px);
            }
          }
        }
        > div.zd-tongji-tk {
          flex: auto;
          margin-left: 20px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          @include fj();
          flex-direction: column;
          height: 100%;
          > span {
            @include fj(center);
            align-items: center;
            @include wh(64px, 24px);
            @include sc(12px, #fff);
            background: rgba(86, 172, 255, 1);
            border-radius: 12px;
            margin: 20px 0 0 20px;
            flex: 0 0 24px;
          }
          img {
            @include wh(100%, 126px);
          }
          > div:nth-child(2) {
            flex: auto;
            display: flex;
            flex-direction: column;
            height: 50%;
            > div:nth-child(1) {
              @include wh(95%, 50px);
              margin: 10px auto 0;
              background: #bbd7ff;
              border: 1px solid rgba(187, 215, 255, 1);
              border-radius: 5px 5px 0px 0px;
              @include fj(space-around);
              @include sc(14px, #4e5f71);
              align-items: center;
              flex: 0 0 50px;
              span {
                width: 50%;
                text-align: center;
              }
            }
            > div:nth-child(2) {
              @include wh(96%, 400px);
              margin: 0 auto;
              position: relative;
              z-index: 999;
              overflow: scroll;
              flex: auto;
              p {
                @include wh(100%, auto);
                min-height: 50px;
                @include fj();
                align-items: center;
                span {
                  width: 16%;
                  @include fj(flex-start);
                  align-items: center;
                  @include sc(16px, #4e5f71);
                  i {
                    @include wh(20px, 20px);
                    background: rgba(221, 221, 221, 1);
                    border-radius: 50%;
                    @include fj(center);
                    align-items: center;
                    margin: 5px 0 0 5px;
                    display: inline-block;
                    text-align: center;
                  }
                }
                span:nth-child(1) {
                  width: 32%;
                  word-break: break-all;
                  .sssssss {
                    display: inline-block;
                    width: 80%;
                    i {
                      width: 100%;
                      background: none;
                      border-radius: 0%;
                      color: #1059ff;
                      margin: 5px 0 0 10px;
                      text-align: left;
                    }
                  }
                }
              }
              p:nth-of-type(odd) {
                background: #fafbfe;
              }
            }
          }
        }
        > div.zd-tongji-pd {
          flex: auto;
          margin-left: 20px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          > div:nth-child(1) {
            @include fj();
            flex-direction: column;
            height: 100%;
            > span {
              @include fj(center);
              align-items: center;
              @include wh(64px, 24px);
              @include sc(12px, #fff);
              background: rgba(86, 172, 255, 1);
              border-radius: 12px;
              margin: 20px 0 0 20px;
            }

            > div:nth-child(2) {
              @include wh(96%, auto);
              margin: 20px auto 0;
              @include fj(flex-start);
              span {
                @include wh(40px, 40px);
                background: rgba(255, 255, 255, 1);
                border: 2px solid rgba(214, 225, 229, 1);
                border-radius: 8px;
                margin-right: 10px;
                @include fj(center);
                align-items: center;
                @include sc(16px, #838383);
              }
              > span.hover-span {
                background: #399eff;
                border: 1px solid #399eff;
                border-radius: 8px;
                color: #fff;
              }
            }

            img {
              @include wh(100%, 126px);
            }
          }
        }
      }
    }
  }
}
</style>
