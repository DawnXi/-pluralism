<template>
	<view class="chart-list">
		<view class="list-title">最近会话</view>
		<view v-for="n in 3" class="item" :key="n" @tap="goChart(n)">
			<view class="left">
				<img class="img" src="https://picsum.photos/500/500?image=399" alt="">
				<view class="user-info">
					<view class="name">肉包来一笼<text class="tag">网易.人士</text></view>
					<view class="msg">肉包来肉包来一笼肉包来一笼一笼</view>
				</view>
			</view>
			<view class="right">
				<view class="time">09：40</view>
				<i class="iconfont icon-pinglun"></i>
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
		methods:{
			goChart(id){
				uni.navigateTo({
					url: `../../pages/chart/chart?id=${id}`
				})
			}
		}
	}
</script>

<style>
.list-title{
	color: #999;
    padding-left: 20px;
    line-height: 40px;
}
.list-title:after{
	display: block;
    content: '';
    width: 4px;
    height: 25px;
    position: absolute;
    left: 10px;
    top: 8px;
    background: red;
}
.chart-list{
	background: #fff;
	min-height: 100%;
}
uni-view.header {
display: flex;
justify-content: space-around;
}
.user-info .name {
    font-weight: 700;
}

.user-info .time {
    line-height: 1;
    font-size: 12px;
    color: #999;
}
uni-view.left .img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    float: left;
    margin-right: 10px;
}

uni-view.right {
	text-align: right;
	position: absolute;
	top: 0;
	right: 20upx;
}

uni-view.item {
    overflow: hidden;
    border-bottom: #ddd solid 1px;
    padding: 10px 40upx;
    position: relative;
}
.item .tag{
	color: #999;
	font-weight: normal;
	margin-left: 40upx;
}

uni-view.comment {
    padding-left: 60px;
}

uni-view.list {
    border-top: #ddd solid 1px;
	padding: 0 20upx;
}
i.iconfont {
    margin-left: 20px;
    margin-right: 3px;
}
</style>
