<template>
	<!-- H5端使用百分比 -->
	<!-- #ifdef H5 -->
	<view class="wzj_refresh_con" :style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100% - '+ pageTop + 'px)',
				maxHeight:'calc(100% - '+ pageTop + 'px)'
			}"
	 @touchstart="pageTouchstart" @touchmove="pageTouchmove" @touchend="pageTouchend">
		<!-- #endif -->
		<!-- 非H5使用vh -->
		<!-- #ifndef H5 -->
		<view class="wzj_refresh_con" :style="{
				transform: 'translateY('+ pageDeviation +'px)',
				transition: pageTransition + 's',
				height: 'calc(100vh - '+ pageTop + 'px)',
				maxHeight:'calc(100vh - '+ pageTop + 'px)'
			}"
		 @touchstart="pageTouchstart" @touchmove="pageTouchmove" @touchend="pageTouchend">
			<!-- #endif -->
			<!-- 下拉刷新 -->
			<view class="wzj_loading_wrapper">
				<image 
					class="wzj_loading_icon" 
					:class="{active:refreshing, ready:refreshReady}" 
					src="../../static/logo.png">
				</image>
			</view>
			<slot></slot>
		</view>
</template>

<script>
	let startY, moveY;
	export default {
		props: {
			top: {
				// 距离页面顶部的距离，单位upx
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				pageDeviation: 0, // 下偏移量
				pageTransition: 0, // 回弹过渡时间				
				refreshReady: false, // 进入刷新准备状态				
				refreshing: false // 进入刷新状态
			}
		},
		computed: {
			// 移动端px适配处理
			pageTop() {
				return uni.upx2px(this.top);
			}
		},
		methods: {
			// 1、触摸开始获取页面触摸位置
			pageTouchstart(e) {
				this.pageTransition = 0;
				startY = e.touches[0].pageY;
			},
			//	2、触摸移动
			pageTouchmove(e) {
				moveY = (e.touches[0].pageY - startY) * 0.4;
				if (moveY >= 0) {
					this.pageDeviation = moveY;
					this.$emit('setEnableScroll', false);
				}
				if (moveY >= 50 && this.refreshReady === false) {
					this.refreshReady = true;
				} else if (moveY < 50 && this.refreshReady === true) {
					this.refreshReady = false;
				}
			},
			//	3、触摸结束
			pageTouchend() {
				this.pageTransition = 0.3;

				if (moveY >= 50) {
					this.startPulldownRefresh();
				} else {
					this.pageDeviation = 0;
				}

				if (this.refreshReady === true) {
					this.refreshReady = false;
				}
				//修复下拉一点回弹后页面无法滚动的bug
				this.$emit('setEnableScroll', true);
				startY = moveY = 0;
			},
			//	4、开启下拉刷新
			startPulldownRefresh() {
				this.refreshing = true;
				this.pageDeviation = uni.upx2px(90);
				this.$emit('refresh')
			},
			//	5、结束下拉刷新
			endPulldownRefresh() {
				this.refreshing = false;
				this.pageDeviation = uni.upx2px(0);
				//this.$emit('setEnableScroll', true);
			}
		}
	}
</script>

<style lang="stylus">
	@keyframes loading {
		0% {
			transform: translateY(-20upx) scaleX(1);
		}

		100% {
			transform: translateY(4upx) scaleX(1.3);
		}
	}

	.wzj_refresh_con 
		display: flex;
		flex-direction: column;
		position: relative;
		/* 下拉刷新部分 */
		.wzj_loading_wrapper 
			position: absolute;
			left: 0;
			top: 0;
			transform:translateY(-100%);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			.wzj_loading_icon 
				width: 70upx;
				height: 70upx;
				transition: .3s;
				&.ready 
					transform:scaleX(1.3);
				&.active 
					animation: loading .5s ease-in infinite both alternate;
</style>
