/**
 * 组织权限菜单 模块中的访问路由
 */
const deptManager = () => import('@/views/apidocument/absolute')
const oprtManager = () => import('@/views/apidocument/form')
const oprtManager11 = () => import('@/views/apidocument/grid')

export default {
    deptManager,
    oprtManager,
    oprtManager11
}