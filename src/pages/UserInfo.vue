<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="正在获取个人信息……">
        <el-form label-width="80px" :label-position="labelPosition" :rules="userRules" :model="userForm" ref="userForm">
            <el-form-item label="专业" prop="pro">
                <el-input type="text" v-model="userForm.pro"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="cls" v-if="isStudent">
                <el-input type="text" v-model="userForm.cls"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="userForm.name"/>
            </el-form-item>
            <el-form-item label="性别" style="text-align: left" >
                <el-radio-group v-model="sex" size="small">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="学号" v-if="isStudent" prop="schoolId">
                <el-input type="text" v-model="userForm.schoolId"/>
            </el-form-item>
            <el-form-item label="工号" v-else prop="schoolId">
                <el-input type="text" v-model="userForm.schoolId"/>
            </el-form-item>
            <div>
                <el-button class="item-button" type="primary" @click="onSubmit('userForm')">确定</el-button>
                <el-button class="item-button" type="primary" @click="onReset('userForm')">重置</el-button>
            </div>
        </el-form>
    </el-card>
</template>
<script>
    import http from 'http'
    import co from 'co'
    export default {
        data() {
            var checkPro = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('专业名称不能为空'));
                } else {
                    callback();
                }
            }
            var checkCls = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('班级不能为空'));
                } else {
                    callback();
                }
            }
            var checkName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('姓名不能为空'));
                } else {
                    callback();
                }
            }
            var checkSchoolId = (rule, value, callback) => {
                if (value === '') {
                    if (this.type == 1) {
                        callback(new Error('学号不能为空'));
                    } else {
                        callback(new Error('工号不能为空'));
                    }
                } else {
                    callback();
                }
            }
            return {
                labelPosition: 'right',
                loading: false,
                submited:false,
                isStudent: this.$store.state.user.type == 1,
                type: this.$store.state.user.type,// 用户类型
                sex:1,
                userForm: {
                    pro: '',  //专业
                    cls: '',  //班级
                    name: '', //姓名
                    schoolId: '' // 学号或者工号,
                },
                userRules: {
                    pro: [{validator: checkPro, trigger: 'blur'}],
                    cls: [{validator: checkCls, trigger: 'blur'}],
                    name: [{validator: checkName, trigger: 'blur'}],
                    schoolId: [{validator: checkSchoolId, trigger: 'blur'}]
                }
            }
        },
        created(){
            this.fetchData();
        },
        watch:{
            info:function (newInfo) {
                this.submited = false;  //监测表单数据是否发生改变，如果没有改变，则不允许重复提交表单
            }
        },
        methods: {
            onSubmit: function (formName) {
                if(this.submited){
                   this.$message.warning('您的信息没有任何改变哦');
                   return ;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        var url = `/api/user/${this.$store.state.user.uid}`;
                        this.submited = true;
                        var info = this.info;
                        co(function *() {
                            var result= yield http.putJson(url, info);
                            return result;
                        }).then(result=>{
                            var user = this.userForm;
                            user.sex = this.sex.toString();
                            this.$store.commit('storeUser',user);
                            this.$message('修改成功');
                            this.loading = false;
                        }, err => {
                            this.loading = false;
                            if(err && typeof err ==='object' &&err.statusCode){
                                if(err.statusCode===1){
                                    this.$message.error(err.message);
                                }else if(err.statusCode===401){
                                    this.$router.replace({name:'login'});
                                }
                            }else{
                                this.$message.error(err);
                            }
                        }).catch(err=>{
                            this.loading = false;
                            this.$message.error(err);
                        })
                    }
                })
            },
            onReset: function (formName) {
                this.sex = 1;
                this.$refs[formName].resetFields();
            },
            fetchData: function () {
                this.loading = true;
                var url = `/api/user/${this.$store.state.user.uid}`;
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result=>{
                    if (result.length>0) {
                        var user = result[0];
                        this.userForm.pro = user.pro;
                        this.userForm.cls = user.cls;
                        this.userForm.name = user.name;
                        this.sex = user.sex == undefined ? 1 : Number.parseInt(user.sex);
                        this.userForm.schoolId = user.schoolId;
                    }
                    this.loading = false;
                },err=>{
                    this.$message.error(err);
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                    this.$message.error(err);
                })
            }
        },
        computed: {
            info: {
                get: function () {
                    var formData = new FormData();
                    if(this.isStudent){
                        formData.append('cls', this.userForm.cls);
                    }
                    formData.append('sex', this.sex);
                    formData.append('pro', this.userForm.pro);
                    formData.append('name', this.userForm.name);
                    formData.append('schoolId', this.userForm.schoolId);
                    formData.append('type', this.type);
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