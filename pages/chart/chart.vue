<template>
	<view>
		<view>这个是在线沟通页面</view>
		<view class="main">
			<view class="me bubbleTail">
				<img src="https://picsum.photos/500/500?image=399" alt="">
				<view class="bubbles">欢迎你，你好</view>
			</view>
			<view class="adversary bubbleTail">
				<view class="bubbles">你好</view>
				<img src="https://picsum.photos/500/500?image=399" alt="">
			</view>
			<view class="me bubbleTail">
				<img src="https://picsum.photos/500/500?image=399" alt="">
				<view class="bubbles">欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好</view>
			</view>
			<view class="adversary bubbleTail">
				<view class="bubbles">你好</view>
				<img src="https://picsum.photos/500/500?image=399" alt="">
			</view>
			<view class="me bubbleTail">
				<img src="https://picsum.photos/500/500?image=399" alt="">
				<view class="bubbles">欢迎你，你好</view>
			</view>
			<view class="adversary bubbleTail">
				<view class="bubbles">欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好</view>
				<img src="https://picsum.photos/500/500?image=399" alt="">
			</view>
			<view class="adversary bubbleTail">
				<view class="bubbles">你好</view>
				<img src="https://picsum.photos/500/500?image=399" alt="">
			</view>
			<view class="me bubbleTail">
				<img src="https://picsum.photos/500/500?image=399" alt="">
				<view class="bubbles">欢迎你，你好</view>
			</view>
			<view class="adversary bubbleTail">
				<view class="bubbles">欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好欢迎你，你好</view>
				<img src="https://picsum.photos/500/500?image=399" alt="">
			</view>
		</view>
		<view class="bottom-menu">
			<i class="iconfont icon-huatong"></i>
			<input class="uni-input input" confirm-type="send" type="text" v-model="msg" />
			<view class="other">
				<i class="iconfont icon-xiaolian"></i>
				<i class="iconfont icon-hao"></i>
			</view>
			<view @tap="sendMsg">测试发送消息</view>
		</view>
	</view>
</template>

<script>
	// import io from '../../common/socket'
	export default {
		data() {
			return {
				userId: '',
				msg: '',
				// socket: null,
				msgList: [
					{
						from: 'me',
						to: 'user_id_0001',
						msg: '这个是一条我发给user_id_0001的私聊消息'
					},
					{
						from: 'user_id_0001',
						to: 'me',
						msg: '这个是一条user_id_0001回给我的私聊消息'
					},
					{
						from: 'me',
						to: 'user_id_0002',
						msg: '这个是一条我发给user_id_0002的私聊消息'
					},
					{
						from: 'user_id_0002',
						to: 'me',
						msg: '这个是一条user_id_0002回给我的私聊消息'
					},
					{
						from: 'me',
						to: 'user_id_0002',
						msg: '这个是第二条我发给user_id_0002的私聊消息'
					},
					{
						from: 'user_id_0002',
						to: 'me',
						msg: '这个是第二条user_id_0002回复我的私聊消息'
					}
				]
			};
		},
		methods: {
			// #ifdef H5
			sendMsg() {
				let data = {
					type: 'private',
					from: 'me',
					to: this.userId,
					msg: '私聊消息' + this.msg
				}
				this.$socket.emit('chart',data);
			},
			// #endif

			// #ifdef MP-WEIXIN
			sendMsg() {
				wx.sendSocketMessage({
					data:this.msg
				});
				console.log("===");
				console.log(process.env.API_PATH)
			},
			// #endif
		},
		// #ifdef H5
		sockets:{
			connect: function(){  //这里是监听connect事件
				console.log('有客户端链接');
			},
			customEmit: function(val){
			  console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
			},
			chart: function (data) {
				// 判断消息类型是否是私聊 并且消息是不是发送给自己的 如果是则显示，不是则不显示
				if (data.type === 'private' && data.to === this.userId) {
					console.log('服务端返回消息,并且是发给我自己的，可以看消息了');
					console.log(data);
				} else  {
					console.log('服务端返回消息，但是不是发给我的，不能看哦');
				}
			}
		},
		onLoad(e) {
			this.userId = e.id;
		},
		onReady(){
			this.$socket.emit('connect', '连接事件'); //在这里触发connect事件
		},
		// #endif


		// #ifdef MP-WEIXIN
		onLoad(e) {
			this.userId = e.id;
		},
		onReady() {
			wx.connectSocket({
				url:`ws://127.0.0.1:3000`,
			});

			wx.onSocketOpen(function(res){
				console.log('websocket opened.');
			});
			//连接失败的事件：

			wx.onSocketError(function(res){
			  console.log('websocket fail');
			})
			//收到服务器的消息时触发的事件：

			wx.onSocketMessage(function(res){
				console.log('received msg: ' + res.data);
			})
		}
		// #endif
	}
</script>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.js"></script>-->

<style scoped>
.main{
	padding: 0 20upx;
	padding-bottom: 70px;
	background: #fff;
}
.bubbles {
    padding: 10px;
    background: #e4efef;
    border-radius: 10px;
    display: inline-block;
    margin: 15px 10px;
    text-align: left;
	color: #000;
	position: relative;
	text-align: left;
	max-width: 69.5%;
}
.adversary .bubbles{
	color: #fff;
	background-color: #39d4d9;
}
.bubbles:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: -20px;
    top: 20px;
    margin-top: -10px;
    border: 10px solid;
    border-color: transparent;
    border-right-color: #e4efef;
}
.adversary .bubbles:before{
	border-color: transparent;
	border-left-color: #39d4d9;
    left: 100%;
}
.bubbleTail img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    vertical-align: top;
    margin-top: 15px;
}
.bubbleTail {
    text-align: right;
}

.me.bubbleTail {
    text-align: left;
}
.bottom-menu {
	display: flex;
	justify-content: space-between;
    background: #fafafa;
	padding: 20upx;
	width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
	border-top: #ddd solid 1px;
}
.input {
	position: static;
    background: #e6e6e6;
    height: 30px;
    line-height: 20px;
	text-indent: 15px;
    border-radius: 5px;
    width: 100%;
	margin: 0 20upx;
	margin-left: 10upx;
}
.other{
	position: relative;
	margin-left: 90upx;
}
.icon-xiaolian {
	position: absolute;
	right: 45upx;
	top: 0px;
}
.icon-hao{
	position: absolute;
	right: -5upx;
	top: 0upx;
	margin-right: 0;
}
.bottom-menu i {
   line-height: 40px;
}
.iconfont{
	font-size: 40upx;
    margin-right: 10upx;
}

</style>