// 引入自定义请求配置
import request from '@/utils/request'

// 用户频道列表
export const channels = () =>
  request.get('/app/v1_0/user/channels')

// 移除用户频道列表
export const deleteChannel = channels =>
  request.patch('/app/v1_0/user/channels', channels)

// 所有频道列表
export const allChannels = () =>
  request.get('/app/v1_0/channels')

// 频道新闻推荐
export const articles = (data) =>
  request.get('/app/v1_1/articles', { params: data })
