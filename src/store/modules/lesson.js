/**
 * Created by SiuWongLi on 17/4/28.
 */
const state={
    uid:sessionStorage.getItem('lid'),
    name:sessionStorage.getItem('name'),
    content:sessionStorage.getItem('content')
}
const mutations={
    storeLesson(state,payload){
        state.uid = payload.lid;
        state.name = payload.name;
        state.content = payload.content;
        sessionStorage.setItem('lid',state.uid);
        sessionStorage.setItem('name',state.name);
        sessionStorage.setItem('content',state.content);
    }
}
export default {
    state,
    mutations
}