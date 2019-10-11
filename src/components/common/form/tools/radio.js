/**
 * 饿了么 radio 单选框组件
 * */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.Radio = TjUI.extend(js.base.fn,{
	inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'radioValue',
        event: 'radioChange'
    },
	props: {
		value: {
			type: String,
			default: ''
		},
		options: {
			type: Array,
			default(){
				return {}
			}
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
		}
	},
	data(){
		return {
			vValue: this.value
		}
	},
	watch: {
        radioValue(val, oldVal){
            this.vValue = val
        }
    },
	methods: {
        //绑定值变化时触发的事件 选中的 Radio label 值
        change( val ){
            ('change' in this.listeners) && this.listeners.change(val)
            this.$emit('radioChange',val)
		},
		resetting(){
			this.vValue = this.value
			this.$emit('radioChange',this.vValue)
        },
    },
	render(h){
		// return h('div','饿了么 radio 单选框组件')
		let radios = []
		radios = this.options.map(option =>  h('el-radio',{props: {label: option['value'],disabled: option['disabled']|| false}},option['label']))
		return h(
			'el-radio-group',
			{
				props: {
					value: this.vValue,
					disabled: this.disabled,
				},
				on: {
					input: (val) => {
						this.vValue = val
						this.$emit('radioChange',val)
					},
					change: this.change
				}
			},
			radios
		)
	}
})