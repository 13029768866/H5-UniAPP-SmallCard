<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>	
	/*每个页面公共css */
	*,
	*:before,
	*:after {
	  box-sizing: inherit;
	}
	/* 省略号 */
	.ell{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	/* 通用颜色 */
	.white{
		color:#fff!important;
	}
	.baseBlue{
		color: #4E6CF3;
	}
	.moneyGreen{
		font-weight: 700;
		color: #7AB363;
	}
	.baseGray{
		color: #919090;
	}
	/* 通用边距 */
	.ml20{
		margin-left: 20upx;
	}
</style>
