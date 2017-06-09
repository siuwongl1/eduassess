<template>
    <div>
        <el-card>
            <p style="text-align: left"><b>我的消息</b></p>
            <p v-if="notices.length==0">暂无消息</p>
            <div v-else>
                <div class="feed-item" v-for="(n,index) in notices">
                    <div v-if="n.type==='remark'">
                        <div class="notice-item">
                            <span class="notice-item-left-cell">{{n.name}}回复了您的评价信息</span>
                            <span class="notice-item-right-cell">{{toDateString(n.date)}}</span>
                        </div>
                    </div>
                    <div v-else-if="n.type==='like'">
                        <div class="notice-item">
                            <span class="notice-item-left-cell">{{n.name}}赞同了您的评价</span>
                            <span class="notice-item-right-cell">{{toDateString(n.date)}}</span>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
    import http from 'http';
    import co from 'co';
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
            },
            jumpDetail(notice){
                if(notice.type==='like'){  //点赞相关

                }else if(notice.type==='remark'){  //评论相关

                }
            }
        },
        created(){
            this.notices = this.$store.state.notice.data||[];
        }
    }
</script>
<style>
    .notice-item{
        padding: 5px 0;
    }
    .notice-item .notice-item-left-cell{
        float: left;
    }
    .notice-item .notice-item-right-cell{
        float: right;
    }
</style>