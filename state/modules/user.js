// import axios from 'axios'
// import JSEncrypt from '../../common/jsencrypt.min.js'
// import JSEncrypt from 'jsencrypt'
const user = {
	namespaced: true,
	state: {
		userInfo: {}
	},
	mutations: {
		setUserInfo(state, data) {
			state.userInfo = data
		}
	},
	actions: {
		getUserInfo({
			state,
			commit
		}, options = {}) {
			console.log('成发送请求')
			uni.request({
				url: 'http://47.90.203.87:8088/api', //仅为示例，并非真实接口地址。
				data: options.data,
				method: 'GET',
				header: {
					'custom-header': 'hello' //自定义请求头信息
				},
				success: (res) => {
					// 						console.log(res.data);
					// 						this.text = 'request success';
					commit('setUserInfo', res.data.data);
					if (options.success && typeof(options.success) === 'function') {
						options.success(res.data);
					}
				}
			});
			// 			axios.get('http://api.taokezhushou.com/api/v1/detail?app_key=a1c0ae7eb994b6f7&goods_id=20281869835', options.data).then(
			// 				(res) => {
			// 					if (res.status === 200 && options.success && typeof options.success === 'function') {
			// 						console.log('请求成功')
			// 						options.success(res.data.data);
			// 					}
			// 				},
			// 				(err) => {
			// 					if (options.failed && typeof options.failed === 'function') {
			// 						options.failed(err);
			// 					}
			// 			});
		},
		// rsa前端加密
		// 		getPublicPem ({state, commit}, options = {}) {
		// 			uni.request({
		// 					url: 'http://47.90.203.87:8088/api/getPublicPem',
		// 					method: 'Get',
		// 					header: {
		// 							'custom-header': 'hello', //自定义请求头信息
		// 					},
		// 					success: (res) => {
		// 						// 从后端获取的公钥 String
		// 						let publicPem = res.data.pub;
		// 						// 用JSEncrypt对密码进行加密
		// 						let encrypt = new JSEncrypt()
		// 						encrypt.setPublicKey(publicPem)
		// 						let password = state.userInfo.password;
		// 						password = encrypt.encrypt(password)
		// 						console.log('加密后的密码：' + password)
		// 						
		// 							commit('setUserInfo', {password : password});
		// 							if (options.success && typeof(options.success) === 'function') {
		// 								options.success(res.data);
		// 							}
		// 					}
		// 			});
		// 		},
		register({
			state,
			commit
		}, options = {}) {

			// 						let data = {
			// 							password : state.userInfo.password,
			// 							userName : state.userInfo.username
			// 						}
			uni.request({
				url: 'http://47.90.203.87:8088/api/register', //仅为示例，并非真实接口地址。
				method: 'POST',
				data: options.data,
				success: (res) => {
					if (options.success && typeof(options.success) === 'function') {
						options.success(res.data);
					}
				}
			});
		},
		login({
			state,
			commit
		}, options = {}) {

			// 				let data = {
			// 					password : state.userInfo.password,
			// 					userName : state.userInfo.username
			// 				}
			uni.request({
				url: 'http://localhost:888/oauth/token', //仅为示例，并非真实接口地址。
				data: options.data,
				method: 'POST',
				header: {
					'custom-header': 'hello', //自定义请求头信息
				},
				success: (res) => {
					if (res.statusCode === 200) {
						commit('setUserInfo', res.data.data);
						if (options.success && typeof(options.success) === 'function') {
							options.success(res.data);
						}
					}
				}
			});
		}
	}
};

export default user;
