<template>
  <div class="gap-filling">
    <ul>
      <li class="item" v-for="(item, index) of list" :key="index">
        <span>{{ index + 1 }}、</span>
        <div
          class="item"
          v-for="(answer, innerIndex) of item.answer"
          :key="innerIndex"
        >
          <span
            v-if="item.property === 1"
            v-html="decodeURIComponent(answer)"
          ></span>
          <span v-else v-html="answer"></span>
          <span v-if="innerIndex + 1 !== item.answer.length">或</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'gap-filling',
  components: {},
  props: ['answer'],
  computed: {
    list() {
      let list = this.answer && JSON.parse(this.answer)
      return list
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  font-size: 14px;
}
</style>
