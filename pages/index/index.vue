<template>
	<view class="content">
       <!-- <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view> -->
		<text>这个是首页</text>
		<view class="search">
			<image class="logo" src="../../static/logo.png"></image>
			<view class="search-input">
				<input confirm-type='search' v-model="keyword" style="text-align: left; border-radius: 20upx;margin: 0 20upx;" placeholder-style="text-align: left;" class="uni-input" type="text" name="keyword" placeholder="搜索商品" />
				<text @click="searchGoods" class="icon search" style="">&#xe66e;</text>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="true">
						<swiper-item>
							<view class="swiper-item uni-bg-red">A</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<button size="mini" @tap="toList">跳转到列表页</button>
		<button size="mini" @tap="toDetail">跳转到详情页</button>
		<button size="mini" @click="test">测试axios</button>
		<button size="mini" @click="goLogin" type="primary">跳转到注册页</button>
		<button size="mini" @click="goRegister" type="primary">跳转到登陆页</button>
	</view>
</template>

<script>
	import {mapState, mapActions} from 'vuex' 
	export default {
		data() {
			return {
				title: 'Hello',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				keyword: ''
			}
		},
		computed: {
			...mapState('user',['userInfo']),
			...mapState('goods',['searchData'])
		},
		watch: {
		    goods: function (val) {
				console.log(val)
			}
		},
		methods: {
			...mapActions('user', ['getUserInfo']),
			...mapActions('goods', ['TkGoodsSearch']),
			toList () {
				uni.navigateTo({
					url: '../../pages/list/list'
				})
			},
			toDetail () {
				uni.navigateTo({
					url: '../../pages/detail/detail?id=5'
				})
			},
			test () {
				console.log('测试axios');
				this.getUserInfo({
					success: (res) =>  {
						alert(res)
					}
				});
			},
			goLogin () {
				uni.navigateTo({
					url: '../../pages/login/login'
				})
			},
			goRegister () {
				uni.navigateTo({
					url: '../../pages/register/register'
				})
			},
			KeyInput (e) {
				this.keyword = e.detail.value
				console.log(this.keyword)
			},
			searchGoods () {
				// 测试接口
// 				console.log('触发完成事件')
// 				console.log(this.keyword)
				this.TkGoodsSearch({
					// data: this.keyword,
					data: {
						'app_key': 'a1c0ae7eb994b6f7',
						'q': this.keyword
					},
					success: (res) => {
						alert('搜索提交！')
					},
					failed: (res) => {
						alert('搜索失败！')
					}
				})
			}
		},
		onLoad() {
			console.log('创建页面成功');
			// this.getUserInfo();
		},
	}
</script>

<style>
	.search {
		padding: 20upx;
	}
	.search-input{
		position: relative;
	}
	/* .icon: {
		position: absolute;
		right: 10upx;
		top: 0px;
	} */
	input.search{
		text-align: left; border-radius: 20upx;margin: 0 20upx;
	}
	.icon.search{
		position: absolute;right: 30upx; top: -10upx; z-index: 5; font-size: 40upx; color: #666666;
	}
	.content {
		text-align: center;
		height: 400upx;
		
	}
    .logo{
        height: 70upx;
        width: 70upx;
		float: left;
		margin-right: 10upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.swiper {
			height: 300upx;
		}
		.swiper-item {
			display: block;
			height: 300upx;
			line-height: 300upx;
			text-align: center;
		}
	
		.swiper-list {
			margin-top: 40upx;
			margin-bottom: 0;
		}
		
		.uni-common-mt{
			margin-top:60upx;
			position:relative;
		}
		
		.info {
			position: absolute;
			right:20upx;
		}
</style>

<!-- 字体图标相关 -->
<style>
    @font-face {
        font-family: 'iconfont';
        src: url('https://at.alicdn.com/t/font_545048_hfj6m5lsqjs.ttf') format('truetype');
    }
    .icon {
        font-family: iconfont;
        margin-left: 20upx;
    }
</style>
