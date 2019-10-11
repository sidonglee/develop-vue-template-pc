/**
 * 饿了么 input password密码控件
 * 扩展至text-field控件
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.TextPassword = TjUI.extend(js.base.fn,{
    extends: new TjUI.form.tools.TextField(),
    props: {
        type: {
            type: String,
            default: 'password'
        }
    },
    computed:{
        fieldType(){
            return 'password'
        }
    }
})