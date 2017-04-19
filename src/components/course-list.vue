<template>
    <el-row>
        <el-col :span="5" v-for="(c,index) in courses" :offset="index%4==0?0:1">
            <el-card :body-style="{padding:'0px'}">
                <div class="content">
                    <el-row>
                        <el-col :span="8" class="label">
                            课程名称：
                        </el-col>
                        <el-col :span="16">
                            <span>{{c.name}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            专业：
                        </el-col>
                        <el-col :span="16">
                            <span>{{c.pro}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            班级：
                        </el-col>
                        <el-col :span="16">
                            <span>{{c.cls}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            授课教师：
                        </el-col>
                        <el-col :span="16">
                            <span>{{c.tname}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            开课时间：
                        </el-col>
                        <el-col :span="16">
                            <span>{{c.date}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="label">
                            学期：
                        </el-col>
                        <el-col :span="16">
                            <span>{{c.period}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="divide-line" style="padding: 10px;">
                    <el-button type="text" class="button" @click="goLesson(c)">课堂</el-button>
                    <el-button type="text" v-if="!isStudent" class="button" @click="modify(c)" style="margin-right: 10px">修改</el-button>
                    <el-button type="text" v-else class="button" @click="modify(c)" style="margin-right: 10px">加入该课程</el-button>
                    <el-button type="text" v-if="this.$store.state.type===3" @click="remove(c)" class="button">删除</el-button>
                    <div class="bottom clearfix">
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    export default{
        props: ['courses'],
        data(){
            return {
                isStudent:this.$store.state.type==1,
                currentDate: new Date().toLocaleDateString()
            }
        },
        methods: {
            goLesson(course) {
                this.$router.push({name:'lessonManage',params:{cid:course._id}});
            },
            modify(course) {
                this.$router.push({name:'newCourse',params:{cid:course._id}});
            },
            remove(course){

            }
        },
        created(){
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