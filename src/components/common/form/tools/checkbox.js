/**
 * 饿了么 Checkbox 多选框组件
 * */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.Checkbox = TjUI.extend(js.base.fn,{
	inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'checkBoxValue',
        event: 'checkBoxChange'
    },
	props: {
		disabled: {
            type: Boolean,
            default: false
		},
		options: {
			type: Array,
			default(){
				return []
			}
		},
		value: {
			type: Array,
			default(){
				return []
			}
		},
		//'分隔符号'
        returnTypeSep: {
            type: String,
            default: ','
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
	mounted(){
		this.$nextTick(() => {
			this.$emit('checkBoxChange',this.vValue.join(this.returnTypeSep))
		})
	},
	watch: {
        checkBoxValue(val, oldVal){
            this.vValue = val
        }
    },
	methods: {
        //绑定值变化时触发的事件 选中的 Radio label 值
        change( val ){
            ('change' in this.listeners) && this.listeners.change(val.join(this.returnTypeSep))
            this.$emit('checkBoxChange',val.join(this.returnTypeSep))
		},
		resetting(){
			this.vValue = this.value
			this.$emit('checkBoxChange',this.vValue.join(this.returnTypeSep))
        },
    },
	render(h){
		// return h('div','饿了么 Checkbox 多选框组件')
		let checkboxes = []
		checkboxes = this.options.map(option => h('el-checkbox',{props: {label: option['value'],disabled: option['disabled']|| false}},[option['label']]))
		return h(
			'el-checkbox-group',
			{
				props: {
					value: this.vValue,
					disabled: this.disabled,
				},
				on: {
					input: (val) => {
						this.vValue = val
						this.$emit('checkBoxChange',val.join(this.returnTypeSep))
					},
					change: this.change
				}
			},
			checkboxes
		)
	}
})