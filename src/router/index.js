import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import UsersView from '../views/UsersView.vue'
import ArticleView from '../views/ArticleView.vue'

import ArticleCreate from '../components/article/ArticleCreate.vue'
import ArticleUpdate from '../components/article/ArticleUpdate.vue'
import ArticleList from '../components/article/ArticleList.vue'
import ArticleDetail from '../components/article/ArticleDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-in',
    name: 'login',
    component: LoginView
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/user-info',
    name: 'users',
    component: UsersView
  },
  {
    path: "/article",
    component: ArticleView,
    children: [
      {
        path: "",
        name: "articleList",
        component: ArticleList,
      },
      {
        path: "create",
        name: "articleCreate",
        component: ArticleCreate,
      },
      {
        path: ":articleNo",
        name: "articleDetail",
        component: ArticleDetail,
      },
      {
        path: ":articleNo/update",
        name: "articleUpdate",
        component: ArticleUpdate,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  ignoreDuplicateNavigation: true
})

export default router
