/**
 * 列布局
 */
const Column = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'column'
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
                    columnWidth: 0.2,
                    userBorder: true,
                },
                style: {
                    'background-color':'#81AFFA'
                }
            }
            let panelTwo = {
                component: new TjUI.panel.Panel(),
                props: {
                    columnWidth: 0.4,
                    userBorder: true,
                },
                style: {
                    'background-color':'#1BA160'
                }
            }
            this.add(panelOne)
            this.add(panelTwo)
        }
    }
}
export default Column