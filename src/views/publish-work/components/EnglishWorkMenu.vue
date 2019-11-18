<template>
  <div class="wrap">
    <header>
      {{ textBookName }}
      <span>{{ this.$store.state.userInfo.textbookTeachingmateriaName }}</span>
    </header>
    <ul class="list">
      <template v-for="(item, index) of EnglishWork">
        <EnglishWorkMenuItem :key="index" :item="item"></EnglishWorkMenuItem>
      </template>
    </ul>
  </div>
</template>

<script>
import EnglishWorkMenuItem from './EnglishWorkMenuItem'
export default {
  name: '',
  components: { EnglishWorkMenuItem },
  data() {
    return {}
  },
  computed: {
    textBookName() {
      return this.$store.getters.textbookName
    },
    EnglishWork() {
      return this.$store.state.publish.EnglishWork
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px 0px 0px 4px;
  display: flex;
  flex-direction: column;
  header {
    flex: 0 0 66px;
    background: rgba(57, 158, 255, 1);
    border-radius: 4px 4px 0px 0px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span {
      margin-top: 5px;
      font-size: 14px;
    }
  }
  .list {
    flex: auto;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
  }
}
</style>
