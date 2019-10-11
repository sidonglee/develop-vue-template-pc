<template>
    <div class="grid-container grid-layout-01">
        <!-- <div class="row">
            
        </div>
        <div class="row">

        </div> -->
        <!-- <slot name="default">

        </slot> -->
        <template v-for="(row,index) in currentRows">
            <div class="row" :class="[`row${index+1}`]" :key="index">
                <template v-for="(grid,gIndex) in rowgrids[index]">
                    <div class="grid" :style="{width: getGridWidth(grid['data']['props']['userCols'])+'%',padding: gridGutter}"  :class="[`row${index+1}-col${gIndex+1}-${grid['data']['props']['userCols']}`]" :key="gIndex">
                        <!--
                            不能使用uuid指定具名插槽的形式插入vNode节点，
                            第二次更新渲染节点uuid和上一次是相同的导致vue会提示warn警告 '插槽出现同名'，这里必须使用作用域插槽 
                            {{ renderChild( grid,`col-${gIndex+1}-${grid['data']['props']['userCols']}`,$createElement ) }}
                            <slot :name="[ `col-${gIndex+1}-${grid['data']['props']['userCols']}` ]"></slot> -->
                        <slot name='context-slot' v-bind:component="grid"></slot>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'tjgrid-component',
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
                return {gutter: '0px'}
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
            desc: `栅格布局，是一种运用固定的格子(一行固定12个格子)设计的版面布局
                (使用时请指定每个panel面板占用的格子数‘userCols’)
                只能跨列格子不能跨行，需要跨行请使用tjTable布局`,
            mainClass: `grid-layout-${this._uid}`,
            gridNums: 12,   //一行12个格子
            currentRows: [],//行数 Array
            rowgrids: [],   //一行的所有格子vNode Array
        }
    },
    computed: {
        gridWidth(){
            //每个grid格子的宽度
            return (100/this.gridNums).toFixed(2)
        },
        gridGutter(){
            //格子的padding值 px/%
            return this.defaults.gutter
        }
    },
    mounted(){
        setTimeout(() => {
            let cols = 0
            let grid = [];
            [...this.$slots['default']].forEach((element,index) => {
                let props = element['data']['props']
                if('userCols' in props){
                    cols+=props['userCols']
                    grid.push(element)
                    if(cols%12===0 || (this.$slots['default'].length-1===index && cols%12 !== 0 && parseInt(props['userCols'])>=1 && parseInt(props['userCols'])<=12)){
                        this.currentRows.push(cols)
                        this.rowgrids.push([...grid])
                        grid = []
                    }
                }
            })
            this.$nextTick( () => {
                this.getChilds()
            })
        }, 0)
    },
    methods: {
        renderChild ( vNode,uuid,h ) {
            this.$slots[ uuid ] = vNode;    //弃用，改用作用域插槽
        },
        //设置栅格的宽度
        getGridWidth(cols){
            return this.gridWidth*cols
        },
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
    .grid-container{
        height: '100%';
        background-color: pink;
    }
    .grid-container *{
        box-sizing: border-box;
    }
    .row:before, 
    .row:after {
        content:"";
        display: table ;
        clear:both;
    }
    .grid{
        float: left;
        /* padding: 12px;  */
    }
</style>
