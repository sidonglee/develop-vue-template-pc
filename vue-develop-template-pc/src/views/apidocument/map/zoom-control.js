/**
 * 自定义控件
 */
const zoomControl = {
	defaultAnchor: BMAP_ANCHOR_BOTTOM_RIGHT,	//控件默认的停靠位置
	defaultOffset: new BMap.Size(10, 10),		//控件默认的位置偏移值
	//会自动调用draw
	draw(tjMap, map){
		var div = document.createElement("div");
		// 添加文字说明
		div.appendChild(document.createTextNode("放大2级"));
		// 设置样式
		div.style.cursor = "pointer";
		div.style.border = "1px solid gray";
		div.style.backgroundColor = "white";
		// 绑定事件,点击一次放大两级
		div.onclick = function(e){
			// map.setZoom(map.getZoom() + 2);
			tjMap.set.setZoom(tjMap.get.getZoom()+2)
		}
		// 将DOM元素返回
		return div
	}
}
export default zoomControl