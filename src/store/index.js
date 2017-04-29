/**
 * Created by SiuWongLi on 17/4/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import crumb from './modules/crumb'
import course from './modules/course'
import lesson from './modules/lesson'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user:user,
        crumb:crumb,
        course:course,
        lesson:lesson
    },
})