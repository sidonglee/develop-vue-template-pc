/**
 * 饿了么 input输入框控件
 * 通过设置type可以改变输入框的类型 'text' 'number' 'password'...
 * 外部需要获取修改后的实时值可以通过定义 v-model指令获取
 * <tj-text-field v-model="input" v-bind="formData"></tj-text-field>
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.TextField = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'inputValue',
        event: 'inputChange'
    },
    props: {
        width: Number,
        name: String,
        readonly: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 100
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String,Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        emptyText: {
            type: String,
            default: '请输入内容'
        },
        size: {
            type: String,
            default: 'small'
        },
        label: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        //组件指针 ref属性
        userRef: {
            type: String,
            default: `textfield-${Math.ceil(Math.random()*1000)}`
        },
        //父组件v-model
        inputValue: [String,Number]
    },
    data(){
        return{
            vValue: this.value,
            //扩展props参数，用于继承
            propsOtherParams: {},
            //扩展attrs参数，用于继承
            attrsOtherParams : {},
            curDisabled: this.disabled
        }
    },
    created(){
        //this['$attrs'] 可获取传入的未在props中定义的额外参数
        // console.info(this.inputValue);
    },
    computed:{
        fieldType(){
            return this.type
        }
    },
    watch: {
        inputValue(val, oldVal){
            this.vValue = val
        },
        disabled(val, oldVal){
            this.curDisabled = val
        },
    },
    methods: {
        //solt child
        childSoltElements(h,label){
            if(!(!!this.label)) return new Array()
            return [h('template',{slot: 'prepend'},label)]
        },
        //在 Input 失去焦点时触发
        blur(event){
            ('blur' in this.listeners) && this.listeners.blur(event)
        },
        //在 Input 获得焦点时触发
        focus(event){
            ('focus' in this.listeners) && this.listeners.focus(event)
        },
        //在 Input 值改变时触发
        //输入结束，用户将焦点从当前文本框移到其它控件时才触发
        change(val){
            ('change' in this.listeners) && this.listeners.change(val)
        },
        //input 原生native click事件
        click(event){
            ('click' in this.listeners) && this.listeners.click(event)
        },
        //设置文本域的值
        setTextValue(text){
            this.vValue = text
            this.$emit('inputChange',text)
        },
        setDisabled(status=true){
            this.curDisabled = status
        },
        //在点击由 clearable 属性生成的清空按钮时触发
        clear(){
            ('clear' in this.listeners) && this.listeners.clear()
        },
        /**
         * input值改变时触发 实时
         * 两种不同的实现 render函数父组件使用listeners提供事件 template模板使用$emit触发v-model
         * listeners中的inputChange事件对外提供给render函数的父组件
         * $emit inputChange事件提供给template模板的v-model双向数据绑定
         */
        inputChange(value){
            //事件监听
            ('inputChange' in this.listeners) && this.listeners.inputChange(value)
            //v-model
            this.$emit('inputChange',value)
        },
        //重置inputValue字段
        resetting(){
            this.vValue = this.value
            this.$emit('inputChange',this.vValue)
        },
        //空函数 提供默认函数的作用
        fn(){},
    },
    render(h){
        return h(
            'el-input',
            {
                ref: this.userRef,
                style: {
                    //组件的宽度 numbr/String
                    width: `${this.width}px`
                },
                attrs: {
                    name: this.name,            //名称 String
                    readonly: this.readonly,    //是否只读 默认 'false' boolean
                    maxlength: this.maxlength,  //最大输入长度 默认 100 number
                    autofocus: this.autofocus,  //自动获取焦点 默认 'false' boolean
                    placeholder: this.emptyText,//输入框占位文本 string
                    ...this.attrsOtherParams    //用于扩展继承的参数
                },
                props: {
                    value: this.vValue, //绑定值 string / number
                    type: this.fieldType,    //类型 默认 'text' string
                    clearable: true,    //是否可清空 默认 'false' Boolean
                    size: this.size,    //输入框尺寸 'medium / small / mini' string
                    label: this.label,          //输入框关联的label文字
                    'suffix-icon': this.icon,   //输入框尾部图标 string
                    disabled: this.curDisabled,    //禁用 默认 'false' boolean
                    ...this.propsOtherParams    //用于扩展继承的参数
                },
                on: {
                    //事件监听器基于 `on` 未传入事件将默认使用空返回值的函数
                    blur: this.blur || (() => void this.fn()),
                    focus: this.focus || (() => void this.fn()),
                    change: this.change || (() => void this.fn()),
                    clear: this.clear || (() => void this.fn()),
                    //模拟v-model
                    input: (value)=>{
                        this.vValue = value
                        this.inputChange(value)
                    },
                },
                nativeOn: {
                    //仅对于组件，用于监听原生事件，而不是组件内部使用
                    //`vm.$emit` 触发的事件。
                    /* input: this.inputChange,
                    compositionstart: this.compositionstart,
                    compositionend: this.compositionend */
                    click: this.click || (() => void this.fn()),
                }
            },this.childSoltElements(h,this.label)
        )
    }
})