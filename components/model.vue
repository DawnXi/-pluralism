<template>
	<view class="model-box">
		<view class="model">
			<view class="title">{{options.title}}</view>
			<view class="content">{{options.content}}</view>
			<view class="options">
				<view class="ok">{{options.okText}}</view>
				<view class="close">{{options.closeText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			options: {
				type: Object,
				required: true
			}
		}	
	}
</script>

<style lang="scss">

</style>
