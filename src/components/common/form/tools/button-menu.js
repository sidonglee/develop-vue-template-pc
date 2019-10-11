/**
 * 饿了么 Dropdown 下拉按钮菜单
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.ButtonMenu = TjUI.extend(js.base.fn,{
    initComponent(){
        this['components'] = {
            'user-button': new TjUI.form.tools.Button()
        }
    },
    inheritAttrs: false,
    props: {
        id: String,
        name: String,   //html原生属性 id和name
        width: Number,
        //按钮文字
        text: {
            type: String,
            default: 'Button'
        },
        //风格 primary / success / warning / danger / info / text
        grade: {
            type: String,
            default: 'primary'
        },
        //按钮组
        menu: {
            type: Array,
            default(){
                /* return [{id:'upload',text: '上传文件',listeners: {
                    click: (event)=>{
                        console.info( event );
                    }
                }},{id:'down',text: '下载打印'}] */
                return []
            }
        }
    },
    methods: {
        createChildNode(h){
            let items = []
            this.menu.forEach(menu => {
                !('listeners' in menu) && (menu.listeners = {});
                items.push(h('el-dropdown-item',{
                    attrs: {
                        id: menu.id
                    },
                    nativeOn: {
                        click: (event)=>{
                            ('click' in menu.listeners) && (menu.listeners.click(event));
                        }
                    }
                },[menu.text]))
            });
            return h('el-dropdown-menu',{slot: 'dropdown',},items)
        }
    },
    render(h){
        return h(
            'el-dropdown',
            {
                style: {
                    width: `${this.width}px`
                },
                attrs: {
                    id: this.id,
                    name: this.name,
                },
                props: {
                    size: 'small',
                }
            },
            [
                h('user-button',{
                    props: {
                        text: this.text,
                        type: this.grade,
                        icon: 'el-icon-arrow-down',
				        iconPosition: 'right',
                    }
                }),
                this.createChildNode(h)
            ]
        )
    }
})