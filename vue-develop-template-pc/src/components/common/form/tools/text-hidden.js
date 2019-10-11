/**
 * 饿了么 input hidden隐藏控件
 * 扩展至text-field控件
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.TextHidden = TjUI.extend(js.base.fn,{
    extends: new TjUI.form.tools.TextField(),
    props: {
        type: {
            type: String,
            default: 'hidden'
        }
    },
    computed:{
        fieldType(){
            return 'hidden'
        }
    }
})