let url = '';
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
	url = 'http://localhost:888/api/'
}else{
    console.log('生产环境')
	url = 'http://39.96.199.119:8080/api/'
}
module.exports = {
	baseUrl: url
}