// 引入自定义请求配置
import request from '@/utils/request'

// 获取新闻文章详情
export const articleInfo = targetID =>
  request.get(`/app/v1_0/articles/${targetID}`)

// 关注用户
export const followings = target =>
  request.post('/app/v1_0/user/followings', { target })

// 取消关注用户
export const unFollowings = target =>
  request.delete(`/app/v1_0/user/followings/${target}`)

// 对文章点赞
export const likeArticle = target =>
  request.post('/app/v1_0/article/likings', { target })

// 取消对文章点赞
export const cancelLikeArticle = target =>
  request.delete(`/app/v1_0/article/likings/${target}`)

// 对文章不喜欢
export const disLikeArticle = target =>
  request.post(`/app/v1_0/article/dislikes`, { target })

// 取消对文章不喜欢
export const cancelDisLikeArticle = target =>
  request.delete(`/app/v1_0/article/dislikes/${target}`)
