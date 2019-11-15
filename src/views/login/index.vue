<template>
  <div class="v-login-wrap">
    <div class="slogan">
      <img src="../../assets/img/bg_login_pic.png" alt="" />
    </div>
    <div class="v-login-wrap-modal">
      <img
        src="../../assets/img/publish/pic_login_logo.png"
        alt=""
        class="v-login-logo"
      />
      <div class="v-login-input">
        <div>
          <img src="../../assets/user.png" alt="" />
        </div>
        <input
          type="text"
          v-model.trim="loginInfo.userName"
          placeholder="请输入账号"
        />
      </div>
      <div class="v-login-input">
        <div>
          <img src="../../assets/password1.png" alt="" />
          <img
            :src="login_imgUrl"
            alt=""
            class="v-login-modal-pst v-login-modal-eye"
            @click="hid_password()"
          />
        </div>
        <input
          :type="login_inputType"
          v-model="loginInfo.password"
          placeholder="请输入密码"
        />
      </div>
      <div class="v-login-p">
        <span>
          <el-checkbox v-model="checked" size="medium" @change="checkEvent"
            >记住密码</el-checkbox
          >
          <!-- <a-checkbox :checked="checked" @change="checkEvent" size="medium"
            ></a-checkbox
          > -->
        </span>
        <span class="v-login-f-p" @click="forget_password">忘记密码？</span>
      </div>
      <div class="v-login-btn">
        <!-- <input
          type="text"
          @keyup.13="login()"
          @click="login()"
          v-focus
          id="input"
        /> -->
        <button @click="login()" @keyup.13="login()" id="el-button">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import $ from 'jquery'
const eye = require('@/assets/img/eye.png')
const c_eye = require('@/assets/img/close-eye.png')
const phoneRexp = /^1\d{10}$/
const patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
export default {
  components: {},
  data() {
    return {
      //控制密码是否显示
      login_imgUrl: c_eye,
      login_inputType: 'password',
      login_flag: true,

      //记住密码
      checked: false,

      //登陆信息
      loginInfo: {
        password: '',
        userName: '',
        appChannelId: 'teacherPC'
      }
    }
  },
  created() {
    localforage.getItem('checked').then(checked => {
      if (checked !== null && checked !== undefined) {
        this.checked = checked
      }
      if (checked) {
        localforage.getItem('loginInfo').then(loginInfo => {
          if (loginInfo) {
            this.loginInfo = loginInfo
          }
        })
      }
    })
    if (this.loginInfo.password) {
      this.login_imgUrl = c_eye
      this.login_inputType = 'password'
    }

    //pc enter键的实现
    document.onkeydown = () => {
      const key = window.event.keyCode
      if (key == 13) {
        document.getElementById('el-button').click()
      }
    }
  },
  mounted() {
    // var that = this
    // $('#el-button').click(function() {
    //   that.login()
    // })
    document.getElementById('el-button').focus()
  },
  methods: {
    //复选框事件
    checkEvent(val) {
      //this.checked = event.target.checked
      this.checked = val
    },
    //忘记密码
    forget_password() {
      if (this.loginInfo.userName) {
        localStorage.setItem('name', this.loginInfo.userName)
      } else {
        localStorage.setItem('name', '')
      }
      this.$router.push({
        name: 'forget-password'
      })
    },
    //控制隐藏显示密码方法
    hid_password() {
      if (this.login_flag) {
        this.login_imgUrl = eye
        this.login_inputType = 'text'
        this.login_flag = !this.login_flag
      } else {
        this.login_imgUrl = c_eye
        this.login_inputType = 'password'
        this.login_flag = !this.login_flag
      }
    },
    //登陆
    login() {
      $('.v-login-btn').css('background', '#1059ff')
      if (!this.loginInfo.userName) {
        this.$message.error('请输入手机号')
        return false
      }
      if (this.loginInfo.userName) {
        if (!phoneRexp.test(this.loginInfo.userName)) {
          this.$message.error('请输入正确格式手机号码')
          return false
        }
      }
      if (!this.loginInfo.password) {
        this.$message.error('请输入账号密码')
        return false
      }
      if (this.loginInfo.password) {
        if (!patrn.test(this.loginInfo.password)) {
          this.$message.error('密码为8-16位，字母数字组合')
          return false
        }
      }
      localforage.setItem('loginInfo', this.loginInfo)
      localforage.setItem('checked', this.checked)

      this.$store.dispatch('Login', this.loginInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.v-login-wrap {
  @include wh(100%, 100%);
  background: url(../../assets/img/bg_login@2x.jpg) no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .slogan {
    position: absolute;
    top: 50%;
    right: 450px;
    transform: translateY(-50%);
    img {
      width: 100%;
      height: auto;
    }
  }
  .v-login-wrap-modal {
    @include wh(400px, 440px);
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    position: absolute;
    top: 50%;
    right: 120px;
    transform: translateY(-50%);
    .v-login-logo {
      display: block;
      @include wh(216px, 66px);
      margin: 50px auto;
    }
    .v-login-input {
      width: 70%;
      height: 44px;
      margin: 20px auto 0;
      position: relative;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
      @include fj();
      align-items: center;
      border: 1px solid #ddd;
      .v-login-modal-pst {
        position: absolute;
        right: 20px;
        cursor: pointer;
      }

      input {
        @include wh(230px, 100%);
        float: left;
        @include sc(16px, #000);
        border: 0;
        outline: none;
      }

      input::-webkit-input-placeholder {
        @include sc(16px, #aaa);
      }

      div {
        @include wh(21px, 21px);
        @include sc(0.2rem, #aaa);
        @include fj();
        align-items: center;
        margin-left: 15px;

        img {
          @include wh(100%, 100%);
        }

        .v-login-modal-eye {
          @include wh(24px, 16px);
        }
      }
    }
    .v-login-btn {
      @include wh(70%, 44px);
      margin: 22px auto 0;
      background: #588bff;
      border-radius: 25px;
      text-align: center;
      #{$l}: 44px;
      cursor: pointer;
      position: relative;
      > button {
        outline: none;
        display: block;
        @include wh(100%, 100%);
        background: transparent;
        @include sc(18px, #fff);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        border-radius: 25px;
        border: 0;
      }
      input {
        @include wh(100%, 100%);
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        cursor: pointer;
      }
    }

    .v-login-p {
      @include wh(70%, auto);
      margin: 23px auto 0;
      @include fj();
      @include pd(0, 0.2rem, 0, 0.2rem);
      @include sc(16px, #999);

      .v-login-f-p {
        cursor: pointer;
        @include sc(14px, #1059ff);
      }
    }
  }
}
</style>
