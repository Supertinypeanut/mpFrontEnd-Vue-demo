// 引入自定义请求配置
import request from '@/utils/request'

// 获取评论或评论回复
export const comments = params =>
  request.get('/app/v1_0/comments', { params })

// 对评论或评论回复点赞
export const commentsLiking = target =>
  request.post('/app/v1_0/comment/likings', { target })

// 取消对评论或评论回复点赞
export const cancelCommentsLiking = target =>
  request.delete(`/app/v1_0/comment/likings/${target}`)
