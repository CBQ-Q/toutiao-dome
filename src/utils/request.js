import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://geek.itheima.net'
  baseURL: 'http://toutiao.itheima.net'
})
const request1 = axios.create({
  // baseURL: 'http://geek.itheima.net'
  baseURL: 'http://toutiao.itheima.net'
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

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // 默认情况下use传递的第一个函数，是服务器正确返回数据才会执行的函数
    console.log(response)
    return response
  },
  async function (err) {
    // 出了错误的情况下，会执行use的第二个参数。
    // console.log(err)
    if (err.response && err.response.status === 401) {
      // 如果有用户的token数据的情况下，就做无感知刷新token
      if (store.state.user) {
        const res = await request1({
          url: '/v1_0/authorizations',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        // 要将请求回来的最新的token保存到vuex当中
        store.commit('setUser', {
          token: res.data.data.token,
          refresh_token: store.state.user.refresh_token
        })
        // 按照最新的token重新发一遍之前401错误的请求，获取之前失败的请求的结果。
        console.log(err.config.headers)
        return request(err.config)
      } else {
        // 没有token，就直接跳转登录页面
        router.push('/login')
      }
    } else {
      return Promise.reject(err)
    }
  }
)
