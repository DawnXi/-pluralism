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
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
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



app.get('/', (req,res) => {
    res.end('123')
})
let userApi = require('./models/user')
let getUserApi = userApi.getUserInfo

// 获取用户信息
app.get('/get-user', (req,res) => {
	getUserApi({
		data: {
			username: req.query.username,
			password: req.query.password
		},
		success(data) {
			// console.log(data);
			res.end(JSON.stringify(data));
		},
		failed(err) {
			console.log(err);
		}
	})
})

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

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

function authenticateRequest(req, res, next) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.authenticate(request, response)
		.then(function(token) {

			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}


app.listen(888);