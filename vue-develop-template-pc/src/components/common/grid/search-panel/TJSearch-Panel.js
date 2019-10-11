/**
 * 饿了么 搜索栏组件
 * 使用form表单
 */
import detail from './detail'

TjUI.ns('TjUI.grid.searchPanel')
TjUI.grid.searchPanel.SearchPanel = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.panel.Panel()
    },
    // extends: new panel.Panel(),
    inject: ['getTopBar'],
    data(){
        return {
            layout: 'fit',
            html: '',
            width: 'auto',  //搜索栏内部表单宽度
            defaults: {
                columns: 4,
            },   //默认配置 具体配置请查看form.js
            //buttons: [],    //操作按钮
            detailData: [], //表单配置详情
            detailLink: `link-search-panel-${this._uid}`
        }
    },
    created(){
        this.initDetailData()
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initDetailData(){
            //覆盖方法添加表单详情
            this.detailData = []
        },
        initPanel(){
            let panel = {
                component: detail,
                props: {
                    link: this.detailLink,
                    ...this.$data
                }
            }
            this.add(panel)
        },
        doQuery(){
            let queryParams = this.getLinkComponent(this.detailLink).getModels()
            this.getTopBar.getPanel.setQueryParams({...this.getTopBar.getPanel.queryParams,...queryParams})//{address_like: queryParams['part']}
            this.getTopBar.getPanel.reloadGrid()
        },
        doReset(){
            this.getLinkComponent(this.detailLink).resetForm()
        }
    }
})