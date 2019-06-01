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
			<input class="uni-input input" confirm-type="send" type="text" />
			<view class="other">
				<i class="iconfont icon-xiaolian"></i>
				<i class="iconfont icon-hao"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>


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