<style scoped>
.item-label {
  cursor: pointer;
  height:42px;
  padding: 15px;
  font-size:12px;
  font-weight:400;
  color:rgba(91,103,121,1);
  border-radius:8px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(210, 210, 210, 1);
  display: flex;
  align-items: center;
}

.item-children {
  margin-top: 10px;
}

.item-current {
  color: #1059FF;
  background:rgba(229,240,254,1);
}

.item-last {
  color: #ffffff;
  background:rgba(16,89,255,1);
  border:1px solid rgba(16, 89, 255, 1);
  box-shadow:0px 8px 38px 0px rgba(186,213,238,0.29);
}
</style>
<template>
  <div class="recursion-tree">
    <div class="tree-list">
      <div class="item-box" :key="data.value">
        <div class="item-label" :class="{'item-current': value.includes(data.value), 'item-last': value.length ? value[value.length - 1] === data.value : false}" @click.stop="onClick">
          {{data.label}}
        </div>
        <div  class="item-children">
          <!--<template v-if="(data.children && data.children.length) && (value[zIndex] && value[zIndex] === data.value) && data.expand">-->
          <template v-if="data.expand">
            <recursion-tree v-for="(item, index) in data.children" :key="index + item.value" style="margin-left: 12px;" :value="value" :zIndex="zIndex + 1" :data="item"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 树形组件递归子组件
import Emitter from '../../mixins/emitter'
import {findComponentUpward} from '../../util/assist'
export default {
  name: 'RecursionTree',
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
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.zIndex)
  },
  computed: {
  },
  methods: {
    onClick(){
      if (!((this.value[this.value.length - 1] !== this.data.value) && this.data.expand)) {
        if (this.data.children&&this.data.children.length) {
          this.$set(this.data, 'expand', !this.data.expand)
        }
      }
      this.dispatch('ReadTree', 'on-check', {...this.data, zIndex: this.zIndex})
    }
  }
}
</script>

