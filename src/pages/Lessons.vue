<template>
    <div style="padding: 0 20px">
        <el-form v-if="!isStudent" :inline="true" style="text-align: left;padding: 5px;line-height: 36px;height: 36px"
                 @submit.native.prevent>
            <el-button v-if="type==='2'" type="primary" @click="addLesson">添加课堂</el-button>
        </el-form>
        <lesson-list v-on:remove="remove" v-bind:lessons="lessons"></lesson-list>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    import lessonComponent from '../components/lesson-list.vue'
    export default{
        data(){
            return {
                type:this.$store.state.user.type,
                isStudent:this.type==='1',
                lessons:[],
                cid:this.$store.state.course.uid
            }
        },
        components:{
            'lesson-list':lessonComponent
        },
        methods:{
            addLesson(){
                this.$router.push({name:'newLesson',params:{cid:this.cid}});
            },
            remove(lesson){
                var url =`/api/lesson/${lesson._id}`;
                co(function *() {
                    var result = yield http.deleteJson(url);
                    return result;
                }).then(result=>{
                    this.fetchData();
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
            },
            fetchData(){
                var url = `/api/lesson/course/${this.cid}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    this.lessons = result;
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
                    console.log(err);
                })
            }
        },
        created(){
            this.fetchData();
        }
    }
</script>
<style>

</style>