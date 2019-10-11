/**
 * 放置在Vue根实例上的过滤转换器
 * {"KEY": [{"paramValue":key,"paramDesc": value}],...}
 * KEY也可以是 '命名空间/名称' 防止命名冲突
 * 这里的数据比全局数据字典过滤器(dataDictFilter)要丰富
 * 根实例过滤转换器包含全局数据字典数据
 */
//导入需要转换为 '过滤转换器' 的数据
import dictionary from '../service/data-dict'

export default {
    data(){
        return {
            data: {
                //数据源
                /* '命名空间/OPRT_TYPE': [
                    { "paramValue": 1, "paramDesc": "一般人员" },
                    { "paramValue": 2, "paramDesc": "巡视人员" }
                ] */
            },
            _filterFunc: null,      // 过滤器函数
        }
    },
    created(){
        this.data = {...dictionary} //所有转换参数放入本地数据源中
        this._getRootParamsFunc()
    },
    methods: {
        _getRootParamsFunc() {
            this._filterFunc = {}
            Object.keys(this.data).forEach(paramKey =>{
                this._filterFunc[paramKey.toUpperCase()] = val => {
                    let tar = this.data[paramKey].find(item => item['paramValue'] === val)
                    return tar && tar['paramDesc'] || ''
                }
            })
        },
        _rootFilters(val, id = 'SEX_TYPE') {
            const func = this._filterFunc
            const mth = func && func[id]
            return mth && mth(val) || val
        }
    }
}