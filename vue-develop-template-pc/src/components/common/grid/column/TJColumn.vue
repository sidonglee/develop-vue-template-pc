<template>
    <el-table-column
        :fixed="fixed"
        :prop="field"
        :label="label"
        :width="width"
        :align="align"
        :sortable="sort"
        :render-header="renderHeader"
        v-if="!hide"
        >
        <template slot-scope="scope">
            {{renderColumn(scope,field)}}
            <slot></slot>
        </template>
    </el-table-column>
</template>
<script>
//列属性组件
export default {
    name: 'tjcolumn-component',
    inject: ['getPanel'],
    props: {
        //宽度，没有传入将使用auto自适应表格，文字超出宽度自动换行
        width: {
            type: String,
            default: 'auto'
        },
        //对齐方式
        align: {
            type: String,
            default: 'left'
        },
        //对应列内容的字段名
        field: {
            type: String,
            required: true
        },
        //列隐藏 默认false不隐藏
        hide: {
            type: Boolean,
            default: false
        },
        //过滤器
        filter: {
            type: String,
            default: ''
        },
        //列显示的标题
        label: {
            type: String,
            default: 'hello'
        },
        //排序
        sort: {
            type: Boolean,
            default: false
        },
        //列内容区域渲染使用的 Function (每一列数据都起作用)
        render: {
            type: Function
        },
        //列标题 Label 区域渲染使用的 Function (只有列标题起作用)
        renderHeader: {
            type: Function
        },
        //设置fixed列固定属性，所有列的总宽度必须超过 '父元素'宽度，列表出现横向滚动条
        fixed: String
    },
    data(){
        return {
            desc: 'tbale 列组件'
        }
    },
    mounted(){},
    methods: {
        renderColumn(scope,field){
            if(!!this.filter){
                scope.row[field] = this.$root._rootFilters(scope.row[field],this.filter);
            }
            if(!(!!this.render)){
                return scope.row[field]
            }
            //过滤filter
            this.$slots[ 'default' ] = this.render(this.$createElement,{'row': scope['row'],'column': scope['column'],'field': field,'$index': scope['$index']})
        },
        getH(){
            return this.$createElement
        }
    }
}
</script>
<style>
    .show{
        display: table-cell;
    }
    .hide{
        display: hide;
    }
</style>
