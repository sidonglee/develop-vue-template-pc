/**
 * 饿了么 grid列表组件
 * 默认border布局
 */
import tjPagination from './pagination'
import tjWindow from '../window'
import {isArray,apply} from '../helper/tools'
import tjMenu from '../menu'

TjUI.ns('TjUI.grid')
TjUI.grid.Grid = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.panel.Panel()
    },
    //extends: new panel.Panel(),
    //模板时由外部传入 未完善
    props: [
        //顶部工具栏
        'userTbar',
        //底部工具栏
        'userBbar',
        //查询栏
        'userSearchPanel',
        //详情页
        'userDetailPanel',
        //详情页窗口
        'userwinComponent',
        //详情页
        'userdetailPanel',
        //底部按钮栏里的按钮
        'userButtons',
    ],
    data(){
        return {
            you: 'grid',
            //复写panel参数
            baseCls: `grid-panel-${this._uid}-cls`,
            //Grid参数
            layout: 'border',   //panel布局
            searchPanel: null,  //查询栏
            winComponent: null, //详情页窗口
            detailPanel: null,  //详情页
            currentRow: {},     //当前选中行
            currentRows: [],    //当前选中行集
            menu: [],           //右键菜单栏 contextMenu
            ctxMenu: null,      //右键菜单menu
            //table参数
            tableLink: `base-table-${this._uid}`,//table表格组件link
            conurl: '',         //访问的后台地址
		    queryParams: {},    //初始化查询参数
            columns: [],        //表格列属性
            page_size: 30,      //分页数据条数
            page_page: 1,       //当前页码
            showHeader: true,   //是否显示表头
            fit: true,          //列的宽度是否自撑开 false需要列提供width属性
            selMode: 'multi',   //选择模式multi,simple；默认为多选simple
            isShowIndex: true,  //是否显示index下标列
            isSelectFirstRow: true, //默认选择第一行
            loadFilter: null,   //过滤返回数据
            size: 'small',      //Table 的尺寸
            userLoadStore: null,//自定义table数据加载函数
            isReloadGrid: true, //第一次载入时是否自动刷新列表数据
            //pagination参数
            paginationLink: `base-pagination-${this._uid}`,//分页组件link
            isPagination: true, //分页工具栏 显示/隐藏
            pagingItems: [],    //分页栏右侧自定义插件 [{text: '同步',listeners: {click: ()=>{}}}]
			total: 0,           //查询的总数量
            pageSizeOpts: [30,50,70,200], //分页数据可选page条数
            isShowPageSizes: true,        //是否显示分页数量选择器
            //事件
            events: {
                'afterDataLoad': 'afterDataLoad',   //数据加载完成之后
                'rowClick': 'rowClick'              //行点击事件 
            }
        }
    },
    mounted(){
        this.registerEvents()
        this.initToolBar()
        this.createGrid()
    },
    beforeDestroy(){
        if(this.ctxMenu!=null){
            this.ctxMenu = null
        }
    },
    methods: {
        //生成工具栏
        initToolBar(){
            //搜索栏
            (this.searchPanel !== null) && this.addTbar({component: this.searchPanel})
            //顶部工具栏
            if(isArray(this.tbar)){
                this.tbar.forEach(tbar => {
                    this.addTbar({component: tbar})
                });
            }else{
                (this.tbar !== null) && this.addTbar({component: this.tbar})
            }
            //底部工具栏
            if(isArray(this.bbar)){
                this.bbar.forEach(bbar => {
                    this.addBbar({component: bbar})
                });
            }else{
                (this.bbar !== null) && this.addBbar({component: this.bbar})
            }
        },
        //生成主Grid
        createGrid(){
            let table = {
                component: new TjUI.grid.table.Table(),
                props: {
                    link: this.tableLink,
                    ...this.$data
                },
                slot: 'center',
            }
            this.add(table)
            if(this.isPagination){
                let pagination = {
                    component: tjPagination,
                    props: {
                        link: this.paginationLink,
                        ...this.$data
                    },
                    on: {
                        'size-change': (pageSize)=>{
                            //pageSize 改变时会触发
                            this.page_size = pageSize
                            if(this.page_page === 1 || (this.page_page*pageSize <= this.total)){
                                this.loadGrid()   //当前页数有效
                                return
                            }
                            this.page_page = 1
                        },
                        'current-change': (page)=>{
                            //currentPage 改变时会触发
                            this.page_page = page
                            this.loadGrid()
                        }
                    },
                    style: {
                        height: '32px'
                    },
                    slot: 'south',
                }
                this.add(pagination)
            }
        },
        //通过total总数据条数设置Grid总页数
        setTotal(total){
            this.total = total
        },
        //获取查询总数
        getTotal(){
            return this.total
        },
        //注册事件
        registerEvents(){
            this.$on('finishRender',()=>{
                //console.info('渲染结束');
            })
            this.$on('updateRender',()=>{
                //console.info('节点更新结束');
            })
        },
        //设置查询参数
        setQueryParams(params = {}){
            this.getLinkComponent(this.tableLink).setQueryParams(params)
        },
        /**
         * @param {*} curConurl 指定刷新的curConurl地址,只对本次查询有效,不会覆盖grid中的conurl
         */
		reloadGrid(curConurl = ''){
            this.page_page = 1
            this.$emit('update:current_page', 1)
            this.$nextTick( () => {
                !!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore(curConurl)
            })
        },
        //刷新grid 保留在当前页
        loadGrid(){
            !!this.getLinkComponent(this.tableLink) && this.getLinkComponent(this.tableLink).loadStore()
        },
        clearGrid(){
            this.total = 0
            this.getLinkComponent(this.tableLink).tableData = []
        },
        //设置行选中 (用于多选表格)
        toggleSelection(rows){
            this.getLinkComponent(this.tableLink).toggleSelection(rows)
        },
        //用于多选表格，清空用户的选择
        clearSelection(){
            this.getLinkComponent(this.tableLink).clearSelection()
        },
        //获取当前选中行
        getSelectedRow(){
            return this.currentRow
        },
        //获取当前选中行集
        getSelectedRows(){
            return this.currentRows
        },
        //通过字段获取对应的value
        getFieldValue(field){
            return this.currentRow[field]
        },
        //返回Grid的Data store
        getStore(){
            return this.getLinkComponent(this.tableLink).getStore()
        },
        //数据加载完成
        afterDataLoad(table){
            // console.info('数据加载完成');
            if(!this.getTotal()){
                this.currentRow = {}
                this.currentRows = []
            }
        },
        //row行单机
        rowClick(row, event, column){
            if(this.ctxMenu != null){
                this.ctxMenu.removeMenuNode()
                setTimeout(() => {
                    this.ctxMenu = null
                }, 0);
            }
            apply(this.currentRow,row)
            this.$emit(this.events.rowClick,this.currentRow)
        },
        //row行双击
        rowDblclick(row, event){
            if(!!this.detailPanel){
                let width = ('width' in this.detailPanel)?this.detailPanel.width:this.detailPanel.extends.width
                let height = ('height' in this.detailPanel)?this.detailPanel.height:this.detailPanel.extends.height
                let title = ('title' in this.detailPanel)?this.detailPanel.title:this.detailPanel.extends.title
                let detailWin = new tjWindow({panel: this,mainGrid: this,title: title||'详情',height: height,width: width})
                detailWin.add(this.detailPanel)
                detailWin.show()
            }
        },
        //行右键事件
        rowContextmenu(row, event){
            event.preventDefault()
            event.stopPropagation()
            if(!this.menu.length) return;
            //添加右键菜单menu
            if(this.ctxMenu==null){
                this.ctxMenu = new tjMenu()
            }
            this.ctxMenu.add(this.menu)
            this.ctxMenu.showAt(event.pageX,event.pageY)
        },
        selectionChange(selection){
            this.currentRows.splice(0,this.currentRows.length,...selection)
        },
        selectRow(selection, row){},
        selectAll(selection){}
    }
})