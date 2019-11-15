<template>
  <div class="word-work-wrap">
    <div class="nav">
      <router-link to="/work">作业 &nbsp;&nbsp;></router-link>
      <router-link to="/work-grading-assignment"
        >作业列表 &nbsp;&nbsp;></router-link
      >
      <span>作业列表详情</span>
    </div>
    <div>
      <ul>
        <li>
          <span>apple</span>
          <p>
            <span>
              <i>单词跟读</i>
              <i>平均得分 90</i>
            </span>
            <span v-if="false">未做</span>
            <img src="../../../assets/img/publish/read_play.png" alt="" />
            <img
              src="../../../assets/img/publish/read_suspend.png"
              alt=""
              v-if="false"
            />
          </p>
          <p>
            <span>单词听写</span>
            <span v-if="false">未做</span>
            <img
              src="../../../assets/img/publish/ic_right.png"
              alt=""
              v-if="false"
            />
            <img src="../../../assets/img/publish/ic_wrong.png" alt="" />
          </p>
          <p>
            <span>英译汉</span>
            <span v-if="false">剩余两次未做</span>
            <img src="../../../assets/img/publish/ic_right.png" alt="" />
            <img
              src="../../../assets/img/publish/ic_wrong.png"
              alt=""
              v-if="false"
            />
          </p>
        </li>
        <li>
          <span>apple</span>
          <p>
            <span>
              <i>单词跟读</i>
              <i>平均得分 90</i>
            </span>
            <span v-if="false">未做</span>
            <img src="../../../assets/img/publish/read_play.png" alt="" />
            <img
              src="../../../assets/img/publish/read_suspend.png"
              alt=""
              v-if="false"
            />
          </p>
          <p>
            <span>单词听写</span>
            <span v-if="false">未做</span>
            <img
              src="../../../assets/img/publish/ic_right.png"
              alt=""
              v-if="false"
            />
            <img src="../../../assets/img/publish/ic_wrong.png" alt="" />
          </p>
          <p>
            <span>英译汉</span>
            <span v-if="false">剩余两次未做</span>
            <img src="../../../assets/img/publish/ic_right.png" alt="" />
            <img
              src="../../../assets/img/publish/ic_wrong.png"
              alt=""
              v-if="false"
            />
          </p>
        </li>
        <li>
          <span>apple</span>
          <p>
            <span>
              <i>单词跟读</i>
              <i>平均得分 90</i>
            </span>
            <span v-if="false">未做</span>
            <img src="../../../assets/img/publish/read_play.png" alt="" />
            <img
              src="../../../assets/img/publish/read_suspend.png"
              alt=""
              v-if="false"
            />
          </p>
          <p>
            <span>单词听写</span>
            <span v-if="false">未做</span>
            <img
              src="../../../assets/img/publish/ic_right.png"
              alt=""
              v-if="false"
            />
            <img src="../../../assets/img/publish/ic_wrong.png" alt="" />
          </p>
          <p>
            <span>英译汉</span>
            <span v-if="false">剩余两次未做</span>
            <img src="../../../assets/img/publish/ic_right.png" alt="" />
            <img
              src="../../../assets/img/publish/ic_wrong.png"
              alt=""
              v-if="false"
            />
          </p>
        </li>
        <li>
          <span>apple</span>
          <p>
            <span>
              <i>单词跟读</i>
              <i>平均得分 90</i>
            </span>
            <span v-if="false">未做</span>
            <img src="../../../assets/img/publish/read_play.png" alt="" />
            <img
              src="../../../assets/img/publish/read_suspend.png"
              alt=""
              v-if="false"
            />
          </p>
          <p>
            <span>单词听写</span>
            <span v-if="false">未做</span>
            <img
              src="../../../assets/img/publish/ic_right.png"
              alt=""
              v-if="false"
            />
            <img src="../../../assets/img/publish/ic_wrong.png" alt="" />
          </p>
          <p>
            <span>英译汉</span>
            <span v-if="false">剩余两次未做</span>
            <img src="../../../assets/img/publish/ic_right.png" alt="" />
            <img
              src="../../../assets/img/publish/ic_wrong.png"
              alt=""
              v-if="false"
            />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  name: '',
  props: ['dataItem'],
  data() {
    return {
      wordId: ''
    }
  },
  computed: {},
  components: {},
  mounted() {
    localforage.getItem('wordId').then(value => {
      this.wordId = value
      this.$http
        .get('/api/teacher/homework/class/student/word', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId,
            studentId: this.wordId
          }
        })
        .then(res => {
          console.log(res)
        })
    })
  },
  methods: {}
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
    margin: 10px 0;
    a,
    span {
      float: left;
      margin-left: 10px;
      @include sc(14px, #5e84ad);
    }
  }
  > div:nth-child(2) {
    @include wh(1200px, 92%);
    background: #fff;
    overflow: scroll;
    ul {
      @include wh(96%, 100%);
      padding: 40px 10px;
      overflow: auto;
      margin: 0 auto;
      @include fj(space-between);
      flex-wrap: wrap;
      li {
        @include wh(272px, 364px);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        > span {
          @include wh(250px, 50px);
          margin: 0 auto;
          @include fj(flex-start);
          align-items: center;
          @include sc(16px, #5e84ad);
        }
        p {
          @include wh(250px, 79px);
          margin: 15px auto 0;
          background: rgba(244, 248, 255, 1);
          border-radius: 4px;
          @include fj(space-between);
          align-items: center;
          span:nth-of-type(1) {
            @include fj();
            flex-direction: column;
            @include sc(16px, #596878);
            margin-left: 20px;
            i:nth-child(1) {
              @include sc(16px, #596878);
            }
            i:nth-child(2) {
              margin-top: 5px;
              @include sc(13px, #969696);
            }
          }
          span:nth-of-type(2) {
            background: rgba(255, 199, 154, 1);
            border-radius: 13px;
            padding: 2px 5px;
            @include sc(14px, #ee7414);
          }
        }
        p:nth-child(2) {
          img {
            margin-right: 10px;
            @include wh(57px, 65px);
          }
        }
        p:nth-child(n + 3) {
          img {
            @include wh(20px, 20px);
            margin-right: 30px;
          }
        }
      }
    }
  }
}
</style>
