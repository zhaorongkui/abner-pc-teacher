<template>
  <div>
    <ul class="question-detail">
      <template v-if="questionList.length > 0">
        <li class="item" v-for="(item, index) of questionList" :key="index">
          <div class="mark" v-if="item.wrongquestionIsexamine">
            <template v-if="item.wrongquestionIsexamine === 1">
              已修改
            </template>
            <template v-if="item.wrongquestionIsexamine === 2">
              未修改
            </template>
            <template v-if="item.wrongquestionIsexamine === 3">
              已发布
            </template>
          </div>
          <DetailItem
            :studentInfoId="studentInfoId"
            :questionYytypeId="questionYytypeId"
            :wrongquestionTimeStart="wrongquestionTimeStart"
            :wrongquestionTimeEnd="wrongquestionTimeEnd"
            :item="item"
          ></DetailItem>
        </li>
        <div class="load-more" v-if="loadmore">
          <span @click="handleLoadMore">
            <img src="../../../assets/img/publish/jiazai.png" alt="" />
            点击加载更多</span
          >
        </div>
        <div class="load-more" v-else>
          <span>暂无更多数据</span>
        </div>
      </template>
      <div v-else class="default-pic">
        <img src="../../../assets/img/pic_default_em@2x.png" alt="" />
        <p>暂无数据</p>
      </div>
    </ul>
  </div>
</template>

<script>
import DetailItem from './DetailItem'
export default {
  name: 'question-detail',
  components: { DetailItem },
  data() {
    return {}
  },
  props: [
    'studentInfoId',
    'questionYytypeId',
    'wrongquestionTimeStart',
    'wrongquestionTimeEnd'
  ],
  computed: {
    questionList() {
      return this.$store.state.question.questionList
    },
    loadmore() {
      return this.$store.state.question.loadmore
    }
  },
  mounted() {},
  methods: {
    handleLoadMore() {
      this.$store.dispatch('question/getList', {
        studentInfoId: this.studentInfoId,
        questionYytypeId: this.questionYytypeId.join(','),
        wrongquestionTimeStart: this.wrongquestionTimeStart,
        wrongquestionTimeEnd: this.wrongquestionTimeEnd,
        loadMore: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.question-detail {
  flex: auto;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  li {
    position: relative;
    .mark {
      width: 42px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      background: rgba(19, 169, 159, 1);
      opacity: 0.7;
      border-radius: 4px 0px 4px 0px;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 10px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.default-pic {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 215px;
    height: 188px;
  }
  p {
    margin-top: 20px;
    font-size: 14px;
    font-weight: bold;
    color: rgba(97, 129, 202, 1);
  }
}
.load-more {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  span {
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    color: rgba(176, 176, 176, 1);
    img {
      width: 16px;
      height: 22px;
      vertical-align: center;
      margin-top: -5px;
    }
  }
}
</style>
