import http from './http.js'

 

/* 金融圈start */
// 分类列表
export const professionList = (data,header) => {
	return http.request({
		url: '/financial-controller/professionList',
		method: 'GET',
		data,
		header
	})
}
// 业务接口列表
export const financialList = (data,header) => {
	return http.request({
		url: '/financial-controller/financialList',
		method: 'GET',
		data,
		header
	})
}
/* 金融圈end */

/* 信用开套现首页接口start */
/* 在线交易银行卡 */
export const bindCards = (data,header) => {
	return http.request({
		url: '/card-controller/custCardList',
		method: 'GET',
		data,
		header
	})
}
/* 在线交易通道 */
export const channelList = (data,header) => {
	return http.request({
		url: '/product-controller/getTaoxianChannelList',
		method: 'GET',
		data,
		header
	})
}
/* 通道支持银行查询 */
export const supporBank = (data,header) => {
	return http.request({
		url: '/product-controller/supporBank',
		method: 'GET',
		data,
		header
	})
}
/* 点击通道接口 */
export const cardAuthentication = (data,header) => {
	return http.request({
		url: '/payment-controller/payment',
		method: 'GET',
		data,
		header
	})
}
/* 省市查询接口 */
export const merchantCity = (data,header) => {
	return http.request({
		url: '/payment-controller/landingMerchantCity',
		method: 'GET',
		data,
		header
	})
}
/* 落地商户接口 */
export const landingMerchant = (data,header) => {
	return http.request({
		url: '/payment-controller/landingMerchant',
		method: 'GET',
		data,
		header
	})
}
/* 套现-确认提交 */
export const payCommit = (data,header) => {
	return http.request({
		url: '/payment-controller/payment-commit',
		method: 'GET',
		data,
		header
	})
}
/* 提交短信验证码 */
export const paySms = (data,header) => {
	return http.request({
		url: '/payment-controller/paySms',
		method: 'GET',
		data,
		header
	})
}
/* 信用卡套现首页接口end */
/* 会员升级 */
export const payUpGrade = (data,header) => {
	return http.request({
		url: '/upGrade-controller/payUpGrade',
		method: 'GET',
		data,
		header
	});
}
/* 我的收益start */
// 我的收益上半部分
export const myProfit = (data,header) => {
	return http.request({
		url: '/profit-controller/getMyProfit',
		method: 'GET',
		data,
		header
	});
}
// 我的收益明细部分
export const profitList = (data,header) => {
	return http.request({
		url: '/profit-controller/profitList',
		method: 'GET',
		data,
		header
	});
}
// 提现页面
export const withdrawal = (data,header) => {
	return http.request({
		url: '/profit-controller/cash-withdrawal',
		method: 'GET',
		data,
		header
	});
}
// 提现明细
export const cashList = (data,header) => {
	return http.request({
		url: '/profit-controller/cash-list',
		method: 'GET',
		data,
		header
	});
}

/* 我的收益end */
// 帮助中心
export const appHelpInfo = (data,header) => {
	return http.request({
		url: '/mng-controller/appHelpInfo',
		method: 'GET',
		data,
		header
	});
} 
// 默认全部导出  import api from '@/http/api.js'
export default {
    bindCards,
	payUpGrade,
	channelList,
	supporBank,
	cardAuthentication,
	merchantCity,
	landingMerchant,
	payCommit,
	paySms,
	myProfit,
	profitList,
	withdrawal,
	appHelpInfo,
	cashList,
	professionList,
	financialList
}