<template>
  <li class="work-item">
    <div class="homework">
      <div>
        <h3>
          <span class="grade">{{ item.gradeClassname }}</span
          >{{ item.homeworkName }}
        </h3>
      </div>
      <div class="workType">
        <button v-if="item.homeworkType === 1">日常作业</button>
        <button v-if="item.homeworkType === 2">错题作业</button>
        <button v-if="item.homeworkType === 3">英语听说</button>
        <button v-if="item.homeworkType === 4">单词作业</button>
        <button v-if="item.homeworkType === 5">阅读训练</button>
        <button v-if="item.homeworkType === 6">作文任务</button>
        <button v-if="item.homeworkIshp === 1">互批作业</button>
      </div>
    </div>
    <div class="count" v-if="item.homeworkType === 6">
      <div class="composition">{{ item.compositionRequire | getRequire }}</div>
    </div>
    <div class="count" v-else>
      <div v-if="item.homeworkType == 5">
        <i>{{ item.questionNumber }}</i> <i style="color:#aaa"></i>
      </div>
      <div v-else>
        <i v-if="item.homeworkType !== 4">{{ item.questionNumber }}</i>
        <i v-else>{{ item.questionNumList | addCount }}</i>
        <i style="color:#aaa"></i>
      </div>
      <div v-if="item.homeworkType == 5">篇数</div>
      <div v-else>题数</div>
    </div>
    <div class="completeness">
      <template v-if="item.homeworkStarttime > currentTime">
        <CountDown
          :startTime="item.homeworkStarttime"
          :nowTime="currentTime"
        ></CountDown>
      </template>
      <template v-else>
        <Completeness
          :finishStudentNum="item.finishStudentNum"
          :studentNum="item.studentNum"
          :item="item"
        ></Completeness>
        <Readover
          :teacherReviewNum="item.teacherReviewNum"
          :finishStudentNum="item.finishStudentNum"
          :studentNum="item.studentNum"
          v-if="
            item.homeworkType === 1 ||
              item.homeworkType === 2 ||
              item.homeworkType === 5 ||
              item.homeworkType === 6
          "
        ></Readover>
      </template>
    </div>
    <div class="handle">
      <template v-if="item.homeworkStarttime > currentTime">
        <button class="ch" @click="handleRevocation">撤回作业</button>
      </template>
      <template v-else>
        <template
          v-if="
            (item.homeworkType === 1 || item.homeworkType === 2) &&
              item.studentNum != undefined &&
              item.teacherReviewNum != undefined &&
              item.teacherReviewNum < item.studentNum
          "
        >
          <button @click="handlGoDetail(item)" class="py">批阅作业</button>
        </template>
        <template
          v-else-if="
            item.homeworkType === 5 &&
              item.studentNum != undefined &&
              item.teacherReviewNum != undefined &&
              item.teacherReviewNum < item.studentNum
          "
        >
          <button @click="handlGoDetail(item)" class="py">批阅阅读训练</button>
        </template>
        <template
          v-else-if="
            item.homeworkType === 6 &&
              item.studentNum != undefined &&
              item.teacherReviewNum != undefined &&
              item.teacherReviewNum < item.studentNum
          "
        >
          <button @click="handlGoDetail(item)" class="py">批阅作文</button>
        </template>
        <template v-else>
          <button
            class="py"
            @click="handlGoDetail(item)"
            v-if="item.homeworkType == 6"
          >
            查看任务
          </button>
          <button class="py" @click="handlGoDetail(item)" v-else>
            作业完成情况
          </button>
        </template>
        <button
          class="sj"
          v-if="item.homeworkType === 5"
          @click="handlGoReadData(item)"
        >
          数据分析
        </button>
        <button
          class="sj"
          v-else-if="item.homeworkType === 6"
          @click="handlGoCompositionData(item)"
        >
          数据分析
        </button>
        <button
          class="sj"
          v-else-if="
            item.homeworkType !== 4 &&
              item.homeworkType !== 5 &&
              item.homeworkType !== 6
          "
          @click="handlGoData(item)"
        >
          数据分析
        </button>
      </template>
    </div>
    <div class="deadline grey" v-if="item.homeworkStarttime > currentTime">
      开始时间 {{ item.homeworkStarttime | formatDate('yyyy-MM-dd hh:mm') }}
    </div>
    <div class="deadline" v-else>
      截止时间 {{ item.homeworkEndtime | formatDate('yyyy-MM-dd hh:mm') }}
    </div>
    <div class="revocation-model" v-if="isShowRevocation">
      <div class="revocation">
        <header>
          <span>提示</span
          ><span><a-icon @click="handleHideRevocation" type="close"/></span>
        </header>
        <div class="content">
          <h3>确定要撤回作业吗？</h3>
          <div class="main">
            <div>
              <span>类型</span>
              <span v-if="item.homeworkType === 1">日常作业</span>
              <span v-else-if="item.homeworkType === 2">错题作业</span>
              <span v-else-if="item.homeworkType === 3">英语听说</span>
              <span v-else-if="item.homeworkType === 4">单词作业</span>
              <span v-else-if="item.homeworkType === 5">阅读训练</span>
              <span v-else-if="item.homeworkType === 6">语文作文</span>
            </div>
            <!-- <div>
              <span>班级</span><span>{{ item.gradeClassname }}</span>
            </div> -->
            <div>
              <span>题数</span><span>{{ item.questionNumber }}</span>
            </div>
            <div>
              <span>开始时间</span
              ><span>{{ item.homeworkStarttime | formatDate }}</span>
            </div>
          </div>
          <div class="extra" v-if="classList.length > 0">
            <p>选择撤回的班级</p>
            <ul>
              <template v-for="(grade, index) of classList">
                <li
                  :key="index"
                  @click="handleSelectGrade(grade)"
                  :class="
                    homeworkClassIds.includes(grade.homeworkClassId)
                      ? 'active'
                      : ''
                  "
                >
                  {{ currentGrade | filtergrade }}{{ grade.gradeClassname }}
                </li>
              </template>
            </ul>
          </div>
          <div class="footer">
            <button @click="handleConfirm">确认撤回</button>
            <button @click="handleHideRevocation">不撤回</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 撤回作文作业 -->
    <el-dialog
      class="custom_dialog"
      :visible.sync="recallDialogShow"
      :append-to-body="true"
      :width="'1000px'"
    >
      <div slot="title">
        <h4
          v-if="article.compositionType === 1 || article.compositionType === 2"
        >
          {{ article.compositionTitle }}
        </h4>
        <h4 v-else>材料作文</h4>
      </div>
      <p class="float_area">标题</p>
      <div class="article_content">
        <div>
          <ul>
            <li>
              <p class="left_title">作业类型</p>
              <span class="blue_word">作文任务</span>
            </li>
            <li>
              <p class="left_title">作业要求</p>
              <ul class="blue_word blue_word_list">
                <li>{{ article.compositionType | getType }}</li>
                <li>{{ article.compositionRequire | getRequire }}</li>
                <li>作文字数不少于{{ article.compositionWordNum }}</li>
                <li>满分50</li>
              </ul>
            </li>
            <li>
              <p class="left_title">作业时间</p>
              <span style="line-height: 24px;"
                >{{ article.homeworkStarttime | getDateFormat }} -
                {{ article.homeworkEndtime | getDateFormat }}</span
              >
            </li>
            <li>
              <p class="left_title">布置班级</p>
              <span class="blue_word"
                >{{ article.grade | grade }}&nbsp;{{
                  article.gradeClassName
                }}</span
              >
            </li>
          </ul>
        </div>
        <div style="margin-left: 20px;">
          <div class="open_composition_detail" v-if="recallDialogShow">
            <p>写作分析指导</p>
            <div>
              <audio
                v-show="false"
                ref="userVoice"
                preload="auto"
                id="userVoicePlay"
                :src="article.compositionConductVoiceStr"
              ></audio>
              <div style="width: 360px;">
                <a-button
                  type="primary"
                  class="play_audio"
                  @click="handlePlayClick"
                  v-if="article.compositionConductVoiceStr"
                >
                  <div>
                    <span class="word">点击播放</span>
                    <img
                      v-show="!isPlay"
                      style="width: 26px;height: 26px;margin-left: 28px;"
                      src="../../../assets/img/publish/audio_horn.png"
                    />
                    <img
                      v-show="isPlay"
                      style="width: 26px;height: 26px;margin-left: 28px;"
                      src="../../../assets/img/play/play.gif"
                    />
                  </div>
                </a-button>
                <a-button
                  type="primary"
                  class="play_audio mute_btn"
                  disabled
                  v-else
                >
                  <div>
                    <span class="word">无录音</span>
                    <img
                      style="width: 20px;height: 18px;margin-left: 11px;"
                      src="../../../assets/img/publish/mute.png"
                    />
                  </div>
                </a-button>
                <el-input
                  type="textarea"
                  placeholder="写作指导"
                  class="composition_textarea"
                  :value="article.compositionConductText"
                  readonly
                >
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style="border: 0;border-top: 1px solid #eee;" />
      <div class="image_area">
        <div class="composition_pic">
          <p>阅读材料</p>
          <img
            v-if="article.compositionMaterialImgStr"
            @click="handlePhotoClick(article.compositionMaterialImgStr)"
            :src="article.compositionMaterialImgStr"
          />
          <img
            v-else
            class="no_image"
            src="../../../assets/img/grading-assignment/moren.png"
          />
        </div>
        <div class="composition_pic" style="margin-left: 20px;">
          <p>范文提供</p>
          <img
            v-if="article.compositionModelImgStr"
            @click="handlePhotoClick(article.compositionModelImgStr)"
            :src="article.compositionModelImgStr"
          />
          <img
            v-else
            class="no_image"
            src="../../../assets/img/grading-assignment/moren.png"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <a-button
          ghost
          type="primary"
          @click="handleRecallHomework"
          style="width: 160px;height: 36px;border-radius: 18px;margin-right: 19px;"
          >撤回</a-button
        >
        <a-button
          type="primary"
          @click="recallDialogShow = false"
          style="width: 160px;height: 36px;border-radius: 18px;"
          >不撤回</a-button
        >
      </span>
    </el-dialog>
    <FullScreen
      v-if="showFullScreen"
      @toParentsClose="closeFullScreen"
      :getImageSrc="imageSrc"
    ></FullScreen>
  </li>
</template>

<script>
import localforage from 'localforage'
import Completeness from './Completeness'
import Readover from './Readover'
import CountDown from './CountDown'
import FullScreen from '../../composition-detail/components/fullScreen'
export default {
  name: '',
  components: { Completeness, Readover, CountDown, FullScreen },
  props: ['item'],
  data() {
    return {
      isShowRevocation: false,
      showFullScreen: false,
      imageSrc: '',
      classList: [],
      homeworkClassIds: [],
      recallDialogShow: false,
      playFlag: false,
      isPlay: false,
      article: {
        compositionConductText: '',
        compositionConductVoice: '',
        compositionMaterialImg: '',
        compositionModelImg: '',
        compositionRequire: '',
        compositionTitle: '',
        compositionType: 0,
        compositionWordNum: 0,
        gradeClassName: '',
        homeworkEndtime: 0,
        homeworkQuestionId: 0,
        homeworkStarttime: 0
      }
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.work.currentTime
    },
    currentGrade() {
      return this.$store.getters.grade
    }
  },
  filters: {
    getType(val) {
      switch (Number(val)) {
        case 1:
          return '命题作文'
        case 2:
          return '半命题作文'
        case 3:
          return '材料作文'
        default:
          return '命题作文'
      }
    },
    getRequire(val) {
      switch (Number(val)) {
        case 1:
          return '文体不限'
        case 2:
          return '记叙文'
        case 3:
          return '议论文'
        default:
          return '文体不限'
      }
    },
    getDateFormat(val) {
      // 2019年07月24日  10：00  - 2019年07月24日  23：00
      if (!val) {
        return ''
      }
      let time1 = new Date(val)
      let year = time1.getFullYear()
      let month = time1.getMonth() + 1
      let day = time1.getDate()
      let hour = time1.getHours()
      let minute = time1.getMinutes()
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      return `${year}年${month}月${day}日 ${hour}:${minute}`
    },
    addCount(value) {
      let result = 0
      value.forEach(item => {
        result += item.questionNum
      })
      return result
    },
    filtergrade(value) {
      switch (value + '') {
        case '1':
          return '一年级'
        case '2':
          return '二年级'
        case '3':
          return '三年级'
        case '4':
          return '四年级'
        case '5':
          return '五年级'
        case '6':
          return '六年级'
        case '7':
          return '七年级'
        case '8':
          return '八年级'
        case '9':
          return '九年级'
        case '10':
          return '高一'
        case '11':
          return '高二'
        case '12':
          return '高三'
      }
    }
  },
  methods: {
    handlGoDetail(item) {
      localStorage.setItem('homeworkClassIdOne', item.homeworkClassId)
      localforage.setItem('workListItem', item).then(() => {
        this.$router.push({
          name: 'work-grading-assignment',
          params: { item: item }
        })
      })
      localforage.setItem('dataStatistics', item).then(() => {})
    },
    handlGoData(item) {
      localStorage.setItem('homeworkClassIdOne', item.homeworkClassId)
      localforage.setItem('dataStatistics', item).then(() => {
        this.$router.push({
          name: 'work-data-statistics',
          params: { item: item }
        })
      })
      localforage.setItem('workListItem', item).then(() => {})
    },
    handlGoReadData(item) {
      localStorage.setItem('homeworkClassIdOne', item.homeworkClassId)
      localforage.setItem('workListItem', item).then(() => {
        this.$router.push({
          name: 'readDataAnalysis',
          params: { item: item }
        })
      })
    },
    // 点击作文作业的数据分析
    handlGoCompositionData(item) {
      localStorage.setItem('homeworkClassIdOne', item.homeworkClassId)
      localforage.setItem('homeworkClassId', item).then(() => {
        this.$router.push({
          name: 'work-composition-data-analysis',
          params: { item: item }
        })
      })
    },
    // 撤回作文作业
    handleRecallHomework() {
      this.$http
        .get('/api/teacher/system/time', {
          params: {}
        })
        .then(({ data }) => {
          if (data.flag == 1) {
            if (data.infos > this.item.homeworkStarttime) {
              this.$message.error('此份作业已开始,不能撤回了！')
            } else {
              this.$http
                .get('/api/teacher/homework/delete', {
                  params: {
                    homeworkClassIds: [this.item.homeworkClassId].join(',')
                  }
                })
                .then(res => {
                  if (res.data.flag === 1) {
                    this.$message.success('撤回作业成功！')
                    this.recallDialogShow = false
                    localforage.getItem('userInfo').then(value => {
                      if (value) {
                        this.$store.commit('work/UPDATECURRENTPAGE', 1)
                        this.$store.dispatch('work/homeworkList')
                      }
                    })
                  } else {
                    res.data.message
                      ? this.$message.error(res.data.message)
                      : this.$message.error('撤回作业成功！')
                  }
                })
                .catch(err => {
                  this.$message.error('撤回作业失败！')
                  console.log(err)
                })
            }
          }
        })
    },
    // 作文的撤回跟其他不一样
    handleRevocation() {
      if (this.item.homeworkType === 6) {
        this.recallDialogShow = true
        // 获取老师发布的作文要求
        this.$http
          .get('/api/teacher/homework/compositionInfo', {
            params: {
              homeworkId: this.item.homeworkId
            }
          })
          .then(res => {
            this.article = res.data.infos
            this.$nextTick(() => {
              let userVoice = document.getElementById('userVoicePlay')
              userVoice.addEventListener('ended', () => {
                this.playFlag = false
                this.isPlay = false
              })
              userVoice.addEventListener('pause', () => {
                this.playFlag = false
                this.isPlay = false
              })
            })
          })
          .catch(err => {
            console.log(err)
          })
        return false
      }
      this.isShowRevocation = true
      this.$http
        .get('/api/teacher/homework/class', {
          params: {
            homeworkId: this.item.homeworkId
          }
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            this.classList = data.infos
            // 当进入撤销作业时，当切换掉默认选中的班级，选另一个班级，选择撤销，之后再点击进入班级，this.homeworkClassIds 数据会变，所以用这个办法，修改了这个BUG7879
            if (this.homeworkClassIds[0] !== this.item.homeworkClassId) {
              this.homeworkClassIds = []
              this.homeworkClassIds[0] = this.item.homeworkClassId
            }
          }
        })
    },
    handleHideRevocation() {
      this.isShowRevocation = false
    },
    handleSelectGrade(grade) {
      if (this.homeworkClassIds.includes(grade.homeworkClassId)) {
        if (this.homeworkClassIds.length !== 1) {
          this.homeworkClassIds = this.homeworkClassIds.filter(
            item => item !== grade.homeworkClassId
          )
        }
      } else {
        this.homeworkClassIds = [
          ...this.homeworkClassIds,
          grade.homeworkClassId
        ]
      }
    },
    // 播放语音
    handlePlayClick() {
      if (this.playFlag) {
        this.$refs.userVoice.pause()
        this.$refs.userVoice.currentTime = 0
        this.playFlag = false
        this.isPlay = false
        return false
      }
      this.$refs.userVoice.play()
      this.isPlay = true
      this.playFlag = true
    },
    handleConfirm() {
      this.$http
        .get('/api/teacher/system/time', {
          params: {}
        })
        .then(({ data }) => {
          if (data.flag == 1) {
            if (data.infos > this.item.homeworkStarttime) {
              this.$message.error('此份作业已开始,不能撤回了！')
            } else {
              this.$http
                .get('/api/teacher/homework/delete', {
                  params: {
                    homeworkClassIds: this.homeworkClassIds.join(',')
                  }
                })
                .then(({ data }) => {
                  if (data.flag === 1) {
                    this.isShowRevocation = false
                    this.$message.success('撤回成功')
                    this.$store.commit('work/UPDATECURRENTPAGE', 1)
                    this.$store.dispatch('work/homeworkList')
                  }
                })
            }
          }
        })
    },

    // 打开全屏预览
    handlePhotoClick(url) {
      console.log(url)
      this.imageSrc = url
      this.showFullScreen = true
    },
    // 关闭全屏预览
    closeFullScreen(val) {
      this.showFullScreen = val
    }
  },
  mounted() {
    this.homeworkClassIds = [this.item.homeworkClassId]
  }
}
</script>

<style lang="scss" scoped>
.work-item {
  width: 100%;
  display: flex;
  align-items: center;
  height: 114px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(231, 231, 231, 1);
  box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
  border-radius: 4px;
  margin-bottom: 22px;
  position: relative;
  .homework {
    display: flex;
    width: 280px;
    flex: 0 0 auto;
    flex-direction: column;
    .grade {
      display: inline-block;
      min-width: 60px;
      height: 24px;
      line-height: 24px;
      background: rgba(247, 115, 33, 1);
      font-size: 12px;
      border-radius: 0 24px 24px 0;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-right: 8px;
      text-align: center;
    }
    h3 {
      font-size: 18px;
      font-weight: bold;
      color: rgba(78, 95, 113, 1);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .workType {
      margin-top: 10px;
      text-align: center;
      button {
        outline: none;
        width: 64px;
        height: 24px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(244, 120, 30, 1);
        border-radius: 12px;
        margin-right: 10px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(244, 120, 30, 1);
      }
    }
  }
  .count {
    flex: 0 0 96px;
    height: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    div:nth-child(1) {
      font-size: 26px;
      font-weight: 400;
      line-height: 1;
      color: rgba(102, 102, 102, 1);
      //display: flex;
      //justify-content: flex-start;
      // align-items: flex-end;
      i:nth-child(1) {
        font-size: 26px;
      }
      i:nth-child(2) {
        font-size: 12px;
        margin: 0px 0 0 2px;
      }
    }
    div:nth-child(2) {
      margin-top: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      font-size: 12px;
      font-weight: 400;
      color: rgba(170, 170, 170, 1);
    }
    div.composition {
      font-size: 14px;
      color: #666;
      font-weight: 400;
      line-height: 42px;
    }
  }
  .completeness {
    flex: 0 0 280px;
    height: 62px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .handle {
    flex: auto;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    button {
      outline: none;
      cursor: pointer;
      width: 120px;
      height: 36px;
      box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
      border: 1px solid rgba(16, 89, 255, 1);
      border-radius: 18px;
    }
    .py {
      background: rgba(0, 15, 211, 1);
      color: #fff;
      margin-right: 10px;
    }
    .sj {
      color: rgba(0, 15, 211, 1);
      background: #fff;
    }
    .ch {
      color: #8697b8;
      background: #fff;
      box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
      border: 1px solid #8697b8;
    }
  }
  .deadline {
    position: absolute;
    top: -4px;
    right: 0;
    width: 215px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    background-image: url('../../../assets/img/bg_homework_time1@2x.png');
    background-size: 100% 100%;
  }
  .grey {
    background-image: url('../../../assets/img/bg_homework_time2@2x.png');
  }
}
.revocation-model {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  .revocation {
    width: 500px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      width: 100%;
      flex: 0 0 48px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      span:nth-child(2) {
        cursor: pointer;
      }
    }
    .content {
      float: auto;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-size: 16px;
        font-weight: 400;
        padding-top: 30px;
        color: rgba(61, 77, 101, 1);
      }
      .main {
        width: 400px;
        margin-top: 16px;
        > div {
          height: 30px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          span:nth-child(1) {
            flex: 0 0 110px;
            display: flex;
            justify-content: flex-end;
          }
          span:nth-child(2) {
            flex: auto;
            display: flex;
            justify-content: flex-start;
            margin-left: 50px;
          }
        }
      }
      .extra {
        width: 100%;
        margin-top: 24px;
        p {
          padding: 0 30px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(61, 77, 101, 1);
        }
        ul {
          width: 100%;
          padding: 0 30px;
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          li {
            flex: 0 0 100px;
            margin: 5px;
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(221, 221, 221, 1);
          }
          li.active {
            background: rgba(16, 89, 255, 1);
            box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
            color: #fff;
          }
        }
      }
    }
    .footer {
      flex: 0 0 64px;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      button:nth-child(1) {
        width: 159px;
        height: 35px;
        background: rgba(255, 255, 255, 1);
        border-radius: 18px;
        border: 1px solid rgba(16, 89, 255, 1);
        margin-right: 20px;
        outline: none;
      }
      button:nth-child(2) {
        width: 160px;
        height: 36px;
        background: #1059ff;
        color: #fff;
        border: 1px solid rgba(16, 89, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(16, 89, 255, 0.27);
        border-radius: 18px;
        outline: none;
      }
    }
  }
}
</style>

<style scoped>
.custom_dialog >>> .el-dialog__header {
  border-bottom: 1px solid #ddd;
  padding: 0;
}
.custom_dialog >>> .el-dialog__header div {
  width: 100%;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
  color: #4e5f71;
}
.custom_dialog >>> .el-dialog__body {
  padding: 18px;
}
.mute_btn {
  background: #dddddd;
  border: 1px solid #cccccc;
}
.mute_btn > .word {
  color: #999;
}
.open_composition_detail > p {
  width: 90px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #ffb463;
  color: #f4781e;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
}
.open_composition_detail > div {
  display: flex;
  margin-top: 10px;
}
.play_audio {
  width: 470px;
  height: 40px;
}
.play_audio > .word {
  font-size: 14px;
}
.composition_textarea {
  width: 470px;
  height: 105px;
  margin-top: 13px;
}
.composition_textarea >>> .el-textarea__inner {
  height: 88px;
}
.composition_pic {
  height: 200px;
  border-radius: 6px;
  border: 1px solid #dedede;
  width: 470px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.composition_pic p {
  width: 60px;
  height: 24px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid #56acff;
  color: #56acff;
  margin-left: 20px;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  position: absolute;
  left: -21px;
  top: 15px;
  background: #fff;
}
.composition_pic img {
  width: 100%;
  height: 100%;
}
.composition_pic img.no_image {
  width: 58px;
  height: 58px;
}
.float_area {
  position: absolute;
  top: 14px;
  left: 0;
  width: 44px;
  height: 24px;
  background: #56acff;
  color: #fff;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
}
.article_content {
  display: flex;
  justify-content: center;
}
.article_content > div {
  width: 470px;
}
.article_content > div > ul > li {
  display: flex;
  margin-top: 19px;
}
.article_content > div > ul > li:first-child {
  margin-top: 0;
}
.left_title {
  width: 64px;
  height: 24px;
  color: #ffb463;
  background: #fff;
  border: 1px solid #ffb643;
  text-align: center;
  line-height: 24px;
  border-radius: 12px;
  margin-right: 13px;
  font-size: 12px;
}
.blue_word {
  font-size: 14px;
  line-height: 24px;
  color: #5e84ad;
}
.blue_word_list {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 18px;
}
.blue_word_list li {
  border-right: 1px solid #ddd;
  height: 18px;
  padding-left: 10px;
  padding-right: 10px;
}
.blue_word_list li:first-child {
  padding-left: 0;
}
.blue_word_list li:last-child {
  padding-right: 0;
  border-right: 0;
}

.image_area {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
}
</style>
