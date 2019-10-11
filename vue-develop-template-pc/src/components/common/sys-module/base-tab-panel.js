/**
 * tab选项卡面板中子组件的基组件panel
 * 如果tabs选项卡中的子组件不是默认Grid列表组件，自定义的组件需要extends继承或mixins混入base-tab-panel组件
 */
export default {
	methods: {
		reloadTabModule(row={}){
			//主Grid选中后通知当前面板（返回主Grid当前的选中行），继承实现方法用于扩展
		}
	}
}