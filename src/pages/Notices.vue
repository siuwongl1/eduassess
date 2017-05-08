<template>
    <div>
        <el-card>
            <p style="text-align: left"><b>我的消息</b></p>
            <p v-if="notices.length==0">暂无消息</p>
            <div v-else>
                <div class="feed-item" v-for="(n,index) in notices">
                    <div v-if="n.type==='remark'">
                        <div style="padding: 5px 0">
                            <span style="float: left">{{n.name}}回复了您的评价信息</span>
                            <span style="float: right">{{toDateString(n.date)}}</span>
                        </div>
                    </div>
                    <div v-else-if="n.type==='like'">
                        <div style="padding: 5px 0">
                            <span style="float: left">{{n.name}}赞同了您的评价</span>
                            <span style="float: right">{{toDateString(n.date)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
    import http from 'http';
    import co from 'co'
    export default{
        data(){
            return{
                notices:[],
            }
        },
        methods:{
            toDateString(val){
                var date = new Date(val);
                return date.toLocaleString();
            }
        },
        created(){
            this.notices = this.$store.state.notice.data;
            console.log(this.notices);
        }
    }
</script>
<style>

</style>