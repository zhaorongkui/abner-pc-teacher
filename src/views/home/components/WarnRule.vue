<template>
  <div class="warnrule">
    <header>预警规则<a-icon @click="handleClick" type="close" /></header>
    <div class="content">
      <div>
        <span>设置作业正确率警戒线为：</span>
        <!-- <input type="text" v-model="trueRateWarn" maxlength="3" /> -->
        <a-input-number
          class="num-input"
          :value="trueRateWarn"
          @change="onTureChange"
          :min="0"
          :max="100"
        />%
      </div>
      <div>
        <span>设置作业提交率警戒线为：</span>
        <!-- <input type="text" v-model="submitRateWarn" maxlength="3" /> % -->
        <a-input-number
          class="num-input"
          :value="submitRateWarn"
          @change="onFinishChange"
          :min="0"
          :max="100"
        />%
      </div>
    </div>
    <div class="btn">
      <div class="cancel" @click="handleClick">取消</div>
      <div class="ok" @click="handleSubmit">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},

  data() {
    return {
      trueRateWarn: null,
      submitRateWarn: null
    }
  },
  computed: {},
  mounted() {
    this.trueRateWarn = this.$store.state.home.teacherWarnValue.trueRateWarn
    this.submitRateWarn = this.$store.state.home.teacherWarnValue.submitRateWarn
  },
  methods: {
    handleClick() {
      this.$store.dispatch('home/toggleIsShowRule')
    },
    onTureChange(value) {
      this.trueRateWarn = value
    },
    onFinishChange(value) {
      this.submitRateWarn = value
    },
    handleSubmit() {
      var reg = /^[0-9]*[1-9][0-9]*$/
      if (!reg.test(this.trueRateWarn)) {
        this.$message.warn('请输入正整数')
        return false
      }
      if (!reg.test(this.submitRateWarn)) {
        this.$message.warn('请输入正整数')
        return false
      }
      if (
        this.trueRateWarn ===
          this.$store.state.home.teacherWarnValue.trueRateWarn &&
        this.submitRateWarn ===
          this.$store.state.home.teacherWarnValue.submitRateWarn
      ) {
        this.$store.dispatch('home/toggleIsShowRule')
        return
      }
      this.$store.dispatch('home/saveTeacherWarnSet', {
        trueRateWarn: this.trueRateWarn,
        submitRateWarn: this.submitRateWarn,
        teacherId: this.$store.getters.teacherId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warnrule {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 101;
  scrollbar-width: none;
}
header {
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #dddddd;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  width: 100%;
  height: 156px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > div {
    margin-bottom: 10px;
  }
  input {
    width: 32px;
    height: 32px;
    outline: none;
    border: 1px solid #ddd;
    padding: 2px;
  }
}
.btn {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.cancel {
  width: 120px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(16, 89, 255, 1);
  box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 18px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(16, 89, 255, 1);
  line-height: 21px;
  text-align: center;
  line-height: 36px;
  margin-right: 10px;
}
.ok {
  width: 120px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  background-color: #1059ff;
  box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 18px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
}
.num-input {
  width: 70px;
}
</style>
