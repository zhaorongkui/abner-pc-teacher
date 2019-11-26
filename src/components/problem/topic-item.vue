<style scoped>
.topic-item {
  margin-bottom: 10px;
}
.item-title span {
  margin-bottom: 11px;
  display: inline-block;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  background: rgba(86, 172, 255, 1);
  border-radius: 12px;
  margin-right: 5px;
}
.item-htmlStr {
  word-break: break-all;
}
</style>

<template>
  <div class="topic-item">
    <div class="item-title">
      <span>
        {{ title }}
      </span>
    </div>
    <div
      v-if="htmlStr"
      class="item-htmlStr"
      :style="{ color: color }"
      v-html="htmlStr"
    ></div>
    <slot v-else></slot>
  </div>
</template>

<script>
// title高亮组件
export default {
  name: 'topicItem',
  props: {
    color: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'title'
    },
    htmlStr: {
      type: String,
      default: ''
    }
  }
}
</script>
