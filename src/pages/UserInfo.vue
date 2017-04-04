<template>
    <el-card class="box-card">
        <el-form label-width="80px" :label-position="labelPosition">
              <el-form-item label="旧密码">
                <el-input type="password" v-model="user.origin"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input type="password" v-model="user.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input type="password" v-model="user.retype"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button class="item-button" type="primary" @click="onSubmit">确认修改</el-button>
                  <el-button class="item-button">取消</el-button>
                </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
  export default {
    data() {
      return {
          labelPosition: 'right',
          user:{
                password:'',
                retype:'',
                origin:''
          }
      };
    },
    methods: {
        onSubmit:function(event){

        }
    }
  }
</script>
<style>
.box-card {
    width: 480px;
  }
.item-button{
    width:100px;
}
</style>