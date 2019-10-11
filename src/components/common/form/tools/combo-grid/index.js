import searchPanel from './search-panel'
TjUI.ns('TjUI.form.tools.combogrid')
TjUI.form.tools.combogrid.Grid = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.grid.Grid()
    },
    props: {
        userConurl: String,
        //初始化查询参数
        userQueryParams: {
            type: Object,
            default(){
                return {}
            }
        },
        userColumns: {
            type: Array,
            default(){
                return []
            }
        },
        userSelMode: {
            type: String,
            default: 'multi',
        }
    },
    data(){
        return {
            // conurl: 'apidocument/getDepartUsers',
            // queryParams: {},
            /* columns: [
				{label:'生日',field:'date',sort: true,render: (h,{ row,column,field,$index })=>{
                    return h('i',{"class":{'el-icon-time':'el-icon-time'}},row[field])
                },renderHeader: (h, { column, $index })=>{
                    return h('span',{style:{color: '#0E9F5A'}},column.label)
                    //return column.label
                }},
                {label:'名字',field:'name'}
            ], */
            isSelectFirstRow: false,
            conurl: this.userConurl,
            queryParams: this.userQueryParams,
            columns: this.userColumns,
            selMode: this.userSelMode,
            size: 'small',
            searchPanel: new searchPanel(),
            isShowPageSizes: false
        }
    },
    methods: {
        afterDataLoad(table){
            this.$emit('afterDataLoad',table)
        },
        selectionChange(selection){
            this.currentRows.splice(0,this.currentRows.length,...selection)
            this.$emit('selectionChange',this.currentRows)
        },
        selectRow(selection, row){
            this.$emit('selectRow',selection, row)
        },
        selectAll(selection){
            this.$emit('selectAll',selection)
        },
        rowClick(row, event, column){
            this.$emit('selectRow',[row], row)
        },
    }
})