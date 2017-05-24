<template>
    <div>
        <el-table
                :data="lessons"
                border
                style="width: 100%">
            <el-table-column
                    label="课堂名称"
                    width="180">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>课堂名称: {{ scope.row.name }}</p>
                        <p>发布时间: {{ toLocaleDateString(scope.row.date) }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="课堂内容">
                <template scope="scope">
                    <span style="margin-left: 10px">{{scope.row.content}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180" label="操作">
                <template scope="scope">
                    <el-button type="text" class="button" @click="showDetal(scope.row)">详细信息</el-button>
                    <el-button type="text" class="button" v-if="type==='3'" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import common from 'common'
    export default{
        props:['lessons'],
        data(){
            return{
                type:this.$store.state.user.type,
                isStudent:this.type==='1',
                cid:this.$store.state.course.uid
            }
        },
        methods:{
            showDetal(l){
                this.$store.commit("storeLesson",{lid:l._id,name:l.name,content:l.content}); //存储当前Lesson状态
                this.$router.push({name:'lesson',params:{lid:l._id,cid:this.cid}});
            },
            toLocaleDateString(val){
                return common.toLocaleDateString(val);
            },
            modify(l){

            },
            remove(l){
                this.$emit('remove',l);
            }
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
        padding: 10px;
    }
    .content .label{
        text-align: right;
    }
    .content span{
        word-wrap: break-word;
    }
</style>