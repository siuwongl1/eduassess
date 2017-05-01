<template>
    <div style="padding: 10px 0">
        <el-card v-for="(c,index) in comments" style="margin: 10px 0">
            <div style="text-align: left">{{c.name}} 评论了该课堂：</div>
            <div style="margin: 10px">{{c.content}}</div>
            <div style="text-align: left" v-if="c.like&&c.like.length&&c.like.length>0">
                {{c.like.length}} 人赞同了该评价
            </div>
            <div style="text-align: left">
                <el-button type="text" icon="caret-top" @click="like(c,index)">{{c.like?c.like.length:0}}</el-button>
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
            like(c,index){
                if(this.isLiked(c)){
                    this.$message('您已对该评论内容点赞过了哦');
                    return;
                }else{
                    var url = `/api/comment/like/${c._id}`;
                    var user = this.user;
                    var store =this.$store.state.user;
                    co(function *() {
                        var result= yield http.putJson(url,user);
                        return result;
                    }).then(result=>{
                        if(result.n&&result.n==1){
                            var metaData = {uid:store.uid,name:store.name};
                            this.$emit('update',{index:index,metaData:metaData});
                        }
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                }
            },
            isLiked(c){
                if(c&&c.like){
                    var like = c.like;
                    var store = this.$store.state.user;
                    for(var i= 0;i<like.length;i++){
                        if(like[i].uid===store.uid){
                            return true;
                        }
                    }
                    return false;
                }
                return false;
            }
        },
        computed:{
            user:{
                get(){
                    var formData = new FormData();
                    var store = this.$store.state.user;
                    formData.append('name',store.name);
                    formData.append('uid',store.uid);
                    return formData;
                }
            }
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