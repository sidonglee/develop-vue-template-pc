/**
 * 饿了么 Select 选择器
 */
import { isNotEmpty,intNumToStr,apply } from '../../helper/tools'

TjUI.ns('TjUI.form.tools')
TjUI.form.tools.ComboBox = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        //combo-box需要注意v-model的value和props value不能是同一个参数
        prop: 'selectValue',
        event: 'selectChange'
    },
    props: {
        width: Number,
        name: String,
        //访问的后台地址
        conurl: String,
        //初始化查询参数
        queryParams: {
            type: Object,
            default(){
                return {}
            }
        },
        options: {
            type: Array,
            default(){
                return []   //[{value:'01',label:'苹果'}...]
            }
        },
        emptyText: {
            type: String,
            default: '请输入内容'
        },
        //设置多选时，value必须传入的是数组
        multiple: {
            type: Boolean,
            default: false
        },
        collapseTags: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'small'
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        value: {
            type: Array,
            default(){
                return []
            }
        },
        //Select 组件头部内容
        prefixLabel: String,
        //数据过滤器
        loadFilter: {
            default: null
        },
        //定义外部v-model值，默认值null因为单选传入String，多选Array并不确定
        selectValue: {
            default(){
                return null
            }
        },
        displayField: {
            type: String,
            default: 'name'
        },
        valueField: {
            type: String,
            default: 'id'
        },
        //返回值类型 string,array
        //设置为多选还需要设置值的 '分隔符号'
        returnType: {
            type: String,
            default: 'string'
        },
        //'分隔符号'
        returnTypeSep: {
            type: String,
            default: ','
        }
    },
    data(){
        return {
            // displayField: 'name',	//显示字段 可通过props修改
            // valueField: 'id',       //真实值
            //本地value参数
            vValue: !this.multiple ? this.value[0] : [...this.value],
            //本地options参数
            currentOptions: [...this.options],
        }
    },
    watch: {
        //监测数据源
        currentOptions(val, oldVal){
            if(this.vValue === void(0)) return
            if(this.multiple){
                let arr = []
                val.forEach(item => {
                    if(this.vValue.includes(item[this.valueField])){
                        arr.push({[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]})
                    }
                });
                if(!arr.length){
                    this.vValue = []
                    this.$emit('selectChange',arr)
                    return
                }
                if(this.returnType==='string'){
                    this.$emit('selectChange',arr.map(item=> item[this.valueField]).join(this.returnTypeSep))
                }else{
                    this.$emit('selectChange',arr)
                }
            }else{
                if(isNotEmpty(this.vValue)){
                    let item = val.find(item=> item[this.valueField]===this.vValue)
                    if(item === void(0)){
                        this.vValue = ''
                        this.$emit('selectChange','')
                        return
                    }
                    //this.$emit('selectChange',[{[this.displayField]:item[this.displayField],[this.valueField]:item[[this.valueField]]}])
                    if(this.returnType==='string'){
                        this.$emit('selectChange',item[this.valueField])
                    }else{
                        this.$emit('selectChange',[{[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]}])
                    }
                }else{
                    if(this.returnType==='string'){
                        this.$emit('selectChange','')
                    }else{
                        this.$emit('selectChange',[])
                    }
                }
            }
        },
        selectValue(val, oldVal){
            let strVal = val
            if(typeof val[0] === 'object'){
                strVal = []
                for (var v of val) {
                    strVal.push(v[this.valueField])
                }
            }
            if(strVal.toString()!== this.vValue.toString()){
                this.vValue = !this.multiple ? val[0] : [...val]
                if(this.multiple){
                    let arr = []
                    this.currentOptions.forEach(item => {
                        if(this.vValue.includes(item[this.valueField])){
                            arr.push({[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]})
                        }
                    });
                    if(this.returnType==='string'){
                        this.$emit('selectChange',arr.map(item=> item[this.valueField]).join(this.returnTypeSep))
                    }else{
                        this.$emit('selectChange',arr)
                    }
                }else{
                    let item = this.currentOptions.find(item=> item[this.valueField]===this.vValue)
                    if(this.returnType==='string'){
                        this.$emit('selectChange',item[this.valueField])
                    }else{
                        this.$emit('selectChange',[{[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]}])
                    }
                }
            }
        }
    },
    created(){
        //this['$attrs'] 可获取传入的未在props中定义的额外参数
    },
    mounted(){
        if((!!this.conurl) && !this.currentOptions.length){
            this.initLoadStore()
        }else{
            this.currentOptions.splice(0,this.currentOptions.length,...this.options)
        }
    },
    methods: {
        //初始化数据
        initLoadStore(){
			this.$api[this.conurl](this.queryParams).then(resData => {
                setTimeout(() => {
                    this.currentOptions.splice(0,this.currentOptions.length,...((!!this.loadFilter) ? this.loadFilter(resData.data) : resData.data.map(item=>({[this.valueField]: item[this.valueField]+'',[this.displayField]: item[this.displayField]+''}))))
                }, 0);
			}).catch( error =>{
				console.log(error)
            })
        },
        //刷新store
        reloadStore(params){
            apply(this.queryParams,params)
            this.currentOptions.splice(0,this.currentOptions.length)
            this.initLoadStore()
        },
        //选中值发生变化时触发 目前的选中值
        change(val){
            ('change' in this.listeners) && this.listeners.change(this.currentOptions.find(option=> option[this.valueField]==val))
        },
        //下拉框出现/隐藏时触发 出现则为 true，隐藏则为 false
        visibleChange(expand){
            ('expand' in this.listeners) && this.listeners.expand(val)
        },
        //多选模式下移除tag时触发 移除的tag值
        removeTag(val){
            (('removeTag' in this.listeners) && this.multiple) && this.listeners.removeTag(val)
        },
        //可清空的单选模式下用户点击清空按钮时触发
        clear(){
            (('clear' in this.listeners) && this.clearable) && this.listeners.clear(val)
        },
        //当 input 失去焦点时触发
        blur(event){
            ('blur' in this.listeners) && this.listeners.blur(event)
        },
        //当 input 获得焦点时触发
        focus(event){
            ('focus' in this.listeners) && this.listeners.focus(event)
        },
        //重置selectValue字段
        resetting(){
            if(this.value[0] === void(0)){
                this.vValue = !this.multiple ? '' : [];
                if(this.returnType === 'string'){
                    this.$emit('selectChange',"")
                }else{
                    this.$emit('selectChange',[])
                }
                return
            }
            if(this.multiple){
                this.vValue.splice(0,this.vValue.length,...this.value)
                let arr = []
                this.currentOptions.forEach(item => {
                    if(this.vValue.includes(item[this.valueField])){
                        arr.push({[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]})
                    }
                });
                if(this.returnType==='string'){
                    this.$emit('selectChange',arr.map(item=> item[this.valueField]).join(this.returnTypeSep))
                }else{
                    this.$emit('selectChange',arr)
                }
            }else{
                this.vValue = this.value[0]
                if(isNotEmpty(this.vValue)){
                    let item = this.currentOptions.find(item=> item[this.valueField]===this.vValue)
                    //this.$emit('selectChange',[{[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]}])
                    if(this.returnType==='string'){
                        this.$emit('selectChange',item[this.valueField])
                    }else{
                        this.$emit('selectChange',[{[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]}])
                    }
                }else{
                    if(this.returnType==='string'){
                        this.$emit('selectChange',"")
                    }else{
                        this.$emit('selectChange',[])
                    }
                }
            }
        },
        //空函数 提供默认函数的作用
        fn(){}
    },
    render(h){
        //eturn h('div','Select 选择器')
        let elOptions = []
        //构造下拉选择项option 自己的理解是：这里的map类似template中的v-for指令，可以实现动态渲染
        elOptions = this.currentOptions.map((option,index) => {
            return h('el-option',{
                props: {
                    key: option[this.valueField],
                    label: option[this.displayField],
                    value: option[this.valueField],
                }
            })
        })
        //Select 组件头部内容
        if(this.prefixLabel){
            elOptions.push(h('span',{style: {lineHeight: '32px'},slot: 'prefix'},this.prefixLabel))
        }
        return h(
            'el-select',
            {
                style: {
                    width: `${this.width}px`
                },
                attrs: {
                    name: this.name, //select input 的 name 属性 string
                    placeholder: this.emptyText,    //输入框占位文本 string
                },
                props: {
                    value: this.vValue,                 //选择option的value 初始化时传递value 可执行默认选中
                    multiple: this.multiple,            //是否多选 默认 'false' boolean
                    'multiple-limit': 50,               //多选时用户最多可以选择的项目数，为 0 则不限制
                    'collapse-tags': this.collapseTags, //多选时是否将选中值按文字的形式展示一行
                    disabled: this.disabled,            //是否禁用 默认 'false' boolean
                    clearable: this.clearable,          //单选时是否可以清空选项 默认 'true' boolean
                    size: this.size,                    //输入框尺寸 默认 'small' string 
                    filterable: false,                  //是否可搜索 默认 'false' boolean
                    loading: false,                     //是否正在从远程获取数据 默认 'false' boolean
                },
                on: {
                    change: this.change,
                    'visible-change': this.visibleChange,
                    'remove-tag': this.removeTag,
                    clear: this.clear,
                    blur: this.blur,
                    focus: this.focus,
                    //模拟v-model
                    input: (val)=>{
                        if(this.multiple){
                            this.vValue = val
                            let arr = val.map(item=> this.currentOptions.find(option => option[this.valueField] === item))
                            //触发外部v-model事件
                            if(this.returnType==='string'){
                                this.$emit('selectChange',arr.map(item=> item[this.valueField]).join(this.returnTypeSep))
                            }else{
                                this.$emit('selectChange',arr.map(item=> ({[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]})))
                            }
                        }else{
                            this.vValue = val
                            if(isNotEmpty(this.vValue)){
                                let item = this.currentOptions.find(item=> item[this.valueField]===val)
                                if(this.returnType==='string'){
                                    this.$emit('selectChange',item[this.valueField])
                                }else{
                                    this.$emit('selectChange',[{[this.displayField]:item[this.displayField],[this.valueField]:item[this.valueField]}])
                                }
                            }else{
                                if(this.returnType==='string'){
                                    this.$emit('selectChange',"")
                                }else{
                                    this.$emit('selectChange',[])
                                }
                            }
                        }
                    }
                }
            },elOptions)
    }
})




