import { ajaxBaseURL } from "@/config/env";
import dataCard from './data-card'

const DataProcess = TjUI.extend(js.base.fn,{
    initComponent(){
        this['extends'] = new TjUI.panel.Panel()
    },
    props:{
        imgconurl: String,
        dataconurl: String,
        queryParams: Object
    },
    data(){
        return {
            // phoconurl:this.imgconurl,
            // listconurl:this.dataconurl,
            layout: 'border',
            formParams: {
                token: this.$store.getters['user/getToken'],
                processid:this.queryParams.processid,
            },
        }
    },
    mounted(){
        this.initEditPanel()
    },
    methods: {
        initEditPanel(){
            let north = {
                component: new TjUI.panel.Panel(),
                props: {
                    userHtml:`<div style="height: 240px;overflow: auto; width:100%;display: flex;flex-direction: column;align-items: center;"><img style="max-width: 100%;width: 765px;height: 240px;" src=${ajaxBaseURL}/${this.imgconurl}/${this.formParams.processid}/diagram?token=${this.formParams.token}></div>`,
                },
                style: {
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height:'240px',
                },
                slot: 'north'
            }
            let center = {
                component: new dataCard(),
                props: {
                    conurl: this.dataconurl,
                    queryParams: this.queryParams
                },
                style: {
                    overflowY: 'auto',
                },
                slot: 'center'
            }
            this.add([north,center])
        }
        
    }
})
export default DataProcess