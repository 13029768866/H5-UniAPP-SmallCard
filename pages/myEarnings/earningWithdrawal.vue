<template>
	<view class="earningWithdrawal">
		<!-- 选择提现到账卡 -->
		<view 
			class="collection_bank"
			v-for="(item,idx) in debitListDefault"
			:key ="item.idx"
			:style= "{
				background:'url('+ item.bankBg+')',
				backgroundSize:'730upx, 195upx',
				backgroundRepeat:'no-repeat'
			}"
		>
			<image 
				class="bank_logo"
				:src="item.cardLogo"
			>
			</image>	
			<view>
				<view>
					{{item.bankName}}
				</view>
				<view class="bank_num">
					尾号{{item.cardDattim.slice(item.cardDattim.length - 4)}}储蓄卡
					
				</view>				
			</view>
			<image 
				class="check_more"
				src="../../static/myEarnings/xuazz.png"
			>			
			</image>
		</view>
		<!-- 提现操作 -->
		<view class="withdraw_title">
			提现金额
		</view>
		<view class="">
			<input 
				type="text"
				placeholder="请输入提现金额"
				class="code_input_input"
			>
			<view class="">
				￥
			</view>
			<view class="">
				全部提现
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				userPhoneInfo: [],
				amt: 0	,				// 可提现金额
				debitList: [] ,			// 提现卡列表
				debitListDefault: []	// 默认提现卡
			}
		},
		methods:{
			/* 1、初始化 */
			init(){
				this.getBankCards()
				this.getMyProfit()
			},
			/* 2、获取银行卡信息 */
			async getBankCards(){			
				let res = await this.$api.bindCards({},this.userPhoneInfo)				
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)				
					this.debitList= res.data.dataMap.DebitList
					this.debitListDefault = this.debitList.slice(0,1)					
					// console.log(this.creditList,this.debitList)
				}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}					
			},
			/* 3、获取用户可提现金额 */
			async getMyProfit(){
				let res = await this.$api.myProfit({},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)				
					this.amt = res.data.dataMap.amt														
				}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}				
			}
		},
		onLoad(options){
			document.title = "提现"
			this.userPhoneInfo = uni.getStorageSync('userPhoneInfo');
			this.init()
		}
	}
</script>

<style lang="stylus">
page, .earningWithdrawal
	position: relative;
	width: 100%;
	height: 100%;
	background: #fff;
	overflow: hidden;
	.collection_bank
		position: relative;
		display: flex;
		align-items: center;
		width: 750upx;
		height: 195upx;
		margin-top: 10upx;
		margin-left: 10upx;
		padding: 0 40upx;
		background-size: 750upx,195upx;	
		color: #fff;
		font-size: 28upx;
		.bank_logo
			width: 90upx;
			height: 90upx;
			margin-right: 25upx;
			background-color: #fff;
			border-radius:50%;
		.bank_num
			font-size: 24upx;
			margin-top: 20upx;
		.check_more
			position: absolute;			
			right: 50upx;
			width: 33upx;
			height: 23upx;
	/* 提现金额 */
	.withdraw_title
		font-size: 26upx;
		margin-top: 15upx;
		margin-left: 60upx;
	.code_input_input	
		width: 690upx;
		height: 93upx;		
		margin-left: 30upx;
		border-bottom: 1px solid #ccc;
		
</style>
