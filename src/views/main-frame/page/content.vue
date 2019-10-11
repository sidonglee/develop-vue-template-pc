<template>
    <div class="main-content" style="padding: 10px;box-sizing: border-box;">
        <tj-tabs ref="tab-content" type="card" :isShowMenu="isShowMenu"></tj-tabs>
    </div>
</template>
<script>
import tjTabs from '@/components/common/tabs'
import _omit from 'lodash/omit'	

export default {
    inject: ['getPanel'],
    components: {tjTabs},
    data(){
        return {
            isShowMenu: true
        }
    },
    methods: {
        getTabContent(){
            return this.$refs['tab-content']
        },
        open(module){
            // this.$router.replace({ name: module.path })
            this.$refs['tab-content'].addTab({title: module.title,name: module.name,defaults: _omit(module,['component'])},module.component)
        }
    }
}
</script>
<style>
    @import '../../../assets/style/page/main-frame.css';
</style>