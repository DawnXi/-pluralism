<template>
	<view>
		<text>这个是个人中心</text>
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						我的消息
						<uni-badge text="123" type="success"></uni-badge>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						我的收藏
						<uni-badge text="12" type="primary"></uni-badge>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						投递记录
						<uni-badge text="12" type="primary"></uni-badge>
					</view>
				</view>
			</view>
		</view>
		<!--上传信息组件-->
		<Upload></Upload>
	</view>
</template>

<script>
	import uniBadge from "../components/uni-badge.vue";
	import Upload from "@/components/upload.vue";
	export default {
		data() {
			return {
				
			};
		},
		components:{
			uniBadge,
			Upload
		}
	}
</script>

<style>

</style>
