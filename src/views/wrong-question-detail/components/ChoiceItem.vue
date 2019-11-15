<template>
  <div class="choice-item">
    <ul class="list">
      <li class="item" v-for="(item, index) of questionOptions" :key="index">
        <div>
          <p>{{ item.questionOption }}、</p>
        </div>
        <div v-html="item.questionContent"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'choice-item',
  components: {},
  props: ['questionOptions'],
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>
