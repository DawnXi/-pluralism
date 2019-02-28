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
// 定义数据模型
const User = sequelize.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	birthday: Sequelize.DATE
});

module.exports = {
	db: sequelize,
	models: {
		User
	}
};