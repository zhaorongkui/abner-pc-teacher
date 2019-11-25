<style scoped lang="scss">
.share {
  position: absolute;
  right: 1%;
  top: 3%;
  z-index: 999;
  color: #999;
  padding: 6px 20px;
  background: #f7f7f7;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  span {
    color: #8493a8;
    font-size: 14px;
  }
  span.hover-span {
    color: #ff971d;
  }
}
.subjective {
  flex: auto;
  height: 100%;
  width: 100%;
  position: relative;
}
.canvas {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: center;
  padding: 30px;
}
.canvas img {
  max-width: 100%;
  max-height: 100%;
}
.default-pic {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.pagination {
  position: absolute;
  right: 10px;
  bottom: 10px;
  ul {
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(223, 223, 223, 1);
    li {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    li:nth-child(2) {
      width: auto;
      min-width: 34px;
      border-right: 1px solid rgba(223, 223, 223, 1);
      border-left: 1px solid rgba(223, 223, 223, 1);
      padding: 0 5px;
      span {
        color: #339bff;
      }
    }
  }
}
</style>
<template>
  <div class="subjective card" style="box-shadow: none">
    <ReadPeerGrading :questionInfo="questionInfo"></ReadPeerGrading>

    <div class="canvas">
      <template
        v-if="techerReviewList.length > 0 && techerReviewList[0].reviewFileStr"
      >
        <EditCanvas
          :src="techerReviewList[0].reviewFileStr.split(',')[picIndex - 1]"
          @importImg="handleImportImg"
          :picIndex="picIndex"
        ></EditCanvas>
        <div class="pagination">
          <ul>
            <li @click="handleLeft">
              <a-icon type="caret-left" />
            </li>
            <li>
              <span>{{ picIndex }}</span
              >/{{ techerReviewList[0].reviewFileStr.split(',').length }}
            </li>
            <li
              @click="
                handleRight(techerReviewList[0].reviewFileStr.split(',').length)
              "
            >
              <a-icon type="caret-right" />
            </li>
          </ul>
        </div>
      </template>
      <template v-else-if="fileList.length > 0">
        <EditCanvas
          :src="fileList[picIndex - 1].answerFileUrlStr"
          :picIndex="picIndex"
          @importImg="handleImportImg"
        ></EditCanvas>
        <div class="pagination">
          <ul>
            <li @click="handleLeft">
              <a-icon type="caret-left" />
            </li>
            <li>
              <span>{{ picIndex }}</span
              >/{{ fileList.length }}
            </li>
            <li @click="handleRight(fileList.length)">
              <a-icon type="caret-right" />
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="default-pic">
          <img src="../../assets/img/pic_homepage_empty@2x.png" alt="" />
          没有上传答案图片
        </div>
      </template>
    </div>
  </div>
</template>
<script>
// 主观题
import localforage from 'localforage'
import ReadPeerGrading from './ReadPeerGrading'
import EditCanvas from '../../views/work-marking/components/EditCanvas'
export default {
  name: 'SubjectiveItem',
  components: {
    ReadPeerGrading,
    EditCanvas
  },
  props: {
    questionInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 教师批阅列表
    techerReviewList() {
      return (
        (this.questionInfo.reviewList &&
          this.questionInfo.reviewList.filter(
            item => item.reviewUserType === 2
          )) ||
        []
      )
    },
    // 批阅的文件
    fileList() {
      let result = []
      this.questionInfo.reviewList &&
        this.questionInfo.reviewList.forEach(item => {
          if (item.reviewUserType === 2 && item.reviewFileStr) {
            result.push(item)
          }
        })
      if (result.length === 0) {
        result = this.questionInfo.fileList || []
      }
      return result
    }
  },
  data() {
    return {
      picIndex: 1,
      blob: null,
      ifShare: 0
    }
  },
  watch: {
    questionInfo() {
      this.picIndex = 1
      this.blob = null
    }
  },
  mounted() {
    this.questionInfo.ifShare === 0 ? (this.ifShare = 1) : (this.ifShare = 0)
  },
  methods: {
    handleImportImg(blob) {
      this.blob = blob
    },
    handleLeft() {
      setTimeout(() => {
        if (this.picIndex === 1) return
        this.picIndex -= 1
      })
    },
    handleRight(maxLength) {
      setTimeout(() => {
        if (this.picIndex === maxLength) return
        this.picIndex += 1
      })
    },
    getFile() {
      return this.blob
    },
    share() {
      // console.log(this.$store.state.marking.questionInfo)
      if (
        (this.questionInfo.hasRewive == 1 ||
          this.questionInfo.hasRewive == 4) &&
        this.questionInfo.isTrue == 0
      ) {
        this.$http
          .post('/api/teacher/homework/shareStudentAnswer', {
            ifShare: this.ifShare,
            studentAnswerId: this.questionInfo.studentAnswerId
          })
          .then(({ data }) => {
            if (data.flag === 1) {
              if (this.ifShare == 0) {
                this.$message.success('分享成功')
              } else {
                this.$message.success('取消分享成功')
              }
              localforage.getItem('student').then(student => {
                this.$store.commit('marking/STUDENTINFOID', student.studentId)
              })
              this.$store.commit(
                'marking/UPDATEHOMEWORKQUESTIONID',
                this.questionInfo.homeworkQuestionId
              )
              this.$store.dispatch('marking/questionInfo')
              this.updateIfShare()
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$message.error('正确答案才能分享全班哦～')
      }
    },
    updateIfShare() {
      this.ifShare === 0 ? (this.ifShare = 1) : (this.ifShare = 0)
    }
  }
}
</script>
