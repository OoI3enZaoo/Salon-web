const axios = require('axios')
module.exports = {
  /*
  ** Headers of the page
  */

  // generate :{
  //   routes(callback){
  //     const posts = axios.get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) =>{
  //       let routes = res.data.map((uid) => {
  //          return '/users/' + uid.id
  //       })
  //       callback(null, routes)
  //     })
  //     .catch(callback)
  //   }
  // },
  head: {
    title: 'starter',
    script: [],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  manifest: {
      name: 'Salon System',
      description: 'Salon Manage System',
      theme_color: '#2196F3'
    },
    modules: [
      '@nuxtjs/pwa',
      '@nuxtjs/component-cache'
    ],
  // generate: {
  //   routes (callback) {
  //     const posts = require('static/post.json')
  //     let routes = posts.map(post => `users/${post.id}`)
  //     callback(null, routes)
  //   }
  // },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify','vue-quill-editor/ssr','axios']
  },
  plugins: ['~plugins/vuetify.js'],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' },
    'quill/dist/quill.snow.css',
  	'quill/dist/quill.bubble.css',
  	'quill/dist/quill.core.css'
  ]
}
