<template>
	<view class="myEarnings">
		<view class="card_bg_wrapper">
			<view class="card_title">
				收益金额
			</view>
			<view class="earnings_money">
				{{amt}} 元
				<image 
				class="show_money"
				src="../../static/myEarnings/beyes.png" ></image>
			</view>
			<view class="earnings_wrapper">
				<view class="today_earnings">
					<view class="">
						今日收益/元 
					</view>
					<view class="earnings_amount">
						{{Profit}}
					</view>
				</view>
				<view class="divide_line"></view>
				<view class="today_earnings">
					<view class="">
						昨日收益/元 
					</view>
					<view class="earnings_amount">
						{{yesterdayProfit}}
					</view>
				</view>												
			</view>
			<!-- 分隔线 -->
			<view class="divide_line_row"></view>
			<view class="withdrawal_wrapper">
				<view>
					<view class="withdrawal_des">可提现额度金额/元</view>
					<view class="withdrawal_money">
						{{cashWithdrawal}}
					</view>
				</view>
				<view class="atonce_withdrawal">
					立即提现
				</view>
			</view>
		</view>
		<scroll-view
			scroll-y
			class="detail_wrapper"
		>
			<view 
				class="detail_bg_wrapper"				
				v-for="(item,idx) in records"
				:key = 'item.idx'
				:class="{
					detail_bg_wrapper1:idx%2==0,
					detail_bg_wrapper2:idx%3==0,
				}"
			>
				<view class="detail_row ">
					订单号：{{item.order_no}}
				</view>
				<view 
					class="detail_row detail_row1">
					<view class="">
						{{item.txnTime}}
					</view>
					<view>
						收益金额：{{item.profitAmt}} 元
					</view>
				</view>
				
				<view class="detail_row">
					<view class="">
						{{item.orderType}}
					</view>
					<view class="">
						来自：{{item.orderName}}
					</view>
				</view>
			</view>							
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				userPhoneInfo: [],
				amt: '' ,	//收益金额
				cashWithdrawal: '',	//可提现额度
				Profit:''	,	//	今日收益
				yesterdayProfit: ''	,//	昨日收益
				current: 1,		// 当前页数
				lastDays: 180,	// 查询天数	
				records: []		// 详情信息
			}
		},
		methods:{
			/* 1、页面初始化 */
			init(){
				this.getMyProfit()
				this.getProfitList()
			},
			/* 2、获取上半部分信息 */
			async getMyProfit(){
				let res = await this.$api.myProfit({},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					// console.log(res)				
					// this.channelList = res.data.dataMap.channelList
					this.amt = res.data.dataMap.amt
					this.cashWithdrawal = res.data.dataMap.cashWithdrawal
					this.Profit = res.data.dataMap.Profit
					this.yesterdayProfit = res.data.dataMap.yesterdayProfit
				}else{					
						uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
					}				
			},
			/* 3、获取收益明细信息 */
			async getProfitList(){
				let res = await this.$api.profitList({
					lastDays: this.lastDays,
					current: this.current
				},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					this.records = res.data.dataMap.records
				}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}				
			}
		},
		onLoad(options){
			document.title = "我的收益"
			// console.log(JSON.parse(options.version))
			this.userPhoneInfo = JSON.parse(options.version)		
			uni.setStorageSync('userPhoneInfo',this.userPhoneInfo);		
			this.init()
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
page, .myEarnings
	position: relative;
	width: 100%;
	height: 100%;
	background: rgba(245,247,251,1);;
	overflow: hidden;
	.divide_line_row
		width: 705upx;
		margin-left: -50upx;
		margin-top: 22upx;
		height: 2upx;
		background:rgba(162,197,251,1);
	.card_title
		font-size: 30upx;
	.card_bg_wrapper
		width: 750upx;
		height: 386upx;		
		background: url(../../static/myEarnings/daban.png) no-repeat;
		background-size: 750upx 386upx;
		padding-left: 75upx;
		padding-top: 75upx;
		color: #fff;
		.earnings_money
			display: flex;
			align-items: center;
			font-size: 46upx;	
			margin-top: 10upx;
			margin-bottom: 15upx;
			.show_money
				width: 46upx;
				height: 30upx;
				margin-left: 55upx;
		/* 收益区域 */
		.earnings_wrapper
			display: flex;
			align-items: center;
			.today_earnings				
				display: flex;
				font-size: 22upx;
				align-items: center;
			.earnings_amount				
				margin-left: 30upx;
				width: 140upx;
			.divide_line
				width: 2upx;
				height: 24upx;
				background-color: #fff;
				margin: 0  25upx;
		/* 提现区域 */
		.withdrawal_wrapper
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 22upx;
			.withdrawal_des
				margin-top: 14upx;
				margin-bottom: 6upx;
			.withdrawal_money
				font-size: 26upx;
			.atonce_withdrawal
				width: 148upx;
				line-height: 48upx;
				text-align: center;
				color: #000;
				font-size: 28upx;
				background:rgba(240,240,246,1);
				border-radius:24px;
				margin-right: 90upx;
	/* 明细背景 */
	.detail_wrapper
		height: 71%;
		padding-bottom: 70upx;
		border: 1px solid #000;	
	.detail_bg_wrapper
		width: 705upx;
		height: 160upx;
		background: url(../../static/myEarnings/detail_bg.png) no-repeat;
		background-size: 705upx 160upx;
		margin-left: 22upx;
		margin-bottom: 10upx;
		padding-top: 20upx;
		padding-left: 25upx;
		padding-right: 50upx;
		.detail_row
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26upx;
			color: #fff;
		.detail_row1
			margin: 8upx 0;
	.detail_bg_wrapper1
		background: url(../../static/myEarnings/detail_bg1.png) no-repeat;
		background-size: 705upx 160upx;
	.detail_bg_wrapper2
		background: url(../../static/myEarnings/detail_bg2.png) no-repeat;
		background-size: 705upx 160upx;
</style>
