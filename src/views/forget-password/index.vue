<template>
  <div class="f-pas-wrap">
    <div class="modify-pas-dialog-wrap">
      <div class="slogan">
        <img src="../../assets/img/bg_login_pic.png" alt="" />
      </div>
      <div class="modify-pas-dialog">
        <div class="modify-pas-dialog-header">
          <span>重设密码</span>
        </div>
        <div class="modify-pas-dialog-form">
          <div>
            <img src="../../assets/phone.png" alt="" />
            <input
              type="text"
              v-model="f_pas_tel"
              class="reset_int_style"
              placeholder="输入手机号"
              v-if="!isTel"
            />
            <input
              type="text"
              v-model="f_pas_tel"
              class="reset_int_style"
              placeholder="输入手机号"
              readonly
              v-else
            />
            <img src="" alt="" v-show="false" />
            <img src="" alt="" v-show="f_pas_tel != ''" @click="clear_val(1)" />
          </div>
          <div>
            <img src="../../assets/vcode.png" alt="" />
            <input
              type="text"
              v-model="vcode_f_pas"
              class="reset_int_style_"
              placeholder="请输入验证码"
            />
            <span class="get-code" @click="getPhoneCode()" v-if="isGetCode"
              >获取验证码</span
            >
            <span class="get-code" v-else>重新获取验证码{{ countDown }}s</span>
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="vcode_f_pas != ''"
              @click="clear_val(2)"
              class="clear_btn"
            />
          </div>
          <div>
            <img src="../../assets/newp.png" alt="" />
            <input
              :type="new_inputType"
              v-model="new_pas"
              placeholder="输入新密码"
            />
            <img :src="new_imgUrl" alt="" @click="hid_password(1)" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="new_pas != ''"
              @click="clear_val(3)"
            />
          </div>
          <div>
            <img src="../../assets/newp.png" alt="" />
            <input
              :type="confirm_inputType"
              v-model="confirm_pas"
              placeholder="确认新密码"
            />
            <img :src="confirm_imgUrl" alt="" @click="hid_password(2)" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="confirm_pas != ''"
              @click="clear_val(4)"
            />
          </div>
        </div>
        <button @click="modify_pas" class="modify_btn">确定</button>
        <button @click="modify_login" class="modify_btn modify_btn_back">
          返回登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
var eye = require('@/assets/eye.png')
var c_eye = require('@/assets/close-eye.png')
const phoneRexp = /^1\d{10}$/
const patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
export default {
  components: {},
  data() {
    return {
      //用户信息
      f_pas_tel: '',
      vcode_f_pas: '',
      new_pas: '',
      confirm_pas: '',
      isTel: false,

      //控制确认密码是否显示
      confirm_imgUrl: c_eye,
      confirm_inputType: 'password',
      confirm_flag: true,

      //控制新密码是否显示
      new_imgUrl: c_eye,
      new_inputType: 'password',
      new_flag: true,

      //验证码
      countDown: 60,
      isGetCode: true,
      clock: null //计时器
    }
  },
  created() {},
  mounted() {
    this.f_pas_tel = localStorage.getItem('name')
      ? localStorage.getItem('name')
      : this.$store.state.userInfo.teacherPhonenum
    this.isTel = this.f_pas_tel != undefined ? true : false
  },
  methods: {
    //密码隐藏显示方法
    hid_password(t) {
      switch (t) {
        case 1:
          if (this.new_flag) {
            this.new_imgUrl = eye
            this.new_inputType = 'text'
            this.new_flag = !this.new_flag
          } else {
            this.new_imgUrl = c_eye
            this.new_inputType = 'password'
            this.new_flag = !this.new_flag
          }
          break
        case 2:
          if (this.confirm_flag) {
            this.confirm_imgUrl = eye
            this.confirm_inputType = 'text'
            this.confirm_flag = !this.confirm_flag
          } else {
            this.confirm_imgUrl = c_eye
            this.confirm_inputType = 'password'
            this.confirm_flag = !this.confirm_flag
          }
          break
        case 3:
          if (this.old_flag) {
            this.old_imgUrl = eye
            this.old_inputType = 'text'
            this.old_flag = !this.old_flag
          } else {
            this.old_imgUrl = c_eye
            this.old_inputType = 'password'
            this.old_flag = !this.old_flag
          }
          break
      }
    },
    //清楚输入框内容
    clear_val(t) {
      switch (t) {
        case 1:
          this.f_pas_tel = ''
          break
        case 2:
          this.vcode_f_pas = ''
          break
        case 3:
          this.new_pas = ''
          break
        case 4:
          this.confirm_pas = ''
          break
      }
    },
    //修改密码确认
    modify_pas() {
      var self = this
      if (this.f_pas_tel === '') {
        this.$message.error('手机号不能为空')
        return false
      }
      if (!phoneRexp.test(this.f_pas_tel)) {
        this.$message.error('手机号格式有误')
        return false
      }
      if (this.vcode_f_pas === '') {
        this.$message.error('请输入验证码')
        return false
      }
      if (this.new_pas === '') {
        this.$message.error('请输入新密码')
        return false
      }
      if (!patrn.test(this.new_pas)) {
        this.$message.error('密码为8-16位，字母数字组合')
        return false
      }
      if (this.confirm_pas === '') {
        this.$message.error('请输入确认密码')
        return false
      }
      if (this.confirm_pas != this.new_pas) {
        this.$message.error('两次密码不一致')
        return false
      }
      this.$http
        .post('/api/teacher/forgetPassword', {
          code: this.vcode_f_pas,
          teacherPhonenum: this.f_pas_tel,
          password: this.new_pas,
          typeNum: '4'
        })
        .then(res => {
          if (res.data.flag === 1) {
            this.$message.success('密码修改成功')
            this.$store
              .dispatch('Login', {
                password: self.new_pas,
                userName: self.f_pas_tel,
                appChannelId: 'teacher-pc'
              })
              .then(res => {
                if (res.message == 'SUCCESS') {
                  setTimeout(function() {
                    this.$router.push('/')
                  }, 1000)
                }
              })
              .catch()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    modify_login() {
      this.$router.push('/login')
    },
    //获取验证码
    getPhoneCode() {
      var self = this
      if (this.f_pas_tel === '' || this.f_pas_tel == undefined) {
        this.$message.error('手机号不能为空')
        return false
      }
      this.sendsms(self)
    },
    //发送验证码
    sendsms: function(_s) {
      //连接服务器进行获取验证码操作
      this.$http
        .get('/api/sms/sendSms', {
          params: {
            phoneNum: _s.f_pas_tel,
            smsType: 't',
            typeNum: '4'
          }
        })
        .then(res => {
          if (res.data.flag === 1) {
            _s.isGetCode = false
            _s.timer()
            _s.$message.success(res.data.infos)
          } else {
            _s.$message.error(res.data.message)
          }
        })
        .catch()
    },
    //倒计时
    timer() {
      //验证码倒计时
      let self = this
      let countDown = self.countDown
      self.clock = setInterval(() => {
        countDown--
        if (countDown >= 0) {
          self.countDown = countDown
        } else {
          clearInterval(self.clock)
          self.countDown = 60
          self.isGetCode = true
        }
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/styles/variable.scss';
.f-pas-wrap {
  @include wh(100%, 100%);
  .modify-pas-dialog-wrap {
    @include wh(100%, 100%);
    background: url(../../assets/img/bg_login@2x.jpg) no-repeat center;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
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
    .modify-pas-dialog {
      @include wh(450px, 500px);
      background: #fff;
      #{$attr}-radius: 10px;
      overflow: hidden;
      position: absolute;
      top: 50%;
      right: 70px;
      transform: translateY(-50%);
      .modify-pas-dialog-header {
        @include wh(100%, 60px);
        @include fj(center);
        align-items: center;
        background: rgba(243, 245, 248, 1);
        margin-bottom: 28px;
        span {
          @include sc(18px, #586878);
        }
      }
      .modify-pas-dialog-form {
        @include wh(82%, auto);
        margin: 0 auto;
        div {
          @include wh(100%, 50px);
          #{$attr}: 1px solid #cad3df;
          margin-top: 12px;
          position: relative;
          @include fj();
          align-items: center;
          #{$attr}-radius: 4px;
        }
        img {
          @include wh(18px, 18px);
        }
        img:nth-of-type(1) {
          margin-left: 17px;
        }
        img:nth-of-type(2) {
          margin-right: 25px;
          @include wh(22px, 12px);
        }
        img:nth-of-type(3) {
          position: absolute;
          right: 70px;
          top: 15px;
          cursor: pointer;
        }
        img.clear_btn {
          position: absolute;
          right: 140px;
          top: 15px;
          cursor: pointer;
          @include wh(18px, 18px);
        }
        input {
          @include wh(70%, 100%);
          #{$attr}: 0;
          outline: none;
          @include sc(16px, #000);
        }
        input::-webkit-input-placeholder {
          @include sc(16px, #aaa);
        }
        .reset_int_style {
          @include wh(87%, 100%);
        }
        .reset_int_style_ {
          @include wh(48%, 100%);
        }
        .get-code {
          @include wh(34%, 100%);
          text-align: center;
          #{$l}: 51px;
          @include sc(14px, #1059ff);
          cursor: pointer;
          margin-right: 5px;
        }
      }
      .modify_btn {
        display: block;
        @include wh(82%, 44px);
        @include sc(14px, #fff);
        margin: 25px auto 0;
        text-align: center;
        #{$l}: 44px;
        background: #1059ff;
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        #{$attr}-radius: 22px;
        outline: none;
      }
      .modify_btn_back {
        background: none;
        @include sc(14px, #1059ff);
      }
    }
  }
}
</style>
