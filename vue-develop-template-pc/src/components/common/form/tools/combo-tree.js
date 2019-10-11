/**
 * 饿了么 select tree选择器
 */
import { isArray } from '../../helper/tools'

TjUI.ns('TjUI.form.tools')
TjUI.form.tools.ComboTree = TjUI.extend(js.base.fn,{
    initComponent(){
        this['components'] = {
            'tj-tree': new TjUI.tree.TJtree()
        }
    },
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'combotreeValue',
        event: 'combotreeChange'
    },
    props: {
        id: String,
        name: String,
        //传入默认选中值 ['',''] String 需要默认选中时请结合 'defaultCheckedKeys' 参数
        //值的匹配必须和 'defaultCheckedKeys'相同
        value: {
            default(){
                return []
            }
        },
        //访问的后台地址
        conurl: String,
        //初始化查询参数
        queryParams: {
            type: Object,
            default(){
                return {}
            }
        },
        //本地数据源
        store: {
            type: Array,
            default(){
                return []
            }
        },
        expanded: {
            type: Boolean,
            default: false
        },
        //输入框宽度
        width: {
            type: Number,
            default: 160
        },
        //tree面板宽度
        treeWidth: {
            type: Number,
            default: 200
        },
        //tree面板高度
        treeHeight: {
            type: Number,
            default: 200
        },
        disabled: {
            type: Boolean,
            default: false
        },
        emptyText: {
            type: String,
            default: '请选择'
        },
        //是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        //默认要勾选tree的节点keys 必须是唯一值id的value
        //适用于数据源由外部传入，如果是远程获取必须在数据中增加'check'字段标明是否选中
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
        //combo-tree指针 ref属性
        userRef: {
            type: String,
            default: `combotree-${Math.ceil(Math.random()*1000)}`
        },
        //定义外部v-model值，默认值null因为单选传入String，多选array并不确定
        combotreeValue: {
            default(){
                return null
            }
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
        //外部事件扩展 只有 'change' 选中值发生改变事件
        listeners: {
            type: Object,
            default(){
                return {}
            }
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
    },
    data(){
        return {
            /* displayField: 'name',	//显示字段 可通过props修改
            valueField: 'id',       //真实值 */
            //本地数据
            curSelectValue: [],
            curSelectValue1: '',
            curDefaultCheckedKeys: [...this.defaultCheckedKeys],
            treeValue: [],
            treeUserRef: `combotree-${Math.ceil(Math.random()*10)}`,
            //测试数据
            /* data22: [{
                id: 1,
				label: '一级 1',
				children: [{
                        id: 2,
                        label: '二级 1-1',
                        children: [{
                            id: 3,
                            label: '二级 1-1-1'
                        },
                        {
                            id: 4,
                            label: '二级 1-1-2'
					    },{
                            id: 5,
                            label: '二级 1-1-3'
					    }]
				},{
                    id: 6,
                    label: '三级 1-1',
                    children: [{
                        id: 7,
                        label: '三级 1-1-1'
                    }]
                }
                ]
			}] */
        }
    },
    watch: {
        combotreeValue(val, oldVal){
            if( isArray(val) && val.length && typeof val[0] === 'string' ){
                let modelValue = []
                if(this.multiple){
                    this.curSelectValue = [...val]
                    modelValue = this.curSelectValue.map((name, index)=>({[this.displayField]:name,[this.valueField]:this.curDefaultCheckedKeys[index]}))
                }else{
                    this.curSelectValue1 = [...val][0]
                    modelValue = [{[this.displayField]:this.curSelectValue1,[this.valueField]:this.curDefaultCheckedKeys[0]}]
                }
                this.$emit('combotreeChange',this.returnType==='string' ? modelValue.map(val => val[this.valueField]).join(this.returnTypeSep) : modelValue)
                this.change(modelValue)
            }
        }
    },
    mounted(){
        // let type = Object.prototype.toString.call(this.value).slice(8, -1)
        let modelValue = []
        if(this.multiple){
            this.curSelectValue = [...this.value]
            modelValue = this.curSelectValue.map((name, index)=>({[this.displayField]:name,[this.valueField]:this.curDefaultCheckedKeys[index]}))
            // this.$emit('combotreeChange',this.curSelectValue.map((name, index)=>({[this.displayField]:name,[this.valueField]:this.curDefaultCheckedKeys[index]})))
        }else{
            this.curSelectValue1 = [...this.value][0]
            this.curDefaultCheckedKeys = [...this.defaultCheckedKeys]
            modelValue = [{[this.displayField]:this.curSelectValue1,[this.valueField]:this.curDefaultCheckedKeys[0]}]
            // this.$emit('combotreeChange',[{[this.displayField]:this.curSelectValue1,[this.valueField]:this.curDefaultCheckedKeys[0]}])
        }
        this.$nextTick().then(() => {
            //不能在判断中直接提交emit事件，组件构造还未完成事件无法提交出去
            this.$emit('combotreeChange',this.returnType==='string' ? modelValue.map(val => val[this.valueField]).join(this.returnTypeSep) : modelValue)
            this.change(modelValue)
        })
    },
    methods: {
        //创建下拉tree控件
        createTreeNode(h){
            return h('tj-tree',
            {
                style: {
                    height: '100%',
                    overflow: 'auto',
                    'font-weight': 'normal',
                },
                ref: this.treeUserRef,
                props: {
                    treeValue: this.treeValue,  //v-model value属性
                    store: this.store,          //this.data22
                    conurl: this.conurl,
                    queryParams: this.queryParams,
                    expanded: this.expanded,
                    checkStrictly: this.multiple,
                    showCheckbox: this.multiple,
                    defaultCheckedKeys: this.curDefaultCheckedKeys,
                    listeners: {
                        nodeClick: (record, node, tree)=>{
                            //使 input 失去焦点，并隐藏下拉框
                            this.$refs[this.userRef].blur()
                        },
                        checkChange: (record, checked, childCheckNodes)=>{
                            if(this.curSelectValue.includes(record.node.name) && !checked){
                                this.curSelectValue.splice(this.curSelectValue.findIndex(value => value === record.node.name),1)
                            }
                        }
                    }
                },
                on: {
                    //数据加载完成
                    afterLoadStore(data){},
                    //v-model input事件
                    treeChange: (records = [], node)=>{
                        //单选
                        if(!this.multiple){
                            //内部select控件，v-model值
                            this.curSelectValue1 = records[0]['label']
                            //外部combotree控件，v-model值(records[0]['value']) .toString()
                            this.$emit('combotreeChange',this.returnType === 'string' ? records[0]['value'] : [{[this.displayField]:this.curSelectValue1,[this.valueField]:records[0]['value']}])
                            //this.change([{[this.displayField]:this.curSelectValue1,[this.valueField]:records[0]['value']}])
                            this.change([{[this.displayField]:this.curSelectValue1,[this.valueField]:node[this.valueField]}])
                        }else{
                            //多选
                            let allRecords = this.curSelectValue.map((value ,index) => ({'label': value,'value': this.curDefaultCheckedKeys[index]}))
                            records.forEach(node => {
                                if(!(this.curSelectValue.includes(node.label))){
                                    allRecords.push(node)
                                }
                            })
                            let values = []
                            allRecords.forEach(record => {
                                if(!this.curSelectValue.includes( record['label'] )){
                                    this.curSelectValue.push(record['label'])
                                    this.curDefaultCheckedKeys.push(record['value'])
                                }
                                values.push({[this.displayField]:record['label'],[this.valueField]:record['value']})
                            });
                            this.$emit('combotreeChange',this.returnType === 'string' ? values.map(val=>val[this.valueField]).join(this.returnTypeSep):values)
                            this.change(values)
                        }
                    }
                }
            },[])
        },
        //重置combotreeValue字段
        resetting(){
            if(this.multiple){
                this.curSelectValue.splice(0,this.curSelectValue.length,...this.value)
                this.curDefaultCheckedKeys.splice(0,this.curDefaultCheckedKeys,...this.defaultCheckedKeys)
                this.$refs[this.treeUserRef].setCheckedKeys(this.curDefaultCheckedKeys)
                let values = this.curSelectValue.map((name, index)=>({[this.displayField]:name,[this.valueField]:this.curDefaultCheckedKeys[index]}))
                this.$emit('combotreeChange',this.returnType === 'string' ? values.map(val=>val[this.valueField]).join(this.returnTypeSep) : values)
                this.change(values)
            }else{
                this.curSelectValue1 = [...this.value][0]
                this.curDefaultCheckedKeys = [...this.defaultCheckedKeys]
                this.$emit('combotreeChange',this.returnType === 'string' ? this.curDefaultCheckedKeys[0] : [{[this.displayField]:this.curSelectValue1,[this.valueField]:this.curDefaultCheckedKeys[0]}])
                this.change(values)
            }
        },
        change(val){
            ('change' in this.listeners) && this.listeners.change(val)
        },
        setDefaultCheckedKeys( keys ){
            this.curDefaultCheckedKeys = [...keys]
        }
    },
    render(h){
        //h('div','饿了么 select tree选择器')
        let elOptions = []
        //构造默认的下拉选择项option
        elOptions.push([{value: '',label: ''}].map((option,index) => {
            return h('el-option',{
                style: {
                    width: `${this.treeWidth}px`,
                    height: 'auto',
                    'max-height': `${this.treeHeight}px`,
                    'background-color': '#fff',
                    padding: '0px',
                    overflow: 'auto',
                },
                props: {
                    key: option.value,
                    label: option.label,
                    value: option.value,
                }
            },[this.createTreeNode(h)])
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
                    value: (this.multiple) ? this.curSelectValue : this.curSelectValue1,
                    size: 'small',                      //输入框尺寸 默认 'small' string 
                    disabled: this.disabled,            //设为true整个选择器不可用
                    clearable: true,                    //单选时是否可以清空选项
                    multiple: this.multiple,            //设置多选，value对应为数组
                    'collapse-tags': this.collapseTags  //将多选合并为一段文字 默认false
                },
                on: {
                    //单选用户点击清空按钮时触发，多选清空需要操作tree
                    clear: ()=>{
                        this.curSelectValue1 = ''
                        this.curSelectValue.splice(0,this.curSelectValue.length)
                        this.curDefaultCheckedKeys.splice(0,this.curDefaultCheckedKeys.length)
                        this.$refs[this.treeUserRef].setCheckedKeys(this.curDefaultCheckedKeys)
                        this.$emit('combotreeChange',this.returnType === 'string' ? '' : [])
                        this.change([])
                    },
                    'remove-tag': (tag)=>{
                        this.curSelectValue.splice(0,1)
                        this.curDefaultCheckedKeys.splice(0,1)
                        let values = this.curSelectValue.map((name, index)=>({[this.displayField]:name,[this.valueField]:this.curDefaultCheckedKeys[index]}))
                        this.$emit('combotreeChange',this.returnType === 'string' ? values.map(val => val[this.valueField]).join(this.returnTypeSep) : values)
                        this.change(values)
                        this.$refs[this.treeUserRef].setCheckedKeys(this.curDefaultCheckedKeys)
                    }
                }
            },
            elOptions
        )
    }
})