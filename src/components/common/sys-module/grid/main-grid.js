/**
 * 主grid
 */
import {apply} from '../../helper/tools'

export default {
	extends: new TjUI.grid.Grid,
	props: {
		mainPanel: {
			type: Object,
			default(){
				return null
			}
		},
		gridDefaults: {
            type: Object,
            default(){
                return {}
            }
        }
	},
	data(){
		return {
			...this.gridDefaults,
			isReloadGrid: false,
		}
	},
	methods: {
		//数据加载完成
        afterDataLoad(table){
            if(!this.getTotal()){
                this.currentRow = {}
				this.currentRows = []
				if(this.mainPanel.childs[1] !== void(0)){
					this.mainPanel.childs[1].$emit(this.mainPanel.childs[1].events.tabGridReload,this.currentRow)
				}
			}
        },
		//重写 row行单机
        rowClick(row, event, column){
            if(this.ctxMenu != null){
                this.ctxMenu.removeMenuNode()
                setTimeout(() => {
                    this.ctxMenu = null
                }, 0);
            }
            apply(this.currentRow,row)
			this.$emit(this.events.rowClick,this.currentRow)
			//触发事件，刷新tabs中当前打开的可视子组件
			if(this.mainPanel.childs[1] !== void(0)){
				this.mainPanel.childs[1].$emit(this.mainPanel.childs[1].events.tabGridReload,this.currentRow)
			}
		},
	}
}