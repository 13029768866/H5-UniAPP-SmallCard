<template>
	<view class="index">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view 
				v-for="(item,index) in professionTypeList" 
				:id="'tab'+index" :key="item.id" 
				class="nav-item" :class="{current:index === tabCurrentIndex}"
				@click="changeTab(index)">{{item.brandType}}</view>
		</scroll-view>
		<!-- 广告区域 -->
		<image src="../../static/index_banner.png" class="index_banner"></image>
		<!-- 供应商区域 -->
		<scroll-view 
		scroll-y="true" 
		class="brands_wrapper_box"
		@scrolltolower="loadMore"
		@scroll="scroll"
		>
			<view class="brands_wrapper">
				<view 
					class="brands_item"
					v-for="item in records"
					:key = 'item.id'
				>
					<image :src="item.headImg" class="brands_image"></image>
					<view class="brands_mid">
						<view class="brands_mid_header">
							<text class="brands_name ell">{{item.corporateName}}</text>
							<view class="brands_zhiding">
								<image src="../../static/zhiding.png" class="brands_zhiding"></image>
							</view>
							<image src="../../static/hongbao.png" class="brands_hongbao"></image>
							<text class="brands_hb_money">1.00</text>元
						</view>
						<view class="brands_desc ell">
							{{item.businessScope}}
						</view>
						<view>
							<text class="brands_tag">{{item.brandType}}</text>
						</view>
					</view>
					<view class="brands_r">
						<view 
						class="add_friend"
						@click="UerMsg"
						>加好友</view>
						<!-- <view class="brands_pos_wrapper">
							<image class="brands_pos" src="../../static/weizhi.png"></image>
							<view class="brands_pos_name">{{item.address}}</view>
						</view> -->
					</view>
				</view>
			</view>	
											
			<!-- 上滑加载更多组件 -->
			<!-- v-show="showStatus" -->
			<wzj-load-more  v-show="showStatus" :status="loadMoreStatus"></wzj-load-more>
		</scroll-view>		
	</view>
</template>

<script>
	import wzjLoadMore from '@/components/wzj-load-more/wzj-load-more';
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			wzjLoadMore
		},
		data() {
			return {
				/* 上拉加载参数 */
				loadMoreStatus: 0,	/* 上拉加载更多状态 */
				enableScroll: true,	/* 滚动状态 */
				showStatus: false,
				total: '',
				pages: '',
				userPhoneInfo:{},
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, // 顶部选项卡左滑距离
				professionTypeList: [],		//	分类列表,
				records: []	,
				brandType: '全部',
				current: 1,
					
			}
		},
		async onLoad(options) {
			// 1、获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth
			// console.log(JSON.parse(options.version))
			this.userPhoneInfo = JSON.parse(options.version)		
			uni.setStorageSync('userPhoneInfo',this.userPhoneInfo);
			this.getProfessionList();
			this.getFinancialList();
		},
		methods: {
			//1、获得元素的位置
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {						
						res(data);
					}).exec();
				});
			},
			scroll(e) {
            console.log(e)
            // e.detail.scrollTop = 0
			},
			//2、tab切换
			async changeTab(e) {	
				// console.log(e)
				// console.log(this.professionTypeList[e].brandType)
				this.current = 1
				this.loadMoreStatus = 0			
				this.brandType = this.professionTypeList[e].brandType
				this.getFinancialList()
				/* if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				} */
				
				// 1、tab样式切换
				let index = e;
				// e为number是点击切换，e=object是swipwer滑动切换
				if(typeof e === 'object'){
					index = e.detail.current
				}
				if(typeof tabBar !== 'object'){
					tabBar = await this.getElSize("nav-bar")
				}
				
				// 2、计算宽度实现滑动切换
				/* let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0; 
				let nowWidth = 0;
				// 2.1获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				} */
				
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
						
							
				//2.2 设置延时300ms,等待swiper动画结束再修改tabbar
				/* scrollTimer = setTimeout(()=>{
				if (width - nowWidth/2 > windowWidth / 2) {
					//如果当前项越过中心点，将其放在屏幕中心
					this.scrollLeft = width - nowWidth/2 - windowWidth / 2;
				}else{
					this.scrollLeft = 0;
				}
				if(typeof e === 'object'){
					this.tabCurrentIndex = index; 
				}
				this.tabCurrentIndex = index; 
				
				
				//第一次切换tab，动画结束后需要加载数据
				// let tabItem = this.tabBars[this.tabCurrentIndex];
				// if(this.tabCurrentIndex !== 0 && tabItem.loaded !== true){
				// 	this.loadNewsList('add');
				// 	tabItem.loaded = true;
				// }
			}, 300)	 */						
			},
			/* 3、获取分类列表 */
			async getProfessionList(){
				let res = await this.$api.professionList({},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)			
					this.professionTypeList = res.data.dataMap.professionTypeList																		
				}else{					
						uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
					}				
			},
			/* 4、获取分类列表 */
			async getFinancialList(){
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.financialList({
					professionType: this.brandType,
					pages: this.current
				},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					uni.hideLoading()					
					this.records = res.data.dataMap.professionTypeList.records	
					this.total = res.data.dataMap.professionTypeList.total
					this.pages = res.data.dataMap.professionTypeList.pages
					/* 解决组件bug */
					if(this.total > 10){
						this.showStatus = true
					}
				}else{		
						uni.hideLoading()
						uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
					}				
			},
			async getFinancialList1(){
				uni.showLoading({
					title: '加载中'
				});
				let res = await this.$api.financialList({
					professionType: this.brandType,
					pages: this.current
				},this.userPhoneInfo)			
				if(res.data.respCode == "SUCCESS" && res.data.dataMap){
					console.log(res)	
					uni.hideLoading()					
					this.records = this.records.concat(res.data.dataMap.professionTypeList.records)					
					console.log(this.current,this.pages,this.records)
					this.loadMoreStatus = this.current >= this.pages? 2: 0;
				}else{		
						uni.hideLoading()
						uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
					}				
			},
			/* 5、用户通知 */
			UerMsg(){
				uni.showToast({title:'该功能暂未开放',icon:"none",duration:2500})
			},
			/* 上拉加载 */					
			loadMore(){
				this.loadNewsList('add');			
			},
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
				this.getFinancialList1()
				//上滑加载 处理状态				
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
page, .index	
	background-color: #f8f8f8;
	overflow: hidden;
	width: 100%;
	height: 100%;
	.brands_wrapper_box			
		margin-top: -5px;
		border:1px solid #000;
		height: 75%;	
	.swiper-box				
		height: 100%;
				
		
	/* 顶部tabbar */
	.nav-bar{
		position: relative;
		z-index: 10;
		height: 80upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;		
		.nav-item{
			display: inline-block;
			width: 125upx;
			height: 80upx;
			text-align: center;
			line-height: 80upx;
			font-size: 26upx;
			color: #303133;
			position: relative;
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		.current{
			color: #007aff;
			&:after{
				width: 50%;
			}
		}
	}	
	.panel-scroll-box{
		height: 100%;		
		.panel-item{
			background: #fff;
			padding: 30px 0;
			border-bottom: 2px solid #000;
		}
	}
	/* 首页广告 */
	.index_banner		
		width: 100%;
		height: 186upx;	
		
	/* 品牌商 */
	.brands_item
		background-color: #fff;
		display: flex;
		align-items: center;
		width: 100%;
		height: 170upx;		
		justify-content: space-between;
		padding: 0 10upx 0 32upx;
		margin-top: 5upx;
		.brands_image
			width: 103upx;
			height: 103upx;
			border-radius:50%;	
		.brands_mid			
			.brands_mid_header
				display: flex;
				align-items: center;
				font-size: 30upx;
				.brands_name					
					width: 185upx;					
				.brands_zhiding
					width: 90upx;
					height: 40upx;
				.brands_hongbao
					margin-left: 30upx;
					width: 36upx;
					height: 41upx;
				.brands_hb_money
					font-size: 30upx;
					color #ED6F6A
					margin-left: 8upx;
			.brands_desc
				width: 250upx;
				font-size: 26upx;
				color #898989
				margin: 4upx 0 10upx 0;
			.brands_tag
				height: 34upx;
				height: 34upx;				
				font-size: 22upx;
				color #fff
				background:rgba(146,156,200,1);
				border:1px solid rgba(167,179,229,1);
				border-radius:10upx;
				padding: 0 36upx;
		.brands_r
			font-size: 22upx;						
			.add_friend
				width: 115upx;
				height: 50upx;
				line-height 50upx
				background:rgba(103,146,251,1);
				border-radius:10upx;
				font-size:26upx;
				padding: 0 18upx;
				color #fff
				margin-bottom: 10upx;
			.brands_pos_wrapper
				display: flex;
				align-items: center;
				.brands_pos
					width:24upx;
					height:31upx;
				.brands_pos_name
					color:rgba(173,176,184,1);
					margin-left: 5upx;
</style>