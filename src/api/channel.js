// 频道请求模块
import request from '@/utils/request'

export const channelAll = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
