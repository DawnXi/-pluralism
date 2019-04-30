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
        // res.header("Access-Control-Allow-Headers", "X-Requested-With,refresh-token,access-token,authorization"); // 允许携带自定义头部信息
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Expose-Headers", "*");


// 	if (req.getMethod().equalss("OPTIONS")) {
// 	    HttpUtil.setResponse(res, HttpStatus.OK.value(), null);
// 	    return;
// 	}

	next();
});

let qiniu = require("qiniu");

app.get('/', (req,res) => {
	res.send('jjjj');
});

// 上传图片
app.post('/upload', (req,res) => {
	
	// //需要填写你的 Access Key 和 Secret Key
	// qiniu.conf.ACCESS_KEY = 'Access_Key';
	// qiniu.conf.SECRET_KEY = 'Secret_Key';
	// //要上传的空间
	// bucket = 'Bucket_Name';
	// //上传到七牛后保存的文件名
	// key = 'my-nodejs-logo.png';
	// //构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
	// function uptoken(bucket, key) {
	//   var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
	//   putPolicy.callbackUrl = 'http://your.domain.com/callback';
	//   putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
	//   return putPolicy.token();
	// }
	// //生成上传 Token
	// token = uptoken(bucket, key);
	// //要上传文件的本地路径
	// filePath = './nodejs-logo.png'
	// //构造上传函数
	// function uploadFile(uptoken, key, localFile) {
	//   var extra = new qiniu.io.PutExtra();
	// 	qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
	// 	  if(!err) {
	// 		// 上传成功， 处理返回值
	// 		console.log(ret.hash, ret.key, ret.persistentId);       
	// 	  } else {
	// 		// 上传失败， 处理返回代码
	// 		console.log(err);
	// 	  }
	//   });
	// }
	// //调用uploadFile上传
	// uploadFile(token, key, filePath);
	
	let accessKey = 'wuTeMi9F4w8_vCYi8ea0XUZLx1pvjOyCtWiIdcp2';
	let secretKey = 'WF1Izb0ST9I-PJID7PSjVu_rP7MWtVQqexq7sbk4';
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	let options = {
	  scope: 'vueyang',
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);
	let uploadToken=putPolicy.uploadToken(mac);
	let config = new qiniu.conf.Config();
	// 空间对应的机房
	config.zone = qiniu.zone.Zone_z0;
	// 是否使用https域名
	//config.useHttpsDomain = true;
	// 上传是否使用cdn加速
	//config.useCdnDomain = true;
	
	
		// //上传到七牛后保存的文件名
	key = 'my-nodejs-logo.png';
	let formUploader = new qiniu.form_up.FormUploader(config);
	let putExtra = new qiniu.form_up.PutExtra();
	let readableStream = req.body.data; // 可读的流
	formUploader.putStream(uploadToken, key, readableStream, putExtra, function(respErr,
	  respBody, respInfo) {
	  if (respErr) {
		throw respErr;
	  }
	  if (respInfo.statusCode == 200) {
		console.log(respBody);
	  } else {
		console.log(respInfo.statusCode);
		console.log(respBody);
	  }
	});
});

app.listen(3888);
