<template>
  <div class="exercise-lecture-wrap">
    <WorkDaily></WorkDaily>
  </div>
</template>

<script>
import WorkDaily from './components/WorkDaily'

export default {
  name: '',
  data() {
    return {}
  },
  computed: {},
  components: {
    WorkDaily
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.exercise-lecture-wrap {
  height: 100%;
}
</style>
