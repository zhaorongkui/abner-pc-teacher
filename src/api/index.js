import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from './../stores/index'
import localforage from 'localforage'
import { MessageBox, Message } from 'element-ui'
import '../styles/element.scss'

axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.timeout = 300000000000
const api = process.env.NODE_ENV === 'development' ? 'api' : ''
// 添加一个请求拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.userInfo.token || null
    if (token) {
      config.headers.token = token
    }
    config.url = `${api}${config.url}`
    if (config.method === 'post' && config.headers && !config.headers.upload) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加一个返回拦截器
axios.interceptors.response.use(
  response => {
    // 对返回的数据进行一些处理
    if (
      response.data.status === 'token_expired' ||
      response.data.status === 'token_unknown' ||
      response.data.status === 'token_not_exist'
    ) {
      //flag = true
      localforage.removeItem('userInfo').then(() => router.push('/login'))
    } else {
      if (
        response.data.status === 'token_kick' &&
        localStorage.getItem('loginFlag') == 1
      ) {
        MessageBox.alert(
          '如果这不是你本人的操作，您的密码已经泄露。请立即进入“个人中心-更改密码”，防止账号被盗！',
          '您的账号已经在新的设备上登录',
          {
            confirmButtonText: '确定',
            center: true,
            showClose: false,
            confirmButtonClass: 'cl',
            closeOnHashChange: true,
            callback: action => {
              if (action === 'confirm') {
                router.push('/login')
              }
            }
          }
        )
        localStorage.setItem('loginFlag', 2)
      }
      // if (
      //   response.data.status === 'token_kick' &&
      //   localStorage.getItem('loginFlag') == 2
      // ) {
      //   router.push('/login')
      // }
    }

    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)'
          break
        case 401:
          // 这里写清除token的代码
          err.message = '未授权，请重新登录(401)'
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
          })
          break
        case 403:
          err.message = '拒绝访问(403)'
          break
        case 404:
          err.message = `请求出错(404)`
          break
        case 408:
          err.message = '请求超时(408)'
          break
        case 500:
          if (localStorage.getItem('loginFlag') == 1) {
            Message({ message: '当前网络状态不佳，请稍后再试', type: 'error' })
            localStorage.setItem('loginFlag', 2)
          }
          break
        case 501:
          err.message = '服务未实现(501)'
          break
        case 502:
          // err.message = '网络错误(502)'
          if (localStorage.getItem('loginFlag') == 1) {
            Message({ message: '当前网络状态不佳，请稍后再试', type: 'error' })
            localStorage.setItem('loginFlag', 2)
          }
          break
        case 503:
          err.message = '服务不可用(503)'

          break
        case 504:
          // err.message = '网络超时(504)'
          if (localStorage.getItem('loginFlag') == 1) {
            Message({ message: '当前网络状态不佳，请稍后再试', type: 'error' })
            localStorage.setItem('loginFlag', 2)
          }
          break
        case 505:
          err.message = 'HTTP版本不受支持(505)'
          break
        default:
          err.message = `连接出错(${err.response.status})!`
      }
    } else {
      if (localStorage.getItem('loginFlag') == 1) {
        Message({ message: '当前网络状态不佳，请稍后再试', type: 'error' })
        localStorage.setItem('loginFlag', 2)
      }
    }
    return Promise.reject(err)
  }
)
export default axios
