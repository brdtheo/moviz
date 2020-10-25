import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: 'Moviz: the movie hub' },
    component: () => import('../views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title;
})

export default router
