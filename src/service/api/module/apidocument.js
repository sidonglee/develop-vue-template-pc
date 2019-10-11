/**
 * api 文档接口 领域模型
 * tip: 提供validator-url 认证规则参数,url地址栏参数就会被拦截器进行拦截,检测提交的params参数
 * 如果url是restful风格中的参数,validator不会对该字段进行验证，axios拦截器会验证url是否被正确替换
 * 如果参数是通过headers请求头提交，请将参数写在headers中，注意：headers和params参数名不能相同
 */
export default [
    {
        name: 'userdept',
        method: 'GET',  //POST PUT DELETE
        desc: '获取所属部门 (url请求描述)',
        path: '/deportmentcontrol/getUserDept',
        mockPath: '/${id}/department',
        restful: true,      //如果path不是restful风格，则restful可以不写
        headers: ['token'], //如果url不需要headers参数，则headers可以不写
        removeInvalidChar: true,    //是否需要进行特殊字符过滤
        params: {
            id: '1',        //restful参数 (发送请求时不会出现在params或者data中)
            token: '',      //headers 请求头参数 (发送请求时不会出现在params或者data中)
            // token: function(){return 'test_123'}, headers中的参数可以定义一个构造函数，可以利用函数延时执行处理特殊情况
            _start: '',     ///url地址栏参数
            _limit: '',
            name: '',
            flag: ''
        },
        //url地址栏参数验证（推荐对每个参数都进行验证）
        validator: {
            flag: {required: true, sqlxss: true, not: '', msg: 'flag状态不能为空!'},
            id: {required: true, type: Number, msg: '用户id参数error!'}
        }
    },
    {
        name: 'getDepartTrees',
        method: 'GET',
        desc: '获取部门树结构 (tree请求url)',
        path: '/deportmentcontrol/getDeptTree',
        mockPath: '/trees',
        params: {
            //q: '1'
        }
    },
    {
        name: 'getDepartUsers',
        method: 'GET',
        desc: '获取部门人员集 (grid列表请求url)',
        path: '/deportmentcontrol/getDeptTree',
        mockPath: '/oprts',
        params: {
            _start: 0,
            _limit: 0,
            address_like: ''
        }
    }
]
