// 文章请求模块
import requset from '@/utils/request'

export const getArticles = params => {
  return requset({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}
