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
                <el-row>
                    <el-col :span="12">
                        <div style="display: inline">
                            备课充分
                            <el-rate
                                    v-model="commentForm.ratePrepare"
                                    show-text>
                            </el-rate>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="display: inline">
                            课堂交互
                            <el-rate
                                    v-model="commentForm.rateInteraction"
                                    show-text>
                            </el-rate>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div style="display: inline">
                            内容讲解
                            <el-rate
                                    v-model="commentForm.rateContent"
                                    show-text>
                            </el-rate>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="display: inline">
                            课后答疑
                            <el-rate
                                    v-model="commentForm.rateAnswer"
                                    show-text>
                            </el-rate>
                        </div>
                    </el-col>
                </el-row>
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
        components: {
            'comment-list': commentComponent
        },
        data(){
            var checkComment = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('评价内容不能为空'));
                } else {
                    cb();
                }
            }
            return {
                lesson: {
                    uid: this.$store.state.lesson.uid,
                    name: this.$store.state.lesson.name,
                    content: this.$store.state.lesson.content
                },
                storeUser: this.$store.state.user,
                labelPosition: 'right',
                cid: this.$store.state.course.uid,
                inputSwitch: false,
                commentForm: {
                    ratePrepare: 5,
                    rateInteraction: 5,
                    rateContent: 5,
                    rateAnswer: 5,
                    content: ''
                },
                formRules: {
                    content: [{validator: checkComment, trigger: 'blur'}]
                },
                comments: []
            }
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData(){
                var url = `/api/comment/lesson/${this.lesson.uid}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result => {
                    if (result && result.length > 0) {
                        this.comments = result;
                    }
                }, err => {
                    this.$message.error(err);
                }).catch(err => {
                    this.$message.error(err);
                })
            },
            postComment(){
                if (!this.storeUser.name) {
                    this.$alert('完善个人信息才可进行操作', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                            this.$router.replace({name: 'userInfo'});
                        }
                    })
                } else {
                    var url = `/api/comment/${this.lesson.uid}`;
                    var comment = this.comment;
                    co(function *() {
                        var result = yield http.postJson(url, comment);
                        return result;
                    }).then(result => {
                        this.$message('评价成功');
                        this.fetchData();
                    }, err => {
                        if (err && typeof err === 'object' && err.statusCode) {
                            if (err.statusCode === 1) {
                                this.$message.error(err.message);
                            } else if (err.statusCode === 401) {
                                this.$router.replace({name: 'login'});
                            }
                        } else {
                            this.$message.error(err);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            switchInput(val){
                this.inputSwitch = val;
            },
            onReset(formName){
                this.$refs[formName].resetFields();
            },
            update(msg){
                this.fetchData();
            },

        },
        computed: {
            comment: {
                get(){
                    var formData = new FormData();
                    formData.append('content', this.commentForm.content); //评价内容
                    formData.append('name', this.$store.state.user.name); //用户名称
                    formData.append('uid', this.$store.state.user.uid); //用户id
                    formData.append('cid', this.$store.state.course.uid); //课程id
                    formData.append('rateContent',this.commentForm.rateContent);//内容评分
                    formData.append('rateAnswer',this.commentForm.rateAnswer);//课堂讲解评分
                    formData.append('rateInteraction',this.commentForm.rateInteraction);//课堂交互评分
                    formData.append('ratePrepare',this.commentForm.ratePrepare);//课堂准备
                    return formData;
                }
            }
        }
    }
</script>
<style>
</style>