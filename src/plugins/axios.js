import axios from 'axios';
import { AXIOS_DEFAULT_CONFIG } from '../config/index';
import { requestSuccessFunc,requestErrorFunc,responseSuccessFunc,responseFailFunc } from '../config/interceptors/axios';

//自定义 axios 实例
let instance = null;
//创建实例时设置配置的默认值
instance = axios.create(AXIOS_DEFAULT_CONFIG);

/**
 * 拦截器
 * 在请求/响应被 then或catch处理前拦截它们
 */
//添加请求拦截器
instance.interceptors.request.use(requestSuccessFunc,requestErrorFunc);


//添加响应拦截器
instance.interceptors.response.use(responseSuccessFunc,responseFailFunc);

export default instance