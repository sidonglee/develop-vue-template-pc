/**
 * 工具栏
 */
const Tbar = {
    extends: new TjUI.grid.defineTbar.DefineTbar(),
    data(){
        return {
            ttt: '你好',
            items: [
                {text: '呼叫'}
            ],
            userStyle: {
                'background-color': '#ADF2D1'
            }
        }
    },
    mounted(){
        //console.info(this.getPanel.you);
    },
    methods: {
        doArchive(){
            alert('归档')
        },
    }
}
export default Tbar