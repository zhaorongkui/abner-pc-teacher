<template>
  <div class="classify-dialog-wrap">
    <div class="classify-dialog" v-if="!showCreateDialog">
      <div>
        <span>选择分类</span>
        <img
          src="../../../../assets/img/publish/close.png"
          alt=""
          @click="close"
        />
      </div>
      <div>
        <div>
          <img src="../../../../assets/img/publish/xinjian.png" alt="" />
          <span @click="toggleDialog">新建分类</span>
        </div>
        <div id="chatContainer">
          <ul>
            <li @click="getId(0)" :class="addGroupId == 0 ? 'hover-li' : ''">
              我的收藏
            </li>
            <template v-for="item in collectionGroupList">
              <li
                :key="item.index"
                v-if="item.collectonGroupId != 0"
                :class="item.collectonGroupId == addGroupId ? 'hover-li' : ''"
                @click="getId(item.collectonGroupId)"
              >
                {{ item.groupName }}
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div>
        <button @click="close">取消</button>
        <button @click="addStores">确定</button>
      </div>
    </div>
    <CreateClassify
      v-else
      @toParentEvent="closeChildDialog"
      @toParentEvents="addGroupName"
    ></CreateClassify>
  </div>
</template>

<script>
import CreateClassify from './CreateClassify.vue'
export default {
  name: '',
  props: [],
  data() {
    return {
      showCreateDialog: false,
      collectionGroupList: [], //分组数据
      addGroupNames: '',
      addGroupId: ''
    }
  },
  mounted() {
    this.$store.dispatch('publish/collectionGroup').then(data => {
      this.collectionGroupList = data.infos
    })
  },
  computed: {},
  components: {
    CreateClassify
  },

  methods: {
    toggleDialog() {
      this.showCreateDialog = true
    },
    close() {
      this.$emit('toParentEvents', false)
    },
    closeChildDialog(val) {
      this.showCreateDialog = val
    },
    getId(id) {
      this.addGroupId = id
      this.$emit('toParentEvent', id)
    },
    addStores() {
      this.$emit('toParentEventStore')
    },
    addGroupName(val) {
      this.addGroupNames = val
      this.$store.dispatch('publish/addGroup', val).then(data => {
        if (data.flag === 1) {
          this.showCreateDialog = false
          this.addGroupId = data.infos
          this.$store.dispatch('publish/collectionGroup').then(data => {
            this.collectionGroupList = data.infos
            this.$nextTick(() => {
              document.getElementById('chatContainer').scrollTop =
                document.getElementById('chatContainer').scrollHeight + 150
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.classify-dialog-wrap {
  @include wh(100%, 100%);
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999999;
  .classify-dialog {
    @include wh(500px, 430px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    > div:nth-child(1) {
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
    > div {
      > div:nth-child(1) {
        @include wh(344px, auto);
        margin: 10px auto 0;
        overflow: auto;
        cursor: pointer;
        img {
          @include wh(24px, 24px);
        }
        span {
          @include sc(16px, #8493a8);
          display: inline-block;
          margin: 2px 0 0 10px;
        }
      }
      > div:nth-child(2) {
        @include wh(344px, 226px);
        margin: 13px auto 0;
        overflow: scroll;
        ul {
          @include wh(344px, auto);
        }
        ul li {
          @include wh(100%, 46px);
          @include sc(14px, #8493a8);
          padding-left: 22px;
          line-height: 46px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(202, 211, 223, 1);
          border-radius: 10px;
          margin-bottom: 11px;
        }
        li.hover-li {
          @include sc(14px, rgba(6, 16, 171, 1));
          background: #bad5ee;
          border: 1px solid rgba(16, 89, 254, 1);
          border-radius: 10px;
        }
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
      }
    }
  }
}
</style>
