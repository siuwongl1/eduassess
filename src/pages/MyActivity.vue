<!--我的动态信息-->
<template>
    <div>
        <el-card>
            <p style="text-align: left"><b>我的动态</b></p>
            <p v-if="activities.length==0">暂无动态</p>
            <div v-else>
                <div class="feed-item" v-for="(act,index) in activities">
                    <div v-if="act.type==='comment'">
                        <div style="padding: 5px 0">
                            <span style="float: left">评价了课堂</span>
                            <span style="float: right">{{toDateString(act.date)}}</span>
                        </div>
                        <h2 class="item-title">{{act.data.name}}</h2>
                        <p class="item-content">{{act.data.content}}</p>
                    </div>
                    <div v-else-if="act.type==='like'">
                        <div style="padding: 5px 0">
                            <span style="float: left">赞同了评价</span>
                            <span style="float: right">{{toDateString(act.date)}}</span>
                        </div>
                        <h2 class="item-title">{{act.data.name}}</h2>
                        <p class="item-content">{{act.data.content}}</p>
                    </div>
                </div>
                <el-pagination
                        :page-size="limit"
                        layout="prev, pager, next"
                        @current-change="currentChange"
                        :total="pagertotal">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    export default{
        data(){
            return{
                skip:0,
                limit:10,
                activities:[],
                pagertotal:0,
            }
        },
        methods:{
            fetchData(){
                var url =`/api/activity/${this.$store.state.user.uid}/skip/${this.skip}/limit/${this.limit}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    if(result){
                        this.pagertotal = result.count;
                        this.activities = result.data;
                        console.log(this.activities);
                    }
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
                    this.$message.error(err);
                })
            },
            currentChange(size){
                this.skip=this.limit*(size-1);
                this.fetchData();
            },
            toDateString(val){
                var date = new Date(val);
                return date.toLocaleString();
            }
        },
        created(){
            this.fetchData();
        }
    }
</script>
<style>
    .feed-item{
        border-top: 1px solid #f0f2f7;
        padding:10px 0;
    }
    .item-title{
        clear: both;
        padding: 10px 0;
        color: #000;
        text-align: left;
    }
    .item-content{
        text-align: center;
        color: #000;
    }
</style>