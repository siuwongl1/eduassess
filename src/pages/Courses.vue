<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" style="text-align: left;padding: 20px" @submit.native.prevent>
                    <el-form-item label="学期">
                        <period-component v-on:periodSubmit="periodSubmit"></period-component>
                        <el-button type="primary" @click="queryCourse">查询</el-button>
                        <el-button type="primary" @click="addCourse">添加课程</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>

            </el-col>
        </el-row>
    </div>
</template>
<script>
    import http from 'http';
    import periodComponent from '../components/period-input.vue'
    export default {
        data() {
            return {
                period:'',
            }
        },
        components:{
            periodComponent
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData () {
                var url;
                if(this.period===''){
                    url = `/api/course/user/${this.$store.state.uid}`;
                }else{
                    url = `/api/course/user/${this.$store.state.uid}/period/${this.period}`;
                }
                http.getJson(url).then((value)=>{
                    http.parseResp(value).then((resp)=>{
                        console.log(resp.data);
                    },(err)=>{
                        this.$message.error(err);
                    })
                },(err)=>{

                }).catch((err)=>{
                    console.log(err);
                })
            },
            periodSubmit(msg){
                this.period = msg;
            },
            queryCourse () {
                this.fetchData();
            },
            addCourse(){
                this.$router.push({name:'newCourse'})
            }
        }
    }
</script>
<style>

</style>