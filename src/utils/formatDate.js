/**
 * 格式化时间
*/
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// 格式时间至今多久
Vue.filter('relativeTime', time => dayjs().from(dayjs(time)))
