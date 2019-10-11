/**
 * define-tbar Grid默认bar工具栏
 * 默认生成按钮 ‘添加’，‘删除’，‘归档’，‘停用’
 * 含有对按钮state状态的处理
 * ‘condition’设置按钮 ‘disabled: true/false’ 的条件
 * 'authority'设置按钮权限关键字 ‘default’ 'read' 'write'
 */
import {isArray} from '../../helper/tools'

TjUI.ns('TjUI.grid.defineTbar')
TjUI.grid.defineTbar.DefineTbar = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.toolBar.ToolBar()
    },
    // extends: new toolBar.ToolBar(),
    data(){
        return {
            flag: 'flag',   //状态控制字段 继承后可以用其它值 如：'state'替代
            defaultBtns: [
                {text: '添加',name:'add',listeners: {click: this.doAdd}},
                {text: '删除',name:'delete',condition: 1,listeners: {click: this.doDelete}},              //1
                {text: '归档',name:'archive',condition: [1,256],listeners: {click: this.doArchive}},       //1->128
                {text: '停用',name:'terminate',condition: 128,listeners: {click: this.doTerminate}},         //128->256
                {text: '丢弃',name:'discard',condition: [1,128,256],listeners: {click: this.doDiscard}}    //[1,128,256]->384
            ],
            items: []
            /* items: [
                {text: '添加',listeners: {
                    click: ()=>{
                        alert(this.ttt)
                    }
                }},
                {text: '删除',condition: 1},            //1
                {text: '归档',condition: [1,256]},            //1->128
                {text: '停用',condition: 128},          //128->256
                {text: '丢弃',condition: [1,128,256]}   //[1,128,256]->384
            ] */
        }
    },
    computed: {
        //grid当前选中row行
        record(){
            return ('getSelectedRow' in this.getPanel)?this.getPanel.getSelectedRow(): {}
        },
        //grid当前选中row行集
        records(){
            return ('getSelectedRows' in this.getPanel)?this.getPanel.getSelectedRows(): {}
        }
    },
    created(){
        this.items.unshift(...this.defaultBtns)
        for (let index of this.items.keys()) {
            if(!this.items[index].hasOwnProperty('isRender')){
                this.$set( this.items[index], 'isRender', true )
            }
            if(!this.items[index].hasOwnProperty('disabled')){
                this.$set( this.items[index], 'disabled', false )
            }
        }
        //监听行点击事件
        this.getPanel.$on(this.getPanel.events.rowClick,this.rowClick)
        //监听grid数据刷新事件
        this.getPanel.$on(this.getPanel.events.afterDataLoad,this.afterDataLoad)
    },
    mounted(){
        this.$nextTick(() => {
            //右键打开菜单栏等重新绘制该组件会进入$nextTick监听中，需要重新设置按钮
            // this.rowClick(this.getPanel.getSelectedRow())
        })
    },
    methods: {
        rowClick(row){
            let flag = row[this.flag]
            this.settingBtns(flag)
        },
        afterDataLoad(){
            let flag = 0
            if(this.getPanel.getStore().length){
                flag = this.getPanel.getSelectedRow().hasOwnProperty(this.flag)?this.getPanel.getSelectedRow()[this.flag]:0
            }
            this.settingBtns(flag)
        },
        doAdd(){},
        doDelete(){},
        doArchive(){},
        doTerminate(){},
        doDiscard(){},  //继承后复写实现多态
        settingBtns(flag = 0){
            if(!this.getPanel.getStore().length){
                this.items.forEach((item, index) => {
                    if(!item.hasOwnProperty('condition')) return
                    this.$children[index].curDisabled = true
                })
                return
            }
            this.items.forEach((item, index) => {
                if(!('condition' in item)) return
                if(!item.condition.length) return
                let btn = this.$children[index]
                if(isArray(item['condition'])){
                    item['condition'].includes(flag) ? (btn.curDisabled=false):(btn.curDisabled=true);
                    return
                }
                (flag === item['condition']) ? (btn.curDisabled=false):(btn.curDisabled=true);
            })
        }
    }
})