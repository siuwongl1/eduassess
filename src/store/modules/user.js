/**
 * Created by SiuWongLi on 17/4/25.
 */
const state= {
    uid: localStorage.getItem('uid'),
    username: localStorage.getItem('username'),
    type: localStorage.getItem('type'),
    name: localStorage.getItem('name'),
    cls:localStorage.getItem('cls'),
    pro:localStorage.getItem('pro'),
    schoolId:localStorage.getItem('schoolId'),
    sex:localStorage.getItem('sex'),
}
const mutations= {
    storeUser (state, payload) {
        // 使用localSorage 预防用户刷新浏览器时，用户信息丢失的问题
        localStorage.setItem('uid',payload.uid||state.uid);
        localStorage.setItem('type',payload.type||state.type);
        localStorage.setItem('username',payload.username||state.username);
        localStorage.setItem('name',payload.name||state.name);
        localStorage.setItem('cls',payload.cls||state.cls);
        localStorage.setItem('pro',payload.pro||state.pro);
        localStorage.setItem('schoolId',payload.schoolId||state.schoolId),
        localStorage.setItem('sex',payload.sex||state.sex);
        state.username = payload.username||state.username;
        state.type = payload.type || state.type;
        state.uid = payload.uid ||state.uid;
        state.name = payload.name|| state.name;
        state.cls = payload.cls || state.cls;
        state.pro = payload.pro || state.pro;
        state.schoolId = payload.schoolId || state.schoolId;
        state.sex = payload.sex || state.sex;
    },
    removeUser(state){
        localStorage.clear();
        state.username = '';
        state.uid = '';
        state.type =0;
        state.name ='';
        state.cls= '';
        state.pro = '';
        state.schoolId = '';
        state.sex = '';
    }
}
export default {
    state,
    mutations
}