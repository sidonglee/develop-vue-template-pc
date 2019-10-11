/**
 * iframe面板
 * 继承至panel面板
 * 载入外部链接展示整个网页
 */
import {isArray,isEmptyObject} from '../../../helper/tools'

TjUI.ns('TjUI.panel.ux.iframe')
TjUI.panel.ux.iframe.Iframe = TjUI.extend(js.base.fn,{
    // extends: new TjUI.panel.Panel(),
    initComponent(){
        this['extends'] = new TjUI.panel.Panel()
    },
    props: {
        userFrameName: {
            type: String,
            default: ''
        },
        userSrc: {
            type: String,
            default: ''
        },
        userWidth: {
            type: String,
            default: '100%'
        },
        userHeight: {
            type: String,
            default: '100%'
        },
        userFrameBorder: {
            type: Number,
            default: 0
        },
        userScrolling: {
            type: String,
            default: 'auto'
        }
    },
    data(){
        return {
            className : `iframe-${this._uid}`,
            frameName: this.userFrameName,      //iframe名称name属性
            src: this.userSrc,                  //外部网页http地址(http://www.baidu.com?token=123) iframe形式
            width: this.userWidth,              //定义 iframe 的宽度
            height: this.userHeight,            //高度
            frameBorder: this.userFrameBorder,  //规定是否显示框架周围的边框
            scrolling: this.userScrolling,      //规定是否在 iframe 中显示滚动条
            events: {
                load: 'load'    //iframe载入完成
            }
        }
    },
    mounted(){
        setTimeout(() => {
            //去除使用iframe出现双滚动条
            document.getElementsByClassName(this.className)[0].parentNode.style.overflow="hidden"
        }, 0)
    },
    methods: {
        renderMainContent(){
            return this.hElement(
                'iframe',
                {
                    slot: 'center',
                    "class": this.className,
                    attrs: {
                        name: this.frameName,
                        src: this.src,
                        frameBorder : this.frameBorder,
                        width : this.width,
                        height : this.height,
                        scrolling: this.scrolling,
                    },
                    on: {
                        //iframe加载完成
                        load: ()=>{
                            this.$emit(this.events.load,this)
                        }
                    }
                },
                [])
        }
    }
})