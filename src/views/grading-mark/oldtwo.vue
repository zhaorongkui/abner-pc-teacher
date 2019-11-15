<template>
<div class="fatherBox">
  <div class="box_w">
    <div class="left_w">
      <p>作文浏览区</p>
      <img v-for="(item,index) in imgList" :src='item' :key="index" alt />
    </div>
    <div class="right_w">
      <div class="score_w">
        <span>得分</span>
        <span>{{score}}</span>
        <img src="../../assets/img/grading-assignment/other_score.png" alt />
      </div>
      <div class="top_w">
        <span>评分区</span>
        <a href="#">查看评分标准表</a>
      </div>

      <div class="smallBox_w">
        <div class="title_w">
          <img src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png" alt />
          <p>
            <span>内容</span>
            <span>-维度评分</span>
          </p>
        </div>
        <div
          class="grade_w"
          v-for="(item,index) in listOne"
          :key="index"
          @click="changeOne(index,item)"
          :id="item.isChoose ? 'choose_style' : 'grade_w'"
        >
          <p>
            <span>{{item.grade}}</span>
            <span>（{{item.fractionmin}}-{{item.fractionmax}}分）</span>
          </p>
          <p>{{item.describe}}</p>
        </div>
        <div class="calculation_w">
          <input
            type="button"
            class="subtraction"
            v-model="subtraction"
            @click="subtractionOne"
            :id="this.numOne>this.minOne?'change':'changeno'"
          />
          <span class="num">{{numOne}}</span>
          <input type="button" class="add" v-model="add" @click="addOne"
          :id="this.numOne<this.maxOne?'change':'changeno'"
           />
        </div>
      </div>
      



      <div class="smallBox_w">
        <div class="title_w">
          <img src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png" alt />
          <p>
            <span>语言</span>
            <span>-维度评分</span>
          </p>
        </div>
        <div
          class="grade_w"
          v-for="(item,index) in listTwo"
          :key="index"
          @click="changeTwo(index,item)"
          :id="item.isChoose ? 'choose_style' : 'grade_w'"
        >
          <p>
            <span>{{item.grade}}</span>
            <span>（{{item.fractionmin}}-{{item.fractionmax}}分）</span>
          </p>
          <p>{{item.describe}}</p>
        </div>
        <div class="calculation_w">
          <input
            type="button"
            class="subtraction"
            v-model="subtraction"
            @click="subtractionTwo"
            :id="this.numTwo>this.minTwo?'change':'changeno'"
          />
          <span class="num">{{numTwo}}</span>
          <input type="button" class="add" v-model="add" @click="addTwo"
          :id="this.numTwo<this.maxTwo?'change':'changeno'"
           />
        </div>
      </div>




      <div class="smallBox_w">
        <div class="title_w">
          <img src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png" alt />
          <p>
            <span>篇章</span>
            <span>-维度评分</span>
          </p>
        </div>
        <div
          class="grade_w"
          v-for="(item,index) in listThree"
          :key="index"
          @click="changeThree(index,item)"
          :id="item.isChoose ? 'choose_style' : 'grade_w'"
        >
          <p>
            <span>{{item.grade}}</span>
            <span>（{{item.fractionmin}}-{{item.fractionmax}}分）</span>
          </p>
          <p>{{item.describe}}</p>
        </div>
        <div class="calculation_w">
          <input
            type="button"
            class="subtraction"
            v-model="subtraction"
            @click="subtractionThree"
            :id="this.numThree>this.minThree?'change':'changeno'"
          />
          <span class="num">{{numThree}}</span>
          <input type="button" class="add" v-model="add" @click="addThree"
          :id="this.numThree<this.maxThree?'change':'changeno'"
           />
        </div>
      </div>




      
      <div class="smallBox_w">
        <div class="title_w">
          <img src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png" alt />
          <p>
            <span>书写</span>
            <span>-维度评分</span>
          </p>
        </div>
        <div
          class="grade_w"
          v-for="(item,index) in lastList"
          :key="index"
          @click="lastChange(index,item)"
          :id="item.isChoose ? 'choose_style' : 'grade_w'"
        >
          <p>
            <span>{{item.grade}}</span>
            <span>（{{item.fraction}}分）</span>
          </p>
          <p>{{item.describe}}</p>
        </div>
        <div class="calculation_w">
          <input type="button" class="subtraction" v-model="subtraction" />
          <span class="num">{{lastnum}}</span>
          <input type="button" class="add" v-model="add" />
        </div>
      </div>
      <div class="comment_w">
          <span>评语及修改意见（选填）</span>
          <textarea></textarea>
      </div>





      <div class="recording_w">
          <a-form-item>
              <!-- <a-textarea v-model="formData.writeGuide" style="width: 400px;height: 74px;" placeholder="如需文字指导请在此处输入"/> -->
              <a-button 
                ghost
                type="primary" 
                v-if="!isVoiceOK"
                @click="handleSoundInputClick"
                class="start_sound_input"
                >
                <div class="start_sound_inner" >
                  <span class="word">语音指导</span>
                  <span class="detail">（点击开始）</span>
                  <img src="../../assets/img/publish/mic_button.png"
                  style="width:14px;height:19px;"
                  >
                </div>
              </a-button>
              <!--  -->
              <div class="flota_sound_area" v-if="isSoundStart" style="width:400px;height:210px;border-radius:6px;background:white;position:relative;top:-260px;left:90px;">
                <div class="musk"></div>
                <div class="content">
                  <p class="sound_duration" style="width:100%;text-align:center;color:#FF6365;padding-top:40px;">{{secondDuration}}s</p>
                  <img 
                    src="../../assets/img/publish/audio_pause.png" 
                    @click="handleOverClick"
                    style="width:55px;height55px;margin:0 auto;display:block">
                  <p class="text_tips" style="font-size:14px;color:#848484;text-align:center">点击按钮  结束录制</p>
                </div>
              </div>
              <audio 
                v-show="false"
                id="userVoice"
                :src="formData.audioResource"
                controls="controls"></audio>
              <a-button 
                type="primary" 
                class="play_audio"
                v-if="isVoiceOK"
                @click="handlePlayClick"
                :id="this.changeWidth?'changeWidthto':'changeWidth'"
                >
                <div>
                  <span class="word">点击播放</span>
                  <img 
                    style="width: 26px;height: 26px;margin-left: 28px;"
                    src="../../assets/img/publish/audio_horn.png">
                </div>
              </a-button>
              <img 
                v-if="isVoiceOK"
                @click="handleDeleteAudio"
                src="../../assets/img/publish/del_audio.png"
                style="width: 26px;height: 26px;margin-left: 5px;cursor: pointer;position: absolute;left:0;top:0;">
            </a-form-item>
      </div>
      <p class="btn_w">确定</p>
    </div>
  </div>
  </div>
</template>
<script>
import http from '../../api/index'
import { MediaStreamRecorder } from '@/util/MediaStreamRecorder.js'
export default {
  data() {
    return {
      imgList:['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3893146502,314297687&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2174909441,2495215020&fm=26&gp=0.jpg'],
      listOne: [
          {
            grade: '一类',
            fractionmin: 17,
            fractionmax: 20,
            describe: '切合题意，思想健康，中心突出，内容充实，感情真切',
            isChoose: false
          },
          {
            grade: '二类',
            fractionmin: 13,
            fractionmax: 16,
            describe: '切合题意，思想健康，中心明确，内容具体，感情真实',
            isChoose: true
          },
          {
            grade: '三类',
            fractionmin: 9,
            fractionmax: 12,
            describe:'基本合题意，思想健康，中心比较明确，内容比较具体 ，感受比较真实',
            isChoose: false
          },
          {
            grade: '四类',
            fractionmin: 5,
            fractionmax: 8,
            describe: '偏离题意，思想健康，中心欠明确，内容不够具体',
            isChoose: false
          },
          {
            grade: '五类',
            fractionmin: 0,
            fractionmax: 4,
            describe: '文不对题，不知所云，中心不明确，内容不具体',
            isChoose: false
          }
      ],
      listTwo: [
          {
            grade: '一类',
            fractionmin: 14,
            fractionmax: 16,
            describe: '语言流畅，生动无语病，表达好',
            isChoose: false
          },
          {
            grade: '二类',
            fractionmin: 11,
            fractionmax: 13,
            describe: '语言通顺偶有语病，表达较好',
            isChoose: true
          },
          {
            grade: '三类',
            fractionmin: 8,
            fractionmax: 10,
            describe: '语言尚通顺，语病不多',
            isChoose: false
          },
          {
            grade: '四类',
            fractionmin: 5,
            fractionmax: 7,
            describe: '语言不通顺，语病较多',
            isChoose: false
          },
          {
            grade: '五类',
            fractionmin: 0,
            fractionmax: 4,
            describe: '语病严重, 文理不通',
            isChoose: false
          }
      ],
      listThree: [
          {
            grade: '一类',
            fractionmin: 9,
            fractionmax: 10,
            describe: '结构完整层次清楚条理清楚构思新颖',
            isChoose: false
          },
          {
            grade: '二类',
            fractionmin: 7,
            fractionmax: 8,
            describe: '结构完整条理较清楚',
            isChoose: true
          },
          {
            grade: '三类',
            fractionmin: 5,
            fractionmax: 6,
            describe: '条理尚清楚结构基本完整能分段',
            isChoose: false
          },
          {
            grade: '四类',
            fractionmin: 3,
            fractionmax: 4,
            describe: '结构欠完整条理不清楚',
            isChoose: false
          },
          {
            grade: '五类',
            fractionmin: 0,
            fractionmax: 2,
            describe: '结构混乱不能完篇',
            isChoose: false
          }
      ],
      lastList: [
        {
          grade: '一类',
          fraction: 4,
          describe: '字体工整书写规范，卷面整洁',
          isChoose: false
        },
        {
          grade: '二类',
          fraction: 3,
          describe: '字体工整书写规范，卷面较整洁',
          isChoose: true
        },
        {
          grade: '三类',
          fraction: 2,
          describe: '字迹清楚，有少量错别字，少量涂改',
          isChoose: false
        },
        {
          grade: '四类',
          fraction: 1,
          describe: '字迹潦草，错别字较多',
          isChoose: false
        },
        {
          grade: '五类',
          fraction: 0,
          describe: '字迹不易辨认，错别字多，卷面不整洁',
          isChoose: false
        }
      ],
      add: '+',
      subtraction: '—',
      numOne:16,
      maxOne:16,
      minOne:13,
      numTwo:13,
      maxTwo:13,
      minTwo:11,
      numThree:8,
      maxThree:8,
      minThree:7,
      lastnum:3,
      score:0,
      isVoiceOK: false,
      audioResource: null,
      isSoundStart: false,
      secondDuration: 0,
      changeWidth:true,
      formData: {
        audioResource: null
      },
    }
  },
  mounted(){
      this.score=this.numOne+this.numTwo+this.numThree+this.lastnum*1;
      // let url='/api/student/homework/composition/info';
      // let url=' /api/teacher/homework/question/info';
      // let url='/api/teacher/homework/compositionReview';
      let url='/api/question/compositionScore';
      http.get(url).then(data=>{
        console.log(data)
      })
  },
  computed:{
      
  },
  methods: {
      // 录音
    handleSoundInputClick() {
      this.isSoundStart = true;
      this.secondDuration = 0
      this.captureRecord()
      this.intervaltimerid = setInterval(() => {
        this.secondDuration++
      }, 1000)
    },
    // 录音结束
    handleOverClick() {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.stop();
      this.isVoiceOK = true;
      this.isSoundStart = false;
      this.secondDuration = 0;
      this.changeWidth=false;
    },
    // 删除录音
    handleDeleteAudio() {
      this.isVoiceOK = false;
      this.formData.audioResource = null;
      this.changeWidth=true;
    },
    // 点击播放按钮
    handlePlayClick() {
      let userVoice = document.getElementById('userVoice');
      userVoice.play();
    },
    // 错误处理方法
    onMediaError(err) {
      console.log('阿偶~您的浏览器貌似不支持录音哦...', err);
      clearInterval(this.intervaltimerid);
      this.isSoundStart = false;
      this.$message.error('您的浏览器暂不支持录音功能');
    },
    // 成功
    onMediaSuccess(stream) {
      this.mediaRecorder = new MediaStreamRecorder(stream);
      // 获取音频流
      this.mediaRecorder.stream = stream;
      this.mediaRecorder.mimeType = 'audio/wav';
      this.mediaRecorder.ondataavailable = (blob) => {
        clearInterval(this.intervaltimerid);
        const url = URL.createObjectURL(blob);
        this.formData.audioResource = url;

        let fd = new FormData();
        fd.append('file', blob);
        http.post(`/teacherApi/upload/uploadCommonFile/voice/homework/composition`, fd, {
          headers: {
            upload: true
          }
        }).then(res => {
          console.log(res);
          this.formData.audioResource = res.data.infos[0];
        }).catch(err => {
          console.log(err);
        })

      }
      // 定义间隔
      this.mediaRecorder.start(60 * 1000);
    },
    // 开始记录方法
    captureRecord() {
      navigator.mediaDevices
        .getUserMedia({
          audio: true
        })
        .then(this.onMediaSuccess)
        .catch(this.onMediaError)
    },
    // 弹框关闭
    handleDialogClose() {
      this.showGroupModal = false;
    },





    addTo(){
        this.score=this.numOne+this.numTwo+this.numThree+this.lastnum;
    },
    changeOne(index, item) {
      this.listOne.map(val => {
        val.isChoose ? (val.isChoose = false) : '';
      })
      this.listOne[index].isChoose = true;
      this.numOne=item.fractionmax;
      this.maxOne=item.fractionmax;
      this.minOne=item.fractionmin;
      this.addTo();
    },
    addOne(){
        if(this.numOne<this.maxOne){
            this.numOne++;
            this.addTo();
        }
    },
    subtractionOne(){
        if(this.numOne>this.minOne){
            this.numOne--;
            this.addTo();
        }
    },
    changeTwo(index, item) {
      this.listTwo.map(val => {
        val.isChoose ? (val.isChoose = false) : '';
      })
      this.listTwo[index].isChoose = true;
      this.numTwo=item.fractionmax;
      this.maxTwo=item.fractionmax;
      this.minTwo=item.fractionmin;
      this.addTo();
    },
    addTwo(){
        if(this.numTwo<this.maxTwo){
            this.numTwo++;
            this.addTo();
        }
    },
    subtractionTwo(){
        if(this.numTwo>this.minTwo){
            this.numTwo--;
            this.addTo();
        }
    },
    changeThree(index, item) {
      this.listThree.map(val => {
        val.isChoose ? (val.isChoose = false) : '';
      })
      this.listThree[index].isChoose = true;
      this.numThree=item.fractionmax;
      this.maxThree=item.fractionmax;
      this.minThree=item.fractionmin;
      this.addTo();
    },
    addThree(){
        if(this.numThree<this.maxThree){
            this.numThree++;
            this.addTo();
        }
    },
    subtractionThree(){
        if(this.numThree>this.minThree){
            this.numThree--;
            this.addTo();
        }
    },
    lastChange(index,item){
        this.lastList.map(val => {
            val.isChoose ? val.isChoose = false : '';
        })
        this.lastList[index].isChoose = true;
        this.lastnum=item.fraction;
        this.addTo();
    },
  }
}
</script>
<style lang="scss" scoped>
.fatherBox {
  width: 100%;
  height: 2090px;
  background: #f0f7ff;
}
.box_w {
  width: 1185px;
  height: 100%;
  margin: 10px auto 0;
//   background: red;
  .left_w {
    width: 520px;
    height: 1914px;
    float: left;
    background: white;
    border-radius: 4px;
    p {
      width: 104px;
      height: 24px;
      background: #ffb463;
      text-align: center;
      line-height: 24px;
      margin: 20px 0 0 20px;
      border-radius: 12px;
      color: #ffffff;
      font-size: 14px;
    }
    img {
      width: 476px;
      height: 536px;
      margin: 16px 0 0 20px;
      background: black;
      display: block;
      border-radius: 10px;
      border: 1px solid #b9b9b9;
    }
  }
  .right_w {
    width: 650px;
    height: 2015px;
    float: left;
    margin-left: 15px;
    background: white;
    border-radius: 4px;
    .score_w {
      width: 82px;
      height: 98px;
      border: 1px solid #e9e9e9;
      border-radius: 5px 5px 70px 70px;
      background: pink;
      position: relative;
      top: 1px;
      left: 550px;
      span:nth-child(1) {
        font-size: 12px;
        color: #aaaaaa;
        margin: 12px 0 0 28px;
        display: block;
      }
      span:nth-child(2) {
        font-size: 30px;
        color: #0710a0;
        margin-top: 0px;
        text-align: center;
        width: 100%;
        display: inline-block;
      }
      img {
        width: 54px;
        height: 21px;
        margin: -32px 0 0 21px;
      }
    }
    .top_w {
      margin: 20px 0 0 20px;
      span {
        width: 104px;
        height: 24px;
        background: #ffb463;
        text-align: center;
        line-height: 24px;
        border-radius: 12px;
        color: #ffffff;
        font-size: 14px;
        display: inline-block;
      }
      a {
        color: #1059ff;
        font-size: 12px;
        margin-left: 12px;
      }
    }
    .smallBox_w {
      width: 610px;
      // height: 385px;
      height: 390px;
      border: 1px solid #dedede;
      border-radius: 6px;
      margin: 26px 0 0 20px;
      .title_w {
        height: 36px;
        position: relative;
        top: -10px;
        left: 3px;
        img {
          width: 112px;
          height: 36px;
        }
        p {
          position: relative;
          top: -30px;
          left: 10px;
          span:nth-child(1) {
            color: #1059ff;
            font-size: 16px;
          }
          span:nth-child(2) {
            color: #1059ff;
            font-size: 14px;
          }
        }
      }
      .grade_w {
        width: 590px;
        height: 50px;
        border: 1px solid #dedede;
        border-radius: 6px;
        margin: 10px 0 0 10px;
        cursor: pointer;
        p:nth-child(1) {
          width: 70px;
          height: 50px;
          background: #e4e7ea;
          border-radius: 6px 0 0 6px;
          float: left;
          span:nth-child(1) {
            display: block;
            color: #4e5f71;
            font-size: 16px;
            text-align: center;
            margin-top: 5px;
          }
          span:nth-child(2) {
            display: block;
            color: #4e5f71;
            font-size: 12px;
            text-align: center;
          }
        }
        p:nth-child(2) {
          float: left;
          font-size: 15px;
          color: #4e5f71;
          padding-left: 10px;
          line-height: 50px;
        }
      }
      .calculation_w {
        width: 103px;
        height: 34px;
        border: 1px solid #1059ff;
        margin-left: 496px;
        margin-top: 10px;
        border-radius: 4px;
        overflow: hidden;
        .add {
          width: 33px;
          height: 32px;
          font-size: 15px;
          float: left;
          border: none;
          color: rgb(131, 146, 167);
          background: white;
          cursor: pointer;
        }
        .num {
          width: 35px;
          height: 34px;
          font-size: 16px;
          display: inline-block;
          float: left;
          text-align: center;
          line-height: 34px;
          color: #1059ff;
          border-left: 1px solid #cad3df;
          border-right: 1px solid #cad3df;
        }
        .subtraction {
          width: 33px;
          height: 32px;
          font-size: 15px;
          float: left;
          border: none;
          color: rgb(131, 146, 167);
          background: white;
          cursor: pointer;
        }
      }
    }
    .comment_w{
        width: 610px;
        height: 110px;
        border-radius: 10px;
        border: 1px solid #CAD3DF;
        margin: 20px 0 0 20px;
        overflow: hidden;
        span{
            width: 120px;
            height: 110px;
            display: inline-block;
            background:#EBF3FA;
            color: #4E5F71;
            font-size: 14px;
            text-align: center;
            float: left;
            border-right: 1px solid #CAD3DF;
            padding-top: 34px;
        }
        textarea{
            resize:none;
            border: none;
            height: 100%;
            width: 488px; 
            float: left;
        }
    }
    .recording_w{
        width: 610px;
        height: 40px;
        border-radius: 5px;
        // border: 1px solid #1059FF;
        margin: 29px 0 0 20px;
    }
    .btn_w{
        width: 100px;
        height: 36px;
        font-size: 14px;
        border: none;
        border-radius: 18px;
        background: #1059FF;
        color: white;
        text-align: center;
        line-height: 36px;
        margin: 20px 0 0 530px;
        cursor: pointer;
    }
  }
}

#choose_style {
  border: 1px solid #1059ff;
  p:nth-child(1) {
    background: #1059ff;
    span:nth-child(1) {
      color: white;
    }
    span:nth-child(2) {
      color: white;
    }
  }
  p:nth-child(2) {
    color: #1059ff;
  }
}
#grade_w {
  border: 1px solid #dedede;
  p:nth-child(1) {
    background: #e4e7ea;
    span:nth-child(1) {
      color: #4e5f71;
    }
    span:nth-child(2) {
      color: #4e5f71;
    }
  }
  p:nth-child(2) {
    color: #4e5f71;
  }
}
#change{
    color: white;
    background: #1059FF;
}
#changeno{
    color: rgb(131, 146, 167);
    background: white;
}
.ant-btn{
    width: 100%;
    height: 40px;
    border: 1px solid #1059FF;
}
#changeWidth{
    width: 94%;
}
#changeWidthto{
    width: 100%;
}
</style>