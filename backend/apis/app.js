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
const sequelize = require('./models/sequelize');
// const querystring = require('querystring');

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
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // 设置具体的允许跨域的地址
	res.setHeader("Access-Control-Allow-Credentials", "true"); // 允许请求携带cookie等凭据 
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
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
    sequelize.models.work.findAll({
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

// 查询分类列表
app.get('/api/get_type', (req,res) => {
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
app.post('/api/add_type', (req,res) => {
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
app.post('/api/put_type', (req,res) => {
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
app.post('/api/delete_type', (req,res) => {
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
app.get('/api/get_work', (req,res) => {
    let data = req.query;
    console.log(1111111111111);
	console.log(data);
    sequelize.models.work.findAll({
        offset: (data.size && data.page) ? (Number(data.page) - 1) * data.size : 0, // 默认不跳过（显示第一页数据）
        limit: data.size ? (Number(data.size)) : 100, // 分页大小  默认100
        where: JSON.parse(data.filter ? data.filter : "{}"), // 查询条件（按条件过滤）
		like: data.like ? data.like : '', // 模糊查询
        raw: true
    }).then(result => {
        res.json({
            data: result
        });
    }).catch(err => {
        console.log(err);
    });
});

// 添加兼职
app.post('/api/add_work', (req,res) => {
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
app.post('/api/put_work/:id', (req,res) => {
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
app.post('/api/delete_work/:id', (req,res) => {
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
app.post('/api/add_comment', (req,res) => {
    sequelize.models.comment.create(req.body).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 删除用户评论
app.post('/api/delete_comment/:id', (req,res) => {
  sequelize.models.comment.destroy(
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
app.post('/api/add_delivery', (req,res) => {
    sequelize.models.delivery.create(req.body).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

// 用户添加收藏
app.post('/api/add_collect', (req,res) => {
    sequelize.models.collect.create(req.body).then( result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

//用户取消收藏
app.post('/api/delete_collect/:id', (req,res) => {
    sequelize.models.collect.destroy(
        {
            where: {'id': Number(req.params.id)}
        }
    ).then(result => {
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


// // 测试连接
// sequelize.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.');
// 	})
// 	.catch(err => {
// 		console.error('Unable to connect to the database:', err);
// 	});

// 获取用户信息
app.oauth = new OAuth2Server({
	model: require('./models/auth.js'),
	accessTokenLifetime: 60 * 60,
	allowBearerTokensInQueryString: true
});

app.all('/oauth/token', obtainToken);

app.get('/', authenticateRequest, function(req, res) {

	res.send('Congratulations, you are in a secret area!');
});

app.post('/api/login', function(req, res) {

	res.send('Congratulations, you are in a secret area!');
});

app.get('/test', authenticateRequest, function(req, res) {

	res.send('Congratulations, you are in a secret area!');
});

function obtainToken(req, res) {

	let request = new Request(req);
	let response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

function authenticateRequest(req, res, next) {

	let request = new Request(req);
	let response = new Response(res);

	return app.oauth.authenticate(request, response)
		.then(function(token) {
			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}
// todo 把路由提取出来

app.listen(888);
