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
  generate :{
    routes: [
      '/USERS/1',
      '/USERS/2',
      '/USERS/3',
      '/USERS/4',
      '/USERS/5',
      '/USERS/6',
      '/USERS/7'
    ]
  },



  head: {
    title: 'starter',
    script: [
      { src: 'https://www.amcharts.com/lib/3/amcharts.js' },
      { src: 'https://www.amcharts.com/lib/3/serial.js' },
        { src: 'https://www.amcharts.com/lib/3/plugins/export/export.min.js' },
        { src : 'https://www.amcharts.com/lib/3/themes/light.js'},
        {src : 'https://www.amcharts.com/lib/3/pie.js'},
        {src : 'https://www.amcharts.com/lib/3/xy.js'}

    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://www.amcharts.com/lib/3/plugins/export/export.css' }

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

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
    vendor: ['vuetify','vue-quill-editor/ssr','axios','./util/firebase.js']


  },
  plugins: ['~plugins/vuetify.js'],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ]
}
