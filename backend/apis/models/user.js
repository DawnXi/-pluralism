// const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

// const express = require('express');
// const app = new express();



// db.sync()
// 	.then(() => User.create({
// 		username: 'ymx',
// 		password: '123',
// 		birthday: new Date(1980, 6, 20)
// 	}))
// 	.then(jane => {
// 		console.log(jane.toJSON());
// 	});

const userApi = {
	register(options = {}) {
		sequelize.models.user.findAll({
			where: {
				username: 'ymx',
				password: '123'
			}
		}).then(res => {
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
		console.log(222)
		console.log(options.data)
		sequelize.models.user.findAll({
			where: options.data
		}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success({msg: options.data.username + '登录成功'})
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('登录失败' + err)
			}
		});
	},
	getUserInfo(options = {}) {
		sequelize.models.user.findAll({
			where: options.data
		}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
			}
		});
	},

}

module.exports = userApi;
