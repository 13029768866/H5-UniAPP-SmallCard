import http from './http.js'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
 

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'


//	热门超英
export const erweima = (data,header) => {
	return http.request({
		url: '/cust-auth-api/getMyCode',
		method: 'GET',
		data,
		header
	});
}
/* 绑卡接口 */
export const bindCards = (data,header) => {
	return http.request({
		url: '/card-controller/custCardList',
		method: 'GET',
		data,
		header
	});
}
/* 绑卡接口 */
export const payUpGrade = (data,header) => {
	return http.request({
		url: '/upGrade-controller/payUpGrade',
		method: 'GET',
		data,
		header
	});
}
// 默认全部导出  import api from '@/http/api.js'
export default {
	erweima,
    bindCards,
	payUpGrade
}