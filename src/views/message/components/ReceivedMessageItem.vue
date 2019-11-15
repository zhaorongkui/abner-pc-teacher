<template>
  <div class="message-item">
    <ul class="header">
      <li class="title" :class="{ isRead: item.isRead === 0 }">
        <span>{{ item.noticeTitle }}</span>
        <span @click="hanldeShowContent(item.noticeId)">
          <img
            v-show="!isShow"
            class="icon"
            src="../../../assets/img/ic_fabu_yulan_danci_zhan@2x.png"
            alt=""
          />
          <img
            v-show="isShow"
            class="icon"
            src="../../../assets/img/ic_fabu_yulan_danciup@2x.png"
            alt=""
          />
        </span>
      </li>
      <li class="label">
        <span
          >来自:
          <span class="from">{{ item.noticeType | noticeType }}</span>
        </span>
        <span>{{ item.noticeSendtime | formatDate }}</span>
      </li>
    </ul>
    <div
      class="content"
      @click="handleGo"
      v-show="isShow"
      v-html="item.noticeContent"
    ></div>
  </div>
</template>

<script>
import localforage from 'localforage'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('message')
export default {
  name: 'message-item',
  components: {},
  data() {
    return {
      isShow: false
    }
  },
  props: ['item'],
  filters: {
    noticeType(noticeType) {
      let noticeTypeText
      switch (noticeType) {
        case 1:
          noticeTypeText = '乐知帮'
          break
        case 2:
          noticeTypeText = '作业提醒'
          break
        case 3:
          noticeTypeText = '改错提醒'
          break
        case 4:
          noticeTypeText = '班级通知'
          break
        case 5:
          noticeTypeText = '发布作业提醒'
          break
        case 6:
          noticeTypeText = '作业撤回提醒'
          break
        case 9: //重批申请
          noticeTypeText = '重批申请提醒'
          break
        case 10:
          noticeTypeText = '重批申请处理完成'
          break
        case 11:
          noticeTypeText = '未提交作业的提醒'
          break
        default:
          noticeTypeText = '乐知帮'
          break
      }
      return noticeTypeText
    }
  },
  methods: {
    ...mapActions(['read']),
    hanldeShowContent(id) {
      if (!this.isShow) {
        if (this.item.noticeId == id) {
          this.item.isRead = 1
        }
        this.read({ noticeId: id, all: '' })
      }
      this.isShow = !this.isShow
    },
    handleGo() {
      if (this.item.noticeType === 9) {
        this.$http
          .get('/api/teacher/homework/student/list/notice/param', {
            params: {
              homeworkId: this.item.homeworkId,
              studentId: this.item.noticeSendid
            }
          })
          .then(({ data }) => {
            localforage.setItem('workListItem', data.infos).then(() => {
              this.$router.push({
                name: 'work-grading-assignment',
                params: { item: data.infos }
              })
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message-item {
  padding: 0px 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 20px;
  .header {
    height: 120px;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(61, 77, 101, 1);
      position: relative;
      margin-bottom: 20px;
      .icon {
        width: 10px;
        height: 12px;
        cursor: pointer;
      }
    }
    .isRead::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -15px;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: rgba(255, 82, 53, 1);
      box-shadow: 0px 2px 7px 0px rgba(173, 0, 29, 0.31);
      border-radius: 50%;
    }
    .label {
      font-size: 14px;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      .from {
        font-size: 14px;
        font-weight: 400;
        color: rgba(94, 132, 173, 1);
      }
    }
  }
  .content {
    min-height: 140px;
    padding: 20px 0;
    text-indent: 2em;
    font-size: 14px;
    font-weight: 400;
    color: rgba(143, 143, 143, 1);
    line-height: 31px;
  }
}
</style>
