<template>
	<view>
		<!-- <page-head title="登录"></page-head> -->
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset" methods="POST">
				<view class="uni-form-item uni-column">
					<view class="title">用户名/手机号</view>
					<input class="uni-input" type="text" name="username" placeholder="请输入用户名/手机号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码</view>
					<input class="uni-input" type="password" name="password" placeholder="请输入密码" />
				</view>
				<button type="primary" formType="submit">登录</button>
			</form>
		</view>
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="text" @click="toRegister">还没有账号？立即注册</view>
			<view class="text" @click="toForget">忘记密码？</view>
			<button type="primary" @click="testPost">测试axios</button>
		</view>
	</view>
</template>

<script>
	// import axios from 'axios'
	import {mapState, mapActions} from 'vuex' 
	export default {
		data() {
			return {
				formData: {}
			};
		},
		computed: {
			...mapState('user',['userInfo'])
		},
		watch: {
			userInfo: function (val) {
				this.formData = val;
			}
		},
		methods:{
			...mapActions('user', ['login', 'getPublicPem']),
			
			formSubmit: async function (e) {
				let data = e.detail.value
				console.log(data)
// 				await this.getPublicPem ({
// 					success: (res) => {
// 						console.log('获取密钥成功！')
// 					},
// 					failed: (res) => {
// 						alert('登录失败！')
// 					}
// 				})
// 			   let pwd = this.formData.password
			   // data.password = pwd
			   await this.login({
					data: data,
					success: (res) => {
						alert('登录成功！')
					},
					failed: (res) => {
						alert('登录失败！')
					}
				})
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			},
			toRegister () {
				uni.navigateTo({
					url: `../../pages/register/register`
				})
			},
			toForget () {
				uni.navigateTo({
					url: `../../pages/forget/forget`
				})
			},
			testPost () {
				// uni.request({
				// 	url: 'http://localhhost:888/api/add_work',
				// 	method: 'POST',
				// 	data: {
				// 		title: 'Sequelize.STRING',
				// 		des: 'Sequelize.STRING',
				// 		tag: '包吃住???五险一金',
				// 		salary: '5000-100000/月',
				// 		page_views: 55,
				// 		company: 'jsadkjsahdkjsahkj',
				// 		location: '锦江区bbb',
				// 		phone: '186281005212',
				// 		wx: 'Sequelize.STRING'}
				// 	,
				// 	header: {
				// 		'custom-header': 'hello' //自定义请求头信息
				// 	},
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		this.text = 'request success';
				// 	}
				// });

				let filter = {
					title: 'hhh',
					wx: '111'
				};
				uni.request({
					// url: `http://localhhost:888/api/get_work?filter=${JSON.stringify(filter)}`,
					url: `http://localhost:888/test2?filter=${JSON.stringify(filter)}`,
					method: 'GET',
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data);
						this.text = 'request success';
					},
					fail: (err) => {
						console.log(err);
						alert(err)
					}
				});

			}
		}
	}
</script>

<style>

</style>
