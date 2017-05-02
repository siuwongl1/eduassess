<template>
    <div>
        <div class="remark-item" v-for="(r,index) in remarks.data">
            <p class="feed-item">{{r.name}}</p>
            <div>{{r.content}}</div>
            <p class="feed-date">{{r.lastRemarked}}</p>
        </div>
        <el-pagination
                small
                :page-size="5"
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="remarks.count">
        </el-pagination>
        <div style="margin: 10px 0">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="content">
            </el-input>
        </div>
        <div style="text-align: right;padding: 10px 0">
            <el-button type="text" size="small">取消</el-button>
            <el-button type="primary" @click="submitContent" size="small">提交</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['remarks'],
        data(){
            return {
                content: ''
            }
        },
        methods: {
            submitContent(){
                if (!this.content) {
                    return;
                }
                this.$emit('submitRemark', {content: this.content});
            },
            currentChange(size){
                this.$emit('currentPage',{size:size});
            }
        }
    }
</script>
<style>
    .remark-item {
        border-top: 1px solid #999;
        padding: 10px 0;
    }

    .feed-item {
        text-align: left;
        color: #999;
    }

    .feed-date {
        text-align: right;
        color: #999;
    }
</style>