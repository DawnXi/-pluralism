// let express = require('express')
// let app = express()
//
//
// let bodyParser = require('body-parser');
// // let multer = require('multer'); // v1.0.5
// // let upload = multer(); // for parsing multipart/form-data
// //
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const DB = require('./models/DB');
const Oauth  = require('./models/auth');
// const querystring = require('querystring');
const Sequelize = require('sequelize');
const Op = Sequelize.Op


let express = require('express'),
	bodyParser = require('body-parser'),
	OAuth2Server = require('oauth2-server'),
	Request = OAuth2Server.Request,
	Response = OAuth2Server.Response;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//设置跨域访问
app.all('*', function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "X-Requested-With");
	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	// res.header("X-Powered-By",' 3.2.1')
	// res.header("Content-Type", "application/json;charset=utf-8");

	 //TODO 支持跨域访问
        // res.setHeader("Access-Control-Allow-Origin", "*"); //此项设置为*时无论怎么设置都不会带上cookie 请求的方法也获取不到数据
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置具体的允许跨域的地址
        res.setHeader("Access-Control-Allow-Credentials", "true"); // 允许请求携带cookie
       //       res.header("Access-Control-Allow-Headers", "X-Requested-With,access-token"); // 允许携带自定义头部信息
        res.header("Access-Control-Allow-Headers", "X-Requested-With,refresh-token,access-token,authorization,content-type,custom-header,secret"); // 允许携带自定义头部信息
        res.setHeader("Access-Control-Allow-Methods", "*");
        //res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Expose-Headers", "*");


// 	if (req.getMethod().equalss("OPTIONS")) {
// 	    HttpUtil.setResponse(res, HttpStatus.OK.value(), null);
// 	    return;
// 	}

	next();
});

// let cors = require("cors");
// app.use(cors({credentials: true, origin: 'http://localhost:888'}));



app.get('/test2', (req,res) => {
    let data = req.query;
    console.log(666);
    console.log(data);
    // console.log(JSON.parse(querystring.parse(data).filter));
    DB.models.Work.findAll({
        offset: (data.size && data.page) ? (Number(data.page) - 1) * data.size : 0, // 默认不跳过（显示第一页数据）
        limit: data.size ? (Number(data.size)) : 100, // 分页大小  默认100
        where: data.filter ? JSON.parse(data.filter) : {}, // 查询条件
		like: data.like, // 模糊查询
        // where: {title: 'hhh'}, // 查询条件
        raw: true
    }).then(result => {
        res.json({
            data: result
        });
    }).catch(err => {
        console.log(err);
    });
});
let userApi = require('./models/user');
let typeApi = require('./models/work_type');
let workApi = require('./models/works');
let getUserApi = userApi.getUserInfo;

// 获取用户信息
app.get('/get-user', (req,res) => {
	getUserApi({
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});

// 修改用户信息
app.post('/update-user/:id', (req,res) => {
	 DB.models.User.update(
		{
			name: '我被修改了',
		},
		{
			where: {
				id: Number(req.params.id)
			}
		}
	).then( result => {
	    res.json(result);
	}).catch(err => {
	    res.json(err);
	});
});
// 删除用户
app.post('/delete-user/:id', (req,res) => {
	 DB.models.Resume.destroy({
		where: {
			id: Number(req.params.id)
		}
	}).then( result => {
	    res.json(result);
	}).catch(err => {
	    res.json(err);
	});
});

// 查询分类列表
app.get('/api/get-type', (req,res) => {
	typeApi.get_type({
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});

// 添加分类
app.post('/api/add-type', (req,res) => {
	typeApi.add_type({
		data: req.body,
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});

// 修改分类
app.post('/api/put-type', (req,res) => {
	typeApi.put_type({
		data: {
            param: req.body,
            where: {'id': Number(req.params.id)},
		},
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});


// 删除分类
app.post('/api/delete-type', (req,res) => {
	typeApi.delete_type({
		data: {
            where: {'id': Number(req.params.id)},
		},
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});


// 查询兼职列表
// 添加模糊查询和分类查询
app.get('/api/get-work', (req,res) => {
    let data = req.query;
	// 找出查询参数
	let queryFilters=[];
	let queryLikes=[];
	let filterDataStr = ''
	let likeDataStr = ''
	let filterData = '';
	let likeData = '';
	let dataArry = Object.keys(data);
	if (dataArry.length>1) {
		let key = ''
		dataArry.map((item,index) => {
			let pushItem = ''
			if (/filter_/.test(item)) {
				key = item.replace('filter_', '')
				pushItem = `{"${key}": "${data[item]}"}`
				queryFilters.push(JSON.parse(pushItem))
			} else if (/like_/.test(item)) {
				key = item.replace('like_', '')
				pushItem = `{"${key}": "{[Op.like]: '%${data[item]}%'}"}`,
				queryLikes.push(JSON.parse(pushItem))
			}
			console.log(key)
		})
		queryFilters = JSON.stringify(queryFilters);
		queryLikes = JSON.stringify(queryLikes);
		filterDataStr = queryFilters.replace(/ /g,'').replace(/\[\{/, '{').replace(/\}\]/, '}').replace(/\}\,\{/g,',')
		likeDataStr = queryLikes.replace(/ /g,'').replace(/\[\{/, '{').replace(/\}\]/, '}').replace(/\}\,\{/g,',')
		filterData = JSON.parse(filterDataStr);
		likeData = JSON.parse(likeDataStr);
		console.log('----------------------------------------------------------------------------')
		console.log(filterData);
		console.log(likeData);
	}
    console.log(1111111111111);
	console.log(data);
	console.log(queryFilters)
	console.log(queryLikes)

    DB.models.Work.findAll({
  //       offset: (data.size && data.page) ? (Number(data.page) - 1) * data.size : 0, // 默认不跳过（显示第一页数据）
  //       limit: data.size ? (Number(data.size)) : 100, // 分页大小  默认100
  //       where: JSON.parse(data.filter ? data.filter : "{}"), // 查询条件（按条件过滤）
		// like: data.like ? data.like : '', // 模糊查询
  //       raw: true,
		// include: [ DB.models.Collect,DB.models.Comment,DB.models.Apply ]
		include: [ 
			{
			  model: DB.models.Collect,
			},
			{
			  model: DB.models.Comment,
			},
			{
			  model: DB.models.Apply,
			},
		],
		offset: (data.size && data.page) ? (Number(data.page) - 1) * data.size : 0, // 默认不跳过（显示第一页数据）
		limit: data.size ? (Number(data.size)) : 100, // 分页大小  默认100
		where: filterData, // 查询条件（按条件过滤）
		// like: data.like ? data.like : '', // 模糊查询
		// like: likeData,
		where: {tag:{[Op.like]: '%农夫%'}}
		// raw: true,
    }).then(result => {
        res.json({
            data: result
        });
    }).catch(err => {
        console.log(err);
    });
});

// 查询兼职详情
app.get('/api/work-detail/:id', (req,res) => {
	let data ={
		id: Number(req.params.id)
	}
	DB.models.Work.findAll({
		include: [
			{
				model: DB.models.Collect,
			},
			{
				model: DB.models.Comment,
			},
			{
				model: DB.models.Apply,
			},
		],
		offset: (data.size && data.page) ? (Number(data.page) - 1) * data.size : 0, // 默认不跳过（显示第一页数据）
		limit: data.size ? (Number(data.size)) : 100, // 分页大小  默认100
		where: data
		// raw: true,
	}).then(result => {
		res.json({
			data: result
		});
	}).catch(err => {
		console.log(err);
	});
});

// 添加兼职
app.post('/api/add-work', (req,res) => {
	workApi.add_work({
		data: req.body,
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
			res.status(500).json({ error: err })    //返回错误码
		}
	});
});

// 修改兼职
app.post('/api/put-work/:id', (req,res) => {
	console.log('请求参数');
	console.log(req.body);
	// let param = req.body;
	workApi.put_work({
		data: {
			param: req.body,
			where: {'id': Number(req.params.id)},
		},
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});


// 删除兼职
app.post('/api/delete-work/:id', (req,res) => {
	workApi.delete_work({
		data: {
			where: {'id': Number(req.params.id)},
		},
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});


//以下这些API直接操作模型
// 用户添加评论
app.post('/api/add-comment', (req,res) => {
    DB.models.comment.create(req.body).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 删除用户评论
app.post('/api/delete-comment/:id', (req,res) => {
  DB.models.comment.destroy(
    {
      where: {'id': Number(req.params.id)}
    }
  ).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});


// 用户投递简历
app.post('/api/add-delivery', (req,res) => {
    DB.models.delivery.create(req.body).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});


// 用户申请报名
app.post('/api/apply', (req,res) => {
    DB.models.Apply.create({
		workId: 7,
		userId: 5
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
	
	
	// if (req.params.user_id &&  req.params.work_id) {
	// 	 DB.models.Apply.create({
	// 		workId: Number(req.params.user_id),
	// 		userId: Number(req.params.work_id)
	// 	}).then( result => {
	// 	    res.json(result);
	// 	}).catch(err => {
	// 	    res.json(err);
	// 	});
	// } else if (!req.params.user_id) {
	// 	
	// 	res.json('work_id is require！')
	// } else if (!req.params.work_id) {
	// 	res.json('user_id is require！')
	// }
});

// 用户取消报名
app.get('/api/delete-apply', (req,res) => {
	DB.models.Apply.destroy({
		where: {
			userId: req.query.user_id
		}
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 用户报名列表
app.get('/api/get-apply', (req,res) => {
	DB.models.Apply.findAll({
		where: {
			userId: req.query.user_id
		},
		include: [DB.models.Work],
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 用户添加收藏
app.post('/api/add-collect/:work_id', (req,res) => {
    DB.models.Collect.create({
		workId: Number(req.params.work_id),
		userId: 1
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

//用户取消收藏
app.post('/api/delete-collect/:id', (req,res) => {
	if (req.query.work_id && req.query.user_id) {
		DB.models.Collect.destroy(
			{
				where: {
					'id': Number(req.params.id),
					'workId': req.query.work_id,
					'userId': req.query.user_id
				}
			}
		).then(result => {
			res.json(result);
		}).catch(err => {
			res.json(err);
		});
	} else {
		res.json('404');
	}

});

// 用户收藏列表
app.get('/api/get-collect', (req,res) => {
    DB.models.Collect.findAll({
		include: [
			{
				model: DB.models.Work
			}
		],
		// 复合查询
		where: {
			[Op.or]: [
				{
					userId: req.query.user_id
				},
				{
					workId: req.query.work_id
				},
				{
					id: req.query.id
				},
			]
		}
	}).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 简历列表
app.get('/api/get-resume', (req,res) => {
	DB.models.Resume.findAll({
		where: {
			userId: req.query.user_id
		}
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 创建简历
app.post('/api/add-resume', (req,res) => {
    DB.models.Resume.create({
		name: 'Sequelize.STRING',
		birthday: 'Sequelize.DATE',  
		skills: 'Sequelize.STRING',
		experience: 'Sequelize.STRING',
		phone: 'Sequelize.STRING(11)',
		address: 'Sequelize.STRING'
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 修改简历
app.post('/api/update-resume/:id', (req,res) => {
	// 修改的正确语法
    DB.models.Resume.update(
		{
			name: '我被修改了',
		},
		{
			where: {
				id: Number(req.params.id)
			}
		}
	).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 删除简历
app.post('/api/delete-resume/:id', (req,res) => {
    DB.models.Resume.destroy({
		where: {
			id: Number(req.params.id)
		}
	}).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 登录
// app.post('/api/login', (req,res) => {
// 	console.log(1111)
// 	console.log(req.body)
// 	userApi.login({
// 		data: {
// 			username: req.body.username,
// 			password: req.body.password
// 		},
// 		success(data) {
// 			// console.log(data);
// 			res.json(data);
// 		},
// 		failed(err) {
// 			// console.log(err);
// 			res.end(JSON.stringify(err));
// 		}
// 	})
// })

// 注册
// app.register('/api/register', (req,res) => {
// 	console.log(1111)
// 	console.log(req.body)
// 	
// 	sequelize.models.work.findAll({
// 	    where: {username: req.boby.username}, // 查询条件
// 	    raw: true
// 	}).then(result => {
// 	    // res.json({
// 	    //     data: result
// 	    // });
// 		// 注册成功 签发token （加密的初步想法） (各种小程序中的登录的特殊处理) （支付宝订阅号开发） （node线上部署与性能优化）
// 		//  (数据库性能优化 数据库集群 多库连接查询)  （服务器集群）  （支付宝支付  微信支付）  （地图开发）  （数据可视化 各种图标库应用）
// 	}).catch(err => {
// 	    console.log(err);
// 	});
// 	
// 	
// })

app.post('/api/register', (req,res) => {
	let hash = require('hash.js');
	let data  = {
		username: req.body.username,
		password: hash.sha256().update(req.body.password).digest('hex')
	};
	DB.models.User.create(data).then( result => {
		res.json(result);
	}).catch(err => {
		res.status(err.code || 500).json(err.message || '服务器错误');
	});
})

let address = require('./models/address');

// 地址查询接口
app.get('/api/getAddress/area', (req,res) => {
    let data = req.query;
    console.log(1111111111111);
	console.log(data);
    address.getArea({
		data: {
			area: req.query.area
		},
		success(data) {
			// console.log(data);
			
		},
		failed(err) {
			console.log(err);
		}
	})
});

// 街道查询接口
app.get('/api/getAddress/street', (req,res) => {
    let data = req.query;
    console.log(1111111111111);
	console.log(data);
	address.getStreet({
		data: {
			area: req.query.area,
			street: req.query.street
		},
		success(data) {
			// console.log(data);
			res.json(data);
		},
		failed(err) {
			console.log(err);
		}
	})
});

app.get('/test', (req,res) => {
	let data = {
   	data: {
	   	is_ticket_trade: true,
	   	is_error: false,
	   	qr_url: 'http://www.gongjuji.net'
   	}
   };
   if(req.query.order_no === '111') {
   	// 不是票务订单
   	data.data = {
	   	is_ticket_trade: false,
	   	is_error: false,
	   	qr_url: ''
   	}
   } else if (req.query.order_no === '222') {
   	// 出票中
   	data.data = {
	   	is_ticket_trade: false,
	   	is_error: false,
	   	qr_url: ''
   	}
   } else if (req.query.order_no === '333') {
   	// 出票成功
   	data.data = {
	   	is_ticket_trade: false,
	   	is_error: false,
	   	qr_url: 'http://www.baidu.com'
   	}

   } else if (req.query.order_no === '444') {
   	// 出票失败
   	data.data = {
	   	is_ticket_trade: false,
	   	is_error: true,
	   	qr_url: ''
   	}

   } else if (req.query.order_no === '555') {
   	// 查询订单失败
   	data.data = {
   	}
    res.status(500).send(500, '查询订单失败')
   	res.end()
   }

   res.json(data);
});


// // 测试连接
// sequelize.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch(err => {
// 		console.error('Unable to connect to the database:', err);
// 	});

// 获取用户信息
// app.oauth = new OAuth2Server({
// 	model: require('./models/auth.js'),
// 	accessTokenLifetime: 60 * 60,
// 	allowBearerTokensInQueryString: true
// });
// 
// app.all('/oauth/token', obtainToken);
// 
// app.get('/', authenticateRequest, function(req, res) {
// 
// 	res.send('Congratulations, you are in a secret area!');
// });
// 
// app.post('/api/login', function(req, res) {
// 
// 	res.send('Congratulations, you are in a secret area!');
// });
// 
// app.get('/test', authenticateRequest, function(req, res) {
// 
// 	res.send('Congratulations, you are in a secret area!');
// });
// 
// function obtainToken(req, res) {
// 
// 	let request = new Request(req);
// 	let response = new Response(res);
// 
// 	return app.oauth.token(request, response)
// 		.then(function(token) {
// 
// 			res.json(token);
// 		}).catch(function(err) {
// 
// 			res.status(err.code || 500).json(err);
// 		});
// }
// 
// function authenticateRequest(req, res, next) {
// 
// 	let request = new Request(req);
// 	let response = new Response(res);
// 
// 	return app.oauth.authenticate(request, response)
// 		.then(function(token) {
// 			next();
// 		}).catch(function(err) {
// 
// 			res.status(err.code || 500).json(err);
// 		});
// }
// todo 把路由提取出来
// todo 图片上传接口 把图片上传到七牛云

// Oauth测试
const model = {
  // We support returning promises.
  getAccessToken: function() {
    return new Promise('works!');
  },

  // Or, calling a Node-style callback.
  getAuthorizationCode: function(done) {
    done(null, 'works!');
  },

  // Or, using generators.
  getClient: function*() {
    yield somethingAsync();
    return 'works!';
  },

  // Or, async/wait (using Babel).
  getUser: async function() {
    await somethingAsync();
    return 'works!';
  }
};

const OAuth2 = require('oauth2-server');
let oauth = new OAuth2({model: model});




// // 获取oauth 连接信息
// console.log('获取客户端id');
// console.log(Oauth.getClient(2,'jjj'));

app.listen(8088);
