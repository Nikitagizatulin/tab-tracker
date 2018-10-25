import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    getUserInfo (state) {
      return _.pickBy(state.user, (val, key) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'password')
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
}
