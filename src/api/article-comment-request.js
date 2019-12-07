// 引入自定义请求配置
import request from '@/utils/request'

// 获取评论或评论回复
export const comments = (params) =>
  request.get('/app/v1_0/comments', { params })
