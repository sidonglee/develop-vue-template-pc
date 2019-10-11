/**
 * 字段数据验证插件
 * 将不同的验证方法写在插件中对外提供统一的验证策略
 * true 表示验证通过 false验证失败
 */
import { trim,checkSQLXss,checkInvalidChar } from '@/utils/tools'

const Validator = {
    types: {
        //验证值是否不为空
        isNonEmpty: {
            validate(value) {
                return trim(value.length) !== 0 && value !== null && value!== undefined;
            },
            instructions: '传入的值不能为空！'
        },
        //验证只能为数字
        checkNumber: {
            validate: function (value) {
                return !isNaN(value);
            },
            instructions: '传入的值只能是合法的数字！'
        },
        //验证只能是字母和数字
        checkZmOrNum: {
            validate: function (value) {
                var zmnumReg = /^[0-9a-zA-Z]*$/; 
                return !zmnumReg.test(zmnum)
            },
            instructions: '只能输入是字母或者数字！'
        },
        //验证SQL关键字攻击
        checkSQLXss: {
            validate: function (value) {
                return checkSQLXss(value)
            },
            instructions: '存在SQL特殊字符!'
        },
        //特殊字符过滤
        checkInvalidChar: {
            validate: function (value) {
                return !checkInvalidChar(value)
            },
            instructions: '存在特殊字符!'
        }
    },
    /**
     * type types中的验证函数 'checkZmOrNum'
     * val 外部传入的待验证值
     */
    validate: function (type,val='') {
        if(!(this.types).hasOwnProperty(type)){
            return {result: false ,msg: '验证函数不存在'}
        }
        let b = this.types[type].validate(val)
        return {result: b,msg: b ? '': this.types[type].instructions}
    }
}
export default Validator