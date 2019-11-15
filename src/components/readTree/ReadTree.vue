<style scoped>
.read-tree {
  padding: 15px;
}
</style>
<template>
  <div class="read-tree">
    <template v-for="(item, index) in tree">
      <recursion-tree :data="item" :value="value" :zIndex="zIndex" :key="index + item.value" />
    </template>
  </div>
</template>

<script>
// 发布作业左侧练习册树形组件
import RecursionTree from './RecursionTree'
import Emitter from '../../mixins/emitter'
export default {
  name: 'ReadTree',
  components: {RecursionTree},
  mixins: [Emitter],
  props: {
    zIndex: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    tree: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    this.$on('on-check', this.handleCheck)
  },
  methods: {
    handleCheck (obj) {
      this.onClick(obj)
    },
    onClick(obj){
      let arr = [...this.value];
      if (obj.zIndex+1 > arr.length) {
        arr[obj.zIndex] = obj.value;
      } else if (obj.zIndex+1 === arr.length) {
        if (arr[obj.zIndex] === obj.value) {
        } else {
          arr[obj.zIndex] = obj.value;
        }
      } else {
        arr = arr.slice(0, obj.zIndex + 1)
        arr[arr.length - 1] = obj.value
      }
      this.$emit('input', arr)
      this.$emit('on-change', obj)
    }
  }
}
</script>

