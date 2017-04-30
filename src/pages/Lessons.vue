<template>
    <div>
        <el-form v-if="!isStudent" :inline="true" style="text-align: left;padding: 5px;line-height: 36px;height: 36px"
                 @submit.native.prevent>
            <el-button type="primary" @click="addLesson">添加课堂</el-button>
        </el-form>
        <lesson-list v-bind:lessons="lessons"></lesson-list>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    import lessonComponent from '../components/lesson-list.vue'
    export default{
        data(){
            return {
                isStudent:this.$store.state.user.type===1,
                lessons:[],
                cid:this.$store.state.course.uid
            }
        },
        components:{
            'lesson-list':lessonComponent
        },
        methods:{
            addLesson(){
                this.$router.push({name:'newLesson',params:{cid:cid}});
            }
        },
        created(){
            this.isStudent=this.$store.state.user.type===1;
            var url = `/api/lesson/course/${this.cid}`;
            co(function *() {
                var result = yield http.getJson(url);
                return result;
            }).then(result=>{
                this.lessons = result;
            },err=>{
                this.$message.error(err);
            }).catch(err=>{
                this.$message.error(err);
            })
        }
    }
</script>
<style>

</style>