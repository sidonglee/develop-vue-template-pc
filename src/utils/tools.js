/**
 * 工具函数
 */
import qs from 'querystring'
import _transform from 'lodash/transform'
import _isEqual from 'lodash/isEqual'
import _isObject from 'lodash/isObject'

//去除前后空格
export const trim = (str) => {
  if (typeof str != 'string') return;
  if (str.length == 0) return str;
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//简单的数组去重
export const uniqueArray = (arr = []) => {
  return arr => [...new Set(arr)]
}

//简单的对象数组去重
export const uniqueObjArray = (arr = []) => {
	var result = []
	var obj = {}
	for(var i =0; i<arr.length; i++){
		if(!obj[arr[i].key]){
			result.push(arr[i])
			obj[arr[i].key] = true
		}
  	}
  	return result
}

//当前URL
export const currentUrl = _ => window.location.href;

// 合法uri
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/**
 * 获取url参数
 * http://127.0.0.1:7001/users?id=1&name=hello
 * @param {*} url
 * return  {id: 1,name:"hello"}
 */
export const urlParams = (url = window.location.href) => qs.parse(url.split('?')[1])

//获取token
export const getToken = () => 'xxx'

//滚动到顶部
export function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

//缺失参数
export const throwIfMissing = () => {
  throw new Error('Missing parameter');
}

//当前浏览器名称
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

//检测sql攻击
export const checkSQLXss = (sQuery) => {
  let re = /select|update|delete|truncate|join|union|exec|insert|drop|count|script|<|>|'|"|=|;/gi
  if (re.test(sQuery)) {
    return false
  }
  return true
}

//特殊字符检测
export const checkInvalidChar = (val) => {
  var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  return reg.test(val)
}

//过滤特殊字符
export const removeInvalidChar = (val) => {
  var reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  var rs = "";
  for (var i = 0, l = val.length; i < val.length; i++) {
    rs = rs + val.substr(i, 1).replace(reg, '');
  }
  return rs;
}

//来源对象覆盖目标源对象
export const apply = (scope, config) => {
  	for (var i in config) {
		scope[i] = config[i]
	}
  	return scope;
}
//来源对象覆盖目标源没有的属性
export const applyIf = (scope, config) => {
  for (var i in config) {
    if (!scope[i])
      scope[i] = config[i];
  }
  return scope;
}
//来源对象覆盖目标源有的属性
export const applyIn = (scope, config) => {
	for (var i in config) {
		if (scope.hasOwnProperty(i)) {
			scope[i] = config[i];
		}
	}
	return scope;
  }
//给数组中的每个对象添加属性
export const deepApplyIf = (array, config) => {
  array.forEach(element => {
    applyIf(element, config)
  });
  return array
}

/**
 * 使用函数过滤并序列化对象
 * json对象
 * replacer 过滤处理函数
 * var foo = {transport: "car", month: 7};
 * var jsonString = JSON.stringify(foo, replacer);
 * // 使用“函数”当替代器
 * function replacer(key, value) {
 *  if (typeof value === "string") {
 *      return undefined;
 *  }
 *  return value;
 * }
 */
export const jsonFilter = (json = {}, replacer) => {
  var jsonString = JSON.stringify(foo, replacer)
  return JSON.parse(jsonString)
}

/**
 * 使用数组过滤并序列化对象
 * const user = {name: 'zollero',age: 16}
 * JSON.stringify(user, ['name'])
 * {name: 'zollero'}
 */
export const jsonArrayFilter = (user = {}, filterArray = []) => {
  return JSON.parse(JSON.stringify(user, filterArray))
}

//字符数字转int数字
export const strNumToInt = (val) => {
  return +val
}
//int数字转字符数字
export const intNumToStr = (val) => {
  return (val).toString()
}

//统计文字个数
/* var text = '贷款买房，也意味着你能给自己的资产加杠杆，能够撬动更多的钱，来衍生更多的财务性收入。';
wordCount(text)
// 38 */
export const wordCount = (data) => {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  var m = data.match(pattern);
  var count = 0;
  if (m === null) return count;
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

//数据安全类型检查
//对象
export const isObject = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}
//数组
export const isArray = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}
//函数
export const isFunction = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Function'
}

//n维数组展开成一维数组
//flatten([1, [2, 3], ['4', 5, ['6', 7, [8]]], [9], 10]) [1, 2, 3, "4", 5, "6", 7, 8, 9, 10]
export const flatten = (a) => {
  return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
}

//自定义错误 继承Error对象
//throw new userError(`abc`)
export const userError = function (message) {
  this.message = message || '默认信息';
  this.name = 'userError'
}
userError.prototype = new Error();
userError.prototype.constructor = userError;

//根据传入的日期格式进行转换
export const dateformat = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  if (!isNotEmpty(fmt)) {
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
  if (isNotEmpty(dateStr)) {
    return new Date(Date.parse(dateStr.replace(/-/g, "/")));
  }
  return '';
}

//时间Date类型转换格式
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
  if (!this.isNotEmpty(fmt)) {
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
export const isNotEmpty = (str) => {
  if (str != '' && str != null && typeof str != 'undefined') {
    return true;
  }
  //console.warn('argument format is wrong');
  return false;
}

//判断参数是否为空
export const isNotEqualeEmpty = (str) => {
	if (str !== '' && str !== null && typeof str !== 'undefined') {
	  return true;
	}
	//console.warn('argument format is wrong');
	return false;
}

//判断对象是否为空对象
export const isEmptyObject = (obj) => {
  for (var key in obj) {
    return false
  }
  return true
}

//清空json对象
export const clearJsonObject = (obj) => {
  for (var key in obj) {
    delete obj[key];
  }
}

//转换成小写
export const toLowerCase = (str) => {
  return (!!str) ? str.toLowerCase() : ''
}

//转换成大写
export const toUpperCase = (str) => {
  return (!!str) ? str.toUpperCase() : ''
}

export const CompareObj = (objA, objB, flag) => {
  for (var key in objA) {
    if (!flag) //跳出整个循环
      break;
    if (!objB.hasOwnProperty(key)) {
      flag = false;
      break;
    }
    if (!isArray(objA[key])) { //子级不是数组时,比较属性值
      if (objB[key] != objA[key]) {
        flag = false;
        break;
      }
    } else {
      if (!isArray(objB[key])) {
        flag = false;
        break;
      }
      var oA = objA[key],
        oB = objB[key];
      if (oA.length != oB.length) {
        flag = false;
        break;
      }
      for (var k in oA) {
        if (!flag) //这里跳出循环是为了不让递归继续
          break;
        flag = CompareObj(oA[k], oB[k], flag);
      }
    }
  }
  return flag;
};
export const getHrefHash = () => {
  return location.hash.split("/")[1];
}
export const getColumns = (vm, dateformat) => {
  const data = vm.$baseData[getHrefHash()];
  let arr = [];
  for (let i in data) {
    const item = data[i],
      render = item.type == "date" ? {
        render: (h, {row, column, field, $index}) => {
          if (!(!!row[field])) {
            return h('span', [])
          }
          return h('span', dateformat.format(new Date(row[field]), 'yyyy-MM-dd'))
        }
      } : {};
    arr.push({label: item.name, field: i, ...render})
  }
  return arr;
};
export const getDetails = (vm) => {
  const data = vm.$baseData[getHrefHash()];
  let arr = [];
  for (let i in data) {
    const item = data[i];
    //{span: 1,name: 'sort',label: '类型',returnType: 'string',displayField: 'name',valueField: 'code',type: 'ComboBox',conurl:'dict/readTenderSort',queryParams: {token: this.$store.getters['user/getToken']},width: 200},
    if (item.type == "select") {
      arr.push({
        span: 1,
        name: i,
        type: "ComboBox",
        returnType: 'string',
        displayField: 'name',
        valueField: 'code',
        conurl: item.conurl,
        queryParams: {token: vm.$store.getters['user/getToken']},
        width: 130,
        label: item.name
      })
    } else if (item.type == "date") {
      arr.push({
        span: 1,
        name: i,
        type: "DatePicker",
        width: 130,
        label: item.name,
      })
    } else {
      arr.push({
        span: 1,
        name: i,
        type: "TextField",
        width: 130,
        label: item.name
      })
    }

  }
  return arr;
};
export const getDataModal = (baseData) => {
  const data = baseData[getHrefHash()];
  let newData = {};
  for (let i in data) newData[i] = null;
  return newData;
};

//创建一个100%纯对象，它不对从Object继承任何属性或方法（例如，constructor，toString()等）
export const getPureObject = () => {
	return Object.create(null)
}

//使用lodash深度对比出2个对象之间的差异
export const differenceObject = (object, base) => {
	function changes(object, base) {
        return _transform(object, function(result, value, key) {
            if (!_isEqual(value, base[key])) {
                result[key] = (_isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
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