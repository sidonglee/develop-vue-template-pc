/**
 * 下载文件 兼容ie
 * downfile(`${ajaxBaseURL}/project/tender/finance/${processID}/${detailID}/paymentfile`,{name: fileName,token: this.$store.getters['user/getToken']})
 * qs.stringify()会自动将非字符和非数字的内容通过encodeURIComponent()进行转义,不需要在将参数使用encodeURIComponent()转义
 */
import { getExplorer } from '@/utils/tools'
import qs from 'querystring'

const Down = function(url, queryParams = {}){
	window.open(`${url}?${qs.stringify(queryParams)}`, '_self');
}
export default Down