/**
 * panel面板组件
 * panel面板为border布局
 */
import layoutComponents from '../layout'
import {isArray,isEmptyObject} from '../helper/tools'

TjUI.ns('TjUI.panel')
TjUI.panel.Panel = TjUI.extend(js.base.fn,{
    initComponent: function(){
        //初始化组件
        this['components'] = {
            'tj-tbar': new TjUI.panel.tbar.Tbar(),
            'tj-bbar': new TjUI.panel.bbar.Bbar(),
        }
    },
    inheritAttrs: false,
    //将当前panel的依赖注入到panel的任何直接后代组件中
    provide: function () {
        return {
            getPanel: this
        }
    },
    props: {
        /* 公用参数 */
        userWidth: {
            type: String,
            default: 'auto'
        },
        userHeight: {
            type: String,
            default: '100%'
        },
        userBorder: {
            type: Boolean,
            default: false,
        },
        userHtml: {
            type: String,
            default: ''
        },
        userStyle: {
            type: Object,
            default(){
                return {}
            }
        },
        /* 列布局 */
        columnWidth: {
            type: Number,
            default: 0,
            validator(value) {
                //区间0-1之间，按比例划分整个panel
                return value<=1 ? true : false
            }
        },
        /* 绝对定位布局 */
        userX: {
            type: String,
            default: ''
        },
        userY: {
            type: String,
            default: ''
        },
        /* 栅格布局 */
        userCols: {
            type: Number,
            default: 1,
            validator(value) {
                //区间1-12之间，按比例划分整个panel
                return (value<=12 && value>=1) ? true : false
            }
        },
        /* table表格布局 */
        userColspan: {
            type: Number,
            default: 1
        }
    },
    data(){
        return {
            you: 'panel',
            layout: null,           //布局 layout目录中的布局类型
            layoutConfig: {},       //选定好layout布局后，其相应的配置属性就在这个对象上进行设置。（即与layout配置联合使用）
            defaults: {},           //应用在全体组件上的配置项对象（无论组件是由何时加入，具体参数请看对应布局）
            tbar: [],               //顶部工具栏
            bbar: [],               //底部工具栏
            tbarLink: `link-tbar-${this._uid}`,//顶部工具栏link 
            bbarLink: `link-bbar-${this._uid}`,//底部工具栏link
            buttons: [],            //在面板底部按钮栏加入按钮 [{text:'name'},...]
            buttonAlign: 'right',   //按钮栏按钮的对齐方式 left/center/right
            hElement: null,         //渲染函数对象h
            childElement: [],       //content内容面板子组件元素
            tbarChildElement: [],   //tbar面板子组件元素
            bbarChildElement: [],   //bbar面板子组件元素
            userRef: `panel-${this._uid}-${Math.ceil(Math.random()*100)}`,  //组件指针 ref属性
            hidden: false,          //渲染该组件为隐藏状态
            width: this.userWidth,  //面板宽度
            height: this.userHeight,//高度
            border: this.userBorder,//边框 Boolean true/false
            html: this.userHtml,    //panel面板内容支持html标签 String
            baseCls: `panel-${this._uid}-cls`,  //作用在面板元素上的CSS样式类
            contentCls: `panel-content-${this._uid}-cls`,   //作用在面板元素内容区域上的css样式类
            childs: [],             //直属childs组件，不包含孙子组件（外部需要延时获取否则组件还未创建完成）
            /* 列布局 */
            /* 绝对定位布局 */
            x: this.userX,          //left px
            y: this.userY,          //top px
            //事件
            events: {
                //面板点击事件
                click: 'panelClick',
                //面板上的所有组件渲染结束，只触发一次
                finishRender: 'finishRender',
                /**
                 * 数据更改导致的虚拟 DOM 重新渲染之后触发，(实时触发)
                 * 如果内部没有子组件绘制将不触发，请用finishRender事件来监听panel绘制
                 */
                updateRender: 'updateRender',
                //在实例创建完成后被立即调用。
                created: 'created',
                //实例销毁之前调用。在这一步，实例仍然完全可用。
                beforeDestroy: 'beforeDestroy',
                //Vue 实例销毁后调用。
                destroyed: 'destroyed',
            },
            //panel内部参数
        }
    },
    watch: {
        columnWidth: {
            handler(val, oldVal) {
                if(val>0 && val<=1){
                    this.width = `${val*100}%`
                }
            },
            immediate: true
        }
    },
    created(){
        this.$emit(this.events.created,this)
    },
    mounted(){
        this.initBottomButtonBar()
    },
    updated(){
        /**
         * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
         * 如果需要监听整个面板绘制完成，请监听mounted中的finishRender函数
         */
        this.$emit(this.events.updateRender,this)
        this.$nextTick(() => {
            setTimeout(() => {
                if(!this.childElement.length){
                    //如果panel面板内容为空，可以在这里添加额外的处理
                }
                this.$emit(this.events.finishRender,this)
            }, 0)
        })
    },
    beforeDestroy(){
        //实例销毁之前调用
        this.$emit(this.events.beforeDestroy,this)
    },
    destroyed(){
        //Vue 实例销毁后调用
        this.$emit(this.events.destroyed,this)
    },
    methods: {
        //添加content内容面板
        add(panel){
            if(isArray(panel)){
                panel.forEach(element => {
                    element['uuid'] = `${this._uid}-${Math.ceil(Math.random()*1000)}`
                    !('props' in element) && (element['props'] = {});
                    if('userHtml' in element['props']){
                        element['domProps'] = {...element['domProps'],...{innerHTML: element.props.userHtml}}
                    }
                    this.childElement.push(this.hElement(element['component'],element,('children' in element) ? element['children'] : []))
                });
                return
            }
            panel['uuid'] = `${this._uid}-panel-${Math.ceil(Math.random()*1000)}`; //组件uuid
            !('props' in panel) && (panel['props'] = {});
            if('userHtml' in panel['props']){
                panel['domProps'] = {...panel['domProps'],...{innerHTML: panel.props.userHtml}}
            }
            this.childElement.push(this.hElement(panel['component'],panel,('children' in panel) ? panel['children'] : []))
        },
        //添加顶部工具栏
        addTbar(bar){
            if(!('component' in bar) || bar['component'] ===null || typeof bar['component'] !== 'object') return;
            bar['component']['uuid'] = `${this._uid}-tbar-${Math.ceil(Math.random()*1000)}`; //组件uuid
            this.tbarChildElement.push(this.hElement(bar['component'],bar))
        },
        //添加底部工具栏
        addBbar(bar){
            if(!('component' in bar) || bar['component'] ===null || typeof bar['component'] !== 'object') return;
            bar['component']['uuid'] = `${this._uid}-bbar-${Math.ceil(Math.random()*1000)}`; //组件uuid
            this.bbarChildElement.splice(this.bbarChildElement.length-1,0,this.hElement(bar['component'],bar))
        },
        //添加底部按钮栏
        initBottomButtonBar(){
            if(!this.buttons.length) return;
            let bar = {
                component: new TjUI.toolBar.ToolBar(),
                userItems: [...this.buttons],
                userButtonAlign: this.buttonAlign
            }
            if(!('component' in bar) && typeof bar['component'] !== 'object') return;
            this.bbarChildElement.push(this.hElement(bar['component'],{props: {...bar}}))
        },
        //移除content内容面板
        remove(panel){
            this.childElement = this.childElement.filter(child=>{
                return child.data.uuid !== panel.uuid
            })
        },
        //移除顶部工具栏
        removeTbar(tbar){
            let tbars = this.tbarChildElement.filter(child=>{
                return child.data.component.uuid !== tbar.uuid
            })
            this.tbarChildElement.splice(0,this.tbarChildElement.length,...tbars)
        },
        //移除底部工具栏
        removeBbar(bbar){
            let bbars = []
            for (let child of this.bbarChildElement.values()) {
                if('component' in child.data){
                    (child.data.component.uuid !== bbar.uuid) && (bbars.push(child))
                    continue
                }
                bbars.push(child)
            }
            this.bbarChildElement.splice(0,this.bbarChildElement.length,...bbars)
        },
        //在此容器之下由id查找子组件 此方法已被getLinkComponent()替代
        /* findById(id){
            return this.childElement.filter(child=>{
                return child.data.props.pid === id
            })[0]
        }, */
        //返回组件本身
        getPanel(){
            return this
        },
        //返回所属的HTML element
        getEl(){
            return this.$refs[this.userRef].$el
        },
        //返回面板顶部区域的工具条 Array
        getTbar(){
            return this.getLinkComponent(this.tbarLink).$children
        },
        //返回面板底部区域的工具条 Array
        getBbar(){
            return this.getLinkComponent(this.bbarLink).$children
        },
        //组件所在的HTML元素的可视宽度
        getWidth(){
            return this.$refs[this.userRef].$el.offsetWidth
        },
        //组件所在的HTML元素的可视高度
        getHeight(){
            return this.$refs[this.userRef].$el.offsetHeight
        },
        //获取直接的子组件，不包含孙子组件
        getChilds(){
            return this.childs
        },
        //显示panel
        show(){
            this.hidden = ''
        },
        //隐藏panel
        hide(){
            this.hidden = 'none'
        },
        //获取布局组件
        getLayoutComponent(){
            return layoutComponents[this.layout]
        },
        //渲染主content区域
        renderMainContent(){
            //content内容面板
            let renderChildElement = ()=>{
                //...
                return this.childElement
            }
            //DOM 属性
            let domProps = () => {
                let b = {};
                (!!this.html && this.html.length) && (b = {...b,...{domProps: {innerHTML: this.html}}});
                return b
            }
            return this.hElement(
                this.getLayoutComponent(),
                {
                    slot: 'center',
                    ...domProps(),
                    'class': {
                        [this.contentCls]: true
                    },
                    props: {
                        ...this.$data
                    },
                    scopedSlots: {
                        /**
                         * 作用域插槽暂
                         * （name='context-slot'，不要命名为'default'防止和默认插槽名称冲突）
                         * 使用在了 tjGrid栅格组件、tjTable表格组件中
                         */
                        'context-slot': function(props) {
                            return props.component
                        }
                    }
                },
                this.childElement)
        }
    },
    render(h){
        this.hElement = h
        //顶部工具栏  这里如果'tj-tbar'组件是通过 new TjUI.panel.tbar.Tbar()生成则Vue.mixin全局混入将无法执行
        let tbar = h('tj-tbar',{slot: 'north',props: {link: this.tbarLink,childElement: this.tbarChildElement}})
        //主面板
        let content = this.renderMainContent()
        //底部工具栏
        let bbar = h('tj-bbar',{slot: 'south',props: {link: this.bbarLink,childElement: this.bbarChildElement}})
        return h(
            layoutComponents['border'],
            {
                ref: this.userRef,
                'class': {
                    [this.baseCls]: true
                },
                style: {
                    // display: this.display,
                    display: this.hidden ? 'none' : '',
                    width: this.width,
                    height: this.height,
                    border: this.border?'1px solid #BEBEBF':'',
                    top: this.y,
                    left: this.x,
                    ...this.userStyle
                },
                nativeOn: {
                    click: (event)=>{
                        this.$emit(this.events.click,event)
                        event.stopPropagation() 
                        return false
                    }
                }
            },
            function(){
                let childs = []
                this.tbarChildElement.length && childs.push(tbar)
                childs.push(content)
                this.bbarChildElement.length && childs.push(bbar)
                return childs
            }.call(this)
        )
    }
})