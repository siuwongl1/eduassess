/**
 * Created by SiuWongLi on 17/4/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'  //用户状态
import crumb from './modules/crumb'  //面包屑状态
import course from './modules/course' //课程状态
import lesson from './modules/lesson' //课堂状态
import menu from './modules/menu'  //菜单状态
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user:user,
        crumb:crumb,
        course:course,
        lesson:lesson,
        menu:menu,

    },
})