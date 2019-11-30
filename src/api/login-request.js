// 引入自定义请求配置
import request from '@/utils/request'

export const login = async (data) => {
  const res = await request.post('/app/v1_0/authorizations', data)
  return res
}
