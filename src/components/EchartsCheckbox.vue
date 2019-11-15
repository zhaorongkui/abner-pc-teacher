<style scoped>
.echarts-checkbox {
}
.data-item {
  display:inline-block;
  border-bottom: 2px solid transparent;
}
</style>
<template>
  <div class="echarts-checkbox">
    <a-checkbox-group v-model="inputValue" @change="onChange" v-if="showCheckbox">
      <template v-for="(item, index) in data">
        <a-checkbox :value="item" :key="item">
          <span class="data-item" :style="{borderColor:borderColor[index%11]}">{{item}}</span>
        </a-checkbox>
      </template>
    </a-checkbox-group>
    <div class="data-label" v-else>
      <template v-for="(item, index) in data">
        <span class="data-item" :style="{borderColor:borderColor[index%11], marginLeft: '18px'}" :key="item">{{item}}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'echartsCheckbox',
  data () {
    return {
      inputValue: [],
    }
  },
  watch: {
    value () {
      this.inputValue = this.value
    }
  },
  props: {
    showCheckbox: {
      type: Boolean,
      default: true 
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    borderColor: {
      type: Array,
      default () {
        "#0FA2FF",
        "#FF9948",
        "#36CAB0",
        "#CB70FF",
        "#d889f5",
        "#687dff",
        "#bbc60d",
        "#fc5266",
        "#49dfe5",
        "#6060a7",
        "#9c8645"
      }
    }
  },
  methods: {
    onChange() {
      console.log('多选')
      console.log(this.inputValue)
      this.$emit('input', this.inputValue)
      this.$emit('on-change', this.inputValue)
    }
  }
}
</script>