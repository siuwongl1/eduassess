/**
 * Created by SiuWongLi on 17/4/25.
 */
const state={
    paths:[]
}
const mutations={
    storePath(state,payload){
        state.paths = payload;
    }
}
export default {
    state,
    mutations
}