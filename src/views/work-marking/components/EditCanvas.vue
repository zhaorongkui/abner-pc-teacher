<template>
  <div id="canvas-warp">
    <canvas id="canvas">
      你的浏览器居然不支持Canvas？！赶快换一个吧！！
    </canvas>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['src', 'picIndex'],
  components: {},
  data() {
    return {
      font: '20px italic serif',
      color: 'red',
      blob: null,
      picJson: {}
      //imgJson: {}
    }
  },
  computed: {
    // imgJson() {
    //   return this.$store.state.marking.imgUrl
    // }
  },
  watch: {
    src(value) {
      this.init(value)
    }
    // picIndex(value) {
    //   //debugger
    //   var i = 0
    //   for (let key in this.imgJson) {
    //     if (key == value) {
    //       this.init(this.imgJson[key])
    //       break
    //     } else if (i == this.imgJson.length - 1) {
    //       this.init()
    //     }
    //     i++
    //   }
    // }
  },
  mounted() {
    this.init(this.src)
  },
  methods: {
    init(value) {
      var x, y, input
      var canvasWarp = document.getElementById('canvas-warp')
      var canvas = document.getElementById('canvas')

      var img = new Image()
      img.crossOrigin = 'Anonymous' //解决跨域图片问题，就是上面提及的
      img.src = value
      let _this = this
      img.onload = function() {
        canvasWarp.style.width = img.width > 870 ? 870 : img.width + 'px'
        canvasWarp.style.height = img.height > 420 ? 420 : img.height + 'px'

        canvas.width = img.width > 870 ? 870 : img.width
        canvas.height = img.height > 420 ? 420 : img.height
        var context = canvas.getContext('2d')
        this.context = canvas.getContext('2d')
        context.fillStyle = '#FFF'
        context.fillRect(0, 0, img.width, img.height)
        context.drawImage(img, 0, 0)
        canvas.onclick = function(e) {
          x = e.x || e.clientX
          y = e.y || e.clientY
          var bbox = canvas.getBoundingClientRect()
          x = x - bbox.left * (canvas.width / bbox.width)
          y = y - bbox.top * (canvas.height / bbox.height)
          if (input) {
            return
          }
          // input = document.createElement('textarea')
          // canvasWarp.appendChild(input)
          // input.style.lineHeight = 18
          // input.style.position = 'absolute'
          // input.style.top = y + 'px'
          // input.style.left = x + 'px'
          // input.style.width = canvas.width - x + 'px'
          // input.style.height = canvas.height - y + 'px'
          // input.style.resize = 'none'
          // input.style.font = _this.font
          // input.style.color = _this.color
          // input.style.backgroundColor = 'transparent'
          // input.style.outline = 'none'
          // input.style.border = 'none'
          //input.focus()
          // input.onblur = function() {
          //   //1. 使用`font`设置字体。
          //   context.font = _this.font
          //   // //2. 使用`fillStyle`设置字体颜色。
          //   context.fillStyle = _this.color
          //   // context.textBaseline = 'top'
          //   // //3. 使用`fillText()`方法显示字体。
          //   let text = input.value
          //   // var textList = text.split('\n')
          //   // textList.forEach((item, index) => {
          //   //   // context.fillText(item, x + 1, y + 21 + 24 * index)
          //   // })
          //   // context.wrapText(text, x, y, canvas.width - x)
          //   // context.wrapText(text, x + 1, y + 21 + 24)
          //   // context.fillText(input.value, x - 1, y + 21)
          //   let bytelength = parseInt((canvas.width - x) / 10)
          //   // console.log(bytelength)
          //   _this.writeTextOnCanvas(context, 28, bytelength, text, x, y + 21)
          //   canvasWarp.removeChild(input)
          //   input = null

          //   // 导出图片
          //   // console.log(blob)
          //   canvas.toBlob(function(blob) {
          //     _this.blob = blob
          //     _this.picJson[_this.picIndex] = blob
          //     var image = new Image()
          //     image.src = canvas.toDataURL('image/png')
          //     console.log(_this.imgJson)
          //     _this.imgJson[_this.picIndex] = image.src

          //     _this.$store.commit('marking/IMGURL', _this.imgJson)
          //     _this.$emit('importImg', _this.picJson)
          //   })
          // }

          canvas.toBlob(function(blob) {
            _this.blob = blob
            _this.picJson[_this.picIndex] = blob
            var image = new Image()
            image.src = canvas.toDataURL('image/png')
            //_this.imgJson[_this.picIndex] = image.src

            //_this.$store.commit('marking/IMGURL', _this.imgJson)
            _this.$emit('importImg', _this.picJson)
          })
        }
      }
    },
    writeTextOnCanvas(
      ctx_2d,
      lineheight,
      bytelength,
      text,
      startleft,
      starttop
    ) {
      function getTrueLength(str) {
        //获取字符串的真实长度（字节长度）
        var len = str.length,
          truelen = 0
        for (var x = 0; x < len; x++) {
          if (str.charCodeAt(x) > 128) {
            truelen += 2
          } else {
            truelen += 1
          }
          if (str.charCodeAt(x) == 10) {
            return truelen
          }
        }
        return truelen
      }
      function cutString(str, leng) {
        //按字节长度截取字符串，返回substr截取位置
        var len = str.length,
          tlen = len,
          nlen = 0
        for (var x = 0; x < len; x++) {
          if (str.charCodeAt(x) > 128) {
            if (nlen + 2 <= leng) {
              nlen += 2
            } else {
              tlen = x
              break
            }
          } else {
            if (nlen + 1 <= leng) {
              nlen += 1
            } else {
              tlen = x
              break
            }
            if (str.charCodeAt(x) == 10) {
              tlen = x + 1
              break
            }
          }
        }
        return tlen
      }
      for (var i = 1; getTrueLength(text) > 0; i++) {
        var tl = cutString(text, bytelength)
        ctx_2d.fillText(
          text.substr(0, tl).replace(/^\s+|\s+$/, ''),
          startleft,
          (i - 1) * lineheight + starttop
        )
        text = text.substr(tl)
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
  }
}
</script>

<style lang="scss" scoped>
#canvas-warp {
  margin: 0 auto;
  position: relative;
  left: 0;
  top: 30px;
  overflow: hidden;
  // cursor: url('https://lochi.oss-cn-beijing.aliyuncs.com/pc/edit.ico'), auto;
}
</style>
