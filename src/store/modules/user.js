/**
 * Created by SiuWongLi on 17/4/25.
 */
const state= {
    uid: sessionStorage.getItem('uid'),
    username: sessionStorage.getItem('username'),
    type: sessionStorage.getItem('type'),
    name: sessionStorage.getItem('name'),
    cls:sessionStorage.getItem('cls'),
    pro:sessionStorage.getItem('pro'),
    schoolId:sessionStorage.getItem('schoolId'),
    sex:sessionStorage.getItem('sex'),
}
const mutations= {
    storeUser (state, payload) {
        // 使用localSorage 预防用户刷新浏览器时，用户信息丢失的问题
        sessionStorage.setItem('uid',payload.uid||state.uid);
        sessionStorage.setItem('type',payload.type||state.type);
        sessionStorage.setItem('username',payload.username||state.username);
        sessionStorage.setItem('name',payload.name||state.name);
        sessionStorage.setItem('cls',payload.cls||state.cls);
        sessionStorage.setItem('pro',payload.pro||state.pro);
        sessionStorage.setItem('schoolId',payload.schoolId||state.schoolId),
        sessionStorage.setItem('sex',payload.sex||state.sex);
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