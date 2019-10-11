/**
 * Viewport面板组件
 * 宽高自动充满父容器不用设置布局layout属性，只能添加一个子组件，不能设置容器组件的宽高为具体值
 * 不能添加工具栏等只是充当一个容器，简易版panel
 */
import { isNotEmpty } from '../../../helper/tools'

TjUI.ns('TjUI.panel')
TjUI.panel.Viewport = TjUI.extend(js.base.fn,{
	inheritAttrs: false,
    provide: ()=>this,
	data(){
		return {
			id: `viewport-${this._uid}`,	//Viewport组件html的id属性
			childs: [],		//直属childs组件，不包含孙子组件
			childElement: [],
			html: '',		//html标签
			border: false,	//是否显示边框
			hidden: false,	//渲染该组件为隐藏状态
			events: {
				finishRender: 'finishRender', //渲染完成
			}
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.$emit(this.events.finishRender,this)
			this.childs = this.$children
		})
	},
	methods: {
		add(panel = {}){
			if(!panel.hasOwnProperty('component') || isNotEmpty(this.html) || this.childElement.length) return
			this.childElement.push(this.$createElement(panel['component'],panel,('children' in panel) ? panel['children'] : []))
		},
		remove(){
			this.childElement.length && (this.childElement = [])
		}
	},
	render(h){
		return h(
			'div',
			{
				attrs: {
					id: this.id,
				},
				style: {
					border: this.border ? '1px solid #BEBEBF':'',
					display: this.hidden ? 'none' : 'block',
					height: '100%',
				},
				domProps: {
					innerHTML: this.html
				},
			},
			this.childElement
		)
	}
})