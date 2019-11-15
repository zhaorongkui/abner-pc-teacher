<template>
  <div class="no_data">
    <img src="../assets/img/play/no_data.png" />
    <div>
      <p>{{tips}}</p>
      <a-button type="primary" ghost @click="routerPushPath" class="button_style">{{button}}</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }, 
  props: {
    button: {
      type: String,
      default: '去布置'
    },
    tips: {
      type: String,
      default: '还没有布置作文任务哦～'
    },
    pathname: {
      type: String,
      default: 'publish-work'
    },
    pushParams: {}
  },
  methods: {
    routerPushPath() {
      let jumpInfo = {
        name: this.pathname
      }
      this.pushParams ? jumpInfo.params = this.pushParams : '';
      this.$router.push(jumpInfo)
    }
  }
}
</script>

<style scoped>
.no_data {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 73px;
  z-index: 99;
  display: flex;
  justify-content: center;
  padding-top: 27px;
  padding-bottom: 20px;
}
.no_data img {
  width: 210px;
  height: 176px;
}
.no_data > div {
  margin-left: 10px;
}
.no_data div p {
  font-size: 14px;
  color: #6181CA;
  margin-top: 59px;
  line-height: 15px;
}
.button_style {
  box-shadow: 0 0 8px rgba(16, 89, 255, 0.27);
  border-radius: 14px;
  margin-top: 19px;
  font-size: 14px;
  color: #1059FF;
  min-width: 84px;
}
</style>