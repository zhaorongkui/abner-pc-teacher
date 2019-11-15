<template>
  <div class="bottom-bar">
    <p class="name">{{ name }}</p>
    <div class="fun" v-if="from === 1">
      <img
        @click="handleShare"
        src="../../../assets/img/ic_ziyuan_share@2x.png"
        alt=""
      />
    </div>
    <div class="fun" v-else>
      <img
        @click="handleShare"
        src="../../../assets/img/ic_ziyuan_share@2x.png"
        alt=""
      />
      <img
        @click="handleEdit(name)"
        src="../../../assets/img/ic_ziyuan_edit@2x.png"
        alt=""
      />
      <img
        @click="handleDelete"
        src="../../../assets/img/ic_ziyuan_delete@2x.png"
        alt=""
      />
    </div>
    <div class="modal deleteModal" v-if="isShowDelete">
      <div class="wrap">
        <header>
          <span>提示</span
          ><span @click="cancleDelete"><a-icon type="close"/></span>
        </header>
        <div class="content">
          <img
            src="../../../assets/img/ic_ziyuanguanli_duomeiti_up_error_normal@2x.png"
            alt=""
          />
          <p>确定要删除吗？</p>
        </div>
        <div class="btn">
          <button @click="okDelete">删除</button>
          <button @click="cancleDelete">取消</button>
        </div>
      </div>
    </div>
    <div class="modal editModal" v-if="isShowEdit">
      <div class="wrap">
        <header>
          <span>提示</span
          ><span @click="cancleEdit"><a-icon type="close"/></span>
        </header>
        <div class="content">
          <p>编辑</p>
          <label for="">
            <span>标题</span>
            <a-input v-model.trim="resourceName" class="title" />
          </label>
          <label for="">
            <span>选择章节</span>
            <div class="select">
              <TreeSelect></TreeSelect>
            </div>
          </label>
        </div>
        <div class="btn">
          <button @click="cancleEdit">取消</button>
          <button @click="okEdit">确定</button>
        </div>
      </div>
    </div>
    <div class="modal shareModal" v-if="isShowShare">
      <div class="wrap">
        <header>
          <span>班级选择</span
          ><span @click="cancleShare"><a-icon type="close"/></span>
        </header>
        <div class="content">
          <a-button @click="handleAll">选择全部班级</a-button>
          <ul class="share-list">
            <li
              class="share-item"
              v-for="(item, index) of classes"
              :key="index"
              @click="handleShareIndex(item)"
              :class="shareList.includes(item.gradeClassid) ? 'active' : ''"
            >
              <span>{{ item.gradeClassname }}</span>
            </li>
          </ul>
        </div>
        <div class="btn">
          <button @click="cancleShare">取消</button>
          <button @click="okShare">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeSelect from './TreeSelect'
export default {
  name: '',
  components: {
    TreeSelect
  },
  props: {
    name: String,
    from: Number,
    resourceInfoId: Number
  },
  data() {
    return {
      isShowEdit: false,
      isShowDelete: false,
      isShowShare: false,
      shareList: [],
      resourceName: ''
    }
  },
  computed: {
    textbookChapter() {
      return this.$store.state.resource.textbookChapter
    },
    classes() {
      return this.$store.state.userInfo.classes
    }
  },
  watch: {},
  mounted() {
    this.resourceName = this.name
  },
  methods: {
    handleAll() {
      if (this.shareList.length >= this.classes.length) {
        this.shareList = []
        return
      }
      this.classes.forEach(item => {
        this.shareList.push(item.gradeClassid)
      })
    },
    handleShareIndex(item) {
      if (this.shareList.includes(item.gradeClassid)) {
        this.shareList = this.shareList.filter(
          value => value !== item.gradeClassid
        )
        return
      }
      this.shareList = [...this.shareList, item.gradeClassid]
    },
    handleShare() {
      this.isShowShare = true
    },
    cancleShare() {
      this.isShowShare = false
    },
    okShare() {
      if (this.shareList.length === 0) {
        this.$message.warning('请选择班级')
        return
      }

      this.$store
        .dispatch('resource/share', {
          gradeClassids: this.shareList.join(','),
          resourceInfoId: this.resourceInfoId
        })
        .then(data => {
          if (data.flag === 1) {
            this.isShowShare = false
            this.$message.success('分享成功')
          }
        })
    },
    handleEdit(n) {
      this.isShowEdit = true
      this.resourceName = n
    },
    cancleEdit() {
      this.isShowEdit = false
    },
    okEdit() {
      this.$store
        .dispatch('resource/update', {
          resourceInfoId: this.resourceInfoId,
          resourceName: this.resourceName,
          textbookChapterId: this.$store.state.resource.currentTreeCode,
          textbookChapterName: this.$store.getters[
            'resource/textbookChapterName'
          ]
        })
        .then(data => {
          if (data.flag === 1) {
            this.$message.success('编辑成功').then(() => {
              this.isShowEdit = false
              //刷新章节
              this.$store.dispatch('resource/getTextbookResourceChapter')
            })
          }
        })
    },
    handleDelete() {
      this.isShowDelete = true
    },
    cancleDelete() {
      this.isShowDelete = false
    },
    okDelete() {
      this.$store
        .dispatch('resource/delete', String(this.resourceInfoId))
        .then(data => {
          if (data.flag === 1) {
            this.isShowDelete = false
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-bar {
  width: 240px;
  height: 30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .name {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  .fun {
    width: 100px;
    text-align: right;
    img {
      width: 16px;
      height: 16px;
      margin-left: 10px;
    }
  }
}
.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    width: 543px;
    height: 380px;
    border-radius: 12px;
    background-color: #fff;
    header {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(94, 132, 173, 1);
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 46px;
      button {
        border-radius: 18px;
        border: none;
        outline: none;
        width: 160px;
        height: 36px;
      }
      button:nth-child(1) {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(16, 89, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
        font-size: 14px;
        font-weight: 400;
        color: rgba(16, 89, 255, 1);
        margin-right: 23px;
      }
      button:nth-child(2) {
        background: #1059ff;
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        border-radius: 18px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.editModal {
  .content {
    width: 430px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // align-items: center;
    p {
      margin: 25px 0 28px 0;
      text-align: center;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(61, 77, 101, 1);
    }
    label {
      width: 430px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: 15px;
      span {
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: right;
        padding-right: 10px;
      }
      .select {
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
.deleteModal {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      margin-top: 50px;
      width: 76px;
      height: 87px;
    }
    p {
      margin-top: 15px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(61, 77, 101, 1);
    }
  }
}
.shareModal {
  .content {
    width: 100%;
    height: 170px;
    button {
      margin: 10px;
    }
    .share-list {
      width: 90%;
      margin: 0 auto;
      height: 140px;
      overflow: scroll;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-top: 0px;
      .share-item {
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
        border-radius: 4px;
        margin-right: 10px;
        width: 100px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 4px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
        }
      }
      .active {
        background: rgba(16, 89, 255, 1);
        color: #fff;
      }
    }
  }
}
</style>
