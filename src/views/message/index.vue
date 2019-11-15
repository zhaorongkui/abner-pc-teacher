<template>
  <div class="message">
    <AppMenu>
      <MessageMenu></MessageMenu>
    </AppMenu>
    <AppContent>
      <router-view></router-view>
    </AppContent>
  </div>
</template>

<script>
import localforage from 'localforage'
import AppMenu from '../../components/AppMenu'
import AppContent from '../../components/AppContent'
import MessageMenu from './components/MessageMenu'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('message')
export default {
  name: '',
  components: {
    AppMenu,
    AppContent,
    MessageMenu
  },
  data() {
    return {}
  },
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.getListCount()
        this.sendListCount()
      }
    })
  },
  methods: {
    ...mapActions(['getListCount', 'sendListCount'])
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 1200px;
  height: 98%;
  padding: 15px 0 0 0;
  margin: 0 auto;
  display: flex;
}
</style>
