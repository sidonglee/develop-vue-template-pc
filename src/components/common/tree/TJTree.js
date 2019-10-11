/**
 * 饿了么 tree属性控件
 */
import tjMenu from '../menu'
import { isArray } from '../helper/tools'

TjUI.ns('TjUI.tree')
TjUI.tree.TJtree = TjUI.extend(js.base.fn,{
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        prop: 'treeValue',
        event: 'treeChange'
    },
    props: {
        width: String,
        //访问的后台地址
        conurl: String,
        //初始化查询参数
        queryParams: {
            type: Object,
            default(){
                return {}
            }
        },
        //根节点label
        rootLabel: {
            type: String,
            default: '根目录'
        },
        //根节点信息
        root: {
            type: Object,
            default(){
                return {id : 0,label: this.rootLabel,children: []}
            }
        },
        //推荐id作为唯一键
        nodeKey: {
            type: String,
            default: 'id'
        },
        expanded: {
            type: Boolean,
            default: false
        },
        //tree指针 ref属性
        userRef: {
            type: String,
            default: `tree-${Math.ceil(Math.random()*1000)}`
        },
        //数据源用于快速创建一个简易tree
        store: {
            type: Array,
            default(){
                return [
                    /* {
                        label: '一级 1',
                        children: [{
                            label: '二级 1-1',
                            check: true //默认选中当前节点
                        },{
                            label: '二级 1-2'
                        }]
                    } */
                ]
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        /* 默认要勾选的节点keys 必须是唯一值id的value
        适用于数据源由外部传入，如果是远程获取必须在数据中增加'check'字段标明是否选中
        如果组件是远程加载，但defaultCheckedKeys又不为空，则defaultCheckedKeys设置的值也将会选中
         */
        defaultCheckedKeys: {
            type: Array,
            default(){
                return []
            }
        },
        //combotree控件在多选时设置为true
        checkStrictly: {
            type: Boolean,
            default: false
        },
        //右键菜单栏 contextMenu
        menu: {
            type: Array,
            default(){
                return []
            }
        },
        /***
         * 数据过滤器
         * loadFilter(data){
         *  //处理逻辑
         *  return data
         * }
         */
        loadFilter: {
            default: null
        },
        //事件
        listeners: {
            type: Object,
            default(){
                return {}
            }
        }, 
        //定义外部v-model值，默认值null因为单选传入String，多选Array并不确定
        treeValue: {
            default(){
                return null
            }
        }
    },
    data(){
        return {
            //右键菜单menu
            ctxMenu: null,
            events: {
                afterLoadStore: 'afterLoadStore'    //数据加载完成之后
            }
        }
    },
    computed: {
        //本地数据源
        currentData(){
            this.$set(this.root,'children',(this.loadFilter != null) ? this.loadFilter(this.store) : this.store)
            let b = new Array(1).fill(this.root)
            //数据读取完成触发事件
            this.$emit(this.events.afterLoadStore,b)
            return b
        },
        //其它一些props组合
        otherProps(){
            if(this.store.length && !(!!this.conurl)){
                return {'default-checked-keys': this.defaultCheckedKeys,data: this.currentData}
            }
            return {lazy: true,load: this.loadNode}
        }
    },
    methods: {
        //初始化数据
		loadNode(node, resolve){
            if (node.level === 0) {
                return resolve([this.root])
            }
            // if (node.level > 1) return resolve([])
            this.loadStore({node: node}).then((data) => {
                resolve(data)
                //数据读取完成触发事件
                this.$emit(this.events.afterLoadStore,data)
            }).catch(()=>resolve([]))
        },
        loadStore(node = {}){
            /* const data = [{id: 1,label: 'leaf',leaf: false,},{id: 2,label: 'zone',check: true}];
            (this.loadFilter != null) && this.loadFilter(data);
            let checkList = data.forEach((node, index) => {
                (node.check!=void(0) && node.check) && (this.checkedKeys.push(node.id));
            })
            return data */
            return new Promise((resolve, reject) => {
                this.$api[this.conurl]({...this.queryParams,...{id: node.node.key}}).then(resList => {
                    if(!isArray(resList.data)){
                        resList.data = [resList.data]
                    }
                    //数据过滤器
                    (this.loadFilter != null) && this.loadFilter(resList);
                    let resData = []
                    if(node.node.level === 1){
                        resList.data.forEach((element ,index) => {
                            let node = {label: element.node.name,id: element.node.id,nodeIndex: index,superIndex: index,indexs: [index],node: {...element.node}}
                            resData.push(node)
                        })
                    }else{
                        resData.push(...this.getElementNode(resList.data, node.node.data))
                    }
                    resData.filter(item=>item.leaf).map(item=>Object.assign(item,{leaf: !!item['leaf']}))
                    setTimeout(() => {
                        //默认勾选的节点 Array
                        this.$refs[this.userRef].setCheckedNodes([...this.$refs[this.userRef].getCheckedNodes(),...resData.filter((node)=>{return node.check||this.defaultCheckedKeys.includes(node.id)})])
                    }, 0);
                    resolve(resData)
                }).catch( error =>{
                    console.log('tree ',error)
                    reject([])
                })
            })
        },
        getElementNode( resData,nodeData ){
            let dataNode = []
            for (let index of nodeData.indexs.values()) {
                if(!dataNode.length){
                    dataNode = resData[index].childs
                }else{
                    dataNode = dataNode[index].childs
                }
            }
            return dataNode.map((element, index) => {
                return {label: element.node.name,id: element.node.id,leaf: !(element.childs.length) ? true : false,nodeIndex: index,superIndex: nodeData.superIndex,indexs: [...nodeData.indexs,index],node: {...element.node}}
            })
        },
        //节点被点击时的回调
        nodeClick(record, node, tree){
            if(this.ctxMenu != null){
                this.ctxMenu.removeMenuNode()
                setTimeout(() => {
                    this.ctxMenu = null
                }, 0);
            }
            ('nodeClick' in this.listeners) && this.listeners.nodeClick(record, node, tree);
        },
        //节点选中状态发生变化时的回调
        checkChange(record, checked, childCheckNodes){
            ('checkChange' in this.listeners) && this.listeners.checkChange(record, checked, childCheckNodes)
        },
        //当复选框被点击的时候触发
        nodeBoxCheck(node, treeCheckedNode){
            ('check' in this.listeners) && this.listeners.check(node, treeCheckedNode)
            //触发v-model input事件
            let b = []
            treeCheckedNode['checkedNodes'].forEach(element => {
                b.push({label: element.label,value: element.id})
            });
            this.$emit('treeChange',b)
        },
        //当前选中节点变化时触发的事件 点击节点，并不是复选框
        currentChange(record, node){
            ('currentChange' in this.listeners) && this.listeners.currentChange(record, node)
            if(!this.showCheckbox){
                //触发v-model input事件
                this.$emit('treeChange',[{label: node.label,value: node.key}], node.data.node)
            }
        },
        //当某一节点被鼠标右键点击时会触发该事件
        nodeContextmenu(event, nodeData, node){
            //添加右键菜单menu
            if(this.ctxMenu==null){
                this.ctxMenu = new tjMenu()
            }
            let currentMenu = [{text: '刷新',listeners: {click: ()=>{this.refreshNode(nodeData)}}}]
            //非根节点
            if(node.level!=1){
                currentMenu = currentMenu.concat(this.menu)
            }
            this.ctxMenu.add(currentMenu)
            this.ctxMenu.showAt(event.pageX,event.pageY)
            event.preventDefault()
        },
        //刷新当前节点
        refreshNode(nodeData){
            let node = this.$refs[this.userRef].getNode(nodeData.id)
            let key = this.$refs[this.userRef].getNode(nodeData.id)['key']
            //节点上显示加载的效果
            node.loading = true
            this.loadStore({id: key}).then((resData) => {
                this.$refs[this.userRef].updateKeyChildren(nodeData.id,resData)
            }).catch((error)=>{
                console.info('tree',error);
            }).finally(()=>{
                node.loading = false
            })
            /* this.$refs[this.userRef].updateKeyChildren(nodeData.id,[
                    {id: 100,label: '三级 new 1-1-1'},
                    {id: 101,label: '三级 new 1-1-2'},
                    {id: 102,label: '三级 new 1-1-3'},
                ]
            ) */
        },
        //通过 keys 设置目前勾选的节点
        setCheckedKeys(keys = []){
            this.$refs[this.userRef].setCheckedKeys(keys)
        },
        //清空选中的节点
        clearChecked(){
            this.$refs[this.userRef].setCheckedKeys([]);
        },
        //若节点可被选择,则返回目前被选中的节点所组成的数组 返回的节点非响应式
        getCheckedNodes(){
            return [...this.$refs[this.userRef].getCheckedNodes()]
        },
        //选择树的指定的路径 懒加载模式下未打开过的节点无效
        selectPath(path){

        },
        //展开指定的路径 懒加载模式下未打开过的节点无效
        expandPath(path){

        },
        //空函数 提供默认函数的作用
        fn(){},
    },
    render(h){
        return h(
            'el-tree',
            {
                ref: this.userRef,
                style: {
                    //控件宽度 默认100%
                    width: `${this.width}px`,
                },
                props: {
                    //节点是否可被选择 默认false boolean
                    'show-checkbox': this.showCheckbox,
                    //每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 String
                    'node-key': this.nodeKey,
                    //是否默认展开所有节点 默认false boolean
                    'default-expand-all': this.expanded,
                    //默认展开的节点的 key 的数组 默认展开第一层
                    'default-expanded-keys': [this.root['id']],
                    //只有点箭头图标的时候才会展开或者收缩节点
                    'expand-on-click-node': false,
                    //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false combotree控件时设置为true
                    'check-strictly': this.checkStrictly,
                    //默认props
                    props: {
                        children: 'children',
                        label: 'label',
                        isLeaf: 'leaf'  //"leaf": 1/0,
                    },
                    ...this.otherProps
                },
                on: {
                    //节点被点击时的回调
                    'node-click': this.nodeClick,
                    //节点选中状态发生变化时的回调
                    'check-change': this.checkChange,
                    //当复选框被点击的时候触发
                    'check': this.nodeBoxCheck,
                    //当前选中节点变化时触发的事件 点击节点，并不是复选框
                    'current-change': this.currentChange,
                    //当某一节点被鼠标右键点击时会触发该事件
                    'node-contextmenu': this.nodeContextmenu,
                }
            })
    }
})