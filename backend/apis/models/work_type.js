const sequelize = require('./sequelize');

sequelize.db.sync()
	.then(() => sequelize.models.work_type.create({
		name: '派单员',
	}))
	.then(jane => {
		console.log(jane.toJSON());
	});
// 这里要处理增删改查

const work_type = {
	get_type(options = {}) {
		sequelize.models.work_type.findAll({raw: true}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('获取分类列表失败！')
			}
		});
	},
	add_type(options = {}) {
		console.log(options.data)
		sequelize.models.work_type.create(options.data).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('添加失败Q')
			}
		});
	},
	delete_type(options = {}) {
		sequelize.models.work_type.destroy({
			where: options.data,
			raw: true
		}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('删除失败！')
				console.log(err)
			}
		});
	},
	put_type(options = {}) {
		sequelize.models.work_type.update({
			pram: options.data.pram,
			where: options.data.where,
			raw: true
		}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('修改失败！')
			}
		});
	},

}

module.exports = work_type;
