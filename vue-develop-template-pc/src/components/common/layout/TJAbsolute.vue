<template>
    <div :class=mainClass style="height: 100%;position:relative;background-color: #B3C0D1;">
        <slot name="default"></slot>
    </div>
</template>
<script>
export default {
    name: 'tjabsolute-component',
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
            desc: '绝对定位，在容器内部根据指定的坐标xy定位显示',
            mainClass: `absolute-layout-${this._uid}`,
        }
    },
    mounted(){
        this.$nextTick(function () {
            [...document.getElementsByClassName(this.mainClass)[0].childNodes].forEach((element)=>{
                element.classList.add('block','position');
            })
            this.getChilds()
        })
    },
    methods: {
        getChilds(){
            if( this.$slots.default === void(0) ){
                return []
            }
            let childs = []
            if(this.$slots.default.length){
                childs = this.$slots.default.map(slot=>slot.componentInstance)
                Object.assign(this.childs,childs)
            }
            return childs
        }
    }
}
</script>
<style scoped>
    .block{
        display: block;
    }
    .position{
        position: absolute;
    }
</style>
