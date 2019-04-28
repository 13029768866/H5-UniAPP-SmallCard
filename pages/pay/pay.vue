<template>
	<view class="pay">
		<!-- 支付金额 -->
		<view class="pay_money">
			<view class="pay_money_much">
				<text>￥</text>
				<input  
					class="pay_money_num" 
					type="number"  
					placeholder-style="color:#fff" 
					placeholder="请输入金额"
					v-model="money"
				/>
			</view>
		</view>
		<!-- 信用卡，储蓄卡选择 -->
		<view class="pay_bank_wrapper">
			<view class="pay_bank" @click="togglePopup('bottom')">
				<view class="pay_bank_name">
					<image class="bank_img" src="../../static/hongbao.png"></image>
					<text class="ell">招商银行</text>
					<image class="choose_img" src="../../static/choose.png"></image>
				</view>
				<view class="pay_bank_type">
					信用卡
				</view>
				<view class="pay_bank_num">
					6226****6652
				</view>
			</view>
			<!-- 信用卡，储蓄卡弹窗 -->
			<uni-popup :show="type === 'bottom'" position="bottom" mode="fixed"  @hidePopup="togglePopup('')">
				<view class="choose_card_wrapper">
					<view class="choose_card_title">选择信用卡</view>
					<scroll-view scroll-y="true" class="choose_card_content">
						<view class="choose_card_item">
							<image src="../../static/logo.png"></image>
							<view class="choose_card_des">
								<text>招商银行</text>
								<text>信用卡</text>
								<text>6226*********6652</text>
							</view>
						</view>												
					</scroll-view>											
				</view>
			</uni-popup>
			<view class="pay_bank">
				<view class="pay_bank_name">
					<image class="bank_img" src="../../static/hongbao.png"></image>
					<text class="ell">招商银行</text>
					<image class="choose_img" src="../../static/choose.png"></image>
				</view>
				<view class="pay_bank_type">
					信用卡
				</view>
				<view class="pay_bank_num">
					6226****6652
				</view>
			</view>
		</view>
		<!-- 选择支付类型 -->
		<scroll-view class="pay_type_choose" scroll-y="true">
			<view class="pay_choose_title">
				选择支付类型
			</view>
			<view class="choose_item_wrapper">
				<view class="pay_choose_item" @click="chooseValidation">
					<view class="pay_type_img">
						<image src="../../static/hongbao.png"></image>						
					</view>		
					<view>
						<view class="channel_type">
							<text>小额银联落地</text>
							<text class="channel_time">(00:00-23:59）</text>
							<image class="integral" src="../../static/jifen.png"></image>
						</view>
						<view class="">
							<text>单笔500 -20000元 费率0.57%+3.0／笔</text>
						</view>
					</view>
				</view>							
			</view>						
		</scroll-view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default{
	components:{
		uniPopup
	},
	data(){
		return {
			type: '',
			money: ''			
		}
	},
	onLoad(){
		this.getQueryVariable()
	},
	methods: {
		/* 弹窗显示 */
		togglePopup(type) {
			this.type = type;
		},
		/* 选择支付类型前验证 */
		chooseValidation(){			
			if(this.money === ''){				
				uni.showToast( {title:"请输入金额!",icon:"none"})
			}else{
				uni.redirectTo({
					url:'/pages/payTrading/payTrading'
				})
			}
		},
		getQueryVariable(variable){	
			console.log(1)
			console.log(window.location)
		   var query = window.location.search.substring(1);
		   console.log(window.location)
		   var vars = query.split("&");
		   for (var i=0;i<vars.length;i++) {
				   var pair = vars[i].split("=");
				   if(pair[0] == variable){return pair[1];}				   
		   }
		   console.log(pair)
		   return(false);
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
page, .pay
	width: 100%;
	height: 100%;
	background:rgba(242,242,247,1);
	overflow: hidden;
	/* 支付金额 */
	.pay_money
		position: relative;		
		height:225upx;
		background:linear-gradient(-90deg,rgba(96,169,253,1),rgba(45,94,255,1));
		.pay_money_much		
			position: absolute;
			display: flex;
			align-items: center;			
			top: 60upx;
			left: 50%;
			color #fff
			transform:translateX(-50%);
			text
				font-size: 80upx;							
			.pay_money_num
				height: 90upx;				
				padding:  0 20upx ;				
				border-bottom: 4upx solid #fff;
	/* 信用卡，储蓄卡选择 */
	.pay_bank_wrapper
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 15upx;
		padding: 0 10upx;
		.pay_bank
			width:360upx;
			height:169upx;
			background:rgba(255,255,255,1);
			border-radius:25upx;
			.pay_bank_name
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 25upx;
				font-size: 30upx;
				text					
					width: 190upx;
				.bank_img
					width:52upx;
					height:52upx;
					border-radius 50%;
				.choose_img
					width: 30upx;
					height: 18upx;				
		.pay_bank_type
			color #999999
			font-size: 24upx;
			padding-left: 96upx;
			margin-top: -20upx;
		.pay_bank_num
			padding-left: 96upx;
			font-size: 30upx;
			margin-top: 5upx;
	/* 选择支付类型 */
	.pay_type_choose
		border: 1px solid #000;
		height: 69%;
		background-color: #fff;
		padding: 35upx 20upx 0 25upx;
		.pay_choose_title
			border-left: 4upx solid #5294FE;
			font-size: 28upx;
			padding-left: 18upx;
		.pay_choose_item
			.integral
				width: 98upx;
				height: 38upx;
			display: flex;			
			align-items: center;
			padding: 20upx;
			width: 700upx;
			height: 140upx;
			font-size: 26upx;
			margin-top: 12upx;
			background: url('../../static/tdaol.png') no-repeat;
			background-size: 700upx,140upx;	
			color #fff
			.channel_type
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				text:nth-child(1)
					font-size: 30upx;
				.channel_time
					margin-left: 30upx;
					margin-right: 28upx;
			.pay_type_img
				margin-right: 30upx;
				image:nth-child(1)
					height: 96upx;
					width: 96upx;
					border-radius 50%;
	
	/* 信用卡弹窗区域 */
	.choose_card_wrapper		
		.choose_card_title
			display: flex;
			align-items: center;
			justify-content: center;
			height: 70upx;
			font-size: 30upx;
			border-bottom: 1upx solid #D9D9D9;
		.choose_card_content
			padding: 30upx 20upx;
			height: 850upx;
			.choose_card_item
				width: 705upx;
				height: 180upx;
				display: flex;
				margin-bottom: 10upx;
				padding: 30upx 20upx;;
				background: url('../../static/lvdi.png') no-repeat;
				background-size: 705upx,180upx;	
				image
					width:66upx;
					height:66upx;
					border-radius 50%;
					margin-right: 20upx;
				.choose_card_des
					display: flex;
					flex-direction column;
					align-items: flex-start;
					font-size: 30upx;
					line-height: 30upx;
					color #fff
					text:nth-child(2)
						font-size: 24upx;
						margin-top: 15upx;
						margin-bottom: 25upx;
					
				
	.wzj
		color red
</style>
