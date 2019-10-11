<template>
    <el-container class="fit-layout-01">
        <el-main>
            <slot name="default"></slot>
        </el-main>
    </el-container>
</template>
<script>
export default {
    name: 'tjfit-component',
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
            desc: 'fit布局，一个子元素将填充满整个容器（只接受一个子元素）'
        }
    },
    mounted(){
        this.$nextTick( () => {
            this.getChilds()
        })
    },
    methods: {
        getChilds(){
            if( this.$slots.default === void(0) ){
                return []
            }
            let childs = [this.$slots.default[0].componentInstance]
            Object.assign(this.childs,childs)
            return childs
        }
    }
}
</script>
<style scoped>
    .fit-layout-01 {
        width: 100%;
        height: 100%;
        /* background-color: #B3C0D1; */
    }
    .fit-layout-01 .el-main{
        padding: 0px;
    }
    .fit-layout-01 .el-main > div{
        height: 100%;
    }
</style>
