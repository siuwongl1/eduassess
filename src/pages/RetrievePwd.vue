<template>
    <div class="app_content">
        <el-card class="box-card">
            <el-form label-width="80px"  :model="retrievePwForm" ref="retrievePwForm" :label-position="labelPosition" :rules="formRules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="retrievePwForm.username" class="item" placeholder="请输入您的用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="retrievePwForm.email" class="item" placeholder="请输入您的注册邮箱"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                    <el-input v-model="retrievePwForm.captcha" style="width: 200px" placeholder="请输入验证码"></el-input>
                    <el-button type="primary" style="width: 120px;" :disabled="disableCaptchaButton" @click="getCaptcha">{{captchaButton}}</el-button>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="retrievePwForm.password" class="item" placeholder="请输入您的新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="retype">
                    <el-input type="password" v-model="retrievePwForm.retype" class="item" placeholder="请输入您的确认密码"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" class="item-button" @click="retrievePw('retrievePwForm')">确定</el-button>
                <el-button type="primary" class="item-button" @click="back()">返回</el-button>
            </div>
        </el-card>
        <p style="text-align: center" class="footer">
            ©️2017 <a href="http://www.zjut.edu.cn/" target="_blank">浙江工业大学 </a><span class="dot">·</span><a
                href="http://www.et.zjut.edu.cn/" target="_blank">教育科学与技术学院</a>
        </p>
    </div>
</template>
<script>
    import co from 'co'
    import http from 'http'
    import valid from 'valid'
    export default{
        data(){
            var checkUsername = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('用户名不能为空'));
                }else{
                    cb();
                }
            }
            var checkEmail = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('注册邮箱不能为空'));
                }else if(!valid.validEmail(value)){
                    cb(new Error('邮箱格式不正确'));
                }else{
                    cb();
                }
            }
            var checkCaptcha = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('验证码不能为空'));
                }else{
                    cb();
                }
            }
            var checkPassword = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('新密码不能为空'));
                }else{
                    cb();
                }
            }
            var checkRetype = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('确认密码不能为空'));
                }else if(value==this.retrievePwForm.retyep){
                    cb(new Error('新密码与确认密码不一致'));
                }else{
                    cb();
                }
            }
            return{
                retrievePwForm:{
                    username:'',
                    email:'',
                    captcha:'',
                    password:'',
                    retyep:'',
                },
                labelPosition:'right',
                formRules:{
                    username:[{validator:checkUsername,trigger:'blur'}],
                    email:[{validator:checkEmail,trigger:'blur'}],
                    captcha:[{validator:checkCaptcha,trigger:'blur'}],
                    password:[{validator:checkPassword,trigger:'blur'}],
                    retype:[{validator:checkRetype,trigger:'blur'}]
                },
                originButtonText:'获取验证码',
                captchaButton:'获取验证码',
                disableCaptchaButton:false,
                counter:0,//计数
                timer:{},//计时器
            }
        },
        methods:{
            retrievePw(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        var pw= this.pw;
                        var url =`/api/user/pw/${this.retrievePwForm.username}`;
                        co(function *() {
                            var result = yield http.postJson(url,pw);
                            return result;
                        }).then(result=>{
                            this.$alert('修改成功，请重新登录', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.replace({name:'login'});
                                }
                            });
                        }).catch(err=>{
                            this.$message.error(err);
                        })
                    }
                })
            },
            back(){
                this.$router.go(-1);
            },
            getCaptcha(){
                if(this.retrievePwForm.username===''){
                    this.$message.warning('用户名不能为空');
                }else if(this.retrievePwForm.email===''){
                    this.$message.warning('注册邮箱不能为空');
                }else{
                    var url =`/api/user/${this.retrievePwForm.username}/${this.retrievePwForm.email}`;
                    co(function *() {
                        var result = yield http.getJson(url);
                        return result;
                    }).then(result=>{
                        this.$message('验证码已发送至您的邮箱，请查收');
                        this.disableCaptchaButton=true;
                        this.counter = 60;
                        this.setTimeOutButton();
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                }
            },
            setTimeOutButton(){
                if(this.counter<=0){
                    clearTimeout(this.timer);
                    this.captchaButton = this.originButtonText;
                    this.disableCaptchaButton = false;
                    return;
                }
                this.captchaButton=(this.counter--)+' s';
                this.timer= setTimeout(this.setTimeOutButton,1000);
            }
        },
        computed:{
            pw:{
                get(){
                    var formData = new FormData();
                    formData.append('code',this.retrievePwForm.captcha);
                    formData.append('password',this.retrievePwForm.password);
                    return formData;
                }
            }
        }
    }
</script>
<style>
    .app_content {
        position: absolute;
        top: 20%;
        width: 100%;
        text-align: center;
    }
    .box-card {
        padding: 10px;
        margin: 0 auto;
        width: 480px;
    }
    .item {
        margin: 0 auto;
        width: 320px;
    }
    .item-button{
        width:150px;
    }
</style>