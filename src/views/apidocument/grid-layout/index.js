/**
 * grid栅格布局
 */
import childPanel from './child'

const Grid = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'grid',
            border: true,
            defaults: {
                gutter: '5px'
            },
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            let panelTem = {
                component: childPanel,
                props: {
                    userCols: 5,
                    /* border: true,
                    userHeight: '100px',
                    userHtml: 'aaaaa123132432', */
                },
                style: {
                    'background-color': '#F0F0F0'
                }
            }
            let panel1 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userCols: 1,
                    border: true,
                    userHeight: '100px',
                    userHtml: 'bbbbb',
                },
                style: {
                    'background-color': 'blue'
                }
            }
            let panel2 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userCols: 6,
                    border: true,
                    userHeight: '100px',
                    userHtml: 'cccccc',
                },
                style: {
                    'background-color': 'green'
                }
            }
            let panel3 = {
                component: new TjUI.panel.Panel(),
                props: {
                    userCols: 10,
                    border: true,
                    userHeight: '50px',
                    userHtml: 'ddddddd',
                },
                style: {
                    'background-color': 'red'
                }
            }
            this.add(panelTem)
            this.add(panel1)
            this.add(panel2)
            this.add(panel3)
        }
    }
}
export default Grid