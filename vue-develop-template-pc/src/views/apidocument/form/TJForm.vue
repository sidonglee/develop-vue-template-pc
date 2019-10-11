<template>
	<!-- form表单 -->
	<tj-form :width="width" :detailData="createDetailData()" :layout="layout" :buttons="buttons" user-ref="myref"></tj-form>
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
            aaa{{ruleForm.name.length}}
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
    </el-form> -->
</template>
<script>
export default {
    name: 'tjform-component',
    components: {
        tjForm: new TjUI.form.Form()
    },
    data(){
        return {
            /* ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            }, */
			
			width: 550,	//表单form的宽度
            layout: {
                columns: 2,
                width: 270,
                labelWidth: 80,
				labelPosition: 'left',
				disabled: false,
				buttonPosition: 'right',
			},
			buttons: [
				//{text: '提交'},
				//{text: '取消'},
				{text: '更多',menu: [{text: '喝水',listeners: {click: (event)=>{console.info('1',event);}}},{text: '吃饭',listeners: {click: (event)=>{console.info('2',event);}}}]}
			],
			partName: '打球',
			num: 10,
			comboboxValue: ['02','05'],
			comboboxInputValue: '橙子',
			startdate: '2018-09-11',
			enddatetime: '2018-12-24 15:22:12',
			usercolor: '#4A8AF4',
			treeValue: ['待我处理','我处理过'],
			defaultCheckedKeys: [158,160],
			radion: {
                value: '02',
                options: [{label: '室内',value: '01'},{label: '室外',value: '02',disabled: true}]
            },
            checkbox: {
                value: ['02','01'],
                options: [{label: '爬山',value: '01'},{label: '美食',value: '02',disabled: true}]
			},
			comboGrid: {
				defaultCheckedKeys: [16,138,140,146],
				value: ['testName','21`2','34324','wuhan'],
			}

		}
	},
	created(){
        setTimeout(() => {
            console.info('开始响应式');
			this.partName = '跑步'
			this.num = 12
			this.comboboxValue = ['03','04']
			this.comboboxInputValue = "桃子"
			this.usercolor = '#1CA261'

			this.treeValue = ['发起申请','财务付款','项目立项'],
			this.defaultCheckedKeys = [47,49,52]

			this.comboGrid.defaultCheckedKeys = [16],
			this.comboGrid.value = ['testName']
		}, 2000);
		setTimeout(() => {
			this.comboboxValue = ['03','04','05']
			this.startdate = '2018-12-24'
			this.enddatetime = '2018-12-24 15:24:20'
		}, 4000);
    },
    mounted(){},
    methods: {
		createDetailData(){
			return [
                {span: 1,name: 'part',value: this.partName,link: 'aaaaaabb',label: '活动名称',type: 'TextField',width: 170,emptyText: '活动名称',rule: [
					{required: true,message: '请输入活动名称', trigger: 'blur'},
					// {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
					//{validator: this.checkAge, trigger: 'blur'},
				]},
                {span: 1,name: 'num',value: this.num,label: '统计',type: 'InputNumber',width: 170},
				{span: 1,name: 'goods',value: this.comboboxValue,returnType: 'string',returnTypeSep:',',displayField:'label',valueField:'value',label: '物品选择',type: 'ComboBox',width: 170,multiple: true,
					options: [{value:'01',label:'苹果'},{value:'02',label:'香梨'},{value:'03',label:'西瓜'},{value:'04',label:'桃子'},{value:'05',label:'猕猴桃'}]
				},
				{span: 1,name: 'fruit',value: this.comboboxInputValue,displayField:'label',valueField:'value',label: '水果',type: 'ComboBoxInput',width: 170,
					options: [{value:'01',label:'苹果'},{value:'02',label:'香梨'},{value:'03',label:'西瓜'},{value:'04',label:'桃子'},{value:'05',label:'猕猴桃'}]
				},
				{span: 1,name: 'destination',value: '',label: '目的地',type: 'TextField',width: 170,emptyText: '目的地'},
				{span: 1,name: 'vehicle',value: this.treeValue,defaultCheckedKeys:this.defaultCheckedKeys,label: '交通工具',type: 'ComboTree',returnType:'string',multiple: true,expanded: false,width: 170,emptyText: '交通工具',conurl: 'user/readRoleMenus',queryParams: {syscode: 'oa',token: 'b69482e1-f936-495a-822a-83578517ee15'},
					listeners: {
						change: (data)=>{
							console.info('bbbbb ',data);
						}
					}
					//conurl: 'deportment/getDepartTrees',
					/* store: [
						{
							id: 1,
							label: '方式1',
							children: [
								{
									id: 2,
									label: '走路'
								},
								{
									id: 3,
									label: '骑车'
								}
							]
						},
						{
							id: 10,
							label: '方式2',
							children: [{
								id: 4,
								label: '公交'
							}]
						}
					],
					rule: [
						//{type: 'array',required: true,message: '请选择出行方式', trigger: 'blur'},
						{type: 'array',required: true,validator: this.checkVehicle, trigger: 'change'},
					] */
				},
				{span: 1,name: 'startdate',value: this.startdate,type: 'DatePicker',width: 170,label: '出发日期'},
				{span: 1,name: 'enddatetime',value: this.enddatetime,type: 'DateTimePicker',width: 170,label: '截止时间'},
				{span: 1,name: 'usercolor',value: this.usercolor,type: 'Color',width: 170,label: '主题'},
				{span: 1,name: 'userlist',type: 'ComboGrid',width: 170,label: '用户列表',
					defaultCheckedKeys: this.comboGrid.defaultCheckedKeys,value: this.comboGrid.value,
					// returnType: 'array',
					conurl: 'hr/payorder/apply/readUserPage',queryParams:{token: 'test_123'},
					columns:[
						{label:'名称',field:'name',sort: true,render: (h,{ row,column,field,$index })=>{
							return h('i',{"class":{'el-icon-time':'el-icon-time'}},row[field])
						},renderHeader: (h, { column, $index })=>{
							return h('span',{style:{color: '#0E9F5A'}},column.label)
							//return column.label
						}},
					],
					listeners: {
						change: (values) => {
							console.info('选中的值 ',values);
						}
					}
			    },
				{span: 1,name: 'isgo',value: false,label: '即时出发',type: 'SwitchButton',width: 170},
				{span: 1,name: 'partyarea',value: this.radion.value,options: this.radion.options,label: '活动区域',type: 'Radio',width: 170},
				{span: 1,name: 'partycontent',value: this.checkbox.value,options: this.checkbox.options,label: '内容',type: 'CheckBox',width: 170},
				{span: 1,name: 'remark',value: '请带好干粮',type: 'Label',width: 170},
				{span: 1,name: 'hiddenid',value: '123',type: 'TextHidden',width: 170},
			]
		},
        checkAge(rule, value, callback){
			if (!value) {
				callback(new Error('年龄不能为空'));
			}
			callback();
		},
		checkVehicle(rule, value, callback){
			//console.info( value );
			if(!value.length){
				callback(new Error('请选择出行方式'));
			}
			callback();
		},
		colorinput(value){
			this.color1 = value;
		}
    }
}
</script>
<style>
/* .el-select-dropdown__item{
	padding: 0px;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
	background-color: #fff;
} */
</style>

<style lang="less" scoped>
  /* .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
</style>











