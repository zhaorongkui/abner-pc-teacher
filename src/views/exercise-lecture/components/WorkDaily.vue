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
    <WorkBook v-if="type == 0"></WorkBook>
    <TestPaper v-if="type == 1"></TestPaper>
    <Collection v-if="type == 2"></Collection>
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
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.work-type-daily {
  @include wh(1200px, 96%);
  margin: 15px auto 0;
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
    span.hover-span {
      color: #fff;
      background: #1059ff;
    }
  }
}
</style>
