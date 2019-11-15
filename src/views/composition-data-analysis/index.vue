<template>
  <div class="fatherBox">
    <div>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/work">作业</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="/work-grading-assignment">学生列表</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>数据分析</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="dataBox_w">
      <ul class="tag_list">
        <li>
          <span>作业名称</span>
          <span
            >{{ article.compositionType | getType }}（{{
              article.homeworkStarttime | getDayFormat
            }}作业）</span
          >
        </li>
        <li>
          <span>班级</span>
          <span>{{ item.gradeClassname }}</span>
        </li>
        <li>
          <span>人数</span>
          <span>{{ item.studentNum }}</span>
        </li>
        <li>
          <span>类型</span>
          <span>作文任务</span>
        </li>
      </ul>
      <hr
        style="border: 0;border-top: 1px solid #E1E8EE;margin: 20px auto 26px;width: 1159px;"
      />
      <!-- <p class="header_w">
          <span class="leftSpan_w">作业名称</span>
          <span class="rightSpan_w">{{this.headerList.homeworkName}}</span>
          <span class="leftSpan_w">班级</span>
          <span class="rightSpan_w">{{this.headerList.gradeClassname}}</span>
          <span class="leftSpan_w">人数</span>
          <span class="rightSpan_w">{{this.headerList.studentNum}}</span>
          <span class="leftSpan_w">类型</span>
          <span class="rightSpan_w">作文任务</span>
      </p> -->
      <div class="write_ability">
        <div>
          <div class="title" style="position:relative;">
            <p>写作能力分析</p>
            <img
              src="../../assets/img/grading-assignment/ic_fabu_tips@2x.png"
              style="cursor: pointer;"
              @click="popShow = !popShow"
            />
            <div id="titleSon" v-show="popShow">
              <p>各维度满分分值：</p>
              <p>
                内容20<span></span>语言16<span></span>篇章10<span></span>书写4
              </p>
            </div>
          </div>
          <div class="score">
            <img
              src="../../assets/img/grading-assignment/ic_homework_data_zhutu@2x.png"
            />
            <p>平均得分</p>
          </div>
        </div>
        <div
          v-if="!noData"
          id="container"
          style="height: 150px;width:340px;top: 25px;margin-right: 44px;"
        ></div>
        <p v-else class="no_datas">无数据</p>
        <div class="vertical_line"></div>
        <div class="circle left_cir">
          <img
            src="../../assets/img/grading-assignment/bg_homepage_data_chart@2x.png"
          />
          <p>
            <span class="big">{{ avgScore }}</span
            ><span class="mid">/50</span>
          </p>
          <p class="small">平均分</p>
        </div>
        <div class="circle right_cir">
          <img
            src="../../assets/img/grading-assignment/bg_homepage_data_chart@2x.png"
          />
          <p>
            <span class="big">{{ submitRate }}</span
            ><span class="mid">%</span>
          </p>
          <p class="small">提交率</p>
        </div>
        <div class="vertical_line" style="margin-left: 57px;"></div>
        <div class="time">
          <p class="minutes">{{ writeTimeAvg }}<span>分钟</span></p>
          <p class="text">平均写作用时</p>
        </div>
      </div>
      <!-- <div class="histogram_w">
          <p>
            <i></i>
            写作能力分析
            <img src="../../assets/img/grading-assignment/ic_fabu_tips@2x.png">
          </p>
          <p style="position:absolute;left:270px;top:30px;">
            <img style="width:21px;height:12px;margin-top:-5px;" src="../../assets/img/grading-assignment/ic_homework_data_zhutu@2x.png">
            <span style="color:#999;font-size:14px;margin-left:16px;">平均得分</span>
          </p> -->
      <!-- <div id="container" style="height: 100%;width:30%;top:-40px;left:20px;float:left;"></div> -->
      <!-- <b class="bar_w"></b>
          <div class="average_w">
            <img src="../../assets/img/grading-assignment/bg_homepage_data_chart@2x.png" alt="">
            <p>{{avgScore}}/<span>50</span></p>
            <h6>平均分</h6>
          </div>
          <div class="rata_w">
            <img src="../../assets/img/grading-assignment/bg_homepage_data_chart@2x.png" alt="">
            <p>{{submitRate}}<span>%</span></p>
            <h6>提交率</h6>
          </div>
          <b class="barTwo_w"></b>
          <div class="time_w">
            <p>{{writeTimeAvg}}<span>分钟</span></p>
            <h6>平均写作用时</h6>
          </div> -->
      <!-- </div> -->
      <div class="compositionDetails_w">
        <p><i></i>作文任务详情</p>
        <div class="article_content">
          <div>
            <ul>
              <li>
                <p class="left_title">作文标题</p>
                <span class="blue_word">{{ article.compositionTitle }}</span>
              </li>
              <li>
                <p class="left_title">作文要求</p>
                <ul class="blue_word blue_word_list">
                  <li>{{ article.compositionType | getType }}</li>
                  <li>{{ article.compositionRequire | getRequire }}</li>
                  <li>作文字数不少于{{ article.compositionWordNum }}</li>
                  <li>满分50</li>
                </ul>
              </li>
              <li>
                <p class="left_title">发布时间</p>
                <span class="blue_word">{{
                  article.homeworkStarttime | getDateFormat
                }}</span>
              </li>
              <li class="open_composition_detail">
                <p class="left_title">写作指导</p>
                <div>
                  <audio
                    v-show="false"
                    preload="auto"
                    ref="userVoice"
                    id="userVoicePlay"
                    :src="article.compositionConductVoiceStr"
                  ></audio>
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
                        style="width: 20px;height: 18px;margin-left: 11px;"
                        src="../../assets/img/publish/audio_horn.png"
                      />
                      <img
                        v-show="isPlay"
                        style="width: 20px;height: 18px;margin-left: 11px;"
                        src="../../assets/img/play/play.gif"
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
                        src="../../assets/img/publish/mute.png"
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
              </li>
            </ul>
          </div>
          <div>
            <div class="image_area">
              <div class="composition_pic">
                <p>阅读材料</p>
                <img
                  style="border-radius: 12px;"
                  v-if="article.compositionMaterialImgStr"
                  @click="handlePhotoClick(article.compositionMaterialImgStr)"
                  :src="article.compositionMaterialImgStr"
                />
                <img
                  class="no_image"
                  v-else
                  src="../../assets/img/grading-assignment/moren.png"
                />
              </div>
              <div class="composition_pic" style="margin-left: 12px;">
                <p>范文提供</p>
                <img
                  style="border-radius: 12px;"
                  v-if="article.compositionModelImgStr"
                  @click="handlePhotoClick(article.compositionModelImgStr)"
                  :src="article.compositionModelImgStr"
                />
                <img
                  class="no_image"
                  v-else
                  src="../../assets/img/grading-assignment/moren.png"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="compositionDetails_left">
            <p><span class="span_left">作文标题</span><span class="span_right">一次有意义的旅行</span></p>
            <p><span class="span_left">作文要求</span><span class="span_right">命题作文&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;记叙文&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;作文字数不少于600&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;满分50</span></p>
            <p><span class="span_left">发布时间</span><span class="span_right">2019/07/23  17:32</span></p>
            <p><span class="span_left">写作指导</span>
              <audio
                v-show="false"
                id="userVoice"
                :src="audioResource"
                controls="controls"></audio>
              <a-button
                type="primary"
                class="play_audio"
                @click="handlePlayClick"
                v-if="false"
                style="width:416px;height:40px;">
                <div>
                  <span style="font-size:14px;">点击播放</span>
                  <img
                    style="width: 27px;height: 24px;margin-left: 29px;"
                    src="../../assets/img/publish/audio_horn.png">
                </div>
              </a-button>
              <a-button
              type="primary"
              class="play_audio mute_btn"
              disabled
              style="width:416px;height:40px;"
              v-else>
              <div>
                <span class="word" style="font-size:14px;">暂无录音</span>
                <img
                  style="width: 27px;height: 24px;margin-left: 29px;"
                  src="../../assets/img/publish/mute.png">
              </div>
            </a-button>
            </p>
            <p>突出旅行中通过观察人和事所获得的感悟突出旅行中通过观察人和事所获得的感悟</p>
          </div>
          <div class="compositionDetails_img imgOne">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3893146502,314297687&fm=26&gp=0.jpg" alt="">
            <span class="img_span_w">阅读材料</span>
          </div>
          <div class="compositionDetails_img">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg" alt="">
            <span class="img_span_w">范文提供</span>
          </div> -->
      </div>
    </div>
    <RouterBtn
      class="float_button"
      text="学生列表"
      path="work-grading-assignment"
      style="right: -45px;top: 85px;"
    ></RouterBtn>
    <FullScreen
      v-if="showFullScreen"
      @toParentsClose="closeFullScreen"
      :getImageSrc="imageSrc"
    ></FullScreen>
  </div>
</template>
<script>
import http from '../../api/index'
import localforage from 'localforage'
import RouterBtn from '../../components/RouterBtn'
import FullScreen from '../composition-detail/components/fullScreen'
const echarts = require('echarts')
export default {
  data() {
    return {
      popShow: false,
      showFullScreen: false,
      noData: false,
      imageSrc: '',
      option: {
        color: function(params) {
          var colorList = ['#4FAEFF', '#FF9948', '#70C1B3', '#FF9381']
          return colorList[params.dataIndex]
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            // return params[0].name;
            return ''
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: 0,
          bottom: 0,
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['内容', '语言', '篇章', '书写'],
            axisTick: {
              alignWithLabel: true,
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 20,
            interval: 5,
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '29px',
            label: {
              normal: {
                show: true,
                position: 'insideTop',
                textStyle: {
                  color: '#ffffff'
                }
              }
            },
            data: []
          }
        ]
      },
      list: [],
      headerList: [],
      audioResource: '',
      homeworkClassId: 0,
      // contentAvgScore:0,//内容平均得分
      // languageAvgScore:0,//语言平均得分
      // chapterAvgScore:0,//篇章平均得分
      // writeAvgScore:0,//书写平均得分
      avgScore: 0, //班级平均分
      submitRate: 0, //提交率
      writeTimeAvg: 0, //写作平均用时
      wallCount: 0, //优秀作文数量
      item: {},
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
  components: {
    RouterBtn,
    FullScreen
  },
  filters: {
    getType(val) {
      switch (Number(val)) {
        case 1:
          return '命题作文'
          break
        case 2:
          return '半命题作文'
          break
        case 3:
          return '材料作文'
          break
        default:
          return '命题作文'
          break
      }
    },
    getRequire(val) {
      switch (Number(val)) {
        case 1:
          return '文体不限'
          break
        case 2:
          return '记叙文'
          break
        case 3:
          return '议论文'
          break
        default:
          return '文体不限'
          break
      }
    },
    getDateFormat(val) {
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
      return `${year}/${month}/${day} ${hour}:${minute}`
    },
    getDayFormat(val) {
      let time1 = new Date(val)
      let month = time1.getMonth() + 1
      let day = time1.getDate()
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      return `${month}月${day}日`
    }
  },
  mounted() {
    if (this.$route.params.item) {
      this.item = this.$route.params.item
      console.log(this.item)
      localforage.setItem('workListItem', this.item).then(res => {
        console.log(res)
      })
      this.fetchChartData()
      this.fetchPageData()
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
    } else {
      localforage.getItem('workListItem').then(res => {
        this.item = res
        console.log(this.item)
        this.fetchChartData()
        this.fetchPageData()
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
    }

    // this.homeworkClassId=this.$route.params.item.homeworkClassId;
    // localforage.getItem('homeworkClassId').then(value => {
    //   this.homeworkClassId=value.homeworkClassId;
    //   this.headerList=value;
    //   // console.log(this.homeworkClassId)
    //   // console.log(value)
    //   let url='/api/teacher/homework/compositionData';
    //   this.$http.get(url,{
    //     params:{
    //       homeworkClassId:this.homeworkClassId
    //     }
    //   }).then(({data})=>{
    //     // console.log(data)
    //     this.list=data.infos;
    //     this.option.series[0].data.push(this.list.contentAvgScore,this.list.languageAvgScore,this.list.chapterAvgScore,this.list.writeAvgScore);
    //     if(this.list.avgScore!==undefined){
    //       this.avgScore=this.list.avgScore;
    //     }
    //     if(this.list.submitRate!==undefined && this.list.submitRate!==null){
    //       this.submitRate=this.list.submitRate;
    //     }
    //     if(this.list.writeTimeAvg!==undefined && this.list.writeTimeAvg!==null){
    //       this.writeTimeAvg=this.list.writeTimeAvg;
    //     }
    //     if(this.list.wallCount!==undefined && this.list.wallCount!==null){
    //       this.wallCount=this.list.wallCount;
    //     }
    //     if(this.list.audioResource!==undefined && this.list.audioResource!==null){
    //       this.audioResource=this.list.audioResource;
    //     }
    //   })
    // })
  },
  methods: {
    fetchPageData() {
      // 获取老师发布的作文要求
      this.$http
        .get('/api/teacher/homework/compositionInfo', {
          params: {
            homeworkId: this.item.homeworkId
          }
        })
        .then(res => {
          console.log(res)
          this.article = res.data.infos
        })
        .catch(err => {
          console.log(err)
        })
    },
    // goReviewProgress_w(){
    //   this.$router.push({name:'work-grading-assignment'})
    // },
    chartInit() {
      const myChart = echarts.init(document.getElementById('container'))
      myChart.setOption(this.option)
    },
    handlePlayClick() {
      if (this.playFlag) {
        this.$refs.userVoice.pause()
        this.$refs.userVoice.currentTime =
          this.$refs.userVoice.duration > 60 ? 0 : this.$refs.userVoice.duration
        this.isPlay = false
        this.playFlag = false
        return false
      }
      this.$refs.userVoice.play()
      this.isPlay = true
      this.playFlag = true
    },
    // 打开全屏预览
    handlePhotoClick(url) {
      this.imageSrc = url
      this.showFullScreen = true
    },
    // 关闭全屏预览
    closeFullScreen(val) {
      this.showFullScreen = val
    },
    fetchChartData() {
      let url = '/api/teacher/homework/compositionData'
      this.$http
        .get(url, {
          params: {
            homeworkClassId: this.item.homeworkClassId
          }
        })
        .then(({ data }) => {
          console.log(data)
          this.list = data.infos
          this.option.series[0].data.push(
            this.list.contentAvgScore,
            this.list.languageAvgScore,
            this.list.chapterAvgScore,
            this.list.writeAvgScore
          )
          if (this.list.avgScore !== undefined) {
            this.avgScore = this.list.avgScore
          }
          if (this.list.submitRate !== undefined) {
            this.submitRate = this.list.submitRate
          }
          if (this.list.writeTimeAvg !== undefined) {
            this.writeTimeAvg = this.list.writeTimeAvg
          }
          if (this.list.wallCount !== undefined) {
            this.wallCount = this.list.wallCount
          }
          if (this.list.audioResource !== undefined) {
            this.audioResource = this.list.audioResource
          }
          if (
            !this.list.contentAvgScore &&
            !this.list.languageAvgScore &&
            !this.list.chapterAvgScore &&
            !this.list.writeAvgScore
          ) {
            this.noData = true
          } else {
            this.noData = false
            this.chartInit()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#titleSon {
  position: absolute;
  left: 135px;
  top: -13px;
  width: 238px;
  height: 43px;
  background-image: url('../../assets/img/grading-assignment/bg_fabu_tips@2x.png');
  background-size: 100%100%;
  p {
    color: #596878;
    font-size: 12px;
    padding-left: 20px;
    border: none;
    span {
      width: 8px;
      height: 1px;
      display: inline-block;
    }
  }
  p:nth-child(1) {
    margin-top: 6px;
  }
}
.mute_btn {
  background: #dddddd;
  border: 1px solid #cccccc;
}
.mute_btn > .word {
  color: #999;
}
.fatherBox {
  width: 1180px;
  height: 100%;
  background: #f0f7ff;
  position: relative;
  scrollbar-width: none h5 {
    width: 50px;
    height: 140px;
    position: absolute;
    top: 165px;
    right: 20px;
    border: 1px solid #1059ff;
    color: #1059ff;
    font-size: 16px;
    border-radius: 25px;
    padding: 20px 16px 0;
    cursor: pointer;
  }
  > div:first-child {
    height: 60px;
    display: flex;
    align-items: center;
    width: 1180px;
  }
}
.dataBox_w {
  width: 1180px;
  height: calc(100% - 64px);
  overflow: auto;
  border-radius: 4px 8px 8px 8px;
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  .histogram_w {
    width: 1140px;
    height: 197px;
    border-radius: 14px;
    border: 1px solid #e9e9e9;
    margin: 26px 0 0 20px;
    position: relative;
    p:nth-child(1) {
      width: 100%;
      height: 35px;
      font-size: 14px;
      color: #5e84ad;
      line-height: 35px;
      i {
        width: 4px;
        height: 14px;
        background: #0610a8;
        margin: 15px 9px 0 20px;
        display: inline-block;
      }
      img {
        width: 16px;
        height: 16px;
        margin: 0px 0 0 13px;
        cursor: pointer;
      }
    }
    .bar_w,
    .barTwo_w {
      display: inline-block;
      width: 1px;
      height: 128px;
      background: #b4bacb;
      float: left;
      margin: 0 57px 0 60px;
    }
    .barTwo_w {
      margin: 0 50px 0 57px;
    }
    .average_w,
    .rata_w {
      width: 134px;
      height: 134px;
      float: left;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        width: 100%;
        font-size: 32px;
        text-align: center;
        position: absolute;
        top: 36px;
        left: 0;
        color: #333333;
        span {
          font-size: 16px;
        }
      }
      h6 {
        position: absolute;
        top: 79px;
        left: 0;
        width: 100%;
        color: #969696;
        font-size: 14px;
        text-align: center;
      }
    }
    .rata_w {
      margin-left: 55px;
    }
    .time_w {
      float: left;
      width: 189px;
      height: 115px;
      margin-top: 6px;
      background: #4faeff;
      border-radius: 10px;
      border: 1px solid #e9e9e9;
      p {
        width: 100%;
        text-align: center;
        color: #ffffff;
        font-size: 27px;
        margin-top: 28px;
        span {
          font-size: 16px;
        }
      }
      h6 {
        width: 100%;
        font-size: 14px;
        color: #eef1f4;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
  .compositionDetails_w {
    width: 1140px;
    border: 1px solid #e9e9e9;
    border-radius: 14px;
    margin: 20px auto;
    > p {
      width: 100%;
      font-size: 14px;
      color: #5e84ad;
      i {
        width: 4px;
        height: 14px;
        background: #0610a8;
        margin: 17px 13px 0 15px;
        display: inline-block;
      }
    }
  }
  //   .compositionDetails_left{
  //     float: left;
  //     p{
  //       font-size: 14px;
  //       .span_left{
  //         margin: 32px 32px 0 34px;
  //         color: #777777;
  //         display: inline-block;
  //       }
  //       .span_right{
  //         color: #4E5F71;
  //         margin-top: 32px;
  //         display: inline-block;
  //       }
  //     }
  //     p:nth-child(5){
  //       width: 417px;
  //       height: 79px;
  //       border: 1px solid #DDDDDD;
  //       border-radius: 10px;
  //       margin: 16px 0 0 119px;
  //       font-size: 14px;
  //       color: #4E5F71;
  //       padding: 18px 74px 22px 22px;
  //     }
  //   }
  //   .compositionDetails_img{
  //     width: 263px;
  //     height: 162px;
  //     border: 1px solid #DDDDDD;
  //     border-radius: 12px;
  //     overflow: hidden;
  //     float: left;
  //     margin-top: 23px;
  //     position: relative;
  //     img{
  //       width: 100%;
  //       height: 100%;
  //     }
  //     .img_span_w{
  //       display: inline-block;
  //       width: 58px;
  //       height: 23px;
  //       border: 1px solid #56ACFF;
  //       border-radius: 0 12px 12px 0;
  //       color: #56ACFF;
  //       font-size: 12px;
  //       line-height: 23px;
  //       text-align: center;
  //       position: absolute;
  //       left: 0;
  //       top: 9px;
  //       cursor: pointer;
  //       background: #ffffff;
  //     }
  //   }
  //   .imgOne{
  //     margin-left: 52px;
  //     margin-right: 12px;
  //   }
  // }
}
</style>

<style scoped>
/* .open_composition_detail > p {
  width: 64px;
  height: 24px;
  border-radius: 12px;
  color: #777;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
} */
.tag_list {
  display: flex;
  padding-top: 26px;
}
.tag_list li {
  padding: 0 20px;
  border-right: 1px solid #dddddd;
}
.tag_list li:first-child span:last-child {
  padding-right: 30px;
}
.tag_list li:last-child {
  border-right: 0;
}
.tag_list li span:first-child {
  color: #999;
  font-size: 12px;
  margin-right: 10px;
}
.tag_list li span:last-child {
  color: #5e84ad;
  font-size: 14px;
}
.open_composition_detail > div {
  /* display: flex; */
  margin-top: -10px;
  width: 400px;
}
.play_audio {
  width: 400px;
  height: 40px;
  border-radius: 10px;
}
.play_audio > .word {
  font-size: 14px;
}
.composition_textarea {
  width: 400px;
  height: 120px;
  margin-top: 16px;
}
.composition_textarea >>> .el-textarea__inner {
  height: 79px;
  border-radius: 10px;
  resize: none;
  padding: 18px 70px 22px 22px;
}
.composition_pic {
  border-radius: 12px;
  border: 1px solid #dedede;
  width: 263px;
  height: 162px;
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
  justify-content: flex-start;
}
.article_content > div:first-child {
  width: 501px;
  margin-left: 34px;
  margin-top: 32px;
}
.article_content > div:last-child {
  margin-left: 52px;
  margin-top: 10px;
}
.article_content > div > ul > li {
  display: flex;
  margin-top: 30px;
}
.article_content > div > ul > li:first-child {
  margin-top: 0;
}
.left_title {
  width: 64px;
  height: 24px;
  background: #fff;
  font-size: 14px;
  color: #777;
  text-align: center;
  line-height: 24px;
  border-radius: 12px;
  margin-right: 32px;
}
.blue_word {
  font-size: 14px;
  color: #4e5f71;
  line-height: 24px;
}
.blue_word_list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.blue_word_list li {
  border-right: 1px solid #ddd;
  height: 18px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 18px;
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
.write_ability {
  width: 1140px;
  margin: 0 auto;
  border: 1px solid #e9e9e9;
  border-radius: 14px;
  padding: 15px;
  display: flex;
}
.write_ability > div:first-child {
  display: flex;
  position: absolute;
  justify-content: space-between;
  width: 340px;
}
.write_ability .title {
  display: flex;
  height: 17px;
  line-height: 17px;
}
.write_ability .title p {
  font-size: 14px;
  color: #5e84ad;
  padding-left: 9px;
  border-left: 4px solid #0610a8;
  margin-right: 13px;
}
.write_ability .title img {
  width: 16px;
  height: 16px;
}
.write_ability .score {
  width: 100px;
  height: 14px;
  display: flex;
  margin-top: 20px;
}
.write_ability .score img {
  width: 21px;
  height: 12px;
}
.write_ability .score p {
  margin-left: 16px;
}
.write_ability .circle {
  width: 135px;
  height: 135px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 22px;
}
.write_ability .circle img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.write_ability .left_cir .big,
.write_ability .right_cir .big {
  font-size: 32px;
  color: #333;
}
.write_ability .left_cir .mid,
.write_ability .right_cir .mid {
  font-size: 16px;
  color: #333;
}
.write_ability .left_cir > .small,
.write_ability .right_cir > .small {
  font-size: 14px;
  color: #969696;
  margin-top: 3px;
}
.write_ability .left_cir {
  flex-direction: column;
}
.write_ability .right_cir {
  margin-left: 55px;
  flex-direction: column;
}
.write_ability .vertical_line {
  width: 1px;
  height: 128px;
  background: #b4bacb;
  margin-top: 30px;
  margin-right: 56px;
}
.write_ability .time {
  width: 190px;
  height: 115px;
  color: #fff;
  background: #4faeff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
}
.write_ability .time .minutes {
  font-size: 32px;
}
.write_ability .time .minutes span {
  font-size: 16px;
}
.write_ability .time p.text {
  font-size: 14px;
  color: #eef1f4;
}
.write_ability .no_datas {
  position: relative;
  height: 150px;
  width: 340px;
  top: 25px;
  margin-right: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
@media screen and (max-width: 1400px) {
  .float_button {
    position: fixed;
    right: 0;
  }
}
</style>
