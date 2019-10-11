/**
 * 饿了么 label 普通文本标签组件
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.Label = TjUI.extend(js.base.fn,{
	props: {
		labelStyle: {
			type: Object,
			default(){
				return {color: '#3F3F46','font-size': '12px'}
			}
		},
		labelClass: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		//可以接收html标签
		html: {
			type: String,
			default: ''
		},
		//是否渲染节点 v-if
		isRender: {
			type: Boolean,
			default: true,
		},
		listeners: {
			type: Object,
			default(){
				return {}
			}
		}
	},
	computed: {
		showHtml(){
			if(this.html.length){
				return this.html
			}
			return this.value
		}
	},
	methods: {
		clickHandler(event){
			('click' in this.listeners) && (this.listeners.click(event));
		}
	},
	render(h){
		if(!this.isRender){
            return h(null)
        }else{
			return h(
				'span',
				{
					style: this.labelStyle,
					class: this.labelClass,
					domProps: {
						innerHTML: this.showHtml
					},
					on: {
						click: this.clickHandler
					},
				}
			)
		}
	}
})