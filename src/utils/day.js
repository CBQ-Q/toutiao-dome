import Vue from 'vue'
// 下载并引入
import dayjs from 'dayjs'
// 中文语言
import 'dayjs/locale/zh-cn'
// 配置相对时间 就是什么什么时间之前
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 全局使用
dayjs.locale('zh-cn')

// 使用
// moment().format('YYYY-MM-DD')

// 时间过滤
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
