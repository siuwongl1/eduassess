/**
 * Created by SiuWongLi on 17/3/29.
 */

import Login from '../../pages/Login.vue'  // 登录注册页面
import Main from '../../pages/Main.vue'    // 主页面
import App from '../../App.vue'            //App负载页面
import MPW from '../../pages/ModifyPw.vue' // 修改密码
import UserInfo from '../../pages/UserInfo.vue'
import Course from '../../pages/Courses.vue'
import NewCourse from '../../pages/NewCourse.vue'
import Lessons from '../../pages/Lessons.vue'
import NewLesson from '../../pages/NewLesson.vue'
import joinCourse from '../../pages/JoinClass.vue'
import CourseSquare from '../../pages/CourseSquare.vue'
import Lesson from '../../pages/Lesson.vue'

export default [{
    path: '/',
    component: App,
    children: [
        {
            name:'login',
            path: '/login', // 登录
            meta: { requiresAuth: false },
            component: Login
        },
        {
            name:'index',
            path: '/index', // 主界面
            meta: { requiresAuth: true },
            component: Main,
            children:[
                {path:'',component:Course},
                {name:'courseManage',path:'courses',component:Course},
                {name:'modifyPw',path:'modifyPw',component:MPW},
                {name:'userInfo',path:'userInfo',component:UserInfo},
                {name:'patchCourse',path:'patchCourse/:cid',component:NewCourse},
                {name:'newCourse',path:'newCourse',component:NewCourse},
                {name:'lessonManage',path:'lessons/:cid',component:Lessons},
                {name:'newLesson',path:'newLesson/:cid',component:NewLesson},
                {name:'joinCourse',path:'join',component:joinCourse},
                {name:'courseSquare',path:'square',component:CourseSquare},
                {name:'lesson',path:'lesson/:lid',component:Lesson}
            ]
        },
        {
            name:'none',
            path: '*', // 其他页面
            redirect: '/login'
        }
    ]
}]
