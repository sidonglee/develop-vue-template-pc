/**
 * 饿了么 InputNumber 计数器
 * 外部需要获取修改后的值可以通过定义 v-model指令获取
 * <tj-number-field v-bind="formData" v-model="num8"></tj-number-field>
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.InputNumber = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'inputValue',
        event: 'inputChange'
    },
    props: {
        name: String,
        value: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: 0
        },
        max:  {
            type: Number,
            default: 10000
        },
        step: {
            type: Number,
            default: 1
        },
        size: {
            type: String,
            default: 'small'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        precision: {
            type: Number,
            default: 0 //如果是1 则会显示 1.0
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        //父组件v-model
        inputValue: Number
    },
    data(){
        return {
            vValue: this.value
        }
    },
    created(){
        //this['$attrs'] 可获取传入的未在props中定义的额外参数
    },
    watch: {
        inputValue(val, oldVal){
            this.vValue = val
        }
    },
    methods: {
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
        change(value){
            ('change' in this.listeners) && this.listeners.change(val)
        },
        //重置inputValue字段
        resetting(){
            this.vValue = this.value

        },
        //空函数 提供默认函数的作用
        fn(){}
    },
    render(h){
        return h('el-input-number',{
            attrs: {
                name: this.name,    //原生name属性 number
            },
            props: {
                value: this.vValue, //模拟组件内部的v-model
                min: this.min,      //设置计数器允许的最小值 number
                max: this.max,      //设置计数器允许的最大值 number
                step: this.step,    //计数器步长 number
                size: this.size,    //计数器尺寸 string	large,small
                disabled: this.disabled, //是否禁用计数器 boolean
                //'controls-position': 'right',
                controls: true,
                label: this.label,  //输入框关联的label文字 string
                precision: this.precision,  //数值精度  number 不能小于 step 的小数位数
            },
            on: {
                //事件监听器基于 `on` 未传入事件将默认使用空返回值的函数
                blur: this.blur || (() => void this.fn()),
                focus: this.focus || (() => void this.fn()),
                change: this.change || (() => void this.fn()),
                //模拟v-model
                input: (value) =>{
                    this.vValue = value
                    //触发外部v-model事件
                    this.$emit('inputChange',value)
                }
            }
        })
    }
})

