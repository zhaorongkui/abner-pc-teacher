<template>
  <div class="english-daily-work-statistics-wrap">
    <div class="nav">
      <span>作业名称 ></span>
      <span>查看统计 ></span>
      <span>xxxx ></span>
    </div>
    <div class="english-daily-work-statistics">
      <div class="english-daily-work-statistics-infos">
        <div class="english-daily-work-statistics-infos-top">
          <span>
            <i>作业名称</i>
            <i>九月12日作业</i>
          </span>
          <span>
            <i>班级</i>
            <i>九年级二班</i>
          </span>
          <span><i>人数</i> <i>56</i> </span>
        </div>
        <div class="english-daily-work-statistics-infos-bottom">
          <div class="english-daily-work-statistics-infos-bottom-left">
            <img
              src="../../../assets/img/publish/homework_tongji_defen.png"
              alt=""
            />
            <div>
              <span>68<i>/70</i></span>
              <span>平均得分</span>
            </div>
          </div>
          <div class="english-daily-work-statistics-infos-bottom-left">
            <img
              src="../../../assets/img/publish/homework_tongji_zq.png"
              alt=""
            />
            <div>
              <span>100<i>%</i></span>
              <span>正确率</span>
            </div>
          </div>
          <div class="english-daily-work-statistics-infos-bottom-right">
            <div></div>
            <div>
              <div>
                <span></span>
                <span>未完成人数 18 30%</span>
              </div>
              <div>
                <span></span>
                <div>
                  <span>已完成人数 50 70%</span>
                  <span>待批阅人数 10 20%</span>
                  <span>已批阅人数 40 80%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="english-daily-work-statistics-list">
        <div>
          <span>平均得分</span>
          <span>错误率</span>
        </div>
        <div>
          <div class="subject-item">
            <p>fffffffffffff</p>
            <p>
              <span>
                <i>平均得分</i>
                <i><i>80</i><i>/20</i></i>
              </span>
              <span>
                <i>正确率</i>
                <i><i>80</i><i>%</i></i>
              </span>
              <span>
                <i>错题人数</i>
                <i>55</i>
              </span>
            </p>
            <div>
              <img src="../../../assets/img/publish/qp.png" alt="" />
              <span>全屏展示</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.english-daily-work-statistics-wrap {
  @include wh(1200px, 100%);
  overflow: auto;
  margin: 0 auto;
  .nav {
    overflow: auto;
    margin-top: 10px;
    span {
      float: left;
      margin-left: 5px;
      @include sc(14px, #5e84ad);
    }
  }
  .english-daily-work-statistics {
    display: flex;
    flex-direction: column;
    height: 92%;
    margin-top: 10px;
    .english-daily-work-statistics-infos {
      @include wh(100%, 230px);
      background: #fff;
      display: flex;
      flex-direction: column;
      .english-daily-work-statistics-infos-top {
        @include wh(96%, 50px);
        margin: 0 auto;
        border-bottom: 1px solid rgba(225, 232, 238, 1);
        @include fj(flex-start);
        align-items: center;
        flex: 0 0 50px;
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
      .english-daily-work-statistics-infos-bottom {
        @include wh(96%, auto);
        margin: 0 auto;
        @include fj(space-around);
        align-items: center;
        flex: auto;
        .english-daily-work-statistics-infos-bottom-left {
          @include wh(300px, 120px);
          background: url(../../../assets/img/publish/bg_homework_tongji_zq.png)
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
        .english-daily-work-statistics-infos-bottom-left:nth-child(1) {
          background: url(../../../assets/img/publish/bg_homework_tongji_defen.png)
            no-repeat center;
        }
        .english-daily-work-statistics-infos-bottom-right {
          @include wh(400px, auto);
          @include fj();
          align-items: center;
          margin-left: 100px;
          > div:nth-child(1) {
          }
          > div:nth-child(2) {
            > div:nth-child(1) {
              @include wh(197px, 38px);
              background: rgba(221, 221, 221, 0.04);
              border: 1px solid rgba(221, 221, 221, 1);
              @include fj(center);
              align-items: center;
              span:nth-child(1) {
                @include wh(11px, 11px);
                background: rgba(221, 221, 221, 1);
                border-radius: 50%;
              }
              span:nth-child(2) {
                @include sc(14px, #7b8187);
                margin-left: 8px;
              }
            }
            > div:nth-child(2) {
              @include wh(197px, 100px);
              background: rgba(19, 169, 159, 0.04);
              border: 1px solid rgba(19, 169, 159, 1);
              @include fj(center);
              align-items: top;
              margin-top: 10px;
              > span {
                @include wh(11px, 11px);
                background: rgba(19, 169, 159, 1);
                border-radius: 50%;
                margin: 14px 8px 0 0;
              }
              > div {
                @include fj(center);
                align-items: center;
                flex-direction: column;
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
    .english-daily-work-statistics-list {
      @include wh(100%, auto);
      flex: auto;
      margin-top: 10px;
      background: #fff;
      padding-bottom: 5px;
      overflow: auto;
      position: relative;
      > div:nth-of-type(1) {
        @include wh(94%, 50px);
        background: rgba(241, 246, 254, 1);
        border: 1px solid rgba(187, 215, 255, 1);
        border-radius: 4px;
        @include fj(flex-start);
        align-items: center;
        position: absolute;
        left: 3%;
        top: 10px;
        span {
          @include sc(16px, #5e84ad);
        }
        span:nth-child(1) {
          margin: 0 100px 0 20px;
        }
        span:nth-child(2) {
        }
      }
      > div:nth-of-type(2) {
        @include wh(94%, auto);
        overflow: scroll;
        margin: 70px auto 0;
        overflow: auto;
        > div.subject-item {
          @include wh(380px, 170px);
          float: left;
          margin-right: 20px;
          overflow: auto;
          @include fj();
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(222, 222, 222, 1);
          box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          position: absolute;
          p:nth-child(1) {
            @include wh(352px, 70px);
            margin: 10px auto 0;
            overflow: hidden;
          }
          p:nth-child(2) {
            @include wh(100%, 60px);
            background: rgba(250, 251, 255, 1);
            border-radius: 5px;
            @include fj();
            align-items: center;
            padding: 0 10px;
            span {
              height: 36px;
              @include fj(flex-start);
              align-items: flex-end;
              > i:nth-child(1) {
                @include sc(14px, #aaa);
                float: left;
              }
              > i:nth-child(2) {
                @include sc(30px, #4e5f71);
                line-height: 30px;
                margin-left: 10px;
                @include fj(flex-start);
                align-items: flex-end;
                i:nth-child(1) {
                  @include sc(30px, #4e5f71);
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
</style>
