module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  router: {
    middleware: 'checkLogin'
  },
  head: {
    title: 'salon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/eed138f88e.js' }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl',
    'quill/dist/quill.snow.css',
  	'quill/dist/quill.bubble.css',
  	'quill/dist/quill.core.css'
  ],
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
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify','axios', './modules/ImageImport','./modules/ImageResize'],
    extractCSS: true
    /*
    ** Run ESLINT on save
    */
    /*extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }*/
  }
}
