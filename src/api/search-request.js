// 引入自定义请求配置
import request from '@/utils/request'

// 获取用户联想建议
export const getSuggestion = q =>
  request.get('/app/v1_0/suggestion', { params: { q } })

// 获取搜索结果
export const getSearch = params =>
  request.get('/app/v1_0/search', { params })

// 获取用户历史记录
export const getHistories = () =>
  request.get('/app/v1_0/search/histories')
