import axios from 'axios'
import JSONBig from 'json-bigint'

// 设置请求头
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 响应拦截器
request.defaults.transformResponse = [(response) => {
  // 处理响应数据id过大，使用json-bigint处理
  try {
    return JSONBig.parse(response)
  } catch (err) {
    // 捕获JSONBig.parse无法解析非对象数据，而报错
    return {}
  }
}]

export default request
