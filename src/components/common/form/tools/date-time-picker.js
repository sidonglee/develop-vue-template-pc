/**
 * 饿了么日期时间选择组件
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.DateTimePicker = TjUI.extend(js.base.fn,{
    //继承日期控件
    extends: new TjUI.form.tools.DatePicker(),
    props: {
        //类型设置为日期时间
        showType: {
            type: String,
            default: 'datetime'
        },
        //时间格式
        format: {
            type: String,
            default: 'yyyy-MM-dd HH:mm:ss'
        }
    }
})