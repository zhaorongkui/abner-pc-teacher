<template>
  <div class="custom-mode-card">
    <div class="card-name">
      <span>
        {{title}}
      </span>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
// 自定义卡片
import localforage from 'localforage'
export default {
  name: 'read-question-details',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .custom-mode-card {
    position: relative;
    width: 100%;
    min-height: 50px;
    margin: 10px 0;
    display: inline-flex;
    background:rgba(255,255,255,1);
    border:1px solid rgba(194, 225, 255, 1);
    box-shadow:0px 8px 10px 0px rgba(186,213,238,0.29);
    opacity:0.95;
    overflow: hidden;
    border-radius:14px;
  }
  .card-name {
    font-size: 18px;
    min-height: 50px;
    max-height: 100%;
    background: #29ADBB;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 9px;
  }
  .card-body {
    min-width: 0;
    flex: 1;
    padding: 18px 14px;
  }
</style>
