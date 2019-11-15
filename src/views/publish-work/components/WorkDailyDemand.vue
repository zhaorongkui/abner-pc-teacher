<template>
  <div class="publish-demand-wrap-daily">
    <div>
      <div>
        <label for="">作业名称</label>
        <input
          type="text"
          class="work-name"
          v-model="workName"
          maxlength="16"
          :placeholder="formatDate | formatDates"
        />
      </div>
      <div v-if="isHomeworkQuestionType == 1 || isHomeworkQuestionTypes == 1">
        <label class="hp">互批</label>
        <img
          src="../../../assets/img/publish/help.png"
          alt=""
          @mouseenter="dailyShowtip"
          @mouseleave="dailyShowtip1"
        />
        <el-switch @change="changeHp" v-model="isApprovalAll"></el-switch>
        <span class="el-span" :class="isApprovalAll ? 'hover-span' : ''">{{
          text
        }}</span>
        <div class="tip" v-if="dailyShow">
          <img src="../../../assets/img/publish/tips.png" alt="" />
          <span>作业中包含主观题时，可以选择学生互批</span>
        </div>
      </div>
      <div v-else>
        <label class="hp">互批</label>
        <img
          src="../../../assets/img/publish/help.png"
          alt=""
          @mouseenter="dailyShowtip"
          @mouseleave="dailyShowtip1"
        />
        <el-switch @change="changeHp" v-model="isApprovalAll"></el-switch>
        <p style="width:500px"></p>
        <span class="el-span" :class="isApprovalAll ? 'hover-span' : ''">{{
          text
        }}</span>
        <div class="tip" v-if="dailyShow">
          <img src="../../../assets/img/publish/tips.png" alt="" />
          <span>作业中包含主观题时，可以选择学生互批</span>
        </div>
      </div>
    </div>
    <div>
      <label for="">时间设置</label>
      <div>
        <!-- <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="开始时间"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @change="startChange"
        >
        </el-date-picker> -->
        <input type="text" id="datetimepicker-start" readonly />
        <span></span>
        <input type="text" id="datetimepicker-end" readonly />
        <!-- <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="结束时间"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @change="endChange"
        >
        </el-date-picker> -->
      </div>
    </div>
    <div class="publish-class">
      <h5>
        班级
      </h5>
      <div>
        <ul>
          <li class="hover-li" v-for="(item, index) in classList" :key="index">
            <a href="javascript:;" class="chover-a">
              <img src="../../../assets/img/publish/ban1.png" alt="" />
            </a>
            <p>
              <span>
                {{ item.grade | grade }} &nbsp;{{ item.gradeClassname }}
              </span>
              <span
                ><i>人数</i>
                <i v-if="type == 1">{{ item.gradeClassQuestionnm }}人</i>
                <i v-else>{{ item.gradeClassQuestionnum }}人</i>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="tips" v-if="type == 2">
      提示:&nbsp;错题作业为个性化作业，只有做错的学生才会收到此份作业。
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: '',
  props: [],
  data() {
    return {
      //startTime: '',
      endTime: '',
      workName: '',
      text: '否',
      formatDate: new Date().getTime(),
      dailyShow: false,
      isHomeworkQuestionType: '',
      isHomeworkQuestionTypes: '',
      isApproval: false,
      isApprovalAll: false,
      isApprovals: false,
      classList: null,
      type: '',
      systime: ''
    }
  },
  computed: {
    //日常作业加入题量
    addWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.workAllList || []
      },
      set: function(v) {
        this.$store.commit('publish/WORKALLLIST', v)
      }
    },
    //错题作业加入题量
    errorAddWorkbookPageQuestionnumAllList: {
      get: function() {
        return this.$store.state.publish.errorWorkAllList || []
      },
      set: function(v) {
        this.$store.commit('publish/ERRORWORKALLLIST', v)
      }
    }
  },
  components: {},
  created() {},
  mounted() {
    for (var i = 0; i < this.addWorkbookPageQuestionnumAllList.length; i++) {
      if (this.addWorkbookPageQuestionnumAllList[i].questionProperty === 1) {
        if (this.addWorkbookPageQuestionnumAllList[i].questionTypeCode == 8) {
          this.isApprovals = true
          this.isHomeworkQuestionTypes = 1
        } else {
          this.isApproval = true
          this.isHomeworkQuestionType = 1
        }
      }
    }

    if (this.errorAddWorkbookPageQuestionnumAllList != undefined) {
      for (
        let i = 0;
        i < this.errorAddWorkbookPageQuestionnumAllList.length;
        i++
      ) {
        if (
          this.errorAddWorkbookPageQuestionnumAllList[i].questionProperty === 1
        ) {
          this.isApproval = true
          this.isHomeworkQuestionType = 1
        }
      }
    }
    if (this.isApproval == true || this.isApprovals == true) {
      this.isApprovalAll = true
      this.text = '是'
    }
    this.$emit('toParentEventHp', this.isApproval)
    this.$emit('toParentEventHps', this.isApprovals)

    this.$http.get('/api/teacher/system/time').then(res => {
      this.systime = res.data.infos
      var self = this
      //时间插件
      var startTime = new Date(this.systime)
      var endTime = new Date(this.systime)
      startTime.setMinutes(startTime.getMinutes() + 10)
      if (startTime.getMinutes() > 30) {
        startTime.setHours(startTime.getHours() + 1)
        startTime.setMinutes(0)
      } else {
        startTime.setMinutes(30)
      }
      if (startTime.getHours() >= 21) {
        endTime.setDate(startTime.getDate() + 1)
      }
      endTime.setHours(23)
      endTime.setMinutes(30)
      var startTime1 = new Date(this.systime)
      startTime1.setMinutes(startTime1.getMinutes() + 10)
      if (startTime1.getMinutes() > 30) {
        startTime1.setHours(startTime1.getHours() + 1)
        startTime1.setMinutes(0)
      } else {
        startTime1.setMinutes(30)
      }
      var b = true
      $.datetimepicker.setLocale('zh')
      $('#datetimepicker-start')
        .datetimepicker({
          scrollMonth: false,
          value: startTime,
          lang: 'zh',
          step: 30,
          format: 'Y-m-d H:i',
          startDate: startTime,
          minDate: startTime1,
          onClose: function() {
            return true
          }
        })
        .on('change', function() {
          console.log(startTime)
          var start = new Date($('#datetimepicker-start').val())
          start.setSeconds(0)
          start.setMilliseconds(0)
          var end = new Date($('#datetimepicker-end').val())
          end.setSeconds(0)
          end.setMilliseconds(0)
          var chooseDate = new Date(self.systime)
          chooseDate.setSeconds(0)
          chooseDate.setMilliseconds(0)
          chooseDate.setMinutes(chooseDate.getMinutes() + 10)
          if (chooseDate.getMinutes() > 30) {
            chooseDate.setHours(chooseDate.getHours() + 1)
            chooseDate.setMinutes(0)
          } else {
            chooseDate.setMinutes(30)
          }
          if (start.getTime() < chooseDate.getTime()) {
            //self.$message.error('所选时间不能早于当前时间')
          } else if (start.getTime() == end.getTime()) {
            //self.$message.error('所选时间不能等于结束时间')
          } else {
            var end = new Date($('#datetimepicker-start').val())
            if (end.getHours() >= 21) {
              end.setDate(end.getDate() + 1)
            }
            end.setHours(23)
            end.setMinutes(30)
            $('#datetimepicker-end').datetimepicker({
              value: end,
              startDate: end,
              minDate: start
            })
          }
          self.$emit('toParentEventStart', $('#datetimepicker-start').val())
          self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
        })
      $('#datetimepicker-end')
        .datetimepicker({
          scrollMonth: false,
          value: endTime,
          lang: 'zh',
          step: 30,
          format: 'Y-m-d H:i',
          startDate: endTime,
          minDate: startTime1,
          onClose: function() {
            return true
          }
        })
        .on('change', function() {
          var end = new Date($('#datetimepicker-end').val())
          end.setSeconds(0)
          end.setMilliseconds(0)
          var start = new Date($('#datetimepicker-start').val())
          start.setSeconds(0)
          start.setMilliseconds(0)
          if (end.getTime() < start.getTime()) {
            //self.$message.error('所选时间不能早于开始时间')
          } else if (end.getTime() == start.getTime()) {
            //self.$message.error('所选时间不能等于开始时间')
          } else {
            self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
          }
          self.$emit('toParentEventStart', $('#datetimepicker-start').val())
          self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
        })
      self.$emit('toParentEventStart', $('#datetimepicker-start').val())
      self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
    })

    this.type = localStorage.getItem('type')

    if (
      JSON.parse(localStorage.getItem('errorClasslist')) != null &&
      JSON.parse(localStorage.getItem('errorClasslist')).length != 0
    ) {
      this.classList = JSON.parse(localStorage.getItem('errorClasslist'))
    } else {
      this.classList = JSON.parse(localStorage.getItem('selectClassList'))
    }
  },
  methods: {
    dailyShowtip() {
      this.dailyShow = true
    },
    dailyShowtip1() {
      this.dailyShow = false
    },

    changeHp(val) {
      if (val == true) {
        this.text = '是'
      } else {
        this.text = '否'
      }
      if (
        this.isHomeworkQuestionType == 1 &&
        this.isHomeworkQuestionTypes == 1
      ) {
        this.isApproval = val
        this.isApprovals = val
      }
      if (
        this.isHomeworkQuestionType == 1 &&
        this.isHomeworkQuestionTypes != 1
      ) {
        this.isApproval = val
      }
      if (
        this.isHomeworkQuestionType != 1 &&
        this.isHomeworkQuestionTypes == 1
      ) {
        this.isApprovals = val
      }
      this.$emit('toParentEventHp', this.isApproval)
      this.$emit('toParentEventHps', this.isApprovals)
    }
  },
  watch: {
    workName(val) {
      this.workName = val
      this.$emit('toParentEventVal', val)
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.publish-demand-wrap-daily {
  background: #fff;
  margin: 20px auto 0;
  padding-top: 20px;
  overflow: unset;
  background: url(../../../assets/img/publish/bg1.png) no-repeat center;
  background-size: cover;
  border-radius: 8px;
  position: relative;
  label {
    @include sc(14px, #4e5f71);
  }
  #datetimepicker-start,
  #datetimepicker-end {
    @include wh(250px, 40px);
    border: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 0 0 10px;
    font-size: 14px;
    outline: none;
  }
  > div:nth-child(1) {
    @include wh(50%, 70px);
    margin: 20px 0 0 20px;
    @include fj();
    > div {
      @include wh(130px, 70px);
      @include fj();
      flex-flow: column;
      position: relative;
      img {
        @include wh(19px, 19px);
        position: absolute;
        right: 71px;
        top: 0;
      }
      span.el-span {
        position: absolute;
        right: 70px;
        top: 40px;
        @include sc(14px, #999);
      }
      span.hover-span {
        color: #1059ff;
      }
      input.work-name {
        @include wh(400px, 40px);
        @include sc(14px, #333);
        border: 0;
        border: 1px solid rgba(202, 211, 223, 1);
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        outline: none;
        padding-left: 10px;
      }
      .swich {
        @include wh(80px, 30px);
        border: 1px solid rgba(202, 211, 223, 1);
        border-radius: 16px;
        @include fj();
        align-items: center;
        padding: 0 5px;
        position: relative;
        span:nth-child(1) {
          @include wh(14px, #aaa);
        }
        span:nth-child(2) {
          @include wh(28px, 28px);
          background: rgba(57, 158, 255, 1);
          border-radius: 14px;
          position: absolute;
          left: 1px;
          top: 0;
        }
        span:nth-child(3) {
          @include wh(14px, #aaa);
        }
      }
      .tip {
        position: absolute;
        right: -109px;
        top: -29px;
        z-index: 9999;
        img {
          @include wh(250px, 38px);
          transform: rotate(180deg);
          position: absolute;
          right: -66px;
          top: 15px;
        }
        span {
          @include sc(12px, #aaa);
          position: absolute;
          right: -54px;
          top: 30px;
          width: 220px;
        }
      }
    }
    > div:nth-child(2) {
      height: 60px;
      position: relative;
      p {
        @include wh(40px, 20px);
        position: absolute;
        left: 1px;
        top: 40px;
        z-index: 9999;
      }
    }
  }
  > div:nth-child(2) {
    @include fj();
    flex-flow: column;
    @include wh(65%, 80px);
    margin: 20px 0 0 20px;
    > div {
      @include wh(65%, 60px);
      margin-top: 10px;
      @include fj();
      align-items: center;
      > span {
        margin: 0 5px;
        @include wh(10px, 1px);
        background: rgba(132, 147, 168, 1);
      }
    }
  }
  .publish-class {
    @include wh(90%, auto);
    margin: 41px 0 0 20px;
    overflow: auto;
    h5 {
      @include sc(14px, #4e5f71);
      font-weight: 400;
    }
    div,
    ul {
      @include wh(100%, auto);
    }
    ul li {
      @include wh(290px, 90px);
      float: left;
      margin: 20px 22px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ebebeb;
      cursor: pointer;
      border-radius: 8px;
      a {
        display: block;
        @include wh(60px, 60px);
        background: #ebebeb;
        display: flex;
        justify-content: center;
        align-items: center;
        #{$attr}-radius: 50%;
        margin-left: 20px;
        img {
          @include wh(33px, 23px);
        }
      }
      a.hover-a {
        background: #fff;
      }
      p {
        @include fj(space-between);
        align-items: center;
        flex-flow: column;
        @include wh(115px, 55%);
        font-size: 14px;
        margin-right: 78px;
        span {
          @include wh(100%, 20px);

          i {
            font-style: normal;
          }
        }
        span:nth-child(1) {
          @include wh(115px, 20px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        span:nth-child(2) {
          @include fj(space-around);
          align-items: center;
          @include wh(80%, 20px);
        }
      }
    }
    li.hover-li {
      overflow: hidden;
      background: url(../../../assets/img/publish/bg-banji.png) no-repeat center;
      background-size: cover;
      color: #fff;
    }
  }
  .tips {
    @include sc(16px, #000);
    margin-top: 40px;
    margin-left: 25px;
  }
}
</style>
