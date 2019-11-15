<template>
  <div class="legend">
    <div
      class="legend-item"
      v-for="item in legendList"
      :style="{ background: item.bgColor, color: item.color }"
      :key="item.text"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legend',
  props: {
    legendList: {
      type: Array,
      default() {
        return [
          {
            text: '',
            bgColor: '',
            color: ''
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.legend-item {
  display: inline-block;
  height: 21px;
  line-height: 21px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: #eeeeee;
  margin-right: 15px;
  border-radius: 4px;
}
.legend-item:last-child {
  margin-right: 0;
}
</style>
