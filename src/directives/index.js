/**
 * 注册全局自定义指令
 * 例子：<input v-focus/>
 */
import Vue from 'vue'

const requireDirectives = require.context('./common', false, /\.js$/)
requireDirectives.keys().forEach(fileName => {
    if (fileName === './index.js') return
    const directiveName = fileName.replace(/(\.\/|\.js)/g, '')
	Vue.directive(directiveName, requireDirectives(fileName)['default'])
})

export default {}