<template>
    <div>
        <li>{{1 | SEX_TYPE}}</li>
    </div>
</template>
<script>
export default {
    name: 'childTemp-component',
    data(){
        return {
            desc: '模板组件'
        }
    },
    mounted(){
        console.info(this.$root._rootFilters(0,'SEX_TYPE'));
    }
}
</script>
