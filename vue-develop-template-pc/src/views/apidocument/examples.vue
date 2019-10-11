<template>
    <div style="height:100%;width:100%;">
        <!-- <api-grid></api-grid> -->
        <!-- <api-grid-property></api-grid-property> -->
        <!-- <tj-fit></tj-fit> -->
        <!-- <tj-v-box></tj-v-box> -->
        <!-- <api-hbox></api-hbox> -->
        <!-- <tj-column></tj-column> -->
        <!-- <api-absolute></api-absolute> -->
        <!-- <api-double-wing></api-double-wing> -->
        <!-- <api-form></api-form> -->
        <!-- <api-grid-layout></api-grid-layout> -->
        <!-- <api-table></api-table> -->
        <!-- <api-tree></api-tree> -->
        <!-- <tja></tja> -->
        <!-- <api-vuex></api-vuex> -->
        <tj-sys-module></tj-sys-module>
        <!-- <tj-map></tj-map> -->
    </div>
</template>
<script>
import apiGrid from './grid'
// import apiGridProperty from '@/components/common/grid-property'
// import tjFit from './fit'
// import apiAbsolute from './absolute'
// import apiGridLayout from './grid-layout'
// import tjVBox from './vbox'
// import tja from './test'
// import apiHbox from './hbox'
// import tjColumn from './column'
// import apiDoubleWing from './double-wing'
// import apiTable from './table'
// import apiTree from './tree'
// import apiVuex from './vuex'
// import tjWindow from '@/components/common/window'
import tjSysModule from './sys-module'
// import tjMap from './map'

export default {
    name: 'layout-view',
    components: {
        // apiGrid,
        // apiGridProperty,
        // tjFit,
        // apiAbsolute,
        // apiGridLayout,
        // tjVBox,
        // tja,
        // apiHbox,
        // tjColumn,
        // apiDoubleWing,
        // apiTable,
        // apiForm: ()=>import('./form'),
        // apiTree,
        // apiVuex,
        tjSysModule,
        // tjMap,
    },
    data(){
        return {}
    },
    mounted(){
        /* let detailWin = new tjWindow({panel: this,title: '列表',height: 400,width: 500})
        detailWin.add(apiGrid)
        detailWin.show() */
    },
    methods: {}
}
</script>
