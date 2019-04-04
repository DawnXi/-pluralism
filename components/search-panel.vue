<template>
	<view class="panel">
		<view class="history">
			<view class="top">
				<view class="inline">
					<i class="iconfont icon-sousuo"></i>
					<view>搜索历史</view>
				</view>
				<i class="iconfont icon-shanchu"></i>
			</view>
			<view class="list history-list">
				<view class="item">外套</view>
				<view class="item">袜子</view>
			</view>
		</view>
		<view class="hot">
			<view class="top inline">
				<i class="iconfont icon-local"></i>
				<view>热门搜索</view>
			</view>
			<view class="list hot-list">
				<view class="item">裤子</view>
				<view class="item">连衣裙</view>
				<view class="item">背带裤</view>
				<view class="item">牛仔亏</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'searchPanel',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.panel{
		margin: 0 10upx;
	}
	img{
		display: inline-block;
		width: 40upx;
		height: 40upx;
	}
	.inline{
		display: flex;
	}
	.list{
		display: flex;
		.item{
			padding: 10upx 15upx;
			color: #fff;
			margin: 10upx;
			background: #00bcd4;
		}
	}
	.icon-shanchu{
		float: right;
		margin-top: -30upx;
	}
</style>
