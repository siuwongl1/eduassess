<template>
    <div>
        <el-form :inline="true" style="text-align: left;padding: 5px;margin-left:15px;line-height: 36px;height: 36px" @submit.native.prevent>
            <el-form-item label="学期">
                <period-input v-on:periodSubmit="periodSubmit"></period-input>
                <el-button type="primary" @click="queryCourse">查询</el-button>
                <el-button type="primary" v-if="!isStudent" @click="addCourse">添加课程</el-button>
            </el-form-item>
        </el-form>
        <div style="height: 1px;background-color: #aebdc9;margin: 0 0 10px 0"></div>
        <course-list v-bind:courses="this.courses"></course-list>
    </div>
</template>
<script>
    import http from 'http';
    import periodComponent from '../components/period-input.vue'
    import courseListComponent from '../components/course-list.vue'
    export default {
        data() {
            return {
                period: '',
                isStudent:this.$store.state.type===1,
                courses: []
            }
        },
        components: {
            'period-input':periodComponent,
            'course-list' :courseListComponent
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData () {
                var url;
                if (this.period === '') {
                    url = `/api/course/user/${this.$store.state.uid}`;
                } else {
                    url = `/api/course/user/${this.$store.state.uid}/period/${this.period}`;
                }
                http.getJson(url).then((value) => {
                    http.parseResp(value).then((resp) => {
                        this.courses = resp;
                    }, (err) => {
                        this.$message.error(err);
                    })
                }, (err) => {

                }).catch((err) => {
                    console.log(err);
                })
            },
            periodSubmit(msg){
                this.period = msg;
            },
            queryCourse () {
                this.fetchData();
            },
            addCourse(){
                this.$router.push({name: 'newCourse'})
            }
        },
        computed: {
            filterBoxNumber: () => {
                return this.courses.filter((course) => {

                })
            }
        }
    }
</script>
<style>

</style>