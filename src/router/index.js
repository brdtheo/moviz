import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Moviz: the movie hub' },
    component: () => import('../views/home.vue')
  },
  {
    path: '/all-movies',
    name: 'all-movies',
    meta: { title: 'All movies - Moviz' },
    component: () => import('../views/allmovies.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title;
})

export default router
