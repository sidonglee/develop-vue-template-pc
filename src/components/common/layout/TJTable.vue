<template>
    <div class="table-container table-layout-01">
        <table :border="border" style="border-collapse:collapse;">
            <template v-for="(row,index) in currentRows">
                <tr :key="index">
                    <template v-for="(tdPanel,tdIndex) in rowColoumns[index]">
                        <td :key="tdIndex" :colspan="tdPanel['data']['props']['userColspan']" :rowspan="tdPanel['data']['props']['userRowspan']" :style="{width: width,height: height,padding: padding}">
                            <!--作用域插槽-->
                            <slot name='context-slot' v-bind:component="tdPanel"></slot>
                        </td>
                    </template>
                </tr>
            </template>
        </table>
    </div>
</template>
<script>
export default {
    name: 'tjtable-component',
    props: {
        layoutConfig: {
            type: Object,
            default(){
                return {columns: 0}
            }
        },
        defaults: {
            type: Object,
            default(){
                return {gutter: '3px',width: '0px',height: '0px',border: true}
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
            desc: 'table布局，按照普通表格的方法布局子元素（columns：3将父容器分成3列）',
            currentRows: [],    //行数 Array
            rowColoumns: [],    //一行的所有列 vNode Array
        }
    },
    computed:{
        width(){
            //let reg = /[1-9][0-9]*/g;
            //return !!this.defaults['width'] ? this.defaults['width'].match(reg)[0] : '0'
            return !!this.defaults['width'] ? this.defaults['width'] : '0px'
        },
        height(){
            //let reg = /[1-9][0-9]*/g;
            //return !!this.defaults['height'] ? this.defaults['height'].match(reg)[0] : '0'
            return !!this.defaults['height'] ? this.defaults['height'] : '0px'
        },
        border(){
            return !!this.defaults['border'] ? 1 : 0
        },
        padding(){
            return !!this.defaults['gutter'] ? this.defaults['gutter'] : '3px'
        }
    },
    mounted(){
        let cols = 0
        let column = []
        setTimeout(() => {
            let columns = parseInt(this.layoutConfig.columns);
            [...this.$slots['default']].forEach((element,index) => {
                let props = element['data']['props'];
                !('userColspan' in props) && (props['userColspan'] = 1);
                !('userRowspan' in props) && (props['userRowspan'] = 1);
                let userColspan = props['userColspan']
                if((cols+userColspan)>columns){
                    userColspan = userColspan-((cols+userColspan)-columns)
                }
                cols+=userColspan
                column.push(element)
                if(cols%columns===0 || (this.$slots['default'].length-1===index && cols%columns!==0 && props['userColspan']<=columns)){ // || (cols%columns!==0 && props['userColspan']<=columns)
                    this.currentRows.push(cols)
                    this.rowColoumns.push([...column])
                    column = []
                    cols = 0
                }
            })
            this.$nextTick( () => {
                this.getChilds()
            })
        }, 0);
    },
    methods: {
        getWidth(span){
            let unit = this.defaults['width'].replace(''+this.width,'')
            return (span*this.width)+unit
        },
        getHeight(span){
            let unit = this.defaults['height'].replace(''+this.height,'')
            return (span*this.height)+unit
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
    .table-container{
        height: '100%';
        background-color: pink;
    }
    .grid-container *{
        box-sizing: border-box;
    }

</style>