<template>
    <el-card class="box-card" v-loading="loading"
             element-loading-text="正在上传数据……">
        <el-form label-width="80px" :model="lessonForm" :label-position="labelPosition" ref="lessonForm"
                 :rules="formRules">
            <el-form-item prop="name" label="课堂名称">
                <el-input v-model="lessonForm.name"/>
            </el-form-item>
            <el-form-item prop="content" label="课堂内容">
                <el-input type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入课堂内容" v-model="lessonForm.content"/>
            </el-form-item>
            <div>
                <el-button class="item-button" type="primary" @click="onSubmit('lessonForm')">确定</el-button>
                <el-button class="item-button" type="primary" @click="onReset('lessonForm')">重置</el-button>
            </div>
        </el-form>
    </el-card>
</template>
<script>
    import http from 'http'
    export default{
        data(){
            var checkName = (rule,value,cb)=>{
                if(value===''){
                    cb(new Error('课堂名称不能为空'));
                }else{
                    cb();
                }
            }
            var checkContent =(rule,value,cb)=>{
                if(value===''){
                    cb(new Error('课堂内容不能为空'));
                }else{
                    cb();
                }
            }
            return {
                loading:false,
                labelPosition:'right',
                lessonForm:{
                    name:'',
                    content:''
                },
                submited:false,
                formRules:{
                    name:[{validator:checkName,trigger:'blur'}],
                    content:[{validator:checkContent,trigger:'blur'}],
                }
            }
        },
        watch:{
            lesson:function () {
                this.submited = false;
            }
        },
        methods:{
            onSubmit(formName){
                if(this.submited){
                    this.$message.warning('您的信息没有任何改变哦');
                    return;
                }
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.loading =true;
                        var url =`/api/lesson/${this.$route.params.cid}`;
                        http.postJson(url,this.lesson).then((value)=>{
                            this.loading =false;
                            http.parseResp(value).then((result)=>{
                                this.$message('添加成功');
                            },(err)=>{
                                this.$message.error(err);
                            })
                        },(err)=>{
                            this.loading =false;
                            console.log(err);
                        });
                    }
                })
            },
            onReset(formName){
                this.$refs[formName].resetFields();
            }
        },
        computed:{
            lesson:{
                get:function () {
                    var formData = new FormData();
                    formData.append('name',this.lessonForm.name);
                    formData.append('content',this.lessonForm.content);
                    formData.append('cid',this.$route.params.cid);
                    return formData;
                }
            }
        }
    }
</script>
<style>

</style>