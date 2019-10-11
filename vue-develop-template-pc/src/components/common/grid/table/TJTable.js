/**
 * 饿了么 Table表格组件
 */
import tjColumn from '../column'
import {userError,isFunction,clearJsonObject,isNotEmpty} from '../../helper/tools'

TjUI.ns('TjUI.grid.table')
TjUI.grid.table.Table = TjUI.extend(js.base.fn,{
    inject: ['getPanel'],
    components: {
        tjColumn,
    },
    props:{
        //访问的后台地址
		conurl: {
            type: String,
            default: ''
			//required: true
		},
		//初始化查询参数
		queryParams: {
			type: Object,
			default: ()=> ({})
		},
        //是否显示表头
        showHeader: {
            type: Boolean,
            default: true
        },
        //列的宽度是否自撑开 false需要列提供width属性
        fit: {
            type: Boolean,
            default: true
        },
        //选择模式multi,simple；默认为多选simple
		selMode: {
			type: String,
			default: 'multi'
		},
        //是否显示index下标列
        isShowIndex: {
            type: Boolean,
            default: true
        },
        //默认选择第一行
        isSelectFirstRow: {
            type: Boolean,
            default: true
        },
        //tj-grid指针 ref属性
        userRef: {
            type: String,
            default: `table-${Math.ceil(Math.random()*100)}`
        },
        //表格列属性
		columns: {
			type: Array,
			default: ()=> []
        },
        /* //分页数据条数
        pageSize: {
            type: Number,
            default: 30
        },
        //当前页码
        page: {
            type: Number,
            default: 1
        }, */
        //Table 的尺寸
        size: {
            type: String,
            default: 'small'
        },
        // 过滤返回数据（该函数带一个参数'data'用来指向源数据）
        loadFilter: {
            type: Function
        },
        //自定义table数据加载函数
        userLoadStore: {
            type: Function
        },
        tableLink: {
            type: String,
            default: ''
        },
        //第一次载入时是否自动刷新列表数据
        isReloadGrid: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            you: 'table',
            //loading 加载
            loading: null,
            curQueryParams: {...this.queryParams},
            //本地列
            currentColumns: [...this.columns],
            //数据源
            tableData: [],
        }
    },
    computed: {
        curPageSize(){
            return this.getPanel.page_size
        },
        curPage(){
            return this.getPanel.page_page
        }
    },
    watch: {
        //监测数据源
        tableData(val, oldVal){
            if(this.loading === null){
                //数据加载完成
                this.getPanel.afterDataLoad(this.$refs[this.userRef])
                return
            }
            this.loading.close()
            if(this.isSelectFirstRow && val.length){
                setTimeout(() => {
                    this.$refs[this.userRef].setCurrentRow(this.tableData[0])
                    /* if(this.selMode==='multi'){
                        this.$refs[this.userRef].toggleRowSelection(this.tableData[0]);
                    } */
                    //默认触发row-click
                    this.getPanel.rowClick(this.tableData[0])
                }, 0);
            }
            //数据加载完成
            this.getPanel.afterDataLoad(this.$refs[this.userRef])
        }
    },
    mounted(){
        this.$nextTick(this.init)
    },
    methods: {
        loadStore(curConurl = ''){
            /* setTimeout(() => {
                this.tableData = [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                    flag: 1,
                    flagName: 1,
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    flag: 10,
                    flagName: 10,
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    flag: 256,
                    flagName: 256,
                    },{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    flag: 384,
                    flagName: 384,
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    flag: 1,
                    flagName: 1,
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    flag: 1,
                    flagName: 1,
                    },{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    flag: 128,
                    flagName: 128,
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    flag: 128,
                    flagName: 128,
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    flag: 128,
                    flagName: 128,
                    },{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    flag: 10,
                    flagName: 10,
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    flag: 1,
                    flagName: 1,
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    flag: 128,
                    flagName: 128,
                    },{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    flag: 256,
                    flagName: 256,
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    flag: 10,
                    flagName: 10,
                    }, {
                    date: '2016-05-21',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    flag: 1,
                    flagName: 1,
                    },
                ]
            }, 2000); */
            let queryConurl = isNotEmpty(curConurl) ? curConurl : this.conurl;
            if(this.$api[queryConurl] != void(0) && isNotEmpty(queryConurl)){
                this.loadMask()
                if(this.userLoadStore!==null){
                    //注意函数作用域
                    this.userLoadStore(this)
                    return
                }
                this.$api[queryConurl](this.initQueryParams()).then(resData => {
                    // let responseData = (resData.data.content).filter(dataRow => !!dataRow)
                    // resData.data.content = responseData
                    let result = isFunction(this.loadFilter) ? this.loadFilter(resData).data.content : resData.data.content;
                    ('totalElements' in resData.data) ? this.getPanel.setTotal(resData['data']['totalElements']) : this.getPanel.setTotal(150)
                    this.tableData = result
                }).catch( error =>{
                    this.loading.close()
                    throw new userError(error)
                })
            }else{
                if(!!this.loadFilter && isFunction(this.loadFilter)){
                    this.loadMask()
                    let result = this.loadFilter()
                    this.getPanel.setTotal(result['data']['totalElements'])
                    this.tableData = result.data.content
                    return
                }
                this.total = 0
                this.tableData = []
                throw new userError("grid conurl is undefined")
            }
        },
        //初始化查询参数
		initQueryParams(){
            // let page = {'page_page': (this.curPage-1)*this.curPageSize,'page_size': this.curPageSize}
            let page = {'page_page': (this.curPage-1),'page_size': this.curPageSize}
			return Object.assign(this.curQueryParams,page)
		},
		//设置查询参数
		setQueryParams(params={}){
			if(!!params){
                clearJsonObject(this.curQueryParams)
                Object.assign(this.curQueryParams,params)
			}
        },
        //设置行选中 (用于多选表格)
        toggleSelection(rows){
            if (rows) {
                this.clearSelection()
                setTimeout(() => {
                    rows.forEach(row => {
                        let index = this.tableData.findIndex(selectRow=>{
                            return JSON.stringify(selectRow) === JSON.stringify(row)
                        })
                        if(index !== -1){
                            this.$refs[this.userRef].toggleRowSelection(this.tableData[index]);
                        }
                    });
                }, 0);
            }
        },
        //用于多选表格，清空用户的选择
        clearSelection(){
            this.$refs[this.userRef].clearSelection()
        },
        //获取数据源
        getStore(){
            return this.tableData
        },
        //显示加载中遮罩
        loadMask(){
            this.loading = this.$loading({
                lock: true,
                target: this.$el
            });
        },
        init(){
            this.isReloadGrid && this.loadStore()
        }
    },
    render(h){
        //构建列
        let tableColumns = []
        this.currentColumns.forEach((column) => {
            if(column.hasOwnProperty('columns')){
                //多表头
                tableColumns.push(h('el-table-column',{props: {label: column['label']}},column['columns'].map(c=>h('tjColumn',{props: c}))))
                return
            }
            tableColumns.push(h('tjColumn',{props: column}))
        });
        //添加下标列
        (this.isShowIndex) && tableColumns.unshift(h('el-table-column',{style:{width: '80px'},props: {type: 'index'}}));
        //添加复选框列
        (this.selMode === 'multi') && tableColumns.unshift(h('el-table-column',{style: {width: '50px'},props: {type: 'selection'}}))
        return h(
                    'el-table',
                    {
                        style: {
                            //height: '100%'
                        },
                        props: {
                            data: this.tableData,   //显示的数据    array
                            stripe: true,           //是否为斑马纹table boolean 默认true
                            border: true,           //竖直方向的边框 boolean 默认true
                            height: '100%',         //String类型height值会转换为style的height
                            fit: this.fit,          //列的宽度是否自撑开 boolean 默认true
                            'show-header': this.showHeader, //是否显示表头 boolean 默认true
                            'highlight-current-row': true,  //是否要高亮当前行 boolean 默认true
                            size: this.size,        //Table 的尺寸
                        },
                        on: {
                            'row-click': (row, event, column)=>{
                                this.getPanel.rowClick(row, event, column)
                            },
                            'row-dblclick': (row, event)=>{
                                this.getPanel.rowDblclick(row, event)
                            },
                            'row-contextmenu': (row, event)=>{
                                this.getPanel.rowContextmenu(row, event)
                                event.preventDefault();
                            },
                            'selection-change': (selection)=>{
                                this.getPanel.selectionChange(selection)
                            },
                            'select': (selection, row)=>{
                                this.getPanel.selectRow(selection, row)
                            },
                            'select-all': (selection)=>{
                                this.getPanel.selectAll(selection)
                            }
                        },
                        ref: this.userRef
                    },
                    tableColumns
                )
    }
})