<template>
    <div>
        <el-menu :default-active="activeIndex" style="text-align: center" mode="horizontal" @select="handleSelect">
            <el-menu-item v-if="isStudent" index="1">首页</el-menu-item>
            <el-menu-item v-else index="1">课程管理</el-menu-item>
            <el-menu-item index="3">我的消息

                <el-badge class="mark" :value="messageBadge"/>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">{{ this.$store.state.user.username }}</template>
                <el-menu-item index="2-1">个人信息</el-menu-item>
                <el-menu-item index="2-2">修改密码</el-menu-item>
                <el-menu-item index="2-4">我的动态</el-menu-item>
                <el-menu-item index="2-5" v-if="isStudent">加入班级</el-menu-item>
                <el-menu-item index="2-6">退出</el-menu-item>
            </el-submenu>
        </el-menu>
        <el-card>
            当前位置：
            <el-breadcrumb separator="/">
                <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
                <el-breadcrumb-item :to="{name:c.name}" v-for="(c,index) in this.crumbs">{{c.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <el-card class="center-content">
            <router-view></router-view>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                isStudent: this.$store.state.user.type == 1,
                messageBadge: 0,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key === '1') {  //评价课堂或学生首页
                    this.$router.push({
                        name: 'courseManage'
                    })
                } else if (key === '2-1') {  //个人信息
                    this.$router.push({
                        name: 'userInfo'
                    })
                } else if (key === '2-2') { //修改密码
                    this.$router.push({
                        name: 'modifyPw'
                    })
                } else if (key === '2-3') { //消息

                } else if (key === '2-4') { //我的动态

                } else if (key === '2-5') { //加入班级（学生）
                    this.$router.push({name: 'joinCourse'})
                } else if (key === '2-6') { //退出
                    localStorage.clear();//清空本地数据
                    this.$router.replace({name: 'login'});
                }
            }
        },
        computed: {
            crumbs: {
                get(){
                    return this.$store.state.crumb.paths;
                }
            }
        }
    }
</script>
<style>
    .center-content {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
    }
</style>