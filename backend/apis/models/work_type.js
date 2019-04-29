const DB = require('./DB');

DB.db.sync()
	.then(() => DB.models.WorkType.create({
		name: '派单员',
	}))
	.then(jane => {
		console.log(jane.toJSON());
	});
// 这里要处理增删改查

const work_type = {
	get_type(options = {}) {
		DB.models.WorkType.findAll({raw: true,include: [ DB.models.Work ]}).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
			}
		});
	},
	add_type(options = {}) {
		console.log(options.data);
		DB.models.WorkType.create(options.data).then(res => {
			if (options.success && typeof options.success === 'function') {
				options.success(res)
			}
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
			}
		});
	},
	delete_type(options = {}) {
		DB.models.WorkType.destroy({
			where: options.data,
			raw: true
		}).then(res => {
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
	put_type(options = {}) {
		DB.models.WorkType.update({
			pram: options.data.pram,
			where: options.data.where,
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

};

module.exports = work_type;
