/**
 * 请求/响应拦截
 */
import { CONSOLE_REQUEST_ENABLE,CONSOLE_RESPONSE_ENABLE,CONST_DEFAULT_CONFIG } from '../index'
import validate from '@/plugins/validator-url'
import qs from 'querystring'

export function requestSuccessFunc(requestConfig){
    CONSOLE_REQUEST_ENABLE && (console.info('requestInterceptorFunc', `url: ${requestConfig.url}`, requestConfig))
    //合法uri认证

    //URL参数拦截认证
    if('validator' in requestConfig){
        let params = {}
        if(requestConfig.method==='post' && requestConfig.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1){
            params = qs.parse(requestConfig.data)
        }else if(requestConfig.method==='post' && requestConfig.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') === -1){
            params = requestConfig.data
        }else{
            params = requestConfig.params 
        }
        let code = validate(params,requestConfig['validator'])
        if(code.status){
            GLOBAL.$vbus.emit('axios.request_error',(code.msg).join(' '))
            return Promise.reject('url params validator invalide')
        }
    }
    //检测restful风格
    var reg = new RegExp("[{}]")
    if(reg.test(requestConfig.url)){
        GLOBAL.$vbus.emit('axios.request_error','restful '+requestConfig.url)
        return Promise.reject('url not valid restful '+requestConfig.url)
    }

    // 在发送请求之前做些什么
    return requestConfig
}

export function requestErrorFunc(requestError){
    // 对请求错误做些什么

    GLOBAL.$vbus.emit('axios.request_error',requestError)
    return Promise.reject(requestError)
}

export function responseSuccessFunc (responseObj) {
    CONSOLE_RESPONSE_ENABLE && (console.info('responseInterceptorFunc',responseObj))
    /**
     * 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
     * {code: 200,data: null,msg: ''}
     */
    let resData = responseObj.data
    let code = responseObj.status
    switch(code) {
        case 200: // 如果业务成功，直接进成功回调
            if(resData.code!==CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                GLOBAL.$vbus.emit('axios.ajax_data_unusual',resData.data === null ? 'data is null' : resData.data)
            }
            return resData
        default:
            //其它特殊code情况处理,可以在这里处理一部分代码,也可以通过reject下方到子代码中的catch函数中处理
            GLOBAL.$vbus.emit('axios.ajax_handle_error',responseObj.msg)
            return Promise.reject(resData)
    }

    return response
}

export function responseFailFunc (responseError) {
    // 对响应错误/失败做点什么

    GLOBAL.$vbus.emit('axios.response_error',`${responseError.response.status}  ${responseError.response.statusText}`)
    return Promise.reject(responseError)
}





