<template>
  <li class="work-item">
    <header @click="showModal">
      <div class="left">
        <div class="toggle" @click.stop="handleToggle">
          <img
            src="../../../assets/img/ic_fabu_yulan_danci_zhankai@2x.png"
            alt=""
            v-if="!isToggle"
          />
          <img
            src="../../../assets/img/ic_fabu_yulan_danci_shouqi@2x.png"
            alt=""
            v-else
          />
        </div>

        <div class="name">
          {{ item.questionType === 1 ? '课文朗读' : '逐句跟读' }}
        </div>
        <span class="leftContent">{{ item.questionTitle }}</span>
      </div>
      <div class="right">
        <span>听说次数</span>
        <el-input-number
          :value="item.readNumber"
          size="mini"
          @click.native.stop
          :min="1"
          :max="10"
          :disabled="!item.active"
          @change="handleChange"
        ></el-input-number>
        <div class="add" v-if="!item.active" @click.stop="handleSelectItem">
          <img src="../../../assets/img/ic_fabu_hw_add@2x.png" alt="" /><span
            >加入作业</span
          >
        </div>
        <div class="delete" v-else @click.stop="handleCancleItem">
          <img src="../../../assets/img/ic_fabu_hw_delete@2x.png" alt="" /><span
            >移出作业</span
          >
        </div>
      </div>
    </header>
    <div class="content" v-if="isToggle">
      <div v-for="(item, index) of item.videoQuestionStemList" :key="index">
        <div v-html="item.questionStemContent"></div>
      </div>
    </div>
    <a-modal
      :title="item.questionType === 1 ? '课文朗读' : '逐句跟读'"
      width="1200px"
      :footer="null"
      :centered="true"
      v-model="visible"
      v-if="visible"
    >
      <ReadTheText v-if="item.questionType === 1" :item="item"></ReadTheText>
      <FollowRead v-if="item.questionType === 2" :item="item"></FollowRead>
    </a-modal>
  </li>
</template>

<script>
import ReadTheText from './ReadTheText'
import FollowRead from './FollowRead'
export default {
  name: '',
  components: { ReadTheText, FollowRead },
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    },
    isToggles: {
      type: Boolean
    }
  },
  data() {
    return {
      isToggle: false,
      visible: false,
      count: 1
    }
  },
  computed: {
    //当前章节下的作业list
    EnglishWorkList() {
      return this.$store.state.publish.EnglishWorkList
    },
    // 选中的听说作业list
    selectedItemList() {
      return this.$store.state.publish.selectedItemList
    }
  },
  mounted() {
    this.isToggle = this.isToggles
  },
  methods: {
    handleToggle() {
      this.isToggle = !this.isToggle
    },
    showModal() {
      this.visible = true
    },
    handleChange(val) {
      let list = [...this.EnglishWorkList]
      list.forEach((ite, index) => {
        if (ite.questionId === this.item.questionId) {
          list[index] = { ...ite, readNumber: val }
        }
      })
      this.$store.commit('publish/ENGLISHWORKLIST', list)
      this.$store.commit('publish/SELECTITEM')
    },
    handleSelectItem() {
      let list = [...this.EnglishWorkList]
      list.forEach((ite, index) => {
        if (ite.questionId === this.item.questionId) {
          list[index] = { ...ite, active: true }
        }
      })
      this.$store.commit('publish/ENGLISHWORKLIST', list)
      this.$store.commit('publish/SELECTITEM')
    },
    handleCancleItem() {
      let list = [...this.EnglishWorkList]
      list.forEach((ite, index) => {
        if (ite.questionId === this.item.questionId) {
          list[index] = { ...ite, active: false }
        }
      })
      this.$store.commit('publish/ENGLISHWORKLIST', list)
      this.$store.commit('publish/SELECTITEM')
    }
  },
  mounted() {
    //console.log(this.EnglishWorkList)
    // console.log(this.item)
  }
}
</script>

<style lang="scss" scoped>
.work-item {
  width: 100%;
  min-height: 42px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(210, 210, 210, 1);
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  header {
    min-height: 42px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    .left {
      width:65%;
      display: flex;
      align-items: center;
      .leftContent{
        width: 80%;
      }
      img {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        cursor: pointer;
      }
      .name {
        padding: 0 5px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background: rgba(232, 232, 232, 1);
        border-radius: 8px;
        color: #596878;
        font-size: 12px;
        margin-right: 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;

      span {
        margin-right: 10px;
      }
      .add {
        height: 30px;
        background: rgba(57, 158, 255, 1);
        border: 1px solid rgba(57, 158, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
        img {
          width: 10px;
          height: 10px;
          margin: 0 10px;
        }
      }
      .delete {
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(57, 158, 255, 1);
        box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
        color: #399eff;
        img {
          width: 10px;
          height: 10px;
          margin: 0 10px;
        }
      }
    }
  }
  .content {
    padding: 20px;
  }
}
</style>
