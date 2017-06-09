/**
 * Created by SiuWongLi on 17/4/28.
 */
const state={
    uid:sessionStorage.getItem('cid') || '',
    name:sessionStorage.getItem('cname') || '',
}
const mutations={
    storeCourse(state,payload){
        state.uid = payload.cid;
        state.name = payload.cname;
        sessionStorage.setItem('cid',state.uid);
        sessionStorage.setItem('cname',state.cname);
    }
}
export default {
    state,
    mutations
}