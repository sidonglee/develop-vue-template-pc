/**
 * 水平布局
 */
import apiGrid from '../grid'

const Hbox = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'hbox'
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            let nameField = {
                component: new TjUI.form.tools.TextField(),
                props: {
                    width: 100,
                    emptyText: '用户名'
                }
            }
            let sexField = {
                component: new TjUI.form.tools.TextField(),
                props: {
                    width: 100,
                    emptyText: '性别'
                }
            }
            let listGrid = {
                component: apiGrid
            }
            this.add(nameField)
            this.add(sexField)
            this.add(listGrid)
        }
    }
    /* mounted(){
        console.info(textfield);
    },
    render(h){
        return h('div','aaaaaaaaaaaaa')
    } */
}
export default Hbox