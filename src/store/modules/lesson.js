/**
 * Created by SiuWongLi on 17/4/28.
 */
const state={
    uid:sessionStorage.getItem('lid')|| '',
    name:sessionStorage.getItem('lname') ||'',
    content:sessionStorage.getItem('content') || ''
}
const mutations={
    storeLesson(state,payload){
        state.uid = payload.lid;
        state.name = payload.lname;
        state.content = payload.content;
        sessionStorage.setItem('lid',state.uid);
        sessionStorage.setItem('lname',state.name);
        sessionStorage.setItem('content',state.content);
    }
}
export default {
    state,
    mutations
}