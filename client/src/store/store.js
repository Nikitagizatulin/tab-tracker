import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './authStore'
import applicationStore from './applicationStore'
import createPersistedState from 'vuex-persistedstate/index'

Vue.use(Vuex)

export default new Vuex.Store({
  // this plugin provide store in local storage witch plased in browser
  plugins: [
    createPersistedState({
      paths: ['authStore']
    })
  ],
  strict: true,
  modules: {
    authStore,
    applicationStore
  }
})
