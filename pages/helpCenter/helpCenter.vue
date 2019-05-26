<template>
	<view class="helpCenter">
		<view class="help_center_top">
			<image src="../../static/helpCenter/hlep_center.png"></image>
		</view>	
		<scroll-view 
			scroll-y
			class="help_center_con"
		>
		<uni-collapse>			
			<uni-collapse-item 
				v-for="item in helpList"
				:key = "item.idx"
				:title="item.subTitle"
				:show-animation="true"
				 thumb="../../static/helpCenter/fire.png"
				 
			>
				<view 
					style="padding: 30upx;"	
					v-html="item.content"
				>
					
				</view>
			</uni-collapse-item>
			
			
		</uni-collapse>
		</scroll-view>
		<view class="bottom_msg">
			<view class="">
				保护信息安全，杜绝隐私泄露
			</view>
			<view class="">
				©本服务由浙江小卡e站有限公司提供
			</view>
		</view>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
export default{
	components:{
		uniCollapse,
		uniCollapseItem
	},
	data(){
		return{
			userPhoneInfo: [],
			helpList: []
		}
	},
	methods:{
		/* 1、帮助中心信息 */
		async getAppHelpInfo(){	
			let res = await this.$api.appHelpInfo({},this.userPhoneInfo)				
			if(res.data.respCode == "SUCCESS" && res.data.dataMap){
				// console.log(res)	
				this.helpList = res.data.dataMap.helpList
			}else{					
				uni.showToast({title:res.data.respMsg,icon:"none",duration:4000})
			}					
		}
	},
	onLoad(options) {
		document.title = "帮助中心"	
		this.userPhoneInfo = JSON.parse(options.version)		
		uni.setStorageSync('userPhoneInfo',this.userPhoneInfo);	
		this.getAppHelpInfo()
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
page, .helpCenter
	position: relative;
	width: 100%;
	height: 100%;
	padding-bottom: 40upx;
	background: rgba(245,247,251,1);
	overflow: hidden;
	.help_center_top
		image
			width: 750upx;
			height: 250upx;
	.help_center_con
		height: 75%;
		// border: 1px solid #000;
	.bottom_msg
		text-align: center;
		font-size: 18upx;
		color:rgba(121,121,121,1);
</style>
