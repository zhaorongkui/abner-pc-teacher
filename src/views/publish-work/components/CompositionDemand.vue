<template>
  <div style="height: 100%;overflow: auto;">
    <a-form :layout="'vertical'" style="width: 1200px;margin: 40px auto 110px;">
      <a-card>
        <a-row>
          <a-col span="14">
            <a-form-item label="作文类型" class="custom-radioGroup">
              <a-radio-group
                v-model="formData.compositionType"
                buttonStyle="solid"
                @change="handleTypeChange"
              >
                <a-radio-button :value="1">命题作文</a-radio-button>
                <a-radio-button :value="2">半命题作文</a-radio-button>
                <a-radio-button :value="3">材料作文</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="作文标题">
              <a-input
                placeholder="请输入作文标题"
                :disabled="isTitleDisabled"
                size="large"
                @change="handleTitleInput"
                v-model="formData.compositionTitle"
                style="width: 517px;"
              />
            </a-form-item>
            <a-form-item label="作文阅读材料">
              <span style="vertical-align: middle;">材料拍照</span>
              <a-upload
                style="vertical-align: middle;line-height: 70px;"
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :fileList="[]"
                accept="image/png, image/jpeg"
                :customRequest="handleStuffFileUpload"
              >
                <img v-if="formData.stuffFile" :src="stuffFile1" />
                <img
                  v-if="formData.stuffFile"
                  class="del_pic"
                  src="../../../assets/img/publish/del_audio.png"
                  @click.stop="handleDeletePic(1)"
                />
                <div class="ant-upload-text">
                  <a-icon type="plus" />
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="所选班级">
              <a-button
                type="primary"
                style="background: #399EFF;border: 1px solid #399EFF;border-radius: 20px;"
              >
                {{ classInfo.gradeClassname }}（{{
                  classInfo.gradeClassQuestionnm
                }}人）
              </a-button>
            </a-form-item>
          </a-col>
          <a-col span="10">
            <a-form-item label="时间设置" style="position: relative;">
              <input
                type="text"
                id="datetimepicker-start"
                readonly
                placeholder="任务开始时间"
                style="width: 400px;margin-top: 3px;"
              />
              <span class="text_taskStart">任务开始时间</span>
              <img class="arrow1" src="../../../assets/img/publish/arrow.png" />
              <input
                type="text"
                id="datetimepicker-submitEnd"
                readonly
                placeholder="提交截止时间"
                style="width: 400px;margin-top: 18px;"
              />
              <span class="text_submitEnd">提交截止时间</span>
              <img class="arrow2" src="../../../assets/img/publish/arrow.png" />
              <input
                type="text"
                id="datetimepicker-markEnd"
                readonly
                placeholder="批阅截止时间"
                style="width: 400px;margin-top: 18px;"
              />
              <span class="text_markEnd">批阅截止时间</span>
              <img class="arrow3" src="../../../assets/img/publish/arrow.png" />
              <!-- <a-date-picker  
                size="large"
                v-model="formData.taskStartTime" 
                showTime 
                format="YYYY-MM-DD HH:mm:ss" 
                placeholder="任务开始时间"
                style="width: 400px;margin-top: 18px;"
                @change="handleTaskStartTimeChange" />
              <a-date-picker 
                size="large"
                v-model="formData.submitUtillTime" 
                showTime 
                format="YYYY-MM-DD HH:mm:ss" 
                placeholder="提交截止时间"
                style="width: 400px;margin-top: 18px;" />
              <a-date-picker  
                size="large"
                v-model="formData.markUntillTime" 
                showTime 
                format="YYYY-MM-DD HH:mm:ss" 
                placeholder="批阅截止时间"
                style="width: 400px;margin-top: 18px;" /> -->
            </a-form-item>
            <a-form-item label="互评设置">
              <a-button
                type="primary"
                @click="showGroupModal = true"
                class="evaluate_together"
              >
                <div class="eval_button_inner">
                  <span>设置互评小组</span>
                  <img src="../../../assets/img/publish/huping_button.png" />
                </div>
                <p
                  class="eval_button_tips"
                  v-if="compositionGroupNum && compositionAverage"
                >
                  当前设置互评小组分为 {{ compositionGroupNum }} 组，每组约
                  {{ compositionAverage }} 人。
                </p>
                <p class="eval_button_tips" v-else>您还没有设置过互评小组哦~</p>
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card style="margin-top: 10px;">
        <a-row>
          <a-col span="14">
            <a-form-item label="文体要求">
              <a-radio-group
                class="custom-radioGroup"
                v-model="formData.articleStyle"
                buttonStyle="solid"
              >
                <a-radio-button :value="1">文体不限</a-radio-button>
                <a-radio-button :value="2">记叙文</a-radio-button>
                <a-radio-button :value="3">议论文</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="范文提供（可选）">
              <span style="vertical-align: middle;">上传范文照片</span>
              <a-upload
                style="vertical-align: middle;line-height: 70px;"
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :fileList="[]"
                accept="image/png, image/jpeg"
                :customRequest="handleExampleFileUpload"
              >
                <img v-if="formData.exampleFile" :src="exampleFile1" />
                <img
                  v-if="formData.exampleFile"
                  class="del_pic"
                  src="../../../assets/img/publish/del_audio.png"
                  @click.stop="handleDeletePic(0)"
                />
                <div class="ant-upload-text">
                  <a-icon type="plus" />
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col span="10">
            <a-form-item label="字数要求">
              <el-input-number
                style="margin-right: 14px;"
                size="small"
                v-model="formData.wordsAmount"
                :min="300"
                :max="1000"
                :step="100"
                @blur="handleWordAmountBlur"
                @change="handleWordAmountBlur"
                @click.native="handleWordAmountBlur"
              ></el-input-number>
              <span>作文字数不少于{{ formData.wordsAmount }}字</span>
            </a-form-item>
            <a-form-item
              label="写作分析指导（可选）"
              style="position: relative;"
            >
              <a-textarea
                v-model="formData.writeGuide"
                @change="handleTextInput"
                style="width: 400px;height: 74px;"
                placeholder="如需文字指导请在此处输入"
              />
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
                  <img src="../../../assets/img/publish/mic_button.png" />
                </div>
              </a-button>

              <div class="flota_sound_area" v-if="isSoundStart">
                <div class="musk"></div>
                <div class="content">
                  <p class="sound_duration">{{ secondDuration }}s</p>
                  <img
                    src="../../../assets/img/publish/audio_pause.png"
                    @click="handleOverClick"
                  />
                  <p class="text_tips">点击按钮 结束录制</p>
                </div>
              </div>
              <audio
                v-show="false"
                ref="userVoice"
                :src="fileUrl"
                id="userVoicePlay"
                preload="auto"
                controls="controls"
              ></audio>
              <a-button
                type="primary"
                class="play_audio"
                v-if="isVoiceOK"
                @click="handlePlayClick"
              >
                <div>
                  <span class="word">点击播放</span>
                  <img
                    v-show="!isPlay"
                    style="width: 26px;height: 26px;margin-left: 28px;"
                    src="../../../assets/img/publish/audio_horn.png"
                  />
                  <img
                    v-show="isPlay"
                    style="width: 26px;height: 26px;margin-left: 28px;"
                    src="../../../assets/img/play/play.gif"
                  />
                </div>
              </a-button>
              <img
                v-if="isVoiceOK"
                @click="handleDeleteAudio"
                src="../../../assets/img/publish/del_audio.png"
                style="width: 26px;height: 26px;margin-left: 5px;cursor: pointer;"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <setGroup
        v-if="showGroupModal"
        :classId="classInfo.gradeClassid"
        :className="classInfo.gradeClassname"
        :isSet="commentGroupSet"
        :groupInfo="groupList"
        @setGroupSuccess="getGroupSetInfo"
        @dialogClose="handleDialogClose"
      ></setGroup>
      <!-- 您还没有设置过互评小组 -->
      <el-dialog
        title="提示"
        :visible.sync="noCommentGroup"
        :modal-append-to-body="false"
        width="500px"
      >
        <span slot="title" style="color: #5E84AD;font-size: 14px;">提示</span>
        <p
          style="text-align: center;font-size: 17px;color: #3D4D65;margin-top: 42px;"
        >
          您还没有设置过互评小组，
        </p>
        <p style="text-align: center;font-size: 17px;color: #3D4D65;">
          去看看学生分配是否合理吧~
        </p>
        <span
          slot="footer"
          class="dialog-footer"
          style="width: 100%;display: flex;justify-content: center;margin-top: 56px;"
        >
          <a-button
            type="primary"
            ghost
            @click="noCommentGroup = false"
            style="width: 160px;height: 36px;border-radius: 18px;"
            >取消</a-button
          >
          <a-button
            type="primary"
            @click="goToSetGroup"
            style="width: 160px;height: 36px;border-radius: 18px;margin-left: 23px;"
            >去设置</a-button
          >
        </span>
      </el-dialog>
    </a-form>
  </div>
</template>

<script>
// import moment from 'moment'
import http from '../../../api/index'
import setGroup from './componentsOfChild/setGroupDialog'
import { MediaStreamRecorder } from '@/util/MediaStreamRecorder.js'
import localforage from 'localforage'
export default {
  data() {
    return {
      chunks: [],
      blobVoice: null,
      fileUrl: null,
      fileBlob: null,
      isTitleDisabled: false,
      isSoundStart: false,
      commentGroupSet: false,
      showGroupModal: false,
      noCommentGroup: false,
      isVoiceOK: false,
      playFlag: false,
      isPlay: false,
      secondDuration: 0,
      lastDuration: 0,
      playTimer: false,
      overPlayTimer: false,
      // isCloseDatePicker1: true,
      // isCloseDatePicker2: true,
      // isCloseDatePicker3: true,
      startTaskTime: null,
      submitEndTime: null,
      markEndTime: null,
      groupList: [],
      formData: {
        compositionType: 1,
        compositionTitle: '',
        // taskStartTime: null,
        // submitUtillTime: null,
        // markUntillTime: null,
        stuffFile: '',
        exampleFile: '',
        wordsAmount: 600,
        writeGuide: '',
        chooseClass: 1,
        articleStyle: 1,
        audioResource: null,
        audioResource1: null
      },
      stuffFile1: '',
      exampleFile1: '',
      secondDuration: 0,
      compositionGroupNum: 0,
      compositionAverage: 0,
      teacherInfo: {},
      intervaltimerid: null,
      uid: 0
    }
  },
  props: ['classInfo'],
  components: {
    setGroup
  },
  mounted() {
    this.teacherInfo = this.$store.state.userInfo
    // this.setTaskStartTime();
    // this.setSubmitUtillTime();
    // this.setMarkUntillTime();
    //时间插件
    var startTime = new Date()
    var submitEndTime = new Date()
    var markEndTime = new Date()
    // 开始时间
    startTime.setMinutes(startTime.getMinutes() + 10)
    if (startTime.getMinutes() > 30) {
      startTime.setHours(startTime.getHours() + 1)
      startTime.setMinutes(0)
    } else {
      startTime.setMinutes(30)
    }
    startTime.setSeconds(0)
    // 提交截止时间
    submitEndTime.setDate(submitEndTime.getDate() + 1)
    submitEndTime.setHours(8)
    submitEndTime.setMinutes(0)
    submitEndTime.setSeconds(0)
    // 批阅结束时间
    markEndTime.setDate(markEndTime.getDate() + 13)
    markEndTime.setHours(23)
    markEndTime.setMinutes(30)
    markEndTime.setSeconds(0)

    // 默认值储存
    this.startTaskTime = startTime
    this.submitEndTime = submitEndTime
    this.markEndTime = markEndTime

    var that = this
    $.datetimepicker.setLocale('zh')
    $('#datetimepicker-start')
      .datetimepicker({
        scrollMonth: false,
        value: startTime,
        lang: 'zh',
        step: 30,
        format: 'Y-m-d H:i',
        startDate: startTime,
        minDate: startTime,
        onClose: function() {
          // return that.isCloseDatePicker1
          return true
        }
      })
      .on('change', function() {
        let start = new Date($('#datetimepicker-start').val())
        let submit = new Date($('#datetimepicker-submitEnd').val())
        let mark = new Date($('#datetimepicker-markEnd').val())
        let now = new Date()
        if (start < now) {
          that.$message.error('所选时间不可早于当前时间！')
          // that.isCloseDatePicker1 = false
          return false
        }
        that.handleTaskStartTimeChange()
        // that.isCloseDatePicker1 = true
      })
    $('#datetimepicker-submitEnd')
      .datetimepicker({
        scrollMonth: false,
        value: submitEndTime,
        lang: 'zh',
        step: 30,
        format: 'Y-m-d H:i',
        startDate: submitEndTime,
        onClose: function() {
          // return that.isCloseDatePicker2
          return true
        }
      })
      .on('change', function() {
        let start = new Date($('#datetimepicker-start').val())
        let submit = new Date($('#datetimepicker-submitEnd').val())
        let mark = new Date($('#datetimepicker-markEnd').val())
        let now = new Date()

        if (submit < start) {
          that.$message.error('所选时间不可早于任务开始时间！')
          // that.isCloseDatePicker2 = false
          return false
        }
        if (submit.getTime() === start.getTime()) {
          that.$message.error('所选时间不可等于任务开始时间！')
          // that.isCloseDatePicker2 = false
          return false
        }
        if (mark < submit) {
          that.$message.error('所选时间不可晚于批阅截止时间！')
          // that.isCloseDatePicker2 = false
          return false
        }
        if (mark.getTime() === submit.getTime()) {
          that.$message.error('所选时间不可等于批阅截止时间！')
          // that.isCloseDatePicker2 = false
          return false
        }
        // that.isCloseDatePicker2 = true
      })
    $('#datetimepicker-markEnd')
      .datetimepicker({
        scrollMonth: false,
        value: markEndTime,
        lang: 'zh',
        step: 30,
        format: 'Y-m-d H:i',
        startDate: markEndTime,
        onClose: function() {
          // return that.isCloseDatePicker3
          return true
        }
      })
      .on('change', function() {
        let submit = new Date($('#datetimepicker-submitEnd').val())
        let mark = new Date($('#datetimepicker-markEnd').val())
        if (mark < submit) {
          that.$message.error('所选时间不可早于提交截止时间！')
          // that.isCloseDatePicker3 = false
          return false
        }
        if (mark.getTime() === submit.getTime()) {
          that.$message.error('所选时间不可等于提交截止时间！')
          // that.isCloseDatePicker3 = false
          return false
        }
        // that.isCloseDatePicker3 = true
      })
    this.captureRecord()
    this.$nextTick(() => {
      let userVoice = document.getElementById('userVoicePlay')
      userVoice.addEventListener('ended', () => {
        this.playFlag = false
        this.isPlay = false
      })
      userVoice.addEventListener('pause', () => {
        this.playFlag = false
        this.isPlay = false
      })
    })
    if (this.classInfo.gradeClassid) {
      this.getGroupSetInfo()
    } else {
      localforage.getItem('selectClassToPublishCompositionInfo').then(res => {
        // this.classInfo = res
        this.getGroupSetInfo(res.gradeClassid)
      })
    }
    let dom = document.querySelectorAll('.el-input__inner')[0]
    dom.setAttribute('disabled', true)
  },
  methods: {
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
    // 删除图片
    handleDeletePic(type) {
      if (type) {
        this.formData.stuffFile = null
        this.stuffFile1 = null
      } else {
        this.formData.exampleFile = null
        this.exampleFile1 = null
      }
    },
    // 超过30个字节不能输入
    handleTitleInput() {
      if (this.getStringByteLength(this.formData.compositionTitle) > 30) {
        this.subStringByByte(this.formData.compositionTitle, 30)
      }
    },
    subStringByByte(str, len) {
      if (!str) {
        this.formData.compositionTitle = ''
      }
      var num = 0
      var str1 = str
      var str = ''
      for (var i = 0, lens = str1.length; i < lens; i++) {
        num += str1.charCodeAt(i) > 255 ? 2 : 1
        if (num > len) {
          break
        } else {
          str = str1.substring(0, i + 1)
        }
      }
      this.formData.compositionTitle = str
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
    // 输入框长度限制
    handleTextInput() {
      if (this.formData.writeGuide.length > 100) {
        this.formData.writeGuide = this.formData.writeGuide.substr(0, 100)
      }
    },
    // 点击发布按钮
    async publishComposition() {
      if (
        (this.formData.compositionType === 1 ||
          this.formData.compositionType === 2) &&
        !this.formData.compositionTitle
      ) {
        this.$message.error('请输入作文标题！')
        return false
      }
      // var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_\s.。'’/(/)/（/）/《/》/;/、/:/~/"]{1,20}/
      var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_()（）《》;、.。:~'\"\s]+$/
      if (!reg.test(this.formData.compositionTitle)) {
        this.$message.error('标题请勿输入特殊字符！')
        return false
      }
      if (this.formData.writeGuide) {
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_()（）《》;、.。:~'\"\s]+$/
        if (!reg.test(this.formData.writeGuide)) {
          this.$message.error('写作指导请勿输入特殊字符！')
          this.flag = false
          return false
        }
      }
      // if (this.formData.compositionTitle.length > 15) {
      //   this.$message.error('作文标题不能超过15字！')
      //   return false
      // }
      if (this.getStringByteLength(this.formData.compositionTitle) < 2) {
        this.$message.error('请输入1~15个字的名称！')
        return false
      }
      if (this.getStringByteLength(this.formData.compositionTitle) > 30) {
        this.$message.error('请输入1~15个字的名称！')
        return false
      }
      if (this.getStringByteLength(this.formData.writeGuide) > 200) {
        this.$message.error('写作分析指导不能超过200字节！')
        return false
      }
      if (this.formData.compositionType === 3 && !this.formData.stuffFile) {
        this.$message.error('还没有对作文阅读材料进行拍照哦~')
        return false
      }
      if (!this.commentGroupSet) {
        this.noCommentGroup = true
        return false
      }
      this.loading = this.$loading({
        lock: true,
        text: '作业发布中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
        zIndex: 99
      })
      let file = this.fileBlob
      let uploadFileRes
      let fileUrl // 图片地址
      if (file) {
        uploadFileRes = await this.uploadFile(file)
      }
      if (uploadFileRes && uploadFileRes.data.flag === 1) {
        let remote = uploadFileRes.data.infos
        if (remote[0]) {
          fileUrl = remote[0]
        }
      }

      this.$http.get('/api/teacher/system/time').then(res => {
        this.systime = res.data.infos
        let now = new Date(this.systime)
        let start = new Date($('#datetimepicker-start').val())
        let submit = new Date($('#datetimepicker-submitEnd').val())
        let mark = new Date($('#datetimepicker-markEnd').val())
        if (start < now) {
          this.$message.error('所选时间不可早于当前时间！')
          this.loading.close()
          return false
        }
        if (submit < start) {
          this.$message.error('提交截止时间不可早于开始时间！')
          this.loading.close()
          return false
        }
        if (submit.getTime() === start.getTime()) {
          that.$message.error('提交截止时间不可等于开始时间！')
          // that.isCloseDatePicker3 = false
          return false
        }
        if (mark < submit) {
          this.$message.error('批阅截止时间不可早于提交截止时间！')
          this.loading.close()
          return false
        }
        if (mark.getTime() === submit.getTime()) {
          this.$message.error('批阅截止时间不可等于提交截止时间！')
          this.loading.close()
          return false
        }
        let questionInfo = {
          compositionConductText: this.formData.writeGuide || '',
          compositionTitle: this.formData.compositionTitle,
          compositionRequire: this.formData.articleStyle,
          compositionType: this.formData.compositionType,
          compositionWordNum: this.formData.wordsAmount
        }
        this.formData.stuffFile
          ? (questionInfo['compositionMaterialImg'] = this.formData.stuffFile)
          : ''
        this.formData.exampleFile
          ? (questionInfo['compositionModelImg'] = this.formData.exampleFile)
          : ''
        fileUrl ? (questionInfo['compositionConductVoice'] = fileUrl) : ''
        let data = {
          requestParam: JSON.stringify({
            compositionQuestionInfo: questionInfo,
            homeworkMain: {
              homeworkName: this.formData.compositionTitle,
              section: this.classInfo.studysection,
              subjectAbbreviation: this.teacherInfo.subjectAbbreviation,
              teacherId: this.teacherInfo.teacherId,
              teacherName: this.teacherInfo.teacherName
            },
            homeworkMainClass: {
              gradeClassid: this.classInfo.gradeClassid,
              homeworkEndtime: $('#datetimepicker-submitEnd').val(),
              homeworkReviewEndtime: $('#datetimepicker-markEnd').val(),
              homeworkStarttime: $('#datetimepicker-start').val(),
              studentNum: this.classInfo.gradeClassQuestionnm
            }
          })
        }
        http
          .post('/api/teacher/homework/publishComposition', data)
          .then(res => {
            if (res.data.flag === 1) {
              this.$store.commit('COMPOTIONFLAG', true)
              this.$message.success('作业发布成功！')
              this.loading.close()
              localforage
                .getItem('savePageInfoReturnToRootPage')
                .then(pageRoute => {
                  if (pageRoute) {
                    this.$router.push(`/${pageRoute}`)
                    this.$emit('homeworkPublishSuccess')
                  } else {
                    this.$router.push(`/home`)
                    this.$emit('homeworkPublishSuccess')
                  }
                })
            } else {
              this.$store.commit('COMPOTIONFLAG', true)
              if (res.data.message) {
                this.$message.error(res.data.message)
                this.loading.close()
              } else {
                this.$message.error('发布作业失败！')
                this.loading.close()
              }
            }
          })
          .catch(err => {
            console.log(err)
            this.loading.close()
          })
      })
    },
    // // 开始时间：当前时间加10分钟  然后查找下一个半点或整点
    // setTaskStartTime() {
    //   let now = new Date();
    //   let add = now.valueOf();
    //   add += 600000;
    //   let result = 0;
    //   add%1800000 === 0 ? result = add : result = (parseInt(add/1800000) + 1) * 1800000;
    //   let time = new Date(result);
    //   this.formData.taskStartTime = moment(time, 'YYYY-MM-DD HH:mm:ss');
    // },
    // // 提交截止时间默认为开始时间第二天早上8点
    // setSubmitUtillTime() {
    //   let startTime = this.formData.taskStartTime;
    //   let year = startTime.get('year');
    //   let month = startTime.get('month');
    //   let date = startTime.get('date');
    //   this.formData.submitUtillTime = moment().set({
    //     year: year,
    //     month: month,
    //     date: date + 1,
    //     hour: 8,
    //     minute: 0,
    //     second: 0
    //   })
    // },
    // // 批阅截止时间默认为开始时间之后13天截止
    // setMarkUntillTime() {
    //   let startTime = this.formData.taskStartTime;
    //   let year = startTime.get('year');
    //   let month = startTime.get('month');
    //   let date = startTime.get('date') + 13;
    //   let hour = startTime.get('hour');
    //   let minute = startTime.get('minute');
    //   this.formData.markUntillTime = moment().set({
    //     year: year,
    //     month: month,
    //     date: date,
    //     hour: hour,
    //     minute: minute,
    //     second: 0
    //   });
    // },
    // 获取当前的分组情况
    getGroupSetInfo(val) {
      // 获取分组情况
      http
        .get('/api/teacher/homework/getGroup', {
          params: {
            teacherId: this.$store.state.userInfo.teacherId,
            gradeClassId: val ? val : this.classInfo.gradeClassid
          }
        })
        .then(data => {
          console.log(data)
          if (data.data.flag === 1) {
            data.data.infos.length > 0
              ? (this.commentGroupSet = true)
              : (this.commentGroupSet = false)
            let group = data.data.infos
            this.groupList = data.data.infos
            let groupNumList = []
            group.map(val => {
              groupNumList.push(val.groupNum)
            })
            let groupAmount = Array.from(new Set(groupNumList))
            this.compositionGroupNum = groupAmount.length
            this.compositionAverage = Math.floor(
              group.length / groupAmount.length
            )
          } else {
            this.commentGroupSet = false
            console.log(data)
            this.$message.error('获取班级分组数据失败！')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 任务开始时间 被重设 重新调用方法算出另外两个截止的默认时间
    handleTaskStartTimeChange() {
      let start = new Date($('#datetimepicker-start').val())
      let submitEndTime = new Date(start)
      let markEndTime = new Date(start)
      submitEndTime.setDate(submitEndTime.getDate() + 1)
      submitEndTime.setHours(8)
      submitEndTime.setMinutes(0)
      submitEndTime.setSeconds(0)
      $('#datetimepicker-submitEnd').datetimepicker({
        value: submitEndTime,
        startDate: submitEndTime,
        minDate: start
      })
      markEndTime.setDate(markEndTime.getDate() + 13)
      markEndTime.setHours(23)
      markEndTime.setMinutes(30)
      markEndTime.setSeconds(0)
      $('#datetimepicker-markEnd').datetimepicker({
        value: markEndTime,
        startDate: markEndTime,
        minDate: submitEndTime
      })
      // this.setSubmitUtillTime();
      // this.setMarkUntillTime();
    },
    // 命题和半命题作文 可以填写标题      材料作文不用写标题
    handleTypeChange() {
      if (
        this.formData.compositionType === 1 ||
        this.formData.compositionType === 2
      ) {
        this.formData.compositionTitle = ''
        this.isTitleDisabled = false
      } else {
        this.formData.compositionTitle = '材料作文'
        this.isTitleDisabled = true
      }
    },
    dateTimeFormat(val) {
      if (!val) {
        return null
      }
      let getNow = new Date(val)
      let year = getNow.getFullYear()
      let month = getNow.getMonth() + 1
      let day = getNow.getDate()
      let hour = getNow.getHours()
      let minute = getNow.getMinutes()
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      return `${year}-${month}-${day} ${hour}:${minute}`
    },
    // 作文材料上传
    handleStuffFileUpload(getFile) {
      let fd = new FormData()
      fd.append('file', getFile.file)
      http
        .post(
          `/teacherApi/upload/uploadCommonFile/img/homework/composition`,
          fd,
          {
            headers: {
              upload: true
            }
          }
        )
        .then(res => {
          console.log(res)
          this.formData.stuffFile = res.data.infos[0]
          this.stuffFile1 = res.data.infos[1]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 作文范文上传
    handleExampleFileUpload(getFile) {
      let fd = new FormData()
      fd.append('file', getFile.file)
      http
        .post(
          '/teacherApi/upload/uploadCommonFile/img/homework/composition',
          fd,
          {
            headers: {
              upload: true
            }
          }
        )
        .then(res => {
          console.log(res)
          this.formData.exampleFile = res.data.infos[0]
          this.exampleFile1 = res.data.infos[1]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 文字字数
    handleWordAmountBlur() {
      let dom = document.querySelectorAll('.el-input__inner')[0]
      dom.setAttribute('disabled', true)
      // let val = this.formData.wordsAmount
      // if (!isNaN(val)) {
      //   val = val % 100 ? (parseInt(val / 100) + 1) * 100 : val
      //   val = val > 900 ? 1000 : val
      //   val = val < 400 ? 300 : val
      //   this.formData.wordsAmount = val
      // } else {
      //   this.formData.wordsAmount = 600
      // }
    },
    // 录音
    handleSoundInputClick() {
      this.mediaRecorder.start(120000)
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
      //console.log('阿偶~您的浏览器貌似不支持录音哦...', err)
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
        //this.chunks = []
        //this.fileUrl = window.URL.createObjectURL(this.fileBlob)
        // audio.src = audioURL
      }
      this.mediaRecorder.ondataavailable = blob => {
        that.blobVoice = blob
        // let fd = new FormData()
        // fd.append('file', blob)
        // http
        //   .post(
        //     `/teacherApi/upload/uploadCommonFile/voice/homework/composition`,
        //     fd,
        //     {
        //       headers: {
        //         upload: true
        //       }
        //     }
        //   )
        //   .then(res => {
        //     console.log(res)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      }
      // this.mediaRecorder.start(60 * 1000)
      // this.mediaRecorder = new MediaStreamRecorder(stream)
      // // 获取音频流
      // this.mediaRecorder.stream = stream
      // this.mediaRecorder.mimeType = 'audio/mp3'
      // this.mediaRecorder.ondataavailable = blob => {
      //   clearInterval(this.intervaltimerid)
      //   const url = URL.createObjectURL(blob)
      // }
      // 定义间隔
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
    // 设置互评小组
    goToSetGroup() {
      this.noCommentGroup = false
      this.showGroupModal = true
    }
  }
}
</script>

<style scoped>
#datetimepicker-start,
#datetimepicker-submitEnd,
#datetimepicker-markEnd {
  width: 250px;
  height: 40px;
  border: 0;
  border: 1px solid #cad3df;
  border-radius: 4px;
  padding: 0 0 0 115px;
  font-size: 14px;
  outline: none;
  color: #8493a8;
}
.evaluate_together {
  width: 400px;
  height: 56px;
  border-radius: 28px;
}
.eval_button_inner span {
  font-size: 14px;
}
.eval_button_inner img {
  width: 6px;
  height: 11px;
}
.eval_button_tips {
  font-size: 14px;
}
.stuff_file_upload {
  display: inline-block;
  vertical-align: middle;
  margin-left: 14px;
}
.start_sound_input {
  border-radius: 5px;
  width: 400px;
  height: 40px;
  margin-top: 12px;
}
.start_sound_inner img {
  width: 16px;
  height: 22px;
}
.start_sound_inner .word {
  font-size: 14px;
}
.start_sound_inner .detail {
  font-size: 12px;
}
.content {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  height: 210px;
  border-radius: 6px;
  background: #fff;
  padding: 52px 0;
  position: relative;
  z-index: 2003;
}
.content .sound_duration {
  font-size: 18px;
  color: #ff6365;
  line-height: 15px;
}
.content .text_tips {
  font-size: 14px;
  color: #848484;
  line-height: 14px;
}
.content img {
  width: 44px;
  height: 44px;
  margin: 16px auto;
  cursor: pointer;
}
.flota_sound_area {
  position: absolute;
  top: -190px;
  left: -1px;
}
.flota_sound_area .musk {
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}
.play_audio {
  width: 370px;
  height: 40px;
  margin-top: 12px;
}
.play_audio > .word {
  font-size: 14px;
}
.custom-radioGroup >>> .ant-radio-button-wrapper {
  border-radius: 20px;
  margin-right: 12px;
}
.custom-radioGroup >>> .ant-radio-button-wrapper-checked {
  background: #399eff;
  border: 1px solid #399eff;
  border-radius: 20px;
}
.custom-radioGroup >>> .ant-radio-button-wrapper:before {
  display: none;
}
</style>

<style>
.avatar-uploader > .ant-upload {
  width: 70px;
  height: 70px;
  border: 1px solid #cad3df;
  border-radius: 10px;
  display: inline-block;
  margin-left: 13px;
}
.ant-upload-select-picture-card i {
  font-size: 22px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  color: #aaa;
  height: 52px;
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader > .ant-upload-select-picture-card > .ant-upload {
  position: relative;
}
.ant-upload-select-picture-card img {
  position: absolute;
  top: -1px;
  left: 0;
  width: 70px;
  height: 70px;
}
.avatar-uploader .del_pic {
  position: absolute;
  top: -8px;
  left: 57px;
  width: 16px;
  height: 16px;
}
.text_taskStart {
  position: absolute;
  top: -2px;
  left: 10px;
  color: #8493a8;
}
.text_submitEnd {
  position: absolute;
  top: 56px;
  left: 10px;
  color: #8493a8;
}
.text_markEnd {
  position: absolute;
  left: 10px;
  top: 113px;
  color: #8493a8;
}
.arrow1 {
  position: absolute;
  width: 11px;
  height: 7px;
  right: 18px;
  top: 3px;
}
.arrow2 {
  position: absolute;
  width: 11px;
  height: 7px;
  right: 18px;
  top: 62px;
}
.arrow3 {
  position: absolute;
  width: 11px;
  height: 7px;
  right: 18px;
  top: 120px;
}
.ant-upload-btn {
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  position: relative;
}
</style>
