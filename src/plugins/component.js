/**
 * 全局组件自动 引入、注册 插件
 * 程序中不需要再次 import 引入和components:{} 注册,直接使用即可
 * 全局组件名需要以base文件开头
 */
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

class MakeComponents{

    constructor(){
        const requireComponent = require.context(
            '../components', false, /base-[\w-]+\.vue$/
        )
        requireComponent.keys().forEach(fileName => {
            // Get component config
            const componentConfig = requireComponent(fileName)
            // Get PascalCase name of component
            const componentName = upperFirst(
                camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
            )
            // Register component globally
            Vue.component(componentName, componentConfig.default || componentConfig)
        })
    }
}

export default new MakeComponents();

