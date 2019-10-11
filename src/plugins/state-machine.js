/**
 * 自定义有限状态机
 * 用户行为和组件行为的逻辑完全分离
 * 1：有限的state   2：可以从一种state转移另一种state   3：同一时间只能处于一种state
 * 确保你最终总是解决（或拒绝）你的Promise，否则状态机将永远停留在那个挂起的转换中
 * http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html
 * https://github.com/yhanwen/fsm
 * this.fsm = new stateMachine()
 * this.fsm.create({
 *      initial: 'normal', //初始状态（initial）为normal （登录状态为‘普通’）
 *      events: [          //events属性是触发状态改变的各种事件
 *          {name: 'login',from: 'normal',to: 'logined'},
 *          {name: 'quit',from: 'logined',to: 'normal'}
 *      ]
 * })
 * this.fsm.on('onbeforelogin',()=>{})
 * this.fsm.on('onleavenormal',()=>{
 *  //如果是异步必须返回异步对象，并确保你最终总是解决（或拒绝）你的Promise
 *  return new Promise((resolve, reject)=>{
 *      resolve()
 * })
 * })
 * this.fsm.on('onenterlogined',()=>{})
 * this.fsm.on('onafterlogin',()=>{})
 */
import {isFunction,isArray} from '@/utils/tools'

class StateMachine{
    constructor(){
        this.currentState = undefined  //初始状态
        this.allEvents = []
        this.lock = false       //锁
    }
    create(params={initial:'',events:[]}){
        this.currentState = params.initial
        this.allEvents = params.events
        let states = new Set();
        let _this = this;
        //events中的事件 （每个事件指定两个回调函数，每个状态指定两个回调函数）
        (params.events).forEach(event=>{
            if(!(event.name in this)){
                //添加两个事件回调函数
                this[`onbefore${event.name}`] = ()=>{
                    return this[`onbefore${event.name}`].handler()
                }
                this[`onbefore${event.name}`].handler = function(){}
                this[`onafter${event.name}`] = (result)=>{
                    return this[`onafter${event.name}`].handler(result)
                }
                this[`onafter${event.name}`].handler = function(){}
                //添加状态
                states.add(event.from)
                states.add(event.to)
                //事件event.name对应的处理函数（流程执行过程）
                this[event.name] = ()=>{
                    const p = new Promise(function (resolve, reject) {
                        let func = _this[`onbefore${event.name}`].call(_this)
                        if(!(func instanceof Promise)){
                            return resolve(func)
                        }
                        return func.then((result)=>{
                            resolve(result)
                        })
                    }).then((result)=>{
                        let func = this[`onleave${event.from}`].call(this,result)
                        if(!(func instanceof Promise)){
                            return Promise.resolve(func)
                        }
                        return func
                    },(error)=>{
                        console.warn(`onleave ${event.name}${error}`);
                    }).then((result)=>{
                        let func = this[`onenter${event.to}`].call(this,result)
                        if(!(func instanceof Promise)){
                            return Promise.resolve(func)
                        }
                        return func
                    },(error)=>{
                        console.warn(`onenter ${event.name}${error}`);
                    }).then((result)=>{
                        let func = this[`onafter${event.name}`].call(this,result)
                        if(!(func instanceof Promise)){
                            return Promise.resolve(func)
                        }
                        return func
                    },(error)=>{
                        console.warn(`onafter ${event.name}${error}`);
                    }).then((result)=>{
                        //流程正确结束，修改转换的状态
                        //释放锁
                        this.currentState = event.to
                        this.lock = false
                        console.info('transation finish',this.currentState);
                    },(error)=>{
                        this.lock = false
                        console.warn(error);
                    })
                    /* this[`onbefore${event.name}`].call(this)    //在xx事件发生之前触发  1
                    this[`onleave${event.from}`].call(this)     //在离开xx状态时触发    2
                    this[`onenter${event.to}`].call(this)       //在进入xx状态时触发    3
                    this[`onafter${event.name}`].call(this)     //在xx事件发生之后触发  4 */
                }
            }
        })
        //添加两个状态回调函数
        for (let stateKey of states.keys()) {
            this[`onleave${stateKey}`] = (result)=>{
                return this[`onleave${stateKey}`].handler(result)
            }
            this[`onleave${stateKey}`].handler = function(){}
            this[`onenter${stateKey}`] = (result)=>{
                return this[`onenter${stateKey}`].handler(result)
            }
            this[`onenter${stateKey}`].handler = function(){}
        }
        // return this
    }
    //状态转换 （一种状态过渡到另一种状态）
    //触发对应event.name的函数
    transition(event){
        if(this.lock){
            console.warn('state is transitioning');
            return false
        }
        if(!this.can(event)){
            console.warn('state not transition event');
            return false
        }
        if(event && event.length && !!this[event]){
            this.lock = true
            this[event].call(this)
        }else{
            console.warn('event is undefind');
        }
    }
    on(name,func){
        if(name && !!this[name]){
            this[name].handler = isFunction(func) ? func : ()=>{}
        }
    }
    //状态s是否为当前状态
    is(s){
        return s === this.currentState
    }
    //事件e是否能在当前状态触发
    can(e){
        let b = this.allEvents.find(event=>{
            return event.name === e
        })
        if(!('from' in b)) return false;
        if(b.from !== this.currentState) return false;
        return true
    }
    error(){

    }
}
export default StateMachine