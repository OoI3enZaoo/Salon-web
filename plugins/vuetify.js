import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFire from 'vuefire'

if (process.BROWSER_BUILD) {
  const VueQuillEditor = require('vue-quill-editor/ssr')
  Vue.use(VueQuillEditor)
}


// explicit installation required in module environments
Vue.use(VueFire)
Vue.use(VueAxios, axios)
Vue.use(Vuetify)
