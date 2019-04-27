<template>
	<view class="content">
		
		<!-- 下拉刷新组件 -->
		<wzj-pulldown-refresh 
			ref="wzjPulldownRefresh"
			:top = "0"
			@refresh="onPulldownReresh"
		>
		<button type="primary" @click="sendReqHot">请求测试</button>
				<view class="scroll-wrapper">
					<view 
						class="list-item"
						v-for="item in list"
						:key ='item'
					>
						列表项--{{item}}
					</view>
					<!-- 上拉加载组件 -->
					<wzj-load-more :status="loadMoreStatus"></wzj-load-more>
				</view>
		</wzj-pulldown-refresh>
		
	</view>
</template>
<script>
	import wzjPulldownRefresh from '../../components/wzj-pulldown-refresh/wzj-pulldown-refresh.vue'
	import wzjLoadMore	from  '../../components/wzj-load-more/wzj-load-more.vue'
	export default{
		components:{
			wzjPulldownRefresh,
			wzjLoadMore
		},
		data(){
			return {
				list: [],
				loadMoreStatus: 0
			}
		},
		onLoad() {
			this.loadData('add')
		},
		// 上滑加载更多
		onReachBottom() {
			this.loadData('add')
		},		
		methods:{
			loadData(type){	
				if(type === 'add'){
					this.loadMoreStatus = 1;
				}
				setTimeout(() => {	
					if(type === 'refresh'){
						this.list = [];
					}
					let length = this.list.length;
					for(let i=length; i< length + 10; i++){
						this.list.push(i);
					}
					if(type === 'add'){
						this.loadMoreStatus = 0;
					}
					if(type === 'refresh'){
						this.$refs.wzjPulldownRefresh && this.$refs.wzjPulldownRefresh.endPulldownRefresh();
					}
				},1000)
			},
			//下拉刷新
			onPulldownReresh(){				
				this.loadData('refresh');				
			},
			async sendReq(){
				let res = await this.$api.banner({qq:'466481615'});
				console.log(res)
			},
			async sendReqHot(){
				let res = await this.$api.hot({qq:'466481615',type:'superhero'})
				console.log(res)
			}
		},
		
		
	}
</script>
<style>
	page, .content{
		background-color: #f8f8f8;
	}
	
	.list-item{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150upx;
		font-weight: bold;
		font-size: 40upx;
		color: #555;
		background: #fff;
		border-bottom: 1px solid #eee;
	}
</style>