/**
 * 相关事件接口配置
 * 跨组件交互
 * 入口文件
 * 组合各个api事件领域模型
 */
import axios from './axios'
import components from './components'
import apidocument from './apidocument'

export default {
    axios,
    ...components,
    apidocument
}

