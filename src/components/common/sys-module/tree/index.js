/**
 * sys-module 系统模块 Tree 树形控件容器panel
 */
const Tree = TjUI.extend(js.base.fn,{
	initComponent(){
        this['extends'] = new TjUI.tree.TJtree
    },
	data(){
		return {}
	},
})
export default Tree