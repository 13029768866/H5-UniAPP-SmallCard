<template>
	<scroll-view 
		class="supportBank"
		scroll-y
	>			
		<view 
			class="support_bank_item"
			v-for="bankListItem in bankList"
			:key='bankListItem.id'
		>
			<text class="bank_name">{{bankListItem.bankName}}</text>
			<text 
				class="single_limit"
				:class="{red:bankListItem.signleQuota < 10000}"
			>
				<text>单笔限额：</text>
				<text>{{bankListItem.signleQuota}}</text>
			</text>
		</view>				
	</scroll-view>
</template>

<script>
	import utils from '../../utils/utils.js'
	/*  */
	export default{
		onLoad() {			
			// this.userPhoneInfo = uni.getStorageSync('userPhoneInfo');
			this.proId = utils.getUrlParam('proId')
			this.getChannelList()
		},
		data(){
			return {
				userPhoneInfo:{				
				},
				proId:'',		/* 通道id */
				bankList: []	/* 通道支持银行列表 */
			}
		},
		methods:{		
			/* 获取支持银行信息 */
			async getChannelList(){				
				let res = await this.$api.supporBank({proId:this.proId})				
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					// console.log(res)
					this.bankList = res.data.dataMap.bankList				
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
.red{
	color: red;
}
page, .supportBank
	width: 100%;
	height: 100%;
	background:rgba(242,242,247,1);
	overflow: hidden;
	.support_bank_item
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		height: 85upx;
		padding: 0 25upx;
		margin-bottom: 6upx;
		font-size: 28upx;
		color: #3C3C3C;
		background-color: #fff;
		.single_limit
			width: 230upx;
			display: flex;
			justify-content: space-between;
			
</style>
