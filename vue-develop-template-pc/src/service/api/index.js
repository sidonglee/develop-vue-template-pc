/**
 * 相关接口配置
 * 异步与后端交互
 * 入口文件
 * 动态载入各个api领域模型
 */
import camelCase from 'lodash/camelCase'
const requireModule = require.context('./module', true, /\.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
    if (fileName === './index.js') return
    let moduleName = ''
    if(fileName.split("/").length>2){
        moduleName = fileName.replace(/(\.\/|\.js)/g, '')
    }else{
        moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
    }
    modules[moduleName] = {
        ...requireModule(fileName),
    }['default']
})
export default modules


