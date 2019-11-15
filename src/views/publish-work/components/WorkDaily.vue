<template>
  <div class="work-type-daily">
    <div class="work-type-select">
      <span :class="type == 0 ? 'hover-span' : ''" @click="selectType(0)"
        >练习册</span
      >
      <span :class="type == 1 ? 'hover-span' : ''" @click="selectType(1)"
        >试卷</span
      >
      <span :class="type == 2 ? 'hover-span' : ''" @click="selectType(2)"
        >收藏</span
      >
    </div>
    <WorkBook v-if="type == 0" @toParentEventOflength="getLength"></WorkBook>
    <TestPaper v-if="type == 1" @toParentEventOflength="getLength"></TestPaper>
    <Collection
      v-if="type == 2"
      @toParentEventOflength="getLength"
    ></Collection>
  </div>
</template>

<script>
import WorkBook from './componentsOfChild/WorkBook'
import TestPaper from './componentsOfChild/TestPaper'
import Collection from './componentsOfChild/Collection'
export default {
  name: '',
  data() {
    return {
      type: 0
    }
  },
  computed: {},
  components: {
    Collection,
    TestPaper,
    WorkBook
  },
  mounted() {},
  methods: {
    selectType(t) {
      this.type = t
    },
    getLength(len) {
      this.$emit('toParentEventOflen', len)
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.work-type-daily {
  @include wh(1200px, 85.4%);
  margin: 20px auto 0;
  .work-type-select {
    @include fj();
    @include wh(100%, 42px);
    align-items: center;
    background: #fff;
    span {
      @include wh(33.3%, 100%);
      text-align: center;
      line-height: 42px;
      @include sc(14px, #596878);
      cursor: pointer;
    }
    span:nth-of-type(2) {
      border-left: 1px solid rgba(185, 185, 185, 1);
      border-right: 1px solid rgba(185, 185, 185, 1);
    }
    span.hover-span {
      color: #fff;
      background: #1059ff;
    }
  }
}
</style>
