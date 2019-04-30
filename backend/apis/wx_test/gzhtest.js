let express = require('express'),
    bodyParser = require('body-parser');

let app = express();

// 请求参数解析模块
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let sha1 = require('sha1'); // sha1加密模块
let xmlparser = require('express-xml-bodyparser'); // xml解析模块
let request = require('request'); //node请求模块

//设置跨域访问
app.all('*', function(req, res, next) {
    //TODO 支持跨域访问
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Expose-Headers", "*");

    next();
});



app.get('/test2', (req,res) => {
    res.end('hhhh');
});

let token = ''
let jsSdkToken = '' // 调用jsSdk的token
let outTime = 991554264173181 // token过期时间
app.get('/get_token', (req,res) => {
    // let token = req.query.token.sort(function(a,b){return a-b;});
	// 参数字典排序
    let token = 'test_server'; // 后台自己配置的token
    let timestamp = req.query.timestamp;
    let nonce = req.query.nonce;
    // let str = sha1(token + timestamp + nonce);
    let arr = [token, timestamp, nonce];
    arr.sort();
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        str += arr[i];
    }
    if (sha1(str) === req.query.signature) {
        res.end(req.query.echostr);
		// outTime = new Date.getTime() + 7200000;
    } else {
        res.end('err');
    }
    // console.log(token);
    console.log(str);
    console.log(req.query.signature);
	token = req.query.signature
});
let fromusername = '';
let tousername = '';
let createtime = '';
let content = '';
let type = '';
let keyWord = '';
let key = '';
let data = ''; // 将要发送的数据

app.post('/get_token', xmlparser({trim: false, explicitArray: false}), (req,res) => {
    console.log(req.body.xml);
    fromusername = req.body.xml.fromusername;
    tousername = req.body.xml.tousername;
    createtime = Number(new Date().getTime());
    content = '测试消息回复';
    data = {
        fromusername,
        tousername,
        createtime,
        content
    };
    type = req.body.xml.event ? req.body.xml.event : req.body.xml.msgtype;
    keyWord = req.body.xml.content;
    key = req.body.xml.eventkey ? req.body.xml.eventkey : keyWord;
    console.log(type);
    console.log(key);
    if (type === 'text' && keyWord) {
        if (keyWord === '111') {
        } else if (keyWord === '123') {
            data.content = '获取123对应的内容';
            sendMsg(data,res);
        } else if (keyWord === '发送卡券') {
			sendCard(res);
		} else {
            data.content = `你发送的文字是：${keyWord}`;
            sendMsg(data,res);
        }
    } else if (type === 'CLICK') {
        if (key === 'send_message') {
            console.log(type);
            console.log(key);
            res.writeHead(200, {'Content-Type': 'application/xml'});
            res.end(`<xml><ToUserName><![CDATA[${fromusername}]]></ToUserName><FromUserName><![CDATA[${tousername}]]>
                </FromUserName><CreateTime>${createtime}</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>1</ArticleCount>
                <Articles><item><Title><![CDATA[这是一个测试图文消息]]></Title><Description><![CDATA[测试描述]]></Description><PicUrl>
                <![CDATA[https://picsum.photos/500/500?image=520]]></PicUrl><Url><![CDATA[http://www.vip.com]]></Url>
                </item></Articles></xml>`);
        } else if (key === 'V1001_GOOD') {
            console.log('--------------------------------------------------------------------------------');
           
            // 后台调用发送消息接口
            let requestData = {
                "touser": fromusername,
                "msgtype": "news",
                "news": {
                    "articles": [
                        {
                            "title": "Happy Day",
                            "description": "今天是个好日子",
                            "url": "http://www.baidu.com",
                            "picurl": "https://picsum.photos/500/500?image=520"
                        }
                    ]
                }
            };
			 console.log(requestData);
            let url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${token}`;
            request({
                url: url,
                method: "POST",
                // json: true,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(requestData)
            }, function(error, response, body) {
                console.log(error);
                // console.log(response);
                console.log(body);
                res.end('success');
                // if (response.data === 0) {
                //     res.end('success');
                // }
            });
        }
    }
    res.end('success');
});

// 发送消息
function sendMsg (data,res) {
    let resXml = `<xml><ToUserName><![CDATA[${data.fromusername}]]></ToUserName><FromUserName><![CDATA[${data.tousername}]]>
    </FromUserName><CreateTime>${data.createtime}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content>
    <![CDATA[${data.content}]]></Content></xml>`;
    res.writeHead(200, {'Content-Type': 'application/xml'});
    res.end(resXml);
}

// token刷新方法
function refreshToken() {
	if (new Date.getTime() - outTime < 20000) {
		// 获取token
		request({
		    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc3f2945eeff90e85&secret=b84c5eab12b783669a8d296e593cf738`,
		    method: "get",
		    // json: true,
		    headers: {
		        "content-type": "application/json",
		    }
		}, function(error, response, body) {
		    console.log(error);
		    // console.log(response);
		    console.log(body);
			token = body.access_token;
			outTime = new Date.getTime() + 7200000;
			// 获取jsapi_ticket
			request({
			    url: `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`,
			    method: "get",
			    headers: {
			        "content-type": "application/json",
			    }
			}, function(error, response, body) {
			    console.log(error);
			    // console.log(response);
			    console.log(body);
				jsSdkToken = body.ticket;
			    res.end('success');
			});
		    res.end('success');
		});
		
	}
}

// 测试发送卡券
function sendCard(res) {
	 request({
	    url: `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=20_tAw2NO2lSH-R9HQ_v8Qojv7JjTFL5iyxu5LfqxssTwLMqooKjeLFtDLS5wCY1tOAhLTkbCFD5gDC_fFBSc2RnaAi3z8sP8r33vFCmBItZT79SXJHUhvHemURyYVyt7uCcjpOUIG9ckd83G30TVCfABADFM`,
	    method: "POST",
	    // json: true,
	    headers: {
	        "content-type": "application/x-www-form-urlencoded",
	    },
	    body: JSON.stringify({
			"touser": "ouoxg1QAwOpVlgeGVURxMWCmUulA", 
			"msgtype": "wxcard", 
			"wxcard": {
				"card_id": "puoxg1bJulbL4wNFzxURZm7peN6A"
			}
		})
	}, function(error, response, body) {
	    res.end('success');
	});
}


// 调用jssdk时需要生成的签名
// let sha1 = require('sha1');
let signature = '' // 最终签名
app.get('/sdkDemo?type=test', (req,res) => {
    refreshToken();
	// 参数字典排序
	let noncestr = 'eaUzCDFNqUh04WUr';
	let jsapi_ticket = jsSdkToken;
	let url = 'http://39.96.199.119/sdkDemo?type=test';
	let arr = [noncestr, jsapi_ticket, url];
	arr.sort();
	let str = '';
	for (let i = 0; i < arr.length; i++) {
	    str += arr[i];
	}
	signature = sha1(str);
	res.end(signature);
});

// // 导出配置
app.get('/get-signature', (req,res) => {
	// 返回签名
	res.end(signature);
});
// 
// module.exports jsSdkConf;


app.listen(80);
