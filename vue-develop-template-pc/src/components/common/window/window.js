/**
 * 窗口详情
 * 其它组件可以继承window.js，修改内部实现
 */
const Window = {
    inject: ['getPanel','getMainGrid','getWindow'],
    props: ['detail'],
    data(){
        return {
            detailLink: `link-window-detail-${this._uid}`
        }
    },
    mounted(){
        this.getWindow.on(this.getWindow.events.doAfterLayout,this.doLayout)
    },
    methods: {
        doLayout(){
            // 重新绘制
        }
    },
    render(h){
        return h(this.detail,
            {
                props: {
                    link: this.detailLink,
                    mainPanel: this.getPanel,
                    mainGrid: this.getMainGrid,
                    window: this.getWindow
                }
            }
        )
    }
}
export default Window