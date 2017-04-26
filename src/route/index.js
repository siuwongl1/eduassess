/**
 * Created by SiuWongLi on 17/4/25.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//rotuer 管理
import routes from './modules/routes'
import store from '../store'
const router = new VueRouter({
    routes, mode: 'history', base: __dirname
})
router.beforeEach((to, from, next) => {
    if(to.matched.some((record)=>{return record.meta.requiresAuth;})){
        if(!store.state.user.uid||store.state.user.uid===''){
            next({path:'/login'})  //未登录或已注销，重定向到login登录页
        }else{
            next();
        }
    }else{
        next();
    }
})
export default router;