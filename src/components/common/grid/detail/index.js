/**
 * detail组件
 * Grid默认行数据展示详情页
 * 如果要监听window窗口的变化，请监听this.window.on(this.window.events.doAfterLayout,()=>{})
 * 监听窗口关闭事件 this.window.on(this.window.events.doBeforeClose,()=>{})
 */
import detail from './detail'
import { get,isNotEmpty,apply } from '../../helper/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'

TjUI.ns('TjUI.grid.detail')
TjUI.grid.detail.Detail = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.panel.Panel()
    },
    // extends: new panel.Panel(),
    props: ['mainPanel','mainGrid','window'],
    title: '详情',  //窗口参数
    width: 350, 
    height: 300,
    data(){
        return {
            conurl: '',         //保存form表单的url
            detailConurl: '',   //详情url地址，如果传入url则不会使用行双击的record作为数据源
            isReloadForm: true, //第一次载入时是否自动刷新 'form' 数据
            formParams: {},     //表单提交参数
            queryParams: {},    //url地址的查询参数  detailConurl
            layout: 'fit',
            html: '',
            width: 'auto',  //搜索栏内部表单宽度
            defaults: {
                columns: 4,
            },   //默认配置 具体配置请查看form.js
            formType: 'edit',   //form表单类型 edit/add
            buttonsLayout: 'bottom',//按钮布局 top、bottom
            isShowBtns: true,   //是否显示操作按钮
            formButtons: [],    //操作按钮
            detailData: [],     //表单配置详情
            detailLink: `link-window-detail-panel-${this._uid}`,
            detailRecord: {}, //url查询时返回的当前记录行
            //事件
            events: {
                //form表单渲染结束 this.$on(this.events.afterFormRender,()=>{})
                'afterFormRender': 'afterFormRender',
            }
        }
    },
    computed: {
        //grid当前选中row行
        record(){
            if(isNotEmpty(this.detailConurl)){
                return this.detailRecord
            }
            return ('getSelectedRow' in this.mainPanel) ? this.mainPanel.getSelectedRow(): {}
        },
        //grid当前选中row行集
        records(){
            return ('getSelectedRows' in this.mainPanel) ? this.mainPanel.getSelectedRows(): []
        },
        //获取表单
        formDetail(){
            // return {...this.getLinkComponent(this.detailLink).getModels()}
            return this.getLinkComponent(this.detailLink).getModels()
        }
    },
    created(){
        this.initButtons()
        this.initDetailData()
    },
    mounted(){
        // this.initButton(); 将initPanel中的按钮放到initButton中生成,防止异步后在生成按钮导致权限判断不能在一个生命周期内完成
        this.initFieldValue().then(()=>{
            this.initPanel()
        })
    },
    methods: {
        initButtons(){
            this.formButtons.push({text: '提交',authority: ['write'],listeners: {click: this.doSubmit}})
            if(this.formType === 'add'){
                this.formButtons.push({text: '重置',authority: ['write'],listeners: {click: this.resetForm}})
            }
        },
        initDetailData(){
            //覆盖方法添加表单详情
            this.detailData = []
        },
        //初始化表单字段默认值
        initFieldValue(){
            return new Promise((resolve, reject)=>{
                if(isNotEmpty(this.detailConurl) && this.isReloadForm){
                    //通过detailConurl获取表单详情
                    this.$api[this.detailConurl](this.queryParams).then(resData=>{
                        if(!(!!resData.data)) return
                        this.detailRecord = resData.data
                        this.setFieldsValue(resData.data)
                        resolve(resData.data)
                    })
                }else{
                    this.setFieldsValue(this.record)
                    resolve(this.record)
                }
            })
        },
        setFieldsValue(record){
            for (let [key, value] of Object.entries(this.detailData)) {
                if(record[value['name']]!=void(0)){
                    if(this.detailData[key]['type']==='ComboBox'||this.detailData[key]['type']==='ComboTree'||this.detailData[key]['type']==='ComboGrid'){
                        this.detailData[key]['value'] = [record[value['name']]+'']
                    }else{
                        this.detailData[key]['value'] = record[value['name']]+''
                    }
                }
            }
        },
        initPanel(){
            let panel = {
                component: detail,
                props: {
                    link: this.detailLink,
                    ...this.$data,
                    buttons: this.isShowBtns ? this.formButtons : [],
                }
            }
            this.add(panel)
            setTimeout(() => {
                this.$emit(this.events.afterFormRender,this.formDetail)
            }, 0);
        },
        doBeforeSave(){},
        //自定义验证
        validate(){
            return true
        },
        doSubmit(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            console.info(this.conurl,this.formParams,this.formDetail);
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.conurl]({...this.formParams,...this.formDetail}).then(resData=>{
                        //...
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            !!this.mainGrid && this.mainGrid.reloadGrid();
                            !!this.window && this.window.close()
                            this.$message({type: 'success',message: '操作成功!'});
                        }
                        this.doResult(resData)
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
        //自定义处理保存结果，用于实现多态
        doResult(resData){},
        //重置表单
        resetForm(){
            this.getLinkComponent(this.detailLink).resetForm()
        },
        //刷新表单
        reloadForm(){
            this.isReloadForm = true
            this.initFieldValue().then(data=>{
                apply(this.formDetail, data);
            })
        }
    }
})