import api from './api'
import axios from 'axios'
import consts from './const'
import vbus from './vbus'
import {userStore} from './store'

// 需要挂载(注入)到根实例的都放在这里
export default {
    install: (Vue, options={}) => {
        if(!!options.store){
            userStore.init(options.store)
            Vue.prototype.$store = options.store
        }
        
        Vue.prototype.$api = api
        Vue.prototype.$axios = axios
        Vue.prototype.$const = consts
        Vue.prototype.$vbus = vbus

        GLOBAL.$api = api
        GLOBAL.$axios = axios
        GLOBAL.$vbus = vbus

        // 添加全局方法或属性
        Vue.myGlobalMethod = function(){
            // 逻辑...
        }
        // 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
        }
        // 添加全局混入 (为自定义对象注入处理逻辑)
        Vue.mixin({
            data(){
                return {}
            },
            beforeCreate(){
                //自定义事件，用于各个组件自身的多态扩展
                this.$emit('user-beforeCreate',this)
            },
            created(){
                this.$emit('user-created',this)
            },
            beforeMount(){
                this.$emit('user-beforeMount',this)
            },
            mounted(){
                // 逻辑...
                this.$emit('user-mounted',this)
                this.$nextTick(() => {
                    //当前组件绘制完成包括子组件只触发一次，如果要监听后期dom结构改变请监听 'user-updated'事件
                    this.$emit('user-finishRender',this)
                })
            },
            beforeUpdate(){
                this.$emit('user-beforeUpdate',this)
            },
            updated(){
                this.$emit('user-updated',this)
            },
            //activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。
            activated(){
                this.$emit('user-activated',this)
            },
            deactivated(){
                this.$emit('user-deactivated',this)
            },
            beforeDestroy(){
                this.$emit('user-beforeDestroy',this)
            },
            destroyed(){
                this.$emit('user-destroyed',this)
            },
            errorCaptured(){
                this.$emit('user-errorCaptured',this)
            }
        })
    }
}








