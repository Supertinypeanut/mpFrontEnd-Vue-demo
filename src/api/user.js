/**
 * 我的 API
*/

// 引入自定义请求配置
import request from '@/utils/request'

// 获取用户自己信息
export const userInfo = () =>
  request.get('/app/v1_0/user')
