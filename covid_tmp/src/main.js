import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/index';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

// import 'vue-material/dist/theme/default.css'
import './assets/customTheme.scss'

import vuetify from './plugins/vuetify';

Vue.use(VueMaterial)
Vue.use(Vuex)


Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
