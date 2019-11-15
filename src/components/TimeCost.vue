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
      {{name}}
    </div>
    <template v-for="(item, index) in itemList">
      <div class="item-box" :key="index">
        <span class='box-label'>{{item.label}}</span>
        <span class='box-value'>{{item.value}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'timeCost',
  props: {
    name: {
      type: String,
      default: '默认标题'
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
    }
  },
  data () {
    return {
    }
  }
}
</script>
