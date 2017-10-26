import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueFire from 'vuefire'
import { ImageImport } from '../modules/ImageImport'
 import { ImageResize } from '../modules/ImageResize'
import VueSocketio from 'vue-socket.io'

require('moment/locale/es')

if (process.BROWSER_BUILD) {

  Vue.use(VueFire)
  Vue.use(VueAxios, axios)


}
// Vue.use(VueSocketio, 'http://172.104.189.169:4000')
Vue.use(VueSocketio, 'http://localhost:4000')
import VueQuillEditor  from 'vue-quill-editor/ssr'
Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)
Vue.use(VueQuillEditor)
  Vue.use(Vuetify)

  import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)
