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
          @change="changeName"
        />
      </div>
      <div v-if="isHomeworkQuestionType == 1">
        <label class="hp">互批</label>
        <img
          src="../../../assets/img/publish/help.png"
          alt=""
          @mouseenter="dailyShowtip"
          @mouseleave="dailyShowtip1"
        />
        <el-switch @change="changeHp" v-model="isApproval"></el-switch>
        <span class="el-span" :class="isApproval ? 'hover-span' : ''">{{
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
        <el-switch @change="changeHp" v-model="isApproval"></el-switch>
        <p></p>
        <span class="el-span" :class="isApproval ? 'hover-span' : ''">{{
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
        <input type="text" id="datetimepicker-start" readonly />
        <span></span>
        <input type="text" id="datetimepicker-end" readonly />
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
              <span> {{ item.grade | grade }} &nbsp;({{ item.gradeClassname }}) </span>
              <span
                ><i>人数</i> <i>{{ item.gradeClassQuestionnm }}人</i></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="selected-box" @click="lockWorkList">
      <span class="selected-work-number">{{workList.length}}</span>
      <span class="selected-text">已选题量</span>
    </div>
    <read-work-list-modal ref='readWorkListModal'></read-work-list-modal>
  </div>
</template>

<script>
import ReadWorkListModal from '../../../components/ReadWorkListModal'
export default {
  name: '',
  props: ['classList'],
  data() {
    return {
      startTime: '',
      endTime: '',
      dailyShow: false,
      workName: '',
      text: '是',
      formatDate: new Date().getTime(),
      isHomeworkQuestionType: '',
      isApproval: false,
    }
  },
  computed: {
    workList () {
      return this.$store.state.work.readWorkList
    }
  },
  components: {ReadWorkListModal},
  watch: {
    workList () {
      if (this.workList && this.workList.length) {
        this.watchWork()
      }
    }
  },
  mounted() {
    this.watchWork()
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
    // this.watchWork()
    // var self = this
    // //时间插件
    // var startTime = new Date()
    // var endTime = new Date()
    // startTime.setMinutes(startTime.getMinutes() + 10)
    // if (startTime.getMinutes() > 30) {
    //   startTime.setHours(startTime.getHours() + 1)
    //   startTime.setMinutes(0)
    // } else {
    //   startTime.setMinutes(30)
    // }
    // if (startTime.getHours() >= 21) {
    //   endTime.setDate(startTime.getDate() + 1)
    // }
    // endTime.setHours(23)
    // endTime.setMinutes(30)
    // var b = true
    // $.datetimepicker.setLocale('zh')
    // $('#datetimepicker-start')
    //   .datetimepicker({
    //     scrollMonth: false,
    //     value: startTime,
    //     lang: 'zh',
    //     step: 30,
    //     format: 'Y-m-d H:i',
    //     startDate: startTime,
    //     onClose: function() {
    //       return true
    //     }
    //   })
    //   .on('change', function() {
    //     var start = new Date($('#datetimepicker-start').val())
    //     start.setSeconds(0)
    //     start.setMilliseconds(0)
    //     var end = new Date($('#datetimepicker-end').val())
    //     end.setSeconds(0)
    //     end.setMilliseconds(0)
    //     var chooseDate = new Date()
    //     chooseDate.setSeconds(0)
    //     chooseDate.setMilliseconds(0)
    //     chooseDate.setMinutes(chooseDate.getMinutes() + 10)
    //     if (chooseDate.getMinutes() > 30) {
    //       chooseDate.setHours(chooseDate.getHours() + 1)
    //       chooseDate.setMinutes(0)
    //     } else {
    //       chooseDate.setMinutes(30)
    //     }
    //     if (start.getTime() < chooseDate.getTime()) {
    //       self.$message.error('所选时间不能早于当前时间')
    //       // $('#datetimepicker-end').prop('disabled', true)
    //       b = false
    //       return false
    //     } else if (end.getTime() >= start.getTime()) {
    //       //$('#datetimepicker-start').prop('disabled', true)
    //       // self.$message.error('所选时间不能等于结束时间')
    //       // b = false
    //       //return false
    //       //} else {
    //       // b = true
    //       //$('#datetimepicker-end').prop('disabled', false)
    //       var end = new Date($('#datetimepicker-start').val())
    //       if (end.getHours() >= 21) {
    //         end.setDate(end.getDate() + 1)
    //       }
    //       end.setHours(23)
    //       end.setMinutes(30)
    //       $('#datetimepicker-end').datetimepicker({
    //         value: end,
    //         startDate: end
    //       })
    //       self.$emit('toParentEventStart', $('#datetimepicker-start').val())
    //       self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
    //     }
    //   })
    // $('#datetimepicker-end')
    //   .datetimepicker({
    //     scrollMonth: false,
    //     value: endTime,
    //     lang: 'zh',
    //     step: 30,
    //     format: 'Y-m-d H:i',
    //     startDate: endTime,
    //     onClose: function() {
    //       return b
    //     }
    //   })
    //   .on('change', function() {
    //     var end = new Date($('#datetimepicker-end').val())
    //     end.setSeconds(0)
    //     end.setMilliseconds(0)
    //     var start = new Date($('#datetimepicker-start').val())
    //     start.setSeconds(0)
    //     start.setMilliseconds(0)
    //     if (end.getTime() < start.getTime()) {
    //       //$('#datetimepicker-start').prop('disabled', true)
    //       self.$message.error('所选时间不能早于开始时间')
    //       b = false
    //       return false
    //     } else if (end.getTime() == start.getTime()) {
    //       // $('#datetimepicker-start').prop('disabled', true)
    //       self.$message.error('所选时间不能等于开始时间')
    //       b = false
    //       return false
    //     } else {
    //       b = true
    //       //$('#datetimepicker-start').prop('disabled', false)
    //       $('#datetimepicker-end').val()
    //       self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
    //     }
    //   })
    // self.$emit('toParentEventStart', $('#datetimepicker-start').val())
    // self.$emit('toParentEventEnd', $('#datetimepicker-end').val())
    // console.log(this.isApproval, this.classList, this.isHomeworkQuestionType)
  },
  methods: {
    watchWork() {
      this.isApproval = false
      this.isHomeworkQuestionType = ''
      for (var i = 0; i < this.workList.length; i++) {
        if (this.workList[i].questionProperty === 1) {
          this.isApproval = true
          this.isHomeworkQuestionType = 1
          break
        }
      }
    },
    dailyShowtip() {
      this.dailyShow = true
    },
    dailyShowtip1() {
      this.dailyShow = false
    },
    lockWorkList () {
      if (this.workList.length) {
        this.$refs['readWorkListModal'].visible = true;
      } else {
        this.$message.warning('请先选择题目加入作业')
      }
    },
    // startChange(val) {
    //   this.startTime = val
    //   if (this.endTime != '') {
    //     if (this.startTime > this.endTime) {
    //       this.$message.error('结束时间不能早于开始时间')
    //       this.startTime = ''
    //       return false
    //     }
    //   }

    //   this.$emit('toParentEventStart', this.startTime)
    // },
    // endChange(val) {
    //   this.endTime = val
    //   if (this.startTime > this.endTime) {
    //     this.$message.error('结束时间不能早于开始时间')
    //       this.endTime = ''
    //       return false
    //   }
    //   this.$emit('toParentEventEnd', this.endTime)
    // },
    changeName(val) {
      let inputVal = val.target.value
      this.workName = inputVal
      this.$emit('toParentEventVal', inputVal)
    },
    changeHp(val) {
      if (val == true) {
        this.text = '是'
      } else {
        this.text = '否'
      }
      this.isApproval = val
      this.$emit('toParentEventHp', this.isApproval)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.publish-demand-wrap-daily {
  @include wh(1200px, 82%);
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
    @include wh(60%, 80px);
    margin: 20px 0 0 20px;
    > div {
      @include wh(65%, 60px);
      margin-top: 10px;
      @include fj();
      align-items: center;
      > span {
        @include wh(10px, 2px);
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
.selected-box {
  cursor: pointer;
  top: 50%;
  right: 10px;
  min-width: 100px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background:#FDFBEE;
  border:1px solid rgba(253, 220, 148, 1);
  border-radius:12px;
  padding: 7px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(240,113,36,1);
}
.selected-work-number {
  font-size: 30px;
  line-height: 1.2;
}
.selected-text {
  font-size: 14px;
}
</style>
