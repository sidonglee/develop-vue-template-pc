const ApiTree = {
    extends: new TjUI.panel.Panel(),
    data(){
        return {
            layout: 'fit'
        }
    },
    mounted(){
        this.initPanel()
    },
    methods:{
        initPanel(){
            let tree1 = {
                component: new TjUI.tree.TJtree(),
                props: {
                    showCheckbox: true,
                    expanded: false,
                    loadFilter: this.loadFilter,
                    // conurl: 'deportment/getDepartTrees',
                    menu: [{text: '分享'}],
                    defaultCheckedKeys: [11],
                    store: [
                            {
                                "id": 1,
                                "label": "浙江省",
                                "children": [
                                    {
                                        "id": 10,
                                        "label": "嘉兴"
                                    },
                                    {
                                        "id": 11,
                                        "label": "杭州"
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "label": "江苏省",
                                "children": [
                                    {
                                        "id": 20,
                                        "label": "南京"
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "label": "福建省"
                            }
                    ]
                }
            }
            this.add(tree1)
        },
        loadFilter(data){
            //自定义过滤数据源
            return data
        }
    }
}
export default ApiTree