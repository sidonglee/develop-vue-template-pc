/**
 * 权限控制-插件
 * 服务器设置权限最小级为 菜单对应的模块，没有设置到模块中具体的按钮或字段
 * 'authority'设置按钮权限关键字 ‘default’ 'read' 'write'
 * key 对应需要权限控制的数据源键值对key
 * this['mixins'] = [new userAuthority({key: 'items'})]
 * {text: '添加',name:'add',authority: ['read']},
 */
import { isArray,isNotEmpty } from '@/utils/tools'

//权限验证 props参数配置 对应组件通过混入动态扩展自身的props参数
const AuthorityProps = {
	props: {
		//菜单对应的模块moduleid
		moduleid: {
			type: String,
			default: ''
		}
	}
}

//权限验证实现对象
const Authority = TjUI.extend(js.base.fn,{
	key: '',		//默认key 对应权限按钮
	btnKey: '',		//权限按钮key
	formKey: '',	//权限form表单key
	data(){
		return {
			authorityConurl: 'user/getModuleAccess',  //权限访问地址
			authorityParams: {moduleid: this.moduleid,token: this.$store.getters['user/getToken']},	//认证参数
			authorityArr: ['read']	//模块访问权限 默认只读
		}
	},
	mounted(){
		// console.info('aaa ',this.moduleid);
        this.$nextTick( () => {
			setTimeout(() => {
				if(isNotEmpty(this.moduleid) && this[this.$options.key]!=void(0) && this[this.$options.key].length) {
					this.doAuthority()
				}
			}, 0);
        })
    },
	methods: {
		doShiro(){
			//各自权限认证，继承后多态实现
			return new Promise((resolve, reject)=>{
                this.$api[this.authorityConurl](this.authorityParams).then(resData=>{
					if(resData.hasOwnProperty('data')){
						// console.info('module authority：',this.moduleid,resData.data);
						if(!isArray(resData.data)){
							//0 可分配默认会转换为 1只读
							let accessVal = resData.data == 0 ? 1 : resData.data;
							this.authorityArr = [this.$root._rootFilters(accessVal,'ACCESS_TYPE')]
						}else{
							this.authorityArr = (resData.data).map(item => {
								let accessVal = item == 0 ? 1 : item;
								return this.$root._rootFilters(accessVal,'ACCESS_TYPE')
							})
						}
					}
					resolve()
                })
            })
		},
		doAuthority(){
			//权限操作...
			this.doShiro().then(()=>{
				//权限解析
				this.doAnalysis()
			})
			//...
		},
		doAnalysis(){
			if(this[this.$options.key] !== void(0)){
				// console.info('按钮栏 ',this[this.$options.key],this.authorityArr);
			}
			if(this[this.$options.formKey] !== void(0)){
				// console.info('表单 ',this[this.$options.formKey],this.authorityArr);
				// this[this.$options.formKey][0].readonly = true
			}
			//按钮栏权限
			if(this[this.$options.key] === void(0)) return
			this[this.$options.key].forEach((element, index) => {
				if(!element.hasOwnProperty('authority')) return
				var intersectionArr = this.authorityArr.filter(function(v){
					return element['authority'].includes(v)
				})
				if(!intersectionArr.length){
					//响应式修改组件的isRender 达到v-if的效果
					// this[this.$options.key][index].isRender = false
					// this[this.$options.key][index].disabled = true
					this.$set( this[this.$options.key][index], 'disabled', true )
					if(this[this.$options.key][index].hasOwnProperty('condition')){
						this.$set( this[this.$options.key][index], 'condition', [] )
					}
				}
			});
			//表单字段权限
			if(this[this.$options.formKey] === void(0)) return
			this[this.$options.formKey].forEach((element, index) => {
				if(this.authorityArr[0] === 'read'){
					if(this[this.$options.formKey][index].type === 'Button' && this[this.$options.formKey][index].hasOwnProperty('authority') ){
						// this[this.$options.formKey][index].disabled = this[this.$options.formKey][index].authority
						this.$set( this[this.$options.formKey][index], 'disabled', this[this.$options.formKey][index].authority )
						return
					}
					if(this[this.$options.formKey][index].type === 'ComboBox' || this[this.$options.formKey][index].type === 'ComboBoxInput'){
						// this[this.$options.formKey][index].disabled = true
						// this[this.$options.formKey][index].readonly = true
						this.$set( this[this.$options.formKey][index], 'disabled', true )
						this.$set( this[this.$options.formKey][index], 'readonly', true )
						return
					}
					// this[this.$options.formKey][index].readonly = true
					this.$set( this[this.$options.formKey][index], 'disabled', true )
				}
			})
		}
	}
})
export{
	Authority,
	AuthorityProps,
}