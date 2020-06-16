import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
// import Home from '@/views/Home/Home.vue'
import Main from '@/views/Main.vue'
import Cookies from 'js-cookie'
Vue.use(VueRouter)
  // const originalpush = VueRouter.prototype.push
  // VueRouter.prototype.push = function push(location) {
  //   return originalpush.call(this,location).catch(err => err)
  // }
  const routes = [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home_index',
      mate:{
        requireAuth: true, // 判断是否需要登录
      },
      component: Main,
      children: [
        {
          path:'/home_index',
          name:'home',
          component: () => import('@/views/Home/Home.vue')
        },
        {
          path:'/history_index',
          name:'history_index',
          component: () => import('../views/history/History.vue')
        },
        {
          path:'/recover_index',
          name:'recover_index',
          component: () => import('../views/recover/Recover.vue')
        }
      ]
    }
    
    // {
    //   path:'/back_history',
    //   name:'back_history',
    //   component: () => import('../views/history/History.vue')
    // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, form, next) => {
  // next()
  if (to.name !== 'login' && !Cookies.get('access_token')){
    next({
      name: 'login'
    })
  } else if (to.name === 'login' && Cookies.get('access_token')) {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
