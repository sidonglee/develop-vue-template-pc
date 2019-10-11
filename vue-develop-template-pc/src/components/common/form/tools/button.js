/**
 * 饿了么 Button 按钮
 * authority: true form表单使用Button时设置(结合plugins/authority.js) 'authority' 表示权限过滤 true 需要权限过滤 不设置/false 不用权限过滤
 * {span: 2,name: 'uploadbidsfile',authority: false,type: 'Button',text: '查看付款凭证',label:'付款凭证'}
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.Button = TjUI.extend(js.base.fn,{
    inheritAttrs:false,
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
        size: {
            type: String,
            default: 'small'
        },
        //自定义样式 用于覆盖style标签
        userStyle: {
            type: Object,
            default(){
                return {}
            }
        },
        //按钮图标
        icon: String,
        //按钮图标位置  'left/right'
        iconPosition: {
            type: String,
            default: 'left'
        },
        //是否禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        //按钮处理事件
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        //是否渲染节点 v-if
        isRender: {
            type: Boolean,
            default: true
        },
    },
    data(){
        return {
            currentIcon: this.icon,
            curDisabled: this.disabled,
            //自定义事件
			events: {
				afterClickHandler: 'afterClickHandler'	//点击事件之后
			}
        }
    },
    computed: {},
    watch: {
        disabled(val, oldVal){
            this.curDisabled = val
        }
    },
    mounted(){},
    methods: {
        setDisabled(status=true){
            this.curDisabled = status
        },
        //点击事件
        nativeClickHandler(event){
            ('click' in this.listeners) && (this.listeners.click(event));
            this.$emit(this.events.afterClickHandler,event)
        },
        //solt child
        childSoltElements(h){
            let child = [this.text]
            if(this.iconPosition==='right'){
                child.push(h('li',{
                    'class': {
                        [this.icon]: true,
                        'el-icon--right': true
                    }
                }))
            }
            return child
        }
    },
    render(h){
        if(!this.isRender){
            return h(null)
        }else{
            return h('el-button',{
                style: {
                    //按钮宽度
                    width: `${this.width}px`
                },
                attrs: {
                    id: this.id,
                    name: this.name,
                    group: this.toggleGroup,
                },
                props: {
                    size: this.size,  //按钮尺寸
                    type: this.grade,
                    disabled: this.curDisabled,
                    icon: (this.iconPosition==='right') ? '' : this.icon,
                },
                nativeOn: {
                    //原生点击事件
                    click: this.nativeClickHandler
                },
            },this.childSoltElements(h))
        }
        
    }
})