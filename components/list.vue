<template>
	<view class="work-list">
		<view class="item1"  v-for="n in 5" :key="n" @tap="toDetail(n)">
			<img class="img" src="https://picsum.photos/500/500?image=399" alt="">
			<view class="info">
				<view class="name">高薪中高端电话客服</view>
				<view class="address"><i></i><text class="text">朝阳朝外，朝阳门，东大桥（据我2.0km）</text></view>
				<view class="time"><i></i><text class="text">09月15日-12月15日，10：00-21：00</text></view>
			</view>
			<view class="price">180/天</view>
			<view class="settlement">周结</view>
			<view class="update">5分钟前</view>
		</view>
		<view @tap="test">测试</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toDetail (id) {
				uni.navigateTo({
					url: `../../pages/detail/detail?id=${id}`
				})
			},
			test() {
				console.log('这个是测试');
			}
		},
	}
</script>

<style scoped>
	.work-list{
		background: #fff;
		min-height: 100%;
		padding: 0 20upx;
	}
	img.img {
    width: 130upx;
    height: 130upx;
    border-radius: 130upx;
    float: left;
    margin-right: 10upx;
	margin-top: 30upx;
}

.item1 {
    text-align: left;
    overflow: hidden;
    padding: 20upx;
    border: #ddd solid 1px;
    margin: 20upx 10upx;
	font-size: 10px;
	color: #666;
    position: relative;
	background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 5px #ddd;
}

.price {
    position: absolute;
    top: 10px;
    right: 10px;
    color: red;
}

.settlement {
    position: absolute;
    top: 35px;
    right: 10px;
    color: #fff;
    padding: 0 5upx;
    font-size: 0.65rem;
    background: #1be3de;
	border-radius: 5upx;
}

.update {
    position: absolute;
    top: 60px;
    right: 10px;
    color: red;
}

.info {
    margin-left: 110upx;
}
.text{
	font-size: 0.65rem;
}
.address{
	margin-top: 20upx;
}
.name{
	font-size: 36upx;
	color: #000000;
}
</style>
