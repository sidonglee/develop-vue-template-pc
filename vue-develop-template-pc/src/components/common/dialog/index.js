/**
 * 饿了么 Dialog（对话框窗口）
 */
import Vue from 'vue'

TjUI.ns('TjUI.dialog')
TjUI.dialog = {
	message(message = '这是一条消息提示',type = 'success',duration = 1500,customClass = ''){
		Vue.prototype.$message({
			showClose: true,
			message: message,
			duration: duration,
			type: type,
			customClass: customClass
		});
	},
	prompt(confirmFn, cancelFn = function(){}){
		Vue.prototype.$prompt('请输入意见', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
		}).then(({ value }) => {
			confirmFn(value)
		}).catch(() => {
			cancelFn()
		});
	},
    process(confirmFn, cancelFn, closeFn = function(){}){
		Vue.prototype.$prompt('请输入意见', '提示', {
			distinguishCancelAndClose: true,
			confirmButtonText: '不同意',
			cancelButtonText: '同意',
			inputPattern: /\S/,
			inputErrorMessage: '输入不能为空！',
			customClass: 'user-process-customcls'
		}).then(({ value }) => {
			//不同意
			cancelFn(value)
		}).catch((action) => {
			 //同意
			 let value = document.querySelector(`.user-process-customcls .el-input__inner`).value
			 if(action==='close'){
				closeFn(value)
				return
			 }
			 confirmFn(value)
		});
	},
	confirm: (msg='信息',confirmFn, cancelFn = function(){},title = '提示')=>{
		Vue.prototype.$confirm(msg, title, {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			confirmFn()
		}).catch(() => {
			cancelFn()
		})
	}
}