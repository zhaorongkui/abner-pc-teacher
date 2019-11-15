<template>
  <div class="publish-demand-wrap-e">
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
      <div>
        <label class="hp">是否显示翻译</label>
        <img
          @click="handleIsShowTip"
          src="../../../assets/img/publish/help.png"
          alt=""
        />
        <el-switch @change="change" :width="50" v-model="fy"></el-switch>
        <span class="el-span" :class="fy ? 'hover-span' : ''">{{ text }}</span>
        <div class="tip-l" v-if="dailyShow">
          <span>作业中，可以选择是否对学生显示翻译</span>
        </div>
      </div>
    </div>
    <div>
      <label for="">时间设置</label>
      <div>
        <input type="text" id="datetimepicker-start" readonly />
        <span></span>
        <input type="text" id="datetimepicker-end" readonly />
        <!-- <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="开始时间"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @change="startChange"
        >
        </el-date-picker>
        <span></span>
        <el-date-picker
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
                ><i>人数</i> <i>{{ item.gradeClassQuestionnm }}人</i></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: '',
  components: {},
  props: ['isApproval', 'classList', 'isHomeworkQuestionType'],
  data() {
    return {
      formatDate: new Date().getTime(),
      classType: 0, //控制班级的显示状态
      startTime: '',
      endTime: '',
      workName: '',
      fy: true,
      text: '是',
      dailyShow: false
    }
  },
  computed: {},
  mounted() {
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
  },
  watch: {
    workName(val) {
      this.workName = val
      this.$emit('toParentEventVal', val)
    }
  },
  methods: {
    // changeName(val) {
    //   this.workName = val.target.value
    //   this.$emit('toParentEventVal', val)
    // },
    selectClass(t) {
      this.classType = t
    },
    // startChange(val) {
    //   this.startTime = val
    //   if (this.endTime != '') {
    //     if (this.startTime > this.endTime) {
    //       this.$message.error('结束时间不能早于开始时间')
    //     }
    //   }

    //   this.$emit('toParentEventStart', this.startTime)
    // },
    // endChange(val) {
    //   this.endTime = val
    //   if (this.startTime > this.endTime) {
    //     this.$message.error('结束时间不能早于开始时间')
    //   }
    //   this.$emit('toParentEventEnd', this.endTime)
    // },
    change(val) {
      this.$emit('toParentTranslate', val)
      if (val == true) {
        this.text = '是'
      } else {
        this.text = '否'
      }
      this.fy = val
    },
    handleIsShowTip() {
      this.dailyShow = !this.dailyShow
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.publish-demand-wrap-e {
  @include wh(1200px, 700px);
  background: #fff;
  margin: 10px auto 0;
  overflow: auto;
  background: url(../../../assets/img/publish/bg1.png) no-repeat center;
  background-size: cover;
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
    @include wh(50%, 60px);
    margin: 20px 0 0 20px;
    @include fj();
    > div {
      @include wh(130px, 60px);
      @include fj();
      flex-flow: column;
      position: relative;
      img {
        @include wh(19px, 19px);
        position: absolute;
        right: 22px;
        top: 0;
      }
      span.el-span {
        position: absolute;
        right: 57px;
        top: 40px;
        @include sc(14px, #999);
      }
      span.hover-span {
        color: #1059ff;
      }
      input.work-name {
        @include wh(400px, 32px);
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
    }
  }
  > div:nth-child(2) {
    @include fj();
    flex-flow: column;
    @include wh(60%, 80px);
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column;
        @include wh(98px, 55%);
        font-size: 14px;
        margin-right: 80px;
        span {
          @include wh(100%, auto);
          display: flex;
          justify-content: space-between;
          align-items: center;
          i {
            font-style: normal;
          }
          i:nth-of-type(2) {
            margin-right: 20px;
          }
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
}

.tip-l {
  width: 250px;
  height: 60px;
  position: absolute;
  left: 110px;
  top: -20px;
  z-index: 9999;
  background-image: url('../../../assets/img/bg_fabu_tips.png');
  background-size: 100% 100%;
  line-height: 61px;
  padding-left: 20px;
  span {
    @include sc(12px, #aaa);
  }
}
</style>
