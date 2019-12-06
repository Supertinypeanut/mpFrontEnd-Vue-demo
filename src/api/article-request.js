// 引入自定义请求配置
import request from '@/utils/request'

// 获取新闻文章详情
export const articleInfo = (targetID) =>
  request.get(`/app/v1_0/articles/${targetID}`)
