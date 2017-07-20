import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import login from '../pages/login.vue'
import message from '../pages/message.vue'
import member from '../pages/member.vue'
import manage from '../pages/manage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'hello',
      component: home
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    }
  ],
  mode : 'history'
})
