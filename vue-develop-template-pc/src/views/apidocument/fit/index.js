/**
 * fit布局
 */
const Fit = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'fit'
        }
    },
    mounted(){
        this.initPanel()
        this.registerEvents()
    },
    methods: {
        initPanel(){
            let panelOne = {
                component: new TjUI.panel.ux.iframe.Iframe(),
                props: {
                    userBorder: false,
                    userSrc: 'https://cn.vuejs.org/',
                },
                on: {
                    load: ()=>{
                        console.info('aaaaaaaaaaaaa');
                    },
                    finishRender: ()=>{
                        console.info('bbbbbbbbbbbb');
                    },
                    updateRender: ()=>{
                        console.info('cccccccccccc');
                    },
                    beforeDestroy: ()=>{
                        console.info('ddddddddddd');
                    }
                }
            }
            this.add(panelOne)
        },
        registerEvents(){
            this.$on('finishRender',()=>{
                console.info('渲染结束');
            })
            this.$on('updateRender',()=>{
                console.info('节点更新结束');
            })
        }
    }
}
export default Fit