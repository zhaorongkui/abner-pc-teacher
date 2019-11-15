<template>
  <div
    class="menu-item"
    :class="[
      wordMenuIndex === index ? 'active' : '',
      item.active ? 'wordActive' : ''
    ]"
    @click="handleSwitchMenu"
  >
    {{ item.textbookChapterName }}
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['item', 'index'],
  computed: {
    wordMenuIndex() {
      return this.$store.state.publish.wordMenuIndex
    }
  },
  methods: {
    handleSwitchMenu() {
      if (this.index !== this.wordMenuIndex) {
        this.$store.commit('publish/UPDATEWORDMENUINDEX', this.index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  width: 250px;
  height: 42px;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(210, 210, 210, 1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.wordActive {
  color: #1059ff;
  border: 1px solid #1059ff;
}
.active {
  background-color: #1059ff;
  color: #fff;
}
</style>
