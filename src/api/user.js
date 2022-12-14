import request from '@/utils/request'
// import store from '@/store'

export const login = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const everyName = mobile => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // 请求头
    // headers: {
    //   // 必须要的token方式
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
export const getUserChannle = mobile => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
export const addFollow = target => {
  return request({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const delFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
    data: {
      target
    }
  })
}
// 用户个人信息
export const getuser = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/profile'
  })
}
// 修改用户信息
export const amenduser = (data) => {
  return request({
    method: 'patch',
    url: '/v1_0/user/profile',
    data
  })
}
// 修改用户头像
export const updataphoto = (data) => {
  return request({
    method: 'patch',
    url: '/v1_0/user/photo',
    data
  })
}
