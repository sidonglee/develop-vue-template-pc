<template>
    <el-submenu :index="id">
        <template slot="title">
            <i :class="icon"></i>
            <span>{{title}}</span>
        </template>
        <el-menu-item v-for="(child,index) in children" :key="child.moduleid+index" :index="child.id">
            <span slot="title">{{child.title}}</span>
        </el-menu-item>
    </el-submenu>
</template>
<script>
export default {
    name: 'tjsubmenu-component',
    props: {
        id: {
            type: String
        },
        title: {
            type: String
        },
        icon: {
            type: String,
            default: ''
        },
        children: {
            type: Array,
            default: () => []
        }
    },
    computeds: {
        
    },
    mounted(){
        
    }
}
</script>
