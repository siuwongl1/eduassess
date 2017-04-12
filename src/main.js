import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './config/routes.js'
import Vuex from 'vuex'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
//rotuer 管理
const router = new VueRouter({
    routes, mode: 'history', base: __dirname
})
//Vuex 状态管理
const store = new Vuex.Store({
    state: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('username'),
        type: localStorage.getItem('type'),
        name: localStorage.getItem('name'),
    },
    mutations: {
        storeUser (state, payload) {
            // 使用localSorage 预防用户刷新浏览器时，用户信息丢失的问题
            localStorage.setItem('uid',payload.uid);
            localStorage.setItem('type',payload.type);
            localStorage.setItem('username',payload.username);
            localStorage.setItem('name',payload.name);
            state.username = payload.username;
            state.type = payload.type;
            state.uid = payload.uid;
            state.name = payload.name;
        }
    }
})
new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})
