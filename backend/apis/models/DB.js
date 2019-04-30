const Sequelize = require('sequelize');
const sequelize = new Sequelize('work_app', 'root', '{}root123', {
   host: 'localhost',
  // port: 'port',
  pool: {
      max: 50,
      min: 0,
      //建立连接最长时间
      acquire: 30000,
      //空闲最长连接时间
      idle: 10000
  },
  //默认输出执行sql语句
  logging: console.log,
  define: {
      //默认创建表有 createAt, updateAt
      timestamps: true,
      //可以给表设置别名
      freezeTableName: true,
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: false
  },
  //sequelize v4 必须设置方言
  dialect: 'mysql',
  //默认DECIMAL and NEWDECIMAL 返回 String
  dialectOptions: {
      decimalNumbers: true
  },
  //设置别名，否则不识别$like等关键词($like: Op.like对应关系)
  operatorsAliases: 'object',
  //时间上的统一
  timezone: "+08:00",
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

// 收藏表
const Collect = sequelize.define('collect', {
	// collect_id:Sequelize.INET,
	collect_name: Sequelize.STRING
});

// 评论表
const Comment = sequelize.define('comment', {
	// Comment_id:Sequelize.INET,
	connect: Sequelize.STRING,
	zan: Sequelize.INTEGER
});

// 报名表
const Apply = sequelize.define('apply', {
	// delivery_id:Sequelize.INET,
});


// 兼职列表
const Work = sequelize.define('work', {
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
// 兼职的报名
Work.hasMany(Apply)
Apply.belongsTo(Work)
// 报名属于一个兼职
// Apply.belongsTo(Work)
// 兼职的评论
Work.hasMany(Comment)
// 评论属于兼职
// Comment.belongsTo(Work)
Work.hasMany(Collect)
Collect.belongsTo(Work)

// 兼职分类表
const WorkType = sequelize.define('work_type', {
	// type_id:Sequelize.INET,
	name: Sequelize.STRING
});
// // 分类下有多个兼职
// WorkType.belongsToMany(Work, {through: 'work-type'})
// // 一个兼职属于多个分类(多对多关联)
// Work.belongsToMany(WorkType, {through: 'work-type'})


// 简历表
const Resume = sequelize.define('resume', {
	// User_id:Sequelize.INET,
	name: Sequelize.STRING,
	birthday: Sequelize.DATE,  
	skills: Sequelize.STRING,
	experience: Sequelize.STRING,
	phone: Sequelize.STRING(11),
	address: Sequelize.STRING
});


// 用户列表
const User = sequelize.define('user', {
	// User_id:Sequelize.INET,
	username: { type: Sequelize.STRING,  unique: 'composite username'},
	password: Sequelize.STRING,
	birthday: Sequelize.DATE,
	phone: Sequelize.STRING,
	address: Sequelize.STRING
});
// 用户下有多个收藏
User.hasMany(Collect)
// 收藏属于一个用户
// Collect.belongsTo(User)
User.hasMany(Comment)
// Comment.belongsTo(User)
User.hasMany(Apply)
// Apply.belongsTo(User)
Resume.belongsTo(User)

module.exports = {
	db: sequelize,
	models: {
		User,
		WorkType,
		Work,
		Collect,
		Comment,
		Apply,
		Resume
	}
};