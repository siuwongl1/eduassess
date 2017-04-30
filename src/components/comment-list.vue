<template>
    <div style="padding: 10px 0">
        <el-card v-for="(c,index) in comments" style="margin: 10px 0">
            <div style="text-align: left">{{c.name}} 评论了该课堂：</div>
            <div style="margin: 10px">{{c.content}}</div>
            <div v-if="c.like&&c.like.length&&c.like.length>0">
                {{c.like.length}} 赞同了该评价
            </div>
            <div style="text-align: left">
                <el-button type="text" icon="caret-top" @click="like(c)">{{c.like?c.like.length:0}}</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    export default{
        props: ['comments'],
        data(){
            return {
                isActive:false
            }
        },
        methods: {
            like(c){
                if(c.like&&c.like.uid===this.$store.state.user.uid){
                    this.$message('您已对该评论内容点赞过了');
                    return;
                }else{
                    var url = `/api/comment/like/${c._id}`;
                    co(function *() {
                        var result= yield http.putJson(url);
                        return result;
                    }).then(result=>{
                        c= result;
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                }
            },
        }
    }
</script>
<style>
    .active{
        background-color: #20A0FF;
        padding: 5px;
        color: white;
    }
</style>