import apiGrid from '../grid'

const b = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'fit',
        }
    },
    mounted(){
        let gridPanel = {
            component: apiGrid
        }
        this.add(gridPanel)
    }
}
export default b