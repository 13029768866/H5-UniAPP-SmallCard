<template>
	<view class="withdrawDetail">
		<view class="select_status">
			<select class="select_styl" id="">
				<option>全部状态</option>
				<option>成功</option>
				<option>失败</option>
				<option>处理中</option>
				<option>未处理</option>
			</select>
			<view class="line">
				
			</view>
			<select class="select_styl" id="">
				<option>近7天</option>
				<option>近30天</option>
				<option>近60天</option>
				<option>近90天</option>
			</select>
		</view>
		<view 
			class="withdraw_item"
			v-for="item in records"
			:key = "item.idx"
		>
			<view class="withdraw_item_top">
				<view>
					{{item.title}}
				</view>
				<view>
					￥{{item.amount}}元
				</view>
			</view>
			<view class="withdraw_item_top">
				<view class="withdraw_time">
					{{item.txnTime}}
				</view>
				<view v-html="item.orderStatus"></view>											
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userPhoneInfo:  [],
				records: []
			}
		},
		methods:{
			/* 1、获取数据 */
			async getCashList(){	
				let res = await this.$api.cashList({
					lastDays: 90,
					current: 1
				},this.userPhoneInfo)				
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					this.records = res.data.dataMap.records
				}else{					
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}					
			}
		},
		onLoad() {
			document.title = "提现记录"	
			this.userPhoneInfo = uni.getStorageSync('userPhoneInfo');
			this.getCashList()
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
page, .withdrawDetail
	position: relative;
	width: 100%;
	height: 100%;
	padding-bottom: 40upx;
	background: rgba(245,247,251,1);
	overflow: hidden;
	.line
		width:4upx;
		height:40upx;
		margin-top: 21upx;
		background:rgba(237,237,237,1);
	.select_status
		height: 82upx;
		background-color: #fff;
		margin-bottom: 4upx;
		display: flex;
		justify-content: space-between;
		.select_styl		
			width: 365upx;
			height: 82upx;
			padding-left: 118upx;
			border:  none;
			text-align: center;
	.withdraw_item
		width: 750upx;
		height: 126upx;
		padding: 25upx 65upx 25upx 35upx;
		margin-bottom: 10upx;
		font-size: 26upx;
		background-color: #fff;
		.withdraw_item_top
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10upx;
		.withdraw_time
			font: 20upx;
			color:rgba(183,183,183,1);
</style>
