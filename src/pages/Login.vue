<template>
<div class="app_content">
    <el-card class="box-card" v-loading="lg_loading"
                                    element-loading-text="正在登录……">
          <el-tabs v-model="activeName" style="text-align:center" @tab-click="handleClick">
              <el-tab-pane label="登录" name="first">
                  <el-form>
                  <el-input v-model="username" class="item" placeholder="用户名或邮箱"></el-input>
                  <el-input v-model="password" type="password" class="item" placeholder="密码" @keyup.enter="login"></el-input>
                  <el-radio-group v-model="type" size="small" class="item-radio">
                      <el-radio :label="1">学生</el-radio>
                      <el-radio :label="2">教师</el-radio>
                      <el-radio :label="3">教学管理员</el-radio>
                      <el-radio :label="4">管理员</el-radio>
                    </el-radio-group>
                  <el-button id="btn_login" type="primary" class="item-btn-login" @click="login">登录</el-button>
                                      <p class="item-p"><a class="item-p-link" href="#">无法登录？</a></p>
                  </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                 <el-form>
                       <el-input v-model="username" class="item" placeholder="用户名"></el-input>
                       <el-input v-model="email" class="item" placeholder="邮箱"></el-input>
                       <el-input v-model="password" type="password" class="item" placeholder="密码"></el-input>
                       <el-input v-model="repassword" type="password" class="item" placeholder="确认密码"></el-input>
                         <el-radio-group v-model="type" size="small" class="item-radio">
                           <el-radio :label="1">学生</el-radio>
                           <el-radio :label="2">教师</el-radio>
                           <el-radio :label="3">教学管理员</el-radio>
                           <el-radio :label="4">管理员</el-radio>
                         </el-radio-group>
                       <el-button type="primary" class="item-btn-login" @click="register">注册</el-button>
                  </el-form>
              </el-tab-pane>
          </el-tabs>
    </el-card>
</div>

</template>
<script>
import http from 'http'
import co from 'co'
export default{
    data () {
        return {
          radio: 'student',
          activeName: 'first',
          type:1,
          lg_loading:false,
          username:'',
          password:'',
          email:'',
          repassword:''
        }
      },
      methods: {
        login:function(event){
            this.lg_loading = true;
            var user = this.user;
            http.postJson('/api/user/login',user).then((value)=>{
                http.parseResp(value).then((result)=>{
                    //登录成功时
                    this.$router.push({ name: 'index', params: { name: this.username }});
                },(err)=>{
                    this.$message.warning(err);
                })
                this.lg_loading = false;
            },(err)=>{
                this.$message.error(err);
                this.lg_loading = false;
            });
        },
        register:function(event){
            this.lg_loading=true;
            var user = this.user;
            http.postJson('/api/user',user).then((value)=>{
                http.parseResp(value).then((result)=>{
                    //注册成功,跳转主界面
                    this.$router.push({ name: 'index', params: { name: this.username }});
                },(err)=>{
                    this.$message.warning(err);
                })
                this.lg_loading = false;
            },(err)=>{
                this.$message.warning(err);
                this.lg_loading = false;
            }).catch((err)=>{
                this.lg_loading = false;
            })
        },
        handleClick:function(event){
            this.username='admin';
            this.password='admin';
            this.repassword='admin';
            this.email ='286584630@qq.com';
            this.type=1;
        }
      },
      computed:{
        user:{
            get:function(){
                var user = new FormData();
                user.append('uid',this.username);
                user.append('pw',this.password);
                user.append('type',this.type);
                user.append('email',this.email);
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
    padding: 10px 0;
    margin:0 auto;
    width:300px;
  }
  .item-p{
    text-align:right;
  }
  .item-p-link{
    text-decoration:none;
    margin-right:80px;
    font-size:14px;
    color:#8492A6;
  }
  .item-p-link:hover{
    text-decoration:underline;
    color:#20A0FF;
  }
  .item-radio{
    margin:10px  0;
  }
  .item-btn-login{
    margin:10px 0;
    width:280px;
  }
  .box-card {
    padding:10px;
    margin:0 auto;
    width: 480px;
  }
  .app_content {
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
  }
</style>