import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeNews from '../views/HomeNews'
import HomeMessage from '../views/HomeMessage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {title:'首页'},
    children: [
      {
        path: 'news',
        name: 'News',
        component: HomeNews,
        meta: {isAuth: true,title:'新闻'},
      },
      {
        path: 'message',
        name: 'Message',
        component: HomeMessage,
        meta: {isAuth: true,title:'消息'},
        children: [
          {
            path: 'detail/:id/:title',
            name:'Detail',
            component: ()=>import ('../views/Detail'),
            meta: {isAuth: true,title:'详情'},
            // props的第一种写法，值为对象
            // props: {id:'001',title:'消息1'}

            // props的第二种写法，值为true，把该路由组件收到的所有params参数，以props形式传递给detail组件
            // props: true

            // props的第三种写法，值为函数,函数会收到$route的值
            props({params:{id,title}}){ // 解构赋值写法
              return {id,title}
            },
            // 独享路由守卫，只有前置，没有后置
            beforeEnter: (to, from, next) => {
              if(localStorage.getItem('school2')==='atguigu2'){
                next()
              }else{
                alert('你没有权限！')
              } 
            }
          }
        ]
      }
  ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {title: '关于'}
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})
// 全局前置路由守卫，初始化和每次路由切换之前被调用
router.beforeEach((to,from,next) => {
  // console.log('to:',to,'\n','from:',from);
  if(to.meta.isAuth){
    if(localStorage.getItem('school')==='atguigu'){
      next()
    }else{
      alert('你没有权限！')
    }  
  }else{
    next()
  }
})
// 全局后置路由守卫，初始化和每次路由切换之后被调用
router.afterEach((to,from) => {
  // console.log('after',to,from);
  document.title = to.meta.title || 'vue2-router'
})
export default router
