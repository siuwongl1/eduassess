/**
 * Created by SiuWongLi on 17/3/29.
 */

import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import App from '../App.vue'
import MPW from '../pages/ModifyPw.vue'
export default [{
    path: '/',
    component: App,
    children: [
        {
            name:'login',
            path: '/login', // 登录
            meta: { auth: false },
            component: Login
        },
        {
            name:'index',
            path: '/index/:name', // 主界面
            meta: { auth: false },
            component: Main,
            children:[
                {name:'modifyPw',path:'modifyPw',component:MPW}
            ]
        },
        {
            name:'none',
            path: '*', // 其他页面
            redirect: '/login'
        }
    ]
}]
