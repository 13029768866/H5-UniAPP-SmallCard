<template>
	<view class="adpos">
		<!-- 滚动公告 -->
		<view class="uni-swiper-msg ad_wrapper">
			<view class="uni-swiper-msg-icon ad_icon_wrapper">
				<image class="ad_icon" src="../../static/bobao.png" mode="widthFix"></image>
			</view>
			<swiper class="ad_text" vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item 
					v-for="(item, index) in msg" 
					:key="index">
					<view class="ad_msg ell">{{item}}</view>
				</swiper-item>
			</swiper>
		</view>
		<form @submit="adPosCheck">
			<!-- 选择广告位 -->
			<view class="ad_select_wrapper">
				<view class="ad_select_title">
					请选择广告位<text class="select_more">( 可多选 )</text>
				</view>
				
				<checkbox-group class="check_type" name="adtype" @change="checkboxChange">			
					<label 
						v-for="item in items"
						:key = "item.value"
						class="ad_choose"
					>
						<checkbox :value="item.value" :checked="item.checked"/>{{item.name}}
					</label>
					
				</checkbox-group>			
			</view>
			<!-- 选择推广时间 -->
			<view class="choose_time_wrapper">
				<view class="choose_time_title">
					<image src="../../static/bobao.png"></image>
					选择推广时间
				</view>
				
				<radio-group class="choose_days" @change="chooseAdDay">
					<label  
						v-for="(time, index) in times" 
						:key="time.value"
						>						
							<view>
								<radio 
								style="display: none;"
								:value="time.value" 
								:checked="index === current" 
								ref="radioChecked"
							/>
							</view>
							<view 
								class="choose_days_item"
								:class="{white: index === current}"
								ref = "moneyCheck"
							>								
								<image 
									v-show=" time.days >5 && time.days<20 ?true: false"	
									class="discount_icon" 
									src="../../static/discount.png">
								</image>
								<image 
									class="choose_days_item_bg"
									src="../../static/choose_daysAc.png"
									 v-if="index === current"
								></image>
								<image 
									 v-else
									 class="choose_days_item_bg"
									src="../../static/choose_time_bg.png"									
								></image>
								<view class="original_price">{{time.origin}}</view>
								<view class="now_price_wrapper">
									￥<text class="now_price" v-if="!newPrice">{{time.now}}</text>
									<text class="now_price" v-else>{{time.now1}}</text>
								</view>
								<view class="generalize_days">
									{{time.days}}天
								</view>
							</view>							
					</label>
				</radio-group>	
					
									
				
			</view>
			<!-- 价格结算 -->
			<view class="total_price_wrapper">
				<view 
					class="total_price_item"				
				>					
					<view>{{adPosType}}共<text class="baseBlue">{{adPosDays}}</text>天</view>
					<view class="moneyGreen">￥<text>{{adPosMoney}}元</text></view>
				</view>
				<view class="total_price_item">
					<view></view>
					<view class="baseGray">合计总费用: <text class="ml20 moneyGreen">￥{{adPosMoney}}元</text></view>
				</view>
			</view>
			<button class="next_btn" formType="submit" type="primary">下一步</button>
		</form>
		
	</view>
</template>

<script>
	import graceChecker from '../../common/graceChecker.js'
	export default{
		data(){
			return{
				/* 公告信息 */
				msg : [
					'uni-app行业峰会频频亮相，开发者反响热烈',
					'DCloud完成B2轮融资，uni-app震撼发布',
					'CSDN公号推荐 DCloud CEO文章,CSDN公号推荐 DCloud CEO文章'
				],
				/* 广告位 */
				items:[{
					value: '品牌入驻',
					name:'品牌入驻'
				},
				{
					value:'启动海报',
					name:'启动海报'
				}
				],
				currentChecked: '',
				/* 价格结算信息提示 */
				adPosType:'',
				adPosDays:3	,
				adPosMoney: 150,
				newPrice:false,
				/* 推广时间 */
				current: 0,
				times:[
					{	
						value:"魏振江",
						days:3,
						origin: 150,
						now: 150,
						now1: 300
					},
					{
						value:"牛逼",
						days:7,
						origin: 350,
						now: 210,
						now1: 420
					},
					{
						value:"不",
						days:15,
						origin: 750,
						now: 300,
						now1: 600
					},
					{
						value:"牛鼻",
						days:30,
						origin: 2000,
						now: 1500,
						now1: 3000
					}
				]
			}
		},
		/* computed:{
			newPriceChange(){
				return this.adPosMoney	
			}
		}, */
		methods:{
			/* 广告位添加 */
			checkboxChange(e) {
				this.adPosType = e.detail.value + ','
				 if(this.adPosType === ','){
					 this.adPosType = ''
				 }
				
				let items = this.items,
					values = e.detail.value;
				/* 选择多项时价格 */
				values.length >= 2 ?this.newPrice = true:this.newPrice = false;	
				
				/* dom操作解决bug */
				this.$refs.radioChecked.map((item,idx) =>{
					if(item.checked === true){
						this.currentChecked = idx;
						// console.log(this.current)
					}					
				})
				// console.log(this.$refs.moneyCheck)
				setTimeout(()=>{
					this.adPosMoney = this.$refs.moneyCheck[this.currentChecked].$children[3].$children[0].$el.innerText
				},50)
				
				
				items.map(item =>{
					if(values.includes(item.value)){
						this.$set(item,'checked',true)							
					}else{
						this.$set(item,'checked',false)
					}
				})				
				
			},
			/* 广告时间选择 */
			chooseAdDay(e){
				// console.log(e.target.value)
				this.times.some((time,idx) => {					
					if(time.value === e.target.value){
						this.current = idx;						
						this.adPosDays = time.days
						!this.newPrice?this.adPosMoney = time.now:this.adPosMoney=time.now1;						
					}				
				})
				
			},
			/* 广告位检测 */
			adPosCheck(e){				
				/* 定义规则 */
				let rules = [
					{name:"adtype", checkType : "notnull", checkRule:"",  errorMsg:"请选择上方广告位"}					
				]
				/* 进行校验 */
				let	formData = e.detail.value,			
					checkRes = graceChecker.check(formData, rules);					
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		}
	}
</script>

<style lang="stylus">


scroll-view ::-webkit-scrollbar{
	   width: 0;
	   height: 0;
	   color: transparent;
}

page, .adpos	
	background:rgba(246,247,251,1);
	overflow: hidden;
	width: 100%;
	height: 100%;
	/* 公告栏区域 */
	.ad_wrapper	
		position: relative;
		height:71upx;
		line-height: 71upx;
		background:rgba(201,211,255,1);
		font-size: 24upx;
		padding-left: 25upx;
		overflow: hidden;
		.ad_icon_wrapper			
			.ad_icon
				position: absolute;
				top: 50%;
				transform:translateY(-50%);
				width: 35upx;
				height: 32upx;	
		.ad_text			
			margin-left: 45upx;
			.ad_msg				
				width: 670upx;
				overflow: hidden;
	/* 广告选择区域 */
	.ad_select_wrapper		
		height: 164upx;
		background-color: #fff;
		margin-bottom: 15upx;
		padding: 38upx 25upx 28upx 25upx;		
		.ad_select_title
			font-size: 26upx;
			.select_more
				color #8F8F8F
				margin-left: 15upx;
		.check_type
			display: flex;
			align-items: center;
			margin-top: 20upx;
			font-size: 26upx;
			.ad_choose
				display: flex;
				align-items: center;
				&:nth-child(1)
					margin-right: 90upx;
	/* 推广时间 */
	.choose_time_wrapper		
		height: 259upx;
		background-color: #fff;
		padding: 15upx 25upx;
		.choose_time_title
			display: flex;
			font-size: 28upx;
			margin-bottom: 10upx;
			align-items: center;			
			image
				width: 35upx;
				height: 35upx;
				margin-right: 30upx;
		.choose_days
			display: flex;
			.choose_days_item			
				position: relative;				
				width: 145upx;
				height: 181upx;
				margin-right: 36upx;
				font-size: 22upx;
				color #4E6CF3
				.discount_icon
					position: absolute;
					width: 40upx;
					height: 50upx;
					top: 12upx;
					left: 14upx;
					z-index 11;
				.choose_days_item_bg
					width: 145upx;
					height: 181upx;
				.original_price
					position: absolute;
					left: 50%;
					transform:translateX(-50%);
					top: 33upx;
					text-decoration:line-through;
				.now_price_wrapper
					position: absolute;
					left: 50%;
					transform:translateX(-50%);
					top: 62upx;
					font-weight: 700;
					.now_price
						margin-left: -5upx;
						font-size: 36upx;
						letter-space: 0;
				.generalize_days
					position: absolute;
					left: 50%;
					transform:translateX(-50%);					
					bottom: 28upx;
	/* 价格结算 */
	.total_price_wrapper
		.total_price_item
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 85upx;
			background-color: #fff;
			padding: 0 28upx;
			margin-top: 8upx;
			font-size: 30upx;
	/* 下一步 */
	.next_btn
		width: 696upx;
		margin: 68upx 27upx;
		.asd
			font-size: 22px;
</style>
