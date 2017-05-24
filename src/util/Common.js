/**
 * Created by SiuWongLi on 17/4/11.
 */
export default {
    getCurrentPeriod(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var result;
        if (month > 9) {
            //第一个学期
            result = `${year}-${year + 1}(1)`;
        } else {
            //第二个学期
            result = `${year - 1}-${year}(2)`;
        }
        return result;
    },
    toLocaleDateString(val){
        var date = new Date(val);
        return date.toLocaleString();
    }
}