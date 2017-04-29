/**
 * Created by SiuWongLi on 17/4/28.
 */
const state={
    uid:localStorage.getItem('cid')
}
const mutations={
    storeCourse(state,payload){
        state.uid = payload.cid;
        localStorage.setItem('cid',state.uid);
    }
}
export default {
    state,
    mutations
}