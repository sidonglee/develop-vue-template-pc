<template>
    <detail-form :width="width" :layout="defaults" :detailData="detailData" :buttons="buttons" :buttonsLayout="buttonsLayout" ref="window-detail-form-ref" isHideDefaultButtons></detail-form>
</template>
<script>
export default {
    name: 'detail-detail-component',
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
        buttonsLayout: {
            type: String,
            default: 'bottom'
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
        return {}
    },
    methods: {
        //获取表单数据对象
        getModels(){
            return this.$refs['window-detail-form-ref'].models
        },
        getForm(){
            return this.$refs['window-detail-form-ref'].getForm()
        },
        getFormFields(){
            return this.$refs['window-detail-form-ref'].getFormFields()
        },
        resetForm(){
            this.$refs['window-detail-form-ref'].resetForm()
        }
    }
}
</script>
