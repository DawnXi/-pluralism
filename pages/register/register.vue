<template>
	<view>
		<!-- <page-head title="注册"></page-head> -->
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset" methods='POST'>
				<view class="uni-form-item uni-column">
					<view class="title">用户名/手机号</view>
					<input class="uni-input" type="text" name="username" placeholder="请输入用户名/手机号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码</view>
					<input class="uni-input" type="password" name="password" placeholder="请输入密码" />
				</view>
				<button type="primary" formType="submit">注册</button>
				<button type="primary" size="mini" @click="getTbData">获取淘宝商品</button>
				<button type="primary" size="mini" @click="getTkData">获取逃课助手商品</button>
			</form>
		</view>
		<view class="uni-flex uni-row" style="justify-content: space-between;">
			<view class="text" @click="toLogin">已有账号？直接登录</view>
			<view class="text" @click="toForget">忘记密码？</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapActions} from 'vuex' 
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('user', ['userInfo']),
			...mapState('goods', ['goodsList'])
		},
		methods:{
			...mapActions('user', ['register', 'getPublicPem']),
			...mapActions('goods', ['geTbGoods', 'geTkGoods']),
			
			formSubmit: function (e) {
// 				this.getPublicPem ({
// 					success: (res) => {
// 						
// 					},
// 					failed: (res) => {
// 						alert('注册失败！')
// 					}
// 				})
				let data = e.detail.value
				this.register({
					data: data,
					success: (res) => {
						alert('注册成功！')
					},
					failed: (res) => {
						alert('注册失败！')
					}
				})
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			formReset: function (e) {
				console.log("清空数据")
				// this.chosen = ''
			},
			toLogin () {
				uni.navigateTo({
					url: `../../pages/login/login`
				})
			},
			toForget () {
				uin.navigateTo({
					url: `../../pages/forget/forget`
				})
			},
			getTbData () {
				this.geTbGoods({
					success: (res) => {
						console.log(res);
						alert(111);
					},
					failed: () => {
						alert(222)
					}
				})
			},
			getTkData () {
				this.geTkGoods({
					data: {
						'app_key': 'a1c0ae7eb994b6f7'
					},
					success: (res) => {
						console.log(res);
						alert(111);
					},
					failed: () => {
						alert(222)
					}
				})
			}
		}
	}
</script>

<style>

</style>
