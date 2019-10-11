/**
 * 饿了么 SwitchButton 开关按钮
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.SwitchButton = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'switchbuttonValue',
        event: 'switchbuttonChange'
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        activeText: {
            type: String,
            default: ''
        },
        inactiveText: {
            type: String,
            default: ''
        },
        userStyle: {
            type: Object,
            default(){
                return {}
            }
        },
        //组件指针 ref属性
        userRef: {
            type: String,
            default(){
                return `switchbutton-${this._uid}`
            }
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
    },
    data(){
        return {
            vValue: this.value
        }
    },
    watch: {
        switchbuttonValue(val, oldVal){
            this.vValue = val
        }
    },
    methods: {
        //使 Switch 获取焦点
        focus(){
            this.$refs[this.userRef].focus()
        },
        //switch 状态发生变化时的回调函数 val新状态的值
        change( val ){
            ('change' in this.listeners) && this.listeners.change(val)
            this.$emit('switchbuttonChange',val)
        },
        resetting(){
            this.vValue = this.value
            this.$emit('switchbuttonChange',this.vValue)
        },
    },
    render(h){
        //return h('div','饿了么 SwitchButton 开关按钮')
        return h(
            'el-switch',
            {
                ref: this.userRef,
                style: {...this.userStyle},
                props: {
                    value: this.vValue,
                    name: this.name,            //switch 对应的 name 属性
                    disabled: this.disabled,    //是否禁用
                    'active-text': this.activeText,     //switch 打开时的文字描述
                    'inactive-text': this.inactiveText, //switch 关闭时的文字描述
                },
                on: {
                    input: ( val ) => {
                        this.vValue = val
                        this.$emit('switchbuttonChange',val)
                    },
                    change: this.change
                }
            }
        )
    }
})