import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
//import Root from './Root.vue'
import {loadLocaleI18nAsync} from '@/i18n';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "en"
  },
  {
    path: "/:locale",
    name: "home",
    component: Home,
  },
  {
    path: "/:locale/dashboard",
    name: "dashboard",
    component: () =>
    import(/* webpackChunkName: "about" */ "@/views/user/Dashboard.vue")
  },
  {
    path: "/:locale/account",
    name: "account",
    component: () =>
    import(/* webpackChunkName: "about" */ "@/views/user/Account.vue")
  },
  {
    path: "/:locale/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/Signup.vue")
  },
  {
    path: "/:locale/confirm_signup",
    name: "confirmSignup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/ConfirmSignup.vue")
  },
  {
    path: "/:locale/forgot_password",
    name: "forgotPassword",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/ForgotPassword.vue")
  },
  {
    path: "/:locale/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/auth/Login.vue")
  }
    
  
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.params.locale === from.params.locale) {
    next()
    return
  }
  loadLocaleI18nAsync(to.params.locale).then(() => {
  })
  next()
})

export default router
