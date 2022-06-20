module.exports = {
  devServer: {
    proxy: 'http://localhost:3001'
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:3001/',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
