// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import store from '@/store/store'
import 'vuetify/dist/vuetify.min.css'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Panel from '@/components/globals/Panel'

Vue.config.productionTip = false
Vue.use(Vuetify)
// if you don't want install the component globally
Vue.use(VueYouTubeEmbed)
Vue.component('panel', Panel)
// module for synchronization with router and vue
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
