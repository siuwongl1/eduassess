<template>
    <div class="app_content">
        <el-card class="box-card" v-loading="loading"
                 element-loading-text="正在登录……">
            <el-tabs v-model="activeName" style="text-align:center">
                <el-tab-pane label="登录" name="first">
                    <el-form label-width="80px" :label-position="labelPosition" :model="loginForm" ref="loginForm"
                             :rules="loginRules">
                        <el-form-item label="用户名" prop="username" class="item-label">
                            <el-input v-model="loginForm.username" class="item" placeholder="请输入您的账号或邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" class="item-label">
                            <el-input v-model="loginForm.password" type="password" class="item" placeholder="请输入您的密码"
                                      @keyup.enter="login"></el-input>
                        </el-form-item>
                        <el-form-item label="用户类型" prop="type" class="item-label">
                            <el-radio-group v-model="loginForm.type" size="small" class="item-radio">
                                <el-radio :label="1">学生</el-radio>
                                <el-radio :label="2">教师</el-radio>
                                <el-radio :label="3">管理员</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-button id="btn_login" type="primary" class="item-btn-login" @click="login('loginForm')">登录
                        </el-button>
                        <p class="item-p"><a class="item-p-link" @click="goRetrieve" href="javascript:void(0)">无法登录？</a>
                        </p>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                    <el-form label-width="80px" :label-position="labelPosition" :model="registerForm" ref="registerForm"
                             :rules="registerRules">
                        <el-form-item label="用户名" prop="username" class="item-label">
                            <el-input v-model="registerForm.username" class="item" placeholder="请输入您的用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" class="item-label">
                            <el-input v-model="registerForm.email" class="item" placeholder="请输入您的邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" class="item-label">
                            <el-input v-model="registerForm.password" type="password" class="item"
                                      placeholder="请输入您的密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="retype" class="item-label">
                            <el-input v-model="registerForm.retype" type="password" class="item"
                                      placeholder="请输入确认密码"></el-input>
                        </el-form-item>
                        <el-form-item label="用户类型" prop="type" class="item-label">
                            <el-radio-group v-model="registerForm.type" size="small" class="item-radio">
                                <el-radio :label="1">学生</el-radio>
                                <el-radio :label="2">教师</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-button type="primary" class="item-btn-login" @click="register('registerForm')">注册

                        </el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <p style="text-align: center" class="footer">
            ©️2017 <a href="http://www.zjut.edu.cn/" target="_blank">浙江工业大学 </a><span class="dot">·</span><a
                href="http://www.et.zjut.edu.cn/" target="_blank">教育科学与技术学院</a>
        </p>
    </div>

</template>
<script>
    import http from 'http'
    import valid from 'valid'
    import co from 'co'
    export default{
        data () {
            var checkUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            }
            var checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            }
            var checkRetype = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('确认密码不能为空'));
                } else if (!value === this.registerForm.password) {
                    callback(new Error('密码与确认密码不一致'));
                } else {
                    callback();
                }
            }
            var checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱不能为空'));
                } else if (!valid.validEmail(value)) {
                    callback(new Error('邮箱格式不正确'))
                } else {
                    callback();
                }
            }
            return {
                labelPosition: 'right',
                radio: 'student',
                activeName: 'first',
                loading: false,
                loginForm: {
                    username: '',
                    password: '',
                    type: 1
                },
                registerForm: {
                    username: '',
                    password: '',
                    retype: '',
                    email: '',
                    type: 1
                },
                loginRules: {
                    username: [{validator: checkUsername, trigger: 'blur'}],
                    password: [{validator: checkPassword, trigger: 'blur'}]
                },
                registerRules: {
                    username: [{validator: checkUsername, trigger: 'blur'}],
                    password: [{validator: checkPassword, trigger: 'blur'}],
                    retype: [{validator: checkRetype, trigger: 'blur'}],
                    email: [{validator: checkEmail, trigger: 'blur'}]
                }
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var user = this.user;
                        this.loading = true;
                        co(function *() {
                            var result = yield http.postJson('/api/user/login', user);
                            return result;
                        }).then(result => {
                            //登录成功时，路由到主界面，传递相关参数：用户名，用户uid，用户类型等状态信息
                            this.$store.commit('storeUser', {
                                username: result.username,
                                type: result.type,
                                uid: result._id,
                                name: result.name,
                                pro: result.pro,
                                cls: result.cls,
                                sex: result.sex,
                                schoolId: result.schoolId
                            });
                            this.$store.commit('storeMenuKey',{key:'1'});
                            this.$router.push({name: 'courseManage'});
                            this.loading = false;
                        }, err => {
                            this.$message.error(err);
                            this.loading = false;
                        }).catch(err => {
                            this.loading = false;
                            this.$message.error(err);
                        })
                    }
                })
            },
            register: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        var user = this.user;
                        co(function *() {
                            var result = yield http.postJson('/api/user', user);
                            return result;
                        }).then(result => {
                            //注册成功,跳转主界面
                            this.loading = false;
                            this.$store.commit('storeUser', {
                                username: this.registerForm.username,
                                uid: result,
                                type: this.registerForm.type.toString(),
                            });
                            this.$router.push({name: 'courseManage'});
                        }, err => {
                            this.loading = false;
                            this.$message.error(err);
                        }).catch(err => {
                            this.loading = false;
                            console.log(err);
                        })
                    }
                })
            },
            goRetrieve(){
                this.$router.push({name: 'retrieve'});
            }
        },
        computed: {
            user: {
                get() {
                    var user = new FormData();
                    if (this.activeName == 'first') {  //登录表单
                        user.append('uid', this.loginForm.username);
                        user.append('pw', this.loginForm.password);
                        user.append('type', this.loginForm.type);
                    } else { //注册表单
                        user.append('uid', this.registerForm.username);
                        user.append('pw', this.registerForm.password);
                        user.append('type', this.registerForm.type);
                        user.append('email', this.registerForm.email);
                    }
                    return user;
                }
            }
        }
    }
</script>
<style>
    body {
        font-family: Helvetica, sans-serif;
    }

    .text {
        font-size: 14px;
    }

    .app_content {
        position: absolute;
        top: 20%;
        width: 100%;
        text-align: center;
    }

    .item {
        margin: 0 auto;
        width: 320px;
    }

    .item-label {
        text-align: left;
    }

    .item-p {
        text-align: right;
        margin-top: 20px;
    }

    .item-p-link {
        text-decoration: none;
        margin-right: 40px;
        font-size: 14px;
        color: #8492A6;
    }

    .item-p-link:hover {
        text-decoration: underline;
        color: #20A0FF;
    }

    .item-radio {
        margin: 10px 0;
    }

    .item-btn-login {
        width: 300px;
    }

    .box-card {
        padding: 10px;
        margin: 0 auto;
        width: 480px;
    }
</style>