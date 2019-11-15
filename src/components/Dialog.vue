<template>
  <div class="student-view-wrap">
    <div class="student-view">
      <div>
        <span
          >未完成的
          {{
            unfinishStudents != undefined ? unfinishStudents.length : 0
          }}人</span
        >
        <img src="../assets/img/publish/close.png" alt="" @click="closes" />
      </div>
      <div>
        <span v-for="(item, index) in unfinishStudents" :key="index">{{
          item.studentName
        }}</span>
      </div>
      <div @click="remind" class="normal-btn" v-if="remindId == 1">
        提醒他们做作业
      </div>
      <div class="active-btn" v-else>
        提醒他们做作业
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['dataItem'],
  data() {
    return {
      remindId: 1,
      studentIdsList: [],
      unfinishStudents: []
    }
  },
  computed: {},
  components: {},
  mounted() {
    this.unfinishStudent()
  },
  methods: {
    closes() {
      this.$emit('toParentsEvent', false)
    },
    //一键提醒
    remind() {
      this.$http
        .post('/api/teacher/homework/remind', {
          homeworkClassId: this.dataItem.homeworkClassId,
          studentIds:
            this.studentIdsList != undefined
              ? this.studentIdsList.join(',')
              : '',
          teacherId: this.$store.state.userInfo.teacherId
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.remindId = 0
            this.showStudentViewWrap = false
            this.$message.success('已经提醒学生去完成作业')
          }
        })
    },
    unfinishStudent() {
      this.$http
        .get('/api/teacher/homework/unfinish/students', {
          params: {
            homeworkClassId: this.dataItem.homeworkClassId
          }
        })
        .then(res => {
          this.remindId = res.data.infos.remind
          this.unfinishStudents = res.data.infos.studentList
          this.unfinishStudents.forEach(item => {
            this.studentIdsList.push(item.studentInfoId)
          })
        })
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.student-view-wrap {
  @include wh(100%, 100%);
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  @include fj(center);
  align-items: center;
  .student-view {
    @include wh(500px, auto);
    background: #fff;
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.29);
    border-radius: 4px 4px 4px 4px;
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    overflow: hidden;
    > div:nth-child(1) {
      @include wh(100%, 40px);
      @include fj();
      align-items: center;
      padding: 0 15px;
      border: 1px solid rgba(237, 237, 237, 1);
      flex: 0 0 40px;
      span {
        @include sc(16px, #5e84ad);
      }
      img {
        @include wh(14px, 14px);
      }
    }
    > div:nth-child(2) {
      @include wh(90%, auto);
      min-height: 100px;
      max-height: 220px;
      margin: 10px auto 0;
      overflow: scroll;
      span {
        float: left;
        height: 30px;
        padding: 0px 7px;
        background: #f7fafe;
        border-radius: 8px;
        margin: 10px 10px 0 0;
        @include fj(center);
        align-items: center;
        @include sc(14px, #aaa);
      }
    }
    > div.normal-btn {
      @include wh(159px, 36px);
      background: #1059ff;
      box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
      border-radius: 18px;
      @include fj(center);
      align-items: center;
      @include sc(14px, #fefeff);
      margin: 10px auto 0;
      cursor: pointer;
    }
    > div.active-btn {
      @include wh(159px, 36px);
      background: #ddd;
      border-radius: 18px;
      @include fj(center);
      align-items: center;
      @include sc(14px, #fefeff);
      margin: 10px auto 0;
      cursor: pointer;
    }
  }
}
</style>
