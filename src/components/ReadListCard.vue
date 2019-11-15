<style scoped>
.read-list-card {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  width: 96%;
  margin: 15px auto 0;
}

.card-body {
  display: flex;
  padding: 21px 26px;
}
.body-main {
  cursor: pointer;
  flex: 1;
  max-height: 55px;
  overflow: hidden;
}
.add-work {
  cursor: pointer;
  width: 143px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #dddddd;
}
.work-action {
  height: 30px;
  display: flex;
  background: rgba(57, 158, 255, 1);
  border: 1px solid rgba(57, 158, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 15px;
  padding: 0 6px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.work-action span {
  margin-left: 3px;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 13px 17px;
  border-top: 1px solid #dddddd;
}

.add-favorites {
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
}
.already-joined {
  color: #fda157;
}
.card-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.work-action-remove {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(57, 158, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(16, 89, 255, 0.27);
  border-radius: 15px;
  color: #399eff;
}
</style>
<template>
  <div class="read-list-card">
    <div class="card-box">
      <div class="card-body">
        <div
          class="body-main"
          @click="lookOriginal"
          v-html="data.questionStem"
        ></div>
      </div>
      <div class="card-footer">
        <tag-list color="#757575" :data="info"></tag-list>
        <span class="add-favorites" @click="addFavorites"
          ><a-icon
            type="heart"
            theme="filled"
            :class="data.teacherQuestionCollectonId ? 'already-joined' : ''"
            style="marginRight: 10px"
          />{{
            (data.teacherQuestionCollectonId ? '取消' : '加入') + '收藏'
          }}</span
        >
      </div>
    </div>
    <div class="add-work">
      <div
        class="work-action"
        :class="isSelected ? 'work-action-remove' : ''"
        @click="addWorkList"
      >
        <a-icon :type="isSelected ? 'close' : 'plus'" /><span>{{
          isSelected ? '移出作业' : '加入作业'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// 单个题目卡片
import TagList from './TagList'
export default {
  name: 'ReadListCard',
  components: { TagList },
  props: {
    datas: {
      type: Object,
      required: true
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    },
    temporary: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      modalTitleTags: [
        {
          label: '阅读内容维度',
          value: '语言累积|整体感知|表达运用'
        },
        {
          label: '子提数',
          value: '1题'
        },
        {
          label: '阅读量',
          value: '346字'
        }
      ]
    }
  },
  computed: {
    data() {
      return this.datas
    },
    isSelected() {
      if (this.temporary.includes(this.data.questionId)) {
        return false
      }
      return this.selected.includes(this.data.questionId)
    },
    info() {
      return [
        {
          label: '分类',
          value: this.data.questionTextTypeName
        },
        {
          label: '相关主题',
          value: this.data.questionTitleName
        },
        {
          label: '子题数',
          value: this.data.questionChildNum
        },
        {
          label: '阅读量',
          value: this.data.questionTextNum
        }
      ]
    }
  },
  mounted() {},
  methods: {
    addWorkList() {
      this.$emit('on-add-work', this.data.questionId)
    },
    lookOriginal() {
      this.$emit('look', this.data)
    },
    addFavorites() {
      let data = {
        grade: this.data.grade,
        questionId: this.data.questionId,
        questionInfoId: this.data.questionInfoId,
        questionSourceId: this.data.questionSourceId,
        questionSourceName: this.data.questionSourceName,
        questionUuid: this.data.questionUuid,
        questionTypeCode: this.data.questionTypeCode,
        teacherQuestionCollectonId: this.data.teacherQuestionCollectonId
      }
      this.$emit('on-add-favorites', data)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

