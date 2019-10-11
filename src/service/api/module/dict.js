/**
 * 数据字典 api 文档接口 领域模型
 */
export default [
    {
        name: 'readTenderFlag',
        method: 'GET',
        desc: '中标信息',
        path: '/root/dict/tender/flag',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'readTenderSort',
        method: 'GET',
        desc: '中标类型',
        path: '/root/dict/tender/sort',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'readProjectsort',
        method: 'GET',
        desc: '项目类型',
        path: '/root/dict/projectsort',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'readTravelsort',
        method: 'GET',
        desc: '出差类型',
        path: '/root/dict/travelsort',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'readVehicle',
        method: 'GET',
        desc: '交通工具',
        path: '/root/dict/vehicle',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'readProcessList',
        method: 'GET',
        desc: '流程信息查询',
        path: '/root/process/list',
        mockPath: '',
        headers: ['token'],
        params: {
            token: ''
        }
    },
    {
        name: 'readTaskList',
        method: 'GET',
        desc: '流程步骤查询',
        path: '/root/task/list',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
            process: ''
        }
    },
    {
        name: 'getDept',
        method: 'GET',
        desc: '所在部门',
        path: '/root/dept/list',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
    {
        name: 'getPersonStatus',
        method: 'GET',
        desc: '员工状态',
        path: '/root/dict/personstatus',
        mockPath: '',
        headers: ['token'],
        params: {
            token: '',
        }
    },
]
