/**
 * Created by SiuWongLi on 17/4/28.
 */
const state={
    uid:localStorage.getItem('lid'),
    name:localStorage.getItem('name'),
    content:localStorage.getItem('content')
}
const mutations={
    storeLesson(state,payload){
        state.uid = payload.lid;
        state.name = payload.name;
        state.content = payload.content;
        localStorage.setItem('lid',state.uid);
        localStorage.setItem('name',state.name);
        localStorage.setItem('content',state.content);
    }
}
export default {
    state,
    mutations
}