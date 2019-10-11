<template>
    <div class="padination-footerbar">
        <el-pagination
        :page-sizes="pageSizeOpts"
        :page-size="page_size"
        :layout="layout"
        :total="currTotal"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
            <div style="display: inline-block;">
                <i class="el-icon-refresh" @click="refresh($event)" style="padding-top:6px;cursor: pointer;"></i>
                <template v-for="(btn,index) in pagingItems">
                    <el-button :key="index" v-on:click="handler(btn.listeners,$event)">{{btn.text}}</el-button>
                </template>
            </div>
        </el-pagination>
    </div>
</template>
<script>
//分页栏组件
export default {
    name: 'tjpagination-component',
    inject: ['getPanel'],
    props: {
        //分页数据条数
        page_size: {
            type: Number,
            default: 30
        },
        //总数
        /* total: {
            type: Number,
            default: 150
        }, */
        //分页数据可选page条数
        pageSizeOpts: {
            type: Array,
            defaut(){
                return [30,50,70,100]
            }
        },
        //是否显示分页数量选择器
        isShowPageSizes: {
            type: Boolean,
            default: true
        },
        //可拓展按钮
        pagingItems: {
            type: Array,
            default(){
                /* [{text: '同步',listeners: {
                    click: ()=>{
                        alert('aaaa123')
                    }
                }},{text: '发送'}] */
                return []
            }
        }
    },
    data(){
        return {
            currentPage: 1
        }
    },
    watch: {},
    computed: {
        currTotal(){
            //总数 total
            return this.getPanel.total
        },
        layout(){
            let b = ['prev','pager','next','total','slot'];
            (this.isShowPageSizes) && b.splice(0,0,"sizes");
            return b.join(",")
        }
    },
    created(){
        this.getPanel.$on('update:current_page',(val)=>{
            this.currentPage = val
        })
    },
    methods: {
        handler(listeners,event){
            listeners['click'](event)
        },
        refresh(event){
            this.getPanel.reloadGrid()
        },
        //pageSize 改变时会触发
        handleSizeChange(pageSize){
            this.$emit('size-change',pageSize)
        },
        //currentPage 改变时会触发
        handleCurrentChange(page){
            this.$emit('current-change',page)
        }
    }
}
</script>
<style lang="less" scoped>
    .padination-footerbar{
        // width: 100%;
        height: 32px;
        background-color: #fff;
        display: block;
        /* display: -webkit-box;
        -webkit-line-clamp: 3; */
    }
</style>
