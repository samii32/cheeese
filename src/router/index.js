import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Peoples from '../views/Peoples.vue'
import SignUp from '../views/SignUp.vue'
import UserPopup from '../views/UserPopup.vue'
import Talk from '../views/Talk.vue'
import TalkList from '../views/TalkList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/peoples',
    name: 'Peoples',
    component: Peoples
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/userpopup',
    name: 'UserPopup',
    component: UserPopup
  },
  {
    path: '/Talk',
    name: 'Talk',
    component: Talk
  },
  {
    path: '/TalkList',
    name: 'TalkList',
    component: TalkList
  }
]

const router = new VueRouter({
  routes
})

export default router
