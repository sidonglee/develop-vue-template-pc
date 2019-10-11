/**
 * 数据字典vue全局过滤器载入 插件（在模板中使用）
 * <div>{{0 | SEX_TYPE}}</div>
 * 例如在methods中请使用Vue根实例过滤转换器 plugins/root-filters.js
 */
import Vue from 'vue'
import dictionary from '../service/data-dict'

class DataDictFilter{
    constructor(){
        Object.keys(dictionary).forEach((key, index) => {
            //全局过滤器
            Vue.filter(key.toUpperCase(), function (value) {
                if (value.length) return ''
                let tar = dictionary[key].find(item => item['paramValue'] == value)
                return tar && tar['paramDesc'] || ''
            })
        })
    }
}
export default new DataDictFilter()