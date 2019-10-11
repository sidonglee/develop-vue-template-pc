//根据传入的日期格式进行转换
export const dateformat = (date, fmt) =>{
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if(!isNotEmpty(fmt)){
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
//字符时间转Date类型
export const formatToDate = (dateStr) => {
    if(isNotEmpty(dateStr) ){
        return new Date(Date.parse(dateStr.replace(/-/g,   "/")));
    }
    return '';
}
export const format = (date, fmt) => {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if(!this.isNotEmpty(fmt)){
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
//判断参数是否为空
export const isNotEmpty = (str) =>{
    if (str != '' && str != null && typeof str != 'undefined') {
        return true;
    }
    //console.warn('argument format is wrong');
    return false;
}
//简单的数组去重
export const uniqueArray = (arr = []) => {
    return arr => [...new Set(arr)]
}
//简单的对象数组去重
export const uniqueObjArray = (arr = []) => {
    var result = [];
    var obj = {};
    for(var i =0; i<arr.length; i++){
       if(!obj[arr[i].key]){
          result.push(arr[i]);
          obj[arr[i].key] = true;
       }
    }
    return result
}
//数据安全类型检查
//对象
export const isObject = (value) =>{
    return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}
//数组
export const isArray = (value) =>{
    return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}
//函数
export const isFunction = (value) =>{
    return Object.prototype.toString.call(value).slice(8, -1) === 'Function'
}
//判断对象是否为空对象
export const isEmptyObject = (obj) => {
    for(var key in obj){
        return false
    }
    return true
}
//来源对象覆盖目标源对象
export const apply = (scope,config) => {
    for(var i in config){
        scope[i] = config[i];
    }
    return scope;
}
//来源对象覆盖目标源没有的属性
export const applyIf = (scope,config) => {
    for(var i in config){
        // if(!scope[i]){
        if(!scope.hasOwnProperty(i)){
            scope[i] = config[i];
        }
    }
    return scope;
}

//自定义错误 继承Error对象
export const userError = function(message){
    this.message = message || '默认信息';
    this.name = 'userError'
}
userError.prototype = new Error();
userError.prototype.constructor = userError;

//清空json对象
export const clearJsonObject = (obj)=>{
    for(var key in obj){
        delete obj[key];
    }
}

//获取节点
export const get = {
    byId: function(id) {
      return typeof id === "string" ? document.getElementById(id) : id
    },
    byClass: function(sClass, oParent) {
      var aClass = [];
      var reClass = new RegExp("(^| )" + sClass + "( |$)");
      var aElem = this.byTagName("*", oParent);
      for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
      return aClass
    },
    byTagName: function(elem, obj) {
      return (obj || document).getElementsByTagName(elem)
    }
}

///验证字符串是否是数字
export const checkNumber = (theObj)=>{
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}

//字符数字转int数字
export const strNumToInt = (val)=>{
    return +val
}
//int数字转字符数字
export const intNumToStr = (val)=>{
    return (val) .toString()
}

//正则匹配 判断字符串中是否包含某个字符串 strHavestr('abc','bc')
export const strHavestr = (str, regStr)=>{
    // var str ="abc";
    var reg = new RegExp('^.*'+regStr+'.*$');
    if(str.match(reg)){
        return true
    }
    return false
}