import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const titleEnd = ' | Moviz: track, share and comment out 2020 movies';
export const globalTitle = 'Moviz: track, share and comment out 2020 movies';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home')
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
  {
    path: '*',
    meta: { title: '[404] Error' + titleEnd },
    component: () => import('../views/404.vue')
  },
]

export const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.afterEach((to) => {
  if (to.name === 'movie-detail' || to.name === 'my-profile'){
    document.title = 'loading...';
  } else if (to.name === 'home'){
    document.title = globalTitle;
  } else {
    document.title = to.meta.title;
  }
})

