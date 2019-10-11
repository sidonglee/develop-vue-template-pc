/**
 * 自定义控件基类
 * 自定义控件需要继承/混入 user-base-control.js 对象
 */
import { strHavestr,get } from '../../../helper/tools'

const control = function({defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT,defaultOffset = new BMap.Size(10, 10),draw = null},tjMap=null){
	//控件默认的停靠位置
	//this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT
	//控件默认的位置偏移值
	//this.defaultOffset = new BMap.Size(10, 10)
	this.initialize = function(map){
		this.defaultAnchor = defaultAnchor
		this.defaultOffset = defaultOffset
		let element = draw(tjMap,map)
		map.getContainer().appendChild(element)
		return element
	}
}
//判断是否载入了baidu支持
if(Array.from(get.byTagName('script')).find(b => strHavestr(b.src,'api.map.baidu.com')) !== void(0)){
	control.prototype = new BMap.Control
}

TjUI.ns('TjUI.panel.ux.map')
TjUI.panel.ux.map.userBaseControl = TjUI.extend(js.base.fn,{
	tjMap: null,	//TjMap.js封装后的地图对象 new TjUI.panel.ux.map.userBaseControl({tjMap: this})
	initialize(element = null){
		if(element === null || this.map === null) return
		this.tjMap.util.map.addControl(new control(element,this.tjMap))
	}
})