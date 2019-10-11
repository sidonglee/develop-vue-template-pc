/**
 * 饿了么 radio-group 单选框组件
 * 一组按钮同时只能选择一个
 * */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.RadioBtnGroup = TjUI.extend(js.base.fn,{
	inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'radioBtnGroupValue',
        event: 'radioBtnGroupChange'
    },
	props: {
		value: {
			type: String,
			default: ''
		},
		size: {
			type: String,
			default: 'small'
		},
		options: {
			type: Array,
			default(){
				return []
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
        radioBtnGroupValue(val, oldVal){
            this.vValue = val
        }
    },
	methods: {
		//绑定值变化时触发的事件	选中的 Radio label 值
		change( val ){
			('change' in this.listeners) && this.listeners.change(val)
            this.$emit('radioBtnGroupChange',val)
		},
		resetting(){
			this.vValue = this.value
			this.$emit('radioBtnGroupChange',this.vValue)
        },
	},
	render(h){
		// return h('div','饿了么 radio-group 单选框组件')
		let radioButtons = []
		radioButtons = this.options.map((option, index)=>{
			return h('el-radio-button',{props: {label: option.value,disabled: option.disabled}},option.label)
		})
		return h(
			'el-radio-group',
			{
				props: {
					value: this.vValue,
					disabled: this.disabled,
					size: this.size,
				},
				on: {
					input: (val) => {
						this.vValue = val
						this.$emit('radioBtnGroupChange',val)
					},
					change: this.change
				}
			},
			radioButtons
		)
	}
})