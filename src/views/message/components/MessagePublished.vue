<template>
  <div class="message-published">
    <div class="message-tab">
      <ul class="tab-list">
        <li class="tab-item">全部消息</li>
      </ul>
    </div>
    <div class="message-list">
      <template v-if="list.length > 0">
        <ul>
          <PublishedMessageItem
            v-for="(item, index) of list"
            :item="item"
            :key="index"
          ></PublishedMessageItem>
        </ul>
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
      <template v-else>
        <div class="default-pic">
          <img src="../../../assets/img/pic_default_em@2x.png" alt="" />
          <p>暂无数据</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import PublishedMessageItem from './PublishedMessageItem'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('message')
export default {
  name: 'message-published',
  components: { PublishedMessageItem },
  data() {
    return {}
  },
  computed: {
    list() {
      return this.$store.state.message.publishedList
    },
    currentPage() {
      return this.$store.state.message.currentPage
    },
    loadmore() {
      return this.$store.state.message.loadmore
    }
  },
  mounted() {
    this.$store.commit('message/UPDATEPAGEING', 1)
    this.$store.commit('message/LOADMORE', true)
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.sendList()
      }
    })
  },
  methods: {
    ...mapActions(['sendList']),
    handleLoadMore() {
      this.sendList(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.message-published {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.message-tab {
  height: 34px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  .tab-list {
    .tab-item {
      width: 118px;
      height: 34px;
      background: rgba(238, 238, 238, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      line-height: 34px;
      text-align: center;
      border-radius: 4px 4px 0 0;
      font-weight: bold;
      color: rgba(61, 77, 101, 1);
      font-size: 14px;
    }
  }
}
.message-list {
  overflow-y: auto;
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
  margin: 20px 0;
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
