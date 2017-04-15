<template>
    <div>
        <el-form :inline="true" style="text-align: left;padding: 5px;line-height: 36px;height: 36px"
                 @submit.native.prevent>
            <el-button type="primary" @click="addLesson">添加课堂</el-button>
        </el-form>
        <div style="height: 1px;background-color: #aebdc9;margin: 0 0 10px 0"></div>
        <lesson-list v-bind:lessons="lessons"></lesson-list>
    </div>
</template>
<script>
    import http from 'http'
    import lessonComponent from '../components/lesson-list.vue'
    export default{
        data(){
            return {
                lessons:[]
            }
        },
        components:{
            'lesson-list':lessonComponent
        },
        methods:{
            addLesson(){
                this.$router.push({name:'newLesson',params:{cid:this.$route.params.cid}});
            }
        },
        created(){
            var url = `/api/lesson/${this.$route.params.cid}`;
            http.getJson(url).then((value)=> {
                http.parseResp(value).then((result)=>{
                    console.log(result);
                    if(result.length>0){
                        this.lessons = result[0].lessons;
                    }
                },(err)=>{
                    this.$message.error(err);
                })
            },(err)=>{
                this.$message.error(err);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
</script>
<style>

</style>