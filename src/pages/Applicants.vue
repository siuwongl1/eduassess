<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="applicant"
                border
                fix
                tooltip-effect="dark"
                style="width:995px;margin: 0 auto"
                @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="schoolId"
                label="学号"
                width="200">
            </el-table-column>
            <el-table-column
                label="姓名"
                prop="name"
                width="120">
            </el-table-column>
            <el-table-column
                label="性别"
                prop="sex"
                width="120">
            </el-table-column>
            <el-table-column
                prop="pro"
                label="专业"
                width="250">
            </el-table-column>
            <el-table-column
                prop="cls"
                label="班级"
                width="150">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="状态"
                    width="100"
                    :filters="[{ text: '已同意', value: 1 }, { text: '未处理', value: 0 }]"
                    :filter-method="filterTag">
                <template scope="scope">
                    <el-tag
                            :type="scope.row.type === 0 ? 'primary' : 'success'"
                            close-transition>{{formatTag(scope.row.type)}}</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
            <el-button type="primary" @click="doAccept()">同意申请</el-button>
        </div>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    export default{
        data(){
            return {
                applicant:[],
                multipleSelection: [],
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            doAccept(){
                if(this.multipleSelection.length>0){
                    var store = this.$store.state.course;
                    var url=`/api/course/class/${store.uid}`;
                    var students = this.students;
                    co(function *() {
                        var result = yield http.putJson(url,students);
                        return result;
                    }).then(result=>{
                        //处理成功时，刷新数据
                        this.fetchData();
                    }, err => {
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
                        this.$message.error(err);
                    })
                }else{
                    this.$message.warning('请选择您要处理的申请记录');
                }
            },
            fetchData(){
                var url = `/api/course/class/${this.$store.state.course.uid}`
                co(function *() {
                    var result = yield http.getJson(url);
                    return result;
                }).then(result => {
                    this.applicant = result||[];
                }, err => {
                    if(err && typeof err ==='object' &&err.statusCode){
                        if(err.statusCode===1){
                            this.$message.error(err.message);
                        }else if(err.statusCode===401){
                            this.$router.replace({name:'login'});
                        }
                    }else{
                        this.$message.error(err);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            filterTag(value, row){
                return row.type === value;
            },
            formatTag(type){
                if(type===1){
                    return '已同意';
                }else{
                    return '未处理';
                }
            }
        },
        computed: {
            students:{
                get(){
                    var formData = new FormData();
                    formData.append('students',JSON.stringify(this.multipleSelection));
                    return formData;
                }
            }
        },
        created(){
            this.fetchData();
        }
    }
</script>
<style>

</style>