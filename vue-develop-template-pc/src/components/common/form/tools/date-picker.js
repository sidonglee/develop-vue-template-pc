/**
 * 饿了么日期选择组件
 */
import {dateformat,format,isNotEmpty,formatToDate,checkNumber,strNumToInt} from '../../helper/tools'

TjUI.ns('TjUI.form.tools')
TjUI.form.tools.DatePicker = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'dateValue',
        event: 'dateChange'
    },
    props: {
        width: Number,
        name: String,
        emptyText: {
            type: String,
            default(){
                return '请选择时间'
            }
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
        value: {
            type: String,
            default: ''
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        },
        showType: {
            type: String,
            default: 'date'
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        //date-picker指针 ref属性
        userRef: {
            type: String,
            default: `datepicker-${Math.ceil(Math.random()*1000)}`
        },
        //父组件v-model
        dateValue: {
            default(){
                return null
            }
        },
        readonly: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return {
            //本地数据
            vValue: this.value
        }
    },
    computed: {
        userFormat(){
            if(this.format.includes('HH')){
                return this.format.replace('HH','hh');
            }
            return this.format
        }
    },
    watch:{
        dateValue(val, oldVal){
            this.vValue = val
        }
    },
    methods:{
        //在 Input 失去焦点时触发
        blur(event){
            ('blur' in this.listeners) && this.listeners.blur(event)
        },
        //在 Input 获得焦点时触发
        focus(event){
            ('focus' in this.listeners) && this.listeners.focus(event)
        },
        //用户确认选定的值时触发
        change(val){
            ('change' in this.listeners) && this.listeners.change(val)
        },
        dateInputChange(value){
            this.vValue = value;
            //事件监听
            ('dateChange' in this.listeners) && this.listeners.dateChange(value);
            //外部v-model值
            this.$emit('dateChange',!!value ? dateformat(value,this.userFormat) : value)
        },
        //重置inputValue字段
        resetting(){
            this.vValue = this.value
            this.$emit('dateChange',this.vValue)
        },
        //空函数 提供默认函数的作用
        fn(){}
    },
    render(h){
        return h(
            'el-date-picker',
            {
                ref: this.userRef,
                style: {
                    //组件的宽度 numbr/String
                    width: `${this.width}px`
                },
                attrs: {
                    name: this.name,            //名称 String
                    placeholder: this.emptyText,//输入框占位文本 string
                    readonly: this.readonly,    //是否只读 默认 'false' boolean
                },
                props: {
                    value: (typeof this.vValue) === 'string' ? formatToDate(checkNumber(this.vValue) ? format(new Date(strNumToInt(this.vValue)), 'yyyy-MM-dd') : this.vValue) : this.vValue,     //绑定值 string / number new Date(2000, 0, 10, 10, 10)
                    type: this.showType,    //类型 默认 'text' string
                    format: this.format,    //显示在输入框中的格式 默认 'yyyy-MM-dd' string
                    clearable: true,        //是否可清空 默认 'false' Boolean
                    size: this.size,        //输入框尺寸 'medium / small / mini' string
                    disabled: this.disabled,//禁用 默认 'false' boolean
                    editable: false,        //文本框不可输入
                },
                on: {
                    //事件监听器基于 `on` 未传入事件将默认使用空返回值的函数
                    blur: this.blur || (() => void this.fn()),
                    focus: this.focus || (() => void this.fn()),
                    change: this.change || (() => void this.fn()),
                    //模拟v-model
                    input: this.dateInputChange,
                }
            }
        )
    }
})