const SearchPanel = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.grid.searchPanel.SearchPanel()
    },
    data(){
        return {
            defaults: {
                width: 200,
                labelWidth: 40
            }
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: this.getTopBar.getPanel.$attrs.combogrid.displayField+'',value:'',label: '名称：',type: 'TextField',width: 150,emptyText: '名称'},
                {span:1,name: 'searchbtn',type: 'Button',text: '查询',style: 'margin-left: -40px;',listeners: {
                    click: this.doQuery
                }}
            ]
        }
    }
})
export default SearchPanel