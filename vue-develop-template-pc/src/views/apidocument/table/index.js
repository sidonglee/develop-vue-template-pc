/**
 * table布局
 */
const Table = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'tjTable',
            layoutConfig: {columns:3},
            defaults: {width: '200px', height: '130px',border: true,gutter: '10px'},
            buttons: [
                {text: '提交',listeners: {
                    click: ()=>{
                        //console.info('doSave ',this.you);
                    }
                }},
                {text: '取消'}
            ],
            buttonAlign: 'right'
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            let panelOne = {
                component: new TjUI.panel.Panel(),
                props: {
                    userColspan: 1,
                    userRowspan: 2,
                    userHtml: 'item 1',
                }
            }
            let panelTwo = {
                component: new TjUI.panel.Panel(),
                props: {
                    //userColspan: 1,
                    userHtml: 'item 2',
                }
            }
            let panel2 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userColspan: 1,
                    userHtml: 'item 3',
                }
            }
            let panel3 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userColspan: 3,
                    userHtml: 'item 3',
                }
            }
            let panel4 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userColspan: 1,
                    userHtml: 'item 3',
                }
            }
            let panel5 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userColspan: 2,
                    userHtml: 'item 3',
                }
            }
            this.add([panelOne,panelTwo,panel2,panel3,panel4,panel5])
        }
    }
}
export default Table