/**
 * panel顶部工具栏
 * 根据childElement传入的vNode虚拟节点数组构建多行bar
 * 理论上可以接收任何组件
 */
TjUI.ns('TjUI.panel.tbar')
TjUI.panel.tbar.Tbar = TjUI.extend(js.base.fn,{
    inject: ['getPanel'],
    provide: function () {
        return {
            getTopBar: this
        }
    },
    props: {
        childElement: {
            type: Array,
            default(){
                return ['顶部工具栏']
            }
        }
    },
    data(){
        return {
            bb: '顶部工具栏'
        }
    },
    computed: {
        curChildElement(){
            return [...this.childElement]
        }
    },
    methods: {},
    render(h){
        //构建工具栏
        let rowsBar = []
        this.curChildElement.forEach(row => {
            rowsBar.push(row)
        });
        return h('div',rowsBar)
    }
})