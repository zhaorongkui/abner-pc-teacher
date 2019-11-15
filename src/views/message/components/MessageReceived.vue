<template>
  <div class="message-received">
    <div class="message-tab">
      <ul class="tab-list">
        <li
          class="tab-item"
          :class="{ active: tab === 'all' }"
          @click="handleSwitchTab('all')"
        >
          全部消息
        </li>
        <li
          class="tab-item"
          :class="{ active: tab === 'appeal' }"
          @click="handleSwitchTab('appeal')"
        >
          重批申请<span>{{ AppealCount }}</span>
        </li>
      </ul>
      <div class="handle">
        <span @click="handleALlRead">全部标记为已读</span>
      </div>
    </div>
    <div class="message-list">
      <template v-if="list.length > 0">
        <ul>
          <ReceivedMessageItem
            v-for="(item, index) of list"
            :item="item"
            :key="index"
          ></ReceivedMessageItem>
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
import ReceivedMessageItem from './ReceivedMessageItem'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('message')
export default {
  name: 'message-received',
  components: { ReceivedMessageItem },
  data() {
    return {}
  },
  computed: {
    tab() {
      return this.$store.state.message.tabType
    },
    list() {
      return this.$store.state.message.receivedList
    },
    AppealCount() {
      return this.$store.state.appealCount
    },
    currentPage() {
      return this.$store.state.message.currentPage
    },
    loadmore() {
      return this.$store.state.message.loadmore
    }
  },
  methods: {
    ...mapActions(['getList', 'read']),
    handleSwitchTab(tab) {
      if (this.tab === tab) return
      this.$store.commit('message/TABTYPE', tab)
      this.$store.commit('message/UPDATEPAGEING', 1)
      this.getList()
    },
    handleALlRead() {
      this.read({ noticeId: '', all: 'all' }).then(data => {
        if (data.flag === 1) {
          this.$message.success('标记成功')
        }
      })
    },
    handleLoadMore() {
      this.getList(true)
    }
  },
  mounted() {
    this.$store.commit('message/UPDATEPAGEING', 1)
    this.$store.commit('message/LOADMORE', true)
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.getList()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.message-received {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.message-tab {
  height: 34px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  position: relative;
  .tab-list {
    display: flex;
    .tab-item {
      width: 130px;
      height: 34px;
      border: 1px solid rgba(222, 222, 222, 1);
      line-height: 34px;
      text-align: center;
      background: rgba(255, 255, 255, 1);
      color: rgba(136, 136, 136, 1);
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
    }
    .tab-item:first-child {
      border-top-left-radius: 4px;
      border-right: none;
    }
    .tab-item:last-child {
      border-top-right-radius: 4px;
    }
    .tab-item.active {
      background: rgba(238, 238, 238, 1);
      color: rgba(61, 77, 101, 1);
    }
  }
  .handle {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    font-weight: bold;
    color: rgba(16, 89, 255, 1);
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
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
