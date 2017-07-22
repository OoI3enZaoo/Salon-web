module.exports = {
  /*
  ** Headers of the page
  */
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
      { rel: 'stylesheet', type: 'text/css', href: 'https://www.amcharts.com/lib/3/plugins/export/export.css' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify']
  },
  plugins: ['~plugins/vuetify.js'],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ]
}
