<template>
    <el-tabs :type="type" v-model="activeName" @tab-click="tabClick" :closable="closable" @tab-remove="removeTab" :class="tabCls">
        <el-tab-pane
            v-for="(tab) in editableTabs"
            :key="tab.name"
            :label="tab.title"
            :name="tab.name">
            <keep-alive :max="30">
                <template v-if="tab.name===activeName">
                    <component 
                        @created='handleUserCreated'
                        @user-mounted='handleUserMounted'
                        @user-updated='handleUserUpdated'
                        @user-activated='handleUserActivated'
                        @user-finishRender='handleUserFinishRender'
                        v-bind:is='currentTabComponent' 
                        v-bind='currentTabComponent.defaults'>
                    </component>
                </template>
            </keep-alive>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import home from '@/views/home'
import tjMenu from '../menu'
import {mapActions} from 'vuex'

export default {
    name: 'tjtabs-component',
    provide: function () {
        return {
            getPanel: this
        }
    },
    props: {
        //风格类型
        type: {
            type: String,
            default: 'border-card' //card/border-card
        },
        //是否需要首页
        isHome: {
            type: Boolean,
            default: true
        },
        //是否可关闭
        closable: {
            type: Boolean,
            default: true
        },
        //是否显示tab右键菜单栏
        isShowMenu: {
            type: Boolean,
            default: false
        },
        /**
         * 是否需要给每个新添加的tab页立即打开
         * false 只会打开第一个tab
         */
        isLinkActiveTab: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            components: [{name: 'home',component: home}],
            activeName: 'home',
            editableTabs: [{title: '首页',name: 'home',content: '首页',defaults: {}}],
            tabCls: `user-tab-content-cls${this._uid}`,
            ctxMenu: null,
            events: {
                tabClick: 'tabClick',    //tab 被选中时触发
                //动态组件生命周期事件，如果使用keep-alive每个动态组件的生命周期钩子函数只会触发一次
                component: {
                    'tab-component-created': 'tab-component-created',   //created钩子
                    'tab-component-mounted': 'tab-component-mounted',   //mounted钩子
                    'tab-component-updated': 'tab-component-updated',   //updated钩子
                    'tab-component-activated': 'tab-component-activated',       //activated钩子
                    'tab-component-finishRender': 'tab-component-finishRender', //updated nextTick后组件全部渲染完成
                }
            }
        }
    },
    computed: {
        //tab中对应的组件
        currentTabComponent(){
            let tab = this.components.find(o => {return o.name == this.activeName})
            if(!(!!tab.component)){
                return ()=>import('../error-page/not-found')
            }
            return tab.component
        }
    },
    beforeCreate: function () {
        this.$nextTick(function () {
            this.resizeTabPanelHeight()
        })
    },
    created(){
        if(!this.isHome){
            this.components = [],
            this.activeName = '',
            this.editableTabs = []
        }
    },
    mounted(){
        const that = this
        window.onresize = () => {
            return (() => {
                that.resizeTabPanelHeight()
            })()
        }
        this.isShowMenu && this.addContextMenuEvent()
    },
    methods: {
        //defaults 推荐在外部时设置在component对象上，防止出现对象引用指向同一个
        //component.defaults = {}
        addTab({title,name,defaults={}},component){
            // console.info( '添加标签页 ',title,name );
            let tab = this.editableTabs.filter((tab) => {
                return tab.name === name
            })[0]
            if(!!tab){
                this.activeName = tab.name
                return
            }
            this.editableTabs.push({title,name,defaults,content: ''})
            if(!('defaults' in component)){
                component['defaults'] = defaults
            }
            this.components.push({name,component})
            if(this.isLinkActiveTab){
                this.activeName = name
            }
            if(!this.isLinkActiveTab && this.editableTabs.length === 1){
                this.activeName = name
            }
            //vuex设置当前激活的tab页
            this['module/handle_moduleId'](component.defaults)
        },
        removeTab(targetName){
            if(targetName==='home'){
                return
            }
            let tabs = this.editableTabs
            let components = this.components
            let activeName = this.activeName

            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            this.components = components.filter(component => component.name !== targetName)
            this.activeName = this.editableTabs[this.editableTabs.length-1].name
        },
        //tab 被选中时触发
        tabClick(tab){
            this.activeName = tab.name
            this.$emit(this.events.tabClick, tab)
        },
        //关闭所有标签页
        closeAllTab(){
            let tabs = this.editableTabs
            let components = this.components
            let activeName = this.activeName

            this.editableTabs = tabs.filter(tab => tab.name === (this.isHome ? 'home': ''));
            this.components = components.filter(component => component.name === (this.isHome ? 'home': ''))
            this.activeName = this.isHome ? 'home': ''
        },
        //获取打开的tab vNode
        getOpenTab(){
            let tab = this.$children[0].$children.filter((tab)=>{
                return tab.name === this.activeName
            })
            return tab.length ? tab[0].$children[0] : null
        },
        //获取tabs vnode
        getTabs(){
            return this.$children[0].$children.filter((tab)=>{
                return this.editableTabs.find((vchild)=>vchild.name === tab.name)
            })
        },
        //tab页是否存在
        isOpenTab(name){
            return !!(this.editableTabs.find((tab) => tab.name === this.activeName)) ? true : false
            //return this.editableTabs.filter((tab) => tab.name === name)
        },
        //打开某个标签页
        setActiveName(name){
            this.activeName = name
        },
        resizeTabPanelHeight(){
            let tab = this.$el.offsetHeight
            let header = this.$el.childNodes[0].offsetHeight
            this.$el.childNodes[1].style.height = tab-header-1+'px'
        },
        addContextMenuEvent(){
            document.querySelector(`.${this.tabCls} .el-tabs__nav-scroll`).childNodes[0].oncontextmenu = function(e){
                e.preventDefault();
            };
            document.querySelector(`.${this.tabCls} .el-tabs__nav-scroll`).childNodes[0].onmouseup = function(oEvent){
                if (!oEvent) oEvent=window.event;
                if(this.ctxMenu != null){
                    this.ctxMenu.removeMenuNode()
                    this.ctxMenu = null
                }
                if (oEvent.button==2) {
                    if(this.ctxMenu==null){
                        this.ctxMenu = new tjMenu()
                    }
                    this.ctxMenu.add([{text: '关闭所有标签',listeners: {click: this.closeAllTab}}])
                    this.ctxMenu.showAt(oEvent.pageX,oEvent.pageY)
                }
            }.bind(this)
        },
        //tab内部组件执行至 ‘created’钩子函数时触发自定义事件user-created，通知外部组件
        handleUserCreated(component){
            component.$emit(this.events.component['tab-component-created'],component)
        },
        //tab内部组件执行至 ‘mounted’钩子函数时触发自定义事件user-mounted，通知外部组件
        handleUserMounted(component){
            component.$emit(this.events.component['tab-component-mounted'],component)
        },
        //tab内部组件执行至 ‘updated’钩子函数时触发自定义事件user-updated，通知外部组件
        handleUserUpdated(component){
            component.$emit(this.events.component['tab-component-updated'],component)
        },
        //tab内部组件执行至 ‘activated’钩子函数时触发，组件被激活并表示渲染结束在 'finishRender' 事件之前 触发多次
        handleUserActivated(component){
            component.$emit(this.events.component['tab-component-activated'],component)
        },
        //tab内部组件执行至 ‘updated’钩子函数时$nextTick之后触发，组件渲染结束 只触发一次
        handleUserFinishRender(component){
            component.$emit(this.events.component['tab-component-finishRender'],component)
        },
        ...mapActions([
            'module/handle_moduleId'
        ])
    }
}
</script>
<style>
    .el-tabs__content{
        padding: 0px !important;
    }
    .el-tabs__header{
        margin: 0px;
        /* border-top: 1px solid #e4e7ed; */
    }
    .el-tab-pane{
        height: 100%;
        overflow-y: auto;
    }
    .el-tabs--border-card{
        border: 0px !important;
    }
</style>
