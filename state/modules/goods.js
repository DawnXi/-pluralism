 // import axios from 'axios'
 // import JSEncrypt from '../../common/jsencrypt.min.js'
 // import JSEncrypt from 'jsencrypt'
 const goods = {
 	namespaced: true,
 	state: {
 		tbGoods: [],
 		tbDeatil: [],
		tkGoods: [],
		searchData: []
 	},
 	mutations: {
 		setTbGoods (state, data) {
 		    state.tbGoods = data
 		},
		setTbDetail (state, data) {
		    state.tbDeatil = data
		},
		setTkGoods (state, data) {
		    state.tkGoods = data
		},
		setSearchData (state, data) {
			state.searchData = data
		}
 	},
 	actions: {
 		getTbGoods ({state, commit}, options = {}) {
 			console.log('成发送请求')
 			uni.request({
 				// url: 'http:127.0.0.1:8088/api/tbapi/getgoods',
 				url: 'http://47.90.203.87:8088/api/tbapi/getgoods',
 				data: options.data,
 				method: 'GET',
 				header: {
 						'custom-header': 'hello' //自定义请求头信息
 				},
 				success: (res) => {
 						// commit('setTbGoods', res.data.results.n_tbk_item);
// 						console.log('vuex赋值')
// 						console.log(res.data.results.n_tbk_item)
 						commit('setTbGoods', res.data.results.n_tbk_item);
 						if (options.success && typeof(options.success) === 'function') {
 							options.success(res.data.results.n_tbk_item);
 						}
					}
			});
		},
		getTbDetail ({state, commit}, options = {}) {
		 			console.log('成发送请求')
		 			uni.request({
		 				// url: 'http:127.0.0.1:8088/api/tbapi/getgoods',
		 				url: 'http://47.90.203.87:8088/api/tbapi/getdetail',
		 				data: options.data,
		 				method: 'GET',
		 				header: {
		 						'custom-header': 'hello' //自定义请求头信息
		 				},
		 				success: (res) => {
		 						// commit('setTbGoods', res.data.results.n_tbk_item);
		// 						console.log('vuex赋值')
		// 						console.log(res.data.results.n_tbk_item)
		 						commit('setTbGoods', res.data.results.n_tbk_item);
		 						if (options.success && typeof(options.success) === 'function') {
		 							options.success(res.data.results.n_tbk_item);
		 						}
							}
					});
				},
		getTkGoods ({state, commit}, options = {}) {
			console.log('成发送请求')
			uni.request({
				// url: 'http://127.0.0.1:8088/api/tkapi/getgoods', 
				url: 'http://47.90.203.87:8088/api/tkapi/getgoods', 
				data: options.data,
				method: 'GET',
				header: {
						'custom-header': 'hello' //自定义请求头信息
				},
				success: (res) => {
						commit('setTkGoods', res.data.data);
						if (options.success && typeof(options.success) === 'function') {
							options.success(res.data);
						}
					}
			});
		},
		TkGoodsSearch ({state, commit}, options = {}) {
			console.log('成发送请求')
			uni.request({
				// url: 'http://127.0.0.1:8088/api/tkapi/getgoods', 
				url: 'http://47.90.203.87:8088/api/tkapi/searchGoods', 
				data: options.data,
				method: 'GET',
				header: {
						'custom-header': 'hello' //自定义请求头信息
				},
				success: (res) => {
						commit('setTkGoods', res.data.data);
						if (options.success && typeof(options.success) === 'function') {
							options.success(res.data);
						}
					}
			});
		}
 	}
 };
 
 export default goods;