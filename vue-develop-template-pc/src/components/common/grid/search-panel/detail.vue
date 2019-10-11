<template>
    <detail-form :width="width" isHideDefaultButtons :detailData="detailData" :layout="defaults" :buttons="buttons" ref="detail-form-ref" :user-ref="userRef"></detail-form>
</template>
<script>

export default {
    name: 'search-panel-detail-component',
    components: {
        detailForm: new TjUI.form.Form()
    },
    props: {
        width: {
            type: [String,Number],
            default: 'auto'
        },
        buttons: {
            type: Array,
            default(){
                return []
            }
        },
        defaults: {
            type: Object,
            default(){
                return {}
            }
        },
        detailData: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            userRef: `form-${this._uid}`
        }
    },
    mounted(){},
    methods: {
        //获取表单数据对象
        getModels(){
            return this.$refs['detail-form-ref'].models
        },
        resetForm(){
            this.$refs['detail-form-ref'].resetForm()
        }
    }
}
</script>
<style scoped>

</style>
