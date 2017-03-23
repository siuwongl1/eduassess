<template>
  <div id="app">
      <el-card class="box-card">
          <el-tabs v-model="activeName" style="text-align:center" @tab-click="handleClick">
              <el-tab-pane label="登录" name="first">
                  <el-form>
                  <el-input v-model="input" class="item" placeholder="用户名或邮箱"></el-input>
                  <el-input v-model="input" type="password" class="item" placeholder="密码"></el-input>
                  <el-radio-group v-model="type" size="small" class="item-radio">
                      <el-radio :label="1">学生</el-radio>
                      <el-radio :label="2">教师</el-radio>
                      <el-radio :label="3">教学管理员</el-radio>
                      <el-radio :label="4">管理员</el-radio>
                    </el-radio-group>
                  <el-button type="primary" class="item-btn-login">登录</el-button>
                                      <p class="item-p"><a class="item-p-link" href="#">无法登录？</a></p>
                  </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                   <el-form>
                         <el-input v-model="input" class="item" placeholder="用户名"></el-input>
                         <el-input v-model="input" class="item" placeholder="邮箱"></el-input>
                         <el-input v-model="input" type="password" class="item" placeholder="密码"></el-input>
                         <el-input v-model="input" type="password" class="item" placeholder="确认密码"></el-input>
                         <el-radio-group v-model="type" size="small" class="item-radio">
                             <el-radio :label="1">学生</el-radio>
                             <el-radio :label="2">教师</el-radio>
                             <el-radio :label="3">教学管理员</el-radio>
                             <el-radio :label="4">管理员</el-radio>
                           </el-radio-group>
                         <el-button type="primary" class="item-btn-login">注册</el-button>
                    </el-form>
              </el-tab-pane>
          </el-tabs>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 'student',activeName: 'first',type:1
    }
  },
  methods: {

  },
  computed:{

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
</style>
