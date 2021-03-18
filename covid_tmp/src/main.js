import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/index';

import Chartist from "chartist";

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

// import 'vue-material/dist/theme/default.css'
import './assets/scss/customTheme.scss'

import vuetify from './plugins/vuetify';

// MaterialDashboard plugin
// import MaterialDashboard from "./material-dashboard";


Vue.prototype.$Chartist = Chartist;

Vue.use(VueMaterial)
Vue.use(Vuex)
// Vue.use(MaterialDashboard);


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  data: {
    Chartist: Chartist
  }
}).$mount('#app')
