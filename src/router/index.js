import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import UsersView from '../views/UsersView.vue'

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
    component: SignupView
  },
  {
    path: '/user-info',
    name: 'users',
    component: UsersView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
