/**
 * form组件
 * 默认table布局
 */
import { tjForm } from '../layout'
import { apply,applyIf,isNotEmpty,isEmptyObject } from '../helper/tools'

TjUI.ns('TjUI.form')
TjUI.form.Form = TjUI.extend(js.base.fn,{
    initComponent(){
        this['components'] = {
            userbutton: new TjUI.form.tools.Button(),
            buttonmenu: new TjUI.form.tools.ButtonMenu()
        }
    },
    props: {
        //表单form的宽度
        width: {
            type: [String,Number],
            default: 'auto'
        },
        //表单指针 ref属性
        userRef: {
            type: String,
            default: `form-${Math.ceil(Math.random()*1000)}`
        },
        /**
         * 表单布局参数
         * columns: 2,  //表单一行2列
         * width: 240,  //列的宽度
         * labelWidth: 80,  //文字label占用宽度
         * labelPosition: 'left',   //文字label方位
         * disabled: false, //是否禁用表单 默认false
         * buttonPosition: 'left',  //工具按钮栏 按钮方位
         * border: true //表单边框线
         */
        layout: {
            type: Object,
            default (){
                return {}
            }
        },
        //工具按钮
        buttons: {
            type: Array,
            default(){
                return []
            }
        },
        //是否隐藏默认按钮
        isHideDefaultButtons: {
            type: Boolean,
            default: false
        },
        //按钮栏布局 top、bottom
        buttonsLayout: {
            type: String,
            default: 'bottom'
        },
        //表单详情数据
        detailData: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            //表单数据对象
            models: {},
            //本地数据
            currentDetailData: [],
            //本地按钮
            currentButtons: []
        }
    },
    computed: {
        formWidth(){
            var re = /^[0-9]+.?[0-9]*$/;
            if (re.test(this.width)) {
                return this.width+'px'
            }
            return this.width
        }
    },
    watch: {
        layout: {
            handler(val, oldVal) {
               applyIf(val,{width: 120,labelWidth: 40,labelPosition: 'left',buttonPosition: 'right'})
            },
            immediate: true
        },
        //实现表单字段value响应式更新
        detailData:{
            handler(val, oldVal){
                // console.log('属性发生变化触发这个回调',val, oldVal);
                // console.info(this.models);
                val.forEach((field, index) => {
                    if(!isNotEmpty(field['value'])) return
                    if(field['type'] === 'ComboTree' && field['defaultCheckedKeys'].toString()!==oldVal[index]['defaultCheckedKeys'].toString()){
                        let b = this.currentDetailData.find(f => f.name === field.name)
                        if(!isEmptyObject(b)){
                            this.getLinkComponent(b.link).setDefaultCheckedKeys(field['defaultCheckedKeys'])
                        }
                    }
                    if(field['type'] === 'ComboGrid' && field['defaultCheckedKeys'].toString()!==oldVal[index]['defaultCheckedKeys'].toString()){
                        let b = this.currentDetailData.find(f => f.name === field.name)
                        if(!isEmptyObject(b)){
                            this.getLinkComponent(b.link).setDefaultCheckedKeys(field['defaultCheckedKeys'])
                        }
                    }
                    if(field['value'].toString()!==oldVal[index]['value'].toString()){
                        this.models[field.name] = field.value
                    }
                })
            },
            deep: true
        }
    },
    created(){
        this.currentDetailData = [...this.detailData]
        this.initButtons()
    },
    methods: {
        //重置表单
        resetForm(){
            //手动重置组件需要添加resetting方法
            this.currentDetailData.forEach(item=>{
                if(!!this.getLinkComponent(item.link)){
                    if('resetting' in this.getLinkComponent(item.link)){
                        this.getLinkComponent(item.link).resetting()
                    }
                }
            })
        },
        //提交表单
        submitForm(){
            console.info( this.models );
            this.$refs[this.userRef].validate((valid, object) => {
                if (valid) {
                    // alert('submit!');
                    return true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //获取表单对象
        getForm(){
            return this.$refs[this.userRef];
        },
        //获取表单所有children对象
        getFormFields(){
            let fields = []
            this.currentDetailData.forEach(item=>{
                fields.push(this.getLinkComponent(item.link))
            })
            return fields
        },
        //初始化按钮
        initButtons(){
            if(!this.isHideDefaultButtons){
                this.currentButtons.push({text: '提交',listeners: {
                    click: (event)=>{
                        this.submitForm()
                    }
                }})
                this.currentButtons.push({text: '重置',listeners: {
                    click: (event)=>{
                        this.resetForm()
                    }
                }})
            }
            this.currentButtons.push(...this.buttons)
        },
        //创建工具栏
        createToolButtons(){
            //工具按钮
            let toolButtons = this.currentButtons.map((btn)=>{
                //下拉菜单按钮组
                if('menu' in btn){
                    return this.$createElement('buttonmenu',{
                        style: {'margin-left': '6px'},
                        props: {...btn}
                    },[])
                }
                //普通按钮
                return this.$createElement('userbutton',{style: btn.style || '',props: {...btn}})
            })
            if(toolButtons.length){
                return this.$createElement('el-row',{
                    style: {
                        width: `${this.width}px`,
                        backgroundColor: '#F2F2F2',
                        height: '40px',
                        // marginBottom: '22px',
                        padding: '3px',
                        'text-align': `${this.layout.buttonPosition || 'center'}`,
                    }
                },toolButtons)
            }
            return []
        }
    },
    render(h,context){
        //表单验证规则
        let rules = {}
        this.currentDetailData.forEach((detail,index) => {
            if(!('link' in detail)){
                detail['link'] = `link-${detail['name']}-${this._uid}`
            }
            if('rule' in detail || (detail.hasOwnProperty('required') && detail['required'])){
                if(detail.hasOwnProperty('required') && detail['required']){
                    if(!detail.hasOwnProperty('rule')){
                        detail['rule'] = [{required: true,message: `请输入${detail.label || ''}`, trigger: 'blur'}]
                    }else{
                        if(detail['rule'].find(item=>item['required']) === void(0)){
                            detail['rule'].unshift({required: true,message: `请输入${detail.label || ''}`, trigger: 'blur'})
                        }
                    }
                }
                (!([detail.name] in rules)) && (rules[detail.name] = detail.rule);
            }
            if('name' in detail){
                //set向响应式对象中添加一个属性
                // this.models[detail.name] = !('value' in detail) ? '' : detail['value']
                this.$set(this.models,[detail.name], (!('value' in detail)) ? '' : detail['value'])
            }
        });
        return h(
            'el-form',
            {
                style: {
                    //表单form的宽度
                    width: `${this.formWidth}`
                },
                props: {
                    //表单尺寸
                    size: 'medium',
                    //表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值
                    'label-width': `${this.layout['labelWidth']}px`,
                    //表单域标签的位置string 默认 right right/left/top
                    'label-position': `${this.layout['labelPosition']}`,
                    //是否禁用该表单内的所有组件，为 true则表单内组件上的 disabled 属性不再生效
                    disabled: this.layout.disabled || false,
                    //表单验证规则
                    rules: rules,
                    //表单数据对象
                    model: this.models,
                    //是否在 rules 属性改变后立即触发一次验证
                    'validate-on-rule-change': false,
                },
                ref: this.userRef
            },
            [
                this.buttonsLayout==='top' && this.createToolButtons(),
                h(
                    tjForm,
                    {
                        props: {
                            ...this.layout,
                            //数据详情
                            detail: this.currentDetailData,
                            //表单数据对象 传入内部用于实现 v-model
                            model: this.models,
                        }
                    },
                    []
                ),
                this.buttonsLayout==='bottom' && this.createToolButtons(),
            ]
        )
    }
})