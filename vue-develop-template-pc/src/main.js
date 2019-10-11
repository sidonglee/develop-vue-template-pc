// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//引入跟组件
import App from './App'

//font-awesome图标字体库 http://www.fontawesome.com.cn/
import 'font-awesome/css/font-awesome.css'

//ElementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//载入公用组件库
import TjUI from '@/components/common'
Vue.use(TjUI,{window})

//顶部路由加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//mormalize.css
import 'normalize.css'
//全局通用自定义less样式
import './style/common.less'

//全局通知 巴士事件
window.GLOBAL = {}
GLOBAL.vbus = new Vue({
  data: {
    //自定义扩展实例属性,程序中可以监听 vbus中的属性(状态存储是响应式的),触发自身的业务逻辑
  }
})

//组件通信vue-unicom、vue-link
//unicom、link为关键字，在组件的props中不要去重写
import VueUnicom from 'vue-unicom'
import vueLink from './plugins/link'
Vue.use(VueUnicom)
Vue.use(vueLink)

//引入插件
import router from './plugins/router'
import inject from './plugins/inject'
import components from './plugins/component'
import {dataDictFilter} from './filter'
import store from './store'
import errorHandler from './plugins/error-handler'
import userDirectives from './directives'
Vue.use(inject,{store})
Vue.use(errorHandler)

//根实例数据过滤转换器
import rootparamsFilters from './plugins/root-filters'

Vue.config.productionTip = false
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  mixins: [rootparamsFilters],
  router,
  store,
  components: { App },
  template: '<App/>'
})
