import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  // this plugin provide store in local storage witch plased in browser
  plugins: [
    createPersistedState()
  ],
  strict: true,
  state: {
    preloader: false,
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    getPreloader: (state) => state.preloader,
    getUserInfo (state) {
      return _.pickBy(state.user, (val, key) => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'password')
    },
    isUserLoggedIn (state) {
      return state.isUserLoggedIn
    },
    userId (state) {
      return state.user ? state.user.id : null
    },
    getToken (state) {
      return state.token
    },
    getUserEmail (state) {
      return state.user ? state.user.email : null
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
