import Vue from 'vue'
import Router from 'vue-router'
// if const - lazyload page if import - import now
// const Register = () => import('@/components/Register')
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong/Index'
import EditSong from '@/components/EditSong'
import Error from '@/components/Error'
import RoomList from '@/components/Chat/RoomList'
import AddRoom from '@/components/Chat/AddRoom'
import ChatRoom from '@/components/Chat/ChatRoom'
import Profile from '@/components/Profile'

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
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/room/create',
      name: 'room-create',
      component: AddRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat-room/:id',
      name: 'chat-room',
      component: ChatRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    //  default path
    {
      path: '*',
      component: Error
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authAlready = to.matched.some(record => record.meta.authAlready)
  if ((requiresAuth && !store.getters['authStore/isUserLoggedIn']) || (authAlready && store.getters['authStore/isUserLoggedIn'])) {
    next('/')
  } else {
    next()
  }
})

export default router
