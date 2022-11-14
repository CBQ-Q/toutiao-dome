// 文章请求模块
import requset from '@/utils/request'

export const getArticles = params => {
  return requset({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}

export const getArticleId = articleId => {
  return requset({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}
// 文章收藏
export const addcollect = target => {
  return requset({
    method: 'post',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消文章收藏
export const delcollect = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 文章点赞
export const addlike = target => {
  return requset({
    method: 'post',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消文章点赞
export const dellike = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
// 文章评论获取
export const allComments = params => {
  return requset({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
}
// 评论点赞
export const likings = target => {
  return requset({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
export const dellikings = target => {
  return requset({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
// 对文章评论
export const addcomment = data => {
  return requset({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
}
