<template>
    <div>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">我的课堂</el-menu-item>
            <el-menu-item index="3">我的消息

                <el-badge class="mark" :value="messageBadge"/>
            </el-menu-item>

            <el-submenu index="2">
                <template slot="title">{{ $route.params.name }}</template>
                <el-menu-item index="2-1">个人信息</el-menu-item>
                <el-menu-item index="2-2">修改密码</el-menu-item>
                <el-menu-item index="2-4">我的动态</el-menu-item>
                <el-menu-item index="2-5" v-if="isStudent">加入班级</el-menu-item>
                <el-menu-item index="2-6">退出</el-menu-item>
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
                activeIndex: '1',
                isStudent: this.$route.params.type == 1,
                messageBadge: 0
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                if (keyPath[1] === '2-1') {  //个人信息
                    this.$router.push({
                        name: 'userInfo',
                        params: {type: this.$route.params.type, uid: this.$route.params.uid}
                    })
                } else if (keyPath[1] === '2-2') { //修改密码
                    this.$router.push({
                        name: 'modifyPw',
                        params: {username: this.$route.params.name, uid: this.$route.params.uid}
                    })
                } else if (keyPath[1] === '2-3') { //消息

                } else if (keyPath[1] === '2-4') { //我的动态

                } else if (keyPath[1] === '2-5') { //加入班级（学生）

                } else if (keyPath[1] === '2-6') { //退出
                    this.$router.replace({name: 'login'});
                }
            }
        }
    }
</script>
<style>
    .center-content {
        position: absolute;
        top: 20%;
        width: 100%;
        text-align: center;
    }
</style>