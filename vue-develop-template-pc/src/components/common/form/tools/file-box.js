/**
 * 饿了么 FileBox 文件选择框
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.FileBox = TjUI.extend(js.base.fn,{
    initComponent(){
        this['components'] = {
            'user-button': new TjUI.form.tools.Button()
        }
    },
    props: {
        //必选参数，上传的地址
        action: {
            type: String,
            default: 'http://192.168.1.93:8082/oa/project/tender/apply/detail/255/60/bids'
        },
        //上传时附带的额外参数
        data: {
            type: Object,
            default(){
                return {}
            }
        },
        //是否支持多选文件
        multiple: {
            type: Boolean,
            default: true
        },
        //是否显示已上传文件列表
        showFileList: {
            type: Boolean,
            default: false
        },
        //接受上传的文件类型（thumbnail-mode 模式下此参数无效）
        accept: {
            type: String,
            default: ''
        },
        //最大允许上传个数
        limit: {
            type: Number,
            default: 100
        },
        //文件列表的类型 text/picture/picture-card
        listType: {
            type: String,
            default: 'text'
        },
        //按钮文字
        text: {
            type: String,
            default: '上传'
        },
        //是否显示自定义提示说明文字
        isShowTip: {
            type: Boolean,
            default: false
        },
        //提示说明文字
        tipText: {
            type: String,
            default: '点击查看详情'
        },
        //元素外边距
        margin: {
            type: String,
            default: '0px'
        },
        //自定义class类名
        cls: {
            type: String,
            default: ''
        },
        //是否禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        //事件
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        //是否渲染节点 v-if
        isRender: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            curDisabled: this.disabled
        }
    },
    watch: {
        disabled(val, oldVal){
            this.curDisabled = val
        }
    },
    methods: {
        onSuccess(event){
            this.$message({type: 'success',message: '上传成功!'});
            ('on-success' in this.listeners) && this.listeners['on-success'](event)
        },
        onError(){
            this.$message({type: 'warning',message: '上传失败!'});
            ('on-error' in this.listeners) && this.listeners['on-error'](event)
        },
        onExceed(){
            this.$message({type: 'warning',message: '文件超出个数限制!'});
            ('on-exceed' in this.listeners) && this.listeners['on-exceed'](event)
        }
    },
    render(h){
        // return h('div','饿了么 FileBox 文件选择框')
        if(!this.isRender){
            return h(null)
        }else{
            let solts = []
            if(this.isShowTip){
                solts.push(h('a',{style: {'font-size': '12px',},attrs: {href: 'javascript: void(0);'},domProps: {innerHTML: '点击查看详情'},})
                )
            }
            return h(
                'el-upload',
                {
                    'class': this.cls,
                    style: {
                        display: 'inline',
                        margin: this.margin
                    },
                    props: {
                        action: this.action,
                        multiple: this.multiple,
                        limit: this.limit,
                        disabled: this.curDisabled,
                        data: this.data,
                        'show-file-list': this.showFileList,
                        accept: this.accept,
                        'list-type': this.listType,
                        'on-success': this.onSuccess,   //文件上传成功时的钩子
                        'on-error': this.onError,       //文件上传失败时的钩子
                        'on-exceed': this.onExceed      //文件超出个数限制时的钩子
                    },
                    on:{
                        
                    }
                },
                [
                    h('user-button',{
                        props: {
                            text: this.text,
                            disabled: this.curDisabled,
                        }
                    }),
                    ...solts
                ]
            )
        }
    }
})