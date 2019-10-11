/**
 * 项目配置
 */
import {routerMode,ajaxBaseURL,default_root_url} from './env'

//当前宿主平台 根据平台不同可定制兼容
export const HOST_PLATFORM = 'WEB'
//系统应用title名称
export const sys_App_Title = '智能办公系统'
//Node环境变量
export const NODE_ENV = process.env.NODE_ENV || 'prod'
//是否强制所有请求访问本地 Mock,也可以对单个请求操作访问Mock
export const AJAX_LOCALLY_ENABLE = false
//登陆路由名称
export const LOGIN_PAGE_NAME = 'login'
//开启Cookie使用，数据在Cookie中存储的天数，默认1天
export const cookieExpires = 1
//自定义默认访问根路径名 http://xxxx:8080/#/module/manager module 可能就是自定义根路径名
export const DEFAULT_ROOT_URL = default_root_url

//路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
    mode: routerMode,
    transitionOnLoad: true,
    scrollBehavior: () => ({ y: 0 }),
}
//axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    baseURL: ajaxBaseURL,
    timeout: 30000,
    maxContentLength: 2000,
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Access-Control-Allow-Origin': '*'  //跨域设置，只限HTML5的浏览器
    }
}

//API 默认配置
export const API_DEFAULT_CONFIG = {
    mockBaseURL: 'http://127.0.0.1:3003/',
    mock: false,
    debug: false,
    usingHeaders: true, //是否启用headers参数设置 ie和火狐下非同源get请求时设置false否则ajax无法成功
    sep: '/',
    //全局参数 例如：全局token http://xxxx:8080/users?全局参数key=全局参数value
    gParams:{
        //system: 'xxxx'
    }
}

//CONST 默认参数配置 sep：命名空间分隔符
export const CONST_DEFAULT_CONFIG = {
    sep: '/',
    ajaxSuccesscode: 200,   //ajax请求返回code编码
}

//EVENTS 自定义事件默认配置
export const EVENTS_DEFAULT_CONFIG = {
    sep: '.'
}

//异步加载组件默认配置
export const ASYNCCOMPONENT_DEFAULT_CONFIG = {
    delay: 200,
    timeout: 3000
}

// 还有一些方便开发的配置
export const WINDOW_TITLE_UPDATE = true         // 是否允许在路由BeforeEach钩子中修改标题
export const CONSOLE_REQUEST_ENABLE = false     // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = false    // 开启响应参数打印



