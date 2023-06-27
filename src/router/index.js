import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookAdmin from "@/views/BookAdmin.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: HomeView,
    redirect: '/home/book',//重定向
    children:[
      {
        path: 'about',// /home/about
        component: () => import('../views/slideshow/AboutView.vue')
      },
      {
        path: 'other',// /home/other
        component: () => import('../views/slideshow/OtherView.vue')
      },
      {
        path: '/home/report',// /home/report
        component: () => import('../views/reportManagement/ReportView.vue')
      },

      {
        path: 'dataStatistics',
        component: () => import(/* webpackChunkName: "about" */ '../views/datastatisticsview/DataStatisticsView.vue')
      },
      {
        path: 'book',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/BookManagement/BookView.vue')
      },
      {
        path:'account',
        component:() =>import('../views/AccountView/AccountView.vue')
      },
      {
        path:'libraryApply',
        component:() =>import('../views/LibraryApply/LibraryApply.vue')
      },
      {
        path:'libraryRule',
        component:() =>import('../views/LibraryRule/LibraryRuleView')
      },
      {
        path:'ruleList',
        component:() =>import('../views/LibraryRule/RuleListView')
      },
    ]
  },

  {
    path: '/bookadmin',
    component: () =>import('../views/BookAdmin.vue'),
    children:[
      {
        path:'librarybooks',
        component:() =>import('../views/BookAdminLibraryBooks/LibraryBooks.vue')
      },
    ]
  },



  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
