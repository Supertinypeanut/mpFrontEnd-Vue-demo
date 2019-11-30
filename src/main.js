import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 配置 REM 适配
import 'postcss-pxtorem'
import 'amfe-flexible'

// 安需引入vant组件
import '@/utils/register-vant'

// 自定义vant组件样式
import '@/style/index.less'

// 引入自定义请求配置
import '@/utils/request'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
