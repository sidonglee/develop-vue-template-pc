/**
 * 饿了么 select grid选择器
 * 默认多选不可设置
 */
import './css/combo-grid.css'
import { isArray } from '../../helper/tools'

TjUI.ns('TjUI.form.tools')
TjUI.form.tools.ComboGrid = TjUI.extend(js.base.fn,{
    initComponent(){
        this['components'] = {
            'grid': new TjUI.form.tools.combogrid.Grid(),
        }
    },
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'combogridValue',
        event: 'combogridChange'
    },
    props: {
        id: String,
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
        columns: {
            type: Array,
            default(){
                return []
            }
        },
        //传入默认选中值 ['',''] 必须是唯一值id的value 需要默认选中时请结合 'defaultCheckedKeys' 参数
        //值的匹配必须和 'defaultCheckedKeys'相同
        value: {
            default(){
                return []
            }
        },
        //输入框宽度
        width: {
            type: Number,
            default: 160
        },
        //tree面板宽度
        gridWidth: {
            type: Number,
            default: 470
        },
        disabled: {
            type: Boolean,
            default: false
        },
        emptyText: {
            type: String,
            default: '请选择'
        },
        //设置是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        //默认要勾选grid行的keys 必须是唯一值id的value
        //适用于数据源由外部传入
        defaultCheckedKeys: {
            type: Array,
            default(){
                return []
            }
        },
        //多选时将选项合并为一段文字
        collapseTags: {
            type: Boolean,
            default: true
        },
        //Select 组件头部内容
        prefixLabel: String,
        //combo-grid指针 ref属性
        userRef: {
            type: String,
            default: `combogrid-${Math.ceil(Math.random()*1000)}`
        },
        //显示字段 可通过props修改
        displayField: {
            type: String,
            default: 'name'
        },
        //真实值
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
        },
        //外部v-model的value值
        combogridValue: {
            type: [Array,String]
        },
        //外部事件扩展 只有 'change' 选中值发生改变事件
        listeners: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            gridLink: `link-combogrid-${this._uid}`,
            //本地数据
            curSelectValue: [],
            allSelectValue: [],
            vValue: [...this.value],
            vdefaultCheckedKeys: [...this.defaultCheckedKeys]
        }
    },
    mounted: function () {
        this.$nextTick(() => {
          this.$el.querySelector(".el-select-dropdown__wrap").style['max-height']="350px"
          this.$el.querySelector("ul").style.padding="0px"
        })
    },
    watch:{
        combogridValue(val, oldVal){
            let isEquery = this.allSelectValue.every((selectValue)=>{
                return this.vdefaultCheckedKeys.find(key => key === selectValue[this.valueField])
            })
            if(!isEquery){
                this.loadFilter()
            }
        }
    },
    methods: {
        //创建下拉grid控件
        createTreeNode(){
            return this.$createElement(
                'grid',
                {
                    'class': 'combogrid-panel-content-cls',
                    props: {
                       link: this.gridLink,
                       userConurl: this.conurl,
                       //初始化查询参数
                       userQueryParams: this.queryParams,
                       userColumns: this.columns,
                       userSelMode: !this.multiple ? 'simple' : 'multi',
                    },
                    on: {
                        selectRow: (selection, row) => {
                            if(!this.multiple){
                                this.curSelectValue = [row[this.displayField]]
                                this.allSelectValue = selection
                                this.vdefaultCheckedKeys = [row[this.valueField]]
                                if(this.returnType === 'string'){
                                    this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
                                }else{
                                    this.$emit('combogridChange',this.allSelectValue)
                                }
                                this.change(this.allSelectValue)
                                return
                            }
                            let index = this.allSelectValue.findIndex(selectRow=>{
                                return selectRow[this.valueField] === row[this.valueField]
                            })
                            if(index!==-1){
                                if(this.vValue.length){
                                    let vIndex = this.vdefaultCheckedKeys.findIndex(checkKey=>checkKey===row[this.valueField])
                                    this.vValue.splice(vIndex,1)
                                    this.vdefaultCheckedKeys.splice(vIndex,1)
                                }
                                this.allSelectValue.splice(index,1)
                                this.curSelectValue.splice(0,this.curSelectValue.length,...this.allSelectValue.map(selectRow => selectRow[this.displayField]))
                                if(this.returnType === 'string'){
                                    this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
                                }else{
                                    this.$emit('combogridChange',this.allSelectValue)
                                }
                                this.change(this.allSelectValue)
                                return
                            }
                            this.allSelectValue.push({[this.valueField]:row[this.valueField],[this.displayField]:row[this.displayField]})
                            this.curSelectValue.push(row[this.displayField])
                            this.vdefaultCheckedKeys = this.allSelectValue.map(selectValue => selectValue[this.valueField])
                            //外部combogrid控件，v-model值
                            if(this.returnType === 'string'){
                                this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
                            }else{
                                this.$emit('combogridChange',this.allSelectValue)
                            }
                            this.change(this.allSelectValue)
                        },
                        selectAll: (selection) => {
                            let store = (selection.length) ? selection : this.getLinkComponent(this.gridLink).getStore();
                            store.forEach(row => {
                                let index = this.allSelectValue.findIndex(selectRow => selectRow[this.valueField] === row[this.valueField])
                                if(index===-1){
                                    this.allSelectValue.push({[this.valueField]:row[this.valueField],[this.displayField]:row[this.displayField]})
                                }else{
                                    if(!selection.length){
                                        this.allSelectValue.splice(index,1)
                                    }
                                }
                            });
                            this.curSelectValue.splice(0,this.curSelectValue.length,...this.allSelectValue.map(selectRow => selectRow[this.displayField]))
                            this.vdefaultCheckedKeys = this.allSelectValue.map(selectValue => selectValue[this.valueField])
                            //外部combogrid控件，v-model值
                            if(this.returnType === 'string'){
                                this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
                            }else{
                                this.$emit('combogridChange',this.allSelectValue)
                            }
                            this.change(this.allSelectValue)
                        },
                        afterDataLoad: this.loadFilter
                    },
                    attrs: {
                        combogrid: this
                    }
                })
        },
        loadFilter(){
            if(this.vValue.length && this.vdefaultCheckedKeys.length){
                this.allSelectValue.length && (this.allSelectValue = [])
                this.curSelectValue.length && (this.curSelectValue = [])
                let defaultSelectRows = this.getLinkComponent(this.gridLink).getStore().filter(row => this.vdefaultCheckedKeys.includes(row[this.valueField]) && row )
                defaultSelectRows.forEach(defaultRow=>{
                    let index = this.allSelectValue.findIndex(row=>{
                        return defaultRow[this.valueField] === row[this.valueField]
                    })
                    if(index===-1){
                        this.allSelectValue.push({[this.valueField]:defaultRow[this.valueField],[this.displayField]:defaultRow[this.displayField]})
                        this.curSelectValue.push(defaultRow[this.displayField])
                    }
                })
                let minusArr = this.vdefaultCheckedKeys.filter(key => !(this.allSelectValue.map(row=>row[this.valueField])).includes(key))
                if(minusArr.length){
                    minusArr.forEach(checkKey=>{
                        this.allSelectValue.push({[this.valueField]:checkKey,[this.displayField]:this.vValue[this.vdefaultCheckedKeys.findIndex(key=>key===checkKey)]})
                        this.curSelectValue.push(this.vValue[this.vdefaultCheckedKeys.findIndex(key=>key===checkKey)])
                    })
                }
            }
            let selectRows = []
            for (let elem of this.getLinkComponent(this.gridLink).getStore().values()) {
                if(this.allSelectValue.findIndex(selectRow=> selectRow[this.valueField] === elem[this.valueField])!==-1){
                    selectRows.push(elem)
                }
            }
            this.getLinkComponent(this.gridLink).toggleSelection(selectRows)
            if(this.returnType === 'string'){
                this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
            }else{
                this.$emit('combogridChange',this.allSelectValue)
            }
            this.change(this.allSelectValue)
        },
        //重置combogridValue字段
        resetting(){
            this.vValue.splice(0,this.vValue.length,...this.value)
            this.vdefaultCheckedKeys.splice(0,this.vdefaultCheckedKeys.length,...this.defaultCheckedKeys)
            this.curSelectValue.splice(0,this.curSelectValue.length)
            this.allSelectValue.splice(0,this.allSelectValue.length)
            this.vValue.forEach((val, index)=>{
                this.curSelectValue.push(val)
                this.allSelectValue.push({[this.displayField]:val,[this.valueField]:this.vdefaultCheckedKeys[index]})
            })
            let selectRows = []
            for (let elem of this.getLinkComponent(this.gridLink).getStore().values()) {
                if(this.allSelectValue.findIndex(selectRow=> selectRow[this.valueField] === elem[this.valueField])!==-1){
                    selectRows.push(elem)
                }
            }
            this.getLinkComponent(this.gridLink).toggleSelection(selectRows)
            this.vdefaultCheckedKeys = this.allSelectValue.map(selectValue => selectValue[this.valueField])
            if(this.returnType === 'string'){
                this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
            }else{
                this.$emit('combogridChange',this.allSelectValue)
            }
        },
        change(val){
            if(this.returnType === 'string'){
                if(!val.length){
                    ('change' in this.listeners) && this.listeners.change('')
                }else{
                    ('change' in this.listeners) && this.listeners.change(val.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
                }
            }else{
                ('change' in this.listeners) && this.listeners.change(val)
            }
        },
        setDefaultCheckedKeys( keys ){
            this.vdefaultCheckedKeys = [...keys]
        }
    },
    render(h){
        // return h('div','饿了么 select grid选择器')
        let elOptions = []
        //构造默认的下拉选择项option
        elOptions.push([{value: '',label: ''}].map((option,index) => {
            return h('el-option',{
                'class': 'combogrid-panel-cls',
                style: {
                    width: `${this.gridWidth}px`,
                    'height': `300px`,
                    'background-color': '#fff',
                    padding: '0px',
                    overflow: 'hidden',
                },
                props: {
                    key: option.value,
                    label: option.label,
                    value: option.value,
                }
            },[this.createTreeNode()])
        })[0])
        //Select 组件头部内容
        if(this.prefixLabel){
            elOptions.push(h('span',{style: {lineHeight: '32px'},slot: 'prefix'},this.prefixLabel))
        }
        return h(
            'el-select',
            {
                ref: this.userRef,
                style: {
                    width: `${this.width}px`        //文本框控件宽度
                },
                attrs: {
                    id: this.id,
                    name: this.name,
                    placeholder: this.emptyText,    //输入框占位文本 string
                },
                props: {
                    value:  this.curSelectValue,
                    size: 'small',                      //输入框尺寸 默认 'small' string
                    disabled: this.disabled,            //设为true整个选择器不可用
                    clearable: true,                    //单选时是否可以清空选项
                    multiple: true,                     //设置多选，value对应为数组
                    'collapse-tags': this.collapseTags  //将多选合并为一段文字 默认false
                },
                on: {
                    //单选用户点击清空按钮时触发，多选清空需要操作tree
                    clear: ()=>{
                        this.vValue.splice(0,this.vValue.length)
                        this.vdefaultCheckedKeys.splice(0,this.vdefaultCheckedKeys.length)
                        this.curSelectValue.splice(0,this.curSelectValue.length)
                        this.allSelectValue.splice(0,this.allSelectValue.length)
                        this.getLinkComponent(this.gridLink).clearSelection()
                        if(this.returnType === 'string'){
                            this.$emit('combogridChange','')
                        }else{
                            this.$emit('combogridChange',this.allSelectValue)
                        }
                        this.change(this.allSelectValue)
                    },
                    'remove-tag': (value)=>{
                        let index = this.curSelectValue.findIndex(name => name === value);
                        if(this.vValue.length){
                            let vIndex = this.vValue.findIndex(name => name===value);
                            this.vValue.splice(vIndex,1)
                            this.vdefaultCheckedKeys.splice(vIndex,1)
                        }
                        this.curSelectValue.splice(index,1)
                        this.allSelectValue.splice(index,1)
                        this.vdefaultCheckedKeys = this.allSelectValue.map(selectValue => selectValue[this.valueField])
                        if(this.returnType === 'string'){
                            this.$emit('combogridChange',this.allSelectValue.map(selectValue=>selectValue[this.valueField]).join(this.returnTypeSep))
                        }else{
                            this.$emit('combogridChange',this.allSelectValue)
                        }
                        this.change(this.allSelectValue)
                        let selectRows = []
                        for (let elem of this.getLinkComponent(this.gridLink).getStore().values()) {
                            if(this.allSelectValue.findIndex(selectRow=> selectRow[this.valueField] === elem[this.valueField])!==-1){
                                selectRows.push(elem)
                            }
                        }
                        this.getLinkComponent(this.gridLink).toggleSelection(selectRows)
                    },
                }
            },
            elOptions
        )
    }
})