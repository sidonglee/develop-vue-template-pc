<template>
    <div>
        <div class="text-field">
            <tj-text-field v-bind="params" v-model="params.value"></tj-text-field>
            <div>{{params.value}}</div>
        </div>
        <div class="text-hidden">
            <tj-text-hidden></tj-text-hidden>
        </div>
        <div class="input-number">
            <tj-input-number v-bind="numberParams" v-model="numberParams.value"></tj-input-number>
            <div>{{numberParams.value}}</div>
        </div>
        <div class="combo-box">
            <tj-combo-box v-bind="comboParams" v-model="value"></tj-combo-box>
            <div>{{value}}</div>
        </div>
        <div class="button">
            <tj-button v-bind="button" @afterClickHandler="button.afterClickHandler"></tj-button>
        </div>
        <div class="button-group">
            <tj-button-group :buttonGroup="buttonGroup" :width="buttonGroupWidth" :columns="buttonGroupColumns"></tj-button-group>
        </div>
        <div class="text-area">
            <tj-text-area :width="textArea.width" :rows="textArea.rows"></tj-text-area>
        </div>
        <div class="button-menu">
            <tj-button-menu text="更多操作" :menu="menu"></tj-button-menu>
        </div>
        <div class="combo-tree">
            <tj-combo-tree v-model="comboTree.value" multiple :store="comboTree.store" :value="comboTree.combotreeValue" :defaultCheckedKeys="comboTree.defaultCheckedKeys"></tj-combo-tree>
        </div>
        <div class="date-picker">
            <tj-date-picker value="2018-09-11"></tj-date-picker>
        </div>
        <div class="date-time-picker">
            <tj-date-time-picker value="2018-09-21 19:18:12" v-model="dateChange"></tj-date-time-picker>
            <div>{{dateChange}}</div>
        </div>
        <div class="color">
            <tj-color v-bind="color" v-model="color.colorValue"></tj-color>
            <div>{{color.colorValue}}</div>
        </div>
        <!-- 请看TJForm.vue <div class="combo-grid">
            <tj-combo-grid></tj-combo-grid> 
        </div> -->
        <div class="file-box">
            <tj-file-box></tj-file-box>
        </div>
        <div class="combo-box-input">
            <tj-combo-box-input conurl="dict/readProjectsort" :queryParams= comboInputParams.queryParams v-model="comboInputParams.valueInput" :value="comboInputParams.value_in" displayField="name" valueField="id"></tj-combo-box-input>
            <div>{{comboInputParams.valueInput}}</div>
        </div>
        <div class="switch-button">
            <tj-switch-button activeText='按月付费' inactiveText='按年付费'></tj-switch-button>
        </div>
        <div class="radio">
            <tj-radio :options="radion.options" :value="radion.value"></tj-radio>
        </div>
        <div class="checkbox">
            <tj-checkbox :value="checkbox.value" :options="checkbox.options"></tj-checkbox>
        </div>
        <div class="radiobtngroup">
            <tj-radio-btn-group :options="radioGroup.options" :value="radioGroup.value"></tj-radio-btn-group>
        </div>
        <div class="timePicker">
            <tj-time-picker></tj-time-picker>
        </div>
        <div class="label">
            <tj-label html="<em>你好</em>"></tj-label>
        </div>
    </div>
</template>
<script>

export default {
    name: 'form-field-view',
    components: {
        tjTextField: new TjUI.form.tools.TextField(),
        tjTextHidden: new TjUI.form.tools.TextHidden,
        tjInputNumber: new TjUI.form.tools.InputNumber(),
        tjComboBox: new TjUI.form.tools.ComboBox(),
        tjButton: new TjUI.form.tools.Button(),
        tjButtonGroup: new TjUI.form.tools.ButtonGroup(),
        tjTextArea: new TjUI.form.tools.TextArea(),
        tjButtonMenu: new TjUI.form.tools.ButtonMenu(),
        tjComboTree: new TjUI.form.tools.ComboTree(),
        tjDatePicker: new TjUI.form.tools.DatePicker(),
        tjDateTimePicker: new TjUI.form.tools.DateTimePicker(),
        tjColor: new TjUI.form.tools.Color(),
        tjComboGrid: new TjUI.form.tools.ComboGrid(),
        tjFileBox: new TjUI.form.tools.FileBox(),
        tjComboBoxInput: new TjUI.form.tools.ComboBoxInput(),
        tjSwitchButton : new TjUI.form.tools.SwitchButton,
        tjRadio: new TjUI.form.tools.Radio,
        tjCheckbox: new TjUI.form.tools.Checkbox,
        tjRadioBtnGroup: new TjUI.form.tools.RadioBtnGroup,
        tjTimePicker: new TjUI.form.tools.TimePicker,
        tjLabel: new TjUI.form.tools.Label,
    },
    data(){
        return {
            comboTree: {
                store: [
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
                combotreeValue: ['走路','公交'],
                defaultCheckedKeys: [2,4],
            },
            params: {
                value: '苹果',
                width: 200,
            },
            numberParams: {
                value: 10
            },
            value: ['02','05'],
            comboParams: {
                //combo-box需要注意v-model的value和value不能是同一个
                value: ['02'],
                returnType: 'string',
                returnTypeSep:',',
                displayField:'label',
                valueField:'value',
                label: '物品选择',
                width: 170,
                multiple: false,
				options: [{value:'01',label:'苹果'},{value:'02',label:'香梨'},{value:'03',label:'西瓜'},{value:'04',label:'桃子'},{value:'05',label:'猕猴桃'}]
            },
            comboInputParams: {
                optionsInput: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value_in: '西湖醋鱼',
                valueInput: '西湖醋鱼',
                queryParams: {token: 'test_123'},
            },
            button: {
				id: 'print-btn',
				text: '打印',
				icon: 'el-icon-search',
				iconPosition: 'right',
				afterClickHandler: ()=>{
					console.info( '点击之后处理事件' );
				},
				listeners: {
					click: (event)=>{
						console.info('打印 ',event,this.params.value)
					}
				}
            },
            buttonGroupWidth: 338,
			buttonGroupColumns: 5,
			buttonGroup: [
				{text: '提交'},
				{text: '打印123'},
				{text: '分析'},
				{text: '共享'},
				{text: '同步'},
				{text: '停用'},
				{text: '新增'}
            ],
            textArea: {
                width: 300,
                rows: 5,
            },
            menu: [{text:'提交'},{text:'更新',listeners: {click: ()=>{alert('更新')}}}],
            dateChange: '',
            color: {
				size: 'mini',
                colorValue: '#4A8AF4',
                value: '#4A8AF4',
				listeners: {
					change: (val)=>{
						console.info( 'bbbbbbbbb ',val );
					}
				}
            },
            radion: {
                value: '01',
                options: [{label: '苹果',value: '01'},{label: '香蕉',value: '02',disabled: true},{label: '西瓜',value: '03'}]
            },
            checkbox: {
                value: ['01','02'],
                options: [{label: '苹果',value: '01'},{label: '香蕉',value: '02',disabled: true},{label: '西瓜',value: '03'}]
            },
            radioGroup: {
                value: '01',
                options: [{label: '苹果',value: '01'},{label: '香蕉',value: '02',disabled: true},{label: '西瓜',value: '03'}]
            }
        }
    },
    mounted(){
        /* document.getElementById('aaaaa').addEventListener('click',function(){
            document.getElementById('bbb').click()
            document.getElementById('aaaaa').focus()
        },false); */
    },
    methods: {
        handleClick(event){
            // console.info('1111111111',this.$refs['my-select'].$el,event);
            this.$refs['my-select'].$el.click()
            event.target.focus()
        }
    }
}
</script>
<style>
    #aaaaa{
        width: 217px;
        position: absolute;
        z-index: 1
    }
    #bbb{
        width: 217px;
        z-index: -1;
        border: 0px;
    }
</style>
