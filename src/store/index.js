import Vue from 'vue'
import Vuex from 'vuex'

import { getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化token数据
    userToken: getItem('token')
  },
  mutations: {
    // 更新token
    userToken (state) {
      state.userToken = getItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
