/**
 * Created by SiuWongLi on 17/5/8.
 */
const state={
    data:sessionStorage.getItem('notice') || [],
}
const mutations={
    storeNotice(state,payload){
        state.data = payload.data||[];
        sessionStorage.setItem('notice',state.data);
    }
}
export default {
    state,
    mutations
}