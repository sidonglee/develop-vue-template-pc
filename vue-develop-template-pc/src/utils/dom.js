/**
 * dom 工具函数 
 * import 导入时按 '模块导入'
 */

//注册dom事件
export const on = (function() {
    if (document.addEventListener) {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function(element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
})();
//解除dom事件
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
//绑定后触发一次,自动解除绑定
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
//检测class属性
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}
//添加class 属性
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};
export function removeClass(elem, cls){
	if (hasClass(elem, cls)) {
		var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
		while (newClass.indexOf(' ' + cls + ' ') >= 0) {
		  newClass = newClass.replace(' ' + cls + ' ', ' ');
		}
		elem.className = newClass.replace(/^\s+|\s+$/g, '');
	  }
}
//设置style样式
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

//通过class名称 获取html对象
export const getElmsByClsName = (className, results) => {
  results = results || [];
  // 判断浏览器是否支持 getElementsByClassName
  if(document.getElementsByClassName) {
      // 浏览器支持这个方法
      results.push.apply( results, 
      document.getElementsByClassName(className) );
  } else {
      // 浏览器不支持
      // 实现：通过类名来获取页面中的元素
      // 思路：
      // 1 通过标签名获取到所有的元素
      // 2 循环遍历获取到的所有元素，分别判断当前元素有没有指定的类

      // 1 获取到页面中所有的元素
      var nodes = document.getElementsByTagName("*");
      // 2 遍历
      for(var i = 0; i < nodes.length; i++) {
          var cNodes = nodes[i];
          // 2.1 判断当前元素是否包含 指定的类 className
          // 第一种方式：
          // 1 获取到当前元素的类名 className/getAttribute("class")
          // 2 将获取到的类名 以空格分割 产生一个数组
          //         ["c1", "c2", "c3"]
          // 3 用数组中的每一个元素分别跟className比较
          // 4 如果是符合要求的就放到 results 中
          var cNodeClsName = cNodes.className;
          var clsNames = cNodeClsName.split(" ");
          for(var j = 0; j < clsNames.length; j++) {
              if(clsNames[j] === className) {
                  results.push(cNodes);
              }
          }

      }
  }
  
  return results;
}

//动态插入js
export const injectScript = (src) => {
  var s, t;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = src;
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
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
