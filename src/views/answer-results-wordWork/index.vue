<template>
  <div class="word-work-wrap">
    <div class="nav">
      <router-link to="/work">作业 &nbsp;&nbsp;></router-link>
      <router-link to="/work-grading-assignment"
        >学生列表 &nbsp;&nbsp;></router-link
      >
      <span>&nbsp;&nbsp;{{ studentName }}</span>
    </div>
    <div>
      <ul v-if="homeworkInfoList.length != 0">
        <template v-for="(item, index) in homeworkInfoList">
          <Item
            :key="index"
            :item="item"
            @toParentsEvent="audioIndex"
            :index="index"
            :currentIndex="currentIndex"
          ></Item>
        </template>
      </ul>
      <div v-else class="null">
        <img src="../../assets/img/publish/nulldata.png" alt="" />
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import Item from './components/items'

export default {
  name: '',
  data() {
    return {
      studentInfoIdWord: '',
      studentName: '',
      homeworkClassIdWord: '',
      homeworkInfoList: [],
      wordId: '',
      audioUrl: '',
      isPlaying: false,
      currentIndex: ''
    }
  },
  computed: {},
  components: {
    Item
  },
  mounted() {
    this.studentName = localStorage.getItem('studentName')
    if (!this.$route.params.studentInfoIdWord) {
      localforage.getItem('studentInfoIdWord').then(value => {
        this.studentInfoIdWord = value
        if (!this.$route.params.homeworkClassIdWord) {
          localforage.getItem('homeworkClassIdWord').then(value => {
            this.homeworkClassIdWord = value
            this.homeworkInfo()
          })
          return
        }
      })
      return
    }
    this.studentInfoIdWord = this.$route.params.studentInfoIdWord
    this.homeworkClassIdWord = this.$route.params.homeworkClassIdWord
    //获取英语听说查看答题结果数据
    this.homeworkInfo()
  },
  methods: {
    audioIndex(i) {
      this.currentIndex = i
    },
    homeworkInfo() {
      this.$http
        .get('/api/teacher/homework/class/student/word', {
          params: {
            homeworkClassId: this.homeworkClassIdWord,
            studentInfoId: this.studentInfoIdWord
          }
        })
        .then(res => {
          this.homeworkInfoList = res.data.infos
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.word-work-wrap {
  @include wh(1200px, 96%);
  overflow: auto;
  margin: 0 auto;

  .nav {
    overflow: auto;
    height: 60px;
    @include fj(flex-start);
    align-items: center;
    a,
    span {
      float: left;
      margin-left: 10px;
      @include sc(14px, #5e84ad);
    }
  }
  > div:nth-child(2) {
    @include wh(1200px, 91%);
    background: #fff;
    overflow: scroll;
    padding-bottom: 10px;
    ul {
      @include wh(96%, 100%);
      padding: 40px 10px;
      overflow: auto;
      margin: 0 auto;
      @include fj(flex-start);
      flex-wrap: wrap;
      li {
        @include wh(272px, 364px);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        margin: 0 5px 15px 5px;
        > span {
          @include wh(250px, 50px);
          margin: 0 auto;
          @include fj(flex-start);
          align-items: center;
          @include sc(16px, #5e84ad);
        }
        > div {
          @include wh(250px, 79px);
          margin: 15px auto 0;
          background: rgba(244, 248, 255, 1);
          border-radius: 4px;
          @include fj(space-between);
          align-items: center;
          position: relative;
          > span:nth-of-type(1) {
            @include fj();
            flex-direction: column;
            @include sc(16px, #596878);
            margin-left: 20px;
            > i:nth-child(1) {
              @include sc(16px, #596878);
            }
            > span.fenshu {
              @include fj(flex-start);
              > i {
                @include sc(13px, #969696);
                i {
                  @include sc(14px, #596878);
                }
              }
              > span {
                @include fj(flex-start);
                align-items: center;
                .progress {
                  @include wh(100px, 5px);
                  background: rgba(217, 233, 255, 1);
                  border-radius: 3px;
                  overflow: hidden;
                  @include fj(flex-start);
                  > i {
                    @include wh(auto, 100%);
                    background: rgba(86, 172, 255, 1);
                  }
                }
                .count {
                  margin-left: 10px;
                }
              }
            }
          }
          > span.progress-wrap {
            span {
              background: rgba(255, 199, 154, 1);
              border-radius: 13px;
              @include wh(auto, 27px);
              @include fj(center);
              align-items: center;
              @include sc(14px, #ee7414);
              margin-right: 15px;
              padding: 3px 10px;
            }
          }
          .wz {
            background: rgba(255, 199, 154, 1);
            border-radius: 13px;
            @include wh(auto, 27px);
            @include fj(center);
            align-items: center;
            @include sc(14px, #ee7414);
            margin-right: 15px;
            padding: 3px 10px;
          }
        }
        > div.wordReadFollow {
          img {
            margin-right: 10px;
            @include wh(57px, 65px);
          }
        }
        > div.wordListenWrite,
        > div.wordEnglishChina {
          img {
            @include wh(20px, 20px);
            margin-right: 30px;
          }
          span:nth-child(2) {
            background: rgba(255, 199, 154, 1);
            border-radius: 13px;
            @include wh(auto, 27px);
            @include fj(center);
            align-items: center;
            @include sc(14px, #ee7414);
            margin-right: 15px;
            padding: 3px 10px;
          }
        }
      }
    }
    .null {
      @include wh(100%, 100%);
      @include fj(center);
      align-items: center;
      flex-direction: column;
      img {
        @include wh(215px, 188px);
      }
      span {
        @include sc(14px, #6181ca);
        margin-top: 15px;
      }
    }
  }
}
</style>
