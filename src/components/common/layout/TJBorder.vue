<template>
    <el-container>
        <el-header height="auto" style="width:100%;">
            <slot name="north"></slot>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <slot name="west"></slot>
            </el-aside>
            <el-main>
                <slot name="center"></slot>
            </el-main>
            <el-aside width="auto">
                <slot name="east"></slot>
            </el-aside>
        </el-container>
        <el-footer height="auto">
            <slot name="south"></slot>
        </el-footer>
    </el-container>
</template>
<script>
export default {
    name: 'tjborder-component',
    props: {
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
            desc: 'border布局,将容器分为五个区域:east,south,west,north,center'
        }
    },
    mounted(){
        this.$nextTick( () => {
            this.getChilds()
        })
    },
    methods: {
        getChilds(){
            let childs = []
            for (let value of Object.values(this.$slots)) {
                childs.push(value[0].componentInstance)
            }
            Object.assign(this.childs,childs)
            return childs
        }
    }
}
</script>
<style scope>
    .el-container {
        width: 100%;
        height: 100%;
        /* box-sizing: border-box; */
    }
    .el-header, .el-footer, .el-main {
        width: 100%;
        padding: 0px;
    }
    .el-main > div{
        height: 100%;
    }
</style>
