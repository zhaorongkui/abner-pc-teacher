<template>
  <div class="app-video" @click.prevent="handleShowBig">
    <div v-if="resourceType === 2" class="audio">
      <img src="../../../assets/img/ic_personal_ziyuan_audio@2x.png" alt="" />
    </div>
    <div class="no-bar" v-else>
      <video-player
        class="vjs-custom-skin vjs-big-play-centered"
        ref="videoPlayer"
        :options="playerOptions"
        @ready="playerReadied"
      >
      </video-player>
    </div>

    <div class="layer"></div>
    <BigVideo
      @onHideBig="handleHideBig"
      v-if="isShowBig"
      :resourceType="resourceType"
      :src="src"
    ></BigVideo>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import BigVideo from './BigVideo'
export default {
  components: {
    videoPlayer,
    BigVideo
  },
  props: {
    src: String,
    resourceType: Number
  },
  data() {
    return {
      // videojs options
      playerOptions: {
        width: '240px',
        height: '130px',
        autoplay: false,
        muted: true,
        language: 'en',
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
        poster: '',
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: false //全屏按钮
        }
      },
      isShowBig: false
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
    // setTimeout(() => {
    // console.log('dynamic change options', this.player)

    // change src
    console.log(this.src)
    // this.playerOptions.sources[0].src = this.src

    this.playerOptions.poster =
      this.src + '?x-oss-process=video/snapshot,t_5000,f_png,w_275,h_185,m_fast'
    // change item
    this.$set(this.playerOptions.sources, 0, {
      type: 'video/mp4',
      src: this.src
    })

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
    handleShowBig() {
      this.isShowBig = true
      this.player.pause()
      this.player.currentTime(5000)
    },
    handleHideBig() {
      this.isShowBig = false
    },
    // // listen event
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

    // // or listen state event
    // playerStateChanged(playerCurrentState) {
    //   console.log('player current update state', playerCurrentState)
    // },

    // player is ready
    playerReadied(player) {
      // seek to 10s
      // console.log('example player 1 readied', player)
      player.currentTime(0)
      // console.log('example 01: the player is readied', player)
    }
  }
}
</script>
<style lang="scss">
.app-video {
  width: 240px;
  height: 130px;
  position: relative;
  .audio {
    width: 100%;
    height: 100%;
    background-image: url('../../../assets/img/audio-background.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 62.5px;
      height: 62.5px;
    }
  }
}
.layer {
  width: 240px;
  height: 130px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
}
.no-bar {
  .vjs-control-bar {
    display: none !important;
  }
}
</style>
