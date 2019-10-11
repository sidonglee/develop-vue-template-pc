/**
 * vuex 状态管理插件
 * strict 开启严格模式(生成环境) 避免外部绕过mutation 函数发起状态变更操作
 */
import Vue from 'vue'
import Vuex from 'vuex'
//动态载入module 模块
import modules from '@/service/store'
//HTML5的本地存储插件
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
/**
 * 根节点状态，所有模块共享(应用层级的状态)，不推荐去修改根节点状态
 * const actions = {
 *  write_address({ commit, state,rootState }, address){
 *      //rootState.title
 *  }
 * }
 */
const state = {
    title: ''
}
export default new Vuex.Store({
    state,
    modules,
    strict: process.env.NODE_ENV !== 'production',
    //sessionStorage 只在当前窗口有效，关闭浏览器窗口缓存随即丢失
    plugins: [createPersistedState({ storage: window.sessionStorage })]
})


