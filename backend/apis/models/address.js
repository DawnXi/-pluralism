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
	
// 省份查询
let get_provinces = function(options = {}) {
	sequelize.query('select * from provinces',{type : sequelize.QueryTypes.SELECT}).then(projects => {
	  if (options.success && typeof options.success === 'function') {
	  	options.success(projects)
		console.log(projects)
	  }
	}).catch(err => {
		if (options.failed && typeof options.failed === 'function') {
			options.failed(err)
		}
	});
}

// 城市查询
let get_cities = function(options = {}) {
	let province = options.province;
	
	sequelize.query('select * from cities where provinceCode = (select code from provinces where name = ?)',
	  { replacements: [options.data.province], type: sequelize.QueryTypes.SELECT }
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

// 区县查询
let get_area = function(options = {}) {
		let cities = options.cities;
		
		sequelize.query('select * from areas where cityCode = (select code from cities where name = ?)',
		  { replacements: [options.data.cities], type: sequelize.QueryTypes.SELECT }
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
	
// 街道查询	
let get_street = function(options = {}) {
	    let cities = options.cities;
	    let area = options.area;
		
	    sequelize.query('select * from streets where cityCode = (select code from cities where name = ?) and areaCode = (select code from areas where name = ?)',
	      { replacements: [options.data.cities, options.data.area], type: sequelize.QueryTypes.SELECT }
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
		getProvince: get_provinces,
		getCities: get_cities,
		getArea: get_area,
		getStreet: get_street
	};
	