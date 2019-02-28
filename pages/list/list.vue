<template>
	<view>
		<text>这个是列表页</text>
		<text>列表{{Number(nowItem.id ) + 1}}</text>
		<view class="banner" @click="goDetail(banner)">
			<image class="banner-img" :src="banner.cover"></image>
			<view class="banner-title">{{banner.title}}</view>
		</view>
		<view class="page">
			<view class="uni-product-list">
				<view class="uni-product" v-for="(product,index) in tbGoods" :key="index" @click="goDetail(product)">
					<view class="image-view">
						<image class="uni-product-image" :src="product.pict_url"></image>
					</view>
					<view class="uni-product-title">{{product.title}}</view>
					<view class="uni-product-price">
						<!-- <text class="uni-product-price-favour">￥{{product.reserve_price}}</text> -->
						<text class="uni-product-price-original">￥{{product.zk_final_price}}</text>
						<text class="uni-product-tip">{{product.user_type === 1 ? '淘宝' : '天猫'}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var dateUtils = require('../../common/util.js').dateUtils;
	import {mapState, mapActions} from 'vuex' 
	export default {
		data() {
			return {
				nowItem: {
					id: 0,
					name: ''
				},
				banner: {},
				listData: [],
				last_id: "",
				reload: false,
			}
		},
		computed: {
			...mapState('user',['userInfo']),
			...mapState('goods',['tbGoods'])
		},
		watch:{
			goods: function (val) {
				console.log('vuex的数据' + val)
			}
		},
		methods: {
			...mapActions('user', ['getUserInfo']),
			...mapActions('goods', ['getTbGoods']),
			goDetail: function (item) {
// 				if (!/前|刚刚/.test(e.published_at)) {
// 					e.published_at = dateUtils.format(e.published_at);
// 				}
				let detail = {
					title: item.title,
					smallImage: item.small_images,
					price: item.zk_final_price,
				}
				console.log(detail)
				uni.navigateTo({
					url: "../detail/detail?detailDate=" + encodeURIComponent(JSON.stringify(detail))
				})
			},
// 			setTime: function (items) {
// 				var newItems = [];
// 				items.forEach((e) => {
// 					newItems.push({
// 						author_name: e.author_name,
// 						cover: e.cover,
// 						id: e.id,
// 						post_id: e.post_id,
// 						published_at: dateUtils.format(e.published_at),
// 						title: e.title
// 					});
// 				});
// 				return newItems;
// 			},
		},
		created () {
			alert(1111)
			// this.loadData()
			this.getTbGoods({
				success: (res) => {
					console.log(res)
				},
				failed: (res) => {
					alert('获取数据失败，请稍后再试！')
				}
			})
		}
	}
</script>

<style>
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>

