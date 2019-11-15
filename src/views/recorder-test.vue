<template>
  <div class="wrap">
    <Recorder @handleStop="handelEndRecord"></Recorder>
    <audio
      v-if="msource"
      :src="msource"
      controls="controls"
      class="content-audio"
      style="display: block;"
    >
      语音
    </audio>
  </div>
</template>
<script>
import Recorder from '../components/recorder/recorder'
export default {
  name: 'MRecorder',
  data() {
    return {
      msource: ''
    }
  },
  components: {
    Recorder
  },
  methods: {
    handelEndRecord(param) {
      console.log(param)
      this.msource = param.url
    }
  }
}
</script>
<style scoped>
</style>
