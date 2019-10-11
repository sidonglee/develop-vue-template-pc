/**
 * 饿了么 百度地图组件
 * <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=nSxiPohfziUaCuONe4ViUP2N"></script>
 */
import { strHavestr,get,isEmptyObject,isNotEmpty,applyIf } from '../../../helper/tools'
import './map.css'

TjUI.ns('TjUI.panel.ux')
TjUI.panel.ux.TJMap = TjUI.extend(js.base.fn,{
	data(){
		return {
			id: `baidu-map-${this._uid}`,	//html attribute
			map: null,		//地图对象，全局公用
			initPoint: {},	//初始坐标 {x: '116.404',y: '39.915'}
			initZoom: 12,	//初始化层级
			city: '杭州',	//初始化城市
			//初始化参数
			mapOptions: {
				minZoom: 7,
				maxZoom: 19,
				mapType: BMAP_NORMAL_MAP,
				enableMapClick: false,	//是否开启底图可点功能(可以禁止弹出百度自己的信息窗口)
			},
			//地图配置项
			mapConfig: ['enableScrollWheelZoom','disableDoubleClickZoom'],
			//地图默认控件 不支持自定义控件默认配置
			mapControl: {
				ScaleControl: {anchor: BMAP_ANCHOR_BOTTOM_LEFT},	//比例尺
				NavigationControl: {anchor: BMAP_ANCHOR_TOP_LEFT,type: BMAP_NAVIGATION_CONTROL_SMALL},		//地图的平移缩放控件
				MapTypeControl: {anchor: BMAP_ANCHOR_TOP_RIGHT,mapTypes:[BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}	//地图类型
				//...
			},
			//地图事件
			events: {
				load: 'load',
				tilesloaded: 'tilesloaded',
				zoomend: 'zoomend',
				moveend: 'moveend',
				click: 'click',
				rightclick: 'rightclick',
			},
			//http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b0
			get: {
				getBounds: ()=>{
					//返回地图可视区域，以地理坐标表示
					return this.map.getBounds()
				},
				getCenter: ()=>{
					//返回地图当前中心点
					return this.map.getCenter()
				},
				getDistance: (start, end)=>{
					//返回两点之间的距离，单位是米
					return this.map.getDistance(start, end)
				},
				getMapType: ()=>{
					//返回地图类型
					return this.map.getMapType()
				},
				getSize: ()=>{
					//返回地图视图的大小，以像素表示
					return this.map.getSize()
				},
				getViewport: (view = [])=>{
					//根据提供的地理区域或坐标获得最佳的地图视野 view: Array<Point>
					return this.map.getViewport(view)
				},
				//返回地图当前缩放级别
				getZoom: ()=>{
					return this.map.getZoom()
				},
				//返回地图上的所有覆盖物
				getOverlays: ()=>{
					return this.getOverlays()
				},
				//返回覆盖物所在的map对象
				getMap: ()=>{
					return this.map.getMap()
				},
				//返回地图默认的鼠标指针样式
				getDefaultCursor: ()=>{
					return this.map.getDefaultCursor()
				},
			},
			set: {
				setCenter: (point)=>{
					//设置地图中心点 point 可以是 {}也可以是String
					this.map.setCenter(point)
				},
				//设置地图城市
				setCurrentCity: (city)=>{
					this.map.setCurrentCity(city)
				},
				//设置地图类型。
				//注意，当设置地图类型为BMAP_PERSPECTIVE_MAP时，需要调用map.setCurrentCity方法设置城市
				setMapType: (mapType)=>{
					this.map.setMapType(mapType)
				},
				//根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地理区域或坐标
				//view: Array<Point> | Viewport
				setViewport: (view)=>{
					this.map.setViewport(view)
				},
				//将视图切换到指定的缩放等级，中心点坐标不变
				setZoom: (zoom)=>{
					this.map.setZoom(zoom)
				},
				//设置拖拽地图时的鼠标指针样式。
				setDraggingCursor: (cursor = '')=>{
					this.map.setDraggingCursor(cursor)
				},
				//设置地图允许的最小级别。
				setMinZoom: (zoom = 7)=>{
					return this.map.setMinZoom(zoom)
				},
				//设置地图允许的最大级别。
				setMaxZoom: (zoom = 19)=>{
					this.map.setMaxZoom(zoom)
				}
			},
			util: {
				//操作地图的函数
				map: {
					//将地图的中心点更改为给定的点
					panTo: (point)=>{
						this.map.panTo(point)
					},
					//重新设置地图，恢复地图初始化时的中心点和级别
					reset: ()=>{
						this.map.reset()
					},
					//放大一级视图
					zoomIn: ()=>{
						this.map.zoomIn()
					},
					//缩小一级视图
					zoomOut: ()=>{
						this.map.zoomOut()
					},
					//将控件添加到地图上
					addControl: (control)=>{
						return this.map.addControl(control)
					},
					//将控件从地图上移除
					removeControl(control){
						return this.map.removeControl(control)
					},
					//添加右键菜单txtMenuItem: [{text:'放大',callback:function(){}}]
					addContextMenu: (txtMenuItem = [])=>{
						let menu = new BMap.ContextMenu();
						for(let i=0; i < txtMenuItem.length; i++){
							menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
						}
						this.map.addContextMenu(menu)
					},
					//移除右键菜单
					removeContextMenu: (menu)=>{
						this.map.removeContextMenu(menu)
					},
				},
				//地理坐标点
				point: {
					//判断坐标点是否相等，当且仅当两点的经度和纬度均相等时返回true
					equals: (point1,point2 = {x:'', y:''})=>{
						return point1.equals(point2)
					}
				},
				//地理坐标的矩形区域
				bounds: {
					//当且仅当此矩形中的两点参数都等于其他矩形的两点参数时，返回true
					equals: (bounds1,bounds2)=>{
						return bounds1.equals(bounds2)
					},
					//如果点的地理坐标位于此矩形内，则返回true
					containsPoint: (bounds, point)=>{
						return bounds.containsPoint(point)
					},
					//计算与另一矩形的交集区域
					intersects: (bounds1, bounds2)=>{
						return bounds1.intersects(bounds2)
					},
					//返回矩形的中心点
					getCenter: (bounds)=>{
						return bounds.getCenter()
					},
					//返回矩形区域的西南角
					getSouthWest: (bounds)=>{
						return bounds.getSouthWest()
					},
					//返回矩形区域的东北角
					getNorthEast: (bounds)=>{
						return bounds.getNorthEast()
					},
				},
				//地图覆盖物 (标注点、覆盖物等)
				overlay: {
					//判断覆盖物是否可见
					isVisible: (overlay)=>{
						return overlay.isVisible()
					},
					//显示覆盖物
					show: (overlay)=>{
						overlay.show()
					},
					//隐藏覆盖物
					hide: (overlay)=>{
						overlay.hide()
					},
					//将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
					addOverlay: (overlay)=>{
						this.map.addOverlay()
					},
					//从地图中移除覆盖物
					removeOverlay: (overlay)=>{
						this.map.removeOverlay(overlay)
					},
					//清除地图上所有覆盖物
					clearOverlays: ()=>{
						this.map.clearOverlays()
					}
				},
				//图像标注
				marker: {
					//设置标注所用的图标对象，初始化marker时可以通过opts{icon: 'url'}设置初始图标
					setIcon: (marker, icon)=>{
						marker.setIcon(icon)
					},
					//设置标注的地理坐标
					setPosition: (marker ,point)=>{
						marker.setPosition(point)
					},
					//为标注添加文本标注
					setLabel: (marker, label)=>{
						marker.setLabel(label)
					},
					//设置标注的标题，当鼠标移至标注上时显示此标题
					setTitle: (marker, title)=>{
						marker.setLabel(title)
					},
					//开启标注拖拽功能
					enableDragging: (marker)=>{
						marker.enableDragging()
					},
					//关闭标注拖拽功能
					disableDragging: (marker)=>{
						marker.disableDragging()
					},
					//添加右键菜单txtMenuItem: [{text:'放大',callback:function(){}}]
					addContextMenu: (marker, txtMenuItem = [])=>{
						let menu = new BMap.ContextMenu();
						for(let i=0; i < txtMenuItem.length; i++){
							menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
						}
						marker.addContextMenu(menu)
						return menu
					},
					//移除右键菜单
					removeContextMenu: (marker, menu)=>{
						marker.removeContextMenu(menu)
					},
					//添加事件监听函数
					addEventListener: (marker, event, handler,scope)=>{
						if(!!scope){
							marker.addEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							marker.addEventListener(event,handler)
					},
					//移除事件监听函数
					removeEventListener: (marker, event, handler,scope)=>{
						if(!!scope){
							marker.removeEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							marker.removeEventListener(event,handler)
					}
				},
				//标注覆盖物所使用的图标
				icon: {
					//设置图片资源的地址
					setImageUrl: (icon, imageUrl = '')=>{
						icon.setImageUrl(imageUrl)
					},
					//设置图标可视区域的大小 size: Size
					setSize: (icon, size)=>{
						icon.setSize(size)
					},
					//设置图标的大小 offset: Size
					setImageSize: (icon, offset)=>{
						icon.setImageSize(offset)
					},
					//设置图标定位点相对于其左上角的偏移值 anchor: Size
					setAnchor: (icon, anchor)=>{
						icon.setAnchor(anchor)
					},
					//设置图片相对于可视区域的偏移值 offset: Size
					setImageOffset: (icon, offset)=>{
						icon.setImageOffset(offset)
					},
					//设置信息窗口开启位置相对于图标左上角的偏移值 anchor: Size
					setInfoWindowAnchor: (icon, anchor)=>{
						icon.setInfoWindowAnchor(anchor)
					},
				},
				//地图上的文本标注
				label: {
					//获取Label的地理坐标
					getPosition(label){
						return label.getPosition()
					},
					//设置文本标注样式，该样式将作用于文本标注的容器元素上styles: {color: 'red'...}
					setStyle: (label, styles={})=>{
						label.setStyle(styles)
					},
					//设置文本标注的内容。支持HTML
					setContent: (label, content='')=>{
						label.setContent(styles)
					},
					//设置文本标注坐标。仅当通过Map.addOverlay()方法添加的文本标注有效 position: point
					setPosition: (label, position)=>{
						label.setPosition(position)
					},
					//设置文本标注的偏移值 offset: Size
					setOffset: (label, offset)=>{
						label.setOffset(offset)
					},
					//设置文本标注的标题，当鼠标移至标注上时显示此标题
					setTitle: (label, title='')=>{
						label.setTitle(title)
					},
					//设置覆盖物的zIndex zIndex: Number
					setZIndex: (label, zIndex)=>{
						label.setZIndex(zIndex)
					},
					//设置地理坐标position: Point
					setPosition: (label, position)=>{
						label.setPosition(position)
					},
					//添加事件监听函数
					addEventListener: (label, event, handler,scope)=>{
						if(!!scope){
							label.addEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							label.addEventListener(event,handler)
					},
					//移除事件监听函数
					removeEventListener: (label, event, handler,scope)=>{
						if(!!scope){
							label.removeEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							label.removeEventListener(event,handler)
					}
				},
				//在地图上绘制(矢量)折线
				polyline: {
					//返回折线的点数组
					getPath: (polyline)=>{
						polyline.getPath()
					},
					//设置折线的点数组
					setPath: (polyline, path=[])=>{
						polyline.setPath(path)
					},
					//设置折线的颜色
					setStrokeColor: (polyline, color='blue')=>{
						polyline.setStrokeColor(color)
					},
					//设置透明度，取值范围0 - 1
					setStrokeOpacity: (polyline, opacity=0.5)=>{
						polyline.setStrokeOpacity(opacity)
					},
					//设置线的宽度，范围为大于等于1的整数
					setStrokeWeight: (polyline, weight=1)=>{
						polyline.setStrokeWeight(weight)
					},
					//设置是为实线或虚线，solid或dashed
					setStrokeStyle: (polyline, style='')=>{
						polyline.setStrokeStyle(style)
					},
					//开启编辑功能
					enableEditing: (polyline)=>{
						polyline.enableEditing()
					},
					//关闭编辑功能
					disableEditing: (polyline)=>{
						polyline.disableEditing()
					},
					//添加右键菜单txtMenuItem: [{text:'放大',callback:function(){}}]
					addContextMenu: (polyline, txtMenuItem = [])=>{
						let menu = new BMap.ContextMenu();
						for(let i=0; i < txtMenuItem.length; i++){
							menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
						}
						polyline.addContextMenu(menu)
						return menu
					},
					//移除右键菜单
					removeContextMenu: (polyline, menu)=>{
						polyline.removeContextMenu(menu)
					},
					//添加事件监听函数
					addEventListener: (polyline, event, handler,scope)=>{
						if(!!scope){
							polyline.addEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							polyline.addEventListener(event,handler)
					},
					//移除事件监听函数
					removeEventListener: (polyline, event, handler,scope)=>{
						if(!!scope){
							polyline.removeEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							polyline.removeEventListener(event,handler)
					}
				},
				//在地图上绘制(矢量)多边形覆盖物
				polygon: {
					//返回多边形的点数组
					getPath: (polygon)=>{
						polygon.getPath()
					},
					//返回覆盖物的地理区域范围
					getBounds: (polygon)=>{
						polygon.getBounds()
					},
					//设置多边形的点数组
					setPath: (polygon, path=[])=>{
						polygon.setPath(path)
					},
					//设置多边形边线的颜色
					setStrokeColor: (polygon, color='blue')=>{
						polygon.setStrokeColor(color)
					},
					//设置多边形的填充颜色
					setFillColor: (polygon, color='blue')=>{
						polygon.setFillColor(color)
					},
					//设置多边形的边线透明度，取值范围0 - 1
					setStrokeOpacity: (polygon, opacity)=>{
						polygon.setStrokeOpacity(opacity)
					},
					//设置多边形的填充透明度，取值范围0 - 1
					setFillOpacity: (polygon, opacity)=>{
						polygon.setFillOpacity(opacity)
					},
					//设置多边形边线的宽度，取值为大于等于1的整数
					setStrokeWeight: (polygon, weight)=>{
						polygon.setStrokeWeight(weight)
					},
					//设置多边形边线样式为实线或虚线，取值solid或dashed
					setStrokeStyle: (polygon, style)=>{
						polygon.setStrokeStyle(style)
					},
					//开启编辑功能
					enableEditing: (polygon)=>{
						polygon.enableEditing()
					},
					//关闭编辑功能
					disableEditing: (polygon)=>{
						polygon.disableEditing()
					},
					//添加右键菜单txtMenuItem: [{text:'放大',callback:function(){}}]
					addContextMenu: (polygon, txtMenuItem = [])=>{
						let menu = new BMap.ContextMenu();
						for(let i=0; i < txtMenuItem.length; i++){
							menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
						}
						polygon.addContextMenu(menu)
						return menu
					},
					//移除右键菜单
					removeContextMenu: (polygon, menu)=>{
						polygon.removeContextMenu(menu)
					},
					//添加事件监听函数
					addEventListener: (polygon, event, handler,scope)=>{
						if(!!scope){
							polygon.addEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							polygon.addEventListener(event,handler)
					},
					//移除事件监听函数
					removeEventListener: (polygon, event, handler,scope)=>{
						if(!!scope){
							polygon.removeEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							polygon.removeEventListener(event,handler)
					}
				},
				//海量点类 展示万级别的点，目前仅适用于html5浏览器
				pointCollection: {
					//设置要在地图上展示的点坐标集合 points: Array<Point>
					setPoints: (pointCollection, points)=>{
						pointCollection.setPoints(points)
					},
					//点的样式，包括:大小"size" styles: PointCollectionOption
					setStyles: (pointCollection, styles = {})=>{
						pointCollection.setStyles(styles)
					},
					//清除海量点
					clear: (pointCollection)=>{
						pointCollection.clear()
					},
					//添加事件监听函数
					addEventListener: (pointCollection, event, handler,scope)=>{
						if(!!scope){
							pointCollection.addEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							pointCollection.addEventListener(event,handler)
					},
					//移除事件监听函数
					removeEventListener: (pointCollection, event, handler,scope)=>{
						if(!!scope){
							pointCollection.removeEventListener(event,()=>{
								handler.call(scope)
							})
						}else
							pointCollection.removeEventListener(event,handler)
					}
				},
				//用于获取用户的地址解析
				geocoder: {
					//对指定的地址进行解析 地址定位
					getPoint: (address, callback)=>{
						const geoc = new BMap.Geocoder()
						myGeo.getPoint(address, function(point){
							if (point) {
								callback(point)
							}else{
								callback([])
							}
						}, this.city)
					},
					//对指定的坐标点进行反地址解析
					getLocation: (point, callback)=>{
						const geoc = new BMap.Geocoder()
						geoc.getLocation(point, function(rs){
							const addComp = rs.addressComponents;
							let params = {address:addComp.city +addComp.district +addComp.street +addComp.streetNumber,x:e.point.lng,y:e.point.lat};
							callback(params)
						})
					}
				},
				//用于将其他坐标系的坐标转换为百度坐标
				convertor: {
					//GPS转百度
					translate: (ggPoint, translateCallback)=>{
						const convertor = new BMap.Convertor()
						let pointArr = []
						pointArr.push(ggPoint)
						convertor.translate(pointArr, 1, 5, ()=>{
							if(data.status === 0) {
								translateCallback(data)
							}else{
								// TjUI.dialog.message('GPS转百度失败!','warning')
								translateCallback(null)
							}
						})
					}
				}
			}
		}
	},
	created(){
		this.$nextTick(this.initMap)
	},
	methods: {
		//初始化地图
		initMap(){
			/* 
				if(Array.from(get.byTagName('script')).find(b => strHavestr(b.src,'api.map.baidu.com')) === void(0)){
					TjUI.dialog.message('请先在index.html加载百度地图js插件!','warning')
					return
				}
			 */
			this.map = new BMap.Map(this.$refs[`baidu-map-${this._uid}-ref`],applyIf(this.mapOptions,{minZoom: 7,maxZoom: 19,mapType: BMAP_NORMAL_MAP,enableMapClick: true}))
			this.map.centerAndZoom(isEmptyObject(this.initPoint) ? this.city : this.createMapPoint(this.initPoint.x, this.initPoint.y), this.initZoom)
			//设置地图配置项
			for (let elem of this.mapConfig.values()) {
				this.map[elem]()
			}
			//初始化地图控件
			for (let [key, value] of Object.entries(this.mapControl)) {
				this.map.addControl(new BMap[key](value))
			}
			setTimeout(this.initMapEvent, 0)
		},
		//注册监听地图事件
		initMapEvent(){
			//初始化后触发一次 调用Map.centerAndZoom()方法时会触发此事件。这表示位置、缩放层级已经确定，但可能还在载入地图图块
			this.map.addEventListener(this.events.load,({type, target, pixel, point, zoom})=>{
				this.$emit(this.events.load,{type, target, pixel, point, zoom})
			})
			//移动地图瓦片加载完成后触发 当地图所有图块完成加载时触发此事件
			this.map.addEventListener(this.events.tilesloaded,({type, target})=>{
				this.$emit(this.events.tilesloaded,{type, target})
			})
			//地图更改缩放级别结束时触发触发此事件
			this.map.addEventListener(this.events.zoomend,({type, target})=>{
				this.$emit(this.events.zoomend,{type, target})
			})
			//地图移动结束时触发此事件
			this.map.addEventListener(this.events.moveend,({type, target})=>{
				this.$emit(this.events.moveend,{type, target})
			})
			//左键单击地图时触发此事件，双击也会触发
			this.map.addEventListener(this.events.click,({type, target, point, pixel, overlay})=>{
				this.$emit(this.events.click,{type, target, point, pixel, overlay})
			})
			//右键单击地图时触发此事件。右键双击也会触发
			this.map.addEventListener(this.events.rightclick,({type, target, point, pixel, overlay})=>{
				this.$emit(this.events.rightclick,{type, target, point, pixel, overlay})
			})
		},
		//创建一个地理坐标点point
		createMapPoint: (x='', y='')=>{
			if(!isNotEmpty(x) || !isNotEmpty(y)) return null
			return new BMap.Point(x,y)
		},
		//创建一个包含所有给定点坐标的矩形区域。
		createMapBounds: (swPoint, nePoint)=>{
			if(!isNotEmpty(swPoint) || !isNotEmpty(nePoint)) return null
			return new BMap.Bounds(swPoint, nePoint)
		},
		//创建地图上一个图像标注 opts Marker构造函数的可选参数 offset、icon、title...
		createMapMarker: (point,opts = {},event={})=>{
			return new BMap.Marker(point,opts)
		},
		//快速在地图上添加一个点实例
		addMapMarker: (point)=>{
			let marker = this.createMapMarker(point)
			this.util.overlay.addOverlay(marker)
		},
		//表示一个矩形区域的大小
		createSize: (width=0, height=0)=>{
			return new BMap.Size(width,height)
		},
		//标注覆盖物所使用的图标 size createSize()
		createIcon: (url = '', size, opts = {})=>{
			return new BMap.Icon(url, size,opts)
		},
		//地图上的文本标注
		createLabel: (content, opts={})=>{
			return new BMap.Label(content, opts)
		},
		//在地图上绘制(矢量)折线
		createPolyline: (points=[], opts={strokeColor:'blue', strokeWeight:1, strokeOpacity:0.5})=>{
			return new BMap.Polyline(points, opts)
		},
		//在地图上绘制(矢量)多边形覆盖物
		createPolygon: (points=[],opts={strokeColor:'blue', strokeWeight:1, strokeOpacity:0.5})=>{
			return new BMap.Polygon(points, opts)
		},
		//加载海量点 (展示万级别的点，目前仅适用于html5浏览器)
		createPointCollection: (points = [],opts = {size: BMAP_POINT_SIZE_SMALL,shape: BMAP_POINT_SHAPE_STAR,color: '#d340c3'})=>{
			if (document.createElement('canvas').getContext) {
				return new BMap.PointCollection(points,opts)
			}else{
				TjUI.dialog.message('请在chrome、safari、IE8+以上浏览器查看本示例','warning');
				return null
			}
		},
		//添加路况交通图层
		/**
		 * 需要在index.html中导入
		 * <link href="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css" rel="stylesheet" type="text/css" />
    		<script type="text/javascript" src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>
		 */
		addTrafficControl: (map)=>{
			let ctrl = new BMapLib.TrafficControl({
				showPanel: false //是否显示路况提示面板
			})
			map.addControl(ctrl)
			ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT)
		},
		//关键字提示输入 本地搜索的数据接口
		localSearch: (map, keyword, callback)=>{
			//关键字提示输入
			var options = {
				onSearchComplete: function(results){
					if (local.getStatus() == BMAP_STATUS_SUCCESS){
						if(results.getCurrentNumPois()>0){
							callback(results)
						}else{
							callback([])
						}
					}
				}
			}
			var local = new BMap.LocalSearch(map, options)
			local.search(keyword)
		},
		//数组坐标转换到字符坐标
		arrayToString: (points = [{lng: '',lat: ''}])=>{
			var str = ''
			for(var i=0;i<points.length;i++){
				str += points[i].lng+","+points[i].lat+";"
			}
			return str
		}
	},
	render(h){
		return h(
			'div',
			{
				attrs: {
					id: this.id
				},
				style: {
					height: '100%'
				},
			},
			[
				h('div',{style: {height: '100%'},ref: `baidu-map-${this._uid}-ref`})
			]
		)
	}
})