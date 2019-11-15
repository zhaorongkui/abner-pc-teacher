<template>
  <div class="layout">
    <AppHeader></AppHeader>
    <section class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </section>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
export default {
  name: 'layout',
  components: { AppHeader },
  data() {
    return {}
  },
  watch: {
    $route(to, from) {
      if (from.meta.keepAlive && from.path == '/work') {
        from.meta.savedPosition = document.querySelector(
          '.content .list'
        ).scrollTop
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  min-height: 0;
  flex: auto;
  height: 100%;
  background-color: #f0f7ff;
  display: flex;
  justify-content: center;
  scrollbar-width: none;
}
</style>
