<template>
	<view class="content">
		<text>这个是首页</text>
		<view class="banner">
			<image class="banner-img" src="../../static/banner.png" mode="widthFix"></image>
		</view>
		<view class="search">
			<image class="logo" src="/static/logo.png"></image>
			<view class="search-input">
				<input @focus='onFocus' confirm-type='search' v-model="keyword" style="" class="uni-input" type="text" name="keyword" placeholder="搜索公司,职位等" />
				<text @tap="toSearch(keyword)" class="icon search" style="">&#xe66e;</text>
			</view>
		</view>
		<!-- 搜索面板 -->
		<searchPanel v-if='showPanel'></searchPanel>
		<!-- 兼职列表 -->
		<List style="z-index: 9999;"></List>
		
		
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
		
		 <!-- 自定义的弹出框 -->
		<button type="primary" size="mini" @tap="handleShow(1)">查看</button>
		<xyDialog
				title="标题"
				content="操作成功,你懂得~"
				:show="showDialog_1"
				@cancelButton="clickCancel(1)"
				@confirmButton="clickConfirm(1)"
		></xyDialog>

		<view @tap="goChart">测试聊天会话</view>
	</view>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	// import work_type from '../../lib/api'
	import searchPanel from '../../components/search-panel.vue'
	// import model from '../../components/model.vue'
	import xyDialog from '@/components/xy-dialog/xy-dialog.vue'
	import uniSwiperDot from "../../components/uni-swiper-dot/uni-swiper-dot.vue"
	import List from "@/components/list"
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
				showDialog_1: false,
				// 轮播相关
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'long',
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
			xyDialog,
			uniSwiperDot,
			List
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
			toDetail (id) {
				uni.navigateTo({
					url: `../../pages/detail/detail?id=${id}`
				})
			},
			toSearch(keyword) {
				uni.navigateTo({
					url: `../../pages/search-result/search-result?keyword=${keyword}`
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
					 data: this.keyword,
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
			},
			goChart() {
				uni.navigateTo({
					url: '../../pages/chart-list/chart-list'
				})
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
		padding-bottom: 80px;
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



<style scoped>
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