/**
 * tabs标签页模型 操作store
 * 模型中state和actions不能有同名
 */
const state = {
	activeModule: null,	//当前激活的tab页对应的module菜单 不含对应的组件component对象
}
const getters = {
    //获取当前激活的tab对应的moduleid
	getActiveModuleId: state => {
        return state.activeModule.moduleid
    },
    ///获取当前激活的tab对应的module
    getActiveModule: state => {
        return state.activeModule
    }
}
const actions = {
    handle_moduleId({ commit, state }, module){
        let applyModule = {}
        for (var key in module) {
            if(typeof module[key] !== 'object'){
                applyModule[key] = module[key]
            }
        }
        commit('HANDLE_TABMODULE',applyModule)
    }
}
const HANDLE_TABMODULE = 'HANDLE_TABMODULE'
const mutations = {
    [HANDLE_TABMODULE](state, data){
        state.activeModule = data
    }
}
export default {
    namespaced: true,   //必须带上命名空间
    state,
    getters,
    actions,
    mutations
}