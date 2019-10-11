import tabPanel from '@/components/common/sys-module/base-tab-panel'

export default {
	extends: new TjUI.panel.Panel,
	mixins: [tabPanel],
	// props: ['htmlaaa'],
	data(){
		return {
			layout: 'fit',
			html: this.userHtml,
		}
	},
	methods: {
		reloadTabModule(r){
			console.info('eeeeeeeee ',r);
		}
	}
}