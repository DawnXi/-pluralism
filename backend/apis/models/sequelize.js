const Sequelize = require('sequelize');
const sequelize = new Sequelize('work_app', 'root', '{}root123', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});


// 测试连接
sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
// 定义数据模型及其关联

// 用户列表
const user = sequelize.define('user', {
	// user_id:Sequelize.INET,
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	birthday: Sequelize.DATE
});


// 兼职分类表
const work_type = sequelize.define('work_type', {
	// type_id:Sequelize.INET,
	name: Sequelize.STRING
});

// 兼职列表
const work = sequelize.define('work', {
	// work_id:Sequelize.INET,
	title: Sequelize.STRING,
	des: Sequelize.STRING,
	tag: Sequelize.STRING,
	salary: Sequelize.STRING, //工资
	page_views: Sequelize.INTEGER, // 浏览量
	company: Sequelize.STRING, // 发布公司
	location: Sequelize.STRING, // 工作地点
	phone: Sequelize.STRING,//雇主电话
	wx: Sequelize.STRING,// 雇主微信
}); 

// 分类下的兼职
work_type.hasMany(work);
// work_type.hasMany(work, {foreignKey: 'id', sourceKey: 'id'});
// work.belongsTo(work_type, {foreignKey: 'id', targetKey: 'id'});


// 收藏表
const collect = sequelize.define('collect', {
	// collect_id:Sequelize.INET,
	userName: Sequelize.STRING
});
// 用户的收藏
user.hasMany(collect);
// user.hasMany(collect, {foreignKey: 'id', sourceKey: 'id'});
// collect.belongsTo(work_type, {foreignKey: 'id', targetKey: 'id'});

// 评论表
const comment = sequelize.define('comment', {
	// comment_id:Sequelize.INET,
	userName: Sequelize.STRING
});
// 用户的评论
user.hasMany(comment);
// user.hasMany(comment, {foreignKey: 'id', sourceKey: 'id'});
// comment.belongsTo(work_type, {foreignKey: 'id', targetKey: 'id'});


// 投递表
const delivery = sequelize.define('delivery', {
	// delivery_id:Sequelize.INET,
	userName: Sequelize.STRING
});
// 用户的投递
user.hasMany(delivery);
// user.hasMany(delivery, {foreignKey: 'id', sourceKey: 'id'});
// delivery.belongsTo(work_type, {foreignKey: 'id', targetKey: 'id'});


// 简历相关


module.exports = {
	db: sequelize,
	models: {
		user,
		work_type,
		work,
		collect,
		comment,
		delivery
	}
};