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



app.get('/test2', (req,res) => {
    res.end('hhhh');
});


app.get('/get_token', (req,res) => {
    let token = req.body.token;
    let timestamp = req.body.timestamp;
    let nonce = req.body.nonce;
    console.log(token);
    console.log(timestamp);
    console.log(nonce);
    console.log(123);
    res.end(123);
});


app.listen(80);
