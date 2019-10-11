/**
 * 系统模块
 * 主从Grid
 * tabs中的子组件如果是默认 grid列表组件，如果需要和主grid的选中行相关联则必须设置 ‘queryField’
 */
import gridModule from './grid'
import treeModule from './tree'

TjUI.ns('TjUI.sysModule')
TjUI.sysModule.SysModule = TjUI.extend(js.base.fn,{
    extends: new TjUI.panel.Panel,
    props: {
        userIsShowTree: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            layout: 'border',
            isShowTree: true,   //是否需要显示tree面板
            treeWidth: 260,     //tree组件面板的宽度值 Number
            tabHeight: 300,     //tab模块面板的高度 Number
            treeReloadGridField: 'name',  //tree选中节点刷新主Grid时传递的参数value的key
            treeDefaults: {
                /* conurl: 'user/readRoleMenus',
                queryParams: {
                    syscode: 'oa',
                    token: '48d1541b-45ae-4fb1-841a-0d26aaed4c00',
                }, */
            },   //tree默认可扩展参数 详细参数参考tree组件
            gridDefaults: {
                /* conurl: 'job/pass/readPage',
                queryParams: {
                    token: '48d1541b-45ae-4fb1-841a-0d26aaed4c00'
                },
                selMode: 'simple',
                columns: [
                    {label:'流程ID',field:'id'},
                    {label:'流程名称',field: 'name'},
                ], */
            },   //主grid默认可扩展参数 详细参数参考grid组件
        }
    },
    created(){
        //面板上的所有组件渲染结束只触发一次，但不包括数据都加载完毕
        this.$on(this.events.finishRender,()=>{})
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        //重写initTabs方法，设置tab选项卡中的组件
        initTabs(){
            let tabs = []
            /*
            例子 
            tabs.push(
                {
                    title: '番茄',
                    queryField: 'name',     //必须 子组件用于获取主grid选中行的value对应的key
                    defaults: {
                        conurl: 'job/begin/readPage',
                        queryParams: {
                            token: '48d1541b-45ae-4fb1-841a-0d26aaed4c00'
                        },
                        selMode: 'simple',
                        columns: [
                            {label:'流程ID',field:'id'},
                            {label:'流程名称',field: 'name'},
                            {label:'发起人',field:'ownername'},
                        ]
                    }
                },
                {
                    title: '苹果',
                    queryField: 'processkey',
                    defaults: {
                        conurl: 'job/my/readPage',
                        queryParams: {
                            token: '48d1541b-45ae-4fb1-841a-0d26aaed4c00'
                        },
                        selMode: 'simple',
                        columns: [
                            {label:'流程ID',field:'id'},
                            {label:'流程名称',field: 'name'},
                        ],
                    }
                },
                {
                    title: '香蕉',
                    component: abcPanel,    //外部自定义组件
                    defaults: {
                        userHtml: '香蕉'
                    }
                }
            ) */
            return tabs
        },
        initPanel(){
            let gridPanel = {
                component: gridModule,
                props: {
                    gridDefaults: this.gridDefaults,
                    tabHeight: this.tabHeight,
                    tabs: this.initTabs(),
                },
                slot: 'center',
            }
            if(this.isShowTree){
                let treePanel = {
                    component: new treeModule,
                    props: {
                        listeners: {
                            nodeClick: (record, node)=>{
                                if(!record.hasOwnProperty('node')) return
                                let reloadGridValue = record.node[this.treeReloadGridField]
                                this.childs[1].childs[0].setQueryParams({...this.childs[1].childs[0].queryParams,[this.treeReloadGridField]: reloadGridValue})
                                this.childs[1].childs[0].reloadGrid()
                            },
                        },
                        ...this.treeDefaults,
                    },
                    slot: 'west',
                    style: {
                        width: `${this.treeWidth}px`
                    }
                }
                this.add(treePanel)
            }
            this.add(gridPanel)
        },
        //获取tree组件的面板对象vNode
        getTree(){
            if(!this.isShowTree){
                return null
            }
            return this.childs[0]
        },
        //获取主grid组件的面板对象vNode
        getMainGrid(){
            if(!this.isShowTree){
                return this.childs[0].childs[0]
            }
            return this.childs[1].childs[0]
        },
        //获取tabs vNode
        getTabs(){
            if(this.childs[1].childs[1] === void(0)){
                return []
            }
            return this.childs[1].childs[1].$children[0].$children[0].$children.filter((tab, index) => index!==0)
        }
    }
})