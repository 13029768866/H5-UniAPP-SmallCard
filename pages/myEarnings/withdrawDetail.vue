<template>
	<view class="withdrawDetail">
		<view class="select_status">
			<select 
				class="select_styl"
				 v-model="withdrawStatus"
				@change ="selectChange">
				<option value="">全部状态</option>
				<option value="1">成功</option>
				<option value="2">失败</option>
				<option value="3">处理中</option>
				<option value="0">未处理</option>
			</select>
			<view class="line">
				
			</view>
			<select 
				class="select_styl"
				v-model="withdrawTime"
				@change="selectChange"
			>
				<option value="7">近7天</option>
				<option value="30">近30天</option>
				<option value="60">近60天</option>
				<option value="90">近90天</option>
			</select>
		</view>
		<scroll-view 
			class="withdraw_scroll_wrapper"
			@scrolltolower="loadMore"
			scroll-y>
			<view 
				class="withdraw_item"
				v-for="(item,idx) in records"
				:key = "item.idx"
				@click="checkMsgDetail(idx)"
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
		
			<!-- 上滑加载更多组件 -->
			<wzj-load-more v-show="showStatus"  :status="loadMoreStatus"></wzj-load-more>
		</scroll-view>
		
	</view>
</template>

<script>
	import wzjLoadMore from '@/components/wzj-load-more/wzj-load-more';
	export default{
		components:{
			wzjLoadMore
		},
		data(){
			return{
				userPhoneInfo:  [],
				records: [],
				withdrawStatus: '',
				withdrawTime: 30,
				current: 1,
				/* 上拉加载组件参数 */
				loadMoreStatus: 0,
				enableScroll: true,	/* 滚动状态 */
				showStatus: false,
				total: 0,
				pages: 0
			}
		},
		methods:{
			/* 1、获取数据 */
			async getCashList(){
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.cashList({
					lastDays: this.withdrawTime,
					current: this.current,
					orderType: this.withdrawStatus
				},this.userPhoneInfo)				
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					uni.hideLoading()
					this.records = res.data.dataMap.records
					this.total = res.data.dataMap.total
					this.pages = res.data.dataMap.pages
					/* 解决组件bug */
					if(this.total > 10){
						this.showStatus = true
					}
				}else{	
					uni.hideLoading()
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}					
			},
			/* 2、获取选中项 */
			selectChange(obj){
				this.current = 1
				this.showStatus = false
				this.loadMoreStatus = 0
				this.getCashList()
			},
			/* 3、上拉加载 */			
			loadMore(){
				// console.log(this.current)
				this.loadNewsList('add');			
			},
			/* 4、数据列表 */
			loadNewsList(type){		
				this.current++				
				//type add 加载更多 refresh下拉刷新
				if(type === 'add'){
					if(this.loadMoreStatus === 2){
						return;
					}
					this.loadMoreStatus = 1;
				}
				
				/* 发送请求 */	
				this.getCashList1()	
				
			},
			async getCashList1(){
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.cashList({
					lastDays: this.withdrawTime,
					current: this.current,
					orderType: this.withdrawStatus
				},this.userPhoneInfo)				
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){	
					uni.hideLoading()
					this.records = this.records.concat(res.data.dataMap.records)				
					this.loadMoreStatus = this.current >= this.pages? 2: 0;
					this.total = res.data.dataMap.total
					/* 解决组件bug */
					if(this.total > 10){
						this.showStatus = true
					}
				}else{	
					uni.hideLoading()
					uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
				}				
			},
			/* 5、查看详情 */
			checkMsgDetail(idx){
				let currentIdx = this.records[idx]		
				uni.setStorageSync('currentIdx',currentIdx);
				uni.redirectTo({
					url:'/pages/myEarnings/withdrawDetailCurrent'
				})
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
	.withdraw_scroll_wrapper
		height: 95%;
		// border: 1px solid #000;
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
