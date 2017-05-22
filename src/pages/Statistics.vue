<template>
    <div>
        <div>

        </div>
        <chart class="chart"  :options="bar"></chart>
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
                var store = this.$store.state.user;
                var url =`/api/statistics/student/${store.uid}/period/${this.currentPeriod}`;
                co(function *() {
                    var result= yield http.getJson(url);
                    return result;
                }).then(result=>{
                    var xname  = [];
                    var data = [];
                    for(var i=0;i<result.length;i++){
                        xname.push(result[i].name);
                        data.push(result[i].like);
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
            }
        },
        created(){
            this.currentPeriod = common.getCurrentPeriod();
            this.fetchData();
        }
    }
</script>
