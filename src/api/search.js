// 搜索请求模块
import request from '@/utils/request'

// 搜索联想
export const getSearch = (q) => {
  return request({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export const getresult = params => {
  return request({
    method: 'get',
    url: '/v1_0/search',
    params
  })
}
