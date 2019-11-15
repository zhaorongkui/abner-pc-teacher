<style scoped>
.time-cost {
  height: 28px;
  background: #eeeeee;
  display: inline-flex;
  border-radius: 14px;
  align-items: center;
  padding: 0 15px 0 3px;
}
.time-cost-name {
  height: 22px;
  background: #56ACFF;
  border-radius: 11px;
  color: #ffffff;
  line-height: 22px;
  text-align: center;
  padding: 0 8px;
}
.time-cost > .item-box {
  display: flex;
  align-items: center;
}
.box-label {
  font-size:11px;
  font-weight:400;
  color:rgba(153,153,153,1);
  margin-left: 11px;
}
.box-value {
  font-size:16px;
  font-weight:400;
  color:rgba(86,172,255,1);
  margin-left: 4px;
}
</style>

<template>
  <div class="time-cost">
    <div class="time-cost-name">
      {{'阅读' + changeNum(Number(labeltitle) - 1)}}
    </div>
    <div class="item-box" v-if="avageReadTime">
      <span class='box-label'>阅读用时</span>
      <span class='box-value'>{{avageReadTime | getCNTime}}</span>
    </div>
    <div class="item-box" v-if="avageAnswerTime">
      <span class='box-label'>作答用时</span>
      <span class='box-value'>{{avageAnswerTime | getCNTime}}</span>
    </div>
    <!-- <template v-for="(item, index) in itemList">
      <div class="item-box" :key="index">
        <span class='box-label'>{{item.label}}</span>
        <span class='box-value'>{{item.value}}</span>
      </div>
    </template> -->
  </div>
</template>

<script>
export default {
  name: 'timeCost',
  props: {
    name: {
      type: String,
      default: '篇目'
    },
    itemList: {
      type: Array,
      default () {
        return [
          {
            label: 'label',
            value: 'value'
          }
        ]
      }
    },
    labeltitle: {
      type: [Number, String],
      default: '篇目'
    },
    avageAnswerTime: {
      type: [Number, String],
      default: '--'
    },
    avageReadTime: {
      type: [Number, String],
      default: '--'
    }
  },
  filters: {
    getCNTime(val) {
      if(!val || val === '--') {
        return '--'
      }
      if(val > 60) {
        let minutes = Math.floor(val / 60);
        let seconds = parseInt(val % 60);
        return `${minutes}分${seconds}秒`
      }else {
        return val + '秒'
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeNum(val) {
      let arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      return arr[val]
    }
  }
}
</script>
