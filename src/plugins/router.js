/**
 * vue Router 路由管理
 * tip：instance.$mainRouter
 */
import Vue from 'vue'
import Router from 'vue-router'
import { ROUTER_DEFAULT_CONFIG,sys_App_Title } from '../config/index'
import {routerBeforeEachFunc,routerAfterEachFunc,routerOnReady} from '../config/interceptors/router'
import routes from '../routes'

Vue.use(Router)

//不需要按模块化划分的路由
const constRouterMap = [
    {
        path: '/login',
        name: 'login',
        component: r => require.ensure([], () => r(require('@/views/login')), 'login')
    },{
        path: '/',
        name: 'mainframe',
        meta:{title: sys_App_Title},
        component: r => require.ensure([], () => r(require('@/views/main-frame')), 'mainframe'),
        children: []
    },{
        path: '*',  // 404 页面
        component: ()=>import('@/views/error-page/404')
    }
]
let instance = new Router({
    ...ROUTER_DEFAULT_CONFIG,
    routes: (routes.concat(constRouterMap))
})
instance.onReady(routerOnReady)
instance.beforeEach(routerBeforeEachFunc)
instance.afterEach(routerAfterEachFunc)

//主应用view，如果需要在外部挂载children可以直接使用$mainRouter
instance.$mainRouter = (instance.options.routes).filter((router)=>{
    return router.path === '/'
})[0]
export default instance