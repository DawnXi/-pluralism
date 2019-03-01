const sequelize = require('./sequelize');

sequelize.db.sync()
	.then(() => sequelize.models.work.create({
		title: 'Sequelize.STRING',
		des: 'Sequelize.STRING',
		tag: '包吃住???五险一金',
		salary: '3000-5000/月', //工资
		page_views: 55, // 浏览量
		company: '农夫未来', // 发布公司
		location: '锦江区新光华街1号', // 工作地点
		phone: '186281005212',//雇主电话
		wx: 'Sequelize.STRING',// 雇主微信
	}))
	.then(jane => {
		console.log(jane.toJSON());
	});
// 这里要处理增删改查和按条件过滤结果

const work = {
	get_work(options = {}) {
		sequelize.models.work.findAll({raw: true}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('获取分类列表失败！')
			}
		});
	},
	add_work(options = {}) {
		sequelize.models.work.create(options.data).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('添加失败Q')
			}
		});
	},
	delete_work(options = {}) {
		console.log('请求参数');
		console.log(options.data.where);
		sequelize.models.work.destroy(
			{
				where: options.data.where
			}
		).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed('删除失败！');
				console.log(err)
			}
		});
	},
	put_work(options = {}) {
		let param = options.data.param;
		sequelize.models.work.update(
			// param,
			// where: options.data.where,
			param,
			{
				where: options.data.where
			}
		).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				console.log(err);
				options.failed('修改失败！')
			}
		});
	}
};

module.exports = work;
