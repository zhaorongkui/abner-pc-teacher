<template>
  <div class="big-video">
    <video-player
      class="vjs-custom-skin vjs-big-play-centered"
      :class="resourceType === 2 ? 'nofull' : ''"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @ready="playerReadied"
    >
    </video-player>
    <img
      v-if="resourceType === 2"
      class="audio-player-bg"
      src="../../../assets/img/audio-player-bg.png"
      alt=""
    />
    <div class="close" @click="handleHideBIg">
      <img src="../../../assets/img/close1.png" alt="" />
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  props: ['src', 'resourceType'],
  data() {
    return {
      // videojs options
      playerOptions: {
        width: '800px',
        height: '450px',
        autoplay: true,
        // muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            // mp4
            // src: 'http://vjs.zencdn.net/v/oceans.mp4'
            src: ''
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        // poster:
        //   'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
        poster: ''
      }
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
    // setTimeout(() => {
    // console.log('dynamic change options', this.player)

    // change src
    this.playerOptions.sources[0].src = this.src
    this.playerOptions.poster =
      this.src + '?x-oss-process=video/snapshot,t_5000,f_png,w_275,h_185,m_fast'

    // change item
    // this.$set(this.playerOptions.sources, 0, {
    //   type: "video/mp4",
    //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    // })

    // change array
    // this.playerOptions.sources = [{
    //   type: "video/mp4",
    //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    // }]
    // this.player.muted(false)
    // }, 5000)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    handleHideBIg(event) {
      event.preventDefault()
      event.stopPropagation()
      this.$emit('onHideBig')
    },
    // listen event
    // onPlayerPlay(player) {
    //   console.log('player play!', player)
    // },
    // onPlayerPause(player) {
    //   console.log('player pause!', player)
    // },
    // onPlayerEnded(player) {
    //   console.log('player ended!', player)
    // },
    // onPlayerLoadeddata(player) {
    //   console.log('player Loadeddata!', player)
    // },
    // onPlayerWaiting(player) {
    //   console.log('player Waiting!', player)
    // },
    // onPlayerPlaying(player) {
    //   console.log('player Playing!', player)
    // },
    // onPlayerTimeupdate(player) {
    //   console.log('player Timeupdate!', player.currentTime())
    // },
    // onPlayerCanplay(player) {
    //   console.log('player Canplay!', player)
    // },
    // onPlayerCanplaythrough(player) {
    //   console.log('player Canplaythrough!', player)
    // },

    // or listen state event
    // playerStateChanged(playerCurrentState) {
    //   console.log('player current update state', playerCurrentState)
    // },

    // player is ready
    playerReadied(player) {
      // seek to 10s
      player.currentTime()
    }
  }
}
</script>
<style lang="scss">
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
.video-js .vjs-big-play-button {
  font-size: 2.5em;
  line-height: 2.3em;
  height: 2.5em;
  width: 2.5em;
  border-radius: 2.5em;
  background-color: rgba(115, 133, 159, 0.5);
  border-width: 0.15em;
  margin-top: -1.25em;
  margin-left: -1.25em;
  outline: none;
  z-index: 99;
}
.vjs-control,
.vjs-button {
  z-index: 99999;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}
.big-video {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .close {
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50px;
    color: #fff;
    position: absolute;
    top: -50px;
    right: -50px;
    z-index: 99999999999999;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 23px;
      height: 23px;
      margin-top: 40px;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .audio-player-bg {
    width: 800px;
    height: 414px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -225px);
  }
}
.nofull {
  .video-js .vjs-fullscreen-control {
    display: none;
  }
}
</style>
