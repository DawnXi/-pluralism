const Sequelize = require('sequelize');
const db = require('./sequelize');

// const express = require('express');
// const app = new express();

// 测试连接
db.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
// 定义数据模型
const work_types = db.define('user', {
	id: Sequelize.INTIGER,
	name: Sequelize.STRING,
	birthday: Sequelize.DATE
});

// db.sync()
// 	.then(() => User.create({
// 		username: 'ymx',
// 		password: '123',
// 		birthday: new Date(1980, 6, 20)
// 	}))
// 	.then(jane => {
// 		console.log(jane.toJSON());
// 	});

const work_type = {
	getAll(options = {}) {
		User.findAll().then(res => {
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
		console.log(options.data)
		User.findAll({
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
		User.findAll({
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

module.exports = work_type;
