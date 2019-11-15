<template>
  <div class="work-toolbar">
    <div class="tabs">
      <div class="workType">
        <label for="">
          作业类型
        </label>
        <button
          :class="homeworkType === '1,2,3,4,5,6' ? 'active' : ''"
          @click="handleHomeworkTypeTab('1,2,3,4,5,6')"
        >
          全部
        </button>
        <button
          :class="homeworkType === '1' ? 'active' : ''"
          @click="handleHomeworkTypeTab('1')"
        >
          日常作业
        </button>
        <button
          :class="homeworkType === '2' ? 'active' : ''"
          @click="handleHomeworkTypeTab('2')"
        >
          错题作业
        </button>
        <button
          :class="homeworkType === '5' ? 'active' : ''"
          @click="handleHomeworkTypeTab('5')"
          v-if="subjectAbbreviation === 'yuwen'"
        >
          阅读训练
        </button>
        <button
          :class="homeworkType === '6' ? 'active' : ''"
          @click="handleHomeworkTypeTab('6')"
          v-if="subjectAbbreviation === 'yuwen'"
        >
          作文任务
        </button>
        <button
          :class="homeworkType === '3' ? 'active' : ''"
          @click="handleHomeworkTypeTab('3')"
          v-if="subjectAbbreviation === 'yingyu'"
        >
          英语听说
        </button>
        <button
          :class="homeworkType === '4' ? 'active' : ''"
          @click="handleHomeworkTypeTab('4')"
          v-if="subjectAbbreviation === 'yingyu'"
        >
          单词作业
        </button>
      </div>
      <div
        class="work-correction"
        v-if="
          homeworkType !== '3' && homeworkType !== '4' && homeworkType !== '6'
        "
      >
        <label for="">
          互批作业
        </label>
        <button
          :class="isHp === null ? 'active' : ''"
          @click="hanldeIsHpType(null)"
        >
          全部
        </button>
        <button :class="isHp === 1 ? 'active' : ''" @click="hanldeIsHpType(1)">
          互批
        </button>
        <button :class="isHp === 2 ? 'active' : ''" @click="hanldeIsHpType(2)">
          非互批
        </button>
      </div>
    </div>
    <div class="picker">
      <label for="">开始日期</label>
      <a-date-picker @change="onChange" placeholder="全部日期" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'work-toolbar',
  components: {},
  data() {
    return {}
  },
  computed: {
    homeworkType() {
      return this.$store.state.work.homeworkType
    },
    isHp() {
      return this.$store.state.work.isHp
    },
    subjectAbbreviation() {
      return this.$store.getters.subjectAbbreviation
    }
  },
  methods: {
    handleHomeworkTypeTab(value) {
      if (document.querySelector('.content .list')) {
        document.querySelector('.content .list').scrollTop = 0
      }
      this.$store.commit('work/UPDATESTARTTIME', null)
      this.$store.commit('work/UPDATEISHPTYPE', null)

      if (value === '6' || value === '3' || value === '4') {
        this.$store.commit('work/UPDATEISHPTYPE', null)
      }
      this.$store.commit('work/UPDATEHOMEWORKTYPE', value)
      this.$store.commit('work/UPDATECURRENTPAGE', 1)
      this.$store.dispatch('work/homeworkList')
    },
    hanldeIsHpType(value) {
      if (document.querySelector('.content .list')) {
        document.querySelector('.content .list').scrollTop = 0
      }
      this.$store.commit('work/UPDATEISHPTYPE', value)
      this.$store.commit('work/UPDATECURRENTPAGE', 1)
      this.$store.dispatch('work/homeworkList')
    },
    onChange(value, dateString) {
      if (document.querySelector('.content .list')) {
        document.querySelector('.content .list').scrollTop = 0
      }
      this.$store.commit('work/UPDATESTARTTIME', dateString)
      this.$store.commit('work/UPDATECURRENTPAGE', 1)
      this.$store.dispatch('work/homeworkList')
    }
  }
}
</script>

<style lang="scss" scoped>
.work-toolbar {
  height: 134px;
  flex: 0 0 134px;
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  .tabs {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      label {
        margin-right: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(169, 169, 169, 1);
      }
      button {
        padding: 5px 10px;
        height: 28px;
        text-align: center;
        background: rgba(235, 235, 235, 1);
        border-radius: 14px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(78, 95, 113, 1);
        margin-left: 10px;
        outline: none;
        cursor: pointer;
      }
      button.active {
        color: #1059ff;
        background: #e5f0fe;
      }
    }
  }
  .picker {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    label {
      margin-right: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(169, 169, 169, 1);
    }
  }
}
</style>
