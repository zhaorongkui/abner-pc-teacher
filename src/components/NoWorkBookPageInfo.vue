<template>
  <div class="null">
    <img src="../assets/img/publish/nulldata.png" alt="您还没有阅读训练题目，可以联系我们添加！" />
    <span>您还没有阅读训练题目，可以联系我们添加！</span>
  </div>
</template>  
<script>
// 没有题目默认显示组件
export default {
}
</script>
<style scoped>
.null {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.null img {
  width: 215px;
  height: 188px;
}

.null span {
  font-size: 14px;
  color: #6181ca;
  margin-top: 23px;
}
</style>