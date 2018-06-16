import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import { sync } from 'vuex-router-sync'
import VueMotion from 'vue-motion'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueMotion)

sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
