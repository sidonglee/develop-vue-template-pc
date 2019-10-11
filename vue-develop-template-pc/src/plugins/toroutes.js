/**
 * 动态添加更多的路由规则
 * 后端返回的路由配置转变为真实的路由
 * 适合前后端交互匹配菜单权限路由
 * tip：namespace 命名空间用于获取真实的组件
 */
import permissionRolesRoutes from '@/routes/permission-module-index'
import {CONST_DEFAULT_CONFIG} from '@/config'
import {applyIf} from '@/utils/tools'

export default function toRoutes(menus = []) {
    let userRouters = []
    if(!menus.length){
        return userRouters
    }
    menus.forEach(menu => {
        applyIf(menu,{
            id: '',
            super_id: '0',  //菜单顶级id 适用于多层菜单时指定各个顶层菜单item
            moduleid: '',
            name: '',
            title: '',
            icon: '',
        })
        let {
            id,
            namespace,
            moduleid,
            super_id='0',
            path="*",
            name,
            title,
            component,
            icon,
            meta = {}
        } = menu
        meta['id'] = id
        meta['moduleid'] = moduleid
        meta['name'] = name
        meta['title'] = title
        meta['icon'] = icon

        let userRouter = {
            name: `${namespace}${CONST_DEFAULT_CONFIG.sep}${path}`,
            realname: name,
            path: `${namespace}${CONST_DEFAULT_CONFIG.sep}${path}`,
            meta: meta,
            super_id: super_id,
            component: permissionRolesRoutes[`${namespace}${CONST_DEFAULT_CONFIG.sep}${component}`]
        }
        userRouters.push(userRouter)
    });
    return userRouters
}

