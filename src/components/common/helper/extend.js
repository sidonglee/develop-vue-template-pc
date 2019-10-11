// jl.ns('js.extend');
/**
 * 继承基类
 * 深复制
 * superClass 父类 config 参数/子类
 * 子类会重写父类的同名方法
 * **/
import {apply} from './tools'

export const extend = function(superClass,config){
	//深复制
	var f = function(cfg){
		/**调用初始化函数
		 * 自定义加载逻辑,复写initComponent()方法实现多态
		 * cfg外部传入参数 
		 * ***/
		apply(this,cfg);
		this.initComponent();
		return this;
	};
	f.prototype = deepCopy(superClass.prototype);
	if(!!config.mixins){
		 mixinsSubClassPro(f,config);
	}
	apply(f.prototype,config);
	return f;
	
	//浅复制
	//zh.apply(superClass.prototype,config);
	//console.info(superClass.prototype);
}
/**
 * 深复制对象
 * p父类  c子类
 * ***/
function deepCopy(p, c) {
	var c = c || {};
	for (var i in p) {
　　　　　 if (typeof p[i] === 'object') {
				//c[i] = ((p[i]==null?{}:p[i]).constructor === Array) ? [] : {};
　　　　　　　	if(p[i]==null){
					c[i] = p[i];
				}else{
					c[i] = (p[i].constructor === Array) ? [] : {};
				}
				arguments.callee(p[i], c[i]);
　　　　　 } else {
　　　　　　　	c[i] = p[i];
　　　　　 }
　　　}
　　　return c;
}
//多项继承
function mixinsSubClassPro(f,config){
	for(var i in config.mixins){
		var a = eval(config.mixins[i]);
		deepCopy(a.prototype,f.prototype);
	}
}