import axios from 'axios'
import JSONBig from 'json-bigint'

// 导入容器Vuex
import store from '@/store'

// 设置请求头
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 设置请求头  只执行一次
// request.defaults.headers.common['Authorization'] = `Bearer ${store.state.userToken.token}`

request.interceptors.request.use(config => {
  // 设置token
  config.headers.common['Authorization'] = `Bearer ${store.state.userToken.token}`
  return config
})

// 转化响应内容
request.defaults.transformResponse = [(response) => {
  console.log(response)
  // 处理响应数据id过大，使用json-bigint处理
  try {
    return JSONBig.parse(response)
  } catch (err) {
    // 捕获JSONBig.parse无法解析非对象数据，而报错
    return {}
  }
}]

export default request
