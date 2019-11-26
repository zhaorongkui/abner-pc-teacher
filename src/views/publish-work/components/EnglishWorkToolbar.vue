<template>
  <div class="EnglishWorkToolbar">
    <span>全部听说次数</span>
    <el-input-number :value="count" size="small" @change="handleChange" :min="1" :max="10" label="描述文字" :disabled="!checked"></el-input-number>
    <a-checkbox class="check" :checked="checked" @change="handleCheckedChange">全选</a-checkbox>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      //count: 1,
      checked: false
    }
  },
  computed: {
    count: {
      get: function() {
        return this.$store.state.publish.tscount
      },
      set: function(v) {
        this.$store.commit('publish/TSCOUNT', v)
      }
    },
    EnglishWorkList() {
      return this.$store.state.publish.EnglishWorkList || []
    },
    selectedItemList() {
      return this.$store.state.publish.selectedItemList
    }
  },
  watch: {
    EnglishWorkList(value) {
      if (value.length > 0) {
        this.checked = value.every(item => item.active)
      }
    }
  },
  methods: {
    handleChange(value) {
      this.count = value
      let list = [...this.EnglishWorkList]
      list.forEach((item, index) => {
        list[index] = { ...item, readNumber: this.count, active: true }
      })
      this.$store.commit('publish/ENGLISHWORKLIST', list)
      this.$store.commit('publish/SELECTITEM')
    },
    handleCheckedChange(value) {
      this.checked = value.target.checked
      let list = [...this.EnglishWorkList]
      if (this.checked) {
        list.forEach((item, index) => {
          list[index] = { ...item, readNumber: this.count, active: true }
        })
        this.$store.commit('publish/ENGLISHWORKLIST', list)
        this.$store.commit('publish/SELECTITEM')
      } else {
        list.forEach((item, index) => {
          list[index] = { ...item, readNumber: this.count, active: false }
        })
        this.$store.commit('publish/ENGLISHWORKLIST', list)
        this.$store.commit('publish/SELECTITEM')
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.EnglishWorkToolbar {
  width: 100%;
  flex: 0 0 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid #ddd;
  span {
    font-size: 16px;
    font-weight: 400;
    color: rgba(78, 95, 113, 1);
    margin-right: 10px;
    font-size: 14px;
  }
  .check {
    margin-left: 20px;
  }
}
</style>
