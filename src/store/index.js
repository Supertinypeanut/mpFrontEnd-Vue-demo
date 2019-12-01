import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化token数据
    userToken: getItem('token') || {}
  },
  mutations: {
    // 更新token
    updateUserToken (state, data) {
      state.userToken = data
      // 本地存储
      setItem('token', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
