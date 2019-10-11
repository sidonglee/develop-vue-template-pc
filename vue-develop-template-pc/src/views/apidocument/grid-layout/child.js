import childTemp from './child-temp'

const childPanel = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'fit',
            border: true,
            height: '100px',
            //html: '<li>子面板-可以自定义的子组件</li>',
        }
    },
    mounted(){
        let panle = {
            component: childTemp,
        }
        this.add(panle)
    }
}
export default childPanel