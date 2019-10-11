/**
 * 工具栏组件
 * 默认table布局，每个工具组件是一列，传入的bar是一行
 * 不能添加panel，只能添加tools工具组件
 */
TjUI.ns('TjUI.toolBar')
TjUI.toolBar.ToolBar = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //来至父组件的依赖，注入到ToolBar中
    inject: ['getPanel'],
    props: {
        //自定义样式
        userBarStyle: {
            type: Object,
            default(){
                return {}
            }
        },
        userItems: {
            type: Array,
            default(){
                return []
            }
        },
        userDefault: {
            type: Object,
            default(){
                return {}
            }
        },
        userButtonAlign: {
            type: String,
            default: 'left'
        }
    },
    data(){
        return {
            //子组件元素
            items: this.userItems,
            //自定义样式 用于覆盖style标签
            userStyle: this.userBarStyle,
            //应用在全体tools组件上的配置项对象
            default: this.userDefault,
            //按钮对其方式 left/center/right 默认left
            buttonAlign: this.userButtonAlign,
            //渲染函数对象h
            hElement: null,
            //组件指针 ref属性
            userRef: `tool-bar-${this._uid}-${Math.ceil(Math.random()*100)}`,
        }
    },
    computed: {
        itemStyle(){
            let style = {
                width: 'auto',
                height: 'auto',
                margin: '0px 5px 0px',
            }
            return {style,...this.default}
        },
        tjButton(){
            return new TjUI.form.tools.Button()
        },
        tjFileBox(){
            return new TjUI.form.tools.FileBox()
        },
        tjSwitchButton(){
            return new TjUI.form.tools.SwitchButton()
        },
        tjRadio(){
            return new TjUI.form.tools.Radio()
        },
        tjCheckBox(){
            return new TjUI.form.tools.Checkbox()
        },
        tjRadioBtnGroup(){
            return new TjUI.form.tools.RadioBtnGroup()
        },
    },
    methods: {
        //获取对应的工具组件 默认按钮
        getToolComponent(type='Button'){
            // return (TjUI.form.tools[type]!=void(0)) ? new TjUI.form.tools[type](): null;
            return this[`tj${type}`]
        },
        //获取当前ToolBar的所有items
        getItems(){
            return this.$children
        }
    },
    render(h){
        //根据传入的items构建bar
        let bar = []
        this.items.forEach((row ,index) => {
            bar.push(h(this.getToolComponent(row['type']),{style: this.itemStyle.style+';'+row.style||'',props: this.items[index]}))
        })
        //清除浮动带来的影响
        bar.push(h('div',{style:{'clear':'both'}}))
        return h(
            'div',
            {
                style: {
                    padding: '3px',
                    'text-align': this.buttonAlign,
                    ...this.userStyle,
                },
            },
            bar)
    }
})