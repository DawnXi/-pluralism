<template>
	<view class="content">
       <!-- <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view> -->
		<text>这个是首页</text>
		<view class="banner">
			<image class="banner-img" src="../../static/banner.png" mode="widthFix"></image>
		</view>
		<view class="search">
			<image class="logo" src="/static/logo.png"></image>
			<view class="search-input">
				<input @focus='onFocus' confirm-type='search' v-model="keyword" style="" class="uni-input" type="text" name="keyword" placeholder="搜索公司,职位等" />
				<text @click="searchGoods" class="icon search" style="">&#xe66e;</text>
			</view>
		</view>
		<!-- 搜索面板 -->
		<searchPanel v-if='showPanel'></searchPanel>
		
		<!-- 兼职列表 -->
		<view class="works-list">
			<view class="item" v-for="n in 5" :key="n">
				<div class="left">
					<image class="img" src="../../static/ym.png" mode="widthFix"></image>
					<view class="state">报名中</view>
				</div>
				<div class="right">
					<view class="title">天猫优惠券在家赚钱25岁以上女性宝妈优先<text class="tag">热</text><text class="tag">荐</text></view>
					<view class="info">
						<view class="local">成都</view>
						<view class="salary">
							<view class="money">200元/天</view>
							<view class="time">长期可做</view>
						</view>
					</view>
				</div>
			</view>
		</view>
		
		<!-- <view class="uni-padding-wrap">
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
		</view> -->
		
		<button size="mini" @tap="toList">跳转到列表页</button>
		<button size="mini" @tap="toDetail">跳转到详情页</button>
		<button size="mini" @click="test">测试axios</button>
		<button size="mini" @click="goLogin" type="primary">跳转到注册页</button>
		<button size="mini" @click="goRegister" type="primary">跳转到登陆页</button>
		<button size="mini" @click="testAdd" type="primary">添加分类</button>
		<button size="mini" @click="testUpt" type="primary">修改分类</button>
		<button size="mini" @click="testDelet" type="primary">删除分类</button>
		<button size="mini" @click="testGet" type="primary">获取分类列表</button>
		<ul>
			<li v-for="(item,index) in works" :key="index">
				{{item.tag}}
			</li>
		</ul>
		
		
		// 自定义的弹出框
		<!--<model :options="modelData"></model>-->
		<button type="primary" size="mini" @click="handleShow(1)">查看</button>
		<xyDialog
				title="标题"
				content="操作成功,你懂得~"
				:show="showDialog_1"
				@cancelButton="clickCancel(1)"
				@confirmButton="clickConfirm(1)"
		></xyDialog>
	</view>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	// import work_type from '../../lib/api'
	import searchPanel from '../../components/search-panel.vue'
	// import model from '../../components/model.vue'
	import xyDialog from '@/components/xy-dialog/xy-dialog.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				keyword: '',
				showPanel: false, // 是否显示搜索历史面板
				modelData:{
					title:'hhh',
					content: '你妹的',
					okText: '确定',
					closeText: '取消'
				},
				showDialog_1: false
			}
		},
		computed: {
			...mapState('user',['userInfo']),
			...mapState('goods',['searchData']),
			...mapState('work', {
				works: state => state.data
			}),
		},
		components:{
			searchPanel,
			// model,
			xyDialog
		},
		watch: {
		    goods: function (val) {
				console.log(val)
			}
		},
		methods: {
			...mapActions('user', ['getUserInfo']),
			...mapActions('goods', ['TkGoodsSearch']),
			...mapActions('work', ['getWorks','addWork','putWork','deleteWork']),
			toList () {
				uni.navigateTo({
					url: '../../pages/list/list'
				})
			},
			onFocus() {
				this.showPanel = true;
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
			},
			testGet() {
				this.getWorks({
					success: (res) => {
						alert('请求列表成功！')
					},
					failed: (err) => {
						alert('请求列表失败！')
					}
				})
			},
			testAdd() {
				this.addWork({
					data: {
						title: 'Sequelize.STRING',
						des: 'Sequelize.STRING',
						tag: '包吃住???五险一金',
						salary: '1000-2000/月', //工资
						page_views: 55, // 浏览量
						company: '农夫未来灌灌灌灌灌灌', // 发布公司
						location: '锦江区的也容易', // 工作地点
						phone: '186281005212',//雇主电话
						wx: 'Sequelize.STRING',// 雇主微信
					},
					success: (res) => {
						this.getWorks();
						alert('添加兼职成功！')
					},
					failed: (err) => {
						alert('添加兼职失败！')
					}
				})
			},
			testUpt() {
				this.putWork({
					data: {
						// from 里的内容
						title: 'Sequelize.STRING',
						des: 'Sequelize.STRING',
						tag: '包吃住???五险一金???kkk',
						salary: '1000-2000/月', //工资
						page_views: 55, // 浏览量
						company: 'hhhhhhhhhhhhhh', // 发布公司
						location: '锦江区的也容易', // 工作地点
						phone: '186281005212',//雇主电话
						wx: 'Sequelize.STRING',// 雇主微信
						id: '17'
					},
					success: (res) => {
						this.getWorks();
						alert('修改兼职成功！')
					},
					failed: (err) => {
						alert('修改兼职失败！')
					}
				})
			},
			testDelet() {
				this.deleteWork({
					data: {
						id: '24'
					},
					success: (res) => {
						this.getWorks();
						alert('删除兼职成功！')
					},
					failed: (err) => {
						alert('删除兼职失败！')
					}
				})
			},
			handleShow(type) {
				this[`showDialog_${type}`] = true;
			},
			clickCancel(type) {
				this[`showDialog_${type}`] = false;
			},
			clickConfirm(type) {
				this[`showDialog_${type}`] = false;
			},
			handleActionShow() {
				this.$refs.xyDialog.show()
			}
		},
		onLoad() {
			console.log('创建页面成功');
			// this.getUserInfo();
		},
	}
</script>

<style lang="scss" scoped>
	.banner-img{
		width: 100%;
	}
	.search {
		padding: 20upx;
	}
	.search-input{
		position: relative;
	}
	.search-input input{
		text-align: left; 
		border-radius: 20upx;
		margin: 0 20upx;
        placeholder-color: #D8D8D8;
	}
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
		
		.works-list .item{
			display: flex;
			justify-content: space-between;
			margin: 0 5%;
			padding-bottom: 100upx;
			border-bottom: #8f8f94;
			color: #D8D8D8;
			.left{
				width: 20%;
			}
			.right {
				width: 75%;
			}
			.img{
				width: 100%;
				height: 200upx;
			}
			.title{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.info {
				width: 65%;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
			}
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
