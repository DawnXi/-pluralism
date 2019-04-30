const DB = require('./DB');

const userApi = {
	register(options = {}) {
		DB.models.user.findAll().then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res.data.data)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
			}
		});
	},
	login(options = {}) {
		console.log(222);
		console.log(options.data);
		DB.models.user.findAll({
			where: options.data
		}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success({
					msg: options.data.username + '登录成功',
					data: res
				})
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('登录失败' + err)
			}
		});
	},
	getUserInfo(options = {}) {
		DB.models.User.findAll({ include: [ DB.models.Collect,DB.models.Comment,DB.Apply ] }).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
			}
		});
	},

};

module.exports = userApi;
