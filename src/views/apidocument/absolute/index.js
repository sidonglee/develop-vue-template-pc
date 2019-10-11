/**
 * 绝对定位布局
 */
const Absolute = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'absolute'
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            var panelOne = {
                component: new TjUI.panel.Panel(),
                props: {
                    userX: '100px',
                    userY: '100px',
                    userWidth: '200px',
                    userHeight: '200px',
                    userBorder: true
                },
                style: {
                    'background-color':'#81AFFA'
                }
            }
            let panelTwo = {
                component: new TjUI.panel.Panel(),
                props: {
                    userX: '200px',
                    userY: '150px',
                    userWidth: '200px',
                    userHeight: '200px',
                    userBorder: true
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
export default Absolute