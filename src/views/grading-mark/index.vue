<template>
  <div>
    <div
      class="fatherBox"
      :id="showImg || isSoundStart ? 'bgColor' : 'bgColorTwo'"
    >
      <div style="width:1185px;margin:26px auto 18px;">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>
            <router-link to="/work">作业</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="/work-grading-assignment">学生列表</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="/work-composition-detail"
              >作文详情（{{ receiveInfo.studentName }}）</router-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>评分</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="a" style="width:100%;height:1px;position: relative;">
        <div class="scoringCriteria_w" v-show="showImg">
          <img
            src="../../assets/img/grading-assignment/nr_zuowen_pingfen@2x.png"
            alt
          />
          <img
            src="../../assets/img/grading-assignment/ic_popup_Close@2x.png"
            alt
            @click="showImg = false"
          />
        </div>
        <div
          class="flota_sound_area"
          v-if="isSoundStart"
          style="width:400px;height:210px;border-radius:6px;background:white;position:fixed;bottom:12%;left:54%;border:1px solid #dedede;z-index:2222"
        >
          <div class="musk"></div>
          <div class="content">
            <p
              class="sound_duration"
              style="width:100%;text-align:center;color:#FF6365;padding-top:40px;font-size:18px"
            >
              {{ secondDuration }}s
            </p>
            <img
              src="../../assets/img/publish/audio_pause.png"
              @click="handleOverClick"
              style="width:55px;height55px;margin:0 auto;display:block;cursor: pointer;"
            />
            <p
              class="text_tips"
              style="font-size:14px;color:#848484;text-align:center"
            >
              点击按钮 结束录制
            </p>
          </div>
        </div>
      </div>
      <div class="box_w" :id="showImg ? 'opacityTwo' : 'opacityOne'">
        <div class="left_w">
          <p>
            <span>作文浏览区</span>
          </p>
          <div class="imgFather_w">
            <img
              v-for="(item, index) in imgList"
              :src="item.answerFileUrlStr"
              :key="index"
              @click="handleCarouselClick(item)"
              alt
            />
          </div>
        </div>
        <div class="right_w">
          <div class="score_w" style="z-index:2">
            <span>得分</span>
            <span>{{ score }}</span>
            <img
              src="../../assets/img/grading-assignment/other_score.png"
              alt
            />
          </div>
          <div class="top_w">
            <span>评分区</span>
            <div class="result-sheet" @click="showImg = true">
              查看评分标准表
            </div>
          </div>

          <div class="smallBox_w" style="margin-top:70px;">
            <div class="title_w">
              <img
                src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png"
                alt
              />
              <p>
                <span>内容</span>
                <span>-维度评分</span>
              </p>
            </div>
            <div
              class="grade_w"
              v-for="(item, index) in listOne"
              :key="index"
              @click="changeOne(index, item)"
              :id="item.isChoose ? 'choose_style' : 'grade_w'"
            >
              <p>
                <span>{{ item.grade }}</span>
                <span>（{{ item.scoreStart }}-{{ item.scoreEnd }}分）</span>
              </p>
              <p>{{ item.scoreContent }}</p>
            </div>
            <div class="calculation_w">
              <input
                type="button"
                class="subtraction"
                v-model="subtraction"
                @click="subtractionOne"
                :id="this.numOne > this.minOne ? 'change' : 'changeno'"
              />
              <span class="num">{{ numOne }}</span>
              <input
                type="button"
                class="add"
                v-model="add"
                @click="addOne"
                :id="this.numOne < this.maxOne ? 'change' : 'changeno'"
              />
            </div>
          </div>

          <div class="smallBox_w">
            <div class="title_w">
              <img
                src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png"
                alt
              />
              <p>
                <span>语言</span>
                <span>-维度评分</span>
              </p>
            </div>
            <div
              class="grade_w"
              v-for="(item, index) in listTwo"
              :key="index"
              @click="changeTwo(index, item)"
              :id="item.isChoose ? 'choose_style' : 'grade_w'"
            >
              <p>
                <span>{{ item.grade }}</span>
                <span>（{{ item.scoreStart }}-{{ item.scoreEnd }}分）</span>
              </p>
              <p>{{ item.scoreContent }}</p>
            </div>
            <div class="calculation_w">
              <input
                type="button"
                class="subtraction"
                v-model="subtraction"
                @click="subtractionTwo"
                :id="this.numTwo > this.minTwo ? 'change' : 'changeno'"
              />
              <span class="num">{{ numTwo }}</span>
              <input
                type="button"
                class="add"
                v-model="add"
                @click="addTwo"
                :id="this.numTwo < this.maxTwo ? 'change' : 'changeno'"
              />
            </div>
          </div>

          <div class="smallBox_w">
            <div class="title_w">
              <img
                src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png"
                alt
              />
              <p>
                <span>篇章</span>
                <span>-维度评分</span>
              </p>
            </div>
            <div
              class="grade_w"
              v-for="(item, index) in listThree"
              :key="index"
              @click="changeThree(index, item)"
              :id="item.isChoose ? 'choose_style' : 'grade_w'"
            >
              <p>
                <span>{{ item.grade }}</span>
                <span>（{{ item.scoreStart }}-{{ item.scoreEnd }}分）</span>
              </p>
              <p>{{ item.scoreContent }}</p>
            </div>
            <div class="calculation_w">
              <input
                type="button"
                class="subtraction"
                v-model="subtraction"
                @click="subtractionThree"
                :id="this.numThree > this.minThree ? 'change' : 'changeno'"
              />
              <span class="num">{{ numThree }}</span>
              <input
                type="button"
                class="add"
                v-model="add"
                @click="addThree"
                :id="this.numThree < this.maxThree ? 'change' : 'changeno'"
              />
            </div>
          </div>

          <div class="smallBox_w">
            <div class="title_w">
              <img
                src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png"
                alt
              />
              <p>
                <span>书写</span>
                <span>-维度评分</span>
              </p>
            </div>
            <div
              class="grade_w"
              v-for="(item, index) in lastList"
              :key="index"
              @click="lastChange(index, item)"
              :id="item.isChoose ? 'choose_style' : 'grade_w'"
            >
              <p>
                <span>{{ item.grade }}</span>
                <span>（{{ item.scoreEnd }}分）</span>
              </p>
              <p>{{ item.scoreContent }}</p>
            </div>
            <div class="calculation_w">
              <input type="button" class="subtraction" v-model="subtraction" />
              <span class="num">{{ lastnum }}</span>
              <input type="button" class="add" v-model="add" />
            </div>
          </div>
          <div class="comment_w">
            <span>评语及修改意见（选填）</span>
            <textarea id="textarea_w" v-model="textareaValue"></textarea>
          </div>

          <div class="recording_w">
            <a-form-item>
              <!-- <a-textarea v-model="formData.writeGuide" style="width: 400px;height: 74px;" placeholder="如需文字指导请在此处输入"/> -->
              <a-button
                ghost
                type="primary"
                v-if="!isVoiceOK"
                @click="handleSoundInputClick"
                class="start_sound_input"
              >
                <div class="start_sound_inner">
                  <span class="word">语音指导</span>
                  <span class="detail">（点击开始）</span>
                  <img
                    src="../../assets/img/publish/mic_button.png"
                    style="width:14px;height:19px;"
                  />
                </div>
              </a-button>
              <!-- isSoundStart -->
              <!-- <div
                class="flota_sound_area"
                v-if="isSoundStart"
                style="width:400px;height:210px;border-radius:6px;background:white;position:relative;top:-260px;left:90px;border:1px solid #dedede"
              >
                <div class="musk"></div>
                <div class="content">
                  <p
                    class="sound_duration"
                    style="width:100%;text-align:center;color:#FF6365;padding-top:40px;font-size:18px"
                  >
                    {{ secondDuration }}s
                  </p>
                  <img
                    src="../../assets/img/publish/audio_pause.png"
                    @click="handleOverClick"
                    style="width:55px;height55px;margin:0 auto;display:block;cursor: pointer;"
                  />
                  <p
                    class="text_tips"
                    style="font-size:14px;color:#848484;text-align:center"
                  >
                    点击按钮 结束录制
                  </p>
                </div>
              </div> -->

              <audio
                v-show="false"
                ref="userVoice"
                :src="fileUrl"
                preload="auto"
                controls="controls"
              ></audio>
              <a-button
                type="primary"
                class="play_audio"
                v-if="isVoiceOK"
                @click="handlePlayClick"
                :id="this.changeWidth ? 'changeWidth' : 'changeWidthto'"
              >
                <div>
                  <span class="word">点击播放</span>
                  <img
                    v-show="!isPlay"
                    style="width: 26px;height: 26px;margin-left: 28px;"
                    src="../../assets/img/publish/audio_horn.png"
                  />
                  <img
                    v-show="isPlay"
                    style="width: 26px;height: 26px;margin-left: 28px;"
                    src="../../assets/img/play/play.gif"
                  />
                </div>
              </a-button>
              <img
                v-if="isVoiceOK"
                @click="handleDeleteAudio"
                src="../../assets/img/publish/del_audio.png"
                style="width: 26px;height: 26px;margin-left: 5px;cursor: pointer;position: absolute;left:575px;top:-3px;"
              />
            </a-form-item>
          </div>
          <button class="btn_w" @click="submission">确定</button>
        </div>
      </div>
      <FullScreen
        v-if="showFullScreen"
        @toParentsClose="closeFullScreen"
        :getImageSrc="imageSrc"
      ></FullScreen>
    </div>
    <div
      v-if="isSoundStart"
      style="    width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .3);
      z-index: 999;"
    ></div>
  </div>
</template>
<script>
import http from '../../api/index'
import localforage from 'localforage'
import { MediaStreamRecorder } from '@/util/MediaStreamRecorder.js'
import FullScreen from '../composition-detail/components/fullScreen'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      flag: false,
      imgList: [],
      bigListL: [],
      listOne: [],
      listTwo: [],
      listThree: [],
      lastList: [],
      add: '+',
      subtraction: '—',
      numOne: 16,
      maxOne: 16,
      minOne: 13,
      numTwo: 13,
      maxTwo: 13,
      minTwo: 11,
      numThree: 8,
      maxThree: 8,
      minThree: 7,
      lastnum: 3,
      score: 0,
      chunks: [],
      blobVoice: null,
      fileUrl: null,
      fileBlob: null,
      isVoiceOK: false,
      isSoundStart: false,
      playFlag: false,
      isPlay: false,
      secondDuration: 0,
      lastDuration: 0,
      playTimer: false,
      overPlayTimer: false,
      changeWidth: true,
      receiveInfo: {},
      scoreContentOne: '',
      scoreContentTwo: '',
      scoreContentThree: '',
      scoreContentLast: '',
      scoreContentBig: '',
      showImg: false,
      showFullScreen: false,
      imageSrc: '',
      textareaValue: ''
    }
  },
  components: {
    FullScreen
  },
  mounted() {
    // 获取前一页传来的数据
    // console.log(this.$route.params);
    if (this.$route.params.record) {
      this.receiveInfo = this.$route.params.record
      this.imgList = this.receiveInfo.slideLists
      // console.log(this.receiveInfo)
      // console.log(this.receiveInfo.slideLists[0].answerFileUrlStr)
    } else {
      localforage.getItem('compositionStdInfo').then(res => {
        localforage.getItem('workListItem').then(response => {
          this.receiveInfo = Object.assign(res, response)
          this.imgList = this.receiveInfo.slideLists
          console.log(this.receiveInfo)
        })
      })
    }

    this.captureRecord()

    this.score = this.numOne + this.numTwo + this.numThree + this.lastnum * 1
    // let url='/api/teacher/homework/compositionReview';
    let url = '/api/question/compositionScore'
    http.get(url).then(({ data }) => {
      // console.log(data)
      this.bigListL = data.infos
      this.bigListL.map(val => {
        switch (val.scoreStandardModel) {
          case '1':
            this.listOne.push(val)
            break
          case '2':
            this.listTwo.push(val)
            break
          case '3':
            this.listThree.push(val)
            break
          case '4':
            this.lastList.push(val)
            break
        }
      })
      for (let i = 0; i < this.listOne.length; i++) {
        this.listOne[i].isChoose = false
        this.listOne[1].isChoose = true
        this.listOne[0].grade = '一类'
        this.listOne[1].grade = '二类'
        this.listOne[2].grade = '三类'
        this.listOne[3].grade = '四类'
        this.listOne[4].grade = '五类'
      }
      for (let i = 0; i < this.listTwo.length; i++) {
        this.listTwo[i].isChoose = false
        this.listTwo[1].isChoose = true
        this.listTwo[0].grade = '一类'
        this.listTwo[1].grade = '二类'
        this.listTwo[2].grade = '三类'
        this.listTwo[3].grade = '四类'
        this.listTwo[4].grade = '五类'
      }
      for (let i = 0; i < this.listThree.length; i++) {
        this.listThree[i].isChoose = false
        this.listThree[1].isChoose = true
        this.listThree[0].grade = '一类'
        this.listThree[1].grade = '二类'
        this.listThree[2].grade = '三类'
        this.listThree[3].grade = '四类'
        this.listThree[4].grade = '五类'
      }
      for (let i = 0; i < this.lastList.length; i++) {
        this.lastList[i].isChoose = false
        this.lastList[1].isChoose = true
        this.lastList[0].grade = '一类'
        this.lastList[1].grade = '二类'
        this.lastList[2].grade = '三类'
        this.lastList[3].grade = '四类'
        this.lastList[4].grade = '五类'
      }
    })
  },
  methods: {
    // 录音
    handleSoundInputClick() {
      this.mediaRecorder.start(1200000)
      this.isSoundStart = true
      this.secondDuration = 60
      this.lastDuration = 0
      this.intervaltimerid = setInterval(() => {
        this.secondDuration--
        if (this.secondDuration === 0) {
          this.handleOverClick()
        }
      }, 1000)
    },
    // 录音结束
    handleOverClick() {
      this.mediaRecorder.stop()
      if (this.secondDuration > 57) {
        this.$message.error('录制时间过短！')
        this.isVoiceOK = false
        this.isSoundStart = false
        this.chunks = []
        this.fileUrl = null
        this.fileBlob = null
        this.lastDuration = 0
      } else {
        this.isVoiceOK = true
        this.isSoundStart = false
        this.lastDuration = 60 - this.secondDuration
      }
      this.secondDuration = 60
    },
    // 删除录音
    handleDeleteAudio() {
      this.isVoiceOK = false
      this.fileUrl = null
      this.fileBlob = null
      this.lastDuration = 0
    },
    // 点击播放按钮
    handlePlayClick() {
      if (this.playFlag) {
        this.$refs.userVoice.pause()
        this.$refs.userVoice.currentTime = 0
        this.playTimer = null
        this.overPlayTimer = true
        this.playFlag = false
        this.isPlay = false
        return false
      }
      this.$refs.userVoice.play()
      this.isPlay = true
      this.playFlag = true
      this.playTimer = setTimeout(() => {
        if (this.overPlayTimer) {
          clearTimeout(this.playTimer)
          this.overPlayTimer = false
          this.playTimer = null
          return false
        }
        this.isPlay = false
        this.playFlag = false
      }, this.lastDuration * 1000)
    },
    // 错误处理方法
    onMediaError(err) {
      console.log('阿偶~您的浏览器貌似不支持录音哦...', err)
      clearInterval(this.intervaltimerid)
      this.isSoundStart = false
      this.$message.error('您的浏览器暂不支持录音功能')
    },
    // 成功
    onMediaSuccess(stream) {
      var that = this
      this.mediaRecorder = new MediaStreamRecorder(stream)
      this.mediaRecorder.mimeType = 'audio/wav'
      this.mediaRecorder.onstop = () => {
        clearInterval(this.intervaltimerid)
        that.fileUrl = URL.createObjectURL(that.blobVoice)
        that.fileBlob = that.blobVoice
        that.blobVoice = null
        // this.fileBlob = new Blob(this.chunks, {
        //   type: 'audio/mp3; codecs=opus'
        // })
        // this.chunks = []
        // this.fileUrl = window.URL.createObjectURL(this.fileBlob)
      }
      this.mediaRecorder.ondataavailable = blob => {
        // clearInterval(this.intervaltimerid)
        // this.chunks.push(e.data)
        that.blobVoice = blob
      }
    },
    // 开始记录方法
    captureRecord() {
      navigator.mediaDevices
        .getUserMedia({
          audio: true
        })
        .then(this.onMediaSuccess)
        .catch(this.onMediaError)
    },
    // 弹框关闭
    handleDialogClose() {
      this.showGroupModal = false
    },
    uploadFile(file) {
      let fd = new FormData()
      fd.append('file', file)
      return this.$http.post(
        `/teacherApi/upload/uploadCommonFile/voice/homework/composition`,
        fd,
        {
          headers: {
            upload: true
          }
        }
      )
    },
    addTo() {
      this.score = this.numOne + this.numTwo + this.numThree + this.lastnum
    },
    changeOne(index, item) {
      this.listOne.map(val => {
        val.isChoose ? (val.isChoose = false) : ''
      })
      this.listOne[index].isChoose = true
      this.numOne = item.scoreEnd
      this.maxOne = item.scoreEnd
      this.minOne = item.scoreStart
      this.addTo()
    },
    addOne() {
      if (this.numOne < this.maxOne) {
        this.numOne++
        this.addTo()
      }
    },
    subtractionOne() {
      if (this.numOne > this.minOne) {
        this.numOne--
        this.addTo()
      }
    },
    changeTwo(index, item) {
      this.listTwo.map(val => {
        val.isChoose ? (val.isChoose = false) : ''
      })
      this.listTwo[index].isChoose = true
      this.numTwo = item.scoreEnd
      this.maxTwo = item.scoreEnd
      this.minTwo = item.scoreStart
      this.addTo()
    },
    addTwo() {
      if (this.numTwo < this.maxTwo) {
        this.numTwo++
        this.addTo()
      }
    },
    subtractionTwo() {
      if (this.numTwo > this.minTwo) {
        this.numTwo--
        this.addTo()
      }
    },
    changeThree(index, item) {
      this.listThree.map(val => {
        val.isChoose ? (val.isChoose = false) : ''
      })
      this.listThree[index].isChoose = true
      this.numThree = item.scoreEnd
      this.maxThree = item.scoreEnd
      this.minThree = item.scoreStart
      this.addTo()
    },
    addThree() {
      if (this.numThree < this.maxThree) {
        this.numThree++
        this.addTo()
      }
    },
    subtractionThree() {
      if (this.numThree > this.minThree) {
        this.numThree--
        this.addTo()
      }
    },
    // 跑马灯点击事件
    handleCarouselClick(slide) {
      console.log(slide)
      this.imageSrc = slide.answerFileUrlStr
      this.showFullScreen = true
    },
    closeFullScreen(val) {
      this.showFullScreen = val
    },
    lastChange(index, item) {
      this.lastList.map(val => {
        val.isChoose ? (val.isChoose = false) : ''
      })
      this.lastList[index].isChoose = true
      this.lastnum = item.scoreEnd
      this.addTo()
    },
    // 获取string字节数
    getStringByteLength(str) {
      let byteLen = 0
      let len = str.length
      if (str) {
        for (var i = 0; i < len; i++) {
          if (str.charCodeAt(i) > 255) {
            byteLen += 2
          } else {
            byteLen++
          }
        }
      }
      return byteLen
    },
    async submission() {
      if (this.flag) {
        return false
      }
      this.flag = true
      if (this.textareaValue) {
        if (this.getStringByteLength(this.textareaValue) > 200) {
          this.$message.error('您输入的评论已超出200字节')
          this.flag = false
          return false
        }
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_()（）《》;、.。:~'\"\s]+$/
        if (!reg.test(this.textareaValue)) {
          this.$message.error('评论请勿输入特殊字符！')
          this.flag = false
          return false
        }
      }
      let fileUrl // 图片地址
      if (this.fileBlob) {
        let file = this.fileBlob
        let uploadFileRes
        if (file) {
          uploadFileRes = await this.uploadFile(file)
        }
        if (uploadFileRes && uploadFileRes.data.flag === 1) {
          let remote = uploadFileRes.data.infos
          if (remote[0]) {
            fileUrl = remote[0]
          }
        }
      }
      this.listOne.map(val => {
        if (val.isChoose == true) {
          this.scoreContentOne = val.scoreContent
        }
      })
      this.listTwo.map(val => {
        if (val.isChoose == true) {
          this.scoreContentTwo = val.scoreContent
        }
      })
      this.listThree.map(val => {
        if (val.isChoose == true) {
          this.scoreContentThree = val.scoreContent
        }
      })
      this.lastList.map(val => {
        if (val.isChoose == true) {
          this.scoreContentLast = val.scoreContent
        }
      })
      this.scoreContentBig =
        this.scoreContentOne +
        '$' +
        this.scoreContentThree +
        '$' +
        this.scoreContentTwo +
        '$' +
        this.scoreContentLast
      let url = '/api/teacher/homework/compositionReview'
      http
        .post(url, {
          requestParam: JSON.stringify({
            //请求参数名	object
            answerReview: {
              //批阅整体对象	object
              chapterScore: this.numThree, //篇章得分	number	如是完成批阅此字段可不传
              contentScore: this.numOne, //内容得分	number	如是完成批阅此字段可不传
              languageScore: this.numTwo, //语言得分	number	如是完成批阅此字段可不传
              reviewResult: this.score, //批阅得分（计算之后的分数）	number	如是完成批阅此字段可不传
              reviewUserId: this.$store.state.userInfo.teacherId, //批阅人id	number	必传
              reviewUserName: this.$store.state.userInfo.teacherName, //批阅人姓名	string	必传
              reviewUserType: 2, //批阅人类型	number	1 学生 2 老师
              reviewVoice: fileUrl ? fileUrl : '', //批阅语音	string	如是完成批阅此字段可不传(非必传)
              studentAnswerId: this.receiveInfo.studentAnswerId, //学生答案id	number	必传
              studentCommentContent: this.scoreContentBig, //评论内容	string	多个用$分割（学生批阅不需传此字段）非必传
              //studentCommentId	        不用填//评论内容id	number	多个用,分割（学生批阅不需传此字段）非必传
              teacherCommentContent: this.textareaValue, //老师评论	string	如是完成批阅此字段可不传非必传
              writeScore: this.lastnum //书写得分	number	如是完成批阅此字段可不传
            },
            homeworkId: this.receiveInfo.homeworkId, //作业id	number	必传
            homeworkStudentId: this.receiveInfo.homeworkStudentId, //作业学生id	number	必传
            ifDone: 2, //是否完成批阅	number	1直接点击完成批阅2老师评分（学生评分不传此对象）
            studentInfoId: this.receiveInfo.studentInfoId //被批作业的学生id	number	必传
          })
        })
        .then(({ data }) => {
          console.log(data)
          this.$message.success('作文评分成功')
          this.$router.push({ path: '/work-composition-detail' })
        })
        .finally(() => {
          this.flag = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.result-sheet {
  display: inline-block;
  color: #1059ff;
  margin-left: 10px;
  cursor: pointer;
}
.fatherBox {
  width: 100%;
  height: calc(100vh - 100px);
  background: #f0f7ff;
  position: relative;
}
#bgColor {
  // background: rgb(156,161,166);
}
#bgColorTwo {
  // background: #f0f7ff;
}
.scoringCriteria_w {
  width: 863px;
  height: 689px;
  // margin: 63px auto 0;
  position: relative;
  top: -90px;
  margin: 0 auto;
  // top: -5%;
  // left: 27%;
  z-index: 9;
  img:nth-child(1) {
    width: 100%;
    height: 100%;
  }
  img:nth-child(2) {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
  }
}
.box_w {
  width: 1185px;
  height: calc(100vh - 178px);
  margin: 10px auto 0;
  position: relative;
  //   background: red;
  .left_w {
    width: 520px;
    height: 100%;
    float: left;
    background: white;
    border-radius: 4px;
    overflow: auto;
    p {
      position: absolute;
      background: #ffffff;
      width: 520px;
      height: 60px;
      z-index: 1;
      span {
        width: 104px;
        height: 24px;
        background: #ffb463;
        text-align: center;
        line-height: 24px;
        margin: 20px 0 0 20px;
        border-radius: 12px;
        color: #ffffff;
        font-size: 14px;
        display: block;
      }
    }
    .imgFather_w {
      width: 476px;
      margin: 0 auto;
      img:nth-child(1) {
        margin-top: 60px;
      }
      img {
        // width: 476px;
        // height: 536px;
        width: 100%;
        height: auto;
        margin: 16px 0 0 0px;
        background: black;
        display: block;
        border-radius: 10px;
        border: 1px solid #b9b9b9;
      }
    }
  }
  .right_w {
    width: 650px;
    height: 100%;
    float: left;
    margin-left: 15px;
    background: white;
    border-radius: 4px;
    overflow: auto;
    .score_w {
      width: 82px;
      height: 98px;
      border: 1px solid #e9e9e9;
      border-radius: 5px 5px 70px 70px;
      background: #ffffff;
      position: absolute;
      top: 0px;
      right: 20px;
      span:nth-child(1) {
        font-size: 12px;
        color: #aaaaaa;
        margin: 12px 0 0 28px;
        display: block;
      }
      span:nth-child(2) {
        font-size: 30px;
        color: #0710a0;
        margin-top: 0px;
        text-align: center;
        width: 100%;
        display: inline-block;
      }
      img {
        width: 54px;
        height: 21px;
        margin: -32px 0 0 21px;
      }
    }
    .top_w {
      margin: 0 0 0 20px;
      position: absolute;
      background: #ffffff;
      width: 610px;
      height: 60px;
      z-index: 1;
      span {
        width: 104px;
        height: 24px;
        background: #ffb463;
        text-align: center;
        line-height: 24px;
        border-radius: 12px;
        color: #ffffff;
        font-size: 14px;
        display: inline-block;
        margin-top: 20px;
      }
      a {
        color: #1059ff;
        font-size: 12px;
        margin-left: 12px;
        margin-top: 20px;
      }
    }
    .smallBox_w {
      width: 610px;
      // height: 385px;
      height: 390px;
      border: 1px solid #dedede;
      border-radius: 6px;
      margin: 26px 0 0 20px;
      .title_w {
        height: 36px;
        position: relative;
        top: -10px;
        left: 3px;
        img {
          width: 112px;
          height: 36px;
        }
        p {
          position: relative;
          top: -30px;
          left: 10px;
          span:nth-child(1) {
            color: #1059ff;
            font-size: 16px;
          }
          span:nth-child(2) {
            color: #1059ff;
            font-size: 14px;
          }
        }
      }
      .grade_w {
        width: 590px;
        height: 50px;
        border: 1px solid #dedede;
        border-radius: 6px;
        margin: 10px 0 0 10px;
        cursor: pointer;
        p:nth-child(1) {
          width: 70px;
          height: 50px;
          background: #e4e7ea;
          border-radius: 6px 0 0 6px;
          float: left;
          span:nth-child(1) {
            display: block;
            color: #4e5f71;
            font-size: 16px;
            text-align: center;
            margin-top: 5px;
          }
          span:nth-child(2) {
            display: block;
            color: #4e5f71;
            font-size: 12px;
            text-align: center;
          }
        }
        p:nth-child(2) {
          float: left;
          font-size: 15px;
          color: #4e5f71;
          padding-left: 10px;
          line-height: 50px;
        }
      }
      .calculation_w {
        width: 103px;
        height: 34px;
        border: 1px solid #1059ff;
        margin-left: 496px;
        margin-top: 10px;
        border-radius: 4px;
        overflow: hidden;
        .add {
          width: 33px;
          height: 32px;
          font-size: 15px;
          float: left;
          border: none;
          color: rgb(131, 146, 167);
          background: white;
          cursor: pointer;
        }
        .num {
          width: 35px;
          height: 34px;
          font-size: 16px;
          display: block;
          float: left;
          text-align: center;
          line-height: 34px;
          color: #1059ff;
          border-left: 1px solid #cad3df;
          border-right: 1px solid #cad3df;
        }
        .subtraction {
          width: 33px;
          height: 32px;
          font-size: 15px;
          float: left;
          border: none;
          color: rgb(131, 146, 167);
          background: white;
          cursor: pointer;
        }
      }
    }
    .comment_w {
      width: 610px;
      height: 110px;
      border-radius: 10px;
      border: 1px solid #cad3df;
      margin: 20px 0 0 20px;
      overflow: hidden;
      span {
        width: 120px;
        height: 110px;
        display: block;
        background: #ebf3fa;
        color: #4e5f71;
        font-size: 14px;
        text-align: center;
        float: left;
        border-right: 1px solid #cad3df;
        padding-top: 34px;
      }
      textarea {
        resize: none;
        border: none;
        height: 100%;
        width: 488px;
        float: left;
      }
    }
    .recording_w {
      width: 610px;
      height: 40px;
      border-radius: 5px;
      // border: 1px solid #1059FF;
      margin: 29px 0 0 20px;
    }
    .btn_w {
      width: 100px;
      height: 36px;
      font-size: 14px;
      border: none;
      border-radius: 18px;
      background: #1059ff;
      color: white;
      text-align: center;
      line-height: 36px;
      margin: 20px 0 0 530px;
      cursor: pointer;
    }
  }
}

#choose_style {
  border: 1px solid #1059ff;
  p:nth-child(1) {
    background: #1059ff;
    span:nth-child(1) {
      color: white;
    }
    span:nth-child(2) {
      color: white;
    }
  }
  p:nth-child(2) {
    color: #1059ff;
  }
}
#grade_w {
  border: 1px solid #dedede;
  p:nth-child(1) {
    background: #e4e7ea;
    span:nth-child(1) {
      color: #4e5f71;
    }
    span:nth-child(2) {
      color: #4e5f71;
    }
  }
  p:nth-child(2) {
    color: #4e5f71;
  }
}
.ant-btn {
  width: 100%;
  height: 40px;
  border: 1px solid #1059ff;
}
#changeWidth {
  width: 94%;
}
#changeWidthto {
  width: 100%;
}
#change {
  color: white;
  background: #1059ff;
}
#changeno {
  color: rgb(131, 146, 167);
  background: white;
}
#opacityOne {
  opacity: 1;
}
#opacityTwo {
  opacity: 0.5;
}
</style>
