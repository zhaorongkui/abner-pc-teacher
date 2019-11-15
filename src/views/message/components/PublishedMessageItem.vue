<template>
  <div class="message-item">
    <ul class="header">
      <li class="title">
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
        <div>
          发送至:
          <span
            v-for="(item, index) of splitGrade(item.gradeClassname)"
            :key="index"
          >
            <span class="from">{{ item }}</span>
          </span>
        </div>
        <span>{{ item.noticeSendtime | formatDate }}</span>
      </li>
    </ul>
    <div class="content" v-show="isShow">
      <div v-html="item.noticeContent"></div>
      <div class="wrap" :id="item.noticeId">
        <div
          class="index"
          v-for="(src, index) of item.noticeImagesUrl"
          :key="index"
        >
          <div><img :src="src" alt="" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
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
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    ...mapActions(['read']),
    hanldeShowContent(id) {
      if (!this.isShow) {
        this.read({ noticeId: id, all: '' })
      }
      this.isShow = !this.isShow
    },
    splitGrade(value) {
      return value.split('|')
    }
  },
  mounted() {
    const ViewerDom = document.getElementById(this.item.noticeId)
    this.Viewer = new Viewer(ViewerDom, {
      // 相关配置项,详情见下面
    })
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
      }
    }
    .label {
      font-size: 14px;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
      .from {
        font-size: 14px;
        font-weight: 400;
        color: rgba(94, 132, 173, 1);
        background-color: #dbe6ff;
        display: inline-block;
        padding: 0 8px;
        margin-right: 10px;
        border-radius: 4px;
        height: 24px;
        line-height: 24px;
        text-align: center;
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
.wrap {
  display: flex;
  .index {
    flex: 0 0 16.6666%;
    div {
      width: 130px;
      height: 130px;
      background-color: #ddd;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
