<template>
  <div class="resource-upload">
    <div class="breadcrumb">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/resource-management">
            资源上传
          </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>上传资源</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="from-upload">
      <div class="wrap">
        <div class="row">
          <div class="title">选择章节:</div>
          <div class="select">
            <TreeSelect></TreeSelect>
          </div>
        </div>
        <div class="row" style="max-height:400px;">
          <div class="title">选择上传文件:</div>
          <div class="wrap-pic">
            <Upload
              :fileList="fileList"
              @onFileChange="handleFileChange"
              @onFileDelete="handleDelete"
              :process="process"
            ></Upload>
          </div>
        </div>
        <div class="submit" @click="handleSubmit">
          上传
        </div>
      </div>
    </div>
    <div class="modal successModal" v-if="isShowSuccess">
      <div class="wrap">
        <header>
          <span>提示</span
          ><span @click="handleHide"><a-icon type="close"/></span>
        </header>
        <div class="content">
          <img
            src="../../assets/img/ic_ziyuanguanli_duomeiti_up_chenggong_normal@2x.png"
            alt=""
          />
          <p>提交成功</p>
        </div>
        <div class="btn">
          <button @click="handleHide">继续上传</button>
          <button @click="handleGo">返回资源管理</button>
        </div>
      </div>
    </div>
    <div class="modal noticeModal" v-if="isShowNotice">
      <div class="wrap">
        <header>
          <span>提示</span
          ><span @click="handleKnow"><a-icon type="close"/></span>
        </header>
        <div class="content">
          <img
            src="../../assets/img/ic_ziyuanguanli_duomeiti_up_error_normal@2x.png"
            alt=""
          />
          <p>
            {{ noticeText }}
          </p>
        </div>
        <div class="btn">
          <button @click="handleKnow">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeSelect from '../resource-management/components/TreeSelect'
import Upload from './components/Upload'
export default {
  name: '',
  components: {
    TreeSelect,
    Upload
  },
  data() {
    return {
      fileList: [],
      process: [],
      isShowSuccess: false,
      isShowNotice: false,
      noticeText: null,
      uuid: null,
      timer: null,
      count: 0,
      complete: 0,
      flag: true
    }
  },
  watch: {
    complete(value) {
      console.log(value)
      if (value === 100) {
        this.timer = window.setInterval(() => {
          this.getProcess(this.count)
        }, 1000)
      }
    }
  },
  methods: {
    handleFileChange(value) {
      this.fileList = [...this.fileList, ...value]
    },
    handleDelete(value) {
      this.fileList = value
    },
    handleSubmit() {
      this.flag = true
      if (!this.$store.state.resource.currentTreeCode) {
        this.isShowNotice = true
        this.noticeText = '请选择章节'
        return
      }
      if (this.fileList.length === 0) {
        this.isShowNotice = true
        this.noticeText = '请选择需要上传的文件'
        return
      }

      if (this.fileList.some(item => this.fileType(item.name))) {
        this.isShowNotice = true
        this.noticeText =
          '您选择的文件格式不正确，请重新新选择（本系统支持的格式-视频：mp4；音频； mp3/wav；图片；jpg/png;）'
        return
      }

      if (this.fileList.length > 5) {
        this.isShowNotice = true
        this.noticeText = '上传的文件数量不能超过5个，请重新选择'
        return
      }
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].size > 500 * 1024 * 1024) {
          this.flag = false
          break
        }
      }
      if (this.flag) {
        this.loopUpload(this.count)
      }
    },
    loopUpload(count) {
      let fd = new FormData()
      fd.append('file', this.fileList[count])
      fd.append('teacherId', this.$store.getters.teacherId)
      fd.append(
        'textbookChapterId',
        Number(this.$store.state.resource.currentTreeCode)
      )
      fd.append(
        'textbookChapterName',
        this.$store.getters['resource/textbookChapterName']
      )
      this.uuid = this.genID(32)

      fd.append('uuid', this.uuid)
      this.loading = this.$loading({
        lock: true,
        text: '正在上传...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px'
      })
      return this.$http
        .post(
          '/teacherApi/upload/uploadFile/resource/kb/' +
            this.$store.getters.subjectAbbreviation,
          fd,
          {
            onUploadProgress: progressEvent => {
              this.complete =
                (progressEvent.loaded / progressEvent.total) * 100 || 0
              this.$set(this.process, count, parseInt(this.complete / 2))
            },
            headers: {
              upload: true
            }
          }
        )
        .catch(error => {
          console.log(error)
        })
    },
    //资源上传进度监听
    getProcess(count) {
      this.$http
        .post(`/teacherApi/upload/item/percent/${this.uuid}`, {
          teacherId: this.$store.getters.teacherId
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.$set(
              this.process,
              count,
              this.process[count] + parseInt(data.infos / 2)
            )
            if (data.infos === 100 || data.infos === -1) {
              this.count += 1
              this.resetProcess()
              clearInterval(this.timer)
              if (this.count < this.fileList.length) {
                this.complete = 0
                this.handleSubmit()
              } else {
                this.loading.close()
                this.isShowSuccess = true
              }
            }
          }
        })
    },
    //资源上传进度重置
    resetProcess() {
      this.$http.post(`/teacherApi/upload/percent/reset/${this.uuid}`, {
        teacherId: this.$store.getters.teacherId
      })
    },
    genID(length) {
      return Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36)
    },
    handleHide() {
      this.isShowSuccess = false
      this.fileList = []
      this.process = []
      this.count = 0
      this.complete = 0
    },
    handleGo() {
      this.$router.push('/resource-management')
    },
    handleKnow() {
      this.isShowNotice = false
    },
    fileType(name) {
      return !/\.(mp4|mp3|wav|jpg|png)$/.test(name.toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.resource-upload {
  width: 1200px;
  margin: 0 auto;
}
.breadcrumb {
  font-size: 14px;
  font-weight: 400;
  color: rgba(94, 132, 173, 1);
  padding-top: 24px;
}
.from-upload {
  margin-top: 16px;
  width: 1200px;
  height: 650px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(233, 233, 233, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  margin-bottom: 10px;
  .wrap {
    width: 860px;
    margin: 86px auto 0;
    .row {
      margin-bottom: 16px;
      display: flex;
      cursor: pointer;
      .title {
        flex: 0 0 113px;
        margin-right: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(61, 77, 101, 1);
      }
      .select {
        width: 394px;
      }
      .wrap-pic {
        width: 747px;
        padding: 20px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(221, 221, 221, 1);
      }
    }
    .submit {
      width: 200px;
      height: 40px;
      margin: 40px auto 10px;
      background: rgba(16, 89, 255, 1);
      border: 1px solid rgba(16, 89, 255, 1);
      box-shadow: 0px 4px 6px 0px rgba(16, 89, 255, 0.2);
      border-radius: 20px;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    width: 543px;
    height: 380px;
    border-radius: 12px;
    background-color: #fff;
    header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(94, 132, 173, 1);
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 46px;
      button {
        border-radius: 18px;
        border: none;
        outline: none;
        width: 160px;
        height: 36px;
        cursor: pointer;
      }
      button:nth-child(1) {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(16, 89, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
        font-size: 14px;
        font-weight: 400;
        color: rgba(16, 89, 255, 1);
        margin-right: 23px;
      }
      button:nth-child(2) {
        background: #1059ff;
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        border-radius: 18px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.successModal {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      margin-top: 50px;
      width: 108px;
      height: 85px;
    }
    p {
      margin-top: 15px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      padding: 0 65px;
      color: rgba(61, 77, 101, 1);
    }
  }
}
.noticeModal {
  .wrap {
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        margin-top: 50px;
        width: 76px;
        height: 87px;
      }
      p {
        margin-top: 15px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        padding: 0 60px;
        color: rgba(61, 77, 101, 1);
      }
    }
    .btn {
      button:nth-child(1) {
        margin-right: 0;
      }
    }
  }
}
</style>
