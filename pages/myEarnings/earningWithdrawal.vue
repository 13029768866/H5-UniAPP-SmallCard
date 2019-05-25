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
			@click="togglePopup('bottom1')"
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
					尾号{{item.actNo.slice(item.actNo.length - 4)}}储蓄卡
					
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
		<view class="withdraw_money_wrapper">
			<input 
				type="number"
				placeholder="请输入提现金额"
				placeholder-style='	fontSize: 35upx;'							
				class="code_input_input"
				v-model="withdrawMoney"
			>
			<view class="money_str">
				￥
			</view>
			<view 
				class="widhdraw_all"
				@click="withdrawAll"
			>
				全部提现
			</view>
		</view>
		<!-- 储蓄卡弹窗 -->
			<uni-popup :show="type === 'bottom1'" position="bottom" mode="fixed"  @hidePopup="togglePopup('')">				
			<view class="choose_card_wrapper">
				<view class="choose_card_title">选择储蓄卡</view>
				<scroll-view scroll-y="true" class="choose_card_content">
					<view 
						class="choose_card_item"
						v-for="(item,idx) in debitList"
						:key ="item.idx"
						@click="chooseCashCard(idx)"
						:style = "{																
							background:'url('+ item.bankBg+')',
							backgroundSize:'705upx,180upx',
							backgroundRepeat:'no-repeat'
						}"
					>
						<image :src="item.cardLogo"></image>
						<view class="choose_card_des">
							<text>{{item.bankName}}</text>
							<text>{{item.cardType == 1?'储蓄卡':'信用卡'}}</text>
							<text>{{item.actNo.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2")}}</text>
						</view>
					</view>
															
				</scroll-view>											
			</view>
		</uni-popup>
		<view 
			class="sure_withdraw"
			@click="sureWithdraw"
		>
			确认提现
		</view>
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
				userPhoneInfo: [],
				type: ''	,
				withdrawMoney: '',		//	用户提现金额
				act_no: '',				//	银行卡号 
				cash_amt: 0	,			// 可提现金额
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
				uni.showLoading({
					title: '加载中'
				});
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
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.myProfit({},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)		
					uni.hideLoading()
					this.cash_amt = res.data.dataMap.cashWithdrawal	
					console.log(this.cash_amt)
				}else{	
					uni.hideLoading()
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}				
			},
			/* 4、全部提现 */
			withdrawAll(){
				this.withdrawMoney = this.cash_amt
			},
			/* 5、确认提现 */
			sureWithdraw(){							
				if(!this.withdrawMoney){
					uni.showToast({title:'提现金额不能为空!',icon:"none",duration:2500})
					return
				}
				if(this.withdrawMoney <= 0){
					uni.showToast({title:'提现金额不能小于0元!',icon:"none",duration:2500})
					return
				}
				// console.log(this.withdrawMoney,this.cash_amt)
				// if(this.withdrawMoney > this.cash_amt){
				// 	uni.showToast({title:'提现金额不能超过可提现金额!',icon:"none",duration:2500})					
				// 	return
				// }	
				this.getWithdrawal()	
			},
			/* 6、切换信用卡需要方法 */
			/* 弹窗显示 */
			togglePopup(type) {
				this.type = type;
			},
			/* 切换储蓄卡 */
			chooseCashCard(e){					
				this.debitListDefault = this.debitList.slice(e,e+1)
				this.togglePopup('')										
			},
			/* 7、确认提现 */
			async getWithdrawal(){			
				// console.log(1)
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.withdrawal({
					cash_amt: this.withdrawMoney,
					act_no: this.debitListDefault[0].actNo
				},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS"){
					uni.hideLoading()
					uni.redirectTo({
						url:'/pages/myEarnings/withdrawDetail'
					})					
				}else{	
					uni.hideLoading()
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}				
			},
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
		font-size: 36upx;
		margin-top: 20upx;
		margin-left: 55upx;
	.withdraw_money_wrapper
		position: relative;
		.code_input_input	
			width: 690upx;
			height: 93upx;		
			margin-left: 30upx;
			padding-left: 65upx;
			font-size: 60upx;
			color: #437FFE;
			border-bottom: 1px solid #ccc;
		.money_str
			position: absolute;
			line-height: 93upx;
			top: 0;
			left: 40upx;
			font-size: 60upx;
			color: #437FFE;
		.widhdraw_all
			position: absolute;
			z-index: 99;
			line-height: 93upx;
			font-size: 30upx;
			top: 0;
			right: 65upx;
			color:rgba(149,149,149,1);
		.withdraw_placeholder
			font-size: 30upx!important;
	.sure_withdraw
			width:672upx;
			line-height:90upx;
			text-align: center;
			margin-left: 38upx;
			color:#fff;
			margin-top: 280upx;
			background:linear-gradient(90deg,rgba(95,168,253,1),rgba(45,94,255,1));
			border-radius:45upx;
	/* 信用卡弹窗区域 */
	.choose_card_wrapper
		background-color: #fff;
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
				// background-size: 705upx,180upx;
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
</style>
