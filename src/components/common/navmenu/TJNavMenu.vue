<template>
	<el-menu
		:default-active="activeModule"
		:class="className"
		:background-color="backgroundColor"
		:text-color="textColor"
		:active-text-color="activeTextColor"
		@select="handleSelect">
		<template v-for="(item) in menus">
			<submenu :key="item.id" v-bind="item"></submenu>
		</template>
	</el-menu>
</template>
<script>
import submenu from './TJSubMenu'

export default {
	name: 'tjnavmenu-component',
	components: {
		submenu
	},
	props: {
		className: {
			type: String,
			default: 'el-menu-vertical-demo'
		},
		defaults: {
            type: Object,
            default(){
                return {}
            }
        },
		menus: {
			type: Array,
			default(){
				return []
			}
		}
	},
	data(){
		return {
			//导航栏 角色菜单
			/* menus: [
				{
					"id": "1",
					"title": "模块配置",
					"namespace": "moduleConfig",
					"icon": "el-icon-menu",
					"children": [
					{
						"id":"1",
						"moduleid":"101",
						"path":"manager",
						"name":"manager",
						"title":"模块维护",
						"component":"moduleManager"
					},
					{
						"id":"2",
						"moduleid":"102",
						"path":"setting",
						"name":"setting",
						"title":"模块配置",
						"component":"moduleSetting"
					}
					]
				},
				{
					"id": "2",
					"title": "权限管理",
					"namespace": "classRoleConfig",
					"icon": "el-icon-share",
					"children": [{
						"id":"3",
						"moduleid":"201",
						"path":"deptManager",
						"name":"deptManager",
						"title":"部门维护",
						"component":"deptManager"
					},{
						"id":"4",
						"moduleid":"202",
						"path":"oprtManager",
						"name":"oprtManager",
						"title":"人员维护",
						"component":"oprtManager"
					},{
						"id":"5",
						"moduleid":"203",
						"path":"oprtManager11",
						"name":"oprtManager11",
						"title":"人员维护1",
						"component":"oprtManager11"
					}
					]
				}
			], */
			//自定义事件
			events: {
				handleSelect: 'handleSelect'	//点击导航菜单
			}
		}
	},
	computed: {
		activeModule(){
			return (this.menus.length > 0) ? this.menus[0].children[0]['id']:''
		},
		backgroundColor(){
			return ('background-color' in this.defaults) ? this.defaults['background-color']: '#545c64'
		},
		textColor(){
			return ('text-color' in this.defaults) ? this.defaults['text-color']: '#fff'
		},
		activeTextColor(){
			return ('active-text-color' in this.defaults) ? this.defaults['active-text-color']: '#ffd04b'
		}
	},
    methods: {
		handleSelect(key, keyPath){
			console.info("bbbbbbbbbbbbbb ",key ,this.menus);

			this.$emit(this.events.handleSelect,{key: key, keyPath: keyPath})
		}
    }
}
</script>
<style lang="less" scoped>

</style>









