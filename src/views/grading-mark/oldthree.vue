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
            <span>（{{item.scoreStart}}-{{item.scoreEnd}}分）</span>
          </p>
          <p>{{item.scoreContent}}</p>
        </div>
        <div class="calculation_w">
          <input
            type="button"
            class="subtraction"
            v-model="subtraction"
            @click="subtractionOne"
          />
          <span class="num">{{numOne}}</span>
          <input type="button" class="add" v-model="add" @click="addOne"
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
            <span>（{{item.scoreStart}}-{{item.scoreEnd}}分）</span>
          </p>
          <p>{{item.scoreContent}}</p>
        </div>
        <div class="calculation_w">
          <input
            type="button"
            class="subtraction"
            v-model="subtraction"
            @click="subtractionTwo"
          />
          <span class="num">{{numTwo}}</span>
          <input type="button" class="add" v-model="add" @click="addTwo"
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
            <span>（{{item.scoreStart}}-{{item.scoreEnd}}分）</span>
          </p>
          <p>{{item.scoreContent}}</p>
        </div>
        <div class="calculation_w">
          <input
            type="button"
            class="subtraction"
            v-model="subtraction"
            @click="subtractionThree"
          />
          <span class="num">{{numThree}}</span>
          <input type="button" class="add" v-model="add" @click="addThree"
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
            <span>（{{item.scoreEnd}}分）</span>
          </p>
          <p>{{item.scoreContent}}</p>
        </div>
        <div class="calculation_w">
          <input type="button" class="subtraction" v-model="subtraction" @click="lastSubtraction"/>
          <span class="num">{{lastnum}}</span>
          <input type="button" class="add" v-model="add" @click="lastAdd"/>
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
    listOne:[],
    listTwo:[],
    listThree:[],
    lastList:[],
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
    // let url='/api/teacher/homework/compositionReview';
    let url='/api/question/compositionScore';
    http.get(url).then(({data})=>{
      // console.log(data)
        data.infos.map(val=>{
            if(val.scoreStandardModel==='1'){
                this.listOne.push(val)
            }
            if(val.scoreStandardModel==='2'){
                this.listTwo.push(val)
            }
            if(val.scoreStandardModel==='3'){
                this.listThree.push(val)
            }
            if(val.scoreStandardModel==='4'){
                this.lastList.push(val)
            }
        })
        for(let i=0;i<this.listOne.length;i++){
            this.listOne[i].isChoose = false;
            this.listOne[1].isChoose = true;
            this.listOne[0].grade='一类';
            this.listOne[1].grade='二类';
            this.listOne[2].grade='三类';
            this.listOne[3].grade='四类';
            this.listOne[4].grade='五类';
        }
        for(let i=0;i<this.listTwo.length;i++){
            this.listTwo[i].isChoose = false;
            this.listTwo[1].isChoose = true;
            this.listTwo[0].grade='一类';
            this.listTwo[1].grade='二类';
            this.listTwo[2].grade='三类';
            this.listTwo[3].grade='四类';
            this.listTwo[4].grade='五类';
        }
        for(let i=0;i<this.listThree.length;i++){
            this.listThree[i].isChoose = false;
            this.listThree[1].isChoose = true;
            this.listThree[0].grade='一类';
            this.listThree[1].grade='二类';
            this.listThree[2].grade='三类';
            this.listThree[3].grade='四类';
            this.listThree[4].grade='五类';
        }
        for(let i=0;i<this.lastList.length;i++){
            this.lastList[i].isChoose = false;
            this.lastList[1].isChoose = true;
            this.lastList[0].grade='一类';
            this.lastList[1].grade='二类';
            this.lastList[2].grade='三类';
            this.lastList[3].grade='四类';
            this.lastList[4].grade='五类';
        }
    });
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
    addSubtractionOne(){
      if(this.numOne>=17&&this.numOne<=20){
        this.listOne.map(val=>{
          val.isChoose=false;
          this.listOne[0].isChoose=true;
        })
      }
      if(this.numOne>=13&&this.numOne<=16){
        this.listOne.map(val=>{
          val.isChoose=false;
          this.listOne[1].isChoose=true;
        })
      }
      if(this.numOne>=9&&this.numOne<=12){
        this.listOne.map(val=>{
          val.isChoose=false;
          this.listOne[2].isChoose=true;
        })
      }
      if(this.numOne>=5&&this.numOne<=8){
        this.listOne.map(val=>{
          val.isChoose=false;
          this.listOne[3].isChoose=true;
        })
      }
      if(this.numOne>=0&&this.numOne<=4){
        this.listOne.map(val=>{
          val.isChoose=false;
          this.listOne[4].isChoose=true;
        })
      }
    },
    changeOne(index, item) {
      this.listOne.map(val => {
        val.isChoose ? (val.isChoose = false) : '';
      })
      this.listOne[index].isChoose = true;
      this.numOne=item.scoreEnd;
      this.maxOne=item.scoreEnd;
      this.minOne=item.scoreStart;
      this.addTo();
    },
    addOne(){
      if(this.numOne<20){
        this.numOne++;
        this.addTo();
      }
      this.addSubtractionOne();
    },
    subtractionOne(){
      if(this.numOne>0){
        this.numOne--;
        this.addTo();
      }
      this.addSubtractionOne();      
    },
    addSubtractionTwo(){
      if(this.numTwo>=14&&this.numTwo<=16){
        this.listTwo.map(val=>{
          val.isChoose=false;
          this.listTwo[0].isChoose=true;
        })
      }
      if(this.numTwo>=11&&this.numTwo<=13){
        this.listTwo.map(val=>{
          val.isChoose=false;
          this.listTwo[1].isChoose=true;
        })
      }
      if(this.numTwo>=8&&this.numTwo<=10){
        this.listTwo.map(val=>{
          val.isChoose=false;
          this.listTwo[2].isChoose=true;
        })
      }
      if(this.numTwo>=5&&this.numTwo<=7){
        this.listTwo.map(val=>{
          val.isChoose=false;
          this.listTwo[3].isChoose=true;
        })
      }
      if(this.numTwo>=0&&this.numTwo<=4){
        this.listTwo.map(val=>{
          val.isChoose=false;
          this.listTwo[4].isChoose=true;
        })
      }
    },
    changeTwo(index, item) {
      this.listTwo.map(val => {
        val.isChoose ? (val.isChoose = false) : '';
      })
      this.listTwo[index].isChoose = true;
      this.numTwo=item.scoreEnd;
      this.maxTwo=item.scoreEnd;
      this.minTwo=item.scoreStart;
      this.addTo();
    },
    addTwo(){
        if(this.numTwo<16){
            this.numTwo++;
            this.addTo();
        }
        this.addSubtractionTwo();
    },
    subtractionTwo(){
        if(this.numTwo>0){
            this.numTwo--;
            this.addTo();
        }
        this.addSubtractionTwo();
    },
    addSubtractionThree(){
      if(this.numThree>=9&&this.numThree<=10){
        this.listThree.map(val=>{
          val.isChoose=false;
          this.listThree[0].isChoose=true;
        })
      }
      if(this.numThree>=7&&this.numThree<=8){
        this.listThree.map(val=>{
          val.isChoose=false;
          this.listThree[1].isChoose=true;
        })
      }
      if(this.numThree>=5&&this.numThree<=6){
        this.listThree.map(val=>{
          val.isChoose=false;
          this.listThree[2].isChoose=true;
        })
      }
      if(this.numThree>=3&&this.numThree<=4){
        this.listThree.map(val=>{
          val.isChoose=false;
          this.listThree[3].isChoose=true;
        })
      }
      if(this.numThree>=0&&this.numThree<=2){
        this.listThree.map(val=>{
          val.isChoose=false;
          this.listThree[4].isChoose=true;
        })
      }
    },
    changeThree(index, item) {
      this.listThree.map(val => {
        val.isChoose ? (val.isChoose = false) : '';
      })
      this.listThree[index].isChoose = true;
      this.numThree=item.scoreEnd;
      this.maxThree=item.scoreEnd;
      this.minThree=item.scoreStart;
      this.addTo();
    },
    addThree(){
      if(this.numThree<10){
          this.numThree++;
          this.addTo();
      }
      this.addSubtractionThree();
    },
    subtractionThree(){
      if(this.numThree>0){
        this.numThree--;
        this.addTo();
      }
      this.addSubtractionThree();
    },
    lastAddSubtraction(){
      if(this.lastnum===4){
        this.lastList.map(val=>{
          val.isChoose=false;
          this.lastList[0].isChoose=true;
        })
      }
      if(this.lastnum==3){
        this.lastList.map(val=>{
          val.isChoose=false;
          this.lastList[1].isChoose=true;
        })
      }
      if(this.lastnum==2){
        this.lastList.map(val=>{
          val.isChoose=false;
          this.lastList[2].isChoose=true;
        })
      }
      if(this.lastnum==1){
        this.lastList.map(val=>{
          val.isChoose=false;
          this.lastList[3].isChoose=true;
        })
      }
      if(this.lastnum==0){
        this.lastList.map(val=>{
          val.isChoose=false;
          this.lastList[4].isChoose=true;
        })
      }
    },
    lastChange(index,item){
        this.lastList.map(val => {
            val.isChoose ? val.isChoose = false : '';
        })
        this.lastList[index].isChoose = true;
        this.lastnum=item.scoreEnd;
        this.addTo();
    },
    lastAdd(){
      if(this.lastnum<4){
          this.lastnum++;
          this.addTo();
      }
      this.lastAddSubtraction();
    },
    lastSubtraction(){
      if(this.lastnum>0){
          this.lastnum--;
          this.addTo();
      }
      this.lastAddSubtraction();
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
        .add:hover{
          color: white;
          background: #1059FF;
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
        .subtraction:hover{
          color: white;
          background: #1059FF;
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