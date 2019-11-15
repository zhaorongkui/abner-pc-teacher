<template>
  <div class="full-screen-wrap">
    <div class="full-screen">
      <div>
        <img
          src="../../../assets/img/fullscreen/close.png"
          alt=""
          class="close"
          @click="close"
        />

        <div
          class="preview_pic"
          ref="elememt"
          :style="{
            transformOrigin: 'center center',
            transform: `translate(-50%, -50%) rotate(${rotateVal}deg) scale(${
              this.scale[this.scaleIndex]
            })`
          }"
        >
          <img :src="showStr" />
          <ul class="thumbnail" v-if="imgLists && imgLists.length > 1">
            <li
              v-for="img in imgLists"
              :key="img.fileSort"
              @click="selectImage(img.answerFileUrlStr)"
              :style="{
                opacity: img.answerFileUrlStr === showStr ? '1' : '.5'
              }"
            >
              <img
                :src="img.answerFileUrlStr"
                :style="{
                  border:
                    img.answerFileUrlStr === showStr
                      ? '1px solid #1059ff'
                      : '1px solid transparent'
                }"
              />
            </li>
          </ul>
        </div>

        <div class="scale">
          <img
            @click="getScale('larger')"
            src="../../../assets/img/fullscreen/larger.png"
          />
          <div></div>
          <img
            @click="getScale('smaller')"
            src="../../../assets/img/fullscreen/smaller.png"
          />
        </div>

        <img
          src="../../../assets/img/fullscreen/rotate.png"
          alt=""
          class="rotate"
          @click="rotate"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['getImageSrc', 'imgLists'],
  data() {
    return {
      scale: [1, 1.3, 1.6, 1.9, 2.2],
      scaleIndex: 0,
      rotateVal: 0
      //showStr: ''
    }
  },
  computed: {
    showStr: {
      get: function() {
        return `${this.getImageSrc}`
      },
      set: function(v) {
        console.log(v)
      }
    }
  },
  mounted() {
    this.showStr = this.getImageSrc ? this.getImageSrc : ''
    //去掉电脑自带滑动效果
    // history.pushState(null, null, document.URL)
    // window.addEventListener('popstate', function() {
    //   history.pushState(null, null, document.URL)
    // })
    this.$nextTick(() => {
      this.requestFullScreen()
    })
  },
  methods: {
    close() {
      var el = document
      var cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen
      if (cfs) {
        cfs.call(el)
      } else if (typeof window.ActiveXObject != 'undefined') {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
      // document.exitFullscreen
      //   ? document.exitFullscreen()
      //   : document.mozCancelFullScreen
      //   ? document.mozCancelFullScreen()
      //   : document.webkitExitFullscreen
      //   ? document.webkitExitFullscreen()
      //   : ''
      this.$emit('toParentsClose', false)
      this.showStr = ''
      // this.imgLists.splice(0, this.imgLists.length);
    },
    selectImage(str) {
      this.showStr = str
    },
    getScale(type) {
      if (type === 'larger') {
        this.scaleIndex++
        if (this.scaleIndex > this.scale.length - 1) {
          this.scaleIndex = this.scale.length - 1
        }
      } else {
        this.scaleIndex--
        if (this.scaleIndex < 0) {
          this.scaleIndex = 0
        }
      }
    },
    rotate() {
      this.rotateVal += 90
    },
    requestFullScreen() {
      var el = document.documentElement
      var rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen
      if (rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject != 'undefined') {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
      // var rfs = el.requestFullScreen ||  el.webkitRequestFullScreen ||  el.mozRequestFullScreen ||  el.msRequestFullScreen;
      // if (rfs) {
      //   rfs.call(el)
      // } else if (typeof window.ActiveXObject !== 'undefined') {
      //   //for Internet Explorer
      //   var wscript = new ActiveXObject('WScript.Shell')
      //   if (wscript !== null) {
      //     wscript.SendKeys('{F11}')
      //   }
      // }
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variable.scss';
.full-screen-wrap {
  scrollbar-width: none;
  @include wh(100%, 100%);
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  @include fj(center);
  align-items: center;
  > div {
    @include wh(100%, 100%);
    @include fj(center);
    align-items: center;
  }
}
.full-screen {
  @include wh(98%, 96%);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px;
  position: relative;
  transform: scale(1);
  > div {
    @include wh(100%, 100%);
    img.close {
      @include wh(46px, 46px);
      position: absolute;
      right: 25px;
      top: 20px;
    }
  }
}
</style>

<style scoped>
.full-screen {
  width: 100%;
  height: 100%;
}
.full-screen > div {
  width: 100%;
  height: 100%;
  position: relative;
}
.preview_pic {
  padding: 19px;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 18px;
}
.preview_pic img {
  max-width: 993px;
  max-height: 531px;
  border-radius: 12px;
}
.close {
  cursor: pointer;
}
.scale {
  width: 36px;
  height: 80px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 0 5px rgba(16, 17, 99, 0.16);
  position: absolute;
  top: 450px;
  right: 54px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}
.scale > img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.scale > div {
  width: 26px;
  height: 1px;
  border: 1px solid #c5c5c5;
  margin: 5px auto;
}
.rotate {
  width: 45px;
  height: 45px;
  position: absolute;
  top: 580px;
  right: 54px;
  cursor: pointer;
}
.thumbnail {
  margin-top: 11px;
  display: flex;
}
.thumbnail > li {
  margin-left: 10px;
  margin-right: 10px;
}
.thumbnail > li:first-child {
  margin-left: 0;
}
.thumbnail > li > img {
  width: 55px;
  height: 55px;
  cursor: pointer;
}
</style>