<template>
  <div class="process-bar">
    <span>已批阅</span>
    <div class="process">
      <div
        class="bar"
        :style="{
          width:
            teacherReviewNum === 0
              ? '0'
              : (teacherReviewNum / studentNum) * 100 + '%'
        }"
      >
        {{ teacherReviewNum }}
      </div>
      <span class="unfinished-count">{{
        finishStudentNum - teacherReviewNum
      }}</span>
    </div>
    <span>未批阅</span>
  </div>
</template>
 
<script>
export default {
  name: '',
  components: {},
  props: ['teacherReviewNum', 'finishStudentNum', 'studentNum'],
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.process-bar {
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 30px;
  &:not(:last-child) {
    margin-bottom: 28px;
  }
  span {
    margin: 0 10px;
  }
  .process {
    width: 114px;
    height: 14px;
    background-color: #e8f0fb;
    position: relative;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
    .bar {
      height: 14px;
      line-height: 14px;
      background-color: #56acff;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
    }
    .unfinished-count {
      height: 14px;
      line-height: 14px;
      position: absolute;
      top: 0;
      right: -8px;
      z-index: 99;
      color: #aaaaaa;
    }
  }
}
.active {
  color: #1059ff;
}
</style>
