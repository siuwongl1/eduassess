<template>
    <div style="padding:20px">
        <el-form :inline="true" class="course-form"
                 @submit.native.prevent>
            <el-form-item label="学期">
                <period-input v-on:periodSubmit="periodSubmit"></period-input>
                <el-button type="primary" @click="queryCourse">查询</el-button>
                <el-button type="primary" v-if="!isStudent" @click="addCourse">添加课程</el-button>
            </el-form-item>
        </el-form>
        <course-list :courses="courses" ></course-list>
    </div>
</template>
<script>
    import http from 'http';
    import co from 'co'
    import global from 'global'
    import periodComponent from '../components/period-input.vue'
    import courseListComponent from '../components/course-list.vue'
    export default {
        data() {
            return {
                period: global.getCurrentPeriod(),
                isStudent: this.$store.state.user.type === '1',
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
                var url = `/api/course/${this.isStudent?'student':'teacher'}/${this.$store.state.user.uid}/period/${this.period}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    this.courses = result;
                },err=>{
                    this.$message.error(err);
                }).catch(err=>{
                    this.$message.error(err);
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