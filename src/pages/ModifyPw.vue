<template>
    <el-card class="box-card" v-loading="loading"
             element-loading-text="正在请求中……">
        <el-form label-width="100px" :label-position="labelPosition" :rules="myrules"  :model="user" ref="user">
            <el-form-item label="旧密码" prop="origin">
                <el-input type="password" v-model="user.origin"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="retype">
                <el-input type="password" v-model="user.retype"></el-input>
            </el-form-item>
            <div>
                <el-button class="item-button" type="primary" @click="onSubmit('user')">确认修改</el-button>
                <el-button class="item-button" type="primary" @click="onReset('user')">重置</el-button>
            </div>
        </el-form>
    </el-card>
</template>
<script>
    import "babel-polyfill";
    import http from 'http';
    import co from 'co';
    export default {
        data() {
            var checkRetype = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.user.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            var checkPw= (rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            }
            var checkOrigin=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('请输入旧密码'));
                }else{
                    callback();
                }
            }
            return {
                labelPosition: 'right',
                loading: false,
                user: {
                    username: this.$route.params.username,
                    password: '',
                    retype: '',
                    origin: ''
                },
                myrules:{
                    retype:[{validator:checkRetype,trigger:'blur'}],
                    origin:[{validator:checkOrigin,trigger:'blur'}],
                    password:[{validator:checkPw,trigger:'blur'}]
                }
            };
        },
        methods: {
            onSubmit: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.loading = true;
                        var url = `/api/user/pw/${this.$route.params.uid}`;
//                co(function *() {  //??? 没有反应？Promise 返回co没有对iterator遍历？
//                    var result = yield http.putJson(url, this.user);
//                    console.log(result);
//                }).catch((err)=>{
//                    console.log(err);
//                });
                        http.putJson(url, this.pw).then((value) => {
                            http.parseResp(value).then((json) => {
                                this.$message(json.message);
                            }, (err) => {
                                this.$message.warning(err);
                            });
                            this.loading = false;
                        }, (err) => {
                            this.loading = false;
                            this.$message.warning(err);
                        });
                    }
                })
            },
            onReset: function (formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed: {
            pw: {
                get: function () {
                    var formData = new FormData();
                    formData.append('pw', this.user.password);
                    formData.append('origin', this.user.origin);
                    return formData;
                }
            }
        }
    }
</script>
<style>
    .box-card {
        width: 480px;
    }

    .item-button {
        width: 100px;
    }
</style>