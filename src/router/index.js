import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let titleEnd = ' - Moviz';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Moviz: the movie hub' },
    component: () => import('../views/Home')
  },
  {
    path: '/all-movies',
    name: 'all-movies',
    meta: { title: 'All movies' + titleEnd },
    component: () => import('../views/allmovies.vue')
  },
  {
    path: '/all-movies/genre/:genre',
    name: 'all-movies-by-genre',
    meta: { title: 'All movies' + titleEnd },
    component: () => import('../views/allmoviesbygenre.vue')
  },
  {
    path: '/movie/:movieId',
    name: 'movie-detail',
    meta: { title: 'Moviz' },
    component: () => import('../views/moviedetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login' + titleEnd },
    component: () => import('../views/login.vue')
  },
  {
    path: '/user/:userId',
    name: 'my-profile',
    meta: { title: 'User profile' + titleEnd },
    component: () => import('../views/myprofile.vue')
  },
  {
    path: '/admin/:userId',
    name: 'back-office',
    meta: { title: 'admin' + titleEnd },
    component: () => import('../views/admin.vue')
  },
]

const router = new VueRouter({
  //mode: 'history',
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title;
})

export default router
