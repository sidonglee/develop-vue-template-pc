/**
 * 饿了么 Select 可编辑下拉选择器
 * 单选 触发change事件只返回 displayField指定的字段值
 */
import './css/combo-box-input.css'

TjUI.ns('TjUI.form.tools')
TjUI.form.tools.ComboBoxInput = TjUI.extend(js.base.fn,{
	initComponent(){
        this['components'] = {
			'tj-input': new TjUI.form.tools.TextField()
        }
	},
	model: {
        prop: 'selectInputValue',
        event: 'selectInputChange'
    },
	props: {
		width: {
			type: Number,
			default: 217
		},
		emptyText: {
			type: String,
			default: '请输入内容'
		},
		//外部传入事件
		listeners: {
			type: Object,
			default: null
		},
		//访问的后台地址
        conurl: String,
        //初始化查询参数
        queryParams: {
            type: Object,
            default(){
                return {}
            }
		},
		//本地数据源
        options: {
            type: Array,
			default(){
				return []
			}
		},
		//数据过滤器
        loadFilter: {
			type: Function,
			default: null
        },
		//默认显示的value值
        value: {
            type: String,
			default: ''
		},
		//显示字段
        displayField: {
            type: String,
            default: 'name'
		},
		//隐藏字段
        valueField: {
            type: String,
            default: 'id'
		},
		//v-model字段
		selectInputValue: {
			type: String,
			default: ''
		},
		disabled: {
            type: Boolean,
            default: false
		},
		readonly: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return {
			vValue: this.value,
			curOptions: [],
        }
	},
	watch:{
		selectInputValue(val, oldVal){
			if(val !== this.vValue){
				this.vValue = val
				this.$refs['combo-box-input'].setTextValue(this.vValue)
				this.$emit('selectInputChange',this.vValue)
			}
		}
	},
	mounted(){
		if((!!this.conurl) && !this.curOptions.length){
            this.initLoadStore()
        }else{
            this.curOptions.splice(0,this.curOptions.length,...this.options)
        }
	},
	methods: {
		//加载远程数据
		initLoadStore(){
			this.$api[this.conurl](this.queryParams).then(resData => {
                setTimeout(() => {
					this.curOptions.splice(0,this.curOptions.length,...((!!this.loadFilter) ? this.loadFilter(resData.data) : resData.data.map(item=>({[this.valueField]: item[this.valueField]+'',[this.displayField]: item[this.displayField]+''}))))
				}, 0);
			}).catch( error =>{
				console.log(error)
            })
		},
		//重置selectInputValue字段
        resetting(){
			this.$refs['combo-box-input'].setTextValue(this.value)
			this.$emit('selectInputChange',this.value)
		}
	},
	render(h){
		let inputComponent = h(
			'tj-input',
			{
				class: 'user-input',
				attrs: {
					readonly: this.readonly,
				},
				props: {
					width: this.width,
                    'emptyText': this.emptyText,
					value: this.vValue,
					disabled: this.disabled,
					listeners: {
						click: (event)=>{
							if(!this.disabled){
								this.$refs['combo-box-select'].$el.click()
								event.target.focus()
							}
						},
						change: (val)=>{
							this.$emit('selectInputChange',val)
						}
					}
                },
                ref: 'combo-box-input'
			}
        )
        let elOptions = []
        //构造下拉选择项option 自己的理解是：这里的map类似template中的v-for指令，可以实现动态渲染
        elOptions = this.curOptions.map((option,index) => {
            return h('el-option',{
                props: {
                    key: option[this.valueField],
                    label: option[this.displayField],
                    value: option[this.valueField],
                }
            })
        })
		let selectComponent = h(
			'el-select',
			{
				style: {
					width: `${this.width}px`
				},
				class: 'user-select',
                props: {
                    value: this.value,
                    multiple: false,
                },
                on: {
                    input: (val)=>{
                        let label = this.curOptions.find(option=> option[this.valueField]===val)[this.displayField]
                        this.$refs['combo-box-input'].setTextValue(label)
					},
					change: (val)=>{
						let name = this.curOptions.find(option=>option[this.valueField]===val)[this.displayField]
						this.vValue = name
						this.$emit('selectInputChange',name)
					}
                },
				ref: 'combo-box-select'
			},
			elOptions
		)
		return h(
			'div',
			{
				class: 'user-combo-box-input-cls',
				style: {
					position: 'relative',
					'margin':'0px',
					'padding':'0px',
				}
			},
			[inputComponent,selectComponent]
		)
	}
})