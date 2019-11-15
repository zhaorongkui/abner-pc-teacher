<template>
  <div class="message-menu">
    <ul>
      <li class="msg-publish">
        <router-link to="/message/msg-publish">
          <div class="msg-publish-btn">
            <img
              class="add"
              src="../../../assets/img/ic_message_fabu@2x.png"
              alt="publish"
            />
            <span>
              发布新消息
            </span>
          </div>
        </router-link>
      </li>
      <li
        class="msg-published"
        :class="{ active: path === '/message/msg-published' }"
      >
        <router-link to="/message/msg-published">
          <span>发布的消息</span>
          <span>{{ publishedListCount }}</span>
        </router-link>
      </li>
      <li
        class="msg-received"
        :class="path === '/message/msg-received' ? 'active' : ''"
      >
        <router-link to="/message/msg-received">
          <span :class="{ 'no-read': notReadCount }">收到的消息</span>
          <span>{{ receivedListCount }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  computed: {
    notReadCount() {
      return this.$store.state.message.notReadCount
    },
    publishedListCount() {
      return this.$store.state.message.publishedListCount
    },
    receivedListCount() {
      return this.$store.state.message.receivedListCount
    }
  },
  watch: {
    '$route.path'(value, oldValue) {
      if (value === '/message/msg-publish') {
        this.path = oldValue
      } else {
        this.path = value
      }
    }
  },
  data() {
    return {
      path: '/message/msg-received'
    }
  },
  mounted() {
    this.path =
      this.$route.path === '/message/msg-publish'
        ? '/message/msg-received'
        : this.$route.path
  }
}
</script>

<style lang="scss" scoped>
.message-menu {
  width: 280px;
  height: 100%;
  overflow-y: auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
}
.msg-publish {
  height: 110px;
  background-image: url('../../../assets/img/bg_message_new@2x.png');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .msg-publish-btn {
    width: 208px;
    height: 48px;
    background: #fff;
    border: 1px solid rgba(16, 89, 255, 1);
    box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.16);
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(16, 89, 255, 1);
    .add {
      width: 14px;
      height: 14px;
      margin-right: 10px;
    }
  }
}
.msg-published,
.msg-received {
  a {
    width: 220px;
    height: 48px;
    border-radius: 24px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 30px auto;
    color: rgba(91, 103, 121, 1);
    position: relative;
    .no-read::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      top: 20px;
      left: 15px;
    }
  }
}
.active {
  a {
    background: rgba(18, 90, 255, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
