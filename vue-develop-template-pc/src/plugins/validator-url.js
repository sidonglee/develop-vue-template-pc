/**
 * 自定义数据验证插件
 * https://mengdu.github.io/validator.js/#/?id=use
 * data 待验证数据
 * constraints 数据限制要求 rule规则
 * isOne 检查到错误字段即停止
 * tip: 可以在这里扩展自定义认证规则
 */
import validator from 'vdjs'
import {throwIfMissing,checkSQLXss} from '@/utils/tools'

let validate = function(data=throwIfMissing(),constraints=throwIfMissing(),isOne=null){
    var valid = validator.validate(data,constraints)
    /**
     * valid.fails()检查是否失败，如果存在字段检查不通过，则返回true，反之false
     * valid.all(true) 返回所有验证信息结果，对象；如果需要返回数组 isArr 为 true 即可。
     * {status: true,msg: ["password验证不通过", "两次输入密码不一致"]}
     */
    return {status: valid.fails(),msg: valid.all(true)}
}
//URL地址防注入 针对查询参数
validator.pushRule('sqlxss', function (val, rval) {
    if(rval){
        let status = checkSQLXss(val)
        if(!status){
            throw new Error('parameter sql xss')
            return false
        }
    }
    return true
})

export default validate
