import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title:"birr exchange calculator with black market and official prices ", auth: false}
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../components/Calculator.vue'),
    meta: {title:"birr exchange calculator ", auth: false}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
