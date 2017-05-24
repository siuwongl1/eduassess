<template>
    <div style="padding:0 20px">
        <el-form :inline="true" class="course-form"
                 @submit.native.prevent>
            <el-form-item label="学期">
                <period-input v-on:periodSubmit="periodSubmit"></period-input>
                <el-button type="primary" @click="queryCourse">查询</el-button>
                <el-button type="primary" v-if="type==='2'" @click="addCourse">添加课程</el-button>
            </el-form-item>
        </el-form>
        <course-list v-on:removeCourse="delCourse" :courses="courses" ></course-list>
    </div>
</template>
<script>
    import http from 'http';
    import co from 'co'
    import global from 'common'
    import periodComponent from '../components/period-input.vue'
    import courseListComponent from '../components/course-list.vue'
    export default {
        data() {
            return {
                period: global.getCurrentPeriod(),
                type:this.$store.state.user.type,
                isStudent:this.type=== '1',
                isJoin:true,
                courses: [],
            }
        },
        components: {
            'period-input': periodComponent,
            'course-list': courseListComponent
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData () {
                if(this.isStudent){
                    var url = `/api/course/student/${this.$store.state.user.uid}/period/${this.period}`;
                }else{
                    var url =`/api/course/period/${this.period}`
                }
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    this.courses = result;
                }, err => {
                    if(err && typeof err ==='object' &&err.statusCode){
                        if(err.statusCode===1){
                            this.$message.error(err.message);
                        }else if(err.statusCode===401){
                            this.$router.replace({name:'login'});
                        }
                    }else{
                        this.$message.error(err);
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            periodSubmit(msg){
                this.period = msg;
            },
            queryCourse () {
                this.fetchData();
            },
            addCourse(){
                this.$router.push({name: 'newCourse'})
            },
            delCourse(course){
                var url =`/api/course/${course._id}`;
                co(function *() {
                    var result = yield http.deleteJson(url);
                    return result;
                }).then(result=>{
                    this.fetchData(); //删除成功，刷新数据
                },err=>{
                    if(err && typeof err ==='object' &&err.statusCode){
                        if(err.statusCode===1){
                            this.$message.error(err.message);
                        }else if(err.statusCode===401){
                            this.$router.replace({name:'login'});
                        }
                    }else{
                        this.$message.error(err);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        computed: {

        }
    }
</script>
<style>
    .course-form{
        text-align: left;
        /*line-height: 36px;*/
        /*height: 36px*/
    }
</style>