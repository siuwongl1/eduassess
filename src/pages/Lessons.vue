<template>
    <div>
        <el-form :inline="true" style="text-align: left;padding: 5px;line-height: 36px;height: 36px"
                 @submit.native.prevent>
            <el-button type="primary" @click="addLesson">添加课堂</el-button>
        </el-form>
        <div style="height: 1px;background-color: #aebdc9;margin: 0 0 10px 0"></div>

    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        methods:{
            addLesson(){
                console.log(this.$route.params.cid);
                this.$router.push({name:'newLesson',params:{cid:this.$route.params.cid}});
            }
        }
    }
</script>
<style>

</style>