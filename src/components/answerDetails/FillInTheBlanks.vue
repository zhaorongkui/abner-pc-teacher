<style scoped>
.fill-in-the-blanks {
  display: flex;
  align-items:flex-start;
}
.answer-box, .reply-box {
  padding: 6px;
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
.answer-box {
  margin-left: 36px;
  margin-right: 12px;
}
.option {
  position: relative;
  cursor: pointer;
  width:135px;
  min-height:44px;
  background:rgba(240,240,240,1);
  border-radius:5px;
  padding: 10px; 
  margin-top: 8px;
}
.option-value {
  font-size:16px;
  font-weight:400;
  color:rgba(170,170,170,1);
  margin-right: 14px;
}
.option-label {
  flex: 1;
  font-size:16px;
  font-weight:400;
  word-break: break-all
}
.option-index {
  position: absolute;
  top: 0;
  right: 142px;
  min-width: 30px;
  height: 32px;
  line-height: 30px;
  padding: 0 13px;
  background: #ffffff;
  border:1px solid rgba(185, 185, 185, 1);
  border-right-color: transparent;
  box-shadow:0px 8px 38px 0px rgba(186,213,238,0.29);
  border-radius:16px 0px 0px 16px;
}
.reply-option {
  cursor: pointer;
  position: relative;
  width:135px;
  min-height:44px;
  background:rgba(240,240,240,1);
  border-radius:5px;
  margin-top: 8px;
  padding: 10px; 
}

.reply-option-value {
  font-size:12px;
  font-weight:400;
  word-break: break-all;
  color:rgba(78,95,113,1);
}

.success-box {
  background:#C4F3F0;
  border:1px solid rgba(19, 169, 159, 1);
  box-shadow:0px 8px 38px 0px rgba(186,213,238,0.29);
}
.success-box .reply-option-value {
  color: #14827B;
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

.error-box .reply-option-value {
  color: #E43F41;
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
  right: -70px;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

</style>
<template>
  <div class="fill-in-the-blanks">
    <div class="answer-box">
      <div class="box-title">参考答案</div>
      <template v-for="(item, index) in answer">
        <div class="option" :key="index">
          <div class="option-index">{{index + 1}}</div>
          <p class="option-label">
            <template v-for="(child, childIndex) in item.answer">
              <p v-html="decodeURIComponent(child)" :key="childIndex"></p>
            </template>
          </p>
        </div>
      </template>
    </div>
    <div class="reply-box">
      <div class="box-title">学生答案</div>
      <template v-for="(item, index) in reply">
        <div class="reply-option" :class="item.questionTeacherScore == 2 ? 'success-box' : 'error-box'" :key="index">
          <p class="reply-option-value">{{item.answer}}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// 填空题
export default {
  name: 'fillInTheBlanks',
  props: {
    answer: {
      type: Array,
      default () {
        return []
      }
    },
    reply: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Array,
      default () {
        return [
          {
            label: '选项一',
            value: 'A'
          },
          {
            label: '选项二',
            value: 'B'
          },
          {
            label: '选项三',
            value: 'C'
          },
          {
            label: '选项四',
            value: 'D'
          }
        ]
      }
    }
  }
}
</script>
