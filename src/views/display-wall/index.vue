<template>
<div style="background:#f0f7ff;width:100%;height:calc(100vh - 100px);">
    <div style="width:1200px;margin:30px auto;">
        <a-breadcrumb separator=">">
            <a-breadcrumb-item>
                <router-link to="/display-wall">作文任务</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>展示墙</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
    <div class="display-wall_w">
        <div class="navigation_w">
            <router-link :to="{name:'one'}" active-class="change" class="navigationSon_w">三年级一班</router-link>
            <i></i>
            <router-link :to="{name:'two'}" active-class="change" class="navigationSon_w">三年级二班</router-link>
            <i></i>            
            <router-link :to="{name:'three'}" active-class="change" class="navigationSon_w">三年级三班</router-link>
            <i></i>            
            <router-link :to="{name:'four'}" active-class="change" class="navigationSon_w">三年级四班</router-link>
        </div>
        <div class="content_w">
            <router-view></router-view>
        </div>
    </div>
</div>    
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
*{
    color: #596878;
}
html,body{
    height: 100%;
}
.change{
    color: #333333;
    border-bottom: 2px solid #006DFF;
}
.display-wall_w{
    width: 1200px;
    height: calc(100vh - 182px);
    margin: 0px auto 0;
    background: #ffffff;
    border-radius: 4px;
    position: relative;
    .navigation_w{
        width: 1160px;
        height: 69px;
        border-bottom: 1px solid #E9E9E9;
        margin: 0 auto;
        .navigationSon_w{
            display: block;
            float: left;
            height: 100%;
            line-height: 69px;
            font-size:20px;
        }
        i{
            display: block;
            float: left;
            width: 2px;
            height: 26px;
            background: #E9E9E9;
            margin: 21px 42px;
        }
    }
    .content_w{
        width: 1160px;
        margin: 0 auto;
        // background: pink;
    }
}
</style>