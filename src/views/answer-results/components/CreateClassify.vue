<template>
  <div class="create-classify-dialog">
    <div>
      <span>新建分类</span>
      <img src="../../../assets/img/publish/close.png" alt="" @click="close" />
    </div>
    <div>
      <label for="">请输入分类名称</label>
      <input
        type="text"
        placeholder="分类名称请保持在2-16个字"
        v-model="addGroupName"
      />
    </div>
    <div>
      <button @click="close">取消</button>
      <button @click="addGroup">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['type'],
  data() {
    return {
      addGroupName: ''
    }
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {
    close() {
      if (this.type != 1) {
        this.$emit('toParentEvent', false)
      } else {
        this.$emit('toParentEvent-cl', false)
      }
    },
    addGroup() {
      if (this.addGroupName.length < 2 || this.addGroupName.length > 16) {
        this.$message.error('分类名称请保持在2-16个字')
      } else {
        if (this.type != 1) {
          this.$emit('toParentEvents', this.addGroupName)
        } else {
          this.$emit('toParentEvent-c', this.addGroupName)
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.create-classify-dialog {
  scrollbar-width: none;
  @include wh(543px, 345px);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 12px;
  > div:nth-child(1) {
    scrollbar-width: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include wh(100%, 48px);
    padding: 0 19px;
    border-bottom: 1px solid rgba(244, 244, 244, 1);
    span {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(94, 132, 173, 1);
    }
    img {
      @include wh(14px, 14px);
    }
  }
  > div:nth-child(2) {
    scrollbar-width: none;
    @include wh(80%, auto);
    margin: 56px auto 0;
    display: flex;
    justify-content: center;
    flex-flow: column;
    label {
      @include sc(16px, #3d4d65);
      text-align: center;
    }
    input {
      @include wh(430px, 60px);
      @include sc(16px, #333);
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 8px;
      margin-top: 28px;
      padding-left: 17px;
      outline: none;
    }
    input::-webkit-input-placeholder {
      @include sc(16px, #aaa);
    }
  }
  > div:nth-child(3) {
    @include wh(80%, auto);
    @include fj(space-around);
    margin: 30px auto 0;
    button {
      outline: none;
      box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
      border-radius: 18px;
    }
    button:nth-child(1) {
      @include wh(160px, 36px);
      @include sc(14px, #1059ff);
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(16, 89, 255, 1);
    }
    button:nth-child(2) {
      @include wh(160px, 36px);
      @include sc(14, #fff);
      background: #1059ff;
      border: 0;
    }
  }
}
</style>
