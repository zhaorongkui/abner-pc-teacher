<style scoped>
.work-type-select {
  display: flex;
  width: 100%;
  height:42px;
  background:rgba(255,255,255,1);
  box-shadow:0px 6px 9px 0px rgba(186,213,238,0.18);
  border-radius:4px;
  border: 1px solid #B9B9B9;
}
.select-option {
  cursor: pointer;
  flex: 1;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid #B9B9B9;
  font-size:14px;
  font-weight:400;
  color: rgba(89,104,120,1);
}
.select-option:last-child {
  border-right: none;
}
.select-option-current {
  background:rgba(16,89,255,1);
  box-shadow:0px 6px 9px 0px rgba(186,213,238,0.18);
  color: #ffffff;
}
</style>
<template>
  <div class="work-type-select">
    <template v-for="item in options">
      <div class="select-option" :class="{'select-option-current': value === item.value}" :key="item.value" @click="onClick(item)">
        {{item.label}}
      </div>
    </template>
  </div>
</template>

<script>
// 作业类型选中组件
export default {
  name: 'WorkTypeSelect',
  props: {
    options: {
      type: Array,
      default () {
        return [
          {
            label: '练习册',
            value: 0
          },
          {
            label: '我的资源',
            value: 1
          },
          {
            label: '收藏',
            value: 2
          }
        ]
      }
    },
    value: {
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    onClick (item) {
      this.$emit('input', item.value);
      this.$emit('on-change', item)
    }
  }
}
</script>

