/**
 * Created by SiuWongLi on 17/5/8.
 */
const state={
    data:sessionStorage.getItem('notice') || [],
    client:{},
}
const mutations={
    storeNotice(state,payload){
        state.data = payload.data||[];
        sessionStorage.setItem('notice',state.data);
    },
    storeStompClient(state,payload){
        state.client = payload.client || {}
    }
}
export default {
    state,
    mutations
}