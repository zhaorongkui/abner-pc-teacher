<template>
  <div class="resource-management">
    <AppMenu>
      <div class="upload">
        <router-link to="/resource-management-upload">
          <img
            src="../../assets/img/btn_ziyuanguanli_shangchuan@2x.png"
            alt=""
          />
          <span>上传资源</span>
        </router-link>
      </div>
      <Menu :updateViewer="updateViewer"></Menu>
    </AppMenu>
    <AppContent>
      <Resource @updateViewer="updateViewer"></Resource>
    </AppContent>
  </div>
</template>

<script>
import localforage from 'localforage'
import Viewer from 'viewerjs'
import AppMenu from '../../components/AppMenu'
import AppContent from '../../components/AppContent'
import Menu from './components/Menu'
import Resource from './components/Resource'
export default {
  name: 'resource-management',
  components: {
    AppMenu,
    AppContent,
    Menu,
    Resource
  },
  data() {
    return {
      Viewer: null
    }
  },
  methods: {
    updateViewer() {
      this.Viewer.destroy()
      const ViewerDom = document.getElementById('index')
      this.Viewer = new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
      })
    }
  },
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.$store.dispatch('resource/queryResourceList').then(() => {
          const ViewerDom = document.getElementById('index')
          this.Viewer = new Viewer(ViewerDom, {
            // 相关配置项,详情见下面
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.resource-management {
  width: 1200px;
  height: 99%;
  padding: 15px 0;
  display: flex;
  .upload {
    width: 100%;
    height: 66px;
    background: rgba(57, 158, 255, 1);
    padding: 0 35px;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      width: 100%;
      height: 35px;
      background-color: #fff;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #399eff;
      img {
        width: 24px;
        height: 18px;
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        font-weight: 500;
      }
    }
  }
}
</style>
