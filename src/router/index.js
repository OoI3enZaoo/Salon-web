import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '../pages/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'hello',
      component: Hello
    }
  ],
  mode : 'history'
})
