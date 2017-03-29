/**
 * Created by SiuWongLi on 17/3/29.
 */

import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import App from '../App.vue'
export default [{
    path: '/',
    component: App,
    children: [
        {
            path: '/login', // 登录
            meta: { auth: false },
            component: Login
        },
        {
            path: '/index', // 主界面
            meta: { auth: false },
            component: Main
        },
        {
            path: '*', // 其他页面
            redirect: '/login'
        }
    ]
}]
