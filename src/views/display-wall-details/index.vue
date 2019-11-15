<template>
<div style="width:100%;height:2000px;background:#f0f7ff;scrollbar-width: none;">
    <div class="displayWallDetails_w">
        <div style="width:1180px;margin:26px auto 18px;">
            <a-breadcrumb separator=">">
                <a-breadcrumb-item>
                    <router-link to="/display-wall">作文任务</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                <router-link to="/display-wall">展示墙</router-link>
                    </a-breadcrumb-item>
                <a-breadcrumb-item>作文详情（韩梅梅）</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="head_w">
            <span>标题</span>
            <p>
                <span>16</span>
                <img src="../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
            </p>
            <p>
                <span>得分</span>
                <span>50</span>
                <img src="../../assets/img/grading-assignment/over_score.png" alt="">
            </p>
            <p>一次难忘的旅行</p>
            <p>
                <span>作者</span>
                <span>韩梅梅</span>
            </p>
            <i></i>
            <p>
                <span>作文要求</span>
                <span>命题作文</span>
                <span>记叙文</span>
                <span>作文字数不少于600</span>
                <span>满分50</span>
            </p>
            <div class="analyticalGuidance_w" v-show="open">
                <i></i>
                <p>写作分析指导</p>
                <div class="paly_w">
                    <audio 
                    v-show="false"
                    id="userVoice"
                    :src="audioResource"
                    controls="controls"></audio>
                    <a-button 
                        type="primary" 
                        class="play_audio"
                        @click="handlePlayClick"
                        v-if="true"
                        style="width:360px;height:40px;border-radius:5px;">
                        <div>
                        <span style="font-size:14px;">点击播放</span>
                        <img 
                            style="width: 20px;height: 18px;margin-left: 12px;"
                            src="../../assets/img/publish/audio_horn.png">
                        </div>
                    </a-button>
                    <p>突出旅行中通过观察人和事所获得的感悟</p>
                </div>
                <div class="read_w">
                    <span>阅读材料</span>
                    <img src="../../assets/img/grading-assignment/pic_chinese_reading_pianmuxiangqing_zuodaxiangqing_pingfentupian@2x.png" alt="">
                </div>
                <div class="modelProvision_w">
                    <span>范文提供</span>
                    <img src="../../assets/img/grading-assignment/pic_chinese_reading_pianmuxiangqing_zuodaxiangqing_pingfentupian@2x.png" alt="">
                </div>
            </div>
            <p @click="open=!open">  
                <img :id="open?'rotate_w':'rotateTwo_w'" src="../../assets/img/grading-assignment/open.png" alt="">
                <span>{{open ? '收起' : '展开'}}</span>
            </p>
        </div>
        <div class="content_w">
            <p>-- 作文内容 --</p>
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1688026885,2773767715&fm=26&gp=0.jpg" alt="">
            <img src="../../assets/img/grading-assignment/btn_zuowen_rotate_normal@2x.png" alt="">
            <div class="commentList_w">
                <p>作文评论（5）</p>
                <div class="comment_w">
                    <span>老师</span>
                    <p>
                        <span>主题标新立异，文字流畅，语言细腻！书写方面需要加强，拟人手法过多需要注意。</span>
                        <span>2019/07/23 20：21</span>
                        <i></i>
                        <img src="../../assets/img/publish/ssss.png" alt="" @click="deleteShow=true">
                    </p>
                </div>
                <div class="comment_w">
                    <span>老师</span>
                    <p>
                        <span>主题标新立异，文字流畅，语言细腻！书写方面需要加强，拟人手法过多需要注意。</span>
                        <span>2019/07/23 20：21</span>
                        <i></i>
                        <img src="../../assets/img/publish/ssss.png" alt="" @click="deleteShow=true">
                    </p>
                </div>
            </div>
            <h1 style="height:30px"></h1>
        </div>





        <div class="footer_w">
            <p>
                <img src="../../assets/img/grading-assignment/btn_zuoye_zan_normal@2x.png" alt="">
                <span>13</span>
                <b></b>
                <span>赞</span>
            </p>
            <p>
                <img src="../../assets/img/grading-assignment/btn_zuoye_pinglun_normal@2x.png" alt="">
                <b></b>
                <span @click="commentsShow=true">发表评论</span>
            </p>
        </div>
        <div class="comments_w" v-show="commentsShow">
            <p>评论内容
                <img src="../../assets/close.png" alt="" @click="commentsShow=false">
            </p>
            <textarea placeholder="请输入评语"></textarea>
            <p>
                <button @click="commentsShow=false">取消</button>
                <button>发表评语</button>
            </p>
            <h6></h6>
        </div>
        <div class="deleteComments_w" v-show="deleteShow">
            <p>提示
                <img src="../../assets/close.png" alt="" @click="deleteShow=false">
            </p>
            <p>是否确定删除此评论？</p>
            <p>
                <button @click="deleteShow=false">取消</button>
                <button>确定</button>
            </p>
            <h6></h6>
        </div>
    </div>
</div>    
</template>

<script>
import { open } from 'fs';
export default {
    data(){
        return{
            audioResource:'',
            open:false,
            commentsShow:false,
            deleteShow:false
        }
    },
    methods:{
        handlePlayClick() {
            let userVoice = document.getElementById('userVoice');
            userVoice.play();
        }
    }
}
</script>

<style lang="scss" scoped>
    #rotate_w{
        transform:rotate(180deg);
    }
    #rotateTwo_w{
        transform:rotate(0deg);
    }
    .displayWallDetails_w{
        width: 1180px;
        margin: 0 auto;
        position: relative;
        .head_w{
            width: 100%;
            // height: 146px;
            height: 100%;
            border-radius: 4px;
            background: #ffffff;
            position: relative;
            >span:nth-child(1){
                display: inline-block;
                width: 44px;
                height: 24px;
                background: #56ACFF;
                border-radius: 0 12px 12px 0;
                color: #FFFFFF;
                text-align: center;
                line-height: 24px;
                position: absolute;
                left: 0;
                top: 14px;
            }
            >p:nth-child(2){
                width: 46px;
                height: 46px;
                border: 1px solid #FF7077;
                border-radius: 50%;
                position: absolute;
                left: 672px;
                top: 20px;
                span{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    font-size: 14px;
                    color: #FF7077;
                    margin-top: 5px;
                }
                img{
                    width: 20px;
                    height: 20px;
                    margin-left: 13px;
                    margin-top: -3px;
                    display: block;
                }
            }
            >p:nth-child(3){
                width: 82px;
                height: 98px;
                position: absolute;
                top: 1px;
                right: 18px;
                border: 1px solid #E9E9E9;
                border-radius: 5px 5px 70px 70px;
                // z-index: 1;
                background: #ffffff;
                span:nth-child(1){
                    width: 100%;
                    text-align: center;
                    color: #AAAAAA;
                    font-size: 12px;
                    margin-top: 12px;
                    display: block;
                }
                span:nth-child(2){
                    width: 100%;
                    text-align: center;
                    color: #0710A0;
                    font-size: 30px;
                    display: block;
                }
                img{
                    width: 54px;
                    height: 21px;
                    margin-left: 21px;
                    margin-top: -32px;
                }
            }
            >p:nth-child(4){
                width: 100%;
                text-align: center;
                color: #4E5F71;
                font-size: 16px;
                margin-top: 18px;
                display: inline-block;
            }
            >p:nth-child(5){
                width: 100%;
                text-align: center;
                color: #56ACFF;
                margin-top: 7px;
                span:nth-child(1){
                    width: 56px;
                    height: 24px;
                    font-size: 12px;
                    border: 1px solid #56ACFF;
                    border-radius: 12px;
                    display: inline-block;
                    text-align: center;
                    line-height: 24px;
                    margin-right: 10px;
                }
                span:nth-child(2){
                    font-size: 14px;
                    display: inline-block;
                    text-align: center;
                    line-height: 25px;
                }
            }
            i:nth-child(6){
                display: block;
                width: 1100px;
                height: 1px;
                background: #DDDDDD;
                margin: 12px auto 7px;
            }
            >p:nth-child(7){
                text-align: center;
                span:nth-child(1){
                    font-size: 12px;
                    color: #999999;
                    line-height: 24px;
                }
                span:nth-child(2){
                    font-size: 16px;
                    color: #5E84AD;
                    padding: 0 20px;
                    border-right: 1px solid #EEEEEE;
                }
                span:nth-child(3){
                    font-size: 16px;
                    color: #5E84AD;
                    padding: 0 20px;
                    border-right: 1px solid #EEEEEE;
                }
                span:nth-child(4){
                    font-size: 16px;
                    color: #5E84AD;
                    padding: 0 20px;
                    border-right: 1px solid #EEEEEE;
                }
                span:nth-child(5){
                    font-size: 16px;
                    color: #5E84AD;
                    margin-left: 20px;
                }
            }
            .analyticalGuidance_w{
                // background: red;
                height: 185px;
                i{
                    display: block;
                    width: 1100px;
                    height: 1px;
                    background: #DDDDDD;
                    margin: 12px auto 7px;
                }
                >p{
                    width: 90px;
                    height: 24px;
                    border-radius: 12px;
                    border: 1px solid #FFB463;
                    color: #F4781E;
                    font-size: 12px;
                    text-align: center;
                    line-height: 24px;
                    margin: 0px 0px 8px 20px;
                }
                .paly_w{
                    width: 370xp;
                    height: 140px;
                    // background: pink;
                    margin-left: 20px;
                    float: left;
                    >p{
                        display: block;
                        width: 360px;
                        height: 80px;
                        border-radius: 6px;
                        border: 1px solid #DEDEDE;
                        margin-top: 20px;
                        font-size: 14px;
                        color: #4E5F71;
                        padding: 20px 0 0 20px;
                        background: #ffffff;
                    }
                }
                .read_w,.modelProvision_w{
                    width: 370px;
                    height: 140px;
                    border-radius: 6px;
                    border: 1px solid #DEDEDE;
                    margin-left: 20px;
                    position: relative;
                    float: left;                    
                    span{
                        position: absolute;
                        display: block;
                        top: 15px;
                        left: -2px;
                        width: 60px;
                        height: 24px;
                        border: 1px solid #56ACFF;
                        border-radius: 0 12px 12px 0;
                        font-size: 12px;
                        color: #56ACFF;
                        text-align: center;
                        line-height: 24px;
                    }
                    img{
                        width: 61px;
                        height: 61px;
                        margin: 39px 154px;
                    }
                }
                // .modelProvision_w{

                // }
            }
            >p:last-child{
                width: 55px;
                text-align: center;
                margin-top: 5px;
                cursor: pointer;
                margin-left: 560px;
                img{
                    width: 14px;
                    height: 14px;
                    margin-right: 10px;
                    margin-top: -4px;
                }
                span{
                    font-size: 14px;
                    color: #86939E;
                }
            }
        }
        .content_w{
            width: 100%;
            background: #ffffff;
            margin-top: 11px;
            border-radius: 4px 0 0 0;
            position: relative;
            >p{
                width: 134px;
                height: 24px;
                background: #FFB463;
                border-radius: 12px;
                margin: 20px 523px;
                text-align: center;
                line-height: 24px;
                display: inline-block;
            }
            img:nth-child(2){
                width: 1140px;
                height: 760px;
                border: 1px solid #B9B9B9;
                border-radius: 10px;
                margin: 0 20px 29px 20px;
            }
            img:nth-child(3){
                width: 49px;
                height: 49px;
                position: absolute;
                right: 21px;
                top: 74px;
            }
            .commentList_w{
                width: 1140px;
                margin: 0 auto;
                border: 1px solid #DEDEDE;
                border-radius: 6px;
                >p{
                    width: 112px;
                    height: 36px;
                    background-image: url('../../assets/img/grading-assignment/bg_zuowen_title@2x.png');
                    background-size:100%100%;
                    font-size: 14px;
                    color: #1059FF;
                    line-height: 36px;
                    text-align: center;
                    margin: -10px 0 0 2px;
                }
                .comment_w{
                    width: 1096px;
                    height: 100px;
                    border: 1px solid #DEDEDE;
                    border-radius: 6px;
                    margin: 10px auto 0;
                    >span:nth-child(1){
                        width: 56px;
                        height: 24px;
                        display: block;
                        background-image: url('../../assets/img/grading-assignment/bg_zuowen_teacher_title@2x.png');
                        background-size:100%100%;
                        font-size: 12px;
                        color: #ffffff;
                        text-align: center;
                        line-height: 24px;
                        margin: 2px 0 0 -3px;
                    }
                    >p{ 
                        width: 100%;
                        margin-top: 21px;
                        padding-left: 22px;
                        
                        span:nth-child(1){
                            font-size: 14px;
                            color: #4E5F71;
                            float: left;
                        }
                        span:nth-child(2){
                            margin-left: 240px;
                            font-size: 12px;
                            color: #999999;
                            float: left;
                        }
                        i{
                            width: 1px;
                            height: 50px;
                            background: #EEEEEE;
                            margin-left: 39px;
                            display: block;
                            float: left;
                            margin-top: -20px;
                        }
                        img{
                            width: 24px;
                            height: 26px;
                            margin-left: 69px;
                            display: inline-block;
                            border:none;
                            margin-top: -10px;
                            cursor: pointer;
                        }
                    }
                }
                .comment_w:last-child{
                    margin-bottom: 20px;
                }
            }
        }
        .footer_w{
            width: 100%;
            height: 60px;
            position: fixed;
            left: 0px;
            bottom: 0px;
            background: #ffffff;
            >p{
                width: 120px;
                height: 36px;
                border-radius: 18px;
                background: #1059FF;
                line-height: 36px;
                float: left;
                cursor: pointer;
            }
            >p:nth-child(1){
                margin: 12px 20px 12px 67%;
                img{
                    width: 12px;
                    height: 15px;
                    margin: 10px 7px 0 22px;
                    float: left;
                }
                span:nth-child(2){
                    color: #ffffff;
                    font-size: 18px;
                    display: block;
                    float: left;
                }
                b{
                    width: 1px;
                    height: 20px;
                    background: #0948D6;
                    display: block;
                    margin: 8px 7px ;
                    float: left;
                }
                span:nth-child(4){
                    color: #ffffff;
                    font-size: 14px;
                    display: block;
                    float: left;
                }
            }
            >p:nth-child(2){
                margin-top: 12px;
                img{
                    width: 12px;
                    height: 12px;
                    margin: 12px 5px 0 18px;
                    float: left;
                }
                b{
                    width: 1px;
                    height: 20px;
                    background: #0948D6;
                    display: block;
                    margin: 8px 5px;
                    float: left;
                }
                span:nth-child(3){
                    color: #ffffff;
                    font-size: 14px;
                    display: block;
                    float: left;
                }
            }
        }
        .comments_w{
            width: 500px;
            height: 320px;
            border-radius: 12px;
            position: fixed;
            top: 185px;
            left: 710px;
            z-index: 1;
            background: #FFFFFF;
            h6{
                width: 452px;
                height: 125px;
                background-image: url('../../assets/img/grading-assignment/bg_zuowen_tanchuang_popup1@2x.png');
                background-size: 100% 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: -1;
            }
            >p:nth-child(1){
                width: 100%;
                height: 48px;
                border-bottom: 1px solid #DDDDDD;
                color: #5E84AD;
                font-size: 14px;
                padding-left: 17px;
                line-height: 48px;
                img{
                    width: 14px;
                    height: 14px;
                    margin-left: 396px;
                    cursor: pointer;
                }
            }
            textarea{
                width: 460px;
                height: 170px;
                border: 1px solid #CAD3DF;
                border-radius: 10px;
                background: #BAD5EE;
                margin: 20px 20px 17px;
                color: #8493A8;
                font-size: 14px;
                padding: 22px 10px;
                resize:none;
            }
            p:nth-child(3){
                width: 100%;
                height: 38px;
                button{
                    width: 160px;
                    height: 36px;
                    border-radius: 18px;
                    text-align: center;
                    line-height: 36px;
                    font-size: 14px;
                    cursor: pointer;
                }
                button:nth-child(1){
                    color: #1059FF;
                    border: 1px solid #1059FF;
                    background: #ffffff;
                    margin-left: 79px;
                }
                button:nth-child(2){
                    color: #FFFFFF;
                    background: #1059FF;
                    margin-left: 23px;
                }
            }
        }
        .deleteComments_w{
            width: 500px;
            height: 320px;
            border-radius: 12px;
            position: fixed;
            top: 185px;
            left: 710px;
            z-index: 1;
            background: #FFFFFF;
            h6{
                width: 452px;
                height: 125px;
                background-image: url('../../assets/img/grading-assignment/bg_zuowen_tanchuang_popup1@2x.png');
                background-size: 100% 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: -1;
            }
            >p:nth-child(1){
                width: 100%;
                height: 48px;
                border-bottom: 1px solid #DDDDDD;
                color: #5E84AD;
                font-size: 14px;
                padding-left: 17px;
                line-height: 48px;
                img{
                    width: 14px;
                    height: 14px;
                    margin-left: 396px;
                    cursor: pointer;
                }
            }
            p:nth-child(2){
                width: 100%;
                margin: 71px auto 59px;
                color: #3D4D65;
                font-size: 17px;
                text-align: center;
            }
            p:nth-child(3){
                width: 100%;
                height: 38px;
                margin-top: 110px;
                button{
                    width: 160px;
                    height: 36px;
                    border-radius: 18px;
                    text-align: center;
                    line-height: 36px;
                    font-size: 14px;
                    cursor: pointer;
                }
                button:nth-child(1){
                    color: #1059FF;
                    border: 1px solid #1059FF;
                    background: #ffffff;
                    margin-left: 79px;
                }
                button:nth-child(2){
                    color: #FFFFFF;
                    background: #1059FF;
                    margin-left: 23px;
                }
            }
        }
    }
</style>