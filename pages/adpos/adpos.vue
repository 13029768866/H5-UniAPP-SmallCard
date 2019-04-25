<template>
	<view>
		<checkbox-group>
			<label>
				<checkbox class="wzj" value="cb" checked="true" />选中
			</label>
			<label>
				<checkbox value="cb" />未选中
			</label>
			
		</checkbox-group>
	</view>
</template>
<script>
	export default{
		
	}
</script>
<style>
/* #ifdef APP-PLUS || MP-WEIXIN  */
checkbox .uni-checkbox-input {
border-radius: 50%;
}
/* #endif */
</style>