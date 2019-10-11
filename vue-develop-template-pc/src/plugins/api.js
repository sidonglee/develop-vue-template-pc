/**
 * 服务层 api 插件
 * 单个请求
 * this.$api['user/info']().then(resData=>{})
 * 多个请求
 * this.$axios.all([this.$api['user/info']({name:'a'}),this.$api['user/test']({})]).then(this.$axios.spread(function (acct, perms) {
 *      // 两个请求现在都执行完成
 *      //acct,perms 两个请求的返回值
 * }));
 */
import axios from './axios'
import { AJAX_LOCALLY_ENABLE,API_DEFAULT_CONFIG } from '../config'
import API_CONFIG from '../service/api'
import {checkInvalidChar,removeInvalidChar,isEmptyObject,isNotEqualeEmpty} from '../utils/tools'
import qs from 'querystring'
//按模块导入
import _assign from 'lodash/assign'
import _pick from 'lodash/pick'
import _isEmpty from 'lodash/isEmpty'
import _hasIn from 'lodash/hasIn'
import _forIn from 'lodash/forIn'

class MakeApi {
    constructor(options){
        if(typeof Proxy === "undefined"){
            this.api = {}
        }else{
            //ie 11不支持Proxy
            this.api = new Proxy({}, {
                get: function (target, key, receiver) {
                    if(isNotEqualeEmpty(key) && target[key] === void(0)){
                        TjUI.dialog.message(`[${key}] is undefined`,'error')
                    }
                    return Reflect.get(target, key, receiver);
                }
            })
        }
        this.apiBuilder(options)
    }
    apiBuilder({
        config = {},
        mockBaseURL = '',
        mock = true,
        debug = false,
        sep = '/',
        gParams = {},
        usingHeaders = true,
    }={}){
        Object.keys(config).map(namespace => {
            this._createApiSingle({
                namespace,
                mockBaseURL,
                mock,
                debug,
                sep,
                gParams,
                usingHeaders,
                config: config[namespace]
            })
        })
    }
    // 创建每个api接口的实例(单例)
    _createApiSingle({
        namespace, 
        sep = '/',
        usingHeaders = true,
        gParams = {},
        config = [],
        mock = true, 
        debug = false,
        mockBaseURL = ''
    }){
        config.forEach(api => {
            _assign(api,(_hasIn(api,'restful')?{}:{restful: false}))
            const { name,method,desc,path,mockPath,restful,headers={},params,validator={} } = api
            let apiname = `${namespace}${sep}${name}`,
                url = mock ? mockPath : path;
            //全局参数设置 http://xxxx:8080/users?全局参数key=全局参数value
            _assign(params,gParams)
            //此处读取api接口配置自动生成,无法在外部直接进行删除操作
            Object.defineProperty(this.api,apiname,{
                value(outParams,outOptions){
                    let _data = _isEmpty(outParams) ? params : _pick(_assign({},params,outParams),Object.keys(params))
                    let requestOptions = Object.assign({url,method,desc},(mock||AJAX_LOCALLY_ENABLE ? {baseURL: mockBaseURL} : {}))
                    restful && MakeApi._doRestful(_data,requestOptions)
                    let requestHeaders = {}
                    if(usingHeaders){
                        headers.length && (requestHeaders = MakeApi._doHeaders(_data,headers))
                    }
                    return axios(MakeApi._requestStandard(_assign(requestOptions,outOptions),_data,validator,restful,requestHeaders))
                }
            })
        });
    }

    static _doRestful(data,config){
        _forIn(data,(value, key)=>{
            if((config.url).indexOf(`{${key}}`)!=-1){
                config.url = (config.url).replace(`{${key}}`,encodeURIComponent(value))
                delete data[key]
            }
        })
    }
    //headers参数
    static _doHeaders(data,headers){
        let param = {}
        _forIn(data,(value, key)=>{
            if(headers.includes(key)){
                param[key] = (typeof value === 'function') ? value() : value;
                delete data[key]
            }
        })
        return param
    }

    static _requestStandard(options,data,validator,restful,requestHeaders){
        //特殊字符过滤
        if(!_isEmpty(data)){
            _forIn(data,(value, key)=>{
                if(typeof value==='string'){
                    if(options['removeInvalidChar']){
                        (checkInvalidChar(value)) && (data[key] = removeInvalidChar(value))
                    }
                }
            })
        }
        //请求参数设置
        if((options.method).toLowerCase() === 'post'){
            /**
             * axios post请求 headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
             * 参数需要通过qs.stringify()进行设置
             * 如果是jquery则不需要设置
             */
            if('headers' in options){
                if('Content-Type' in options.headers){
                    options.headers['Content-Type'].indexOf('x-www-form-urlencoded') !== -1 && (options.data = qs.stringify(data))
                }
            }else{
                options.data = data
            }
        }else if((options.method).toLowerCase() === 'get'){
            options.params = data
        }else if((options.method).toLowerCase() === 'put'){
            options.data = data
        }else if((options.method).toLowerCase() === 'delete'){
            options.params = data
        }
        //url验证规则
        (!_isEmpty(validator)) && (options.validator = validator)
        //restful风格检测
        restful && (options.restful = restful)
        //设置headers参数
        options.headers===void(0) && (options.headers = {}) 
        Object.assign(options.headers,requestHeaders)
        return options
    }
}

export default new MakeApi({
    config: API_CONFIG,
    ...API_DEFAULT_CONFIG
})['api']





