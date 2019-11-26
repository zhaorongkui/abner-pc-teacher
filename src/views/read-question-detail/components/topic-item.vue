<style scoped>
.topic-item {
  margin-bottom: 10px;
}
.item-title span {
  margin-bottom: 11px;
  display: inline-block; 
  padding: 0 10px;
  height:24px;
  line-height: 24px;
  color: #ffffff;
  background:rgba(86,172,255,1);
  border-radius:12px;
  margin-right: 5px;
}
</style>

<template>
  <div v-if="htmlStr" class="topic-item">
    <!-- <div class="item-htmlStr" v-html="getdata"></div> -->
    <div class="item-title" style="word-wrap: break-word;word-break: normal;">
      <span>
        {{title}}
      </span>
    </div>
    <div v-if="htmlStr" class="item-htmlStr" v-html="htmlStr" style="word-wrap: break-word;word-break: normal;"></div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'topicItem',
  props: {
    title: {
      type: String,
      default: 'title'
    },
    htmlStr: {
      type: String,
      default: ''
    },
    questiontype: {
      type: [String, Number]
    }
  }
}
</script>
