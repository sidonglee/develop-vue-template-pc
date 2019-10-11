/**
 * 运行时捕捉 js 脚本错误
 * 线上的 js 脚本都是压缩过的，需要用 sourcemap 文件与 source-map 查看原始的报错堆栈信息。
 */
export default {
    install: (Vue, options={}) => {
        Vue.config.errorHandler = function (err, vm, info) {
            //post('url', {error: error,info: info,url: window.location.href}); // 上报到服务器
        
            var txt = ""
            txt="本页中存在错误。\n\n"
            txt+="错误：" + err + "\n"
            txt+="info: " + info + "\n"
            txt+="URL: " + window.location.href + "\n"
            txt+="点击“确定”继续。\n\n"
            alert(txt)
        }
    }
}
