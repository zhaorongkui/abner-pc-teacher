<style scoped>
.selectLabels {
  width: 100%;
  font-size: 14px;
  display: flex;
}

.selectLabel {
  width: 60px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  color: #a9a9a9;
  margin-right: 7px;
  text-align: justify;
}
.selectLabel::after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 0;
}

.selectBoxs {
  flex: 1;
  color: #4e5f71;
  display: flex;
  align-items: center;
  flex-wrap: wrap
}
.selectBox {
  cursor: pointer;
  box-sizing: border-box;
  width: 95px;
  height: 34px;
  padding: 0 2px;
  background-color: #ebebeb;
  border-radius: 16px;
  text-align: center;
  line-height: 34px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.selectBox:last-child {
  margin-right: 0;
}
.selected {
  background-color: #e5f0fe;
  color: #1059FF;
}
</style>
<template>
  <div class="selectLabels">
    <div class="selectLabel">
      <span>{{selectName}}</span>
    </div>
    <div class="selectBoxs">
      <div
        class="selectBox"
        v-for="(selectItem, index) in selectData"
        :key="index"
        :class="{'selected': value === selectItem.value}"
        @click="selectBtn(selectItem)"
      >
        <span>{{selectItem.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filtrate",
  props: {
    selectName: {
      type: String,
      default: ""
    },
    selectData: {
      type: Array
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
  },
  data() {
    return {
    };
  },
  methods: {
    selectBtn(selectItem) {
      this.$emit('input', selectItem.value)
      this.$emit('on-change', selectItem)
    }
  }
};
</script>

