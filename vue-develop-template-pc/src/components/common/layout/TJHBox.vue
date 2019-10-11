<template>
    <div :class=[mainClass] style="height: 100%;background-color: #B3C0D1;">
        <slot name="default"></slot>
    </div>
</template>
<script>
export default {
    name: 'tjhbox-component',
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
            desc: '水平布局，以水平流的方式组织所有子元素在一行展示',
            mainClass: `hbox-layout-${this._uid}`,
        }
    },
    mounted(){
        this.$nextTick(function () {
            [...document.getElementsByClassName(this.mainClass)[0].childNodes].forEach((element)=>{
                element.classList.add('inline-block');
            })
            setTimeout(() => {
                this.getChilds()
            }, 0);
        })
    },
    methods: {
        getChilds(){
            let childs = []
            this.$slots.default.forEach(slot=>{
                childs.push(slot.componentInstance)
            })
            Object.assign(this.childs,childs)
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
