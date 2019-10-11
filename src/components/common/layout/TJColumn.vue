<template>
    <div :class=mainClass style="height: 100%;background-color: #B3C0D1;box-sizing: border-box;">
        <slot name="default">{{desc}}</slot>
    </div>
</template>
<script>
export default {
    name: 'tjcolumn-component',
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
            desc: '列布局，把整个容器看成一列然后向容器按比例放入子元素(panel面板元素)',
            mainClass: `column-layout-${this._uid}`,
        }
    },
    mounted(){
        this.$nextTick(function () {
            [...document.getElementsByClassName(this.mainClass)[0].childNodes].forEach((element)=>{
                element.classList.add('inline-block');
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
    .inline-block{
        display: inline-block;
    }
</style>