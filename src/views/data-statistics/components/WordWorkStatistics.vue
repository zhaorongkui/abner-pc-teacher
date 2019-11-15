<template>
  <div class="word-work-statistics-wrap">
    <div class="nav">
      <span>作业名称 ></span>
      <span>查看统计 ></span>
      <span>xxxx ></span>
    </div>
    <div class="word-work-statistics-infos">
      <div class="word-work-statistics-infos-top">
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
                :percentage="25"
                :stroke-width="strokeWidth"
                :width="lineWidth"
              ></el-progress>
            </div>
            <div>
              <span>未提交</span>
              <span>23</span>
              <span>人</span>
              <span @click="viewWord">查看</span>
            </div>
          </div>
        </div>
        <div class="word-work-statistics-infos-bottom-r">
          <div>
            <span>单词</span>
            <span>综合得分</span>
          </div>
          <div>
            <el-table
              :data="tableData"
              stripe
              style="width: 96%;margin:0 auto;border:1px solid #DEDEDE;"
            >
              <el-table-column prop="date" label="" min-width="50%">
              </el-table-column>
              <el-table-column prop="name" label="" min-width="50%">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="word-view-wrap" v-if="showWordViewWrap">
      <div class="word-view">
        <div>
          <span>eeee</span>
          <img
            src="../../../assets/img/publish/close.png"
            alt=""
            @click="close"
          />
        </div>
        <div>
          <div>
            <span>学生姓名</span>
            <span>综合评分</span>
            <span>跟读评分得分</span>
            <span>听写正确率</span>
            <span>英译汉正确率</span>
          </div>
          <div>
            <el-table
              :data="tableData"
              stripe
              style="width: 96%;margin:0 auto;border:1px solid #DEDEDE;"
            >
              <el-table-column prop="date" label="" min-width="20%">
              </el-table-column>
              <el-table-column prop="name" label="" min-width="20%">
              </el-table-column>
              <el-table-column prop="name" label="" min-width="20%">
              </el-table-column>
              <el-table-column prop="name" label="" min-width="20%">
              </el-table-column>
              <el-table-column prop="name" label="" min-width="20%">
              </el-table-column>
            </el-table>
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
    return {
      lineWidth: 218,
      strokeWidth: 12,
      showHeader: false,
      tableData: [
        {
          date: '单词',
          name: '100',
          name1: '100',
          name2: '100',
          name3: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        },
        {
          date: '单词',
          name: '100'
        }
      ],
      showWordViewWrap: false
    }
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {
    viewWord() {
      this.showWordViewWrap = true
    },
    close() {
      this.showWordViewWrap = false
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.word-work-statistics-wrap {
  @include wh(1200px, 100%);
  overflow: auto;
  margin: 0 auto;
  .nav {
    @include wh(1200px, auto);
    overflow: auto;
    margin: 10px 0 10px 0;
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
  .word-work-statistics-infos {
    @include wh(100%, 92%);
    background: #fff;
    display: flex;
    flex-direction: column;
    .word-work-statistics-infos-top {
      @include wh(94%, 50px);
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
    .word-work-statistics-infos-bottom {
      @include wh(94%, auto);
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
          height: 100%;
          flex: auto;
          overflow: scroll;
          padding-bottom: 20px;
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
            text-align: center;
          }
        }
        > div:nth-child(2) {
          height: 100%;
          flex: auto;
          overflow: scroll;
        }
      }
    }
  }
}
</style>
