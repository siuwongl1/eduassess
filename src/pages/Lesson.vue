<template>
    <div>
        <el-card>
            <h1>{{this.lesson.name}}</h1>
            <p>{{this.lesson.content}}</p>
            <div>
                <el-button type="text" @click="switchInput(true)" icon="el-icon-edit">添加评价</el-button>
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
                <el-button type="primary" @click="this.$refs['commentForm'].resetFields()">清空</el-button>
                <el-button type="text" @click="switchInput(false)">隐藏</el-button>
            </div>
        </el-card>
        <comment-list v-bind:comments="comments"></comment-list>
    </div>
</template>
<script>
    import http from 'http'
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
                http.getJson(url).then((res)=>{
                    http.parseResp(res).then((result)=>{
                        console.log(result);
                        if(result&&result.length>0){
                            this.comments = result;
                        }
                    },(err)=>{
                        this.$message.error(err);
                    })
                }).catch((err)=>{
                    console.log(err);
                })
            },
            postComment(){
                var url = `/api/comment/${this.lesson.uid}`;
                http.postJson(url,this.comment).then((resp)=>{
                    http.parseResp(resp).then((result)=>{
                        this.$message('评价成功');
                        this.fetchData();
                    },(err)=>{
                        this.$message.error(err);
                    })
                }).catch((err)=>{
                    console.log(err);
                })
            },
            switchInput(val){
                this.inputSwitch =val;
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