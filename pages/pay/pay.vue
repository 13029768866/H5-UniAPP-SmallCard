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
			<!-- 未绑定信用卡默认 -->
			<view 
				class="pay_bank" 
				v-if="creditList.length == 0"
				@click="android()"		
			>
				<view class="pay_bank_name">
					<image class="bank_img"></image>
					<text class="ell">**银行</text>
					<image class="choose_img_default" src="../../static/bandin.png"></image>
				</view>
				<view class="pay_bank_type">
					信用卡
				</view>
				<view class="pay_bank_num">
					********
				</view>
			</view>
			<!-- 绑定显示 -->
			<view 
				v-else
				class="pay_bank"  
				@click="togglePopup('bottom')"
				v-for = "item in creditListDefault"
				:key ="item.id"
			>
				<view class="pay_bank_name">
					<image class="bank_img" :src="item.cardLogo"></image>
					<text class="ell">{{item.bankName}}</text>
					<image class="choose_img" src="../../static/choose.png"></image>
				</view>
				<view class="pay_bank_type">
					信用卡
				</view>
				<view class="pay_bank_num">
					{{item.cardDattim.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2")}}
				</view>
			</view>
			<!-- 信用卡弹窗 -->
			<uni-popup :show="type === 'bottom'" position="bottom" mode="fixed"  @hidePopup="togglePopup('')">				
				<view class="choose_card_wrapper">
					<view class="choose_card_title">选择信用卡</view>
					<scroll-view scroll-y="true" class="choose_card_content">
						<view 
							class="choose_card_item"
							v-for="(item,idx) in creditList"
							:key ="item.idx"
							:style = "{																
								background:'url('+ item.bankBg+')',
								backgroundSize:'705upx,180upx',
								backgroundRepeat:'no-repeat'
							}"
							@click="chooseCreditCard(idx)"
						>
							<image :src="item.cardLogo"></image>
							<view class="choose_card_des">
								<text>{{item.bankName}}</text>
								<text>{{item.cardType == 1?'储蓄卡':'信用卡'}}</text>
								<text>{{item.cardDattim.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2")}}</text>
							</view>
						</view>
																
					</scroll-view>											
				</view>
			</uni-popup>
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
								<text>{{item.cardDattim.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2")}}</text>
							</view>
						</view>
																
					</scroll-view>											
				</view>
			</uni-popup>
			<!-- 储蓄卡选择 -->
			<!-- 未绑定储蓄卡 -->
			<view 
				class="pay_bank" 
				v-if="debitList.length == 0"
				@click="android()"	
			>
				<view class="pay_bank_name">
					<image class="bank_img"></image>
					<text class="ell">**银行</text>
					<image class="choose_img_default" src="../../static/bandin.png"></image>
				</view>
				<view class="pay_bank_type">
					储蓄卡
				</view>
				<view class="pay_bank_num">
					********
				</view>
			</view>
			<!-- 绑定储蓄卡 -->
			<view v-else 
				class="pay_bank"
				v-for = "item in debitListDefault"
				:key ="item.id"
				@click="togglePopup('bottom1')"
			>
				<view class="pay_bank_name">
					<image class="bank_img" :src="item.cardLogo"></image>
					<text class="ell">{{item.bankName}}</text>
					<image class="choose_img" src="../../static/choose.png"></image>
				</view>
				<view class="pay_bank_type">
					储蓄卡
				</view>
				<view class="pay_bank_num">
					{{item.cardDattim.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2")}}
				</view>
			</view>
		</view>
		<!-- 选择支付类型 -->
		<scroll-view class="pay_type_choose" scroll-y="true">
			<view class="pay_choose_title">
				选择支付类型
			</view>
			<view class="choose_item_wrapper">
				<view 
					style="margin-top: 25upx;"
					v-for="channel in channelList"
					:key = "channel.proId"
				>
					<!-- 通道信息展示 -->
					<view 
						class="pay_choose_item" 
						@click="chooseValidation(channel.proId)"						
						:style = "{
							background:'url('+ channel.backimgUrl+')',
							backgroundSize:'695upx,110upx',
							backgroundRepeat:'no-repeat'
						}"
						
					>
						<view class="pay_type_img">
							<image></image>						
						</view>		
						<view>
							<view class="channel_type">
								<text class="channel_name ell">{{channel.proName}}</text>
								<text class="channel_time">({{channel.openTime}}）</text>
								<image  
									v-if="channel.isIntegral == 1"
									class="integral" 
									src="../../static/jifen.png"></image>
							</view>
							<view class="channel_desc_wrapper">
								<span class="channel_desc ell">{{channel.remark}} </span>
								<text>费率{{channel.fee_rate}}+{{channel.rate}}/笔</text>
							</view>
						</view>								
					</view>	
					<!-- 支持银行 -->
					<view 
						class="support_bank_wrapper"
						@click="supporBank(channel.proId)"
					>
						支持银行？
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
			type: '',	/* 弹窗类型 */
			money: '',	/* 金额 */
			proId: '',	/* 通道 id */
			clientIp:'',
			/* 点击通道传递参数 */
			params:{},
			/* header携带参数，url获取 */
			userPhoneInfo:{},			
			debitList: [],	/*储蓄卡列表*/
			debitListDefault:[],
			creditList:[],/*贷记卡列表 */					
			creditListDefault:[],
			channelList:[]	/* 通道列表 */				
			}			
	},
	onLoad(options){
		document.title = "银联快捷"
		// console.log(JSON.parse(options.version))
		this.userPhoneInfo = JSON.parse(options.version)		
		uni.setStorageSync('userPhoneInfo',this.userPhoneInfo);			
		this.clientIp = this.userPhoneInfo.ipAddress				
		this.init()				
	},	
	methods: {
		/* 页面初始化操作 */
		init(){						
			this.getBankCards()	
			this.getChannelList()
		},
		/* 弹窗显示 */
		togglePopup(type) {
			this.type = type;
		},
		/* 获取银行卡信息 */
		async getBankCards(){
			let res = await this.$api.bindCards({},this.userPhoneInfo)				
			if(res.data.respCode == "SUCCESS" && res.data.dataMap){
				// console.log(res)				
				this.debitList= res.data.dataMap.DebitList
				this.creditList= res.data.dataMap.CreditList
				this.debitListDefault = this.debitList.slice(0,1)
				this.creditListDefault = this.creditList.slice(0,1)
				// console.log(this.creditList,this.debitList)
			}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}					
		},
		/* 获取通道信息 */
		async getChannelList(){
			let res = await this.$api.channelList({proType:'payment'},this.userPhoneInfo)			
			if(res.data.respCode == "SUCCESS" && res.data.dataMap){
				// console.log(res)				
				this.channelList = res.data.dataMap.channelList
			}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}				
		},
		/* 点击通道 */
		async getcardAuthentication(){
			this.params = {
				proId: this.proId,
				amount: this.money,
				paycardNo: this.creditListDefault[0].actNo,
				rePayCardNo:this.debitListDefault[0].actNo,
				client_ip:this.clientIp
			}
			let res = await this.$api.cardAuthentication(this.params,this.userPhoneInfo)										
			if(res.data.respCode == "SUCCESS" && res.data.dataMap){
				// console.log(res)
				let dataMap = res.data.dataMap
					dataMap.proId = this.proId
					dataMap = JSON.stringify(dataMap)	
				console.log(dataMap)
				uni.redirectTo({
					url:'/pages/payTrading/payTrading1?dataMap='+ dataMap
				})								
			}else{					
					uni.showToast({title:res.data.respMsg,icon:"none"})
			}	
			
		},
		/* 通道支持银行 */
		supporBank(proId){			
			uni.redirectTo({
				url:'/pages/supportBank/supportBank?proId='+ proId 
			})
		},		
		/* 选择支付类型前验证 */
		chooseValidation(e){			
			if(this.money === ''){					
				uni.showToast( {title:"请输入金额!",icon:"none"})
				return;
			}
			if(this.creditList.length < 1 || this.debitList.length < 1){
				uni.showToast( {title:"请先绑定一张到账储蓄卡，及一张信用卡!",icon:"none"})
				return;
			}				
			this.proId = e;
			this.getcardAuthentication()
		},
		/* 切换储蓄卡 */
		chooseCashCard(e){					
			this.debitListDefault = this.debitList.slice(e,e+1)
			this.togglePopup('')							
		},
		/* 切换信用卡 */
		chooseCreditCard(e){
			// console.log(e)
			this.creditListDefault = this.creditList.slice(e,e+1)
			// console.log(this.creditListDefault)
			this.togglePopup('')
		},
		/* 给安卓标识 */
		 android() {
			 console.log('toBankListActivity')		
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
		height:17vh;
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
			height:12.8vh;
			background:rgba(255,255,255,1);
			border-radius:25upx;
			.pay_bank_name
				position: relative;
				display: flex;
				// justify-content: space-around;
				align-items: center;
				padding: 25upx;
				font-size: 30upx;
				text					
					width: 190upx;
				.bank_img
					width:52upx;
					height:52upx;
					margin-right: 20upx;
					border-radius 50%;
					background:rgba(208,208,208,1);
				.choose_img
					width: 30upx;
					height: 18upx;
				.choose_img_default
					position: absolute;
					right: 0;
					top: 58upx;
					width: 103upx;
					height: 53upx;
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
		// border: 1px solid #000;
		height: 69%;
		background:rgba(242,242,247,1);
		padding: 35upx 20upx 0 25upx;
		.pay_choose_title
			border-left: 4upx solid #5294FE;
			font-size: 28upx;
			padding-left: 18upx;
		.support_bank_wrapper
			width:695upx;
			line-height:60upx;
			text-align: center;
			background:rgba(255,255,255,1);
			box-shadow:0 6upx 18upx 0px rgba(38,143,214,0.2);
			border-radius:0 0 10upx 10upx;
			font-size: 26upx;
			color:rgba(30,107,249,1);
		.pay_choose_item			
			display: flex;			
			align-items: center;
			padding: 20upx;
			width: 700upx;
			height: 138upx;
			font-size: 26upx;			
			// border: 1px solid #000;						
			color #fff
			.integral
				width: 98upx;
				height: 38upx;
			.channel_desc_wrapper
				display: flex;
				align-items: center;
				.channel_desc				
					width: 250upx;
					
			.channel_type
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				text:nth-child(1)
					font-size: 30upx;
				.channel_name
					width: 185upx;
					
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
					
				
	.wzj
		color red
</style>
