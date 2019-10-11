/**
 * apiGrid
 */
import apiSearchPanel from './search-panel'
import apiTbar from './tbar'
import apiTbar1 from './tbar1'
import detail from './detail'

const Grid = {
    extends: new TjUI.grid.Grid(),
    data(){
        return {
            conurl: 'apidocument/getDepartUsers',
            queryParams: {},
            size: 'small',
            columns: [
				{label:'生日',field:'date',sort: true,render: (h,{ row,column,field,$index })=>{
                    return h('i',{"class":{'el-icon-time':'el-icon-time'}},row[field])
                },renderHeader: (h, { column, $index })=>{
                    return h('span',{style:{color: '#0E9F5A'}},column.label)
                    //return column.label
                }},
				{label:'名字',field:'name'},
                {label:'地址',field:'address',hide: false},
                {label:'状态',field:'flag',hide: false},
                {label:'状态',field:'flagName',filter: 'FLAG_TYPE',render: (h,{ row,column,field,$index })=>{
                    return h('i',row[field])
                }}, //过滤器转换flag id->name
            ],
            detailPanel: detail,
            searchPanel: apiSearchPanel,
            tbar: apiTbar,
            bbar: [apiTbar1],
            menu: [{text: '同步'},{text: '分析'}],
            buttons: [
                {text: '保存',listeners: {
                    click: ()=>{
                        console.info(this.getSelectedRows());
                    }
                }},
                {text: '关闭'}
            ],
            buttonAlign: 'right',
            pagingItems: [{text: '导出',listeners: {click: this.doExp}}],
            isPagination: true,
            loadFilter: this.gridLoadFilter
        }
    },
    mounted(){
        // setTimeout(() => {
            // this.removeTbar(apiTbar)
            // this.removeBbar(apiTbar1)
            // this.hide()
            // this.getTbar()
            // this.getBbar()
        // }, 3000);
    },
    methods: {
        doExp(){
            alert('导出')
        },
        gridLoadFilter(data){
            //添加自己的数据过滤处理
            return data
        }
    }
}
export default Grid