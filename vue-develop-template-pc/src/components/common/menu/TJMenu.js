/**
 * menu 菜单按钮控件
 * 在其它控件右键菜单事件 'contextmenu'时，可以动态在点击的位置处显示menu控件
 * 比如：tree的右键 '刷新'节点
 * tip: 必须显示调用showAt(x,y)才能创建控件
 * mounted(){
 *  let menu = new tjMenu()
 *  menu.add([{text: '增加',grade: 'info'},{text: '下载文档',grade: 'warning'}])
 *  //menu.add({text: '增加'})
 *  menu.showAt(200,300)
 * }
 * */
import Vue from 'vue'

class TJMenu{
    constructor(){
        [this.currentMenu,this.menuId] = [[],'tjmenu']
        this.events = {
            doBeforeClose: 'doBeforeClose',     //关闭之前
        }
        this.removeMenuNode()
        setTimeout(() => {
            this.createMenuNode()
        }, 0);
    }
    //增加菜单项
    add(menu){
        this.currentMenu.length = 0
        let type = Object.prototype.toString.call(menu).slice(8, -1)
        if(type==='Array'){
            this.currentMenu = [...menu]
            return
        }
        if(type==='Object'){
            this.currentMenu = new Array(1).fill({...menu})
        }
    }
    //创建menu的展示节点
    createMenuNode(){
        let b = document.createElement('div')
        b.setAttribute("id",this.menuId)
        b.setAttribute('style',"position:absolute;top:0px;left:0px;z-index:100;")
        document.body.appendChild(b)
    }
    //移除menu的展示节点
    removeMenuNode(){
        if(document.getElementById('tjmenu') != null){
            //触发事件
            this.fire(this.events.doBeforeClose)
            document.body.removeChild(document.getElementById('tjmenu'))
        }
    }
    //显示的位置 x坐标 y坐标
    showAt(x,y){
        setTimeout(() => {
            this.createMenu(x,y)
        },0)
    }
    fire(event){
        if (!this.hasOwnProperty('handler')) return
        this.handler.forEach(item=>{
            (item['event']===event) && item['handler']()
        })
    }
    on(event,handler){
        if(!('handler' in this)){
            this.handler = []
        }
        this.handler.push({event: event,handler: handler})
    }
    //创建菜单栏
    createMenu(x=0, y=0){
        let _this = this
        let userMenu = Vue.extend({
            components: {
                tjButton: new TjUI.form.tools.Button()
            },
            data(){
                return {
                    menuId: _this.menuId
                }
            },
            created(){
                _this.on(_this.events.doBeforeClose,()=>{
                    this.$destroy()
                })
            },
            methods: {
                createChildNode(h){
                    let lis = []
                    _this.currentMenu.forEach((li, index) => {
                        lis.push(h('li',{
                                style: {
                                    'padding-bottom': (_this.currentMenu.length-1===index) ? '0px' : '3px',
                                    'border-bottom': (_this.currentMenu.length-1===index) ? '0px' : '1px solid #F2F2F2',
                                }
                            },
                            [h('tjButton',{
                                props: {width: 80,grade: 'text',...li},
                                on: {
                                    //菜单按钮点击之后处理事件
                                    afterClickHandler: ()=>{
                                        _this.removeMenuNode()
                                        setTimeout(() => {
                                            _this.createMenuNode()
                                        }, 0);
                                    }
                                }
                            })]
                        )
                    )
                    });
                    let ul = h('div',
                    {
                        style: {
                            padding:'2px',
                            border: '1px solid #F2F2F2'
                        }
                    },lis)
                    return [ul]
                }
            },
            render(h){
                return h('div',
                {
                    style: {
                        position: 'absolute',
                        top: `${y}px`,
                        left: `${x}px`,
                        'background-color': '#fff',
                        'z-index': 100,
                    },
                    attrs: {
                        id: this.menuId
                    }
                },this.createChildNode(h))
            }
        })
        // 创建 userMenu 实例，并挂载到一个元素上。
        new userMenu().$mount(`#${this.menuId}`)
    }
}
export default TJMenu

