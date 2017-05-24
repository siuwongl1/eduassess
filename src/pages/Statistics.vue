<template>
    <div>
        <div v-if="result.length==0">
            暂无数据
        </div>
        <chart v-else class="chart"  :options="bar"></chart>
    </div>
</template>
<style>
    .chart {
        margin: 0 auto
    }
</style>
<script>
    import co from 'co'
    import http from 'http'
    import common from 'common'
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    export default{
        data(){
            return {
                periods:[],
                currentPeriod:'',
                result:[],
                bar: {
                    title: {
                        text:`${common.getCurrentPeriod()} 学期获赞情况`
                    },
                    tooltip: {},
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [{
                        name: '获赞数',
                        type: 'bar',
                        data: []
                    }],
                    animationDuration: 2000
                }
            }
        },
        components: {
            chart: ECharts
        },
        methods: {
            fetchData(){
                var user = this.$store.state.user;
                if(user.pro){
                    var url =`/api/statistics/period/${this.currentPeriod}/pro/${user.pro}`;
                    co(function *() {
                        var result= yield http.getJson(url);
                        return result;
                    }).then(result=>{
                        this.result= result;
                        var xname  = [];
                        var data = [];
                        for(var i=0;i<result.length;i++){
                            xname.push(result[i].name);
                            if(user.type==='1'){
                                data.push(result[i].like);
                            }else{
                                data.push(result[i].comments);
                            }
                        }
                        this.bar.xAxis.data = xname;
                        this.bar.series[0].data = data;
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
                    this.$alert('您的信息还未完善，请完善后再进行统计查询','提示',{
                        confirmButtonText:'前往个人信息页面',
                        callback:(action)=>{
                            this.$router.push({name:'userInfo'});
                        }
                    })
                }
            }
        },
        created(){
            this.currentPeriod = common.getCurrentPeriod();
            var type = this.$store.state.user.type;
            if(type!=='1'){
                this.bar.title.text=`${common.getCurrentPeriod()} 学期学生参与课程评价情况`;
                this.bar.series[0].name='评价数';
            }
            this.fetchData();
        }
    }
</script>
