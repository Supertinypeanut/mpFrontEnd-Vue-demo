// 引入自定义请求配置
import request from '@/utils/request'

// 用户认证（登录注册）
export const login = (data) =>
  request.post('/app/v1_0/authorizations', data)
