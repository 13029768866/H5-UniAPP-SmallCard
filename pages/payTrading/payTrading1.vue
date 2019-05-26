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
				disabled
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
		 <!-- 短信验证-->
		 
		  <uni-popup :show="type === 'smsValidation'" position="middle" mode="fixed"  @hidePopup="togglePopup('')">				
		 	<view class="choose_sms_wrapper">
				<view class="sms_title">
					请填写短信验证码
				</view>
		 		<input 
					type="number" 
					class="validata_inp" 
					v-model="validateCode" 
					maxlength="6"
					placeholder="请输入短信验证码 "
				/>
				<view 
					class="validata_sure"
					@click="getPaySms"
				>确定</view>
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
				dataMap: {},
				proId: '',
				/* header携带参数，url获取 */
				userPhoneInfo:{								
				},
				validateCode: '',/* 短信验证码 */
				ticketCode:'',	/* 短信接口编码 */
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
			/* 提交短信验证码 */
		async getPaySms(){
			if(this.validateCode.trim() == ''){
				uni.showToast({title:'短信验证码不能为空',icon:"none",duration:2000})
				return;
			}
			uni.showLoading({
				title: '加载中'
			});
			let res = await this.$api.paySms({
				proId: this.proId,
				validateCode: this.validateCode,
				ticketCode: this.ticketCode,
				paymentId: this.paymentId
			},this.userPhoneInfo)
			if(res.data.respCode == "SUCCESS" && res.data.dataMap){
				// console.log(res)
				uni.hideLoading()				
				uni.redirectTo({
					url:'/pages/paySucc/paySucc'
				})
			}else{
				uni.hideLoading()
				uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
			}
		},
			/* 省市查询 */
			async getMerchantCity(){
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.merchantCity({
					proId: this.proId
				},this.userPhoneInfo)
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)
					uni.hideLoading()
					this.mulLinkageTwoPicker = res.data.dataMap.provinceList					
				}else{	
					uni.hideLoading()
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}
			},
			/* 落地商户查询 */
			async getLandingMerchant(){
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.landingMerchant({
					proId: this.proId,
					province: this.province,
					city: this.city
				},this.userPhoneInfo)
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					uni.hideLoading()
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
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.payCommit({
					proId: this.proId,
					paymentId: this.paymentId,
					merchantUid: this.merchantUid
				},this.userPhoneInfo)
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)
					uni.hideLoading()
					if(res.data.dataMap.isSms == '1'){
						this.togglePopup('smsValidation')
						this.ticketCode = res.data.dataMap.ticketCode
					}else if(res.data.dataMap.isSms == '0'){
						// window.location.href = res.data.dataMap.url
						uni.redirectTo({
							url:'/pages/paySucc/paySucc'
						})
					}else{
						uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
					}	
				}else{	
					uni.hideLoading()
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
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
				uni.hideKeyboard()
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
		onLoad(options) {								
			this.userPhoneInfo = uni.getStorageSync('userPhoneInfo');				
			this.dataMap = JSON.parse(options.dataMap)	
			console.log(this.dataMap)
			/* 参数赋值 */
			this.amount = this.dataMap.amount
			this.paycardNo = this.dataMap.paycardNo
			this.paycardNoName = this.dataMap.paycardNoName
			this.rePayCardNo = this.dataMap.rePayCardNo
			this.rePayCardNoName = this.dataMap.rePayCardNoName
			this.serviceCharge = this.dataMap.serviceCharge
			this.arrivalAccount = this.dataMap.arrivalAccount
			this.paymentId = this.dataMap.paymentId
			this.proId = this.dataMap.proId
						
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
// 隐藏滚动条
scroll-view ::-webkit-scrollbar{
	   width: 0;
	   height: 0;
	   color: transparent;
}
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
	.choose_card_wrapper
		background-color: #fff;
	.choose_sms_wrapper
		width: 550upx;
		height: 350upx;	
		border-radius:10upx;
		background-color: #fff;
		overflow: hidden;
		.sms_title
			text-align: center;
			font-size: 36upx;
			margin: 40upx 0;
		.validata_inp
			margin-left: 40upx;
			padding-left: 20upx;
			width: 470upx;
			height: 80upx;
			border:1px solid rgba(204,204,204,1);
			border-radius:4upx;
		.validata_sure
			margin-top: 60upx;
			letter-spacing: 8upx;
			text-align: center;
			font-size: 40upx;
			line-height:90upx;
			color: #fff;
			background:rgba(97,123,248,1);			
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
