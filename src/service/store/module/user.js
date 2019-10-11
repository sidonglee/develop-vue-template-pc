/**
 * 用户信息userInfo模型 操作store
 * 模型中state和actions不能有同名
 * store.getters['user/generateMenus']
 * store.dispatch('user/generate_Routes')
 */
import toRoutes from '@/plugins/toroutes'
import {apply,applyIf,deepApplyIf} from '@/utils/tools'
import Vue from 'vue'
import { CONST_DEFAULT_CONFIG } from '@/config'

const state = {
    //用户基本信息
    data: {
        "name": "",
        "ip": "",
        "type": 0,
        "time": 0,
        "system": {"id": 0,"name": "","code": ""},
        "user": {"id": 0,"name": "","code": ""},
        "dept": {"id": 0,"name": "","code": ""},
        "role": 0,
        "roles": [{"id": 0,"name": "","code": ""}]
    },
    roleMenus_1: [
        {
            node: {
                dirty: false,
                flag: 1,
                flagname: "投运",
                icon: "el-icon-edit-outline",
                id: 148,
                moduleid: null,
                modulename: "",
                name: "我的任务",
                pid: 0,
                route: null,
                seq: 0,
                sysid: 3,
                uri: null,
            },
            childs: [
                {
                    node: {
                        dirty: false,
                        flag: 1,
                        flagname: "投运",
                        icon: null,
                        id: 155,
                        moduleid: null,
                        modulename: null,
                        name: "我的任务",
                        pid: 148,
                        route: "classRoleConfig",
                        seq: 0,
                        sysid: 3,
                        uri: null,
                    },
                    childs: [
                        {
                            node: {
                                dirty: false,
                                flag: 1,
                                flagname: "投运",
                                icon: null,
                                id: 158,
                                moduleid: 108,
                                modulename: "我的任务-待我处理的",
                                name: "待我处理",
                                pid: 155,
                                route: "deptManager",
                                seq: 0,
                                sysid: 3,
                                uri: null,
                            },
                            childs: []
                        }
                    ]
                }
            ]
        }
    ],
    //角色对应的导航菜单
    navMenus: [],
    // 角色对应的菜单
    roleMenus: [],
    // 角色对应的路由
    roleRoutes: [],
    //是否已登陆
    isLogin: false,
    /**
     * 应用是否已经初始化完成 主要用于检测 'roleMenus'、'roleRoutes'是否已生成
     */
    initedApp: false,
    //系统用户访问令牌
    token: ''
}

const getters = {
    getLoginStatus: state => {
        return state.isLogin
    },
    getAppStatus: state => {
        return state.initedApp
    },
    getNavMenus: state => {
        return state.navMenus
    },
    getRoleMenus: state => {
        return state.roleMenus
    },
    getRoleRoutes: state => {
        return state.roleRoutes
    },
    //项目管理
    getProjectRolesMenus: state => {
        return state.roleMenus.filter(menu => menu.super_id==='36')
    },
    //物资采购
    getBuyRolesMenus: state => {
        return state.roleMenus.filter(menu => menu.super_id==='38')
    },
    //报销管理
    getExpenseRolesMenus: state => {
        return state.roleMenus.filter(menu => menu.super_id==='37')
    },
    //人资管理
    getHrRolesMenus: state => {
        return state.roleMenus.filter(menu => menu.super_id==='39')
    },
    //我的任务
    getJobRolesMenus: state => {
        return state.roleMenus.filter(menu => menu.super_id==='148')
    },
    getUserInfo: state => {
        return {...state.data}
    },
    getToken: state => {
        return state.token
    }
}
const actions = {
    handle_Login({ commit, state }, {usercode, password}){
        console.info('login...');
        return new Promise((resolve, reject)=>{
            //根据具体请求结果返回 解决（或拒绝）
            /* Vue.prototype.$api['login/doLogin']({usercode: usercode,password: password},{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(resData=>{
                if(resData.code !== CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    reject(new Error('promise do error'))
                    return
                }
                commit('UPDATE_DATA', resData.data)
                resolve()
            }).catch((error) => {
                reject(new Error('promise do error'))
            }) */
            let b = {
                dept: {id: 77, name: "泰珏科技", code: "1-3-1"},
                ip: "192.168.1.135",
                name: "1a4cf1c0-c7c1-47e1-9410-777a3a34b7fe",
                role: 0,
                roles: [{id: 268, name: "oa测试人员2", code: "1-3-2"}],
                system: {id: 3, name: "泰珏办公管理系统", code: "oa"},
                time: 1551942284400,
                type: 0,
                user: {id: 37, name: "oatest", code: "oatest"}
            }
            commit('UPDATE_DATA', b)
            resolve()
        })
    },
    handle_exit({ commit, state }){
        return new Promise((resolve, reject)=>{
            commit('HANDLE_EXIT')
            resolve()
        })
    },
    update_LoginStatus({ commit, state }){
        commit('UPDATE_LOGINSTATUS')
        return new Promise((resolve, reject)=>{
            resolve()
        })
    },
    //生成真实路由
    generate_Routes({ commit, state },routers){
        return new Promise((resolve, reject) => {
            //根据具体请求获取用户菜单列表
            //Vue.prototype.$api['user/readRoleMenus']({token: state.token}).then(resData=>{
                let resData = {'data': state.roleMenus_1}
                if(!resData['data'].length){
                    resolve()
                    return
                }
                commit('GENERATE_NAVMENUS',resData['data'].map(navMenu => navMenu.node))
                resData['data'].forEach((firstMenu, index) => {
                    let roleMenu = {}
                    for (let secondMenu of firstMenu['childs'].values()) {
                        roleMenu = {
                            "id": secondMenu.node.id+''||'0',
                            "super_id": firstMenu.node.id+''||'0',
                            "pid": secondMenu.node.pid+''||'0',
                            "title": secondMenu.node.name||'',
                            "namespace": secondMenu.node.route||'',
                            "icon": secondMenu.node.icon||'',
                            "children": []
                        }
                        if(!secondMenu.childs.length) continue;
                        for (let thirdMenu of secondMenu['childs'].values()) {
                            roleMenu['children'].push({
                                "id": thirdMenu.node.id+''||'0',
                                "super_id": firstMenu.node.id+''||'0',
                                "pid": thirdMenu.node.pid+''||'0',
                                "sysid": thirdMenu.node.sysid+''||'0',
                                "moduleid": thirdMenu.node.moduleid+''||'0',
                                "path": thirdMenu.node.route||'',
                                "name": thirdMenu.node.route||'',
                                "title": thirdMenu.node.name||'',
                                "component": thirdMenu.node.route||'',
                            })
                        }
                        commit('GENERATE_ROLEMENUS', roleMenu)
                    }
                })
                let childRoutes = []
                console.info(state.roleMenus);
                state.roleMenus.forEach(menu => {
                    childRoutes.push(...toRoutes(deepApplyIf(menu.children,{namespace: menu.namespace})))
                });
                console.info( '生成真实路由',childRoutes );
                commit('GENERATE_ROUTES', childRoutes)
                resolve()
            //})
        })
    }
}
const UPDATE_DATA = 'UPDATE_DATA'
const GENERATE_NAVMENUS = 'GENERATE_NAVMENUS'
const GENERATE_ROLEMENUS = 'GENERATE_ROLEMENUS'
const GENERATE_ROUTES = 'GENERATE_ROUTES'
const UPDATE_LOGINSTATUS = 'UPDATE_LOGINSTATUS'
const COMMIT_SYSFSM = 'COMMIT_SYSFSM'
const HANDLE_EXIT = 'HANDLE_EXIT'
const mutations = {
    [UPDATE_DATA](state,data){
        Object.assign(state.data,data)
        if('name' in data){
            state.token = data.name
        }
    },
    [UPDATE_LOGINSTATUS](state){
        state.isLogin = true
    },
    [GENERATE_NAVMENUS](state,arrayNavMenus){
        state.navMenus = arrayNavMenus
    },
    [GENERATE_ROLEMENUS](state,arrayRoleMenus){
        state.roleMenus.push(arrayRoleMenus)
    },
    [GENERATE_ROUTES](state,arrayRoutes){
        state.roleRoutes = arrayRoutes
        state.initedApp = true
    },
    [HANDLE_EXIT](state){
        localStorage.clear();
        state.token = ''
        state.isLogin = false
        state.navMenus = []
        state.roleMenus = []
        state.roleRoutes = []
        state.initedApp = false
    }
}

export default {
    namespaced: true,   //必须带上命名空间
    state,
    getters,
    actions,
    mutations
}




