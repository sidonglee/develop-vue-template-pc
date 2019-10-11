/**
 * 自定义事件总线(bus 巴士事件) 插件
 * 使用一个空的 Vue 实例作为事件总线
 * 注册的事件需要手动移除,防止发生内存泄露和重复注册 once的事件不需要调用off()
 * ps: 大部分业务需求通过vuex维护状态就能解决,注册全局需要操控视图层的事件可以使用vbus
 * 或者views和components交互可以使用vbus,非父子组件之间的通信可以使用vbus
 * GLOBAL.$vbus.on('user.rowClick',this.myhandle) 绑定
 * GLOBAL.$vbus.emit('user.rowClick',{}); 触发
 */
import vbus from '../service/vbus'
import {EVENTS_DEFAULT_CONFIG} from '../config'
import _hasIn from 'lodash/hasIn'

class MakeVbus{
    constructor(options){
        this.events = {}
        //自动导入配置的事件列表
        this.eventsBuilder(options)
    }
    eventsBuilder(config){
        Object.keys(config).map(namespace => {
            this._pushEvent({
                namespace,
                config: [config[namespace]]
            });
        })
    }
    _pushEvent({
        namespace = '',
        seq = EVENTS_DEFAULT_CONFIG.sep,
        config = {}
    }){
        config.forEach(element => {
            let {name,events} = element
            Object.keys(events).map(key => {
                let eventname = `${namespace}${seq}${key}`
                this.events[eventname] = null;
            })
        });
    }

    //注册 在当前页面hook处于 'beforeDestroy' 时,需要明确调用off方法移除事件
    on(name,handler){
        if(this.events[name]!=null){
            throw new Error(`pleace remove ${name} event`);
            return
        }
        if(_hasIn(this.events,name) && this.events[name]==null){
            GLOBAL.vbus.$on(name,handler)
            this.events[name] = handler
        }
    }
    //注册一次 不需要调用off销毁
    once(name,handler){
        GLOBAL.vbus.$once(name,handler)
    }
    /**
     * 移除 注册事件必须显示调用off()进行移除
     * 推荐在页面/组件 beforeDestroy()方法执行
     */
    off(name){
        GLOBAL.vbus.$off(name, this.events[name])
        if(_hasIn(this.events,name)){
            this.events[name] = null;
        }
    }
    /**
     * 触发事件
     * 跨页面/组件触发事件 推荐在beforeDestroy()方法执行
     */
    emit(name,params){
        GLOBAL.vbus.$emit(name,params)
    }
}

export default new MakeVbus({
    ...vbus
})
