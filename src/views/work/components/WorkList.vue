<template>
  <div class="work-list">
    <WorkToolbar></WorkToolbar>
    <div class="content">
      <Headline class="title" title="作业列表"></Headline>
      <ul class="list" v-if="homeworkList.length > 0">
        <WorkItem
          v-for="item of homeworkList"
          :key="item.homeworkClassId"
          :item="item"
        ></WorkItem>
        <div class="load-more" v-if="loadmore">
          <span @click="handleLoadMore">
            <img src="../../../assets/img/publish/jiazai.png" alt="" />
            点击加载更多</span
          >
        </div>
        <div class="load-more" v-else>
          <span>暂无更多数据</span>
        </div>
      </ul>
      <div v-if="homeworkList.length === 0" class="default-pic">
        <img src="../../../assets/img/pic_default_em@2x.png" alt="" />
        <p>还没发布过任务</p>
      </div>
      <div v-if="homeworkList.length === 0" class="guide">
        <img src="../../../assets/img/bg_homeworklist_tips@2x.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Headline from '../../../components/Headline'
import WorkToolbar from './WorkToolbar'
import WorkItem from './WorkItem'
export default {
  name: 'work-list',
  components: { WorkToolbar, Headline, WorkItem },
  data() {
    return {}
  },
  computed: {
    homeworkList() {
      return this.$store.state.work.homeworkList || []
    },
    currentPage() {
      return this.$store.state.work.currentPage
    },
    loadmore() {
      return this.$store.state.work.loadmore
    }
  },
  methods: {
    handleLoadMore() {
      this.$store.dispatch('work/homeworkList', true)
      this.$emit('flagEvent', true)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
  background-color: #fff;
}
.work-list {
  flex: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .title {
      height: 57px;
      flex: 0 0 57px;
      display: flex;
      align-items: center;
    }
    .list {
      flex: auto;
      height: 100%;
      padding-top: 4px;
      overflow-y: auto;
    }
  }
  .default-pic {
    width: 100%;
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
  .guide {
    position: absolute;
    right: -20px;
    bottom: 250px;
    img {
      width: 299px;
      height: 139px;
    }
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
