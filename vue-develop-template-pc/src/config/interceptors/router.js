/**
 * 路由拦截
 * 这里可以实现权限判断能不能登陆等,白名单 黑名单等过滤
 * 这里需要注意跳转死循环，页面永远空白
 * router.beforeEach((to,from,next)=>{
 *      if(登录){   //这里应该写成 if(登录 || to.name==='login'){next()} //登录
 *          next()
 *      }else{ next({name: 'login'}) }
 * })
 * 全局前置路由钩子
 */
import store from '@/store'
import router from '@/plugins/router'
import { WINDOW_TITLE_UPDATE,LOGIN_PAGE_NAME } from '@/config' 
import NProgress from 'nprogress'
import permissionRoles from '@/routes/permission-module-index'
import toRoutes from '@/plugins/toroutes'
import _isEmpty from 'lodash/isEmpty'
import _indexOf from 'lodash/indexOf'

//白名单路由(name) 帮助、找回密码等
const whiteList = ['helper','examples']

let routerBeforeEachFunc = function (to, from, next){
    //自定义页面拦截 routerBeforeEach事件
    // console.info( '自定义页面拦截 routerBeforeEach事件',to,from );
    NProgress.start()
    if('title' in to.meta && WINDOW_TITLE_UPDATE){
        document.title = to.meta['title']
    }
    //白名单直接跳转
    if(whiteList.includes(to.name)){
        NProgress.done()
        return next()
    }
    // console.info( to,store.getters['user/getLoginStatus'] );
    //未登录状态且要跳转的页面不是登录页
    if(!store.getters['user/getLoginStatus'] && to.name !== LOGIN_PAGE_NAME){
        NProgress.done()
        return next({path: `/${LOGIN_PAGE_NAME}`})
    }
    //已登录且要跳转的页面是登录页
    if(store.getters['user/getLoginStatus'] && to.name === LOGIN_PAGE_NAME){
        NProgress.done()
        return next({path: '/'})
    }
    let appStatus = store.getters['user/getAppStatus']
    if(!_isEmpty(permissionRoles) && !appStatus && to.name !== LOGIN_PAGE_NAME){
        store.dispatch('user/generate_Routes').then(()=>{
            // 动态添加可访问路由表
            router.$mainRouter.children.push(...store.getters['user/getRoleRoutes'])
            router.addRoutes(router.options.routes)
            next();
        })
        return
    }
    next();
}
/**
 * 全局后置路由钩子
 * window滚动条返回顶部、路由加载完成控制全局进度条
 */
let routerAfterEachFunc = function(to, from){

    NProgress.done()
    /* 进入新路由后，重置滚动条到顶部
    如果路由基本配置中已配置 'scrollBehavior' 则可以隐藏下面的代码
    if(document.body.scrollHeight > window.innerHeight){
        window.scrollTo(0,0)
    } */
}

/**
 * 处理浏览器刷新
 * 在刷新时，会执行到router.onReady
 * 可以处理把数据放入localstorage或cookie中的操作
 */
let routerOnReady = function(){
    // console.info( '浏览器刷新' );
}

export {routerBeforeEachFunc,routerAfterEachFunc,routerOnReady}