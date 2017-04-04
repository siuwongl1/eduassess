<template>
    <div>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          <el-submenu index="2">
                <template slot="title">{{ $route.params.name }}</template>
                <el-menu-item index="2-1">个人信息</el-menu-item>
                <el-menu-item index="2-2">修改密码</el-menu-item>
                <el-menu-item index="2-3">退出</el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="center-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        if(keyPath[1]==='2-1'){

        }else if(keyPath[1]==='2-2'){
            this.$router.push({name:'modifyPw'})
        }else if(keyPath[1]==='2-3'){ //退出
            this.$router.push({name:'login'});
        }
      }
    }
  }
</script>
<style>
  .center-content{
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
  }
</style>