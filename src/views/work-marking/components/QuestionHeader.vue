<template>
  <div class="header">
    <div class="left">
      <div>
        <span>练习册名称</span
        ><span>{{ questionInfo.questionSourceName }}</span>
      </div>
      <div><span>页数</span><span>3</span></div>
      <div><span>题号</span><span>10</span></div>
      <div>
        <span>题型</span
        ><span>{{ questionInfo.questionTypeCode | filterType }}</span>
      </div>
    </div>
    <div class="right">
      <img src="../../../assets/img/ic_collect_heart@2x.png" alt="" />
      <span>加入收藏</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  filters: {
    filterType(value) {
      switch (value) {
        case 1:
          //语句
          return '单选'
        case 2:
          return '多选'
        case 3:
          return '判断'
        case 4:
          return '题组'
        case 5:
          return '填空题'
        case 6:
          return '主观题'
      }
    }
  },
  props: ['questionInfo'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  .left {
    display: flex;
    align-items: center;
    div {
      padding: 0 20px;
      span:first-child {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-right: 10px;
      }
      span:last-child {
        font-size: 16px;
        font-weight: 400;
        color: rgba(94, 132, 173, 1);
      }
    }
    div:first-child {
      padding-left: 0;
    }
    div:not(:last-child) {
      border-right: 1px solid #eee;
    }
  }
  .right {
    img {
      width: 16px;
      height: 14px;
      margin-right: 10px;
    }
  }
}
</style>
