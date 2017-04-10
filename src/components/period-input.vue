<template>
    <el-autocomplete
            class="inline-input"
            v-model="period"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
    ></el-autocomplete>
</template>
<script>
    export default {
        data() {
            return {
                period:'',
                periods: []
            };
        },
        methods: {
            handleSelect(item) {
                this.$emit('periodSubmit',this.period);
            },
            querySearch(queryString, cb) {
                var periods = this.periods;
                var results = queryString ? periods.filter(this.createFilter(queryString)) : periods;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            loadPeriod(){
                var date = new Date();
                var year = date.getFullYear();
                var result = new Array();
                for (var i = 0; i <10; i++) {
                    for (var k = 0; k < 2; k++) {
                        result.push({"value":`${year - i - 1}/${year - i}(${k + 1})`})
                    }
                }
                return result;
            },
            createFilter(queryString) {
                return (period) => {
                    return (period.value.indexOf(queryString.toLowerCase()) === 0);
                };
            }
        },
        mounted() {
            this.periods = this.loadPeriod();
        }
    }
</script>