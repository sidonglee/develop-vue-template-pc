/**
 * order 订单模型 操作store
 * 模型中state和actions不能有同名
 */
const state = {
    address: '杭州西湖区',
    date: '2018-07-13'
}

const actions = {
    write_address({ commit, state,rootState }, address){
        //console.info( 'eerwer',rootState['title'] );
        commit('WRITE_ADDRESS',address)
    },
    write_date({ commit, state }, date){
        commit('WRITE_DATE',date)
    }

}

const getters = {}

const WRITE_ADDRESS = 'WRITE_ADDRESS'
const WRITE_DATE = 'WRITE_DATE'
const mutations = {
    [WRITE_ADDRESS](state,address){
        state.address = address;
    },
    [WRITE_DATE](state,date){
        state.date = date;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
