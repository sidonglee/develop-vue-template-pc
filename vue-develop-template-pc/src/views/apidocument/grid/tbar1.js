/**
 * 工具栏
 */
const Tbar1 = {
    extends: new TjUI.toolBar.ToolBar(),
    data(){
        return {
            items: [
                {text: '同步到缓存',listeners: {
                    click: ()=>{
                        alert(this.getPanel.you)
                    }
                }}
            ]
        }
    }
}
export default Tbar1