import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 安需引入vant组件
import '@/utils/register-vant'

// 自定义vant组件样式
import '@/style/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
