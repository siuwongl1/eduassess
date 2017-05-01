<template>
    <el-row>
        <el-col :span="5" v-for="(c,index) in courses" :offset="index%4==0?0:1">
            <el-card :body-style="{padding:'0px'}">
                <div class="content">
                    <el-row>
                        <el-col :span="leftSpan" class="label">
                            课程名称：
                        </el-col>
                        <el-col :span="rightSpan">
                            <span>{{c.name}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="leftSpan" class="label">
                            专业：
                        </el-col>
                        <el-col :span="rightSpan">
                            <span>{{c.pro}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="leftSpan" class="label">
                            班级：
                        </el-col>
                        <el-col :span="rightSpan">
                            <span>{{c.cls}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="leftSpan" class="label">
                            授课教师：
                        </el-col>
                        <el-col :span="rightSpan">
                            <span>{{c.tname}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="leftSpan" class="label">
                            发布时间：
                        </el-col>
                        <el-col :span="rightSpan">
                            <span>{{c.date}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="leftSpan" class="label">
                            学期：
                        </el-col>
                        <el-col :span="rightSpan">
                            <span>{{c.period}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="divide-line" style="padding: 5px 10px">
                    <el-button type="text" v-if="!isJoin" class="button" @click="goLesson(c)">课堂</el-button>
                    <el-button type="text" v-if="!isStudent" class="button" @click="modify(c)">修改</el-button>
                    <el-button type="text" v-if="isJoin" class="button" @click="join(c)" >加入该课程</el-button>
                    <el-button type="text" v-if="!isStudent" class="button" @click="checkAll(c)" >申请列表</el-button>
                    <el-button type="text" v-if="type==='3'" @click="remove(c)" class="button">删除</el-button>
                    <div style="clear: both"></div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    import http from 'http'
    import co from 'co'
    export default{
        props: ['courses','isJoin'],
        data(){
            return {
                leftSpan:8,
                rightSpan:16,
                isStudent:true,
                type:'1',//用户类型
                currentDate: new Date().toLocaleDateString()
            }
        },
        methods: {
            goLesson(course) {
                this.$store.commit('storeCourse',{cid:course._id}); //存储当前course状态
                this.$router.push({name:'lessonManage',params:{cid:course._id}});
            },
            modify(course) {
                this.$store.commit('storeCourse',{cid:course._id}); //存储当前course状态
                this.$router.push({name:'patchCourse',params:{cid:course._id}});
            },
            remove(course){

            },
            join(course){
                var url = `/api/course/class/${course._id}`;
                var user = this.user;
                co(function *() {
                    var result = yield http.postJson(url,user);
                    return result;
                }).then(result=>{
                    if(result.n==0){
                        this.$message.warning('您已经加入过该课程了哦');
                    }else{
                        this.$message('加入成功');
                    }
                }).catch(err=>{
                    this.$message.error(err);
                })
            },
            checkAll(course){
                this.$store.commit('storeCourse',{cid:course._id}); //存储当前course状态
                this.$router.push({name:'applicants',params:{cid:course._id}});
            }
        },
        computed:{
            user:{
                get:function () {
                    var formData = new FormData();
                    var store = this.$store.state.user;
                    formData.append("uid",store.uid);
                    formData.append("name",store.name);
                    formData.append("pro",store.pro);
                    formData.append("cls",store.cls);
                    formData.append("sex",store.sex==='1'?'男':'女');
                    formData.append("schoolId",store.schoolId);
                    return formData;
                }
            }
        },
        created(){
            this.type = this.$store.state.user.type;
            this.isStudent = this.type==='1';
        }
    }
</script>
<style>
    .divide-line {
        border-top: solid #aebdc9 1px;
        text-align: left;
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

</style>