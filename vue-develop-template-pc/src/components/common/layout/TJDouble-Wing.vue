<template>
    <div class="double-wing-layout">
        <div class="col-main">
            <div class="main-wrap" :style="{'margin-left': this.wrapStyle['margin-left'],'margin-right':this.wrapStyle['margin-right']}">
                <slot name="main"><!--主列--></slot>
            </div>
        </div>
        <div class="col-sub" :style="{width: this.subStyle.width}">
            <slot name="left"><!--子列--></slot>
        </div>
        <div class="col-extra" :style="{width: this.extraStyle.width,'margin-left': `${0-parseInt(this.extraStyle.width)}px`}">
            <slot name="right"><!--附加列--></slot>
        </div>
    </div>
</template>
<script>
import {isEmptyObject} from '../helper/tools'
export default {
    name: 'tjdouble-wing-component',
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
            desc:'双飞翼布局，左右两列需要设置宽度值，高度自适应父容器',
            mainClass: `doublewing-layout-${this._uid}`,
            wrapStyle: {
                'margin-left': `0px`,
                'margin-right': `0px`,
            },
            subStyle: {
                width: `0px`
            },
            extraStyle: {
                width: `0px`,
                'margin-left': `0px`,
            }
        }
    },
    mounted(){
        this.$nextTick(() => {
            if(isEmptyObject(this.$slots) || 'default' in this.$slots) return;
            this.subStyle.width = `${this.$slots['left'][0]['elm']['offsetWidth']}px`
            this.extraStyle.width = `${this.$slots['right'][0]['elm']['offsetWidth']}px`
            this.wrapStyle['margin-left'] = this.subStyle.width
            this.wrapStyle['margin-right'] = this.extraStyle.width

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
<style scoped>
    .double-layout{
        height: 100%;
    }
    .col-main,.col-sub,.col-extra{
        float: left;
        word-wrap: break-word;
    }
    .col-main{
        width: 100%;
        height: 100%;
        /* background-color:pink; */
    }
    .main-wrap{
        /* margin-left: 190px;
        margin-right: 190px; */
        height: 100%;
        /* background-color:yellow; */
    }
    .col-sub { 
        /* width: 190px; */
        height: 100%;
        background:#5a4f4f;
        margin-left:-100%;
    }
    .col-extra{
        /* width: 190px; */
        height: 100%;
        background:#808080;
        /* margin-left:-190px; */
    }
</style>
