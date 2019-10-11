/**
 * 数据字典配置接口
 * 'KEY': [{'paramValue':key,'paramDesc': value}]
 * KEY也可以是 '命名空间/名称' 防止命名冲突
 * 如果key小写载入时会被转换大写
 */
//公用数据字典
let CommonDictionary = {
    'SEX_TYPE': [
      { 'paramValue': 0, 'paramDesc': '女' },
      { 'paramValue': 1, 'paramDesc': '男' }
    ],
    'FLAG_TYPE': [
        { 'paramValue': 1, 'paramDesc': '新增' },
        { 'paramValue': 10, 'paramDesc': '等待' },
        { 'paramValue': 128, 'paramDesc': '归档' },
        { 'paramValue': 256, 'paramDesc': '停用' },
        { 'paramValue': 384, 'paramDesc': '丢弃' }
    ],
    'WF_TYPE': [
        { 'paramValue': 0, 'paramDesc': '退回' },
        { 'paramValue': 1, 'paramDesc': '提交' },
        { 'paramValue': 2, 'paramDesc': '转交' }
    ],
    'BOOLEAN_NUMBER_TYPE': [
        { 'paramValue': 0, 'paramDesc': '否' },
        { 'paramValue': 1, 'paramDesc': '是' },
    ],
    'BOOLEAN_BOOLEAN_TYPE': [
        { 'paramValue': false, 'paramDesc': '否' },
        { 'paramValue': true, 'paramDesc': '是' },
    ],
    //模块权限
    'ACCESS_TYPE': [
        {'paramValue': 0, 'paramDesc': 'default'},  //可分配
        {'paramValue': 1, 'paramDesc': 'read'},     //只读
        {'paramValue': 2 ,'paramDesc': 'write'}     //可写
    ]
    //...
  }
//自定义的数据字典 (项目中自定义的转换在UserDictionary中定义,并且用user充当命名空间)
let UserDictionary = {
    'USER/BOOLEAN_TYPE': [
        { 'paramValue': 'runing', 'paramDesc': '在途' },
        { 'paramValue': 'finish', 'paramDesc': '结束' },
    ]
    //...
}
export default {...CommonDictionary,...UserDictionary}