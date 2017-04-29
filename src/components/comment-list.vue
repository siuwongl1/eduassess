<template>
    <div>
        <el-card v-for="(c,index) in comments">
            <div style="text-align: left">{{c.name}}</div>
            <div>{{c.content}}</div>
            <div v-if="c.like&&c.like.length&&c.like.length>0">
                {{c.like.length}} 赞同了该评价

            </div>
            <div>
                <el-button type="text" icon="caret-top">asdad</el-button>
                <el-button type="text"></el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default{
        props: ['comments'],
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style>

</style>