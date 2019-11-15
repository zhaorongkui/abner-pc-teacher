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
                ><i>人数</i> <i>{{ item.gradeClassQuestionnm }}人</i></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="quesytionType">
      <h3>题型</h3>
      <ul class="type-list">
        <li class="type-item">
          <div v-if="isAllWork">
            <el-checkbox v-model="noChecked" @change="handleChangeNotice"
              >单词跟读</el-checkbox
            >
          </div>
          <div v-else>
            <el-checkbox v-model="checked3" @change="handleReadChange"
              >单词跟读</el-checkbox
            >
          </div>
          <div>每个单词跟读次数</div>
          <div class="cut-down">
            <div class="wrap">
              <el-input-number
                v-model="count"
                @change="handleCountChange"
                :min="1"
                :max="10"
                size="small"
                :disabled="isAllWork"
              ></el-input-number>
            </div>

            <div class="help">
              <img
                class="mark"
                src="../../../assets/img/publish/help.png"
                alt=""
                @click="handleHelp1"
                serif
              />
              <div class="text" v-show="isHelp1">
                学生根据此处的次数跟读单词
              </div>
            </div>
          </div>
        </li>
        <li class="type-item">
          <div>
            <el-checkbox
              v-if="isAllWork"
              v-model="noChecked"
              @change="handleChangeNotice"
              >单词听写</el-checkbox
            >
            <el-checkbox v-else v-model="checked4" @change="handleWriteChange"
              >单词听写</el-checkbox
            >
            <div class="help">
              <img
                class="mark"
                src="../../../assets/img/publish/help.png"
                alt=""
                @click="handleHelp2"
              />
              <div class="text" v-show="isHelp2">
                学生根据播放的单词读音拼写单词
              </div>
            </div>
          </div>
        </li>
        <li class="type-item">
          <div>
            <el-checkbox v-model="checked5" @change="handleTranslationChange"
              >英译汉</el-checkbox
            >
            <div class="help">
              <img
                class="mark"
                src="../../../assets/img/publish/help.png"
                alt=""
                @click="handleHelp3"
              />
              <div class="text" v-show="isHelp3">
                学生根据英文单词，选择对应的中文翻译
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import localforage from 'localforage'
export default {
  name: '',
  props: ['isApproval', 'classList', 'isHomeworkQuestionType'],
  data() {
    return {
      startTime: '',
      endTime: '',
      workName: '',
      formatDate: new Date().getTime(),
      checked3: true,
      checked4: true,
      checked5: true,
      noChecked: false,
      count: 3,
      hqtnJson: [
        {
          homeworkQuestionType: 3,
          submitNum: 3
        },
        {
          homeworkQuestionType: 4,
          submitNum: 0
        },
        {
          homeworkQuestionType: 5,
          submitNum: 0
        }
      ],
      isHelp1: false,
      isHelp2: false,
      isHelp3: false
    }
  },
  computed: {
    wordList() {
      return this.$store.state.publish.wordList
    },
    isAllWork() {
      return this.$store.getters['publish/isAllWork']
    },
    isInterpret() {
      let result = false
      let list = this.wordList
      list.forEach(item => {
        item.wordPageList.forEach(page => {
          page.wordInfoList.forEach(word => {
            if (word.active && word.isWord === 2) {
              if (!result) {
                result = true
              }
            }
          })
        })
      })
      return result
    }
  },
  components: {},
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

    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        localforage.getItem('wordList').then(value => {
          if (value) {
            this.$store.commit('publish/TEXTBOOKWORD', value)
          } else {
            this.$store.dispatch('publish/textbookWord')
          }
        })
      }
    })
  },
  watch: {
    workName(val) {
      this.workName = val
      this.$emit('toParentEventVal', val)
    },
    hqtnJson(value) {
      if (value.length === 0) {
        this.$message.error('至少选择一种题目类型')
      }
    }
  },
  methods: {
    handleCountChange() {
      if (this.isAllWork) {
        console.log(this.count)
        this.count = 3
        return
      }
      if (this.checked3) {
        this.hqtnJson.forEach((item, index) => {
          if (item.homeworkQuestionType === 3) {
            this.$set(this.hqtnJson, index, {
              homeworkQuestionType: 3,
              submitNum: this.count
            })
          }
        })
        this.handleCommitHqtnJson(this.hqtnJson)
      }
    },
    handleReadChange(value) {
      if (value) {
        this.hqtnJson = [
          ...this.hqtnJson,
          {
            homeworkQuestionType: 3,
            submitNum: this.count
          }
        ]
      } else {
        this.hqtnJson = this.hqtnJson.filter(
          item => item.homeworkQuestionType !== 3
        )
      }
      console.log(this.hqtnJson)
      this.handleCommitHqtnJson(this.hqtnJson)
    },
    handleWriteChange(value) {
      if (value) {
        this.hqtnJson = [
          ...this.hqtnJson,
          {
            homeworkQuestionType: 4,
            submitNum: 0
          }
        ]
      } else {
        this.hqtnJson = this.hqtnJson.filter(
          item => item.homeworkQuestionType !== 4
        )
      }
      this.handleCommitHqtnJson(this.hqtnJson)
    },
    handleTranslationChange(value) {
      if (this.isInterpret) {
        this.$message.info('作业内容包含词组（短语）,不能取消勾选英译汉')
        this.checked5 = true
        return
      }
      if (value) {
        this.hqtnJson = [
          ...this.hqtnJson,
          {
            homeworkQuestionType: 5,
            submitNum: 0
          }
        ]
      } else {
        this.hqtnJson = this.hqtnJson.filter(
          item => item.homeworkQuestionType !== 5
        )
      }
      this.handleCommitHqtnJson(this.hqtnJson)
    },
    handleCommitHqtnJson(payload) {
      this.$store.commit('publish/HQTNJSON', payload)
    },
    handleChangeNotice() {
      this.noChecked = false
      return
    },
    handleHelp1() {
      this.isHelp1 = !this.isHelp1
    },
    handleHelp2() {
      this.isHelp2 = !this.isHelp2
    },
    handleHelp3() {
      this.isHelp3 = !this.isHelp3
    }
  }
}
</script>

<style lang="scss" scope>
@import '@/styles/variable.scss';
.publish-demand-wrap-daily {
  @include wh(1200px, 82%);
  background: #fff;
  margin: 20px auto 0;
  overflow: auto;
  background: url(../../../assets/img/publish/bg1.png) no-repeat center;
  background-size: cover;
  border-radius: 8px;
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
    }
    > div:nth-child(2) {
      height: 60px;
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
}
.quesytionType {
  margin: 20px 0 0 20px;
  h3 {
    font-size: 14px;
    color: #4e5f71;
    font-weight: 400;
  }
  .type-list {
    margin-top: 20px;
    display: flex;
    align-items: center;
    .type-item {
      width: 300px;
      height: 120px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(185, 185, 185, 1);
      box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
      border-radius: 5px;
      margin-right: 20px;
      padding: 0 20px;
      > div {
        margin-bottom: 5px;
        height: 60px;
        align-items: center;
      }
      > div:first-child {
        display: flex;
      }
    }
    .type-item:first-child {
      padding: 15px 0 0 20px;
      > div {
        height: auto;
      }
      .cut-down {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-top: -10px;
        .wrap {
          float: left;
        }
        .help {
          width: 170px;
          float: left;
        }
        img.mark {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
  }
}
.help {
  width: 185px;
  display: flex;
  align-items: center;
  img.mark {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .text {
    display: flex;
    align-items: center;
    line-height: 1;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-image: url('../../../assets/img/publish/help-k.png');
    background-size: 100% 100%;
  }
}
</style>
