<template>
  <radial-progress-bar
    :completed-steps="completedSteps"
    :total-steps="totalSteps"
    :diameter="diameter"
    :startColor="progressConfig.startColor"
    :stopColor="progressConfig.stopColor"
    :innerStrokeColor="progressConfig.innerStrokeColor"
    :strokeWidth="progressConfig.strokeWidth"
  >
    <slot />
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";
export default {
  name: 'radial-progress',
  components: {
    RadialProgressBar
  },
  props: {
    completedSteps: {
      default: 0,
      required: true
    },
    totalSteps: {
      default: 100
    },
    diameter: {
      default: 144
    }
  },
  data () {
    return {
      progressConfig: {
        startColor: "#52A3F1",
        stopColor: "#B3DAC0",
        innerStrokeColor: "#E8E8E8",
        strokeWidth: 5
      }
    }
  }
}
</script>

<style>

</style>
