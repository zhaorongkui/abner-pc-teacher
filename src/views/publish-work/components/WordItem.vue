<template>
  <li class="word-item" @click="handleChoice" :class="{ active: item.active }">
    <span>{{ item.word }}</span>
  </li>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['item', 'pageIndex', 'wordIndex'],
  data() {
    return {}
  },
  methods: {
    handleChoice() {
      this.$store.commit('publish/UPDATEWORD', {
        wordIndex: this.wordIndex,
        pageIndex: this.pageIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.word-item {
  width: 190px;
  height: 60px;
  background-image: url('../.../../../../assets/img/publish/pic_zuoye_fabu_neirong_danci1_normal@2x.png');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-left: 10px;
  cursor: pointer;
}
.word-item.active {
  color: rgba(16, 89, 255, 1);
  background-image: url('../../../assets/img/publish/pic_zuoye_fabu_neirong_danci1_selected@2x.png');
}
</style>
