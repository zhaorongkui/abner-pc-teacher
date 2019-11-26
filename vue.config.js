const webpack = require('webpack')
module.exports = {
  publicPath: '',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1059ff',
          'link-color': '#1059ff',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  devServer: {
    //autoOpenBrowser: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://sit-teacher-api.abnertech.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',

        jQuery: 'jquery',

        'windows.jQuery': 'jquery'
      })
    ]
  },
  chainWebpack: config => {
    config.entry('index').add('babel-polyfill')
  }
}
