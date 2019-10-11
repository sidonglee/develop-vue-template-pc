<template>
    <div class="head-navmenu-container">
        <!-- <ul>
            <li class="active"><i class="el-icon-document"></i>项目管理</li>
            <li><i class="el-icon-menu"></i>报销管理</li>
            <li><i class="el-icon-goods"></i>采购管理</li>
            <li><i class="fa fa-user-o"></i>人资管理</li>
        </ul> -->
        <ul>
            <template v-for="(item,index) in navMenus" >
                <li :key="item.id+item.pid" :menuid="item.id" :class="index==0?'active':''"><i :class="item.icon"></i>{{item.name}}</li>
            </template>
        </ul>
    </div>
</template>
<script>
import {on,off,getElmsByClsName,addClass,hasClass,removeClass} from '@/utils/dom'
import {toLowerCase} from '@/utils/tools'
import { mapGetters } from 'vuex'

export default {
    name: 'header-navmenu-page',
    data(){
        return {
            activeName: 'third'
        }
    },
    computed: {
        ...mapGetters({
            navMenus: 'user/getNavMenus',
            projectMenus: 'user/getProjectRolesMenus',	//项目管理
            buyMenus: 'user/getBuyRolesMenus',			//物资管理
            expenseMenus: 'user/getExpenseRolesMenus',  //报销管理
            hrMenus: 'user/getHrRolesMenus',            //人资管理
            jobMenus: 'user/getJobRolesMenus',          //我的任务
        })
    },
    mounted(){
        setTimeout(() => {
            off(getElmsByClsName("head-navmenu-container")[0],'click',this.doHandler)
            on(getElmsByClsName("head-navmenu-container")[0],'click',this.doHandler)
            //设置菜单
            this.getLinkComponent('link-navmenu-panel').setMenus(this.jobMenus)
        }, 0);
    },
    methods: {
        doHandler(e){
            // console.info('aaaaaaaaaaa',e.target.tagName);
            // if(e.target.attributes['menuid']===void(0)) return
            let listLI = Array.from(getElmsByClsName('head-navmenu-container')[0].querySelectorAll('li'));
            listLI.forEach(item=>{
                (hasClass(item,'active')) && removeClass(item,'active');
            })
            let target = e.target
            if(target.attributes['menuid'] === void(0)) return
            if(toLowerCase(target.tagName)==='i'){
                target = e.target.parentNode
            }
            if(toLowerCase(target.tagName) === 'li'){
                addClass(target,'active')
            }
            //切换菜单
            let menuid = target.attributes['menuid'].value
            if(menuid==36){
                this.getLinkComponent('link-navmenu-panel').setMenus(this.projectMenus)
            }
            if(menuid==37){
                this.getLinkComponent('link-navmenu-panel').setMenus(this.expenseMenus)
            }
            if(menuid==38){
                this.getLinkComponent('link-navmenu-panel').setMenus(this.buyMenus)
            }
            if(menuid==39){
                this.getLinkComponent('link-navmenu-panel').setMenus(this.hrMenus)
            }
            if(menuid==148){
                this.getLinkComponent('link-navmenu-panel').setMenus(this.jobMenus)
            }
        }
    }
}
</script>
<style>
    .head-navmenu-container {
        height:100%; 
        /* border:5px solid #000; */
        
        box-sizing: border-box;
        padding: 0px 70px;
    }
    .head-navmenu-container ul,li{ padding:0; margin:0;}
    .head-navmenu-container ul{ 
        height:100%;
        overflow:hidden; 
        margin-right:-20px;
    }
    .head-navmenu-container li{ 
        height:100%;
        width:150px; 
        /* background:yellow; */
        float:left; 
        margin-right:20px; 
        margin-bottom:10px;
        line-height: 68px;
        text-align: center;
        letter-spacing:2px;
        cursor: pointer;
    }
    .head-navmenu-container .active{
        color: #189DFB;
        border-bottom: 2px solid #189DFB;
        box-sizing: border-box;
    }
</style>
