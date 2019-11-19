<template>
  <li
    class="child"
    :class="EnglishWorkUnitModelId === child.unitModelId ? 'active' : ''"
    @click="handleEnglishWorkUnitModelId(child.unitModelId)"
  >
    <p>{{ child.unitModelName }}</p>
  </li>
</template>

<script>
export default {
  name: '',
  components: {},
  // props: ['child'],
  props: {
    child: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    EnglishWorkUnitModelId() {
      return this.$store.state.publish.EnglishWorkUnitModelId
    }
  },
  methods: {
    handleEnglishWorkUnitModelId(unitModelId) {
      this.$store.commit('publish/TSCOUNT', 1)
      localStorage.setItem('EnglishWorkUnitModelId', unitModelId)
      this.$store.commit('publish/ENGLISHWORKUNITMODEID', unitModelId)
      this.$store.dispatch('publish/unitModel')
      this.$parent.itemBac = false
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.child {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid rgba(210, 210, 210, 1);
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 0 10px;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.sub-menu.active {
  .child.active {
    background-color: #1059ff;
    color: #fff;
  }
}
</style>
