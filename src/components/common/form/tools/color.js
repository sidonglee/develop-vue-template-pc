/**
 * 饿了么颜色选择组件
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.Color = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'colorValue',
        event: 'colorChange'
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'small'
        },
        //组件指针 ref属性
        userRef: {
            type: String,
            default: `color-${Math.ceil(Math.random()*100)}`
        },
        popperClass: {
            type: String,
            default: ''
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        colorValue: {
            type: String
        }
    },
    data(){
        return {
            vValue: this.value
        }
    },
    watch: {
        colorValue(val, oldVal){
            this.vValue = val
        }
    },
    methods: {
        //面板中当前显示的颜色发生改变时触发
        change(val){
            ('change' in this.listeners) && this.listeners.change(val);
            //v-model
            this.$emit('colorChange',val)
        },
        //重置inputValue字段
        resetting(){
            this.vValue = this.value
        }
    },
    render(h){
        return h(
            'el-color-picker',
            {
                ref: this.userRef,
                props: {
                    //默认值颜色
                    value: this.vValue,
                    size: this.size,
                    disabled: this.disabled,
                    //ColorPicker 下拉框的类名
                    'popper-class': this.popperClass,
                },
                on: {
                    input: (value)=>{
                        this.vValue = value
                    },
                    'change': this.change
                }
            },
        )
    }
})