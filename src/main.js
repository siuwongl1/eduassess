import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
import router from './route'
import store from './store'
new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})
