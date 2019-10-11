/**
 * ajax 原生请求 
 * 同步GET请求
 * tip: 同步请求的url 地址不用写入servies的api中
 * let data = clientAjax('/user/lspoygon/module/moduleController/readOperator?token=xxx')
 */
const clientAjax = function(url){
    const client = new XMLHttpRequest();    //不判断低版本浏览器
    client.open("GET", url,false);
    client.setRequestHeader("Accept", "application/json");
    client.send();

    if(client.readyState == 4){
		var resData = "";
		if(client.status == 200){
			resData = client.responseText;
		}else{
            new Error('同步请求失败!')
		}
		client.abort();
		return resData;
	}
	return "";
}

export default clientAjax




