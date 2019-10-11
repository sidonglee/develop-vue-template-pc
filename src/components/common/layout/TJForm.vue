<template>
    <div v-bind:style="styleObject">
        <template v-for="(row,index) in currentRows">
            <el-row :key="index" :gutter="5" style="width:`${rowWidth}px`;background-color:#F2F2F2;border:0px;">
                <template v-for="(col,index1) in row">
                    <el-col :key="index1" :span="col.span" :pull="col.pull" :push="col.push" :style="{width: `${getColWidth(col)}px`,display: `${col.type==='hidden'?'none':'block'}`}">
                        <div class="grid-content bg-purple-dark">
                            <el-form-item :label="col.label" :label-width="col.type.toLowerCase()==='label'?'0px':col.labelWidth" :style="col.fieldStyle" :prop="col.name">
                                <template v-if="col.hasOwnProperty('labelHtml')">
                                    <label slot="label" v-html="col.labelHtml"></label>
                                </template>
                                <template v-if="!col.hasOwnProperty('labelHtml') && col.hasOwnProperty('labelRender')" slot="label">
                                    {{renderLabelColumn(col)}}
                                    <slot></slot>
                                </template>
                                <component v-model="model[col.name]" :is="getToolComponent(col)" v-bind="getToolComponentProps(col)"></component>
                            </el-form-item>
                        </div>
                    </el-col>
                </template>
            </el-row>
        </template>
    </div>
</template>
<script>
import { strHavestr } from '../helper/tools'

//不直接提供给panel的layout属性，而是作为相应的子组件存在
export default {
    name: 'tjform-component',
    props: {
        //列的宽度
        width: {
            type: [String,Number],
            default: 'auto'
        },
        //将父容器分成4列
        columns: {
            type: Number,
            default: 4
        },
        //列label文字的宽度
        labelWidth: {
            type: Number,
            default: 100
        },
        //表单边框
        border: {
            type: Boolean,
            default: true
        },
        //数据详情
        detail: {
            type: Array,
            default(){
                return []
            }
        },
        //表单数据对象 用于实现v-model
        model:{
            type: Object,
            default(){
                return {}
            }
        },
        layoutConfig: {
            type: Object,
            default(){
                return {}
            }
        },
        defaults: {
            type: Object,
            default(){
                return {gutters: '0px'}
            }
        },
        childs: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            desc: '表单布局，是一种专门用于管理表单中输入字段的布局（布局采用的是内置table格式的类型）',
            styleObject: {
                border: `${this.border?1:0}px solid #DBDBDB`,
                "box-sizing": "border-box"
            },
            display: 'block',
            /* detail: [
                {span: 1,title: '列0'},
                {span: 1,title: '列1'},
                {span: 2,title: '列2'},
                {span: 2,title: '列3'},
                {span: 2,title: '列4'},
                {span: 4,title: '列5'},
                {span: 4,title: '列6'},
                {span: 4,title: '列7'},
            ], */
            //行宽度
            rowWidth: 0,
            //单个列的宽度
            colWidth: this.width,
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.rowWidth = this.$parent.$el.clientWidth
            if(!(!!this.width)){
                this.colWidth = Math.floor(this.rowWidth/this.columns)
            }
            this.getChilds()
        })
    },
    methods: {
        renderLabelColumn(col){
            this.$slots[ 'default' ] = col.labelRender(this.$createElement)
        },
        //获取对应的工具组件
        getToolComponent({type}){
            //不能使用new 构造函数()方式创建组件
            //return (TjUI.form.tools[type]!=void(0)) ? new TjUI.form.tools[type](): null;
            return (this[`tj${type}`]!=void(0)) ? this[`tj${type}`] : null;
        },
        //组装对应组件的props参数
        getToolComponentProps(col){
            let currentCol = {...col}

            currentCol['userRef'] = col.name
            delete currentCol['label']
            // delete currentCol['value']
            return currentCol
        },
        //列的宽度 
        getColWidth(col){
            return (parseInt(col.span) >= this.columns)? (this.columns*this.colWidth) : (this.colWidth * parseInt(col.span))
        },
        getChilds(){
            let childs = [...this.$children]
            Object.assign(this.childs,childs)
            return childs
        },
    },
    computed: {
        tjTextField(){
            return new TjUI.form.tools.TextField()
        },
        tjInputNumber(){
            return new TjUI.form.tools.InputNumber()
        },
        tjTextHidden(){
            return new TjUI.form.tools.TextHidden()
        },
        tjComboBox(){
            return new TjUI.form.tools.ComboBox()
        },
        tjComboBoxInput(){
            return new TjUI.form.tools.ComboBoxInput()
        },
        tjButton(){
            return new TjUI.form.tools.Button()
        },
        tjButtonGroup(){
            return new TjUI.form.tools.ButtonGroup()
        },
        tjTextArea(){
            return new TjUI.form.tools.TextArea()
        },
        tjButtonMenu(){
            return new TjUI.form.tools.ButtonMenu()
        },
        tjComboTree(){
            return new TjUI.form.tools.ComboTree()
        },
        tjDatePicker(){
            return new TjUI.form.tools.DatePicker()
        },
        tjDateTimePicker(){
            return new TjUI.form.tools.DateTimePicker()
        },
        tjColor(){
            return new TjUI.form.tools.Color()
        },
        tjComboGrid(){
            return new TjUI.form.tools.ComboGrid()
        },
        tjFileBox(){
            return new TjUI.form.tools.FileBox()
        },
        tjTextPassword(){
            return new TjUI.form.tools.TextPassword()
        },
        tjSwitchButton(){
            return new TjUI.form.tools.SwitchButton()
        },
        tjRadio(){
            return new TjUI.form.tools.Radio()
        },
        tjCheckBox(){
            return new TjUI.form.tools.Checkbox()
        },
        tjLabel(){
            return new TjUI.form.tools.Label()
        },
        currentRows(){
            let rows = []
            for(let n=0,length=this.detail.length;n<length;n++){
                let row = [this.detail[n]]
                let b = parseInt(this.detail[n].span)
                if(b >= this.columns){
                    (b > this.columns) && (this.detail[n].span = this.columns);
                    rows.push(row)
                    continue
                }
                for(let m=n+1,length=this.detail.length;m<length;m++){
                    b = b + parseInt(this.detail[m].span)
                    row.push(this.detail[m])
                    if(b >= this.columns){
                        (b > this.columns) && (this.detail[m].span = b-this.columns);
                        n = m;
                        break
                    }
                }
                rows.push(row)
                if(row.length===length || row[row.length-1]['name']===this.detail[this.detail.length-1]['name']){
                    break;
                }
            }
            return rows
        }
    }
}
</script>
<style>
    .el-form-item__error{
        z-index: 10;
    }
</style>

<style lang="less" scoped>
    .el-row {
        // margin-bottom: 3px;
        margin-left: 0px !important;
        margin-right: 0px !important;
        border-bottom: 1px solid #B6B4B6;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        // border-radius: 4px;
    }
    .bg-purple-dark {
        //background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        // border-radius: 4px;
        min-height: 36px;
        line-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-form-item{
        margin-bottom: 0px !important;
    }
</style>

