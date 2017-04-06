<template>
    <el-card class="box-card" v-loading="loading" element-loading-text="正在获取个人信息……">
        <el-form label-width="80px" :label-position="labelPosition" :rules="userRules" :model="userForm" ref="userForm">
            <el-form-item label="专业" prop="pro">
                <el-input type="text" v-model="userForm.pro"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="cls">
                <el-input type="text" v-model="userForm.cls"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="userForm.name"/>
            </el-form-item>
            <el-form-item label="性别" style="text-align: left">
                <el-radio-group v-model="userForm.sex" size="small">
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
                isStudent: this.$route.params.type == 1,
                type: this.$route.params.type,// 用户类型
                userForm: {
                    pro: '',  //专业
                    cls: '',  //班级
                    sex: 1,  //性别
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
        methods: {
            onSubmit: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        var url = `/api/user/${this.$route.params.uid}`;
                        http.putJson(url, this.info).then((value) => {
                            this.loading = false;
                            http.parseResp(value).then((json) => {
                                this.$message('修改成功');
                            }, (err) => {
                                this.$message.error(err);
                            })
                        }, (err) => {
                            this.loading = false;
                            console.log(err);
                        })
                    }
                })
            },
            onReset: function (formName) {
                this.$refs[formName].resetFields();
            },
            fetchData: function () {
                this.loading = true;
                var url = `/api/user/${this.$route.params.uid}`;
                http.getJson(url).then((value) => {
                    http.parseResp(value).then((result) => {
                        if (result.data.length > 0) {
                            var user = result.data[0];
                            this.userForm.pro = user.pro;
                            this.userForm.cls = user.cls;
                            this.userForm.name = user.name;
                            this.userForm.sex = user.sex == undefined ? 1 : Number.parseInt(user.sex);
                            this.userForm.schoolId = user.schoolId;
                        }
                    }, (err) => {
                        console.log(err);
                    })
                    this.loading = false;
                }, (err) => {
                    this.loading = false;
                }).catch((err) => {
                    this.loading = false;
                })
            }
        },
        computed: {
            info: {
                get: function () {
                    var formData = new FormData();
                    formData.append('cls', this.userForm.cls);
                    formData.append('sex', this.userForm.sex);
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

    .item-sex {
    }

    .item-button {
        width: 100px;
    }
</style>