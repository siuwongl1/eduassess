<template>
    <div>
        <el-table
                :data="courses"
                border
                style="width: 100%">
            <el-table-column
                    label="课程名称"
                    width="180">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>课程名称: {{ scope.row.name }}</p>
                        <p>发布时间: {{ toLocaleDateString(scope.row.date) }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="专业"
                    width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{scope.row.pro}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="班级"
                    width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{scope.row.cls}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="授课教师"
                    width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{scope.row.tname}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="学期"
                    width="180">
                <template scope="scope">
                    <span style="margin-left: 10px">{{scope.row.period}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" v-if="!isJoin" class="button" @click="goLesson(scope.row)">课堂</el-button>
                    <el-button type="text" v-if="isJoin" class="button" @click="join(scope.row)">加入该课程</el-button>
                    <el-button type="text" v-if="type==='2'" class="button" @click="checkAll(scope.row)">申请列表</el-button>
                    <el-button type="text" v-if="!isStudent" @click="modify(scope.row)">修改</el-button>
                    <el-button type="text" v-if="type==='3'" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import http from 'http'
    import co from 'co'
    export default{
        props: ['courses', 'isJoin'],
        data(){
            return {
                leftSpan: 8,
                rightSpan: 16,
                isStudent: true,
                storeUser:this.$store.state.user,
                type: '1',//用户类型
                currentDate: new Date().toLocaleDateString()
            }
        },
        methods: {
            goLesson(course) {
                this.$store.commit('storeCourse', {cid: course._id,cname:course.name}); //存储当前course状态
                this.$router.push({name: 'lessonManage', params: {cid: course._id}});
            },
            modify(course) {
                this.$store.commit('storeCourse', {cid: course._id,cname:course.name}); //存储当前course状态
                this.$router.push({name: 'patchCourse', params: {cid: course._id}});
            },
            remove(course){
                this.$emit('removeCourse',course);
            },
            join(course){
                if(!this.storeUser.name){
                    this.$alert('完善个人信息才可进行操作','提示',{
                        confirmButtonText:'确定',
                        callback:(action)=>{
                            this.$router.replace({name:'userInfo'});
                        }
                    })
                }else{
                    var url = `/api/course/class/${course._id}`;
                    var user = this.user;
                    co(function *() {
                        var result = yield http.postJson(url, user);
                        return result;
                    }).then(result => {
                        if (result.n == 0) {
                            this.$message.warning('您已经加入过该课程了哦');
                        } else {
                            this.$message('加入成功');
                        }
                    }, err => {
                        if (err && typeof err === 'object' && err.statusCode) {
                            if (err.statusCode === 1) {
                                this.$message.error(err.message);
                            } else if (err.statusCode === 401) {
                                this.$router.replace({name: 'login'});
                            }
                        } else {
                            this.$message.error(err);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }
            },
            checkAll(course){
                this.$store.commit('storeCourse', {cid: course._id}); //存储当前course状态
                this.$router.push({name: 'applicants', params: {cid: course._id}});
            },
            toLocaleDateString(val){
                var date = new Date(val);
                return date.toLocaleString();
            }
        },
        computed: {
            user: {
                get: function () {
                    var formData = new FormData();
                    var store = this.$store.state.user;
                    formData.append("uid", store.uid);
                    formData.append("name", store.name);
                    formData.append("pro", store.pro);
                    formData.append("cls", store.cls);
                    formData.append("sex", store.sex === '1' ? '男' : '女');
                    formData.append("schoolId", store.schoolId);
                    return formData;
                }
            }
        },
        created(){
            this.type = this.$store.state.user.type;
            this.isStudent = this.type === '1';
        }
    }
</script>
<style>
    .divide-line {
        border-top: solid #aebdc9 1px;
        text-align: left;
    }

    .button {
    }

    .content {
        text-align: left;
        padding: 10px 5px;
    }

    .content .label {
        text-align: left;
    }

    .content span {
        word-wrap: break-word;
    }

</style>