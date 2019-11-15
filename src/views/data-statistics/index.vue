<template>
  <div class="view-statistics-wrap">
    <EnglishSpeakingWorkStatistics
      v-if="dataItem.homeworkType == 3"
      :dataItem="dataItem"
      :pathType="pathType"
    ></EnglishSpeakingWorkStatistics>
    <ErrorWorkStatistics
      v-if="dataItem.homeworkType == 2"
      :dataItem="dataItem"
      :pathType="pathType"
    ></ErrorWorkStatistics>
    <DailyWorkStatistics
      v-if="dataItem.homeworkType == 1"
      :dataItem="dataItem"
      :pathType="pathType"
    ></DailyWorkStatistics>
  </div>
</template>

<script>
import localforage from 'localforage'
import ErrorWorkStatistics from './components/ErrorWorkStatistics'
import DailyWorkStatistics from './components/DailyWorkStatistics'
import EnglishSpeakingWorkStatistics from './components/EnglishSpeakingWorkStatistics'
var pathType = ''
export default {
  name: '',
  data() {
    return {
      type: 4,
      dataItem: {},
      subjectAbbreviation: '',
      pathType: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == '/work') {
      pathType = 1
    } else if (from.path == '/work-grading-assignment') {
      pathType = 2
    }
    next()
  },
  computed: {},
  components: {
    ErrorWorkStatistics,
    DailyWorkStatistics,
    EnglishSpeakingWorkStatistics
  },
  created() {
    this.pathType = pathType
  },
  mounted() {
    if (!this.$route.params.item) {
      localforage.getItem('dataStatistics').then(value => {
        this.dataItem = value
      })
      return
    }
    this.dataItem = this.$route.params.item
  },
  methods: {}
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.view-statistics-wrap {
  @include wh(100%, 100%);
}
</style>
