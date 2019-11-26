import Vue from 'vue'
import router from './router'
import store from './stores/index'
import localforage from 'localforage'
import http from './api/index'
import './util/index'
import './util/jquery.datetimepicker.full.js'
import VueTouch from 'vue-touch'
import 'swiper/dist/css/swiper.css'
//import '@babel/polyfill'
Vue.use(VueTouch, { name: 'v-touch' })
// element-ui
import ElementUI from 'element-ui'
import '@babel/polyfill' //支持ie
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// ant-design-vue

// import 'ant-design-vue/dist/antd.less'
import './theme/index.less'
import Antd from 'ant-design-vue'
Vue.use(Antd)

//引入vue-echarts
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

// 图片预览
import Viewer from 'v-viewer'

import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
})
// 引入videojs css
import 'video.js/dist/video-js.css'

import './styles/index.scss'
import App from './App.vue'

//axios
Vue.prototype.$http = http
// 全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 刷新初始化store

localforage.getItem('userInfo').then(value => {
  if (value) {
    store.commit('GETUSERINFO', value)
  }
})

Vue.directive('anchor', {
  inserted: function(el, binding) {
    el.onclick = function() {
      if (binding.value == 0) {
        document.querySelectorAll('.work-stem')[0].scrollTop =
          document.querySelectorAll('#anchor-' + (binding.value - 0))[0]
            .offsetTop - 200
      } else {
        document.querySelectorAll('.work-stem')[0].scrollTop =
          document.querySelectorAll('#anchor-' + (binding.value - 1))[0]
            .offsetTop + 120
      }
    }
  }
})

// Vue.directive('focus', {
//   inserted: function(el) {
//     el.focus()
//   }
// })

// 路由拦截器
router.beforeEach((to, from, next) => {
  localforage.getItem('userInfo').then(value => {
    const token = value && value.token
    // if (token) {
    //   store.dispatch('notReadCountAppeal')
    //   store.dispatch('getNotReadCount')
    // }
    if (!token && to.path !== '/login') {
      if (to.path == '/user-set') {
        next({
          path: '/user-set'
        })
      } else if (to.path == '/forget-password') {
        next({
          path: '/forget-password'
        })
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      store.dispatch('notReadCountAppeal')
      store.dispatch('getNotReadCount')
    }
  })
  next()
})
router.afterEach(() => {
  // store.dispatch('notReadCountAppeal')
  // store.dispatch('getNotReadCount')
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
