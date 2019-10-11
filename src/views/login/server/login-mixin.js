/**
 * 登录login服务类
 */
import store from '@/store'
import { mapActions } from 'vuex'
import stateMachine from '@/plugins/state-machine'
import { trim,checkSQLXss,checkInvalidChar } from '@/utils/tools'
import validatorField from '@/plugins/validator-field'

const Login = {
    data() {
        return {
            //isRequest: false,
            fsm: null,
            form: {usercode: '', password: ''},
            rules: {
                usercode: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {validator: this.checkSQLXss, trigger: 'blur'},
                    {validator: this.checkInvalidChar, trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {validator: this.checkSQLXss, trigger: 'blur'},
                    {validator: this.checkInvalidChar, trigger: 'blur'}
                ],
            }
        }
    },
    mounted() {
        /*
        使用状态机改写isRequest判断
        if(this.isRequest) return;
        this.isRequest = true
        */
        this.fsm = new stateMachine()
        this.fsm.create({
            initial: 'normal',
            events: [
                {name: 'login', from: 'normal', to: 'online'},
                {name: 'quit', from: 'online', to: 'normal'}
            ]
        })
        //console.info(this.fsm.can('quit'));   //检测'quit'事件是否可以在当前状态执行
        this.fsm.on('onbeforelogin', () => {
            //console.info('onbeforelogin');
            return new Promise(function (resolve, reject) {
                setTimeout(() => {
                    resolve("1")  //流程将停止500毫秒后继续 （解决）
                    //reject(new Error('onbeforelogin error'))//拒绝Promise，流程步骤将停留在当前阶段
                }, 500);
            })
            // return 'b' //可以返回一个基本类型值、引用类型值
        })
        this.fsm.on('onleavenormal', (value) => {
            //console.info('onleavenormal',value||'');    //上一步流程传递下来的值value
            return new Promise(function (resolve, reject) {
                resolve()   //当前步骤解决，流程进入下一步
            })
        })
        this.fsm.on('onenterlogined', (value) => {
            //console.info('onenterlogined',value||'');
            return value
        })
        this.fsm.on('onafterlogin', (value) => {
            //console.info('onafterlogin',value||'');
            let b = new TjUI.form.tools.LoadMask({target: this})
            b.show()
            this['user/handle_Login'](this.form).then(() => {
                this['user/update_LoginStatus']().then(() => {
                    this.$router.push({path: '/'})
                    b.hide()
                })
            }, () => {
                b.hide()
                this.fsm.transition('quit')
                // TjUI.dialog.message(`接口不存在或访问异常!`,'error')
            })
        })
    },
    methods: {
        ...mapActions([
            'user/handle_Login',
            'user/update_LoginStatus'
        ]),
        checkSQLXss(rule, value, callback){
            let result = validatorField.validate('checkSQLXss',value)
            if(!result.result){
                callback(new Error(result.msg));
            }
			callback();
        },
        checkInvalidChar(rule, value, callback){
            let result = validatorField.validate('checkInvalidChar',value)
            if(!result.result){
                callback(new Error(result.msg));
            }
			callback();
        },
        logining() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.fsm.transition('login')
                } else {
                  console.log('error submit!!');
                  return false;
                }
            })
        }
    }
}
export default Login
