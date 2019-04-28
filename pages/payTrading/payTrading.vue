<template>
	<view class="pay_trading">
		<!-- 信用卡信息 -->
		<view class="trading_msg">
			<view class="trading_bank">招商银行(信用卡)</view>
			<view class="trading_num">************6652</view>
			<view class="trading_money">¥5000</view>
		</view>
		<!-- 手续费 -->
		<view class="service_charge">
			<view>手续费&nbsp;&nbsp;23.45元</view>
			<view>实际到账&nbsp;&nbsp;4976.55元</view>
		</view>
		<!-- 验证码 -->		
		<view class="code_input_main">
			<view class="code_input_item">{{code[0]}}</view>
			<view class="code_input_item">{{code[1]}}</view>
			<view class="code_input_item">{{code[2]}}</view>
			<view class="code_input_item">{{code[3]}}</view>
			<view class="code_input_item">{{code[4]}}</view>
			<view class="code_input_item">{{code[5]}}</view>
			<input placeholder="请输入验证码" class="code_input_input" v-model="code" maxlength="6" type="number" />
		</view>
		<view v-show="getVerifyShow" class="get_verify" @click="getVerify">获取验证码</view>
		<view v-show="!getVerifyShow" class="count_down">(&nbsp;&nbsp;{{count}} s&nbsp;&nbsp;)</view>	
		
		<!-- 到账储蓄卡 -->
		<view class="depsite_card">
			到账储蓄银行：&nbsp;&nbsp;工商银行(9817)
		</view>
		<button class="sure_btn" type="primary">确认提交</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				/* 验证码区域变量 */
				code: '',
				getVerifyShow: true,
				count: '',
				timer: null
			}
		},
		methods:{
			/* 获取验证码 */
			getVerify(){
				const time_count = 5;
				if(!this.time_count){
					this.count = time_count
					this.getVerifyShow = false
					this.timer = setInterval(()=>{
						if(this.count > 0 && this.count <= time_count){
							this.count --
						}else{
							this.getVerifyShow = true
							clearInterval(this.timer)
							this.timer = null
						}
					},1000)
				}
			}
		}
	}
</script>


<style lang="stylus">
page, .pay_trading
	position: relative;
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: hidden;
	/* 信用卡信息 */
	.trading_msg		
		width: 100%;
		margin-top: 55upx;		
		.trading_bank
			font-size: 28upx;
			text-align: center;			
		.trading_num
			font-size: 30upx;
			text-align: center;
			margin-top: 25upx;
			margin-bottom: 40upx;
		.trading_money
			text-align: center;
			font-size: 60upx;
	/* 手续费用 */
	.service_charge
		display: flex;
		align-items: center;
		justify-content: space-between;		
		padding: 0 70upx;
		color #BBBABA;
		font-size: 24upx;
		margin-top: 25upx;
	/* 到账储蓄卡 */
	.depsite_card
		text-align: center;
		font-size: 26upx;
		margin-top: 55upx;
	/* 验证码输入 */
	.code_input_main
		position: relative;
		display: flex;
		padding: 0 70upx;
		margin-top: 50upx;
		justify-content: space-around;
		.code_input_item
			width: 93upx;
			height: 93upx;
			line-height: 93upx;
			opacity: 0.8;
			border-bottom: solid #D6D6DB 4upx;
			margin: 0 10upx;
			text-align: center;
			padding-bottom: 0;
			font-size: 30px;
			color: #000;			
		.code_input_input
			position: absolute;
			width: 100%;
			height: 93upx;			
			padding: 0 70upx;
			color transparent;
			left: 0;
			// border: 1px solid #000;
	/* 验证码发送 */
	.get_verify		
		color #589DFD
		font-size: 24upx;
		padding: 0 70upx;
		margin-top: 40upx;
		text-align: center;
	.count_down		
		color #ccc
		padding: 0 70upx;
		text-align: center;
		margin-top: 40upx;
	/* 确定按钮 */
	.sure_btn
		width: 672upx;
		margin-top: 180upx;
		margin-left: 40upx;
		border-radius: 60upx;
	.wzj
		background-color: #fff;
</style>
