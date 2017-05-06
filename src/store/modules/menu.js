/**
 * Created by SiuWongLi on 17/5/6.
 */
const state={
    key:localStorage.getItem('menuKey'),
}
const mutations={
    storeMenuKey(state,payload){
        state.key = payload.key;
        localStorage.setItem('menuKey',state.key);
    }
}
export default {
    state,
    mutations
}