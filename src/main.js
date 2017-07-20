// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import mynav from './components/navbar.vue'
import VueSweetAlert from 'vue-sweetalert'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuetify)
Vue.use(VueSweetAlert)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.component('mynav',mynav)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
