<template>
  <div class="task">
    <header>
      <i class="date">{{ +new Date() | formatDate('yyyy年MM月dd日') }}</i>
      <span
        >待处理-<span class="count">{{ count }}</span
        >个</span
      >
    </header>
    <template v-if="taskList.length > 0">
      <TaskSwiper :list="taskList"></TaskSwiper>
    </template>
    <template v-else>
      <div class="no-task">
        <img src="../../../assets/img/empty_homepage_card@2x.png" alt="" />
        <p>做得好，任务全部完成了</p>
      </div>
    </template>
  </div>
</template>

<script>
import TaskSwiper from './TaskSwiper'
export default {
  name: 'task',
  components: { TaskSwiper },
  data() {
    return {}
  },
  computed: {
    taskList() {
      return this.$store.state.home.taskList
    },
    count() {
      return this.taskList.length
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.task {
  scrollbar-width: none;
  width: 100%;
  // flex: auto;
  display: flex;
  flex-direction: column;
  flex: auto;
  margin-top: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 4px;
  padding-bottom: 60px;
  header {
    height: 60px;
    text-align: center;
    position: relative;
    span {
      line-height: 60px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(78, 95, 113, 1);
    }
    .count {
      font-size: 20px;
    }
    .date {
      position: absolute;
      top: 22px;
      left: 10px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(170, 170, 170, 1);
    }
  }
  .no-task {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #999;
    align-items: center;
    justify-content: center;
    img {
      width: 258px;
      height: 227px;
      margin-bottom: 10px;
    }
  }
}
</style>
