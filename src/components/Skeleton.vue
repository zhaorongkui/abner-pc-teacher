<style scoped>
.skeleton {
  position: relative;
}
.skeleton-text {
  height: 25px;
  width: 255px;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  background: #ffffff;
  position: absolute;
  font-size:16px;
  font-weight:400;
  color:rgba(150,150,150,1);
  text-align: center;
  line-height: 25px;
}
</style>
<template>
  <div class="skeleton">
    <div class="skeleton-text">{{text}}</div>
    <a-skeleton :paragraph="{rows: rows, width: widths}" :title='false' />
  </div>
</template>
<script>
export default {
  name: 'skeleton',
  props: {
    text: {
      type: String,
      default: '无数据'
    },
    rows: {
      type: Number,
      default: 6
    },
    widths: {
      type: [Array,Number,String],
      default () {
        return ['100%', '98%', '95%', '90%', '93%', '85%']
      } 
    }
  }
}
</script>