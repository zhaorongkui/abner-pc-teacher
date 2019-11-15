<template>
  <div class="app-header">
    <div class="nav">
      <div class="logo">
        <img src="../../../assets/img/lz-logo.png" alt="" />
      </div>
      <ul class="nav-list">
        <template v-for="(item, index) of navList">
          <li
            v-if="
              item.path == '/reading-training' && subjectAbbreviation == 'yuwen'
            "
            :key="index"
          >
            <router-link
              :to="item.path"
              :class="path.indexOf(item.path) !== -1 ? 'active' : ''"
            >
              {{ item.title }}
            </router-link>
          </li>
          <li v-if="item.path != '/reading-training'" :key="index">
            <router-link
              :to="item.path"
              :class="path.indexOf(item.path) !== -1 ? 'active' : ''"
            >
              {{ item.title }}
            </router-link>
          </li>
        </template>
      </ul>
      <div class="personal">
        <div class="appeal" v-if="appealCount > 0">
          <a-badge :count="appealCount" :overflowCount="99">
            <div @click="handleGoMessage">
              重批申请
            </div>
          </a-badge>
        </div>
        <a-divider v-if="appealCount > 0" type="vertical" />
        <div class="notice">
          <a-badge :count="notReadCount" :overflowCount="99">
            <img
              @click="handlGoMsg"
              src="../../../assets/img/lingdang.png"
              alt=""
            />
          </a-badge>
        </div>
        <div class="avatar" @click="handlePersonal">
          <a-avatar :size="44" :src="userHadportraitPath" icon="user" />
        </div>
        <a-dropdown class="user" :trigger="['click']" placement="bottomRight">
          <span class="ant-dropdown-link"
            >{{ teacherName }}<a-icon type="down"
          /></span>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-icon type="user" /><span @click="handlePersonal"
                >个人中心</span
              >
            </a-menu-item>
            <a-menu-item>
              <a-icon type="logout" />
              <span @click="handleLogout">退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  components: {},
  data() {
    return {
      navList: [
        {
          title: '首页',
          path: '/home'
        },
        {
          title: '作业',
          path: '/work'
        },
        {
          title: '错题本',
          path: '/wrong-question'
        },
        {
          title: '习题讲解',
          path: '/exercise-lecture'
        },
        {
          title: '资源管理',
          path: '/resource-management'
        }
      ],
      path: '/home'
    }
  },
  created() {
  },
  computed: {
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    },
    userHadportraitPath() {
      return this.$store.state.userInfo.userHadportraitPath
    },
    teacherName() {
      return this.$store.state.userInfo.teacherName
    },
    appealCount() {
      return this.$store.state.appealCount
    },
    notReadCount() {
      return this.$store.state.notReadCount
    }
  },
  watch: {
    '$route.path'(value) {
      this.path = value
    }
  },
  mounted() {
    this.path = this.$route.path
    this.$store.dispatch('notReadCountAppeal')
    this.$store.dispatch('getNotReadCount')
  },
  methods: {
    //登出
    handleLogout() {
      this.$store.dispatch('LogOut')
    },
    handlePersonal() {
      this.$router.push('./personal')
    },
    handleGoMessage() {
      this.$store.commit('message/TABTYPE', 'appeal')
      this.$router.push('/message')
    },
    handlGoMsg() {
      this.$store.commit('message/TABTYPE', 'all')
      this.$router.push('/message')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 60px;
  flex: 0 0 60px;
  width: 100%;
  background-image: url('../../../assets/img/header-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav {
  width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  .logo {
    width: 100px;
    height: 30px;
    img {
      width: 100%;
      height: 30px;
    }
  }
  .nav-list {
    flex: auto;
    display: flex;
    align-items: flex-start;
    margin-left: 143px;
    a {
      color: #fff;
      display: block;
      border-radius: 20px;
      font-size: 16px;
    }
    a.active {
      background-color: #fff;
      color: #1059ff;
    }
    li {
      flex: 0 0 90px;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
  }
  .personal {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #fff;
    .appeal {
      margin-right: 30px;
      height: 40px;
      display: flex;
      align-items: center;
      div {
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        background-color: #f77321;
        box-shadow: 0px 3px 10px 0px rgba(16, 89, 255, 0.55);
        border-radius: 20px;
        cursor: pointer;
        color: #fff;
      }
    }
    .notice {
      margin: 0 30px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      img {
        width: 27px;
        height: 29px;
      }
    }
    .avatar {
      margin-right: 12px;
    }
    .ant-dropdown-link {
      cursor: pointer;
    }
  }
  .user {
    height: 44px;
    line-height: 44px;
  }
}
</style>
