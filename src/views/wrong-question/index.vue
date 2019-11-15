<template>
  <div class="wrong-topic">
    <AppMenu>
      <WrongTopicMenu></WrongTopicMenu>
    </AppMenu>
    <AppContent>
      <WrongTopicList></WrongTopicList>
    </AppContent>
    <PublishBtn></PublishBtn>
  </div>
</template>

<script>
import AppMenu from '../../components/AppMenu'
import AppContent from '../../components/AppContent'
import WrongTopicMenu from './components/WrongTopicMenu'
import WrongTopicList from './components/WrongTopicList'
import PublishBtn from '../../components/PublishHomeweek'
export default {
  name: 'wrong-topic',
  components: {
    AppMenu,
    AppContent,
    WrongTopicMenu,
    WrongTopicList,
    PublishBtn
  },
  data() {
    return {}
  },
  created() {
    //this.$store.commit('work/UPDATEHOMEWORKTYPE', 2)
  },
  mounted() {
    this.$store.commit('question/UPDATECHAPTERCODE', undefined)
    localStorage.setItem('workType', '2')
    //this.$store.commit('work/UPDATEHOMEWORKTYPE', 2)
  }
}
</script>

<style lang="scss" scoped>
.wrong-topic {
  width: 1200px;
  height: calc(100vh - 70px);
  padding: 15px 0;
  margin: 0 auto;
  display: flex;
  position: relative;
}
</style>
