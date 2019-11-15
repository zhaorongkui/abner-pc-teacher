<template>
    <div class="box_w">
        <div class="left_w">
            <p>作文浏览区</p>
            <img src="" alt="">
        </div>
        <div class="right_w">
            <div class="score_w">
                <span>得分</span>
                <span>34</span>
                <img src="../../assets/img/grading-assignment/other_score.png" alt="">
            </div>
            <div class="top_w">
                 <span>评分区</span>
                 <a href="#">查看评分标准表</a>
            </div>


            <div class="smallBox_w" v-for="(item,index) in list" :key="index">
                <div class="title_w">
                    <img src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png" alt="">
                    <p>
                        <span>{{item.title}}</span>
                        <span>-{{item.samllTitle}}</span>
                    </p>
                </div>
                <div class="grade_w" v-for="(every,i) in item.samllList" :key="i" @click="change(i,index,every)" :id="every.isChoose ? 'choose_style' : 'grade_w'">
                    <p>
                        <span>{{every.grade}}</span>
                        <span>（{{every.fractionmin}}-{{every.fractionmax}}分）</span>
                    </p>
                    <p>{{every.describe}}</p>
                </div>
                <div class="calculation_w">
                    <input type="button" class="subtraction" v-model="subtraction" @click="subtractionFn(item,index)">
                    <span class="num" ref="num">{{item.num}}</span>
                    <input type="button" class="add" v-model="add" @click="addFn(item,index)">  
                </div>
            </div>


            <div class="smallBox_w">
                <div class="title_w">
                    <img src="../../assets/img/grading-assignment/bg_zuowen_title@2x.png" alt="">
                    <p>
                        <span>书写</span>
                        <span>-维度评分</span>
                    </p>
                </div>
                <div class="grade_w" v-for="(item,index) in listbuttom" :key="index" @click="lastChange(index,item)" :id="item.isChoose ? 'choose_style' : 'grade_w'">
                    <p>
                        <span>{{item.grade}}</span>
                        <span>（{{item.fraction}}分）</span>
                    </p>
                    <p>{{item.describe}}</p>
                </div>
                <div class="calculation_w">
                    <input type="button" class="subtraction" v-model="subtraction">
                    <span class="num">{{lastnum}}</span>
                    <input type="button" class="add" v-model="add">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            list:[
                {
                    title:'内容',
                    samllTitle:'维度评分',
                    num: 0,
                    samllList:[
                        {
                            grade:'一类',
                            fractionmin:'17',
                            fractionmax:'20',
                            describe:'切合题意，思想健康，中心突出，内容充实，感情真切',
                            isChoose: false
                        },
                        {
                            grade:'二类',
                            fractionmin:'13',
                            fractionmax:'16',
                            describe:'切合题意，思想健康，中心明确，内容具体，感情真实',
                            isChoose: true
                        },
                        {
                            grade:'三类',
                            fractionmin:'9',
                            fractionmax:'12',
                            describe:'基本合题意，思想健康，中心比较明确，内容比较具体 ，感受比较真实',
                            isChoose: false
                        },
                        {
                            grade:'四类',
                            fractionmin:'5',
                            fractionmax:'8',
                            describe:'偏离题意，思想健康，中心欠明确，内容不够具体',
                            isChoose: false
                        },
                        {
                            grade:'五类',
                            fractionmin:'0',
                            fractionmax:'4',
                            describe:'文不对题，不知所云，中心不明确，内容不具体',
                            isChoose: false
                        }
                    ]
                },
                {
                    title:'语言',
                    samllTitle:'维度评分',
                    num: 0,
                    samllList:[
                        {
                            grade:'一类',
                            fractionmin:'14',
                            fractionmax:'16',
                            describe:'语言流畅，生动无语病，表达好',
                            isChoose: false
                        },
                        {
                            grade:'二类',
                            fractionmin:'11',
                            fractionmax:'13',
                            describe:'语言通顺偶有语病，表达较好',
                            isChoose: true
                        },
                        {
                            grade:'三类',
                            fractionmin:'8',
                            fractionmax:'10',
                            describe:'语言尚通顺，语病不多',
                            isChoose: false
                        },
                        {
                            grade:'四类',
                            fractionmin:'5',
                            fractionmax:'7',
                            describe:'语言不通顺，语病较多',
                            isChoose: false
                        },
                        {
                            grade:'五类',
                            fractionmin:'0',
                            fractionmax:'4',
                            describe:'语病严重, 文理不通',
                            isChoose: false
                        }
                    ]
                },
                {
                    title:'篇章',
                    samllTitle:'维度评分',
                    num: 0,
                    samllList:[
                        {
                            grade:'一类',
                            fractionmin:'9',
                            fractionmax:'10',
                            describe:'结构完整层次清楚条理清楚构思新颖',
                            isChoose: false
                        },
                        {
                            grade:'二类',
                            fractionmin:'7',
                            fractionmax:'8',
                            describe:'结构完整条理较清楚'
                            ,isChoose: true
                        },
                        {
                            grade:'三类',
                            fractionmin:'5',
                            fractionmax:'6',
                            describe:'条理尚清楚结构基本完整能分段',
                            isChoose: false
                        },
                        {
                            grade:'四类',
                            fractionmin:'3',
                            fractionmax:'4',
                            describe:'结构欠完整条理不清楚'
                            ,isChoose: false
                        },
                        {
                            grade:'五类',
                            fractionmin:'0',
                            fractionmax:'2',
                            describe:'结构混乱不能完篇',
                            isChoose: false
                        }
                    ]
                }
            ],
            listbuttom:[
                {
                    grade:'一类',
                    fraction:'4',
                    describe:'字体工整书写规范，卷面整洁',
                    isChoose: false
                },
                {
                    grade:'二类',
                    fraction:'3',
                    describe:'字体工整书写规范，卷面较整洁',
                    isChoose: true
                },
                {
                    grade:'三类',
                    fraction:'2',
                    describe:'字迹清楚，有少量错别字，少量涂改',
                    isChoose: false
                },
                {
                    grade:'四类',
                    fraction:'1',
                    describe:'字迹潦草，错别字较多',
                    isChoose: false
                },
                {
                    grade:'五类',
                    fraction:'0',
                    describe:'字迹不易辨认，错别字多，卷面不整洁',
                    isChoose: false
                }
            ],
            add:'+',
            subtraction:'—',
            // num:'',
            lastnum:'3',
            max:'',
            min:''
        }
    },
    created(){
        this.list.map((val,i)=>{
            val.num=val.samllList[1].fractionmax;
            this.max=val.samllList[i].fractionmax;
            this.min=val.samllList[i].fractionmin;
            console.log(val.samllList[i].fractionmax)
        })
    },
    methods:{
        change(i,index,every){
            this.list[index].samllList.map(val => {
                val.isChoose ? val.isChoose = false : '';
            })
            this.list[index].samllList[i].isChoose = true;
            this.list[index].num=every.fractionmax;
            this.max=every.fractionmax;
            this.min=every.fractionmin;
        },
        lastChange(index,item){
            this.listbuttom.map(val => {
                val.isChoose ? val.isChoose = false : '';
            })
            this.listbuttom[index].isChoose = true;
            this.lastnum=item.fraction;
        },
        addFn(item,index){
            if(this.list[index].num<this.max){
                this.list[index].num++;
            }
        },
        subtractionFn(item,index){
            if(this.list[index].num>this.min){
                this.list[index].num--;
            }
        }
    }
}
</script>
<style lang="scss" scoped>

    .box_w{
        width: 1185px;
        height: 1990px;
        margin: 10px auto 0;
        background: red;
        .left_w{
            width: 520px;
            height: 1914px;
            float: left;
            background: white;
            border-radius: 4px;
            p{
                width: 104px;
                height: 24px;
                background: #FFB463;
                text-align: center;
                line-height: 24px;
                margin: 20px 0 0 20px;
                border-radius: 12px;
                color: #FFFFFF;
                font-size: 14px;
            }
            img{
                width: 476px;
                height: 536px;
                margin: 16px 0 0 20px;
                background: black;
                display: block;
                border-radius: 10px;
                border: 1px solid #B9B9B9;    
            }
        }
        .right_w{
            width: 650px;
            height: 1990px;
            float: left;
            margin-left: 15px;
            background: white;  
            border-radius: 4px;
            .score_w{
                width: 82px;
                height: 98px;
                border: 1px solid #E9E9E9;
                border-radius: 5px 5px 70px 70px;
                background: pink;
                position: relative;
                top: 1px;
                left: 550px;
                span:nth-child(1){
                    font-size: 12px;
                    color: #AAAAAA;
                    margin: 12px 0 0 28px;
                    display: block;
                }
                span:nth-child(2){
                    font-size: 30px;
                    color: #0710A0;
                    margin: 9px 0 0 24px;
                }
                img{
                    width: 54px;
                    height: 21px;
                    margin: -32px 0 0 21px;
                }
            }
            .top_w{
                margin: 20px 0 0 20px;
                span{
                    width: 104px;
                    height: 24px;
                    background: #FFB463;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 12px;
                    color: #FFFFFF;
                    font-size: 14px;
                    display: inline-block;
                }
                a{
                    color: #1059FF;
                    font-size: 12px;
                    margin-left: 12px;
                }
            }
            .smallBox_w{
                width: 610px;
                // height: 385px;
                height: 390px;
                border: 1px solid #DEDEDE;
                border-radius: 6px;
                margin: 26px 0 0 20px;
                .title_w{
                    height: 36px;
                    position: relative;
                    top: -10px;
                    left: 3px;
                    img{
                        width: 112px;
                        height: 36px;
                    }
                    p{
                        position: relative;
                        top: -30px;
                        left: 10px;
                        span:nth-child(1){
                            color: #1059FF;
                            font-size: 16px;
                        }
                        span:nth-child(2){
                            color: #1059FF;
                            font-size: 14px;
                        }
                    }
                }
                .grade_w{
                    width: 590px;
                    height: 50px;
                    border: 1px solid #DEDEDE;
                    border-radius: 6px;
                    margin: 10px 0 0 10px;
                    cursor: pointer;
                    p:nth-child(1){
                        width: 70px;
                        height: 50px;
                        background: #E4E7EA;
                        border-radius: 6px 0 0 6px;
                        float: left;
                        span:nth-child(1){
                            display: block;
                            color: #4E5F71;
                            font-size: 16px;
                            text-align: center;
                            margin-top: 5px;
                        }
                        span:nth-child(2){
                            display: block;
                            color: #4E5F71;
                            font-size: 12px;
                            text-align: center;
                        }
                    }
                    p:nth-child(2){
                        float: left;
                        font-size: 15px;
                        color: #4E5F71;
                        padding-left: 10px;
                        line-height: 50px;
                    }
                }
                .calculation_w{
                    width: 103px;
                    height: 34px;
                    border: 1px solid #1059FF;
                    margin-left: 496px;
                    margin-top: 10px;
                    border-radius: 4px;
                    overflow: hidden;
                    .add{
                        width: 33px;
                        height: 32px;
                        font-size: 15px;
                        float: left;
                        border: none;
                        color: rgb(131, 146, 167);
                        background: white;
                        cursor: pointer;
                    }
                    .num{
                        width: 35px;
                        height: 34px;
                        font-size: 16px;
                        display: inline-block;
                        float: left;
                        text-align: center;
                        line-height: 34px;
                        color: #1059FF;
                        border-left: 1px solid #CAD3DF;
                        border-right: 1px solid #CAD3DF;
                    }
                    .subtraction{
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
        } 
    }
    
    #choose_style {
        border: 1px solid #1059FF;
        p:nth-child(1){
            background: #1059FF;
            span:nth-child(1){
                color: white;
            }
            span:nth-child(2){
                color: white;
            }
        }
        p:nth-child(2){
            color: #1059FF;
        }
    }
    #grade_w{
        border: 1px solid #DEDEDE;
        p:nth-child(1){
            background: #E4E7EA;
            span:nth-child(1){
                color: #4E5F71;
            }
            span:nth-child(2){
                color: #4E5F71;
            }
        }
        p:nth-child(2){
            color: #4E5F71;
        }            
    }
</style>