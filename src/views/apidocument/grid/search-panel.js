/**
 * 搜索模板
 */
const SearchPanel = {
    extends: new TjUI.grid.searchPanel.SearchPanel(),
    data(){
        return {
            defaults: {
                width: 200
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                // {span: 1,name: 'markedate',value: '2018-09-11',type: 'DatePicker',width: 150,label: '日期'},
                {span: 1,name: 'part',value:'爬山',label: '活动',type: 'TextField',width: 150,emptyText: '活动名称'},
                {span: 1,name: 'operbtns',type: 'ButtonGroup',width: 160,columns: 2,border: false,gutter: '0px',
                buttonGroup: [
                    {text:'查询',listeners: {
                        click: this.doQuery
                    }},
                    {text:'重置',listeners: {
                        click: this.doReset
                    }}
                ]
                }
            ]
        }
    }
}
export default SearchPanel