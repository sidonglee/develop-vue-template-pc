/**
 * 双飞翼布局
 */
const DoubleWing = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'doubleWing',
            height: '100px',
            border: false,
            //html: '<em>查看查看</em>',
        }
    },
    mounted(){
        this.createPanel()
    },
    methods: {
        createPanel(){
            let leftPanel = {
                component: new TjUI.panel.Panel(),
                props: {
                    userWidth: '176px',
                    userHtml: 'left面板'
                },
                slot: 'left'
            }
            let centerPanel = {
                component: new TjUI.panel.Panel(),
                style: {
                    'background-color': '#1BA162'
                },
                props: {
                    userHtml: '<em>内容展示</em>'
                },
                slot: 'main',
            }
            let rightPanel = {
                component: new TjUI.panel.Panel(),
                props: {
                    userWidth: '160px',
                    userHtml: 'right面板'
                },
                slot: 'right'
            }
            //this.add([leftPanel,centerPanel,rightPanel])
            this.add(leftPanel)
            this.add(centerPanel)
            this.add(rightPanel)
        }
    }
}
export default DoubleWing