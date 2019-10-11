/**
 * vuex 业务模型代理类
 * 只提供了获取单个值的方法
 */
import _keys from 'lodash/keys'
import _forIn from 'lodash/forIn'
import { mapState,mapActions } from 'vuex'

//获取某个命名空间下的单个state userState['order/address'].value
let statePlugin = {
    store: null,
    state: {},
    combination(options){
        this.store = options
        _keys(options.state).forEach(namespace => {
            this._createState(namespace,options,options.state[namespace])
        })
    },
    _createState(namespace,options,config={}){
        let _this = this
        _forIn(config,(value,key)=>{
            let stateName =  `${namespace}/${key}`
            let o = {
                get value(){
                    return _this.store.state[namespace][key]
                }
            }
            this.state[stateName] = o
        })
    }
}

let userStore = {
    init(options){
        statePlugin.combination(options)
    }
}
//自定义state 辅助对象
let userState = statePlugin['state']
export {userStore,userState}