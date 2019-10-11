/**
 * window窗口
 * 负责生成window的html元素载体
 * 不对外部的业务逻辑组件提供继承
 * 调用setWidth()、setHeight()后想要重新触发布局，请手动调用this.doLayout()
 */
import Vue from 'vue'
import window from './window'
import {get} from '../helper/tools'
import rootparamsFilters from '@/plugins/root-filters'
import './css/win.css'

class TJWindow{
    constructor({panel=null,mainGrid=null,title='窗口',width=350,height=300}={component:null,title:'窗口',width:350,height:300}){
        this.b = null
        this.id = `drag-${Math.ceil(Math.random()*1000)}`
        this.detailComponent = null
        this.dragMinWidth = width
        this.dragMinHeight = height
        this.panel = panel
        this.mainGrid = mainGrid
        this.createWindowNode(title)
        this.events = {
            doBeforeClose: 'doBeforeClose',     //关闭之前
            doAfterLayout: 'doAfterLayout'      //重新绘制
        }
        setTimeout(() => {
            this.createContentNode()
            this.initDrag()
        },0)
    }
    //创建节点
    createWindowNode(name){
        this.removeWindowNode()
        this.b = document.createElement('div')
        this.b.setAttribute("class","window")
        this.b.setAttribute("style",`z-index: 10;display: none;width: ${this.dragMinWidth}px;height: ${this.dragMinHeight}px`)
        this.b.setAttribute("id",this.id)
        let title = `<div class="title"><h2>${name}</h2><div><a class="min" href="javascript:;" title="最小化"></a><a class="max" href="javascript:;" title="最大化"></a><a class="revert" href="javascript:;" title="还原"></a><a class="close" href="javascript:;" title="关闭"></a></div></div>`
        let content = `<div class="content" style="height: ${(this.dragMinHeight-47)/this.dragMinHeight*100}%"><div></div></div>`
        this.b.innerHTML = `${title}${content}`
        document.body.appendChild(this.b)
    }
    //移除window节点
    removeWindowNode(){
        if(document.getElementById(this.id) != null){
            document.body.removeChild(document.getElementById(this.id))
        }
    }
    //创建窗体内容
    createContentNode(){
        let _this = this
        let userContent = Vue.extend({
            provide: function () {
                return {
                    getPanel: _this.panel,
                    getMainGrid: _this.mainGrid,
                    getWindow: _this
                }
            },
            mixins: [rootparamsFilters],
            components: {
                'contentWindow': ()=>import('./window')
            },
            created(){
                //窗口关闭之前销毁自动生成的面板组件 （面板实例和面板DOM）
                _this.on(_this.events.doBeforeClose,()=>{
                    this.$destroy()
                })
            },
            render(h){
                return h('contentWindow',{props: {detail: _this.detailComponent}})
            }
        })
        new userContent().$mount(_this.b.childNodes[1].childNodes[0])
    }
    //添加窗体内容子组件
    add(component){
        if(typeof component == 'object'){
            this.detailComponent = component
        }
    }
    close(){
        //触发事件
        this.fire(this.events.doBeforeClose)
        this.removeWindowNode()
    }
    show(){
        (this.b.style.display == 'none') && (this.b.style.display = "block")
    }
    hide(){
        this.b.style.display = "none"
    }
    //设置标题
    setTitle(title=''){
        this.b.childNodes[0].childNodes[0].innerHTML = title
    }
    setWidth(width){
        this.b.style.width = `${width}px`
        this.dragMinWidth = width
    }
    setHeight(height){
        this.b.style.height = `${height}px`
        this.dragMinHeight = height
    }
    initDrag(){
        let oDrag = this.b
        var oTitle = get.byClass("title", oDrag)[0]
        this.doDrag(oDrag, oTitle);
    }
    //重新绘制
    doLayout(){
        let [width,height] = [this.b.style.width.replace('px',''),this.b.style.height.replace('px','')]
        this.b.childNodes[1].style.height = ((height-47)/height*100)+"%"
        //触发事件
        this.fire(this.events.doAfterLayout)
    }
    fire(event){
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
    //拖拽
    doDrag(oDrag, handle){
        var _this = this;
        var disX = 0;
        var disY = 0;
        var oMin = get.byClass("min", oDrag)[0];
        var oMax = get.byClass("max", oDrag)[0];
        var oRevert = get.byClass("revert", oDrag)[0];
        var oClose = get.byClass("close", oDrag)[0];
        handle = handle || oDrag;
        handle.style.cursor = "move";
        handle.onmousedown = function (event){
            var event = event || window.event;
            disX = event.clientX - oDrag.offsetLeft;
            disY = event.clientY - oDrag.offsetTop;
            document.onmousemove = function (event){
                var event = event || window.event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
                iL <= 0 && (iL = 0);
                iT <= 0 && (iT = 0);
                iL >= maxL && (iL = maxL);
                iT >= maxT && (iT = maxT);
                oDrag.style.left = iL + "px";
                oDrag.style.top = iT + "px";
                return false
            };
            document.onmouseup = function (){
                document.onmousemove = null;
                document.onmouseup = null;
                this.releaseCapture && this.releaseCapture()
            };
            this.setCapture && this.setCapture();
            return false
        };  
        //最大化按钮
        oMax.onclick = function (){
            oDrag.style.top = oDrag.style.left = 0;
            oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
            oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
            _this.doLayout()
            this.style.display = "none";
            oRevert.style.display = "block";
        };
        //还原按钮
        oRevert.onclick = function (){
            oDrag.style.width = _this.dragMinWidth + "px";
            oDrag.style.height = _this.dragMinHeight + "px";
            oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
            oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
            _this.doLayout()
            this.style.display = "none";
            oMax.style.display = "block";
        };
        //最小化按钮
        /* oMin.onclick = function (){
            oDrag.style.display = "none";
            var oA = document.createElement("a");
            oA.className = "open";
            oA.href = "javascript:;";
            oA.title = "还原";
            document.body.appendChild(oA);
            oA.onclick = function (){
                oDrag.style.display = "block";
                document.body.removeChild(this);
                this.onclick = null;
            };
        }; */
        //关闭按钮
        oClose.onclick = ()=>{
            //触发事件
            _this.fire(this.events.doBeforeClose)
            this.removeWindowNode()
        }
        //阻止冒泡
        oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event){
            this.onfocus = function () {this.blur()};
            (event || window.event).cancelBubble = true 
        };
    }
}
export default TJWindow