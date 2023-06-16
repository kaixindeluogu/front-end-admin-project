import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: HomeView,
    redirect: '/home/about',//重定向

    children:[
      {
        path: 'about',// /home/about
        component: () => import('../views/slideshow/AboutView.vue')
      },
      {
        path: 'other',// /home/other
        component: () => import('../views/slideshow/OtherView.vue')
      },
    ]
  },

  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
