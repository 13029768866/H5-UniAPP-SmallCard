<template>
	
	<scroll-view 
	scroll-y
	class="memberCenter">
		<view class="vip_wrapper">
			<image class="vip_bg" src="../../static/member/vip_bg.png"></image>
			<view class="vip_name">
				VIP会员
			</view>
			<view class="vip_number">
				已有<text class="people_num">{{count}}</text>人成为VIP会员
			</view>
		</view>
		<image class="my_privilege" 
		src="../../static/member/my_privilege.png"></image>
		<image 
		class="my_privilege1"
		src="../../static/member/my_privilege_des.png"></image>
		<button 
			class="pay_btn"
			@click="getPayUpGrade"		
			:disabled=btnStatus
		>
			￥398
		</button>
	</scroll-view>
</template>

<script>
	export default{
		data(){
			return{
				count: 5000,
				userPhoneInfo:{},									
				btnStatus: false		
			}			
		},
		onLoad(options) {	
			document.title = "会员升级"
			console.log(options.version)
			this.userPhoneInfo = JSON.parse(options.version)
			console.log(this.userPhoneInfo)
			uni.setStorage({
				key: 'userPhoneInfo',
				data: this.userPhoneInfo,
				success: function () {
					console.log('success');
				}
			});
			
			this.countAdd()
			
		},
		methods:{
			countAdd(){				
				let timer = setInterval(()=>{					
					this.count++
				},500)
			},		
			async getPayUpGrade(){				
				let res = await this.$api.payUpGrade({},this.userPhoneInfo)	
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					this.btnStatus = true								
					let url = res.data.dataMap.url
					window.location.href = url					
				}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}
				
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
page, .memberCenter
	width: 100%;
	height: 100%;
	background-color: #fff;
	overflow: hidden;	
	.vip_wrapper
		position: relative;
		width: 100vw;
		height: 355upx;
		color:  #FBFBE2;
		background-color: #000;
		.vip_bg
			position: absolute;
			width: 595upx;
			height: 305upx;
			top: 24upx;
			left: 50%;
			transform: translateX(-50%);
		.vip_name
			position: absolute;
			top: 120upx;
			left: 311upx;
			font-size: 36upx;
		.vip_number
			// border: 1px solid #fff;
			position: absolute;
			top: 200upx;
			left: 83upx;
			width: 595upx;
			text-align: center;
			font-size: 28upx;
		.people_num
			font-size: 36upx;
			margin: 0 4upx;
			font-weight: 700;
	.my_privilege
		width: 100vw;
		height: 313upx;
	.my_privilege1
		width: 100vw;
		height: 560upx;
	.pay_btn
		width:480upx;
		line-height:96upx;
		text-align: center;
		margin-top: -10upx;
		margin-left: 135upx;
		color: #fff;
		background:rgba(220,184,153,1);
		border-radius:48upx;
		margin-bottom: 60upx;
</style>
