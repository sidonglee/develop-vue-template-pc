/**
 * 修改密码
 */
import { CONST_DEFAULT_CONFIG } from '@/config'

const Detail = {
	extends: new TjUI.grid.detail.Detail(),
    data(){
        return {
            conurl: 'user/updatePswd',
            formParams: {
                token: this.$store.getters['user/getToken'],
            },
            defaults: {
                border: false,
                columns: 2,
                width: 250,
                labelWidth: 70,
                buttonPosition: 'right',
            },
            lastFormDetail: {}
        }
    },
    methods: {
        initDetailData(){
            this.detailData = [
                {span: 1,name: 'oldpass',type: 'TextPassword',width: 150,label: '旧密码',rule: [
                    {required: true,message: '请输入旧密码', trigger: 'blur'},
				]},
				{span: 1,name: 'newpass',type: 'TextPassword',width: 150,label: '新密码',rule: [
                    {required: true,message: '请输入新密码', trigger: 'blur'},
                ]},
            ]
		},
		doSubmit(){
            if(!this.validate()){
                return
            }
            this.doBeforeSave()
            //...
            this.getLinkComponent(this.detailLink).getForm().validate((valid, object) => {
                if (valid) {
                    this.$api[this.conurl]({...this.formParams,...this.formDetail},{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(resData=>{
                        //...
                        if(resData.code===CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                            !!this.window && this.window.close()
                            this.$message({type: 'success',message: '操作成功!'});
                        }
                        this.doResult(resData)
                    })
                    return true;
                } else {
                    console.info('form validate error');
                    return false;
                }
            })
        },
    }
}
export default Detail