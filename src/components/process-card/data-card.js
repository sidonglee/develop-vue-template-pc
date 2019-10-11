import {dateformat,format,isNotEmpty,formatToDate} from '../common/helper/tools'
import {CONST_DEFAULT_CONFIG} from '@/config'

const DataCard = TjUI.extend(js.base.fn,{
    inheritAttrs: false,
    //自定义组件 v-model 时对应的 prop 和 event
    model: {
        //prop: 'dateValue',
       // event: 'dateChange'
    },
    props: {
        //访问的后台地址
        conurl: String,
        queryParams:{
            type:Object,
            default(){
                return null
            }
        },
        // processid:{
        //     type:[Number,String],
        //     default:''
        // },
        // token:String,
        width: {
            type:[Number,String],
            default:''
        },       
        header: {
            type: String,
            default: ''
        },
        simulate:{
            type: [Object,Array],
            default(){
                return null
            }
        },
        bodystyle:{
            type: Object,
            default(){
                { padding: '20px';width:'100%' }
            }
        },
        
        shadow:{
            type: String,
            default: "always"
        },
        listeners: {
            type: Object,
            default(){
                return {}
            }
        },
        //date-picker指针 ref属性
        userRef: {
            type: String,
            default: `datecard-${Math.ceil(Math.random()*1000)}`
        },
    },
    data(){
        return {
            //模拟数据
            queryconurl:this.conurl,
            formParams:{processid:this.processid,token:this.token},
            datadetail:[]
        }
    },
    mounted() {
        this.readData()
    },
    methods:{
        readData(){
            this.$api[this.queryconurl]({...this.queryParams}).then(resData=>{
                if(resData.code === CONST_DEFAULT_CONFIG.ajaxSuccesscode){
                    this.datadetail = resData.data
                }
            })
        }
    },
    render(h){
        let elOptions = []
        let elOption = []
        for(let index in this.datadetail) {
            if(this.datadetail.length==0)return
            if(!this.datadetail[index]["advice"]){
                this.datadetail[index]["advice"] = ''
            }
            if(!this.datadetail[index]["handlertime"]){
                this.datadetail[index]["handlertime"] = ''
            }
            if(!this.datadetail[index]["stayTime"]){
                this.datadetail[index]["stayTime"] = ''
            }
            if(!this.datadetail[index]["handlername"]){
                this.datadetail[index]["handlername"] = ''
            }
            elOption.push(h('div',{
                style: {
                    width:"50%",
                    float:"right",
                    letterSpacing:"-0.29px",
                },
                domProps: {
                    innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">流程环节:</span><span style='font-family:STHeitiSC-Medium;font-size:12px;color:#333333;letter-spacing:-0.29px;text-align:center;'> ${this.datadetail[index]['taskname']}</span>`
                }
            }))

            elOption.push(h('div',{
                style: {
                    width:"50%",
                },
                domProps: {
                    innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">处  理  人：</span> <span style='fontFamily:STHeitiSC-Medium;letter-spacing:-0.29px;'><span style='fontFamily:STHeitiSC-Medium;letter-spacing:-0.29px;font-size:12px'>${this.datadetail[index]["handlername"]}</span>`
                }    
            }))  

            elOption.push(h('div',{
                style: {
                    marginTop: "15px",
                    width:"50%",
                },
                domProps: {
                innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">到达时间：</span><span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">${this.datadetail[index]["arrivaltime"]}</span>`
                }    
            }))
            
            elOption.push(h('div',{
                style: {
                    marginTop: "15px",
                    width:"33%",
                },
                domProps: {
                    innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">停留时间：</span><span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">${this.datadetail[index]["stayTime"]}</span>`
                }    
            }))

            elOption.push(h('div',{
                style: {
                    marginTop: "15px",
                    width:"17%",
                },
                domProps: {
                    innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">处理时间：</span><span style="font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;">${this.datadetail[index]["handlertime"]}</span>`
                }    
            }))

            elOption.push(h('div',{
                style: {
                    marginTop: "15px",
                    width:"100%",
                },
                domProps: {
                    innerHTML:"<span style='font-family:STHeitiSC-Medium;font-size:12px;color:#919191;letter-spacing:-0.29px;text-align:center;'>备注内容：</span> "+"<span style='fontFamily:STHeitiSC-Medium;letter-spacing:-0.29px;'>"+this.datadetail[index]["advice"]+"</span>"
                } 
            }))
            // console.log(this.datadetail[index]["pass"]);
            if(this.datadetail[index]["pass"]==null){
                elOption.push(h('div',{
                    style: {
                        marginTop: "15px",
                        width:"50%",
                        background:"#109afc",
                        borderRadius:"100px",
                        width:"160px",
                        height:"24px",
                        lineHeight: "24px",
                        textAlign: "center",
                        color:"white"
                    },
                    domProps: {
                        innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:white;letter-spacing:-0.29px;text-align:center;">意见：</span><span style="font-family:STHeitiSC-Medium;font-size:12px;color:white;letter-spacing:-0.29px;text-align:center;">进行中</span>`
                    }
                }))
            }else{
                elOption.push(h('div',{
                    style: {
                        marginTop: "15px",
                        width:"50%",
                        background:!this.datadetail[index]["pass"] ? '#7ada01' : '#fdad02',
                        borderRadius:"100px",
                        width:"160px",
                        height:"24px",
                        lineHeight: "24px",
                        textAlign: "center",
                        color:"white"
                    },
                    domProps: {
                        innerHTML: `<span style="font-family:STHeitiSC-Medium;font-size:12px;color:white;letter-spacing:-0.29px;text-align:center;">意见：</span><span style="font-family:STHeitiSC-Medium;font-size:12px;color:white;letter-spacing:-0.29px;text-align:center;">${!this.datadetail[index]["pass"] ? '通过' : '未通过'}</span>`
                    }
                }))
            }

            elOptions.push(h('el-card',{ ref: this.userRef, style: {
                        //组件的宽度 numbr/String
                        width: `${this.width}px`,
                        padding:'0px',
                        "margin-top":index==0?"0px":"20px",
                        "background-color":"white",
                        "font-size": '14px'
                    },
                    attrs: {
                        header: this.header,    //设置 header，也可以通过 slot#header 传入 DOM
                        bodyStyle: {display: "flex","flex-direction":"row","flex-wrap": "wrap"},//设置 body 的样式
                        shadow: this.shadow,    //设置 body 的样式
                    }
                },elOption))
            elOption=[]
        }
        return h(
            'div',{style:{"background-color":"white"}},elOptions)
        }
})
export default DataCard
