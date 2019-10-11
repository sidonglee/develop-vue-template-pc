<template>
  <div id="app">
	<router-view :key="$route.fullpath"/>
  </div>
</template>
<script>
export default {
	name: 'App',
	computed:{},
	methods: {
		//注册全局视图层事件
		addEvents(){
			GLOBAL.$vbus.off('axios.ajax_handle_error')
			GLOBAL.$vbus.off('axios.request_error')
			GLOBAL.$vbus.off('axios.response_error')
			GLOBAL.$vbus.off('axios.ajax_data_unusual')
			GLOBAL.$vbus.on('axios.ajax_handle_error',(msg)=>{
				if(!(!!msg)){
					return 
				}
				this.$message.error({duration: 1500,message: msg});
			})
			GLOBAL.$vbus.on('axios.request_error', (msg) => {
				this.$message.error({duration: 1500,message: msg});
			})
			GLOBAL.$vbus.on('axios.response_error', (msg) => {
				this.$message.error({duration: 1500,message: msg});
			})
			GLOBAL.$vbus.on('axios.ajax_data_unusual', (resMsg) => {
				this.$message.error({
					duration: 1500,
					message: (typeof resMsg === 'string') ? resMsg : resMsg.key+resMsg.msg
				});
			})
		}
	},
	created(){
		this.addEvents()
	},
	mounted(){
		// console.info(this.$api);
	}
}
</script>

<style scoped>
	#app{
		height:100%;
	}
</style>

