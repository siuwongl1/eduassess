<template>
    <div>
        <div class="feed-item" v-for="c in courses">
            <a href="#"><h2 class="topic">课程：{{c.name}}，授课教师：{{c.tname}}</h2></a>
        </div>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    import global from 'global'
    export default{
        data(){
            return {
                courses:[]
            }
        },
        methods:{
            fetchData(){
                var url =`/api/course/student/${this.$store.state.user.uid}/period/${global.getCurrentPeriod()}`;
                co(function *() {
                    var result= yield http.getJson(url);
                    return result;
                }).then(result=>{
                    this.courses = result;
                },err=>{
                    this.$message.error(err);
                }).catch(err=>{
                    this.$message.error(err);
                })
            }
        },
        mounted(){
            this.fetchData();
        }
    }
</script>
<style>

    .feed-item{
        border-top: 1px solid #eee;
        padding: 10px 0;
    }
    .feed-item a{
        color: black;
        text-decoration:none;
    }
    a:hover{
        text-decoration:underline;
        color:#20A0FF;
    }
</style>