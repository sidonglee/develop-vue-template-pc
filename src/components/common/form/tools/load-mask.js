/**
 * 饿了么 LoadMask 正在加载遮罩
 * let b = new TjUI.form.tools.LoadMask({target: this})
 * b.show()
 * setTimeout(() => {
 *      b.hide()
 * },2000)
 * 
 * */
import Vue from 'vue'

TjUI.ns('TjUI.form.tools')
TjUI.form.tools.LoadMask = TjUI.extend(js.base.fn,{
    target: null,   //"target"组件的this上下文
    loading: null,  //遮罩层对象
    //显示正在加载中遮罩层 'target'组件的this上下文
    show(){
        this.loading = Vue.prototype.$loading({
            lock: true,
            target: this.target.$el
        });
    },
    //关闭遮罩层
    hide(){
        if(this.loading !== null){
            this.loading.close()
        }
    }
})