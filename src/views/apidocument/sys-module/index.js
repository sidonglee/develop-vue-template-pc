import abcPanel from './abc'

const Index = {
    extends: new TjUI.sysModule.SysModule,
	data(){
		return {
			// treeDefaults: {
            //     conurl: 'user/readRoleMenus',
            //     queryParams: {
            //         syscode: 'oa',
            //         token: 'test_123',
            //     },
            // },
            isShowTree: false,
            gridDefaults: {
                conurl: 'job/pass/readPage',
                queryParams: {
                    token: 'test_123'
                },
                selMode: 'simple',
                columns: [
                    {label:'流程ID',field:'id'},
                    {label:'流程名称',field: 'name'},
                    {label:'发起人',field:'ownername'},
                    {label:'发起部门',field:'deptname'},
                    {label:'发起时间',field:'starttime'},
                    {label:'处理人',field:'handlername'},
                    {label:'处理部门',field:'handlerdept'},
                    {label:'处理时间',field:'handlertime'},
                    {label:'流程类型',field:'processname'},
                    {label:'任务步骤',field:'taskname'},
                ],
            },
		}
	},
	methods: {
		initTabs(){
            let tabs = []
            tabs.push(
                {
                    title: '番茄',
                    queryField: 'name',		//查询参数的value
                    queryParamName: 'pid',	//查询参数的key   http://192.168.1.135:7001?token=123&pid=name
                    defaults: {
                        conurl: 'job/begin/readPage',
                        queryParams: {
                            token: 'test_123'
                        },
                        selMode: 'simple',
                        columns: [
                            {label:'流程ID',field:'id'},
                            {label:'流程名称',field: 'name'},
                            {label:'发起人',field:'ownername'},
                            {label:'发起部门',field:'deptname'},
                            {label:'发起时间',field:'starttime'},
                            {label:'处理人',field:'handlername'},
                            {label:'处理部门',field:'handlerdept'},
                            {label:'处理时间',field:'handlertime'},
                            {label:'流程类型',field:'processname'},
                            {label:'任务步骤',field:'taskname'},
                        ]
                    }
                },
                {
                    title: '苹果',
                    queryField: 'processkey',
					queryParamName: 'pid',
                    defaults: {
                        conurl: 'job/my/readPage',
                        queryParams: {
                            token: 'test_123'
                        },
                        selMode: 'simple',
                        columns: [
                            {label:'流程ID',field:'id'},
                            {label:'流程名称',field: 'name'},
                            {label:'发起人',field:'ownername'},
                            {label:'发起部门',field:'deptname'},
                            {label:'发起时间',field:'starttime'},
                            {label:'处理人',field:'handlername'},
                            {label:'处理部门',field:'handlerdept'},
                            {label:'处理时间',field:'handlertime'},
                            {label:'流程类型',field:'processname'},
                            {label:'任务步骤',field:'taskname'},
                        ],
                    }
                },
                {
                    title: '香蕉',
                    component: abcPanel,
                    defaults: {
                        userHtml: '香蕉'
                    }
                }
            )
            return tabs
        },
	}
}
export default Index