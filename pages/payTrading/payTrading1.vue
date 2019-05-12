<template>
	<view class="pay_trading">
		<!-- 信用卡信息 -->
		<view class="trading_msg">
			<view class="trading_bank">{{paycardNoName}}(信用卡)</view>
			<view class="trading_num">{{paycardNo.replace(/^(\d{4})\d+(\d{4})$/, "$1****$2")}}</view>
			<view class="trading_money">¥{{amount}}</view>
		</view>
		<!-- 手续费 -->
		<view class="service_charge">
			<view>手续费&nbsp;&nbsp;{{serviceCharge.toString().match(/^\d+(?:\.\d{0,2})?/)[0]}}元</view>
			<view>实际到账&nbsp;&nbsp;{{arrivalAccount.toString().match(/^\d+(?:\.\d{0,2})?/)[0]}}元</view>
		</view>
		<!-- 验证码 -->		
		<view class="code_input_main">
			<view class="code_input_item">
				{{code}}
			</view>
			<input 
				@click="showMulLinkageTwoPicker" 
				placeholder="请输入落地商户" 
				class="code_input_input" 
				v-model="code"
				placeholder-style="color:#589DFD;"
			/>			
		</view>	
		
		<!-- 到账储蓄卡 -->
		<view class="depsite_card">
			到账储蓄银行：&nbsp;&nbsp;{{rePayCardNoName}}({{rePayCardNo.substr(rePayCardNo.length - 4)}})
		</view>
		<button 
			class="sure_btn"  
			type="primary"
			@click="getPayCommit"
		>确认提交</button>
		
		<!-- 省市联动组件 -->
		<mpvue-picker 
		:themeColor="themeColor" 
		ref="mpvuePicker" 
		:mode="mode" 
		:deepLength="deepLength" 
		:pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" 
		 @onCancel="onCancel" 
		 :pickerValueArray="pickerValueArray"></mpvue-picker>
		 <!-- 落地商户组件 -->
		 <uni-popup :show="type === 'bottom'" position="bottom" mode="fixed"  @hidePopup="togglePopup('')">				
		 	<view class="choose_card_wrapper">
		 		<view class="choose_card_title">选择商户</view>
		 		<scroll-view scroll-y="true" class="choose_card_content">
		 			<view 
						class="choose_item"
						v-for="item in merList"
						:key ='item.id'
						@click="chooseMer(item.merchant_name,item.id)"
					>
		 				{{item.merchant_name}}
		 			</view>
		 												
		 		</scroll-view>											
		 	</view>
		 </uni-popup>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default{
		components:{
			mpvuePicker,
			uniPopup
		},
		data(){
			return{
				type: '',	/* 弹窗类型 */
				/* 联级组件参数 */
				mulLinkageTwoPicker: [],
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				code:'',
				/* header携带参数，url获取 */
				userPhoneInfo:{				
					'appType':'Android',
					'phoneNo':'18771866669',
					'orgId':'80017',
					'ipAddress': '192.168.0.194',
					'version': 'version',
					'txnDattime':'20190429100913',
					'Token': 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiI5cXBnMGsiLCJzdWIiOiIxMDAwMDAyMSIsImV4cCI6MTU1NzEwODU1NCwiaWF0IjoxNTU2NTAzNzU0fQ.Kds-pbh-v1lqJLyXSrDglR4-PbbNnB0MlDNGeXN74YlY-Ex7bluocIOJrhlZhkYhb3wSwqNRFLnLlsmTMyPBrg'
				},
				amount: '',	//	支付金额
				paycardNo: '',// 支付卡号
				paycardNoName:'',	//付款银行名称
				rePayCardNo: '', //	到账卡号
				rePayCardNoName: '', //	到账银行名称	
				paymentId:'',		//	订单号
				serviceCharge:  0	,//手续费
				arrivalAccount: 0	,//	到账金额
				province: '',	// 省份
				city: '',		// 城市
				merList:[],		// 落地商户列表	
				merchantUid:''	// 落地商户编号
			}
		},
		methods:{
			/* 点击通道 */
			async getcardAuthentication(){
				let res = await this.$api.cardAuthentication({
					proId: 'kb_tx',
					amount: 5000,
					paycardNo: '6258081722054207',
					rePayCardNo: '6212251807001345023',
					client_ip:'123'
				},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)					
					this.amount = res.data.dataMap.amount
					this.paycardNo = res.data.dataMap.paycardNo
					this.paycardNoName = res.data.dataMap.paycardNoName
					this.rePayCardNo = res.data.dataMap.rePayCardNo
					this.rePayCardNoName = res.data.dataMap.rePayCardNoName
					this.serviceCharge = res.data.dataMap.serviceCharge
					this.arrivalAccount = res.data.dataMap.arrivalAccount
					this.paymentId = res.data.dataMap.paymentId
				}			
			},
			/* 省市查询 */
			async getMerchantCity(){
				let res = await this.$api.merchantCity({
					proId: 'kb_tx'
				},this.userPhoneInfo)
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)
					this.mulLinkageTwoPicker = res.data.dataMap.provinceList					
				}
			},
			/* 落地商户查询 */
			async getLandingMerchant(){
				let res = await this.$api.landingMerchant({
					proId: 'kb_tx',
					province: this.province,
					city: this.city
				},this.userPhoneInfo)
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					this.merList = res.data.dataMap.merList
					this.togglePopup('bottom')
				}
			},
			/* 套现-确认提交 */
			async getPayCommit(){
				if(this.merchantUid == ''){
					uni.showToast( {title:"请选择落地商户!",icon:"none"})
					return
				}
				
				let res = await this.$api.payCommit({
					proId: 'kb_tx',
					paymentId: this.paymentId,
					merchantUid: this.merchantUid
				},this.userPhoneInfo)
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					this.merList = res.data.dataMap.merList
					this.togglePopup('bottom')
				}
			},
			/* 弹窗显示 */
			togglePopup(type) {
				this.type = type;
			},
			onCancel(e) {
				console.log(e)
			},
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()				
			},
			onConfirm(e) {				
				this.pickerText = e.province				
				this.province = this.pickerText.split('-')[0]
				this.city = this.pickerText.split('-')[1]
				this.getLandingMerchant()
			},
			chooseMer(name,id){
				this.code = name
				this.merchantUid = id				
				this.togglePopup('')
			}
		},
		onLoad() {			
			this.getcardAuthentication()
			this.getMerchantCity()
		},
		onBackPress() {
		  if (this.$refs.mpvuePicker.showPicker) {
		  	this.$refs.mpvuePicker.pickerCancel();
		    return true;
		  }		
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
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
		margin-top: 105upx;
	/* 验证码输入 */
	.code_input_main
		position: relative;
		display: flex;
		padding: 0 70upx;
		margin-top: 50upx;
		justify-content: space-around;
		.code_input_item
			width: 752upx;
			height: 93upx;
			line-height: 93upx;
			opacity: 0.8;
			border-bottom: solid #D6D6DB 4upx;								
			font-size: 26upx;
			color: #000;			
		.code_input_input
			position: absolute;
			width: 100%;
			height: 93upx;			
			padding: 0 70upx;
			color transparent;
			left: 0;			
	/* 落地商户 */
	.choose_card_title
		display: flex;
		align-items: center;
		justify-content: center;
		height: 70upx;
		font-size: 30upx;
		color: #589DFD;
		border-bottom: 2upx solid #D9D9D9;
	.choose_card_content	
		height: 850upx;		
		.choose_item	
			text-align: left;
			line-height: 70upx;
			padding: 0 25upx;
			font-size:26upx;
			border-bottom:2upx solid rgba(214,214,219,1);
	/* 确定按钮 */
	.sure_btn
		width: 672upx;
		margin-top: 100upx;
		margin-left: 40upx;
		border-radius: 60upx;
	.wzj
		background-color: #fff;
</style>
