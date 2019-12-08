import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化token数据
    userToken: getItem('token') || {},
    // 搜索结果
    searchResults: [],
    // 用户个人信息
    userInfo: null
  },
  mutations: {
    // 更新token
    updateUserToken (state, data) {
      state.userToken = data
      // 本地存储
      setItem('token', data)
    },

    // 更新搜索结果
    keepSearchResults (state, searchResults) {
      state.searchResults = searchResults
    },

    // 更新用户信息
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
