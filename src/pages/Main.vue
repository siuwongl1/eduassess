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
                <el-breadcrumb-item :to="{name:c.name}" v-for="(c,index) in this.crumbs" replace>{{c.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <div card class="center-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import sockjs from 'sockjs'
    import Stomp from 'stompjs'
    import http from 'http'
    import co from 'co'
    export default {
        data() {
            return {
                activeIndex: '1',
                isStudent: this.$store.state.user.type === '1',
                messageBadge: 0,
                stompClient:{},
                notices:[],

            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$store.commit('storeMenuKey', {key: key});
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
                } else if (key === '3') { //消息
                    this.$router.push({
                        name: 'notice'
                    })
                } else if (key === '2-4') { //我的动态
                    this.$router.push({name: 'myActivity'})
                } else if (key === '2-5') { //加入班级（学生）
                    var user = this.$store.state.user;
                    var infoComplete = user.name||user.cls||user.pro||user.schoolId||false;
                    if(!infoComplete){
                        this.$alert('您的信息未完善，无法进行评价流程，请先去完善您的个人信息', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push({name: 'userInfo'})
                            }
                        });
                    }else{
                        this.$router.push({name: 'joinCourse'})
                    }
                } else if (key === '2-6') { //退出
                    localStorage.clear();//清空本地数据
                    if(this.stompClient){
                        this.stompClient.disconnect();
                    }
                    this.$router.replace({name: 'login'});
                }
            },
            subscribeMessage(){
                //消息订阅
                if (location.search == '?ws') {
                    this.stompClient = Stomp.client('ws://' + window.location.hostname + ':15674/ws');
                } else {
                    var ws = new SockJS('http://' + window.location.hostname + ':15674/stomp');
                    this.stompClient = Stomp.over(ws);
                }
//                var destination = `/topic/message/${this.$store.state.user.username}`;
                var destination = `/topic/${this.$store.state.user.uid}`;
                this.stompClient.heartbeat.outgoing = 0;
                this.stompClient.heartbeat.incoming = 0;
                var that =this;
                var on_connect = function() {
                    that.stompClient.subscribe(destination, function(d) {
                        var jsonObj = JSON.parse(d.body);
                        that.notices.push(jsonObj);
                        that.messageBadge  =that.notices.length;
                        console.log(d.body);
                    });
                };
                var on_error =  function() {
                    console.log('error');
                };
                this.stompClient.connect('guest', 'guest', on_connect, on_error, '/');
            },
            fetchNotice(){
                var store = this.$store.state.user;
                var url =`/api/notice/${store.uid}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    this.notices=result|| [];
                    this.messageBadge  =this.notices.length;
                    this.$store.commit('storeNotice',{data:this.notices});
                }).catch(err=>{
                    this.$message.error(err);
                })
            }

        },
        computed: {
            crumbs: {
                get(){
                    return this.$store.state.crumb.paths;
                }
            }
        },
        created(){
            this.activeIndex = this.$store.state.menu.key || '1';
            this.subscribeMessage();
            this.fetchNotice();

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