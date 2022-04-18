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
    beforeEnter: (to, from, next) => {
      console.log(to, from, 'to, from')
      // if (to.path != '/') next('/');
      next();
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
