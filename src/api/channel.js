// 频道请求模块
import request from '@/utils/request'

export const channelAll = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}

// 我的用户频道 添加
export const addUserChannel = (channel) => {
  return request({
    method: 'patch',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 我的用户频道删除
export const DeleteChannel = (channelId) => {
  return request({
    method: 'delete',
    url: `/v1_0/user/channels/${channelId}`
  })
}
