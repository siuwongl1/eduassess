<template>
    <el-row>
        <el-col :span="5" v-for="(l,index) in lessons" :offset="index%4==0?0:1">
            <el-card :body-style="{padding:'0px'}">
                <div class="content">
                    <el-row>
                        <el-col :span="8" class="label">
                            课堂名称：
                        </el-col>
                        <el-col :span="16">
                            <span>{{l.name}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            课堂内容：
                        </el-col>
                        <el-col :span="16">
                            <span>{{l.content}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            发布时间：
                        </el-col>
                        <el-col :span="16">
                            <span>{{l.date}}</span>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    export default{
        props:['lessons'],
        data(){
            return{

            }
        },
        methods:{

        }

    }
</script>
<style>
    .divide-line {
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

    .content {
        text-align: left;
        padding: 10px;
    }
    .content .label{
        text-align: right;
    }
    .content span{
        word-wrap: break-word;
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