/**
 * 服务层 const 插件
 * this.$consts['USER/GRADE']['value']
 */
import { CONST_DEFAULT_CONFIG } from '../config'
import CONST_CONFIG from '../service/const'

class MakeConst{

    constructor(options){
        this.const = {};
        this.constBuilder(options);
    }
    constBuilder({
        sep = '/',
        config = []
    }={}){
        Object.keys(config).map(namespace => {
            this._createConstSingle({
                namespace,
                sep,
                config: config[namespace]
            });
        })
    }
    _createConstSingle({
        namespace,
        sep = '/',
        config = []
    }){
        config.forEach(item => {
            const {name,value} = item
            let constName = `${namespace.toUpperCase()}${sep}${name}`
            Object.defineProperty(this.const,constName,{value})
        });
    }
}

export default new MakeConst({
    ...CONST_DEFAULT_CONFIG,
    config: CONST_CONFIG
})['const']





