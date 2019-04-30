<template>
	<view>
		<text>这个是推荐页面</text>
		<view class="tab">
			<view class="item">附近</view>
			<view class="item">最新</view>
		</view>
		<view class="list">
			<view class="list-item">
				<view class="logo"></view>
				<view class="company">
					<view class="name">爱奇艺</view>
					<view class="info">上市公司 | 2000人以上 | 移动互联网</view>
				</view>
				<view class="work">
					<view class="left">
						<view class="name">高级视觉设计师</view>
						<view class="address">北京 | 海淀</view>
						<view class="welfare">
							<text class="item">只要女生</text>
							<text class="item">周末兼职</text>
							<text class="item">日结简直</text>
						</view>
					</view>
					<view class="right">
						<view class="salary">120/天</view>
						<view class="apply">立即报名</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<view class="logo"></view>
				<view class="company">
					<view class="name">爱奇艺</view>
					<view class="info">上市公司 | 2000人以上 | 移动互联网</view>
				</view>
				<view class="work">
					<view class="left">
						<view class="name">高级视觉设计师</view>
						<view class="address">北京 | 海淀</view>
						<view class="welfare">
							<text class="item">只要女生</text>
							<text class="item">周末兼职</text>
							<text class="item">日结简直</text>
						</view>
					</view>
					<view class="right">
						<view class="salary">120/天</view>
						<view class="apply">立即报名</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<view class="logo">去兼职</view>
				<view class="company">
					<view class="name">爱奇艺</view>
					<view class="info">上市公司 | 2000人以上 | 移动互联网</view>
				</view>
				<view class="work">
					<view class="left">
						<view class="name">高级视觉设计师</view>
						<view class="address">北京 | 海淀</view>
						<view class="welfare">
							<text class="item">只要女生</text>
							<text class="item">周末兼职</text>
							<text class="item">日结简直</text>
						</view>
					</view>
					<view class="right">
						<view class="salary">120/天</view>
						<view class="apply">立即报名</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<view class="logo"></view>
				<view class="company">
					<view class="name">爱奇艺</view>
					<view class="info">上市公司 | 2000人以上 | 移动互联网</view>
				</view>
				<view class="work">
					<view class="left">
						<view class="name">高级视觉设计师</view>
						<view class="address">北京 | 海淀</view>
						<view class="welfare">
							<text class="item">只要女生</text>
							<text class="item">周末兼职</text>
							<text class="item">日结简直</text>
						</view>
					</view>
					<view class="right">
						<view class="salary">120/天</view>
						<view class="apply">立即报名</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped="">
	.tab{
		width: 100px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.tab .item{
		font-size: 18px;
		font-weight: bold;
		position: relative;
	}
	.tab .item:after{
		display: block;
		content: '';
		width: 70%;
		height: 3px;
		background-color: #007AFF;
		position: absolute;
		left: 15%;
	}
	.list-item{
		position: relative;
		padding: 30upx;
		margin: 0 10upx;
		border: #ddd solid 1px;
		border-radius: 10upx;
		text-align: left;
		color: #999;
	}
	.logo{
		width: 50px;
		height: 50px;
		position: absolute;
	}
	.work{
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.welfare{
		text-align: center;
		margin-top: 15upx;
	}
	.welfare .item{
		padding: 5upx 10upx;
		background: #f3f3f3;
		font-size: 14px;
		color: #666;
		border-radius: 10upx;
		margin-right: 15upx;
		position: relative;
	}
	.salary{
		font-size: 16px;
		color: #fd6353;
		text-align: center;
	}
	.apply{
		padding: 3px 10px;
		background: #fd6353;
		color: #fff;
		border-radius: 10upx;
	}
	.name{
		font-size: 18px;
		font-weight: bold;
		color: black;
	}
	.address{
		color: #666;
	}
	.logo{
		width: 50upx;
		height: 50upx;
		background: #007AFF;
		position: absolute;
		top: -20px;
		left: 20px;
	}
	uni-view.company {
		margin-left: 150upx;
	}

	uni-view.logo {
		width: 140upx;
		height: 140upx;
		background: #007AFF;
		position: absolute;
		top: -30upx;
		left: 30upx;
		border-radius: 10upx;
	}

	uni-view.list-item {
		padding-top: 0px;
		margin-top: 50upx;
		background: #fff;
		box-shadow: 0px 0px 5px #ddd;
	}
</style>
