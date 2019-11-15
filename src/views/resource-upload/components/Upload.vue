<template>
  <div class="upload-resource">
    <ul class="fileList">
      <!-- :class="
          fileType(item.name) || item.size > 500 * 1024 * 1024 ? 'warn' : ''
        " -->
      <li class="item" v-for="(item, index) of fileList" :key="index">
        <span
          >{{ item.name }}
          <i
            v-if="item.size < 500 * 1024 * 1024"
            :class="item.size < 500 * 1024 * 1024 ? '' : 'error'"
            >({{ item.size | size }})</i
          >
          <i v-else
            >({{ item.size | size }}) &nbsp;&nbsp;
            <i :class="item.size > 500 * 1024 * 1024 ? 'error' : ''"
              >({{ text }})</i
            ></i
          >
        </span>
        <a-progress
          v-if="process[index]"
          :percent="process[index]"
          strokeColor="#FDB36A"
        />
        <div class="close">
          <img
            @click="handleDelete(index)"
            src="../../../assets/img/ic_ziyuan_duomeiti_up_zhangjie_delete@2x.png"
            alt=""
          />
        </div>
      </li>
    </ul>
    <div class="upload" @click="handleFile">
      <img src="../../../assets/img/ic_message_new_upload@2x.png" alt="" />
      <p>上传文件</p>
      <input
        ref="fileInput"
        @change="handleChange"
        type="file"
        multiple="multiple"
        accept=".png,.PNG,.jpg,.JPG,.mp3,.MP3,.mp4,.MP4,.wav,.WAV"
      />
    </div>
    <div class="modal noticeModal" v-if="isShowNotice">
      <div class="wrap">
        <header>
          <span>提示</span
          ><span @click="handleKnow"><a-icon type="close"/></span>
        </header>
        <div class="content">
          <img
            src="../../../assets/img/ic_ziyuanguanli_duomeiti_up_error_normal@2x.png"
            alt=""
          />
          <p v-html="noticeText"></p>
        </div>
        <div class="btn">
          <button @click="handleKnow">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    fileList: {
      type: Array
    },
    process: Array
  },
  data() {
    return {
      isShowNotice: false,
      noticeText: '',
      text: '该文件超过500MB，请重新选择'
    }
  },
  watch: {
    fileList() {
      if (this.fileList.length === 0) {
        this.$refs.fileInput.value = null
      }
    }
  },
  filters: {
    size(value) {
      let result
      if (value > 1024 * 1024) {
        result = Math.round(value / (1024 * 1024)).toString() + 'MB'
      } else {
        result = Math.round(value / 1024).toString() + 'KB'
      }
      return result
    }
  },
  methods: {
    handleFile() {
      this.$refs.fileInput.click()
    },
    handleKnow() {
      this.isShowNotice = false
    },
    handleChange(event) {
      this.$emit('onFileChange', event.target.files)
    },
    handleDelete(index) {
      let list = [...this.fileList]
      list.splice(index, 1)
      this.$emit('onFileDelete', list)
    },
    fileType(name) {
      return !/\.(mp4|mp3|wav|jpg|png)$/.test(name.toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 128px;
  height: 128px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(16, 89, 255, 1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 54px;
    height: 36px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
    color: rgba(16, 89, 255, 1);
  }
  input {
    width: 0;
    height: 0;
  }
}
.fileList {
  .item {
    // height: 40px;
    line-height: 40px;
    background: rgba(250, 251, 253, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 5px;
    margin-bottom: 15px;
    position: relative;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(125, 125, 125, 1);
    opacity: 0.5;
    span {
      display: inline-block;
      height: 40px;
    }
    .close {
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .warn {
    border: 1px solid red;
  }
  .error {
    color: red;
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
        padding: 0 70px;
        color: rgba(61, 77, 101, 1);
        text-align: center;
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
