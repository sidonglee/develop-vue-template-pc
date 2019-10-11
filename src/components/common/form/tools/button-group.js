/**
 * 饿了么 ButtonGroup 按钮
 * 按钮组
 */
TjUI.ns('TjUI.form.tools')
TjUI.form.tools.ButtonGroup = TjUI.extend(js.base.fn,{
    initComponent(){
        this['components'] = {
            'user-button': new TjUI.form.tools.Button()
        }
    },
    props: {
        //按钮组id
        groupId: {
           type: String
        },
        //按钮组
        buttonGroup: {
            type: Array,
            default(){
                return []
            }
        },
        //按钮组列数量
        columns: {
            type: [String, Number],
            default: 1
        },
        //按钮组宽度
        width: Number,
        //边框
        border: {
            type: Boolean,
            default: true
        },
        //边距
        gutter: {
            type: String,
            default: '3px'
        }
    },
    data(){
        return {}
    },
    render(h){
        let [currentButtonGroup,rows,rowNum] = [[...this.buttonGroup],[],Math.ceil(this.buttonGroup.length/this.columns)]
        Array.from({length: rowNum}).forEach((row,index)=>{
            let childBtns = currentButtonGroup.slice(0,this.columns)
            rows.push(h('el-row',{style:{marginBottom: (index+1!=rowNum)?'5px':'0px'}},childBtns.map((btn)=>h('user-button',{props: btn}))))
            currentButtonGroup.splice(0,this.columns)
        })
        return h(
            'li',
            {
                style: {
                    width: `${this.width}px`,
                    border: this.border?'1px solid #B6B4B6':'',
                    display: 'inline-block',
                    padding: this.gutter
                }
            },
            rows
        )
    }
})