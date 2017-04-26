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
                <div class="divide-line">
                    <el-button type="text" class="button" @click="showDetal(c)">详细信息</el-button>
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
            showDetal(c){

            }
        }
    }
</script>
<style>
    .divide-line {
        border-top: solid #aebdc9 1px;
        text-align: left;
    }
    .button {
        padding: 10px;
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
</style>