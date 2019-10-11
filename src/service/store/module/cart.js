/**
 * 购物车模型 操作store
 * 模型中state和actions不能有同名
 */
const state = {
    num: 30,    //数量
    weight: 10  //重量
}

const actions = {
    add_goods({ commit, state }, goods){
        commit('ADD_NUM', goods)
    },
    del_goods({ commit, state }, goods){
        commit('DELETE_NUM', goods)
    }
}

const getters = {}

const ADD_NUM = 'ADD_NUM'
const DELETE_NUM = 'DELETE_NUM'
const mutations = {
    [ADD_NUM](state,goods){
        state.num++
    },
    [DELETE_NUM](state,goods){
        state.num--
    }
}
export default {
    namespaced: true,   //必须带上命名空间
    state,
    getters,
    actions,
    mutations
}

