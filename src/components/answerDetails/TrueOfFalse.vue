<style scoped>

.true-of-false{
  display: flex;
  justify-content: center;
}

.true-box, .false-box {
  padding: 6px;
  width:86px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(185, 185, 185, 1);
  box-shadow:0px 8px 38px 0px rgba(186,213,238,0.29);
  border-radius:12px;
}

.box-title {
  font-size:14px;
  font-weight:400;
  color:rgba(78,95,113,1);
  text-align: center;
}

.answer-box, .reply-box {
  cursor: pointer;
  position:relative;
  height:50px;
  background:rgba(221,221,221,1);
  border-radius:12px;
  font-size:17px;
  font-weight:400;
  color:rgba(78,95,113,1);
  text-align: center;
  margin-top: 8px;
  line-height: 50px;
}
.true-box {
  margin-right: 12px;
}

.reply-box::before {
  right: -70px;
}

.success-box {
  background:#C4F3F0;
  border:1px solid rgba(19, 169, 159, 1);
  box-shadow:0px 8px 38px 0px rgba(186,213,238,0.29);
}
.success-box::before{
  content: '做对了!';
  color: #13A99F;
}
.error-box {
  background:#FFEBEB;
  border:1px solid rgba(255, 99, 101, 1);
  box-shadow:0px 8px 38px 0px rgba(186,213,238,0.29);
}
.error-box::before{
  content: '做错了!';
  color: #FF6365;
}

.success-box::before, .error-box::before{
  position: absolute;
  font-size:14px;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

</style>
<template>
  <div class="true-of-false">
    <div class="true-box">
      <div class="box-title">参考答案</div>
      <div class="answer-box">
        {{answer === 'Y' ? '正确':'错误'}}
      </div>
    </div>
    <div class="false-box">
      <div class="box-title">学生答案</div>
      <div class="reply-box" :class="reply ? (isSuccess ? 'success-box' : 'error-box') : ''">
        {{reply === 'Y' ? '正确':'错误'}}
      </div>
    </div>
  </div>
</template>

<script>
// 判断题
export default {
  name: 'trueOfFalse',
  props: {
    answer: {
      type: String,
      required: true
    },
    reply: {
      type: String,
      required: true
    }
  },
  computed: {
    isSuccess () {
      return this.answer === this.reply
    }
  },
  data () {
    return {
    }
  }
}
</script>
