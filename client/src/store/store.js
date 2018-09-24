import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // this plugin provide store in local storage witch plased in browser
  plugins: [
    createPersistedState()
  ],
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    isUserLoggedIn (state) {
      return state.isUserLoggedIn
    },
    userId (state) {
      return state.user ? state.user.id : null
    },
    getToken (state) {
      return state.token
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
