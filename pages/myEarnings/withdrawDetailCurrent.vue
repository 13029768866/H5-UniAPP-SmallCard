<template>
	<view class="withdrawDetailCurrent">
		<view 
			class="withdraw_wrapper"
			v-for = "item in currentIdx"
			:key ="item.cashId"
		>
			<view class="">
				{{item.title}}
			</view>
			<view class="withdrawMoney">
				￥{{item.stl_amt}}元
			</view>
			<view class="actual_account">
				实际到账
			</view>
			<view class="withdraw_row">
				<view class="">					
                     当前状态：                                                                     
				</view>
				<view 
					class=""
					v-html="item.orderStatus"
				></view>							
			</view>
			<view class="withdraw_row">
				<view class="">					
			         提现金额：                                                                     
				</view>
				<view 
					class=""
					v-html="item.stl_amt"
				></view>							
			</view>
			<view class="withdraw_row">
				<view class="">					
			         手续费：                                                                     
				</view>
				<view 
					class=""
					v-html="item.cashFee"
				></view>							
			</view>
			<view class="withdraw_row">
				<view class="">					
			         申请时间：                                                                     
				</view>
				<view 
					class=""
					v-html="item.txnTime"
				></view>							
			</view>
			<view 
			class="withdraw_row"
			v-if='item.successTime == ""? false : true'
			>
				<view class="">					
			         到账时间：                                                                     
				</view>
				<view 
					class=""
					v-html="item.successTime"
				></view>							
			</view>
			<view class="withdraw_row">
				<view class="">					
			         提现单号：                                                                     
				</view>
				<view 
					class=""
					v-html="item.cashId"
				></view>							
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				currentIdx: [],
				
			}
		},
		onLoad(options){
			document.title = "账单详情"	
			this.currentIdx[0] = uni.getStorageSync('currentIdx');
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
page, .withdrawDetailCurrent
	position: relative;
	width: 100%;
	height: 100%;
	padding-bottom: 40upx;
	background: rgba(245,247,251,1);
	overflow: hidden;
	.withdraw_wrapper
		width:694upx;
		height:665upx;
		text-align: center;
		background:rgba(255,255,255,1);
		border-radius:20upx;
		margin: 28upx;
		padding: 0 25upx;
		padding-top: 55upx;
		font-size: 26upx;
		.withdrawMoney
			font-size: 48upx;
			margin-top: 25upx;
			margin-bottom: 8upx;
		.actual_account
			font-size: 24upx;
			color:  #ADADAD;
			margin-bottom: 20upx;
		.withdraw_row
			line-height: 60upx;
			display: flex;
			align-items: center;
			justify-content: space-between;		
			padding: 0 38upx;
			border-bottom: 2upx solid rgba(240,240,246,1);
</style>
