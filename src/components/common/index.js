/**
 * 启用公用组件库
 */
import {extend} from './helper/extend'
import camelCase from 'lodash/camelCase'

export default {
    install: (Vue,{window}) => {
        window.namespace = function (){
            var a=arguments, o=null, i, j, d;
            for (i=0; i<a.length; i=i+1) {
                d=a[i].split(".");
                o=window;
                for (j=0; j<d.length; j=j+1) {
                    o[d[j]]=o[d[j]] || {};
                    o=o[d[j]];
                }
            }
            return o;
        }
        //设置命名空间
        window.TjUI = {}
        TjUI.ns = namespace
        //基类 （用于继承的顶层对象）
        TjUI.ns('js.base')
        js.base.fn = function(){}
        js.base.fn.prototype = {
            // name: '基类用于继承',
            initComponent: function(){
                //初始化组件
            }
        }
        //继承类
        TjUI.extend = extend
        //动态载入所有模块
        const modules = {}
        const requireModule = require.context('./', true, /\.js$/)
        requireModule.keys().forEach(fileName => {
            if (fileName === './index.js' || fileName === './extend.js') return
            const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
            // console.info(moduleName);
            modules[moduleName] = {
                ...requireModule(fileName),
            }['default']
        })
        //所有组件的命名空间
        // console.info(window['TjUI']);
    }
}