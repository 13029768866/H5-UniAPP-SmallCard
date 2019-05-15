<template>
	<scroll-view 
		class="friend_info"
		scroll-y="true"
	>
		<view class="cardInfo_wrapper">
			<view class="card_wrapper">
				<view class="card_title">
					空卡办理
				</view>
				<view class="card_bank">
					所属银行：<text>平安银行</text>
				</view>
				<view class="card_row">
					<image src="../../static/financial/shouj.png" mode=""></image>
					15678903578
				</view>
					<view class="card_row">
					<image src="../../static/financial/weixin.png" mode=""></image>
					15678903578
				</view>
					<view class="card_row">
					<image src="../../static/financial/dasha.png" mode=""></image>
					浙江联合有限公司
				</view>
			</view>
			<view class="card_func">				
				<view 
					class="card_func_col"
					@click="togglePopup('erweima')"
				>
					<image src="../../static/financial/erwm.png" ></image>				
					<view>
						二维码
					</view>
				</view>
				<!-- 二维码弹窗 -->
				<uni-popup :show="type === 'erweima'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
					<view 
						class="ewm_wrapper">
						<view class="ewm_img"></view>
						<view class="ewm_msg">
							扫描添加微信
						</view>	
					</view>
				</uni-popup>
				<!-- 拨打电话 -->
				<view 
					class="card_func_col"
					@click="makePhoneCall"
				>
					<image src="../../static/financial/dianhua.png" ></image>				
					<view>
						电话
					</view>
				</view>
				<!-- 跳转分享 -->
				<view 
					class="card_func_col"
					@click='share'
				>
					<image src="../../static/financial/fenxiang.png" ></image>				
					<view>
						分享
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<view class="main_business">
				<view class="main_business_title">
					<view class="business_title">
						主营业务
					</view>
				</view>
				<view class="business_con">
					在支付系统中，支付网关和支付渠道的对接是最核心
				的功能。其中支付网关是对外提供服务的接口，所有
				需要渠道支持的资金操作都需要通过网关分发到对应
				的渠道模块上。
				</view>
			</view>
			<view class="main_business">
				<view class="main_business_title">
					<view class="business_title">
						业务描述
					</view>
				</view>
				<view class="business_con">
					在支付系统中，支付网关和支付渠道的对接是最核心
				的功能。其中支付网关是对外提供服务的接口，所有
				需要渠道支持的资金操作都需要通过网关分发到对应
				的渠道模块上。
				</view>
			</view>
			<view class="main_business">
				<view class="main_business_title">
					<view class="business_title">
						荣耀墙
					</view>
				</view>
				<view class="business_images">
					<image 
						class="business_img" 
						src="../../static/financial/erwm.png"
						@click="togglePopup('showImgs')"
					></image>
					<image class="business_img"></image>
					<image class="business_img"></image>				
				</view>
				<uni-popup :show="type === 'showImgs'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
					<image src="../../static/financial/card_bg.png" mode=""></image>
				</uni-popup>
			</view>						
		</view>
	</scroll-view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default{
		components:{
			uniPopup
		},
		onLoad() {
			document.title = '好友信息'
		},
		data(){
			return{
				type:''	/* 弹窗类型 */
			}
		},
		methods:{
			/* 二维码弹窗 */
			togglePopup(type) {
				this.type = type;
			},
			/* 拨打电话 */
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber: '13029768866' 
				});
			},
			/* 分享跳转 */
			share(){
				console.log()
			}
		}
	}
</script>

<style lang="stylus">
// 隐藏滚动条
scroll-view ::-webkit-scrollbar{
	   width: 0;
	   height: 0;
	   color: transparent;
}
page, .friend_info
	position: relative;
	width: 100%;
	height: 100%;
	background: rgba(245,247,251,1);;
	overflow: hidden;
	/* 卡片区域 */
	.cardInfo_wrapper
		background-color: #fff;
		height: 430upx;
		.card_wrapper		
			width: 711upx;
			height: 272upx;
			background: url(../../static/financial/card_bg.png) no-repeat;
			background-size: 711upx 272upx;
			margin-left: 21upx;
			padding-top: 35upx;
			padding-left: 80upx;
			font-size: 22upx;
			color: #fff;		
			.card_title			
				font-size: 30upx;
			.card_bank
				font-size: 26upx;
				margin-top: 5upx;
			.card_row
				display: flex;
				margin-top: 5upx;
				align-items: center;
				image
					width: 36upx;
					height: 36upx;	
					margin-right: 8upx;
		.card_func
			display: flex;
			margin-top: 16upx;
			image
				width: 76upx;
				height: 76upx;	
				margin-bottom: 6upx;
			.card_func_col
				display: flex;
				flex: 1;
				flex-direction: column;
				align-items: center;
				font-size: 28upx;
	/* 业务板块 */
	.main_business
		background-color: #fff;
		margin-top: 8upx;
		// padding-left: 40upx;
		.main_business_title
			border-bottom: 4upx solid #F5F7FB;
			.business_title
				position: relative;
				line-height: 65upx;						
				font-size: 28upx;
				margin-left: 40upx;
				padding-left: 15upx;
				&::after
					position: absolute;
					left: 0;
					top: 20upx;
					content: ''
					width: 4upx;
					height: 26upx;
					background-color: #387DFF;
		.business_con
			min-height: 180upx;
			padding: 15upx 50upx 30upx 50upx;		
			font-size: 28upx;
			line-height: 48upx;
		.business_images
			padding: 30upx 61upx;
			.business_img
				width: 180upx;
				height: 180upx;
				margin-right: 45upx;
				margin-bottom: 25upx;
				background-color: red;
				&:nth-child(3n)
					margin-right: 0;
	/* 二维码弹窗 */
	.ewm_wrapper
		width: 600upx;
		height: 350upx;
		background: url(../../static/financial/kuang.png) no-repeat;
		background-size: 600upx 350upx;
		.ewm_img
			width: 202upx;
			height: 202upx;
			margin-top: 40upx;
			margin-left: 200upx;
			background-color: red;
		.ewm_msg
			font-size: 36upx;
			text-align: center;
			margin-top: 40upx;
</style>
