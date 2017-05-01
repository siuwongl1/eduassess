<template>
    <div>
        <el-card>
            <h1>{{this.lesson.name}}</h1>
            <p>{{this.lesson.content}}</p>
            <div>
                <el-button type="text" @click="switchInput(true)" icon="el-icon-edit">添加评价</el-button>
                <el-button v-show="inputSwitch" type="text" @click="switchInput(false)">隐藏</el-button>

            </div>
        </el-card>
        <el-card v-show="inputSwitch">
            <el-form label-width="80px" :model="commentForm" :label-position="labelPosition" ref="commentForm"
                     :rules="formRules">
                <el-form-item prop="content" label="评价内容">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入评价内容"
                            v-model="commentForm.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="padding: 10px 0">
                <el-button type="primary" @click="postComment('commentForm')">提交</el-button>
                <el-button type="primary" @click="onReset('commentForm')">清空</el-button>
            </div>
        </el-card>
        <comment-list v-bind:comments="comments" v-on:update="update"></comment-list>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    import commentComponent from '../components/comment-list.vue'
    export default{
        components:{
            'comment-list':commentComponent
        },
        data(){
            var checkComment = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('评价内容不能为空'));
                }else{
                    cb();
                }
            }
            return {
                lesson:{
                    uid:this.$store.state.lesson.uid,
                    name:this.$store.state.lesson.name,
                    content:this.$store.state.lesson.content
                },
                labelPosition:'right',
                cid:this.$store.state.course.uid,
                inputSwitch:false,
                commentForm:{
                    content:''
                },
                formRules:{
                    content:[{validator:checkComment,trigger:'blur'}]
                },
                comments:[]
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                var url = `/api/comment/lesson/${this.lesson.uid}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    if(result&&result.length>0){
                        this.comments = result;
                    }
                },err=>{
                    this.$message.error(err);
                }).catch(err=>{
                    this.$message.error(err);
                })
            },
            postComment(){
                var url = `/api/comment/${this.lesson.uid}`;
                var comment = this.comment;
                co(function *() {
                    var result=  yield http.postJson(url,comment);
                    return result;
                }).then(result=>{
                    this.$message('评价成功');
                    this.fetchData();
                },err=>{
                    this.$message.error(err);
                }).catch(err=>{
                    this.$message.error(err);
                })
            },
            switchInput(val){
                this.inputSwitch =val;
            },
            onReset(formName){
                this.$refs[formName].resetFields();
            },
            update(msg){
//                if(msg){
//                    if(!this.comments[msg.index].like){
//                        this.comments[msg.index].like= new Array();
//                    }
//                    this.comments[msg.index].like.push(msg.metaData);
//                    console.log(this.comments[msg.index]); //子组件变化时，通过从子组件来通知父组件，从而改变父组件的props数据，但是为什么这里不起作用？
//                }
                console.log('update');
                this.fetchData();
            }
        },
        computed:{
            comment:{
                get(){
                    var formData = new FormData();
                    formData.append('content',this.commentForm.content);
                    formData.append('name',this.$store.state.user.name);
                    formData.append('uid',this.$store.state.user.uid);
                    return formData;
                }
            }
        }
    }
</script>
<style>
</style>