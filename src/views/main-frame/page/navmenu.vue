<template>
	<nav-menu class="sys-navmenu-cls" :menus="menus" :defaults="defaultsStyle" @handleSelect="handleSelect" style="height:100%;"></nav-menu>
</template>
<script>
import navMenu from '@/components/common/navmenu'
import {CONST_DEFAULT_CONFIG} from '@/config'
import {apply} from '@/utils/tools'
import permissionComponents from '@/routes/permission-module-index'
// import {mapGetters} from 'vuex'

export default {
    name: 'navmenu-page',
    inject: ['getPanel'],
    components: {
        navMenu
	},
	computed:{
		/* ...mapGetters({
			projectMenus: 'user/getProjectRolesMenus',	//项目管理
			buyMenus: 'user/getBuyRolesMenus',			//物资管理
		}) */
	},
    data(){
        return {
			defaultsStyle: {
				'background-color': '#0f2f7a'
			},
			menus: []
		}
	},
	mounted(){
		this.readMenus()
	},
    methods: {
		//读取人员权限菜单
		readMenus(){},
		//处理导航选择
        handleSelect({key, keyPath}){
            let [selectMenu,childModule,subIndex] = [null,null,0]
			for (let menu of this.menus.values()) {
				childModule = menu['children'].find(child=>{
					return key === child.id
				})
				if(!!childModule){
					selectMenu = menu
					break
                }
                subIndex++
			}
			if(!!childModule){
				let copyModule = Object.assign({},childModule)
                let path = `${selectMenu.namespace}${CONST_DEFAULT_CONFIG.sep}`
                apply(copyModule,{subIndex: subIndex,name: `${path}${copyModule.name}`,path: `${path}${copyModule.name}`,component: permissionComponents[`${path}${copyModule.component}`]})
                //通知content内容区域组件，打开tab选项卡
				this.getLinkComponent(this.getPanel.contentLink).open(copyModule)
			}
		},
		//菜单栏
		setMenus(menus){
			this.menus = menus
		}
    }
}
</script>
