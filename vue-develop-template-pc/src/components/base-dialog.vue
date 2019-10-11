<template>
    <div v-if="hide"> {{message}} </div>
</template>

<script>
export default {
  name: 'base-dialog',
  data(){
    return{
      message: '通用弹出组件',
      hide: false
    }
  },
  methods:{
    show(msg){
      this.hide = true
      this.message = msg
    }
  },
  mounted(){
    GLOBAL.$vbus.on('basedialog.show',this.show)
  },
  
}
</script>

