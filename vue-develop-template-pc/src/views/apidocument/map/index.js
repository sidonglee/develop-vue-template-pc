// import aaa from '@/components/common/panel/ux/map/user-base-control'
import bb from './zoom-control'

export default {
	extends: new TjUI.panel.ux.TJMap,
	created(){
		setTimeout(() => {
			let userControl = new TjUI.panel.ux.map.userBaseControl({tjMap: this})
			userControl.initialize(bb)
		}, 0);
		
	}
}