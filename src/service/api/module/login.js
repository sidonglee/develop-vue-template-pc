/**
 * 系统登录 api 文档接口 领域模型
 */
export default [
    {
        name: 'doLogin',
        method: 'POST',
        desc: '用户登录',
        path: '/root/login3',
        mockPath: '',
        params: {
            usercode: '',
            password: '',
            syscode: 'oa'
        },
        validator:{
            usercode: {required: true,type: String,sqlxss: true,not: '', msg: '用户名不能为空!'},
            password: {required: true,type: String,sqlxss: true,not: '', msg: '密码不能为空!'},
            syscode: {required: true,type: String,sqlxss: true,not: '', msg: 'syscode不能为空!'},
        }
    }
]