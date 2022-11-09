import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://geek.itheima.net'
  // baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器

request.interceptors.request.use(function (config) {
  // 发起请求会经过这里
  // config：本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 这里要返回config 否则请求停在这出不去了
  return config
}, function (error) {
  // 如果请求出错了会进入这里反馈错误信息
  return Promise.reject(error)
})
export default request
