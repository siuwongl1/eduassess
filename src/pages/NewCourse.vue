<template>
    <el-card class="box-card" v-loading="loading"
             element-loading-text="正在上传数据……">
        <el-form label-width="80px" :model="courseForm" :label-position="labelPosition" ref="courseForm"
                 :rules="formRules">
            <el-form-item prop="name" label="课程名称">
                <el-input v-model="courseForm.name"/>
            </el-form-item>
            <el-form-item prop="pro" label="专业">
                <el-input v-model="courseForm.pro"/>
            </el-form-item>
            <el-form-item prop="cls" label="班级">
                <el-input v-model="courseForm.cls"/>
            </el-form-item>
            <el-form-item prop="period" label="学期">
                <el-input v-model="courseForm.period" :disabled="true"/>
            </el-form-item>
            <div>
                <el-button class="item-button" type="primary" @click="onSubmit('courseForm')">确定</el-button>
                <el-button class="item-button" type="primary" @click="onReset('courseForm')">重置</el-button>
            </div>
        </el-form>
    </el-card>
</template>
<script>
    import http from 'http';
    export default{
        data(){
            var checkName = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请输入课程名称'));
                } else {
                    cb();
                }
            }
            var checkPro = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请输入专业'));
                } else {
                    cb();
                }
            }
            var checkCls = (rule, value, cb) => {
                if (value === '') {
                    cb(new Error('请输入班级'));
                } else {
                    cb();
                }
            }
            return {
                labelPosition: 'right',
                loading:false,
                submited:false,
                courseForm: {
                    name: '',
                    period: '',
                    pro: '',
                    cls: ''
                },
                formRules: {
                    name: [{validator: checkName, trigger: 'blur'}],
                    pro: [{validator: checkPro, trigger: 'blur'}],
                    cls: [{validator: checkCls, trigger: 'blur'}],
                }
            }
        },
        created(){
            this.courseForm.period = this.getCurrentPeriod();
        },
        watch:{
            course:function () {
                //当表单数据改变时，设置提交状态为false
                this.submited =false;
            }
        },
        methods: {
            getCurrentPeriod(){
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var result;
                if (month > 9) {
                    //第一个学期
                    result = `${year}/${year + 1}(1)`;
                } else {
                    //第二个学期
                    result = `${year - 1}/${year}(2)`;
                }
                return result;
            },
            onSubmit(formName){
                if(this.submited){
                    this.$message.warning('您的信息没有任何改变哦');
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        var url = '/api/course';
                        http.postJson(url,this.course).then((value)=>{
                            this.loading = false;
                            this.submited =true;
                            http.parseResp(value).then((json)=>{
                                this.$message('添加成功！');
                            },(err)=>{
                                this.$message.error(err);
                            })
                        },(err)=>{
                            this.loading = false;
                            this.$message.error(err);
                        }).catch((err)=>{
                            this.loading = false;
                            console.log(err);
                        })
                    }

                })
            },
            onReset(formName){
                this.$refs[formName].resetFields();
            }
        },
        computed: {
            course: {
                get: function () {
                    var formData = new FormData();
                    formData.append('name', this.courseForm.name); //课程名称
                    formData.append('cls', this.courseForm.cls); //班级名称
                    formData.append('pro', this.courseForm.pro); //专业名称
                    formData.append('period', this.courseForm.period); //学期
                    formData.append('uid', this.$store.state.uid); //教师id
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
</style>