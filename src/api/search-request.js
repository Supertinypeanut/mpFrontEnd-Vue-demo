// 引入自定义请求配置
import request from '@/utils/request'

// 获取用户联想建议
export const getSuggestion = q =>
  request.get('/app/v1_0/suggestion', { params: { q } })
