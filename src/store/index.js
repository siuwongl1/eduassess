/**
 * Created by SiuWongLi on 17/4/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import crumb from './modules/crumb'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user:user,
        crumb:crumb,
    },
})