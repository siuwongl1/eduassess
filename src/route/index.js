/**
 * Created by SiuWongLi on 17/4/25.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//rotuer 管理
import routes from './modules/routes'
const router = new VueRouter({
    routes, mode: 'history', base: __dirname
})
router.beforeEach((to, from, next) => {
    ///登录状态判断，根据访问后端来实现，现在未实现，后期实现
    if(to.matched.some((record)=>{return record.meta.requiresAuth;})){
        // if(this.$store.state.user.uid===''){
        //     next({path:'/login'});
        // }else{
        //     next();
        // }
        next();
    }else{
        next();
    }
})
export default router;