/**
 * 具体的路由 主页面配置
 * 这里的路由是不需要后端配置的路由(权限认证)
 * 路由延迟加载
 */
export default [
  {
    path: '/examples',
    name: 'examples',
    meta: {title: 'apidocument实例入口'},
    component: r => require.ensure([], () => r(require('@/views/apidocument/examples')), 'examples')
  },
]
