const Sequelize = require('sequelize');
const sequelize = new Sequelize('address', 'root', '{}root123', {
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


let get_area = function(options = {}) {
		let area = options.area;
		
		sequelize.query('select * from areas where cityCode = (select code from cities where name = ?)',
		  { replacements: [options.data.area], type: sequelize.QueryTypes.SELECT }
		).then(projects => {
		  if (options.success && typeof options.success === 'function') {
		  	options.success(projects)
		  }
		}).catch(err => {
			if (options.failed && typeof options.failed === 'function') {
				options.failed(err)
			}
		});
	};
let get_street = function(options = {}) {
	    let area = options.area;
	    let street = options.street;
		
	    sequelize.query('select * from streets where cityCode = (select code from cities where name = ?) and areaCode = (select code from areas where name = ?)',
	      { replacements: [options.data.area, options.data.street], type: sequelize.QueryTypes.SELECT }
	    ).then(projects => {
		 if (options.success && typeof options.success === 'function') {
		 	options.success(projects)
		 }
	    }).catch(err => {
	    	if (options.failed && typeof options.failed === 'function') {
	    		options.failed(err)
	    	}
	    });
	}
	
	module.exports = {
		getArea: get_area,
		getStreet: get_street
	};
	