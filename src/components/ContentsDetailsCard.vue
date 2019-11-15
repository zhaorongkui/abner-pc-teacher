<style scoped>
.card-box {
  background:rgba(255,255,255,1);
  box-shadow:0px 16px 76px 0px rgba(186,213,238,0.29);
  border-radius:10px;
  display: flex;
  overflow: hidden;
}
.card-name {
  display: flex;
  justify-content: center;
  align-items: center;
  background:rgba(86,172,255,1);
  color: #ffffff;
  padding: 14px 24px;
  font-size:16px;
  font-weight:400;
}
.card-slot {
  flex: 1;
}
</style>
<template>
  <div class="card-box">
    <div class="card-name">
      {{name}}
    </div>
    <div class="card-slot">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'contentsDetailsCard',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>