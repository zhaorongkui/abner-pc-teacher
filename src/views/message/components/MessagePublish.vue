<template>
  <div class="publish">
    <ul>
      <li class="item">
        <div class="label">标题</div>
        <div class="content title">
          <input maxlength="20" v-model.trim="noticeTitle" type="text" />
          <span>{{ (noticeTitle && noticeTitle.length) || 0 }}/20</span>
        </div>
      </li>
      <li class="item">
        <div class="label">内容</div>
        <div class="content text-content">
          <textarea v-model.trim="noticeContent" maxlength="200"></textarea>
          <span>{{ (noticeContent && noticeContent.length) || 0 }}/200</span>
        </div>
      </li>
      <li class="item">
        <div class="label">添加照片</div>
        <div class="content pic">
          <ul>
            <li v-for="(item, index) of showImages" :key="index">
              <img :src="item" alt="" />
              <img
                class="del"
                @click="handleDelPic(index)"
                src="@/assets/img/ic_message_pic_delete@2x.png"
                alt=""
              />
            </li>
          </ul>
          <div
            class="upload"
            v-if="showImages.length < 6"
            @click="handleUpload"
          >
            <img src="@/assets/img/ic_message_new_upload@2x.png" alt="" />
            <p>上传图片</p>
            <input
              @change="handleFilesChange"
              class="files"
              type="file"
              ref="files"
              accept="image/*"
            />
          </div>
        </div>
      </li>
      <li class="item">
        <div class="label">发送到</div>
        <div class="content grade-class">
          <ul>
            <li
              v-for="(item, index) of gradeClassnames"
              :key="index"
              @click="selectGradeClass(item)"
            >
              <button
                :class="
                  schoolGradeClassId.includes(item.gradeClassid) ? 'active' : ''
                "
              >
                {{ item.grade | grade }} {{ item.gradeClassname }}
              </button>
            </li>
          </ul>
        </div>
      </li>
      <li class="item">
        <div class="label"></div>
        <div class="content submit">
          <input @click="handlePublish" type="button" value="发送" />
          <input @click="handleReset" type="button" value="取消" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'publish',
  components: {},
  data() {
    return {
      noticeTitle: null,
      noticeContent: null,
      gradeClassname: [],
      schoolGradeClassId: [],
      noticeImages: [],
      showImages: []
    }
  },
  computed: {
    gradeClassnames() {
      return this.$store.state.userInfo.classes
    }
  },
  methods: {
    selectGradeClass(grade) {
      if (this.schoolGradeClassId.includes(grade.gradeClassid)) {
        this.schoolGradeClassId.forEach((item, index) => {
          if (item === grade.gradeClassid) {
            this.schoolGradeClassId.splice(index, 1)
            this.gradeClassname.splice(index, 1)
          }
        })
      } else {
        this.schoolGradeClassId = [
          ...this.schoolGradeClassId,
          grade.gradeClassid
        ]
        this.gradeClassname = [...this.gradeClassname, this.gradeChina(grade.grade)+'（'+grade.gradeClassname+'）']
      }
    },
    handleUpload() {
      this.$refs.files.click()
    },
    handleFilesChange(e) {
      if (!e.target.files[0]) return
      const fd = new FormData()
      fd.append('file', e.target.files[0])
      this.$http
        .post('/teacherApi/upload/uploadCommonFile/notice/teacher/img', fd, {
          headers: {
            upload: true
          }
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.showImages = [...this.showImages, data.infos[1]]
            this.noticeImages = [...this.noticeImages, data.infos[0]]
          }
          this.$refs.files.value = ''
        })
    },
    handleDelPic(index) {
      this.showImages.splice(index, 1)
      this.noticeImages.splice(index, 1)
    },
    handlePublish() {
      if (!this.noticeTitle) {
        this.$message.success('请输入消息名称')
        return
      }
      if (!this.noticeContent) {
        this.$message.success('请输入消息内容')
        return
      }
      if (this.schoolGradeClassId.length === 0) {
        this.$message.success('请选择要发送的班级，可以多选')
        return
      }
      if (this.noticeImages.length > 0) {
        this.$http
          .post('/api/notice/teacher/sentNotice', {
            noticeTitle: this.noticeTitle,
            noticeContent: this.noticeContent,
            noticeCreateid: this.$store.state.userInfo.teacherId,
            noticeCreatename: this.$store.state.userInfo.teacherName,
            noticeImages: this.noticeImages.join(','),
            gradeClassname: this.gradeClassname.join('|'),
            schoolGradeClassId: this.schoolGradeClassId.join(',')
          })
          .then(({ data }) => {
            if (data.flag === 1) {
              this.$message.success('消息已经发送成功了')
              this.$store.dispatch('message/sendListCount')
              this.$store.dispatch('message/sendList')
              this.$router.go(-1)
            } else {
              this.$message.success('当前网络状态不佳，请稍后再试”')
            }
          })
      } else {
        this.$http
          .post('/api/notice/teacher/sentNotice', {
            noticeTitle: this.noticeTitle,
            noticeContent: this.noticeContent,
            noticeCreateid: this.$store.state.userInfo.teacherId,
            noticeCreatename: this.$store.state.userInfo.teacherName,
            gradeClassname: this.gradeClassname.join('|'),
            schoolGradeClassId: this.schoolGradeClassId.join(',')
          })
          .then(({ data }) => {
            if (data.flag === 1) {
              this.$message.success('消息已经发送成功了')
              this.$store.dispatch('message/sendListCount')
              this.$store.dispatch('message/sendList')
              this.$router.go(-1)
            } else {
              this.$message.success('当前网络状态不佳，请稍后再试”')
            }
          })
      }
    },
    handleReset() {
      this.noticeTitle = null
      this.noticeContent = null
      this.$refs.files.value = ''
      this.gradeClassname = []
      this.schoolGradeClassId = []
      this.showImages = []
    },
    gradeChina(value){
      var arr=['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三'];
      return arr[value-1]
    }
  }
}
</script>

<style lang="scss" scoped>
.publish {
  padding: 20px 10px;
  overflow-y: auto;
}
.item {
  display: flex;
  margin-bottom: 20px;
  .label {
    width: 80px;
    text-align: right;
    margin-right: 26px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(61, 77, 101, 1);
  }
  .content {
    flex: auto;
    position: relative;
    span {
      height: 44px;
      line-height: 44px;
      position: absolute;
      right: 10px;
      bottom: 0;
    }
  }

  .title {
    width: 100%;
    height: 44px;
    background: rgba(250, 251, 253, 1);
    border: 1px solid rgba(202, 211, 223, 1);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    padding: 0 10px;
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
    }
  }
  .text-content {
    width: 100%;
    height: 210px;
    background: rgba(250, 251, 253, 1);
    border: 1px solid rgba(202, 211, 223, 1);
    border-radius: 5px;
    padding: 10px;
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      border: none;
      outline: none;
    }
  }
  .pic {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    ul {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      li {
        width: 124px;
        height: 124px;
        border: 1px solid #ddd;
        background-color: #ddd;
        border-radius: 4px;
        margin-right: 10px;
        line-height: 124px;
        text-align: center;
        position: relative;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .del {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 6px;
          right: 6px;
        }
      }
      li:nth-child(6) {
        margin-right: 0;
      }
    }
    .upload {
      width: 124px;
      height: 124px;
      border: 1px solid #eee;
      color: #1059ff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .upload img {
      width: 55px;
      margin-bottom: 10px;
    }
    .files {
      width: 0;
      height: 0;
      position: relative;
    }
  }
  .grade-class {
    width: 592px;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 0 128px;
        height: 40px;
        margin-right: 20px;
        margin-bottom: 20px;
        button {
          padding: 5px 10px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(185, 185, 185, 1);
          border-radius: 4px;
          outline: none;
          font-size: 14px;
          font-weight: 400;
          color: rgba(91, 103, 121, 1);
        }
        .active {
          border: 1px solid rgba(16, 89, 255, 1);
          background: rgba(16, 89, 255, 1);
          color: #fff;
        }
      }
    }
  }
  .submit {
    input {
      width: 200px;
      height: 40px;
      color: #fff;
      background: rgba(16, 89, 255, 1);
      border: 1px solid rgba(16, 89, 255, 1);
      box-shadow: 0px 4px 6px 0px rgba(16, 89, 255, 0.2);
      border-radius: 20px;
      outline: none;
      font-size: 16px;
    }
    input:last-child {
      background-color: #fff;
      border: 1px solid rgba(16, 89, 255, 1);
      box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.16);
      border-radius: 20px;
      color: rgba(16, 89, 255, 1);
      margin-left: 20px;
    }
  }
}
</style>
