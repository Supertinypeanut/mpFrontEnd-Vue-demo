import axios from 'axios'
import JSONBig from 'json-bigint'

import router from '@/router'
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
  // 处理响应数据id过大，使用json-bigint处理
  try {
    return JSONBig.parse(response)
  } catch (err) {
    // 捕获JSONBig.parse无法解析非对象数据，而报错
    return {}
  }
}]

// 处理token过期问题
request.interceptors.response.use(
  config => config,
  error => {
    // 判断错误码为401则刷新token
    if (error.response.status === 401) {
      // 判断是否有token
      const userToken = store.state.updateUserInfo
      if (!userToken || !userToken.refresh_token) {
        redirectRouter()
        return
      }

      // 捕获刷新失败
      try {
        axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.userToken.refresh_token}`
          }
        }).then(data => {
          // 更新token
          store.commit('updateUserToken', {
            token: data.data.data.token,
            refresh_token: store.state.userToken.refresh_token
          })

          // 返回新的请求
          return request(error.config)
        })
      } catch (error) {
        // 返回登入
        redirectRouter()
      }
    }

    return Promise.reject(error)
  }
)

function redirectRouter () {
  router.push(`/login?redirect=${router.currentRoute.fullPath}`)
}

export default request
