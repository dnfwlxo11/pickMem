import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PickMem from '../views/vues/pickMem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pickMem',
    name: 'PickMem',
    component: PickMem,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
