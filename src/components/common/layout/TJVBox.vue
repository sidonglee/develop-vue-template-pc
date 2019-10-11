<template>
    <div :class=mainClass style="height: 100%;background-color: #B3C0D1;">
        <slot name="default"></slot>
    </div>
</template>
<script>
export default {
    name: 'tjvbox-component',
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
            desc: '垂直布局，以垂直的方式组织所有子元素',
            mainClass: `vbox-layout-${this._uid}`,
        }
    },
    mounted(){
        this.$nextTick(function () {
            [...document.getElementsByClassName(this.mainClass)[0].childNodes].forEach((element)=>{
                element.classList.add('block');
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
    .block{
        display: block;
    }
</style>