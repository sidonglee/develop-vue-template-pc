/**
 * 路由配置
 * 对应module目录下的文件
 * 入口文件
 */
import camelCase from 'lodash/camelCase'
const requireModule = require.context('./module', false, /\.js$/)
const modules = []
requireModule.keys().forEach(fileName => {
    if (fileName === './index.js') return
    const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
    modules.push(...requireModule(fileName)['default'])
})
export default modules

