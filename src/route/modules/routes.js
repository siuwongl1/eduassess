/**
 * Created by SiuWongLi on 17/3/29.
 * 页面路由相关
 * 2017-04-26 14:24:35
 * 此部分代码硬编码太多,变化太多，有bad code 的味道，后面作项目整理时一齐整理
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


// 引入状态管理
import store from '../../store'
var isStudent = store.state.user.type===1;
var CourseBeforeEnter =(to,from,next)=>{
    var path = new Array();
    path.push({path:'courses',name:'courseManage',label:`${this.isStudent?'首页':'课程管理'}`});
    store.commit('storePath',path);
    next();
}
var MPWBeforeEnter = (to,from,next)=>{
    var path = new Array();
    path.push({path:'modifyPw',name:'modifyPw',label:'修改密码'});
    store.commit('storePath',path);
    next();
}
var UserInfoBeforeEnter = (to,from,next)=>{
    var path = new Array();
    path.push({path:'userInfo',name:'userInfo',label:'个人信息'});
    store.commit('storePath',path);
    next();
}
var PatchCourseBeforeEnter =(to,from,next)=>{
    var path = new Array();
    path.push({path:'courses',name:'courseManage',label:'课程管理'});
    path.push({path:'patchCourse',name:'patchCourse',label:'课程信息修改'});
    store.commit('storePath',path);
    next();
}
var NewCourseBeforeEnter = (to,from,next)=>{
    var path = new Array();
    path.push({path:'courses',name:'courseManage',label:'课程管理'});
    path.push({path:'newCourse',name:'newCourse',label:'发布新课程'});
    store.commit('storePath',path);
    next();
}
var LessonManageBeforeEnter = (to,from,next)=>{
    var path = new Array();
    path.push({path:'courses',name:'courseManage',label:'课程管理'});
    path.push({path:'lessons/:cid',name:'lessonManage',label:'课堂管理'});
    store.commit('storePath',path);
    next();
}
var NewLessonBeforeEnter = (to,from,next)=>{
    var path = new Array();
    path.push({path:'courses',name:'courseManage',label:'课程管理'});
    path.push({path:'lessons/:cid',name:'lessonManage',label:'课堂管理'});
    path.push({path:'newLesson/:cid',name:'newLesson',label:'发布新课堂'});
    store.commit('storePath',path);
    next();
}
var JoinCourseBeforeEnter = (to,from,next)=>{
    var path = new Array();
    path.push({path:'join',name:'joinCourse',label:'加入班级'});
    store.commit('storePath',path);
    next();
}

var LessonBeforeEnter =(to,from,next)=>{
    var path = new Array();
    if(isStudent){
        path.push({path:'courses',name:'courseManage',label:'首页'});
        path.push({path:'lesson/:lid',name:'lesson',label:'课堂详情'});
    }else{
        path.push({path:'courses',name:'courseManage',label:'课程管理'});
        path.push({path:'lessons/:cid',name:'lessonManage',label:'课堂管理'});
        path.push({path:'lesson/:lid',name:'lesson',label:'课堂详情'});
    }
    store.commit('storePath',path);
    next();
}
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
                {path:'',component:Course,beforeEnter:CourseBeforeEnter},  //默认进入页
                {name:'courseManage',path:'courses',component:Course,beforeEnter:CourseBeforeEnter}, //课程管理页
                {name:'modifyPw',path:'modifyPw',component:MPW,beforeEnter:MPWBeforeEnter}, //修改密码
                {name:'userInfo',path:'userInfo',component:UserInfo,beforeEnter:UserInfoBeforeEnter}, //个人信息
                {name:'patchCourse',path:'patchCourse/:cid',component:NewCourse,beforeEnter:PatchCourseBeforeEnter}, //课程修改
                {name:'newCourse',path:'newCourse',component:NewCourse,beforeEnter:NewCourseBeforeEnter}, //添加课程
                {name:'lessonManage',path:'lessons/:cid',component:Lessons,beforeEnter:LessonManageBeforeEnter}, //课堂管理
                {name:'newLesson',path:'newLesson/:cid',component:NewLesson,beforeEnter:NewLessonBeforeEnter}, //新课堂发布
                {name:'joinCourse',path:'join',component:joinCourse,beforeEnter:JoinCourseBeforeEnter}, //加入班级
                {name:'lesson',path:'lesson/:lid',component:Lesson,beforeEnter:LessonBeforeEnter},  //课堂详细信息
            ]
        },
        {
            name:'none',
            path: '*', // 其他页面
            redirect: '/login'
        }
    ]
}]
