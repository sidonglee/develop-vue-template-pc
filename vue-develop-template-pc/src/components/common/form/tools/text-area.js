/**
 * 饿了么 input文本域输入控件
 * 扩展至text-field控件
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.TextArea = TjUI.extend(js.base.fn,{
    props: {
        rows: Number,
        resize: {
            type: String,
            default: 'both'
        },
        type: {
            type: String,
            default: 'textarea'
        }
    },
    computed:{
        fieldType(){
            return 'textarea'
        }
    },
    data(){
        return {
            attrsOtherParams: {
                rows: this.rows,    //输入框行数，只对 type="textarea" 有效
                resize: this.resize //控制是否能被用户缩放 string 'none, both, horizontal, vertical'
            }
        }
    },
    initComponent(){
        this['extends'] = new TjUI.form.tools.TextField()
    }
})
