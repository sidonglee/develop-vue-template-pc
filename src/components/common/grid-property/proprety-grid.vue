<template>
    <table
    :width="width"
    :height="height"
    class="source demo-block">
        <tr class="head">
            <td class="left">Name</td>
            <td>Value</td>
        </tr>
        <tr v-for="(item,index) of items" :key="index" >
            <td width="50%" class="left">{{item.name}}</td>
            <td width="50%">{{item.value}}</td>
        </tr>
    </table>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {name:"Name11dfwdgnrwjgbvwrjvbwrovnwovw111",value:"Li"},
                {name:"Age",value:"18"},
                {name:"Sex",value:"man"},
                {name:"Grade",value:"1"},
                {name:"Singer",value:"yes"}
            ]
        }
    },
    props:{
        width:{
            type:String,
            default:'440px'
        },
        height:{
            type:String,
            default:'240px'
        }
    }
}
</script>
<style lang="less" scoped>
    table tr:nth-child(odd){
        text-align: center;
        color: #909399;
        background: #fafafa;
    }
    table tr:nth-child(even){
        text-align: center;
        color: #909399;
        background: white;
    }
    table tr:hover {
        background-color: #F5F7FA;
	}
    table tr td{
        border-bottom: 1px #EBEEF5 solid;
        word-break:break-all;
    }
    .left{
        border-right: 1px #EBEEF5 solid;
    }
    .source{
        font-size: 15px;
        font-family: "Microsoft YaHei";
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        padding: 10px;
        border-collapse: collapse;
    }
    .head{
        font-weight:bold;
        text-align: center;
        background: white !important;
    }
    .head :hover{
        background: white !important;
    }
</style>

