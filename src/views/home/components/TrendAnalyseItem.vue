<template>
  <div class="TrendAnalyseItem">
    <a-checkbox :checked="checked" @change="onChange">
      <span :class="['grader' + index]">{{
        item.gradeClassname.substring(0, 4)
      }}</span>
    </a-checkbox>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['item', 'index'],
  data() {
    return {
      checked: true
    }
  },
  methods: {
    onChange(event) {
      this.checked = event.target.checked
      this.$emit('updateGradeClass', this.item.gradeClassid)
    }
  }
}
</script>

<style lang="scss" scoped>
.grader0 {
  border-bottom: 2px solid #0fa2ff;
}
.grader1 {
  border-bottom: 2px solid #ff9948;
}
.grader2 {
  border-bottom: 2px solid #36cab0;
}
.grader3 {
  border-bottom: 2px solid #cb70ff;
}
</style>
