/**
 * 
 */
import tjTabs from '../../tabs'
import { isFunction,isEmptyObject } from '../../helper/tools'

export default {
	components: {
        tjTabs
	},
	provide() {
        return {
            getPanel: this
        }
    },
	props: {
		mainPanel: {
			type: Object,
			default(){
				return null
			}
		},
		tabs: {
			type: Array,
            default(){
                return []
            }
		},
		tabHeight: {
            type: Number,
            default: 250
        },
	},
	data(){
		return {
			tabPanelCls: `sys-module-tabpanel-cls-${this._uid}`,
			events: {
				tabGridReload: 'tabGridReload'
			}
		}
	},
	created(){
		this.$on(this.events.tabGridReload,this.doHandle)
	},
	mounted(){
		setTimeout(this.initTabs, 0)
	},
	methods: {
		initTabs(){
			let _this = this
			this.tabs.forEach(function (element, index){
				let grid = null
				if(!element.hasOwnProperty('component')){
					grid = TjUI.extend(js.base.fn,{
						extends: new TjUI.grid.Grid,
						props: {..._this.props},
						queryField: element['queryField'],	//grid列表查询参数字段，会去主grid的选中行中获取queryField对应的value值 ‘row[queryField]’
						mainGridRow: null,					//主grid的选中行
						data(){
							return {
								...element.defaults,
								isReloadGrid: false,
							}
						},
						beforeCreate(){
							//监听组件在tab中是否渲染结束
							this.$on(_this.$refs['tab-content'].events.component['tab-component-finishRender'],(component)=>{
								this.$on('handleReload',(row)=>{
									setTimeout(() => {
										this.mainGridRow = row;
										if(!isEmptyObject(row)){
											component.setQueryParams({...component.queryParams,[element['queryParamName']]: row[component.$options['queryField']]})
											component.reloadGrid()
										}else{
											component.clearGrid()
										}
									}, 0)
								})
							})
							this.$on(_this.$refs['tab-content'].events.component['tab-component-activated'],(component)=>{
								let mainGrid = _this.mainPanel.childs[0]
								this.mainGridRow = mainGrid.currentRow;
								if(mainGrid.getTotal() && mainGrid.isSelectFirstRow){
									let queryFieldValue = mainGrid.getStore()[0][component.$options['queryField']]
									if(!isEmptyObject(mainGrid.currentRow)){
										queryFieldValue = mainGrid.currentRow[component.$options['queryField']]
									}
									component.setQueryParams({...component.queryParams,[element['queryParamName']]: queryFieldValue})
									component.reloadGrid()
								}
							})
						}
					})
				}
				if(element.hasOwnProperty('component') && typeof element.component === 'object'){
					element.component.defaults = {...element.defaults}
					element.component.beforeCreate = function(){
						this.$on(_this.$refs['tab-content'].events.component['tab-component-finishRender'],(component)=>{
							this.$on('handleReload',()=>{
								let mainGrid = _this.mainPanel.childs[0]
								let row = null
								if(mainGrid.getTotal() && mainGrid.isSelectFirstRow){
									row = mainGrid.getStore()[0]
									if(!isEmptyObject(mainGrid.currentRow)){
										row = mainGrid.currentRow
									}
								}
								this.reloadTabModule(row)
							})
						})
						this.$on(_this.$refs['tab-content'].events.component['tab-component-activated'],(component)=>{
							let mainGrid = _this.mainPanel.childs[0]
							let row = null
							if(mainGrid.getTotal() && mainGrid.isSelectFirstRow){
								row = mainGrid.getStore()[0]
								if(!isEmptyObject(mainGrid.currentRow)){
									row = mainGrid.currentRow
								}
							}
							this.reloadTabModule(row)
						})
					}
					grid = TjUI.extend(js.base.fn,element.component)
				}
				_this.$refs['tab-content'].addTab({title: element.title,name: `tabgrid-${index}-${_this._uid}`},new grid())
			})
		},
		doHandle(row){
			this.$refs['tab-content'].getOpenTab().$emit('handleReload',row)
		}
	},
	render(h){
        return h(
            'div',
            {
                style: {
					padding: '0px',
					height: `${this.tabHeight}px`,
					'box-sizing': 'border-box',
					'overflow-y': 'auto',
                },
            },
            [
                h(
                    'tj-tabs',
                    {
						class: this.tabPanelCls,
						style: {
							height: `${this.tabHeight-41}px`
						},
                        props: {
                            type: 'card',
                            isHome: false,
							closable: false,
							isLinkActiveTab: false,
                        },
                        ref: 'tab-content'
                    }
                )
            ]
        )
    }
}