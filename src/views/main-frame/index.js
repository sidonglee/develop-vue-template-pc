/**
 * 主页面mainframe
 */
import header from './page/header'
import navmenu from './page/navmenu'
import content from './page/content'

const MainFrame = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
           layout: 'border',
           headerLink: `link-header-panel`,
           navMenuLink: `link-navmenu-panel`,
           contentLink: `link-content-panel`
        }
    },
    mounted(){
        this.initPanel()
    },
    methods: {
        initPanel(){
            let north = {
                component: header,
                props: {
                    link: this.headerLink
                },
                style: {
                    'background-color':'#fff',
                    height: '68px'
                },
                slot: 'north'
            }
            let west = {
                component: navmenu,
                props: {
                    link: this.navMenuLink
                },
                style: {
                    width: '176px',
                    'overflow-x': 'hidden',
                },
                slot: 'west'
            }
            let center = {
                component: content,
                props: {
                    link: this.contentLink
                },
                style: {
                    'background-color': '#f2f4f8'
                },
                slot: 'center'
            }
            this.add([north,west,center])
        }
    }
}
export default MainFrame