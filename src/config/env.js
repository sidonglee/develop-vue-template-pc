/**
 * 配置编译环境和线上环境之间的切换
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * default_root_url 自定义默认访问根路径名
 * http://192.168.1.135:8080/#/manager-admin/module/config
 * default_root_url就是 'manager-admin'
 * isServer 当前 Vue 实例是否运行于服务器
 */
let imgBaseUrl = ''
let baseUrl = ''
let routerMode = 'hash'
let default_root_url = ''
let isServer = false

if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/'
    baseUrl = 'http://192.168.1.93:8082/oa'
    // baseUrl = 'back/oa'
    default_root_url = ''
    isServer = false
}else if(process.env.NODE_ENV == 'production'){
    imgBaseUrl = '/xxx/img/'    //线上可能是远程地址
    baseUrl = 'http://192.168.1.93:8082/oa'
    // baseUrl = 'back/oa/'
    default_root_url = ''
    isServer = true
}
export {
    imgBaseUrl,
    baseUrl as ajaxBaseURL,
    routerMode,
    default_root_url,
    isServer,
}

