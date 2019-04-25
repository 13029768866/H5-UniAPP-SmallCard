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
</style>
