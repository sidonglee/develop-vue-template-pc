/**
 * Grid数据展示详情页
 */
const Detail = {
    extends: new TjUI.grid.detail.Detail(),
    width: 450,
    height: 300,
    data(){
        return {
            conurl: '',
            defaults: {
                border: false,
                columns: 2,
                width: 200,
                labelWidth: 60
            }
        }
    },
    mounted(){},
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'date',type: 'DatePicker',width: 130,label: '日期'},
                {span: 1,name: 'name',label: '名字',type: 'TextField',width: 130,emptyText: '名字',
                rule: [
                    {required: true,message: '请输入活动名称', trigger: 'blur'}
                ]
                },
                {span: 2,name: 'address',label: '地址',type: 'TextArea',rows: 6,resize: 'none'},
                {span: 1,name: 'hide_id',type: 'TextHidden',width: 150},
            ]
        }
    }
}
export default Detail