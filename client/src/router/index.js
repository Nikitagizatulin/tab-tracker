import Vue from 'vue'
import Router from 'vue-router'
// if const - lazyload page if import - import now
// const Register = () => import('@/components/Register')
import Register from '@/components/Register'
// const Login = () => import('@/components/Login')
import Login from '@/components/Login'
// const Songs = () => import('@/components/Songs/Index')
import Songs from '@/components/Songs/Index'
// const CreateSong = () => import('@/components/CreateSong')
import CreateSong from '@/components/CreateSong'
// const ViewSong = () => import('@/components/ViewSong/Index')
import ViewSong from '@/components/ViewSong/Index'
// const EditSong = () => import('@/components/EditSong')
import EditSong from '@/components/EditSong'

import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'songs'
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        authAlready: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        authAlready: true
      }
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'song-create',
      component: CreateSong,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/songs/:songId/edit',
      name: 'song-edit',
      component: EditSong,
      meta: {
        requiresAuth: true
      }
    },
    //  default path
    {
      path: '*',
      component: { template: `<h1 v-once>Sorry the page was not found</h1>`
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authAlready = to.matched.some(record => record.meta.authAlready)
  if ((requiresAuth && !store.getters.isUserLoggedIn) || (authAlready && store.getters.isUserLoggedIn)) {
    next('/')
  } else {
    next()
  }
})

export default router
