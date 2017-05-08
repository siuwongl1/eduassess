<template>
    <div style="padding: 10px 0">
        <el-card v-for="(c,index) in comments" style="margin: 10px 0">
            <div class="feed-header">{{c.name}} 评论了该课堂</div>
            <div style="margin: 10px">{{c.content}}</div>
            <div class="feed-header" v-if="c.like&&c.like.length&&c.like.length>0">
                {{c.like.length}} 人赞同了该评价
            </div>
            <div style="text-align: left;padding: 5px 0 0 0">
                <el-button type="primary" size="mini" :plain="!isLiked(c)" icon="caret-top" @click="like(c,index)">{{c.like?c.like.length:0}}</el-button>
                <el-button type="text" size="mini" :plain="true" icon="edit" @click="toggleRemark(c)">{{c.remarks?c.remarks.length:0}}条评论</el-button>
            </div>
        </el-card>
        <el-dialog title="评论内容" v-model="toggleSwitch">
            <remark-list v-bind:remarks="remarks" v-on:currentPage="currentPage" v-on:submitRemark="submitRemark"></remark-list>
        </el-dialog>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    import remarkComponent from '../components/remark-list.vue'
    export default{
        props: ['comments'],
        components:{
            'remark-list': remarkComponent
        },
        data(){
            return {
                isActive:false,
                toggleSwitch:false,
                comment:{}, //课堂评价列表
                remarks:[], //评论列表
                content:'',
                skip:0,
                limit:5,
            }
        },
        methods: {
            like(c,index){  //
                this.comment = c;
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
            },
            toggleRemark(c){
                this.comment = c;
                this.toggleSwitch = !this.toggleSwitch;
                this.fetchRemark();
            },
            submitRemark(msg){ //添加评论
                if(msg){
                    this.content = msg.content;
                    var url = `/api/remark/${this.comment._id}`;
                    var content = this.remark;
                    co(function *() {
                        var result = yield http.postJson(url,content);
                        return result;
                    }).then(result=>{
                        this.fetchRemark();
                        this.$emit('update');
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                }
            },
            fetchRemark(){
                if(this.comment){
                    var url =`/api/remark/${this.comment._id}/skip/${this.skip}/limit/${this.limit}`;
                    co(function *() {
                        var result = yield http.getJson(url);
                        return result;
                    }).then(result=>{
                        this.remarks = result;
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                }
            },
            currentPage(msg){
                if(msg){
                    this.skip=this.limit*(msg.size-1);
                    this.fetchRemark();
                }
            }
        },
        computed:{
            user:{
                get(){
                    var formData = new FormData();
                    var store = this.$store.state.user;
                    formData.append('name',store.name); //点赞人姓名
                    formData.append('originUid',this.comment.uid); //评价人uid
                    formData.append('content',this.comment.content); //评价内容
                    formData.append('lid',this.comment.lid); //课堂uid
                    formData.append('uid',store.uid); //点赞人uid
                    return formData;
                }
            },
            remark:{
                get(){
                    var formData = new FormData();
                    var store = this.$store.state.user;
                    formData.append('content',this.content); //评论内容
                    formData.append('originUid',this.comment.uid); //评价人uid
                    formData.append('lid',this.comment.lid); //课堂uid
                    formData.append('uid',store.uid); //评论人uid
                    formData.append('name',store.name); //评论人姓名
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
    .feed-header{
        text-align: left;
        color: #999;
        font-size: 13px;
    }
</style>