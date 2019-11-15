<template>
    <div class="one_w">
        <div class="time_w">
            <h5></h5>
            <h5></h5>
            <p>{{list.homeworkStarttime | dataFilter}}<span>&nbsp;&nbsp;&nbsp;优秀作文（10篇）</span></p>
        </div>
        <div class="card_w" @click="goDetails">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>{{list.studentName}}</p>
                <p>{{list.studentCompositionTitle}}</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>{{list.commentCount}}</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>{{list.supportCount}}</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>




        <div class="time_w" style="margin-top:820px;">
            <h5></h5>
            <h5></h5>
            <p>2019年07月25日 15 ：30<span>&nbsp;&nbsp;&nbsp;优秀作文（10篇）</span></p>
        </div>
        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p id="boy">
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_boy@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>

        <div class="card_w">
            <div class="headPortrait_w">
                <p>
                    <img src="../../../assets/img/grading-assignment/img_zuowen_zhanshiqiang_gril@2x.png" alt="">
                </p>
            </div>
            <div class="data_w">
                <p>韩梅梅</p>
                <p>一场难忘的旅行</p>
                <p></p>
                <p>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_pinglun@2x.png" alt="">
                    <span>13</span>
                    <b></b>
                    <img src="../../../assets/img/grading-assignment/ic_zuowen_zhanshiqiang_flowers@2x.png" alt="">
                    <span>20</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../../../api/index';
export default {
    data(){
        return{
            list:[]
        }
    },
    filters:{
        dataFilter:function (val) {
            let data = new Date(val);
            let y = data.getFullYear();
            let m = data.getMonth() + 1;
            let d = data.getDate();
            let hh = data.getHours();
            let mm = data.getMinutes();
            m < 10 && (m = "0" + m);
            d < 10 && (d = "0" + d);
            hh < 10 && (hh = "0" + hh);
            mm < 10 && (mm = "0" + mm);
            return `${y}年${m}月${d}日 ${hh} ：${mm}`
        }
    },
    mounted(){
        let url='/api/student/homework/composition/displayWall';
        http.get(url,{
            params:{
                gradeClassId:133
            }
        }).then(({data})=>{
            console.log(data)
            this.list=data.infos[0];
            console.log(this.list)
        })
    },
    methods:{
        goDetails(){
            this.$router.push({name:'display-wall-details'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .one_w{
        height: calc(100vh - 270px);
        // background: red;
        overflow: auto;
        .time_w{
            position: relative;
            >p{
                width: 330px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: #969696;
                font-size: 14px;
                background: #F4F4F4;
                border: 1px solid #C2C2C2;
                border-radius: 15px;
                margin: 20px auto 0;
                span{
                    color: #5E84AD;
                }
            }
            h5:nth-child(1){
                position: absolute;
                left: 0px;
                top: 15px;
                background: #dddddd;
                width: 415px;
                height: 1px;
            }
            h5:nth-child(2){
                position: absolute;
                right: 0px;
                top: 15px;
                background: #dddddd;
                width: 415px;
                height: 1px;
            }
        }
        .card_w{
            width: 214px;
            height: 380px;
            border: 1px solid #DEDEDE;
            border-radius: 5px;
            background: #ffffff;
            float: left;
            margin: 19px 18px 0 0;
            cursor: pointer;
            .headPortrait_w{
                width: 100%;
                height: 148px;
                background-image: url('../../../assets/img/grading-assignment/bg_zuowen_zhanshiqiang@2x.png');
                background-size:100%100%;
                p{
                    width: 110px;
                    height: 110px;
                    // margin: 38px 62px 0;
                    position: relative;
                    top: 38px;
                    left: 52px;
                    margin: 0;
                    border-radius: 50%;
                    border: 2px solid #FDA7AA;
                    background: #ffffff;
                    img{
                        width: 54px;
                        height: 87px;
                        margin: 11px 26px; 
                    }
                }
            }
            .data_w{
                width: 100%;
                height: 213px;
                p:nth-child(1){
                    font-size: 14px;
                    color: #444444;
                    width: 100%;
                    text-align: center;
                    margin-top: 18px;
                }
                p:nth-child(2){
                    font-size: 18px;
                    // color: #4E5F71;
                    color: #cccccc;
                    width: 100%;
                    text-align: center;
                    margin-top: 36px;
                }
                p:nth-child(3){
                    width: 180px;
                    height: 1px;
                    margin: 41px auto 0;
                    background: #dddddd;
                }
                p:nth-child(4){
                    margin-top: 35px;
                    width: 100%;
                    height: 40px;
                    img:nth-child(1){
                        width: 39px;
                        height: 40px;
                        margin: 0 4px 0 23px;
                    }
                    span:nth-child(2){
                        line-height: 40px;
                        font-size: 18px;
                        color: #70C1B3;
                        margin-right: 25px;
                    }
                    b:nth-child(3){
                        width: 1px;
                        height: 20px;
                        background: #DDDDDD;
                        display: inline-block;
                        position: relative;
                        left: 0px;
                        top: 5px;
                    }
                    img:nth-child(4){
                        width: 39px;
                        height: 40px;
                        margin: 0 4px 0 15px;
                    }
                    span:nth-child(5){
                        line-height: 40px;
                        font-size: 18px;
                        color: #FF5860;
                    }
                }
            }
        }
    }
    #boy{
        border: 2px solid #B0EDF7;
    }
</style>