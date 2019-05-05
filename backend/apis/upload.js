let express = require('express'),
	bodyParser = require('body-parser');

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
        res.header("Access-Control-Allow-Headers", "X-Requested-With,content-Type,refresh-token,access-token,authorization,X-Tag"); // 允许携带自定义头部信息
        res.setHeader("Access-Control-Allow-Methods", "*");
        // res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Expose-Headers", "*");


// 	if (req.getMethod().equalss("OPTIONS")) {
// 	    HttpUtil.setResponse(res, HttpStatus.OK.value(), null);
// 	    return;
// 	}

	next();
});

let qiniu = require("qiniu");

app.get('/api/test', (req,res) => {
	res.send('jjjj');
});

// 上传图片
app.post('/api/upload-img', (req,res) => {

//需要填写你的 Access Key 和 Secret Key
// 	qiniu.conf.ACCESS_KEY = 'wuTeMi9F4w8_vCYi8ea0XUZLx1pvjOyCtWiIdcp2';
// 	qiniu.conf.SECRET_KEY = 'WF1Izb0ST9I-PJID7PSjVu_rP7MWtVQqexq7sbk4';
	let accessKey = '6z1pltT3qArgoVQfrrMoi1WkyQ4A7rGEWTYY9XjD';
	let secretKey = '0IjGtIv0zfHNA5aINU14A8XV1bY14Q9pUEk3i51k';
// 鉴权对象mac
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//要上传的空间
	let bucket = 'vueyang';

//上传到七牛后保存的文件名
	let key = 'my-nodejs-logo.png';
//生成上传 Token
// 	let token = putPolicy.token();
	let options = {
		scope: bucket,
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);
	let upToken=putPolicy.uploadToken(mac);

	let config = new qiniu.conf.Config();
// 空间对应的机房
	config.zone = qiniu.zone.Zone_z0;

//要上传文件的本地路径
	let localFile = 'C:\\Users\\yangmingxi\\Desktop\\test.png'

	let resumeUploader = new qiniu.resume_up.ResumeUploader(config);
	let putExtra = new qiniu.resume_up.PutExtra();
// 扩展参数
	putExtra.params = {
		"x:name": "",
		"x:age": 27,
	}
	putExtra.fname = 'testfile.png';
// 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
	putExtra.resumeRecordFile = 'progress.log';
// 文件分片上传
	resumeUploader.putFile(upToken, key, localFile, putExtra, function(respErr,
																		   respBody, respInfo) {
		if (respErr) {
			throw respErr;
		}
		if (respInfo.statusCode == 200) {
			console.log(respBody);
			res.send(respBod);
			res.send('上传成功！');
		} else {
			console.log(respInfo.statusCode);
			console.log(respBody);
		}
	});
});
app.listen(888);
