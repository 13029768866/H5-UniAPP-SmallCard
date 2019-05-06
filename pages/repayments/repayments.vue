<template>
	<scroll-view scroll-y class="repayments">
		<view class="repay_type_wrapper">
			<view class="repay_type">
				<image src="../../static/zhineng.png" class="repay_type_image"></image>
				<view class="card_des">
					适合卡片额度2万元以下，需预留总额度的10%起
				</view>
				<view class="create_plan">
					(创建计划）
				</view>
				<view class="amount_tip">
					单笔消费金额≤1000元的用户
				</view>
			</view>
			<image class="check_detail" src="../../static/check_detail.png"></image>
		</view>
		<view class="repay_type_wrapper">
			<view class="repay_type">
				<image src="../../static/konka.png" class="repay_type_image"></image>
				<view class="card_des">
					需预留手续费，有效缓解您的压力
				</view>
				<view class="create_plan">
					(创建计划）
				</view>
				<view class="amount_tip">
					无需预留还款金额
				</view>
			</view>
			<image class="check_detail" src="../../static/check_detail.png"></image>
		</view>
		<view class="repay_type_wrapper">
			<view class="repay_type">
				<image src="../../static/dae.png" class="repay_type_image"></image>
				<view class="card_des">
					一键轻松还款，有多少还多少
				</view>
				<view class="create_plan">
					(创建计划）
				</view>
				<view class="amount_tip">
					单笔消费小于5万元
				</view>
			</view>
			<image class="check_detail" src="../../static/check_detail.png"></image>
		</view>
		<view class="repay_type_wrapper">
			<view class="repay_type">
				<image src="../../static/liji.png" class="repay_type_image"></image>
				<view class="card_des">
					适合卡片额度2万元以下，需预留总额度的10%起
				</view>
				<view class="create_plan">
					(创建计划）
				</view>
				<view class="amount_tip">
					单笔消费1000元至5万元
				</view>
			</view>
			<image class="check_detail" src="../../static/check_detail.png"></image>
		</view>
	</scroll-view>
</template>

<script>
</script>

<style lang="stylus">
// 隐藏滚动条
scroll-view ::-webkit-scrollbar{
	   width: 0;
	   height: 0;
	   color: transparent;
}
page, .repayments
	width: 100%;
	height: 100%;
	background-color: #fff;
	overflow: hidden; 
	padding-top: 20upx;
	// 信用卡代还通道样式
	.repay_type_wrapper		
		.repay_type
			position: relative;
			color #fff;			
			text-align: center;
			.repay_type_image			
				width: 750upx;
				height: 258upx;			
			.card_des
				position: absolute;			
				top: 134upx;
				width: 700upx;
				left: 50%;
				transform: translateX(-50%);
				z-index: 99;
				font-size: 24upx;			
			.create_plan
				position: absolute;
				top: 176upx;
				left: 50%;
				transform: translateX(-50%);
				font-size: 29upx;
			.amount_tip
				position: absolute;
				top: 219upx;
				right: 34upx;
				font-size: 18upx;
		.check_detail			
			width: 750upx;
			height: 126upx;
			margin-top: -12upx;
		
			
</style>
