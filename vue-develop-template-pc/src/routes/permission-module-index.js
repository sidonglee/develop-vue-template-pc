/**
 * 权限路由配置，需要后端返回的路由配置数据
 * 对应permission-module目录下的文件
 * 包含文件名命名空间
 * 入口文件
 * [
 *      classRoleConfig: {deptManager: ()=>{//返回的匿名异步执行的函数},oprtManager: ()=>{}},
 *      moduleConfig: {moduleManager: ()=>{},moduleSetting: ()=>{}}
 * ]
 */
import camelCase from 'lodash/camelCase'
import {CONST_DEFAULT_CONFIG} from '@/config'

const modules = []
const b = (modules) => {
    let c = {}
    modules.forEach(module=>{
        for (let [k, v] of Object.entries(module[Object.keys(module)])) {
            c[`${Object.keys(module)}${CONST_DEFAULT_CONFIG.sep}${k}`] = v
        }
    })
    return c
}
const requireModule = require.context('./permission-module', false, /\.js$/)
requireModule.keys().forEach(fileName => {
    if (fileName === './index.js') return
    const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
    modules.push({[moduleName]: {...requireModule(fileName)}['default']})
})

export default b(modules)


