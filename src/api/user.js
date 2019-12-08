/**
 * 我的 API
*/

// 引入自定义请求配置
import request from '@/utils/request'

// 获取用户自己信息
export const userInfo = () =>
  request.get('/app/v1_0/user')

// 获取用户个人资料
export const userInfoProfile = () =>
  request.get('/app/v1_0/user/profile')

// 获取用户个人资料
export const updataUserPhoto = () =>
  request.get('/app/v1_0/user/photo')
