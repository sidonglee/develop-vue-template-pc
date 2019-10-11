/**
 * vue组件获取其它组件实例插件 （无视组件层级、子孙关系），主要为了方便父组件->孙子组件
 * 在孙子组件中混入props自定义属性'link'，同名link无法添加入集合
 * 混入后的组件中通过调用getLinkComponent(linkId)传入各个组件中的自定义link值获取组件实例this
 */
const Link = {
    install: (Vue, options={name: 'link'}) => {
        //console.info('vue组件通信插件',this.$options);
        const m = new Map();
        // 全局混入
        Vue.mixin({
            props: {
                [options.name]: {
                    type: String,
                    default: ''
                }
            },
            created() {
                let us = this[options.name]
                if (us && us.length && !m.has(us)) {
                    m.set(us,this)
                }
            },
            beforeDestroy(){
                let us = this[options.name]
                if(us && us.length && m.has(us)){
                    m.delete(us)
                }
            },
            methods: {
                //获取link指向的对象
                getLinkComponent(linkId){
                    return m.has(linkId) ? m.get(linkId) : null
                },
                //判断link指向的对象是否存在
                isHaveLink(linkId){
                    return m.has(linkId)
                },
                //清除指定link指向的对象
                clearLinkComponent(linkId){
                    if(m.has(linkId)){
                        m.delete(linkId)
                    }
                }
            }
        })
    }
}
export default Link
