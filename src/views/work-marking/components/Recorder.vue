<template>
  <div>
    <audio ref="audioRef" :src="audioURL" controls="controls"></audio>
    <div class="recorder">
      <img
        v-if="audioURL"
        class="close"
        src="../../../assets/img/publish/result_wrong.png"
        alt=""
        @click="handleDel"
      />
      <template v-if="!modal2Visible">
        <p>留言</p>
        <img
          src="../../../assets/img/ic_homework_tool_recording_1@2x.png"
          alt=""
          class="record"
          @click="handleStart"
          v-if="!audioURL"
        />
        <img
          v-else
          src="../../../assets/img/ic_homework_tool_recording_3@2x.png"
          alt=""
          @click="handlePlay"
        />
      </template>
      <template v-else>
        <p>留言中</p>
        <div class="quan">
          <div class="yuan"></div>
        </div>
      </template>
    </div>
    <a-modal
      centered
      :closable="false"
      v-model="modal2Visible"
      @ok="() => (modal2Visible = false)"
      :footer="null"
      width="300px"
      :maskClosable="false"
    >
      <div class="recorder-modal" @click="handleStop">
        <h3><span></span>留言中</h3>
        <div class="content">
          <p class="time">
            <span>{{ mcounter }}</span
            >s
          </p>
          <div class="quan">
            <div class="yuan"></div>
          </div>
          <p class="text">点击按钮 完成留言</p>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { MediaStreamRecorder } from '@/util/MediaStreamRecorder.js'
export default {
  name: 'Recorder',
  props: ['questionInfo'],
  data() {
    return {
      audioURL: null,
      constraints: { audio: true },
      recording: false, // 录音状态
      mediaRecorder: null, // 录音笔
      blobVoice: null,
      mcounter: 60,
      modal2Visible: false
    }
  },
  computed: {
    reviewVoiceStr() {
      let result
      this.questionInfo.reviewList &&
        this.questionInfo.reviewList.forEach(item => {
          if (item.reviewUserType === 2) {
            result = item.reviewVoiceStr || null
          }
        })
      return result
    },
    studentAnswerReviewId() {
      let result
      this.questionInfo.reviewList &&
        this.questionInfo.reviewList.forEach(item => {
          if (item.reviewUserType === 2) {
            result = item.studentAnswerReviewId || null
          }
        })
      return result
    }
  },
  watch: {
    mcounter(value) {
      if (value === 0) {
        clearInterval(this.intervaltimerid)
        this.mediaRecorder.stop()
        this.modal2Visible = false
      }
    },
    // reviewVoiceStr(value) {
    //   this.audioURL = value
    //   console.log(this.audioURL)
    // }
    reviewVoiceStr: {
      handler(value) {
        this.audioURL = value
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleStart() {
      this.modal2Visible = true
      this.mcounter = 60
      this.mediaRecorder.start(120000)
      this.intervaltimerid = setInterval(() => {
        // 开始累积
        this.mcounter -= 1
      }, 1000)
    },
    handleStop() {
      this.modal2Visible = false
      this.mediaRecorder.stop()
    },
    onSuccess(stream) {
      this.mediaRecorder = new MediaStreamRecorder(stream)
      this.mediaRecorder.mimeType = 'audio/wav'
      var that = this
      this.mediaRecorder.onstop = () => {
        clearInterval(this.intervaltimerid)
        that.audioURL = URL.createObjectURL(that.blobVoice)
        that.$store.commit('marking/UPDATEREVIEWVOICE', that.blobVoice)
        that.blobVoice = null
      }

      this.mediaRecorder.ondataavailable = function(blob) {
        that.blobVoice = blob
      }
    },
    onError(err) {
      console.log('The following error occured: ' + err)
    },
    handlePlay() {
      if (this.$refs.audioRef.paused) {
        this.$refs.audioRef.play()
      } else {
        this.$refs.audioRef.pause() // 这个就是暂停
      }
      //this.$refs.audioRef.play()
    },
    handleDel() {
      if (this.studentAnswerReviewId) {
        this.$http
          .get('/api/teacher/homework/review/deleteVoice', {
            params: {
              studentAnswerReviewId: this.studentAnswerReviewId
            }
          })
          .then(({ data }) => {
            if (data.flag === 1) {
              this.audioURL = null
              this.$message.success('留言删除成功')
            }
          })
      } else {
        this.$message.success('留言删除成功')
        this.audioURL = null
      }
    }
  },
  mounted() {
    this.questionInfo.reviewList &&
      this.questionInfo.reviewList.forEach(item => {
        if (item.reviewUserType === 2) {
          this.audioURL = item.reviewVoiceStr || null
        }
      })
    // disable stop button while not recording
    if (window.navigator.mediaDevices.getUserMedia) {
      window.navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.onSuccess, this.onError)
    } else {
      clearInterval(this.intervaltimerid)
      console.log('getUserMedia not supported on your browser!')
    }
  }
}
</script>
<style lang="scss" scoped>
.recorder {
  position: relative;
  .quan {
    margin: 0;
    margin-top: 10px;
  }
  img.close {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 20px;
    right: 0;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(88, 104, 120, 1);
  }
  img {
    width: 44px;
    height: 44px;
  }
}
.recorder-modal {
  height: 210px;
  h3 {
    font-size: 18px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: rgba(255, 99, 101, 1);
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .content {
    width: 120px;
    margin: 0 auto;
    text-align: center;
    .time {
      text-align: center;
      color: #ff6365;
      font-size: 12px;
      margin-top: 20px;
      span {
        font-size: 18px;
      }
    }
    .text {
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(132, 132, 132, 1);
    }
  }
}
.quan {
  margin: 16px auto;
  width: 44px;
  height: 44px;
  background: rgba(255, 99, 101, 1);
  box-shadow: 0px 0px 6px 0px rgba(173, 18, 20, 0.06);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .yuan {
    width: 16px;
    height: 16px;
    background-color: #fff;
  }
}
audio {
  display: none;
}
</style>
