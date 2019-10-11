import navmenu from './header/navmenu'
import {toLowerCase} from '@/utils/tools'
import {LOGIN_PAGE_NAME} from '@/config'
import store from '@/store'
import {mapActions} from 'vuex'
import tjWindow from '@/components/common/window'
import pageDetail from './header/update-pswd-detail'

const Header = {
    extends: new TjUI.panel.Panel(),
    components: {navmenu},
    data(){
        return {
            layout: 'doubleWing',
            userName: this.$store.getters['user/getUserInfo'].user.name
        }
    },
    mounted(){
        this.createPanel()
    },
    methods:{
        ...mapActions([
            'user/handle_exit'
        ]),
        createPanel(){
            let leftPanel = {
                component: new TjUI.panel.Panel(),
                style: {
                    'background-color': '#109AFC'
                },
                props: {
                    userWidth: '176px',
                    userHtml: '<span style="color:#fff;letter-spacing:1px;line-height:68px;text-align: right;margin-right:10px;">泰珏OA管理系统</span>'
                },
                slot: 'left'
            }
            let centerPanel = {
                component: navmenu,
                slot: 'main'
            }
            let rightPanel = {
                component: new TjUI.panel.Panel(),
                style: {
                    'background-color': '#fff'
                },
                props: {
                    userWidth: '200px',
                    userHtml: `
                    <div style="height:100%;display: table;padding-top:23px;box-sizing: border-box;">
                        <p style="display: table-cell;width:36px;cursor: pointer;"><i class="fa fa-user-o fa-lg" aria-hidden="true"></i></p>
                        <p style="display: table-cell;color:#3E3E3E;font-size:14px;padding:0px 5px;width:120px;">${this.userName}</p>
                        <p style="display: table-cell;cursor: pointer;"><i class="fa fa-sign-out fa-lg" aria-hidden="true"></i></p>
                    </div>
                    `
                },
                nativeOn: {
                    click: (e)=>{
                        if(toLowerCase(e.target.tagName) === 'i' && toLowerCase(e.target.className).includes('fa-sign-out')){
                            // 退出
                            if(window.localStorage){
                                this.$confirm('是否需要退出系统?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this['user/handle_exit']().then(()=> this.$router.replace({ name: LOGIN_PAGE_NAME }))
                                }).catch(() => {})
                            }
                        }
                        if(toLowerCase(e.target.tagName) === 'i' && toLowerCase(e.target.className).includes('fa-user-o')){
                            let detailWin = new tjWindow({panel: this,mainGrid: this,title: '修改密码',height: 170,width: 280})
                            detailWin.add(pageDetail)
                            detailWin.show()
                        }
                    }
                },
                slot: 'right'
            }
            this.add([leftPanel,centerPanel,rightPanel])
        }
    }
}
export default Header