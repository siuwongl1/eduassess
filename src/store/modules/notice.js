/**
 * Created by SiuWongLi on 17/5/8.
 */
const state={
    data:localStorage.getItem('notice') || [],
}
const mutations={
    storeNotice(state,payload){
        state.data = payload.data||[];
        localStorage.setItem('notice',state.data);
    }
}
export default {
    state,
    mutations
}