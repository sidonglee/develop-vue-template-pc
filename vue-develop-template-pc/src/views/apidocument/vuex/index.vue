<template>
    <div>数量：{{a}}&nbsp;重量：{{b}}&nbsp;地址：{{address}}</div>
</template>
<script>
import { mapState,mapActions,mapGetters } from 'vuex'

export default {
    name: 'apidocument-vuex',
    computed:{
		...mapState('cart',{
			a: state => state.num,
			b: state => state.weight
        }),
        ...mapState('order',{
			address: state => state.address
		}),
		...mapGetters({
			//menus: 'user/generateRoutes'
		})
    },
    methods: {
		...mapActions([  //es6 解构
			'cart/add_goods',
			'cart/del_goods',
			'order/write_address'
        ]),
    },
    mounted(){
        setTimeout(() => {
            this['order/write_address']('下城区')
        }, 2000);
	}
}
</script>
