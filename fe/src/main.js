import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import mainRouter from "@/routes/mainRouter";

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = new VueRouter({
  mode: 'history',
  routes: mainRouter
})

new Vue({
  router: routes,
  render: h => h(App),
}).$mount('#app')
