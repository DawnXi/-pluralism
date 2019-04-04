const sequelize = require('./sequelize');

sequelize.db.sync()
	.then(() => sequelize.models.work.create({
		title: 'gg.STRING',
		des: 'gg.STRING',
		tag: '包吃住???五险一金',
		salary: '3000-5000/月', //工资
		page_views: 55, // 浏览量
		company: '农夫未来', // 发布公司
		location: '锦江区新光华街1号', // 工作地点
		phone: '186281005212',//雇主电话
		wx: 'ggg.STRING',// 雇主微信
	}))
	.then(jane => {
		console.log(jane.toJSON());
	});
// 这里要处理增删改查和按条件过滤结果

const work = {
	get_work(options = {}) {
	    let filter= JSON.parse(options.filter ? options.filter : {});
		console.log(222222222222222);
		// 复杂查询
		const Op = sequelize.Op;
		sequelize.models.work.findAll({
            offset: options.data.size ? (Number(options.data.page) - 1) * options.data.size : 0, // 默认不跳过（显示第一页数据）
            limit: options.data.size ? options.data.size : 100, // 分页大小  默认100
			// 查询条件
            // where: {filter},
			[Op.or]: [
				{
					title: {
						[Op.substring]: options.like
					}
				},
				{
					des: {
						[Op.substring]: options.like
					}
				}
			],
            raw: true
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
	add_work(options = {}) {
		sequelize.models.work.create(options.data).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			console.log(err);
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
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
				options.failed(err);
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
				options.failed(err)
			}
		});
	}
};

module.exports = work;
