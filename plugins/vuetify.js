import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFire from 'vuefire'
import { ImageImport } from '../modules/ImageImport'
 import { ImageResize } from '../modules/ImageResize'
import VueSocketio from 'vue-socket.io'
import store from 'vuex'
if (process.BROWSER_BUILD) {
  const VueQuillEditor = require('vue-quill-editor/ssr')
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
  Vue.use(VueQuillEditor)
  Vue.use(VueFire)
  Vue.use(VueAxios, axios)
  Vue.use(Vuetify)
  Vue.use(VueSocketio, 'https://agile-citadel-43436.herokuapp.com/')
  // Vue.use(VueSocketio, 'http://localhost:3000/',store)

}
