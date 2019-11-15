<template>
  <div class="reading">
    <div class="chart-content">
      <ability-analyze />
    </div>
    <div class="statistical-table table-card card">
      <statistical-table />
    </div>
  </div>
</template>

<script>
import AbilityAnalyze from './components/AbilityAnalyze'
import StatisticalTable from './components/StatisticalTable'
export default {
  name: "student-details",
  components: {AbilityAnalyze, StatisticalTable}
}
</script>
