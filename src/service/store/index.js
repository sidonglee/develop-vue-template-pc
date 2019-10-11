/**
 * 精简vuex的modules引入 
 * 和component.js 插件类似
 * 动态载入各个api领域模型
 */
import camelCase from 'lodash/camelCase'
const requireModule = require.context('./module', false, /\.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  	// Don't register this file as a Vuex module
  	if (fileName === './index.js') return
  	const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
    modules[moduleName] = {
        ...requireModule(fileName),
    }['default']
})
export default modules

