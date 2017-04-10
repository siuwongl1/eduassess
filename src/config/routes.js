/**
 * Created by SiuWongLi on 17/3/29.
 */

import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import App from '../App.vue'
import MPW from '../pages/ModifyPw.vue'
import UserInfo from '../pages/UserInfo.vue'
import Course from '../pages/Courses.vue'
import NewCourse from '../pages/NewCourse.vue'
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
            path: '/index', // 主界面
            meta: { auth: false },
            component: Main,
            children:[
                {path:'',component:Course},
                {name:'courseManage',path:'courseManage',component:Course},
                {name:'modifyPw',path:'modifyPw',component:MPW},
                {name:'userInfo',path:'userInfo',component:UserInfo},
                {name:'newCourse',path:'newCourse',component:NewCourse},
            ]
        },
        {
            name:'none',
            path: '*', // 其他页面
            redirect: '/login'
        }
    ]
}]
