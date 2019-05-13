<template>
	<view class="paySucc">
		<image class="bgImg" src="../../static/paySucc/zfcg.png" mode=""></image>
		<view class="promptMsg">
			支付成功
		</view>
		<view class="back" @click="back">
			返回交易明细
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			document.title = '支付成功'
		},
		methods:{
			back(){
				console.log('toMerchandise')
			}
		}
	}
</script>

<style lang="stylus">
page, .paySucc
	position: relative;
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: hidden;
	.bgImg
		margin-top: 164upx;
		margin-left: 224upx;
		width: 302upx;
		height: 302upx;
	.promptMsg
		font-size: 36upx;
		font-weight: 700;
		margin-top: 25upx;
		text-align: center;
	.back
		margin: 0 auto;
		width: 280upx;
		text-align: center;		
		line-height: 83upx;
		font-size: 30upx;
		padding: 0 25upx;
		background:rgba(234,235,238,1);
		margin-top: 80upx;
		border-radius:42upx;
</style>
