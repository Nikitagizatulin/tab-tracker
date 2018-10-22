export default {
  namespaced: true,
  state: {
    preloader: false
  },
  getters: {
    getPreloader: state => state.preloader
  },
  mutations: {
    PreloaderStatus (state, status) {
      state.preloader = status
    }
  },
  actions: {
    changePreloaderStatus ({commit}, status) {
      commit('PreloaderStatus', status)
    }
  }
}
