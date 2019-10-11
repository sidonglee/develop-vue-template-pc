/**
 * sys-module 系统模块 grid列表容器panel
 */
import mainGridPanel from './main-grid'
import tabGrid from './tabs'

const Grid = {
    extends: new TjUI.panel.Panel,
    props: {
        gridDefaults: {
            type: Object,
            default(){
                return {}
            }
        },
        tabHeight: {
            type: Number,
            default: 250
        },
        tabs: {
            type: Array,
            default(){
                return []
            }
        }
    },
	data(){
		return {
            layout: 'border',
		}
	},
	mounted(){
        this.initPanel()
    },
    updated(){
        //主grid和tab面板渲染结束只触发一次，通知面板执行相应操作
        this.$nextTick(() => {
            if(this.gridDefaults.hasOwnProperty('isReloadGrid') && !this.gridDefaults.isReloadGrid){
                return;
            }
            this.childs[0].reloadGrid()
        })
    },
	methods: {
		initPanel(){
			let mainGrid = {
                component: mainGridPanel,
                props: {
                    mainPanel: this,
                    gridDefaults: this.gridDefaults,
                },
                slot: 'center',
                style: {
                    'background-color': 'green',
                }
            }
            if(this.tabs.length){
                let tabsPanel = {
                    component: tabGrid,
                    props: {
                        mainPanel: this,
                        tabHeight: this.tabHeight,
                        tabs: this.tabs,
                    },
                    slot: 'south',
                    style: {
                        height: `100%`
                    }
                }
                this.add([mainGrid,tabsPanel])
                return
            }
            this.add(mainGrid)
		}
	}
}
export default Grid