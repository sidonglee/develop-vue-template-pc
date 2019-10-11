/**
 * 用户模块 api 文档接口 领域模型
 */
import { userState } from "@/plugins/store";

export default [
    {
        name: 'readRoleMenus',
        method: 'GET',
        desc: '【用户菜单树】通过这个取得登录时的系统菜单',
        path: '/root/menu/tree',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            syscode: 'oa'
        },
        validator:{
            syscode: {required: true,type: String,sqlxss: true,not: '', msg: 'syscode不能为空!'},
        }
    },
    {
        name: 'updatePswd',
        method: 'POST',
        desc: '修改密码',
        path: '/root/password',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            oldpass: '',
            newpass: ''
        },
        validator:{
            oldpass: {required: true,sqlxss: true,not: '', msg: 'oldpass不能为空!'},
            newpass: {required: true,sqlxss: true,not: '', msg: 'newpass不能为空!'},
        }
    },
    {
        name: 'getModuleAccess',
        method: 'GET',
        desc: '获取模块访问权限 (0:default;1:read;2:write)',
        path: '/root/module/access',
        mockPath: '',
        headers: ['token'],
        params: {
            token: function(){
                return userState['user/token'].value
            },
            moduleid: ''
        }
    }
]