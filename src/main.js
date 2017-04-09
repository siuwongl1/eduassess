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
const router = new VueRouter({
    routes, mode: 'history', base: __dirname
})

const store = new Vuex.Store({
    state: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('username'),
        type: localStorage.getItem('type')
    },
    mutations: {
        storeUser (state, payload) {
            // mutate state
            localStorage.setItem('uid',payload.uid);
            localStorage.setItem('type',payload.type);
            localStorage.setItem('username',payload.username);
            state.username = payload.username;
            state.type = payload.type;
            state.uid = payload.uid;
        }
    }
})

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})
