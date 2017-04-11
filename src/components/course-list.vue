<template>
    <el-row>
        <el-col :span="5" v-for="(c,index) in courses" :offset="index%4==0?0:1">
            <el-card :body-style="{padding:'0px'}">
                <img src="../assets/logo.png" class="image">
                <div class="divide-line" style="padding: 14px;">
                    <span>课程名称：{{c.name}}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="button">操作按钮</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    export default{
        props:['courses'],
        data(){
            return {
                currentDate:new Date().toLocaleDateString()
            }
        },
        methods:{

        },
        created(){
            console.log("list:"+this.courses);
        }
    }
</script>
<style>
    .divide-line{
        border-top: solid #aebdc9 1px;
        text-align: left;
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>